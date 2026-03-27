@echo off
title Servidor Local - Checklist Dufrio
echo Iniciando servidor local para evitar erro de PDF...
echo NAO FECHE ESTA JANELA ENQUANTO ESTIVER USANDO O CHECKLIST.
echo.

:: Abre o navegador no endereço local
start http://localhost:8000/checklist-camara.html

:: Inicia o servidor Python
python -m http.server 8000
