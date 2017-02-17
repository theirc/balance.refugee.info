from __future__ import absolute_import

import os
from datetime import timedelta

from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'balance.settings')

app = Celery('balance')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()


app.conf.beat_schedule = {
    # Executes at midnight and noon
    'import-spreadsheets': {
        'task': 'cards.tasks.import_spreadsheets',
        'schedule': crontab(minute=0, hour='*/12'),
    }
}
