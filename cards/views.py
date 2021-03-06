from datetime import datetime

from django.utils.decorators import method_decorator
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, ValidationError
from django.views.decorators.csrf import csrf_exempt

from balance.auth import CsrfExemptSessionAuthentication
from cards.models import CardBalance, Update


@method_decorator(csrf_exempt, name='dispatch')
class RetrieveBalanceView(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request):
        data = request.data
        if data.get('irc_no') and data.get('date_of_birth'):
            try:
                card = CardBalance.objects.get(irc_no=data['irc_no'],
                                               date_of_birth=datetime.strptime(data['date_of_birth'], "%d/%m/%Y"))
                return Response({'balance': card.balance})
            except CardBalance.DoesNotExist:
                raise NotFound
        raise ValidationError('IRC number or Date  of Birth is missing.')


class GetUpdateDateView(APIView):
    def get(self, request):
        update = Update.objects.all().order_by('-date').first()
        if not update:
            return Response({'date': datetime.now().replace(hour=0, minute=0)})
        return Response({'date': update.date})
