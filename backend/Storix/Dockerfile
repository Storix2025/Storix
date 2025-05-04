FROM python:3.11-slim

# Устанавливаем все необходимые системные зависимости
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
       libzbar0 \
       libgl1 \
       libglib2.0-0 \
       libsm6 \
       libxrender1 \
       libxext6 \
       build-essential \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Устанавливаем питоновские зависимости
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Копируем всё приложение
COPY . .

EXPOSE 8000

# На старте выполняем миграции, собираем статику и запускаем Gunicorn
CMD ["sh", "-c", "\
    python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput && \
    gunicorn Storix.wsgi:application --bind 0.0.0.0:8000 \
"]
