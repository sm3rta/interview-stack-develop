FROM python:3.8-buster

WORKDIR /api.products

RUN apt-get update
RUN apt-get -y install libmariadb3 libmariadb-dev

COPY requirements.txt requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5002

COPY . .
CMD [ "python3", "-m", "app"]