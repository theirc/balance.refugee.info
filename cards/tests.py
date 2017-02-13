import copy

from decimal import Decimal
from rest_framework.test import APITestCase

from cards.models import CardBalance

VALID_CARD = {
    'card_no': '1000200030004000',
    'phone_no': '0100200300',
    'balance': Decimal(10.00)
}


class RetrieveBalanceAPITest(APITestCase):
    def setUp(self):
        self.url = '/retrieve/'
        CardBalance.objects.create(**VALID_CARD)
        super().setUp()

    def tearDown(self):
        CardBalance.objects.all().delete()

    def test_get_balance_with_correct_data(self):
        data = copy.deepcopy(VALID_CARD)
        del data['balance']
        data['card_no'] = VALID_CARD['card_no'][-5:]
        result = self.client.post(self.url, data, format='json')
        self.assertEqual(result.data['balance'], VALID_CARD['balance'])
        self.assertEqual(result.status_code, 200)

    def test_get_balance_with_incorrect_card_no(self):
        data = copy.deepcopy(VALID_CARD)
        data['card_no'] = '12345'
        result = self.client.post(self.url, data, format='json')
        self.assertEqual(result.status_code, 404)

    def test_get_balance_with_incorrect_phone_no(self):
        data = copy.deepcopy(VALID_CARD)
        data['phone_no'] = '9200300400'
        data['card_no'] = VALID_CARD['card_no'][-5:]
        result = self.client.post(self.url, data, format='json')
        self.assertEqual(result.status_code, 404)

    def test_get_balance_with_missing_data(self):
        data = {}
        result = self.client.post(self.url, data, format='json')
        self.assertEqual(result.status_code, 400)
