// Contact Page JavaScript
class ContactPage {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.initializeAnimations();
    }

    initializeElements() {
        this.contactForm = document.getElementById('contact-form');
        this.submitBtn = this.contactForm?.querySelector('.submit-btn');
        this.faqItems = document.querySelectorAll('.faq-item');
    }

    bindEvents() {
        // Contact form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // FAQ accordion functionality
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });

        // Form validation on input
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    initializeAnimations() {
        // Animate form elements on scroll
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
        const animatedElements = document.querySelectorAll('.contact-container, .faq-container');
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Animate contact methods
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach((method, index) => {
            method.style.opacity = '0';
            method.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                method.style.transition = 'all 0.5s ease';
                method.style.opacity = '1';
                method.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Handle contact form submission
     * @param {Event} e - Form submit event
     */
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.showLoadingState();

        try {
            // Submit form to the user's email via FormSubmit API
            await this.submitToEmail();
            this.showSuccessMessage();
            this.resetForm();
        } catch (error) {
            this.showErrorMessage('Failed to send message. Please try again.');
        } finally {
            this.hideLoadingState();
        }
    }

    /**
     * Validate the entire form
     * @returns {boolean} True if form is valid
     */
    validateForm() {
        let isValid = true;
        const requiredFields = this.contactForm.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate individual form field
     * @param {HTMLElement} field - Form field element
     * @returns {boolean} True if field is valid
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(field)} is required.`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Name validation
        if (fieldName === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long.';
        }

        // Message validation
        if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    /**
     * Show field error
     * @param {HTMLElement} field - Form field element
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        field.style.borderColor = '#f56565';
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.color = '#f56565';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    /**
     * Clear field error
     * @param {HTMLElement} field - Form field element
     */
    clearFieldError(field) {
        field.style.borderColor = '#e2e8f0';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Get field label text
     * @param {HTMLElement} field - Form field element
     * @returns {string} Field label text
     */
    getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace(/\s+/g, ' ').trim() : field.name;
    }

    /**
     * Toggle FAQ item
     * @param {HTMLElement} item - FAQ item element
     */
    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        if (this.submitBtn) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        if (this.submitBtn) {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }

    /**
     * Submit form to FormSubmit API
     * @returns {Promise} Promise that resolves when the email is sent
     */
    async submitToEmail() {
        const formData = new FormData(this.contactForm);
        // Optional: add a custom subject for the email
        formData.append('_subject', 'New Contact Form Submission - EduExpress');
        
        // Prevent reCAPTCHA for AJAX (if needed, though standard is false)
        formData.append('_captcha', 'false');

        const response = await fetch('https://formsubmit.co/ajax/moddeore@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return await response.json();
    }

    /**
     * Show success message
     */
    showSuccessMessage() {
        this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error)
     */
    showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#f56565'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * Reset form
     */
    resetForm() {
        this.contactForm.reset();
        
        // Clear all field errors
        const errorElements = document.querySelectorAll('.field-error');
        errorElements.forEach(error => error.remove());
        
        // Reset field styles
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(input => {
            input.style.borderColor = '#e2e8f0';
        });
    }
}

// Initialize contact page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactPage = new ContactPage();
    
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

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close FAQ items
        if (e.key === 'Escape') {
            const activeFAQ = document.querySelector('.faq-item.active');
            if (activeFAQ) {
                activeFAQ.classList.remove('active');
            }
        }
    });

    console.log('📧 Contact page initialized!');
    console.log('💡 Tip: Use Escape key to close FAQ items');
});
