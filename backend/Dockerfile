# syntax=docker/dockerfile:1


FROM python:3.11-slim


RUN apt-get update && \
    apt-get install -y --no-install-recommends libzbar0 build-essential && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /app


COPY . .


RUN pip install --upgrade pip && \
    pip install -r requirements.txt


RUN python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput


EXPOSE 10000
CMD ["gunicorn", "Storix.wsgi", "--bind", "0.0.0.0:10000"]
