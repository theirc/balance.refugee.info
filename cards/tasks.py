import requests
import xlrd
import datetime
import csv

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
        dob_spreadsheet_file = requests.get(settings.DATE_OF_BIRTH_FILE_URL, stream=True)
        balance_spreadsheet = csv.reader(balance_spreadsheet_file.content.decode('utf-8').split('\r\n'))
        dob_spreadsheet = xlrd.open_workbook(
            filename=None,
            file_contents=dob_spreadsheet_file.content
        ).sheet_by_index(0)
        return balance_spreadsheet, dob_spreadsheet

    def update_cards_with_dob(dob_spreadsheet):
        nonlocal created_count
        header = [str(dob_spreadsheet.cell_value(1, i)).lower() for i in range(0, 5)]
        rows = [dict(zip(header, [dob_spreadsheet.cell_value(j, i) for i in range(0, 5)]))
                for j in range(2, dob_spreadsheet.nrows)]
        for row in rows:
            if not row.get('new irc number') or not row.get('date of birth'):
                continue
            card, created = CardBalance.objects.get_or_create(
                irc_no=str(round(row['new irc number'])).zfill(4)
            )
            if isinstance(row['date of birth'], str):
                card.date_of_birth = row['date of birth']
            else:
                card.date_of_birth = datetime.datetime(*xlrd.xldate_as_tuple(row['date of birth'], 0))
            card_no = row.get('cardholder id')
            card.card_no = round(card_no) if isinstance(card_no, float) else card_no
            card.save()
            if created:
                created_count += 1

    def update_cards_with_balance(balance):
        nonlocal updated_count
        balance_spreadsheet = list(balance)
        header = balance_spreadsheet.pop(0)
        rows = [dict(zip(header, [balance_spreadsheet[j][i] for i in range(0, len(balance_spreadsheet[j]))]))
                for j in range(0, len(balance_spreadsheet))]
        for row in rows:
            try:
                card = CardBalance.objects.get(card_no=row.get(' CardholderID', '').lstrip('\''))
                card.balance = row.get(' Available Balance') or None
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
    balance_spreadsheet, dob_spreadsheet = get_spreadsheets()
    update_cards_with_dob(dob_spreadsheet)
    update_cards_with_balance(balance_spreadsheet)
    create_update_report()

