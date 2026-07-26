@echo off
REM 一键本地预览：在项目目录启动服务器并打开浏览器
cd /d "%~dp0"
echo Starting local server at http://localhost:8000 ...
start "" http://localhost:8000
python -m http.server 8000
