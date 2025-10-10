const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Mock data for testing when API keys are missing
const mockVideos = [
  {
    title: "Understanding Binomial & Normal Distribution",
    videoId: "abc123",
    thumbnail: "https://img.youtube.com/vi/abc123/hqdefault.jpg",
    channelTitle: "MathConcepts",
    coveragePercentage: 82,
    topicCoverage: [
      { topic: "binomial probability", covered: true, score: 90 },
      { topic: "normal distribution", covered: true, score: 75 },
      { topic: "standard deviation", covered: false, score: 0 }
    ]
  },
  {
    title: "Statistics Fundamentals: Mean, Median, Mode",
    videoId: "def456",
    thumbnail: "https://img.youtube.com/vi/def456/hqdefault.jpg",
    channelTitle: "StatsExplained",
    coveragePercentage: 45,
    topicCoverage: [
      { topic: "binomial probability", covered: false, score: 0 },
      { topic: "normal distribution", covered: false, score: 0 },
      { topic: "standard deviation", covered: true, score: 45 }
    ]
  },
  {
    title: "Complete Guide to Probability Distributions",
    videoId: "ghi789",
    thumbnail: "https://img.youtube.com/vi/ghi789/hqdefault.jpg",
    channelTitle: "ProbabilityPro",
    coveragePercentage: 95,
    topicCoverage: [
      { topic: "binomial probability", covered: true, score: 95 },
      { topic: "normal distribution", covered: true, score: 90 },
      { topic: "standard deviation", covered: true, score: 100 }
    ]
  }
];

/**
 * Search YouTube for videos related to the given topics
 * @param {string[]} topics - Array of topics to search for
 * @returns {Promise<Object[]>} Array of video objects from YouTube API
 */
async function searchYouTubeVideos(topics) {
  if (!process.env.YOUTUBE_API_KEY) {
    console.log('YouTube API key not found, using mock data');
    return mockVideos;
  }

  try {
    // Create search query from topics
    const query = topics.join(' OR ');
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 10,
        order: 'relevance',
        key: process.env.YOUTUBE_API_KEY
      }
    });

    return response.data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description
    }));
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    throw new Error('Failed to search YouTube videos');
  }
}

/**
 * Analyze video content using Gemini AI to determine topic coverage
 * @param {Object} video - Video object with title, description, etc.
 * @param {string[]} topics - Array of topics to analyze for
 * @returns {Promise<Object>} Coverage analysis results
 */
async function analyzeVideoCoverage(video, topics) {
  if (!process.env.GEMINI_API_KEY) {
    console.log('Gemini API key not found, using mock analysis');
    // Return mock analysis based on video title
    const mockAnalysis = {
      coveragePercentage: Math.floor(Math.random() * 40) + 30, // 30-70%
      topicCoverage: topics.map(topic => ({
        topic,
        covered: video.title.toLowerCase().includes(topic.toLowerCase().split(' ')[0]),
        score: video.title.toLowerCase().includes(topic.toLowerCase().split(' ')[0]) 
          ? Math.floor(Math.random() * 40) + 60 
          : Math.floor(Math.random() * 20)
      }))
    };
    return mockAnalysis;
  }

  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Analyze this YouTube video for topic coverage:

Video Title: "${video.title}"
Video Description: "${video.description || 'No description available'}"
Channel: "${video.channelTitle}"

Topics to analyze: ${topics.join(', ')}

Please provide a JSON response with:
1. overallCoveragePercentage: A number 0-100 indicating how well this video covers the requested topics overall
2. topicCoverage: An array of objects, each containing:
   - topic: the exact topic name
   - covered: boolean indicating if this topic is covered
   - score: number 0-100 indicating how well this specific topic is covered

Example format:
{
  "overallCoveragePercentage": 75,
  "topicCoverage": [
    {"topic": "binomial probability", "covered": true, "score": 80},
    {"topic": "normal distribution", "covered": true, "score": 70},
    {"topic": "standard deviation", "covered": false, "score": 0}
  ]
}

Only return valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    const analysis = JSON.parse(text);
    
    return {
      coveragePercentage: analysis.overallCoveragePercentage,
      topicCoverage: analysis.topicCoverage
    };
  } catch (error) {
    console.error('Gemini AI error:', error.message);
    // Fallback to mock analysis
    return {
      coveragePercentage: Math.floor(Math.random() * 40) + 30,
      topicCoverage: topics.map(topic => ({
        topic,
        covered: video.title.toLowerCase().includes(topic.toLowerCase().split(' ')[0]),
        score: video.title.toLowerCase().includes(topic.toLowerCase().split(' ')[0]) 
          ? Math.floor(Math.random() * 40) + 60 
          : Math.floor(Math.random() * 20)
      }))
    };
  }
}

/**
 * Main search endpoint
 * POST /api/search
 * Body: { topics: string[] }
 */
app.post('/api/search', async (req, res) => {
  try {
    const { topics } = req.body;
    
    if (!topics || !Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ 
        error: 'Please provide an array of topics to search for' 
      });
    }

    console.log('Searching for topics:', topics);

    // Step 1: Search YouTube for videos
    const videos = await searchYouTubeVideos(topics);
    console.log(`Found ${videos.length} videos`);

    // Step 2: Analyze each video for topic coverage
    const analyzedVideos = [];
    for (const video of videos) {
      try {
        const analysis = await analyzeVideoCoverage(video, topics);
        analyzedVideos.push({
          ...video,
          coveragePercentage: analysis.coveragePercentage,
          topicCoverage: analysis.topicCoverage
        });
      } catch (error) {
        console.error(`Error analyzing video ${video.videoId}:`, error.message);
        // Include video with default analysis
        analyzedVideos.push({
          ...video,
          coveragePercentage: 0,
          topicCoverage: topics.map(topic => ({
            topic,
            covered: false,
            score: 0
          }))
        });
      }
    }

    // Step 3: Sort by coverage percentage (highest first)
    analyzedVideos.sort((a, b) => b.coveragePercentage - a.coveragePercentage);

    res.json({ videos: analyzedVideos });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ 
      error: 'Failed to search videos. Please try again.' 
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    youtubeApiKey: !!process.env.YOUTUBE_API_KEY,
    geminiApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

/**
 * Serve the main frontend page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Smart Study Video Finder server running on port ${PORT}`);
  console.log(`📱 Frontend available at: http://localhost:${PORT}`);
  console.log(`🔧 API endpoints:`);
  console.log(`   POST /api/search - Search for videos`);
  console.log(`   GET  /api/health - Health check`);
  
  if (!process.env.YOUTUBE_API_KEY) {
    console.log(`⚠️  YouTube API key not found - using mock data`);
  }
  if (!process.env.GEMINI_API_KEY) {
    console.log(`⚠️  Gemini API key not found - using mock analysis`);
  }
});

