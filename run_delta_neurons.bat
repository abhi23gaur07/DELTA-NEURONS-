@echo off
title DELTA NEURONS Full-Stack Server & Platform
echo =======================================================================
echo          DELTA NEURONS: AI Cognitive Platform & Multi-Role Suite
echo       Native Node.js Server + SQLite Database + Offline Auto-Sync
echo =======================================================================
echo.
echo [1/2] Starting backend SQLite REST server on http://localhost:3000...
start "Delta Neurons Server" /B node "%~dp0server.js"

echo [2/2] Launching DELTA NEURONS platform in your default browser...
timeout /t 2 >nul
start "" "http://localhost:3000"

echo.
echo Server active and running on http://localhost:3000.
echo To close the platform, you can close this window.
echo =======================================================================
pause
