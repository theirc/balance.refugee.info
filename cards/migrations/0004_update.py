# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-08 10:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0003_cardbalance_updated_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='Update',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now=True)),
                ('created_count', models.IntegerField()),
                ('updated_count', models.IntegerField()),
            ],
        ),
    ]