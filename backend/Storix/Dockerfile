FROM python:3.11-slim


RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      libzbar0 libgl1 libglib2.0-0 libsm6 libxrender1 libxext6 \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt


COPY . .
RUN chmod +x entrypoint.sh

EXPOSE 8000


ENTRYPOINT ["./entrypoint.sh"]
