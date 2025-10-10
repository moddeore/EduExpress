# 🚀 Quick Deployment Guide for EduExpress

## 🎯 Easiest Way: Vercel (5 minutes)

### Step 1: Prepare Your Project
```bash
# Make sure you're in your project folder
cd cursor_Youtube

# Initialize Git (if not already done)
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/eduexpress.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Set environment variables:
   - `YOUTUBE_API_KEY`: Your YouTube API key
   - `GEMINI_API_KEY`: Your Gemini AI API key
6. Click "Deploy"

### Step 4: Your Site is Live! 🎉
Your site will be available at: `https://your-project-name.vercel.app`

---

## 🔑 Getting API Keys

### YouTube Data API Key:
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Copy the key

### Google Gemini AI Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Copy the key

---

## 🌐 Alternative: Netlify (Also Free)

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Set publish directory: `frontend`
6. Add environment variables
7. Deploy!

---

## 📱 Test Your Deployment

After deployment, test:
- [ ] Main page loads correctly
- [ ] Search functionality works
- [ ] About page displays
- [ ] Contact page works
- [ ] Mobile responsiveness
- [ ] All animations work

---

## 🎉 You're Done!

Your EduExpress website is now live and accessible to anyone worldwide!

**Next Steps:**
- Share your website URL
- Get feedback from users
- Monitor usage
- Add more features

**Need Help?**
- Check the full [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- Contact: 202401040233@mitaoe.ac.in
- GitHub Issues: [Create an issue](https://github.com/moddeore/eduexpress/issues)
