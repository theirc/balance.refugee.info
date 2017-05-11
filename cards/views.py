from datetime import datetime

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, ValidationError
from django.views.decorators.csrf import csrf_exempt

from cards.models import CardBalance, Update


class RetrieveBalanceView(APIView):
    @csrf_exempt
    def post(self, request):
        data = request.data
        if data.get('card_no') and data.get('date_of_birth'):
            try:
                card = CardBalance.objects.get(card_no__endswith=data['card_no'][-5:],
                                               date_of_birth=datetime.strptime(data['date_of_birth'], "%d/%m/%Y"))
                return Response({'balance': card.balance})
            except CardBalance.DoesNotExist:
                raise NotFound
        raise ValidationError('Card number or phone number is missing.')


class GetUpdateDateView(APIView):
    def get(self, request):
        update = Update.objects.all().order_by('-date').first()
        if not update:
            return Response({'date': datetime.now().replace(hour=0, minute=0)})
        return Response({'date': update.date})
