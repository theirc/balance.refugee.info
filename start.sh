python manage.py migrate; \
python manage.py collectstatic --noinput; \
gunicorn balance.wsgi --log-file -
