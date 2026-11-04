@echo off
title Prime-Techmate preview
cd /d "%~dp0"
echo Starting the Prime-Techmate website preview...
echo Keep this window open while you review. Close it to stop the preview.
echo.
if not exist node_modules (
  echo Installing dependencies for the first time. This can take a minute...
  call npm install
)
start "" cmd /c "timeout /t 6 >nul & start http://localhost:3000"
call npm run dev
pause
