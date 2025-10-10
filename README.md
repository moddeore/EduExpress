# EduExpress - AI-Powered Educational Video Discovery

A modern web application that helps students find the most relevant educational YouTube videos using AI technology.

## 🚀 Features

- **Smart Search**: AI-powered topic matching
- **Coverage Analysis**: Detailed breakdown of video content
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, professional interface
- **Real-time Results**: Instant video recommendations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express
- **APIs**: YouTube Data API v3, Google Gemini AI
- **Styling**: Custom CSS with animations
- **Icons**: Font Awesome

## 📁 Project Structure

```
eduexpress/
├── frontend/
│   ├── index.html          # Main page
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── style.css          # Main stylesheet
│   ├── script.js          # Main JavaScript
│   ├── contact.js         # Contact page JS
│   ├── about.js           # About page JS
│   └── _redirects        # Netlify redirects
├── server.js              # Backend server
├── package.json           # Dependencies
├── vercel.json           # Vercel config
├── firebase.json         # Firebase config
└── DEPLOYMENT_GUIDE.md  # Deployment instructions
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- YouTube Data API key
- Google Gemini AI API key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/eduexpress.git
   cd eduexpress
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

4. **Run locally:**
   ```bash
   npm start
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Quick Deploy Options:

1. **Vercel** (Recommended):
   - Connect GitHub repository
   - Automatic deployment
   - Free tier available

2. **Netlify**:
   - Drag & drop deployment
   - Form handling included
   - Free tier available

3. **GitHub Pages**:
   - Simple static hosting
   - Integrated with GitHub
   - Completely free

## 🔑 API Keys Setup

### YouTube Data API
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API key)
5. Add to environment variables

### Google Gemini AI
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to environment variables

## 📱 Features Overview

### Main Page (`index.html`)
- AI-powered video search
- Real-time results
- Coverage analysis
- Responsive design

### About Page (`about.html`)
- Company mission
- Technology stack
- Team information
- Interactive timeline

### Contact Page (`contact.html`)
- Contact form
- FAQ section
- Multiple contact methods
- Form validation

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f39c12;
}
```

### Content
- Update company information in HTML files
- Modify team details in `about.html`
- Customize contact information in `contact.html`

## 🔧 Development

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Test locally
npm test
```

### Code Structure
- **Modular JavaScript**: Separate files for different pages
- **Responsive CSS**: Mobile-first design approach
- **Clean HTML**: Semantic markup with accessibility

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Mobile Optimized**: Responsive design
- **Fast Loading**: Optimized assets
- **SEO Friendly**: Proper meta tags

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mod Deore**
- LinkedIn: [mod-deore](https://www.linkedin.com/in/mod-deore-836504345)
- GitHub: [moddeore](https://github.com/moddeore)
- Email: 202401040233@mitaoe.ac.in

## 🙏 Acknowledgments

- YouTube Data API for video data
- Google Gemini AI for intelligent analysis
- Font Awesome for icons
- Inter font family for typography

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Contact via email: 202401040233@mitaoe.ac.in
- Join our community: [WhatsApp Group](https://chat.whatsapp.com/D3XtRmYSAK835Ly918klxZ)

---

**Made with ❤️ for students worldwide**