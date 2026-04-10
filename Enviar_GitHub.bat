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
echo.

echo 3. Enviando para a nuvem...
git push origin main
echo.

echo ===================================================
echo     TUDO PRONTO! SEUS ARQUIVOS ESTAO NO GITHUB!
echo ===================================================
timeout /t 3 >nul
exit
