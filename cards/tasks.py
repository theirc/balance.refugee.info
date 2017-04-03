import requests
import xlrd
import datetime

from celery import shared_task
from django.conf import settings

from cards.models import CardBalance, CARD_STATUSES, Update


def get_status_code(card_status):
    card_status = card_status.lower()
    filtered = [status[0] for status in CARD_STATUSES if status[1] == card_status]
    if not filtered:
        return None
    return filtered[0]


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
        nonlocal created_count
        header = [str(cards_spreadsheet.cell_value(1, i)).lower() for i in range(0, 3)]
        rows = [dict(zip(header, [cards_spreadsheet.cell_value(j, i) for i in range(0, 3)]))
                for j in range(2, cards_spreadsheet.nrows)]
        for row in rows:
            card, created = CardBalance.objects.get_or_create(
                card_no=round(row['last 5 digits irc card number'])
            )
            card.phone_no = row['preferred contact phone number']
            card.site = row['site name']
            card.save()
            if created:
                created_count += 1

    def update_cards_with_balance(balance_spreadsheet):
        nonlocal updated_count
        header = [str(balance_spreadsheet.cell_value(0, i)).lower() for i in range(0, balance_spreadsheet.ncols)]
        rows = [dict(zip(header, [balance_spreadsheet.cell_value(j, i) for i in range(0, balance_spreadsheet.ncols)]))
                for j in range(1, balance_spreadsheet.nrows)]
        for row in rows:
            try:
                card = CardBalance.objects.get(card_no__endswith=row['cardnumber'][-5:])
                card.balance = row.get('fundamount') or None
                card.exp_date = datetime.datetime.strptime(row.get('exp. date'), '%d-%b-%Y')
                card.status = get_status_code(row.get('cardstatus'))
                card.location = row.get('locationname')
                card.product_name = row.get('productname')
                card.program_name = row.get('programname')
                card.profile_name = row.get('first name')
                card.profile_surname = row.get('last name')
                card.save()
                updated_count += 1
            except CardBalance.DoesNotExist:
                pass

    def create_update_report():
        nonlocal updated_count
        nonlocal created_count
        Update.objects.create(
            updated_count=updated_count,
            created_count=created_count
        )

    created_count = 0
    updated_count = 0
    balance_spreadsheet, cards_spreadsheet = get_spreadsheets()
    update_cards_with_phone_number(cards_spreadsheet)
    update_cards_with_balance(balance_spreadsheet)
    create_update_report()

