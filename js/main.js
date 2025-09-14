// Constants
const MAX_ANIMATION_DELAY = 100;
const SCROLL_THRESHOLD = 300;
const LOADING_DURATION = 1500;
const SCREEN_POSITION_RATIO = 1.2;

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart, 'ms');
        }
    }
});

if ('PerformanceObserver' in window) {
    performanceObserver.observe({ entryTypes: ['navigation'] });
}

// Preload critical resources on page load
preloadCriticalResources();

document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation based on current page
    setActiveNavigation();
    
    // Initialize contact form
    initContactForm();
    
    // Hide loading screen after page load
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, LOADING_DURATION);
        }, LOADING_DURATION);
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.highlight-card, .solution-card, .about-content, .service-card, .team-member, .case-study-card, .testimonial-card, .blog-card, .download-card, .module-card, .value-card, .process-step');
    
    function checkScroll() {
        animateElements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / SCREEN_POSITION_RATIO;
            
            if (elementPosition < screenPosition) {
                // Add staggered animation delay
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animate');
                }, index * MAX_ANIMATION_DELAY);
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Smooth reveal for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > SCROLL_THRESHOLD) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Function to set active navigation based on current page
function setActiveNavigation() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('nav a[data-page]');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// Function to determine current page
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename === 'index.html' || filename === '' || filename === 'infotelmm') {
        return 'home';
    } else if (filename === 'about-us.html') {
        return 'about';
    } else if (filename === 'solutions.html') {
        return 'solutions';
    } else if (filename === 'services.html') {
        return 'services';
    } else if (filename === 'contact.html') {
        return 'contact';
    }
    
    return 'home'; // default
}

// Preload critical resources for better performance
function preloadCriticalResources() {
    const criticalImages = [
        'assets/images/logo.svg',
        'assets/images/hero-bg.svg',
        'assets/images/about-preview.svg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Lazy load images with Intersection Observer
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Optimize scroll performance with throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced form validation and API integration
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Name validation
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    // Message validation
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }
    
    // Privacy checkbox validation
    if (fieldName === 'privacy' && field.type === 'checkbox') {
        if (!field.checked) {
            isValid = false;
            errorMessage = 'You must agree to the privacy policy';
        }
    }
    
    // Show/hide error
    if (errorElement) {
        if (isValid) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            field.classList.remove('error');
        } else {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            field.classList.add('error');
        }
    }
    
    return isValid;
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        field.classList.remove('error');
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'company': 'Company Name',
        'email': 'Email Address',
        'phone': 'Phone Number',
        'subject': 'Subject',
        'message': 'Message',
        'privacy': 'Privacy Agreement'
    };
    return labels[fieldName] || fieldName;
}

function validateForm(form) {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    
    // Clear previous messages
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Validate form
    if (!validateForm(form)) {
        showFormError('Please correct the errors above');
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    
    try {
        // Prepare form data for Formspree
        const formData = new FormData(form);
        
        // Send to Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success
            form.reset();
            showFormSuccess('Thank you for your message! We\'ll get back to you within 24 hours.');
            
            // Track conversion (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'contact',
                    event_label: 'formspree_success',
                    value: 1
                });
            }
        } else {
            // Error
            const data = await response.json();
            if (data.errors) {
                showFormError(data.errors.map(error => error.message).join(', '));
            } else {
                showFormError('Failed to send message. Please try again.');
            }
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError('Network error. Please check your connection and try again.');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

function showFormSuccess(message) {
    const successElement = document.getElementById('form-success');
    if (successElement) {
        successElement.querySelector('p').textContent = message;
        successElement.style.display = 'block';
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function showFormError(message) {
    const errorElement = document.getElementById('form-error');
    if (errorElement) {
        errorElement.querySelector('p').textContent = message;
        errorElement.style.display = 'block';
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Enhanced error handling
window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', event.error);
    
    // Send error to analytics service if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: event.error.message,
            fatal: false
        });
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    // Send error to analytics service if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: event.reason.toString(),
            fatal: false
        });
    }
});