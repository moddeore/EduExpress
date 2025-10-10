# API Keys Setup Guide

## Getting Your API Keys

### 1. YouTube Data API v3 Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the YouTube Data API v3:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 2. Google Gemini AI Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 3. Setting Up Your Environment

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit the `.env` file and add your API keys:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

3. Restart the server:
   ```bash
   npm start
   ```

## Testing Without API Keys

The application works with mock data when API keys are missing, so you can test the functionality immediately. However, for real YouTube searches and AI analysis, you'll need valid API keys.

## Troubleshooting

- **YouTube API Quota**: Free tier has daily limits. Check your usage in Google Cloud Console
- **Gemini API Limits**: Free tier has rate limits. Check Google AI Studio for usage
- **CORS Issues**: The server is configured to allow all origins for development

