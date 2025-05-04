#!/usr/bin/env bash
set -e

# Выполнить миграции
python manage.py migrate --noinput

# Собрать статику
python manage.py collectstatic --noinput

# Создать супер-пользователя (если ещё нет)
python manage.py createsuperuser --noinput || true

# Запустить Gunicorn
exec gunicorn Storix.wsgi:application --bind 0.0.0.0:$PORT
