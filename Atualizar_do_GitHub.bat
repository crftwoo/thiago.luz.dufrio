@echo off
echo ===================================================
echo     SINCRONIZANDO COM O GITHUB (thiago.luz.dufrio)
echo ===================================================
echo.
echo Baixando atualizacoes...
git pull origin main
echo.
echo ===================================================
echo     ATUALIZACAO CONCLUIDA!
echo ===================================================
timeout /t 2 >nul
exit
