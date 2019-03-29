FROM ubuntu:latest

RUN apt-get update && apt-get install -y --no-install-recommends git

RUN apt-get install -y build-essential python3.6 python3.6-dev python3-pip python3.6-venv

COPY requirements.txt requirements.txt

RUN python3.6 -m pip install pip --upgrade

RUN python3.6 -m pip install -r requirements.txt

COPY app /app
WORKDIR /app
ENTRYPOINT ["python3"]
CMD ["hello.py"]