#!/bin/bash

# Crear el entorno virtual
python3 -m venv myenv

# Activar el entorno virtual
source ./myenv/bin/activate

# Instalar los requisitos desde requirements.txt
pip install -r requirements.txt