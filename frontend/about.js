// About Page JavaScript
class AboutPage {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.initializeAnimations();
        this.animateStats();
    }

    initializeElements() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.techCards = document.querySelectorAll('.tech-card');
        this.valueCards = document.querySelectorAll('.value-card');
        this.teamMembers = document.querySelectorAll('.team-member');
    }

    bindEvents() {
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

        // Add social link interactions
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Add click animation
                link.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    link.style.transform = '';
                    window.open(link.href, '_blank'); // Open in a new tab smoothly
                }, 150);
            });
        });

        // Add card hover effects
        this.addCardHoverEffects();
    }

    initializeAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('timeline-item')) {
                        this.animateTimelineItem(entry.target);
                    } else if (entry.target.classList.contains('tech-card')) {
                        this.animateTechCard(entry.target);
                    } else if (entry.target.classList.contains('value-card')) {
                        this.animateValueCard(entry.target);
                    } else if (entry.target.classList.contains('team-member')) {
                        this.animateTeamMember(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll(
            '.mission-container, .story-container, .technology-container, .values-container, .team-container'
        );
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Observe individual cards and items
        const cardElements = document.querySelectorAll('.timeline-item, .tech-card, .value-card, .team-member');
        cardElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Animate statistics numbers
     */
    animateStats() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    /**
     * Animate individual stat number
     * @param {HTMLElement} element - Stat number element
     */
    animateStatNumber(element) {
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        const suffix = text.replace(/[\d.]/g, '');
        
        if (isNaN(number)) return;

        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (number - startValue) * easeOutQuart);
            
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Animate timeline item
     * @param {HTMLElement} item - Timeline item element
     */
    animateTimelineItem(item) {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');
        
        // Animate marker
        setTimeout(() => {
            marker.style.transform = 'scale(1.2)';
            setTimeout(() => {
                marker.style.transform = 'scale(1)';
            }, 200);
        }, 100);

        // Animate content
        setTimeout(() => {
            content.style.transform = 'translateX(10px)';
            setTimeout(() => {
                content.style.transform = 'translateX(0)';
            }, 300);
        }, 200);
    }

    /**
     * Animate tech card
     * @param {HTMLElement} card - Tech card element
     */
    animateTechCard(card) {
        const icon = card.querySelector('.tech-icon');
        const features = card.querySelectorAll('.tech-feature');
        
        // Animate icon
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 100);

        // Animate features
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateY(-5px)';
                setTimeout(() => {
                    feature.style.transform = 'translateY(0)';
                }, 200);
            }, 200 + (index * 100));
        });
    }

    /**
     * Animate value card
     * @param {HTMLElement} card - Value card element
     */
    animateValueCard(card) {
        const icon = card.querySelector('.value-icon');
        
        // Animate icon with bounce effect
        setTimeout(() => {
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 150);
            }, 150);
        }, 100);
    }

    /**
     * Animate team member
     * @param {HTMLElement} member - Team member element
     */
    animateTeamMember(member) {
        const avatar = member.querySelector('.member-avatar');
        const socialLinks = member.querySelectorAll('.social-link');
        
        // Animate avatar
        setTimeout(() => {
            avatar.style.transform = 'scale(1.1)';
            setTimeout(() => {
                avatar.style.transform = 'scale(1)';
            }, 300);
        }, 100);

        // Animate social links
        socialLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.transform = 'translateY(-3px)';
                setTimeout(() => {
                    link.style.transform = 'translateY(0)';
                }, 200);
            }, 200 + (index * 100));
        });
    }

    /**
     * Add card hover effects
     */
    addCardHoverEffects() {
        // Mission stats hover effects
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const number = item.querySelector('.stat-number');
                number.style.transform = 'scale(1.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                const number = item.querySelector('.stat-number');
                number.style.transform = 'scale(1)';
            });
        });

        // Learning path step hover effects
        const pathSteps = document.querySelectorAll('.path-step');
        pathSteps.forEach(step => {
            step.addEventListener('mouseenter', () => {
                const icon = step.querySelector('.step-icon');
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            });
            
            step.addEventListener('mouseleave', () => {
                const icon = step.querySelector('.step-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Timeline item hover effects
        this.timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const marker = item.querySelector('.timeline-marker');
                marker.style.transform = 'scale(1.2)';
                marker.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            });
            
            item.addEventListener('mouseleave', () => {
                const marker = item.querySelector('.timeline-marker');
                marker.style.transform = 'scale(1)';
                marker.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
            });
        });
    }

    /**
     * Add parallax effect to background shapes
     */
    addParallaxEffect() {
        const shapes = document.querySelectorAll('.bg-shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    /**
     * Add typing effect to mission description
     */
    addTypingEffect() {
        const description = document.querySelector('.mission-description');
        if (!description) return;

        const text = description.textContent;
        description.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                description.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };

        // Start typing effect when mission section comes into view
        const missionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    missionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        missionObserver.observe(description);
    }
}

// Initialize about page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const aboutPage = new AboutPage();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') === '#') return; // Skip empty anchors
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('📖 About page initialized!');
    console.log('💡 Tip: Use Escape key to scroll to top');
    console.log('🎯 Scroll through the page to see animations');
});
