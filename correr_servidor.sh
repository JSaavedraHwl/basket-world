#!/bin/bash

# Activar el entorno virtual
source ./myenv/bin/activate

# Lanzar el servidor de Django
python ./myproject/manage.py runserver