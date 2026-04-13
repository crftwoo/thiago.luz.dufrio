@echo off
echo ===================================================
echo     SINCRONIZANDO COM O GITHUB (thiago.luz.dufrio)
echo ===================================================
echo.
echo Baixando atualizacoes...
git pull origin main
echo.

:: REGERANDO O LOG LOCAL APOS ATUALIZAR DO GITHUB
git log -1 --format="const LATEST_LOG = { message: '%%s', date: '%%ad', time: '%%H:%%M' };" --date=format:"%%d/%%m/%%Y" > ultimo_log.js
echo ===================================================
echo     ATUALIZACAO CONCLUIDA!
echo ===================================================
timeout /t 2 >nul
exit
