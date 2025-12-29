:: GRC Advisory System - Setup and Verification Script
:: This script checks your environment and sets up everything needed

@echo off
echo ============================================
echo GRC ADVISORY SYSTEM - SETUP VERIFICATION
echo ============================================
echo.

:: Check Node.js
echo [1/6] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js NOT installed
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
) else (
    node --version
    echo ✅ Node.js installed
)
echo.

:: Check npm
echo [2/6] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm NOT installed
    pause
    exit /b 1
) else (
    npm --version
    echo ✅ npm installed
)
echo.

:: Check if node_modules exists
echo [3/6] Checking dependencies...
if exist "node_modules\" (
    echo ✅ Dependencies installed
) else (
    echo ⚠️  Dependencies not found, installing...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
)
echo.

:: Check Ollama
echo [4/6] Checking Ollama...
ollama --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Ollama NOT installed
    echo.
    echo Please install Ollama:
    echo   1. Go to: https://ollama.com/download
    echo   2. Download Windows installer
    echo   3. Run installer
    echo   4. Restart this script
    pause
    exit /b 1
) else (
    ollama --version
    echo ✅ Ollama installed
)
echo.

:: Check for Llama 3.3:70b
echo [5/6] Checking for Llama 3.3:70b model...
ollama list | findstr /C:"llama3.3:70b" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Llama 3.3:70b NOT found
    echo.
    echo This model is required for AI-powered report generation.
    echo Download size: ~42GB (one-time)
    echo.
    set /p DOWNLOAD="Download now? This will take 15-60 minutes depending on internet speed (y/n): "
    if /i "%DOWNLOAD%"=="y" (
        echo.
        echo Downloading Llama 3.3:70b... Please wait...
        echo This may take a while. You can check progress.
        echo.
        ollama pull llama3.3:70b
        if %errorlevel% neq 0 (
            echo ❌ Failed to download model
            pause
            exit /b 1
        )
        echo ✅ Llama 3.3:70b downloaded successfully
    ) else (
        echo.
        echo ⚠️  Skipped model download
        echo You can download later with: ollama pull llama3.3:70b
    )
) else (
    echo ✅ Llama 3.3:70b model found
)
echo.

:: Verify all source files exist
echo [6/6] Verifying code files...
set ALL_FILES_EXIST=1

if not exist "src\logic\aiEngine.js" (
    echo ❌ Missing: src\logic\aiEngine.js
    set ALL_FILES_EXIST=0
)
if not exist "src\logic\benchmarks.js" (
    echo ❌ Missing: src\logic\benchmarks.js
    set ALL_FILES_EXIST=0
)
if not exist "src\logic\constants.js" (
    echo ❌ Missing: src\logic\constants.js
    set ALL_FILES_EXIST=0
)
if not exist "src\logic\grcEngine.js" (
    echo ❌ Missing: src\logic\grcEngine.js
    set ALL_FILES_EXIST=0
)
if not exist "src\logic\scoringFramework.js" (
    echo ❌ Missing: src\logic\scoringFramework.js
    set ALL_FILES_EXIST=0
)
if not exist "src\pages\Assessment.jsx" (
    echo ❌ Missing: src\pages\Assessment.jsx
    set ALL_FILES_EXIST=0
)
if not exist "src\pages\Report.jsx" (
    echo ❌ Missing: src\pages\Report.jsx
    set ALL_FILES_EXIST=0
)

if %ALL_FILES_EXIST%==1 (
    echo ✅ All code files present
) else (
    echo ❌ Some files are missing
    pause
    exit /b 1
)
echo.

:: Summary
echo ============================================
echo SETUP VERIFICATION COMPLETE
echo ============================================
echo.
echo Your environment is ready! 🎉
echo.
echo NEXT STEPS:
echo   1. Start dev server: npm run dev
echo   2. Open browser: http://localhost:5173/
echo   3. Complete the 12-step assessment
echo   4. Generate AI-powered report (10-30 sec)
echo.
echo TIPS:
echo   - First AI generation may take 30-60 seconds (model loading)
echo   - Subsequent generations: 10-30 seconds
echo   - Try different industries to see scoring differences
echo.
pause
