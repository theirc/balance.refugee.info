# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-07 17:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CardBalance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_no', models.CharField(blank=True, max_length=16, null=True)),
                ('phone_no', models.CharField(blank=True, max_length=10, null=True)),
                ('balance', models.DecimalField(blank=True, decimal_places=2, max_digits=8, null=True)),
                ('exp_date', models.DateField(blank=True, null=True)),
                ('status', models.IntegerField(blank=True, choices=[(0, 'active'), (1, 'closed'), (2, 'ready')], null=True)),
                ('product_name', models.CharField(blank=True, max_length=255, null=True)),
                ('profile_id', models.CharField(blank=True, max_length=7, null=True)),
            ],
        ),
    ]