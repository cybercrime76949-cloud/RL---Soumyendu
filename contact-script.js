/* ============================================
   CONTACT US PAGE - JAVASCRIPT FUNCTIONALITY
   Modern Interactive Features
   ============================================ */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    attachFormListeners();
    attachWhatsAppListeners();
    initializeScrollAnimations();
});

/* ============================================
   ANIMATED PARTICLES BACKGROUND
   ============================================ */

/**
 * Generate animated particles in the background
 * Creates a dynamic floating effect
 */
function initializeParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and animation duration
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 10;
        const randomDuration = 8 + Math.random() * 5;
        
        particle.style.left = randomLeft + '%';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.animationDelay = randomDelay + 's';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        container.appendChild(particle);
    }
}

/* ============================================
   FORM HANDLING & VALIDATION
   ============================================ */

/**
 * Attach event listeners to form elements
 * Handles input validation and visual feedback
 */
function attachFormListeners() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    // Add focus and blur animations to form inputs
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    // WhatsApp button click handler
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleWhatsAppClick();
    });
    
    // Prevent form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
}

/**
 * Validate individual input fields
 * @param {HTMLElement} input - The input element to validate
 */
function validateInput(input) {
    const value = input.value.trim();
    
    if (input.type === 'email') {
        const isValid = isValidEmail(value);
        updateInputState(input, value && isValid);
    } else {
        updateInputState(input, value.length > 0);
    }
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Update visual state of input based on validity
 * @param {HTMLElement} input - The input element
 * @param {boolean} isValid - Whether input is valid
 */
function updateInputState(input, isValid) {
    if (isValid) {
        input.style.borderColor = 'rgba(37, 211, 102, 0.5)';
    } else {
        input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
}

/* ============================================
   WHATSAPP FUNCTIONALITY
   ============================================ */

/**
 * Handle WhatsApp button click
 * Validates form, shows toast, and redirects to WhatsApp
 */
function handleWhatsAppClick() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const whatsappBtn = document.getElementById('whatsappBtn');
    
    // Get values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Validate all fields
    if (!name || !email || !message) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    
    // Show loading state
    whatsappBtn.disabled = true;
    showToast('Redirecting to WhatsApp...');
    
    // Create WhatsApp message with form data
    const whatsappMessage = encodeURIComponent(
        `Hello, I want to contact you through your website.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Message: ${message}`
    );
    
    // WhatsApp URL (using your provided number)
    const whatsappURL = `https://wa.me/917029709096?text=${whatsappMessage}`;
    
    // Delay redirect for better UX
    setTimeout(() => {
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');
        
        // Reset form after successful submission
        setTimeout(() => {
            resetForm();
            whatsappBtn.disabled = false;
            showToast('Message sent! Check your WhatsApp.', 'success');
        }, 1000);
    }, 800);
}

/**
 * Attach click listeners to WhatsApp buttons
 */
function attachWhatsAppListeners() {
    const floatingBtn = document.getElementById('floatingWhatsapp');
    
    // Floating button already has href, just add click animation
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            // Animation is handled by CSS
        });
    }
}

/**
 * Reset form to initial state
 */
function resetForm() {
    document.getElementById('contactForm').reset();
    
    // Reset input styles
    ['name', 'email', 'message'].forEach(id => {
        const input = document.getElementById(id);
        input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */

/**
 * Show toast notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of toast ('success', 'error', 'info')
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = toast.querySelector('i');
    
    // Clear previous classes
    toast.classList.remove('error', 'success');
    
    // Set message content
    toastMessage.textContent = message;
    
    // Update icon based on type
    toastIcon.className = 'fas ';
    switch(type) {
        case 'success':
            toastIcon.className += 'fa-check-circle';
            break;
        case 'error':
            toastIcon.className += 'fa-exclamation-circle';
            break;
        default:
            toastIcon.className += 'fa-spinner fa-spin';
    }
    
    // Show toast with animation
    toast.classList.add('show');
    
    // Auto hide after 4 seconds (except for loading state)
    if (type !== 'info') {
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    } else {
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Create observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                
                // For feature cards, add stagger animation
                if (entry.target.classList.contains('feature-card')) {
                    const index = Array.from(entry.target.parentElement.children)
                        .indexOf(entry.target);
                    entry.target.style.animationDelay = (index * 0.1) + 's';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.contact-card, .feature-card, .footer').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
   @returns {Function} - Debounced function
 */
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

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   MOBILE MENU & RESPONSIVE FEATURES
   ============================================ */

/**
 * Handle responsive behavior
 */
function initializeResponsive() {
    // Disable hover effects on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile');
    }
    
    // Handle resize events
    window.addEventListener('resize', debounce(() => {
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile && !document.body.classList.contains('mobile')) {
            document.body.classList.add('mobile');
        } else if (!nowMobile && document.body.classList.contains('mobile')) {
            document.body.classList.remove('mobile');
        }
    }, 250));
}

// Initialize responsive behavior
initializeResponsive();

/* ============================================
   KEYBOARD ACCESSIBILITY
   ============================================ */

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function(e) {
    // ESC key to close toast
    if (e.key === 'Escape') {
        const toast = document.getElementById('toast');
        toast.classList.remove('show');
    }
    
    // Enter key to submit form (when in message field)
    if (e.key === 'Enter' && e.ctrlKey) {
        const messageInput = document.getElementById('message');
        if (document.activeElement === messageInput) {
            document.getElementById('whatsappBtn').click();
        }
    }
});

/* ============================================
   PAGE PERFORMANCE OPTIMIZATION
   ============================================ */

/**
 * Lazy load external resources
 */
if ('IntersectionObserver' in window) {
    // Particles are already optimized with CSS animations
    // No additional lazy loading needed for this page
}

/**
 * Preload critical resources
 */
window.addEventListener('load', function() {
    // Page is fully loaded, any heavy operations can be done here
    console.log('Contact Us Page Loaded Successfully');
});

/* ============================================
   ERROR HANDLING & LOGGING
   ============================================ */

/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global Error:', event.error);
    showToast('Something went wrong. Please try again.', 'error');
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled Rejection:', event.reason);
    showToast('An error occurred. Please try again.', 'error');
});

/* ============================================
   ANALYTICS & TRACKING (Optional)
   ============================================ */

/**
 * Track user interactions (modify for your analytics service)
 */
function trackEvent(eventName, eventData = {}) {
    // Replace with your analytics service
    console.log('Event:', eventName, eventData);
    
    // Example with Google Analytics (uncomment if using GA):
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track page view
trackEvent('page_view', {
    page_title: document.title,
    page_path: window.location.pathname
});

// Track button clicks
document.getElementById('whatsappBtn').addEventListener('click', function() {
    trackEvent('whatsapp_button_click', {
        element: 'contact_form_button'
    });
});

document.getElementById('floatingWhatsapp').addEventListener('click', function() {
    trackEvent('whatsapp_button_click', {
        element: 'floating_button'
    });
});

/* ============================================
   SERVICE WORKER REGISTRATION (PWA)
   ============================================ */

/**
 * Register service worker for PWA capabilities
 * Uncomment to enable offline support
 */
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//             console.log('Service Worker registered:', registration);
//         })
//         .catch(error => {
//             console.error('Service Worker registration failed:', error);
//         });
// }

console.log('✨ Contact Us Page Initialized Successfully');
console.log('💬 WhatsApp Integration Active');
console.log('🎨 Modern Animations Enabled');
