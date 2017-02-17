from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, ValidationError

from cards.models import CardBalance


class RetrieveBalanceView(APIView):

    def post(self, request):
        data = request.data
        if data.get('card_no') and data.get('phone_no'):
            try:
                card = CardBalance.objects.get(card_no__endswith=data['card_no'][-5:], phone_no=data['phone_no'])
                return Response({'balance': card.balance})
            except CardBalance.DoesNotExist:
                raise NotFound
        raise ValidationError('Card number or phone number is missing.')
