@echo off
setlocal EnableDelayedExpansion
echo ===================================================
echo     SALVANDO ALTERACOES NO GITHUB
echo ===================================================
echo.

set /p userMsg="O que voce alterou hoje? (ou de um Enter para pular): "
if "!userMsg!"=="" set userMsg=Atualizacao de Rotina do Sistema

echo.
echo 1. Adicionando arquivos modificados...
git add .
echo.

echo 2. Salvando as versoes...
git config user.name "Thiago Luz"
git config user.email "thiago.luz@dufrio.com.br"
git commit -m "!userMsg!"
echo.

echo 3. Enviando para a nuvem...
git push origin main
echo.

echo ===================================================
echo     TUDO PRONTO! SEUS ARQUIVOS ESTAO NO GITHUB!
echo ===================================================
timeout /t 5 >nul
exit
