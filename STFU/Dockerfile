FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
RUN apt-get update && apt-get install -y binutils libproj-dev gdal-bin
COPY requirements.txt /code/
RUN pip install -r requirements.txt
EXPOSE 80
COPY . /code/