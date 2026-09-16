@echo off
cd /d "%~dp0"
set PORT=8770
if not "%1"=="" set PORT=%1
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  where py >nul 2>nul
  if %ERRORLEVEL% NEQ 0 (
    echo Python not found. Install Python 3 to run the local server.
    exit /b 1
  )
  echo Serving IngredientIQ at http://127.0.0.1:%PORT%/
  py -m http.server %PORT%
) else (
  echo Serving IngredientIQ at http://127.0.0.1:%PORT%/
  python -m http.server %PORT%
)
