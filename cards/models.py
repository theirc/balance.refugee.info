from django.contrib.gis.db import models

CARD_STATUSES = (
    (0, 'active'),
    (1, 'closed'),
    (2, 'ready')
)


class CardBalance(models.Model):
    card_no = models.CharField(unique=True, max_length=16, blank=True, null=True)
    phone_no = models.CharField(max_length=10, blank=True, null=True)
    balance = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    exp_date = models.DateField(blank=True, null=True)
    status = models.IntegerField(choices=CARD_STATUSES, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True),
    product_name = models.CharField(max_length=255, blank=True, null=True)
    program_name = models.CharField(max_length=255, blank=True, null=True),
    profile_name = models.CharField(max_length=255, blank=True, null=True),
    profile_surname = models.CharField(max_length=255, blank=True, null=True),
    profile_id = models.CharField(max_length=7, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True)


class Update(models.Model):
    date = models.DateTimeField(auto_now=True)
    created_count = models.IntegerField()
    updated_count = models.IntegerField()

