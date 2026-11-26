@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo ========================================
echo       RIFFLY - ETAPA 07
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo ERRO: Node.js nao foi encontrado. Instale o Node.js e tente novamente.
  pause
  exit /b 1
)
where npm >nul 2>&1
if errorlevel 1 (
  echo ERRO: npm nao foi encontrado. Verifique a instalacao do Node.js.
  pause
  exit /b 1
)

if exist "src\backend\node_modules\pg" if exist "src\backend\node_modules\dotenv" goto DEPS_OK
echo Instalando dependencias do backend...
pushd "src\backend"
call npm install
if errorlevel 1 (
  popd
  echo ERRO ao instalar as dependencias.
  pause
  exit /b 1
)
popd
:DEPS_OK

if not exist "src\backend\.env" (
  echo ERRO: arquivo src\backend\.env nao encontrado.
  echo Copie .env.example para .env e informe a senha do PostgreSQL.
  pause
  exit /b 1
)

echo Iniciando API Node.js...
start "Riffly API" cmd /k "cd /d ""%~dp0src\backend"" && npm start"

echo Aguardando conexao com o PostgreSQL...
set /a TENTATIVAS=0
:WAIT_API
set /a TENTATIVAS+=1
if %TENTATIVAS% GTR 25 goto API_ERROR
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r=Invoke-WebRequest -UseBasicParsing http://localhost:3000/api/health -TimeoutSec 2; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto API_OK
timeout /t 2 /nobreak >nul
goto WAIT_API

:API_OK
echo API conectada ao banco!
echo.

where python >nul 2>&1
if %errorlevel%==0 (set "PYTHON_CMD=python") else (set "PYTHON_CMD=py")
%PYTHON_CMD% --version >nul 2>&1
if errorlevel 1 (
  echo ERRO: Python nao foi encontrado.
  pause
  exit /b 1
)

start "Riffly Frontend" cmd /k "cd /d ""%~dp0src\frontend"" && %PYTHON_CMD% -m http.server 8000 --bind 127.0.0.1"
set /a FRONT_TENTATIVAS=0
:WAIT_FRONT
set /a FRONT_TENTATIVAS+=1
if %FRONT_TENTATIVAS% GTR 15 goto FRONT_ERROR
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r=Invoke-WebRequest -UseBasicParsing http://127.0.0.1:8000/index.html -TimeoutSec 1; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 goto FRONT_OK
timeout /t 1 /nobreak >nul
goto WAIT_FRONT

:FRONT_OK
echo.
echo ========================================
echo RIFFLY INICIADO COM SUCESSO!
echo ========================================
echo Frontend: http://127.0.0.1:8000/index.html
echo API:      http://localhost:3000/api
echo Deixe as duas janelas dos servidores abertas.
start "" "http://127.0.0.1:8000/index.html"
pause
exit /b 0

:API_ERROR
echo ERRO: API nao respondeu. Verifique a janela Riffly API, a senha do .env e o PostgreSQL.
pause
exit /b 1

:FRONT_ERROR
echo ERRO: Frontend nao respondeu. Verifique se a porta 8000 esta livre.
pause
exit /b 1
