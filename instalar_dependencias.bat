@echo off


rem Crear el entorno virtual
python -m venv myenv

rem Activar el entorno virtual
call .\myenv\Scripts\activate

rem Instalar los requisitos desde requirements.txt
pip install -r requirements.txt