@echo off
setlocal EnableExtensions
cd /d "%~dp0src\frontend"

echo ========================================
echo          RIFFLY - SERVIDOR LOCAL
echo ========================================
echo.

echo Pasta da aplicacao:
echo %CD%
echo.

set "PYTHON_CMD="
where python >nul 2>&1
if %errorlevel%==0 set "PYTHON_CMD=python"
if defined PYTHON_CMD goto START_SERVER

where py >nul 2>&1
if %errorlevel%==0 set "PYTHON_CMD=py"
if defined PYTHON_CMD goto START_SERVER

echo ERRO: Python nao foi encontrado no PATH.
echo Instale/ative o Python e tente novamente.
pause
exit /b 1

:START_SERVER
echo Python encontrado: %PYTHON_CMD%
echo.
echo Iniciando servidor em http://127.0.0.1:8000 ...
echo.

start "Riffly Server" cmd /k "cd /d ""%CD%"" && %PYTHON_CMD% -m http.server 8000 --bind 127.0.0.1"

set /a TENTATIVAS=0
:WAIT_SERVER
set /a TENTATIVAS+=1
if %TENTATIVAS% GTR 15 goto SERVER_ERROR

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r=Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/index.html -TimeoutSec 1; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto SERVER_OK

timeout /t 1 /nobreak >nul
goto WAIT_SERVER

:SERVER_OK
echo.
echo ========================================
echo SERVIDOR INICIADO COM SUCESSO!
echo ========================================
echo.
echo Abrindo: http://127.0.0.1:8000/index.html
echo.
start "" "http://127.0.0.1:8000/index.html"
echo Deixe a janela "Riffly Server" aberta durante os testes.
echo.
pause
exit /b 0

:SERVER_ERROR
echo.
echo ========================================
echo ERRO AO INICIAR O SERVIDOR
 echo ========================================
echo.
echo O navegador NAO sera aberto porque o servidor nao respondeu.
echo Veja a janela "Riffly Server" para a mensagem de erro do Python.
echo.
pause
exit /b 1
