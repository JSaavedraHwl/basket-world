@echo off

rem Activar el entorno virtual
call .\myenv\Scripts\activate

rem Lanzar el servidor de Django
python .\myproject\manage.py runserver