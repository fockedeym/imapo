#sudo docker run --rm -it -p 80:80 imapo
FROM python:latest

WORKDIR /var/www
RUN mkdir imapoAngular
RUN mkdir imapoFlask

COPY flask/requirements.txt requirements.txt
RUN apt-get update -y

RUN python3 -m pip install -r requirements.txt
RUN apt-get install nginx -y

COPY ./imapoFront1/dist/imapoFront1/ ./imapoAngular/
COPY ./flask/ ./imapoFlask/

COPY ./imapoNginx /etc/nginx/sites-enabled/default
RUN apt-get install libgl1-mesa-glx -y

COPY dockerrun.sh /usr/local/bin/dockerrun.sh
RUN chmod +x /usr/local/bin/dockerrun.sh
EXPOSE 80
CMD ["dockerrun.sh"]
