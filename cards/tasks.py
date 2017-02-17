import requests
import xlrd
import datetime

from celery import shared_task
from django.conf import settings

from cards.models import CardBalance, CARD_STATUSES


def xldate_to_datetime(xldate):
    temp = datetime.datetime(1900, 1, 1)
    delta = datetime.timedelta(days=xldate - 2)
    return temp + delta


def get_status_code(card_status):
    card_status = card_status.lower()
    filtered = [status[0] for status in CARD_STATUSES if status[1] == card_status]
    return filtered[0] or None


@shared_task
def import_spreadsheets():
    def get_spreadsheets():
        balance_spreadsheet_file = requests.get(settings.CARD_BALANCE_FILE_URL, stream=True)
        phone_spreadsheet_file = requests.get(settings.CARD_PHONE_FILE_URL, stream=True)
        balance_spreadsheet = xlrd.open_workbook(
            filename=None,
            file_contents=balance_spreadsheet_file.content
        ).sheet_by_index(0)
        cards_spreadsheet = xlrd.open_workbook(
            filename=None,
            file_contents=phone_spreadsheet_file.content
        ).sheet_by_index(0)
        return balance_spreadsheet, cards_spreadsheet

    def update_cards_with_phone_number(cards_spreadsheet):
        centres = [str(cards_spreadsheet.cell_value(0, i)).lower() for i in range(0, cards_spreadsheet.ncols, 2)]
        rows = []
        for index, centre in enumerate(centres):
            header = [str(cards_spreadsheet.cell_value(1, i)).lower() for i in range(2 * index, 2 + 2 * index)]
            rows.append(
                [dict(zip(header, [cards_spreadsheet.cell_value(j, i) for i in range(2 * index, 2 + 2 * index)]))
                 for j in range(2, cards_spreadsheet.nrows)])
        flattened_rows = [item for sublist in rows for item in sublist]
        filtered_rows = [item for item in flattened_rows if
                         item.get('irc 16 digits') and item.get('preferred contact phone number')]
        for row in filtered_rows:
            card, created = CardBalance.objects.get_or_create(card_no=row['irc 16 digits'])
            card.phone_no = row['preferred contact phone number']
            card.save()

    def update_cards_with_balance(balance_spreadsheet):
        header = [str(balance_spreadsheet.cell_value(0, i)).lower() for i in range(0, balance_spreadsheet.ncols)]
        rows = [dict(zip(header, [balance_spreadsheet.cell_value(j, i) for i in range(0, balance_spreadsheet.ncols)]))
                for j in range(1, balance_spreadsheet.nrows)]
        for row in rows:
            try:
                card = CardBalance.objects.get(card_no__endswith=row['cardnumber'][-5:])
                card.balance = row.get('last retrieved balance') or None
                card.exp_date = xldate_to_datetime(int(row.get('exp. date')))
                card.status = get_status_code(row.get('cardstatus'))
                card.location = row.get('locationname')
                card.product_name = row.get('productname')
                card.program_name = row.get('programname')
                card.profile_name = row.get('profile first name')
                card.profile_surname = row.get('profile last name')
                card.profile_id = int(row.get('cardholderid'))
                card.save()
            except CardBalance.DoesNotExist:
                pass

    balance_spreadsheet, cards_spreadsheet = get_spreadsheets()
    update_cards_with_phone_number(cards_spreadsheet)
    update_cards_with_balance(balance_spreadsheet)
