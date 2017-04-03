from django.contrib import admin

# Register your models here.
from cards.models import CardBalance, Update


class CardBalanceAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        return [f.name for f in self.model._meta.fields]

    list_display = ('balance', 'card_no', 'phone_no', 'updated_at')
    ordering = ('-balance',)
    search_fields = ['phone_no', 'card_no']


class UpdatesAdmin(admin.ModelAdmin):
    def get_readonly_fields(self, request, obj=None):
        return [f.name for f in self.model._meta.fields]

    list_display = ('date', 'created_count', 'updated_count')

admin.site.register(CardBalance, CardBalanceAdmin)
admin.site.register(Update, UpdatesAdmin)
