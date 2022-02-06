#!/bin/bash
service nginx start
cd imapoFlask
uwsgi --ini /var/www/imapoFlask/imapo.ini
