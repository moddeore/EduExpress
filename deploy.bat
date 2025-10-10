@echo off
echo 🚀 EduExpress Deployment Helper
echo ================================

REM Check if git is initialized
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit - EduExpress project"
    echo ✅ Git repository initialized
) else (
    echo ✅ Git repository already exists
)

echo.
echo Choose deployment option:
echo 1) Vercel (Recommended)
echo 2) Netlify
echo 3) GitHub Pages
echo 4) Setup Environment Variables
echo 5) Show all options
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto github
if "%choice%"=="4" goto env
if "%choice%"=="5" goto all
goto invalid

:vercel
echo 🌐 Deploying to Vercel...
echo 1. Make sure you have a Vercel account
echo 2. Install Vercel CLI: npm i -g vercel
echo 3. Run: vercel
echo 4. Follow the prompts
echo.
echo Or visit: https://vercel.com and connect your GitHub repository
goto end

:netlify
echo 🌐 Deploying to Netlify...
echo 1. Visit: https://netlify.com
echo 2. Sign up with GitHub
echo 3. Click 'New site from Git'
echo 4. Choose your repository
echo 5. Set publish directory to 'frontend'
echo 6. Deploy!
goto end

:github
echo 🌐 Deploying to GitHub Pages...
echo 1. Push your code to GitHub:
echo    git remote add origin https://github.com/yourusername/eduexpress.git
echo    git push -u origin main
echo.
echo 2. Go to repository Settings ^> Pages
echo 3. Source: Deploy from a branch
echo 4. Branch: main / frontend
echo 5. Save
echo.
echo Your site will be available at: https://yourusername.github.io/eduexpress
goto end

:env
echo 🔑 Setting up environment variables...
if not exist ".env" (
    copy env.example .env
    echo ✅ Created .env file from template
    echo 📝 Please edit .env file with your API keys:
    echo    - YOUTUBE_API_KEY
    echo    - GEMINI_API_KEY
) else (
    echo ✅ .env file already exists
)
goto end

:all
echo.
echo 🌐 All Deployment Options:
echo ==========================
call :vercel
echo.
call :netlify
echo.
call :github
echo.
call :env
goto end

:invalid
echo ❌ Invalid choice. Please run the script again.
goto end

:end
echo.
echo 📚 For detailed instructions, see DEPLOYMENT_GUIDE.md
echo 🎉 Happy deploying!
pause
