from django.contrib import admin

# Register your models here.
from cards.models import CardBalance


class CardBalanceAdmin(admin.ModelAdmin):
    pass


admin.site.register(CardBalance, CardBalanceAdmin)
