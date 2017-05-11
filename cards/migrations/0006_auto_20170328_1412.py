# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-28 14:12
from __future__ import unicode_literals

from django.db import migrations
from django.db.models.functions import Length

from cards.models import CardBalance


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0005_cardbalance_site'),
    ]

    def delete_old_type_entries(apps, schema_editor):
        CardBalance.objects.annotate(card_no_length=Length('card_no')).filter(card_no_length__gt=5).delete()

    operations = [
        migrations.RunPython(delete_old_type_entries)

    ]
