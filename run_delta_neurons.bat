@echo off
title DELTA NEURONS Full-Stack Server ^& Platform
cd /d "%~dp0backend"

echo =======================================================================
echo          DELTA NEURONS: AI Cognitive Platform ^& Multi-Role Suite
echo       Native Node.js Server + SQLite Database + Offline Auto-Sync
echo =======================================================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in your system PATH!
    echo Please install Node.js from https://nodejs.org or ensure it is in PATH.
    echo.
    pause
    exit /b 1
)

echo [1/2] Launching DELTA NEURONS in your default browser...
start "" "http://localhost:3000"

echo [2/2] Starting Node.js backend server on http://localhost:3000...
echo =======================================================================
echo  IMPORTANT: Keep this window open while using DELTA NEURONS.
echo  To shut down the server, press Ctrl + C or close this window.
echo =======================================================================
echo.

node server.js

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Server encountered an unexpected error.
)

pause
