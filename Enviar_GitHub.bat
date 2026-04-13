@echo off
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
git commit -F mensagem_atualizacao.txt

:: GERANDO LOG AUTOMATICO PARA O HUB (index.html)
:: Extrai mensagem, data e hora do ultimo commit
git log -1 --format="const LATEST_LOG = { message: '%%s', date: '%%ad', time: '%%H:%%M' };" --date=format:"%%d/%%m/%%Y" > ultimo_log.js

:: ADICIONANDO O LOG AO MESMO COMMIT PARA EVITAR SUJEIRA NO HISTORICO
git add ultimo_log.js
git commit --amend --no-edit
echo.

echo 3. Enviando para a nuvem...
git push origin main
echo.

echo ===================================================
echo     TUDO PRONTO! SEUS ARQUIVOS ESTAO NO GITHUB!
echo ===================================================
timeout /t 3 >nul
exit
