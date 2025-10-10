#!/bin/bash

# EduExpress Deployment Script
# This script helps you deploy your project to various platforms

echo "🚀 EduExpress Deployment Helper"
echo "================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - EduExpress project"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Function to deploy to Vercel
deploy_vercel() {
    echo "🌐 Deploying to Vercel..."
    echo "1. Make sure you have a Vercel account"
    echo "2. Install Vercel CLI: npm i -g vercel"
    echo "3. Run: vercel"
    echo "4. Follow the prompts"
    echo ""
    echo "Or visit: https://vercel.com and connect your GitHub repository"
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    echo "1. Visit: https://netlify.com"
    echo "2. Sign up with GitHub"
    echo "3. Click 'New site from Git'"
    echo "4. Choose your repository"
    echo "5. Set publish directory to 'frontend'"
    echo "6. Deploy!"
}

# Function to deploy to GitHub Pages
deploy_github_pages() {
    echo "🌐 Deploying to GitHub Pages..."
    echo "1. Push your code to GitHub:"
    echo "   git remote add origin https://github.com/yourusername/eduexpress.git"
    echo "   git push -u origin main"
    echo ""
    echo "2. Go to repository Settings > Pages"
    echo "3. Source: Deploy from a branch"
    echo "4. Branch: main / frontend"
    echo "5. Save"
    echo ""
    echo "Your site will be available at: https://yourusername.github.io/eduexpress"
}

# Function to setup environment variables
setup_env() {
    echo "🔑 Setting up environment variables..."
    if [ ! -f ".env" ]; then
        cp env.example .env
        echo "✅ Created .env file from template"
        echo "📝 Please edit .env file with your API keys:"
        echo "   - YOUTUBE_API_KEY"
        echo "   - GEMINI_API_KEY"
    else
        echo "✅ .env file already exists"
    fi
}

# Main menu
echo ""
echo "Choose deployment option:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Setup Environment Variables"
echo "5) Show all options"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        deploy_vercel
        ;;
    2)
        deploy_netlify
        ;;
    3)
        deploy_github_pages
        ;;
    4)
        setup_env
        ;;
    5)
        echo ""
        echo "🌐 All Deployment Options:"
        echo "=========================="
        deploy_vercel
        echo ""
        deploy_netlify
        echo ""
        deploy_github_pages
        echo ""
        setup_env
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        ;;
esac

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🎉 Happy deploying!"
