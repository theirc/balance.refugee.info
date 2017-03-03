from django.contrib import admin

# Register your models here.
from cards.models import CardBalance


class CardBalanceAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        return [f.name for f in self.model._meta.fields]

    list_display = ('balance', 'card_no', 'phone_no', 'updated_at')

admin.site.register(CardBalance, CardBalanceAdmin)
