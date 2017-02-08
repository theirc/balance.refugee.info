import xlrd
import os

from django.http import HttpResponse
from django.views import View


class ImportSpreadsheetView(View):

    def get_spreadsheets(self):
        module_dir = os.path.dirname(__file__)
        balance_path = os.path.join(module_dir, '../cards-balance.xls')
        cards_path = os.path.join(module_dir, '../cards-phone.xlsx')
        balance_spreadsheet = xlrd.open_workbook(filename=balance_path)
        cards_spreadsheet = xlrd.open_workbook(filename=cards_path)
        return balance_spreadsheet, cards_spreadsheet

    def get(self, request, *args, **kwargs):
        balance_spreadsheet, cards_spreadsheet = self.get_spreadsheets()

        message = 'OK'
        return HttpResponse(message, status=200)
