@echo off
chcp 65001 >nul
echo ===================================================
echo     SALVANDO ALTERACOES NO GITHUB
echo ===================================================
echo.

echo 1. Adicionando arquivos modificados...
git add .
echo.

echo 2. Salvando as versoes...
git config user.name "Thiago Luz"
git config user.email "thiago.luz@dufrio.com.br"

:: Verifica se o arquivo de mensagem existe
if not exist mensagem_atualizacao.txt (
    echo [ERRO] Arquivo mensagem_atualizacao.txt nao encontrado!
    pause
    exit
)

git commit -F mensagem_atualizacao.txt
if %errorlevel% neq 0 (
    echo.
    echo [AVISO] Nada novo para salvar ou erro no commit.
)

:: GERANDO LOG AUTOMATICO PARA O HUB (index.html)
:: Usando t?cnica de embutir o JSON na data para capturar data e hora corretamente
git log -1 --format="const LATEST_LOG = { message: '%%s', date: '%%ad' };" --date=format:"%%d/%%m/%%Y', time: '%%H:%%M" > ultimo_log.js

:: ADICIONANDO O LOG AO MESMO COMMIT
git add ultimo_log.js
git commit --amend --no-edit >nul 2>&1

echo.
echo 3. Sincronizando com a nuvem (Pull)...
git pull origin main --no-rebase
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao sincronizar com o GitHub. 
    echo Verifique se ha conflitos ou se sua internet esta ativa.
    pause
    exit
)

echo.
echo 4. Enviando arquivos (Push)...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Falha ao enviar para o GitHub.
    pause
    exit
)

echo.
echo ===================================================
echo     TUDO PRONTO! SEUS ARQUIVOS ESTAO NO GITHUB!
echo ===================================================
timeout /t 3 >nul
exit
