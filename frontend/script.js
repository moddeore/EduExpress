// Smart Study Video Finder - Frontend JavaScript
class VideoFinder {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.checkApiStatus();
    }

    initializeElements() {
        // Main elements
        this.topicsInput = document.getElementById('topics-input');
        this.searchBtn = document.getElementById('search-btn');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        this.errorMessage = document.getElementById('error-message');
        this.results = document.getElementById('results');
        this.resultsCount = document.getElementById('results-count');
        this.videosContainer = document.getElementById('videos-container');
        
        // Templates
        this.videoCardTemplate = document.getElementById('video-card-template');
        this.topicItemTemplate = document.getElementById('topic-item-template');
        
        // Footer elements
        this.healthCheck = document.getElementById('health-check');
        this.clearResults = document.getElementById('clear-results');
    }

    bindEvents() {
        // Search button click
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        
        // Enter key in textarea
        this.topicsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleSearch();
            }
        });
        
        // Footer actions
        this.healthCheck.addEventListener('click', (e) => {
            e.preventDefault();
            this.checkApiStatus();
        });
        
        this.clearResults.addEventListener('click', (e) => {
            e.preventDefault();
            this.clearAllResults();
        });
    }

    /**
     * Handle the search process
     */
    async handleSearch() {
        const topics = this.parseTopics();
        
        if (topics.length === 0) {
            this.showError('Please enter at least one topic to search for.');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideResults();

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topics })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to search videos');
            }

            const data = await response.json();
            this.displayResults(data.videos);
            
        } catch (error) {
            console.error('Search error:', error);
            this.showError(`Search failed: ${error.message}`);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Parse topics from the input textarea
     * @returns {string[]} Array of cleaned topic strings
     */
    parseTopics() {
        const input = this.topicsInput.value.trim();
        if (!input) return [];
        
        return input
            .split(',')
            .map(topic => topic.trim())
            .filter(topic => topic.length > 0);
    }

    /**
     * Display search results
     * @param {Object[]} videos - Array of video objects
     */

    displayResults(videos) {
        if (!videos || videos.length === 0) {
            this.showError('No videos found for the given topics. Try different keywords.');
            return;
        }

        // Update count with animation
        this.animateCount(this.resultsCount, videos.length);

        // Clear previous results
        this.videosContainer.innerHTML = '';

        videos.forEach((video, index) => {
            const videoCard = this.createVideoCard(video);

            // Safety check
            if (!videoCard) return;

            this.videosContainer.appendChild(videoCard);

            // Staggered animation for cards
            setTimeout(() => {
                videoCard.classList.add('animate-in');
            }, index * 150);
        });

        this.showResults();
    }

    /**
     * Animate count number
     * @param {HTMLElement} element - Count element
     * @param {number} targetValue - Target count value
     */
    animateCount(element, targetValue) {
        const startValue = 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

//chatgpt help
    // displayResults(videos) {
    //     if (videos.length === 0) {
    //         this.showError('No videos found for the given topics. Try different keywords.');
    //         return;
    //     }

    //     this.resultsCount.textContent = videos.length;
    //     this.videosContainer.innerHTML = '';

    //     videos.forEach((video, index) => {
    //         const videoCard = this.createVideoCard(video);
    //         this.videosContainer.appendChild(videoCard);
            
    //         // Animate cards appearing
    //         setTimeout(() => {
    //             videoCard.style.opacity = '0';
    //             videoCard.style.transform = 'translateY(0)';
    //         }, index * 100);
    //     });

    //     this.showResults();
    // }

    /**
     * Create a video card element
     * @param {Object} video - Video object with metadata and coverage data
     * @returns {HTMLElement} Video card element
     */
    createVideoCard(video) {
        const card = this.videoCardTemplate.content.cloneNode(true);
        const cardElement = card.querySelector('.video-card');

        // Fill in video data
        const thumbnailImg = cardElement.querySelector('.thumbnail-img');
        thumbnailImg.src = video.thumbnail;
        thumbnailImg.alt = video.title;

        const videoTitle = cardElement.querySelector('.video-title');
        videoTitle.textContent = video.title;

        const channelName = cardElement.querySelector('.channel-name');
        channelName.textContent = video.channelTitle;

        const coveragePercentage = cardElement.querySelector('.coverage-percentage');
        coveragePercentage.textContent = `${video.coveragePercentage}%`;

        const coverageFill = cardElement.querySelector('.coverage-fill');
        
        // Animate coverage bar
        setTimeout(() => {
            coverageFill.style.width = `${video.coveragePercentage}%`;
        }, 200);

        // Create topic breakdown
        const topicsBreakdown = cardElement.querySelector('.topics-breakdown');
        topicsBreakdown.innerHTML = '';

        if (video.topicCoverage && Array.isArray(video.topicCoverage)) {
            video.topicCoverage.forEach((topic, index) => {
                const topicItem = this.createTopicItem(topic);
                topicsBreakdown.appendChild(topicItem);
                
                // Animate topic bars with delay
                setTimeout(() => {
                    const topicFill = topicItem.querySelector('.topic-fill');
                    if (topicFill) {
                        topicFill.style.width = `${topic.score}%`;
                    }
                }, 400 + (index * 100));
            });
        }

        // YouTube link
        const watchBtn = cardElement.querySelector('.watch-btn');
        watchBtn.href = `https://www.youtube.com/watch?v=${video.videoId}`;

        // Add click animation
        watchBtn.addEventListener('click', (e) => {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        });

        return cardElement;
    }

//ChatGPT help
    // createVideoCard(video) {
    //     const card = this.videoCardTemplate.content.cloneNode(true);
        
    //     // Set initial styles for animation
    //     const cardElement = card.querySelector('.video-card');
    //     cardElement.style.opacity = '0';
    //     cardElement.style.transform = 'translateY(20px)';
    //     cardElement.style.transition = 'all 0.3s ease';

    //     // Fill in video data
    //     const thumbnailImg = card.querySelector('.thumbnail-img');
    //     thumbnailImg.src = video.thumbnail;
    //     thumbnailImg.alt = video.title;

    //     const videoTitle = card.querySelector('.video-title');
    //     videoTitle.textContent = video.title;

    //     const channelName = card.querySelector('.channel-name');
    //     channelName.textContent = video.channelTitle;

    //     const coveragePercentage = card.querySelector('.coverage-percentage');
    //     coveragePercentage.textContent = video.coveragePercentage;

    //     const coverageFill = card.querySelector('.coverage-fill');
    //     coverageFill.style.width = `${video.coveragePercentage}%`;

    //     // Create topic breakdown
    //     const topicsBreakdown = card.querySelector('.topics-breakdown');
    //     topicsBreakdown.innerHTML = '';

    //     video.topicCoverage.forEach(topic => {
    //         const topicItem = this.createTopicItem(topic);
    //         topicsBreakdown.appendChild(topicItem);
    //     });

    //     // Set up YouTube link
    //     const watchBtn = card.querySelector('.watch-btn');
    //     watchBtn.href = `https://www.youtube.com/watch?v=${video.videoId}`;

    //     return card;
    // }

    /**
     * Create a topic item element
     * @param {Object} topic - Topic object with name, covered status, and score
     * @returns {HTMLElement} Topic item element
     */
    createTopicItem(topic) {
        const item = this.topicItemTemplate.content.cloneNode(true);
        
        const topicName = item.querySelector('.topic-name');
        topicName.textContent = topic.topic;

        const topicScore = item.querySelector('.topic-score');
        topicScore.textContent = `${topic.score}%`;

        const topicFill = item.querySelector('.topic-fill');
        topicFill.style.width = `${topic.score}%`;

        // Add visual indicator for covered/uncovered topics
        const topicItem = item.querySelector('.topic-item');
        if (topic.covered) {
            topicItem.classList.add('covered');
        } else {
            topicItem.classList.add('not-covered');
        }

        return item;
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.loading.classList.remove('hidden');
        this.searchBtn.disabled = true;
        this.searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.loading.classList.add('hidden');
        this.searchBtn.disabled = false;
        this.searchBtn.innerHTML = '<i class="fas fa-search"></i> Find Videos';
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.error.classList.remove('hidden');
    }

    /**
     * Hide error message
     */
    hideError() {
        this.error.classList.add('hidden');
    }

    /**
     * Show results section
     */
    showResults() {
        this.results.classList.remove('hidden');
    }

    /**
     * Hide results section
     */
    hideResults() {
        this.results.classList.add('hidden');
    }

    /**
     * Clear all results and reset the form
     */
    clearAllResults() {
        this.hideResults();
        this.hideError();
        this.topicsInput.value = '';
        this.topicsInput.focus();
    }

    /**
     * Check API status and display it
     */
    async checkApiStatus() {
        try {
            const response = await fetch('/api/health');
            const data = await response.json();
            
            const statusMessage = `
                API Status: ${data.status}
                YouTube API: ${data.youtubeApiKey ? '✅ Connected' : '❌ Missing Key'}
                Gemini AI: ${data.geminiApiKey ? '✅ Connected' : '❌ Missing Key'}
            `;
            
            alert(statusMessage);
        } catch (error) {
            alert('Failed to check API status. Please ensure the server is running.');
        }
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new VideoFinder();
    
    // Add some helpful tips and interactions
    const topicsInput = document.getElementById('topics-input');
    
    // Enhanced focus/blur interactions
    topicsInput.addEventListener('focus', () => {
        if (!topicsInput.value) {
            topicsInput.placeholder = 'Tip: Use Ctrl+Enter to search quickly!';
        }
        topicsInput.parentElement.classList.add('focused');
    });
    
    topicsInput.addEventListener('blur', () => {
        if (!topicsInput.value) {
            topicsInput.placeholder = 'e.g., binomial probability, normal distribution, standard deviation';
        }
        topicsInput.parentElement.classList.remove('focused');
    });

    // Add typing animation effect
    topicsInput.addEventListener('input', () => {
        const value = topicsInput.value;
        if (value.length > 0) {
            topicsInput.style.borderColor = '#667eea';
        } else {
            topicsInput.style.borderColor = '#e2e8f0';
        }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to clear results
        if (e.key === 'Escape') {
            app.clearAllResults();
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            topicsInput.focus();
        }
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.header-content, .search-container, .footer, .intro-container');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add scroll-to-top functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animate visual card progress bars on scroll
    const visualCard = document.querySelector('.visual-card');
    if (visualCard) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach((fill, index) => {
                        setTimeout(() => {
                            fill.style.width = fill.style.width;
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        progressObserver.observe(visualCard);
    }

    // Add loading state improvements
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('mouseenter', () => {
        if (!searchBtn.disabled) {
            searchBtn.style.transform = 'translateY(-3px)';
        }
    });

    searchBtn.addEventListener('mouseleave', () => {
        if (!searchBtn.disabled) {
            searchBtn.style.transform = '';
        }
    });
    
    console.log('🎓 EduExpress initialized!');
    console.log('💡 Tip: Use Ctrl+Enter in the textarea to search quickly');
    console.log('⌨️ Keyboard shortcuts: Ctrl+K (focus search), Escape (clear results)');
});

