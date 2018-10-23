@echo off


IF ERRORLEVEL 2 GOTO ERROR

xcopy C:\xampp\htdocs\barber "C:\Users\prosoft\barberApp\www" /E /I /Y /exclude:exclusion.txt
echo Proceso Completado

pause

exit

:ERROR
pause