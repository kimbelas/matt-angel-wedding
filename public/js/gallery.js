// Gallery Page JavaScript - Optimized

// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const galleryGrid = document.getElementById('gallery-grid');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const lightboxCurrent = document.getElementById('lightbox-current');
const lightboxTotal = document.getElementById('lightbox-total');

// Global variables
let currentLightboxIndex = 0;
let visibleImages = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Show loading screen first
    showLoader();

    // Initialize core features
    setTimeout(() => {
        hideLoader();
        initializeLazyLoading();
        initializeNavigation();
        initializeHeroAnimations();
        initializeGalleryAnimations();
        initializeLightbox();
    }, 1500);
}

// Lazy Loading Implementation
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const parent = img.closest('.gallery-item-inner');

                    // Add loading class for skeleton effect
                    if (parent) parent.classList.add('loading');

                    // Load the image
                    img.src = img.dataset.src;
                    img.classList.add('loading');

                    img.onload = () => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                        if (parent) parent.classList.remove('loading');
                    };

                    img.onerror = () => {
                        img.classList.remove('loading');
                        if (parent) parent.classList.remove('loading');
                    };

                    observer.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.01
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Loading screen functions
function showLoader() {
    if (loader) {
        loader.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideLoader() {
    if (loader) {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// Navigation functionality
function initializeNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', throttle(handleNavbarScroll, 16));

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });

        hamburger.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
}

let lastScrollY = 0;
let isScrollingDown = false;

function handleNavbarScroll() {
    if (!navbar) return;

    const currentScrollY = window.scrollY;
    const scrolled = currentScrollY > 50;

    // Toggle scrolled state
    navbar.classList.toggle('scrolled', scrolled);

    // Determine scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past hero section
        if (!isScrollingDown) {
            isScrollingDown = true;
            navbar.classList.add('navbar-hidden');
            navbar.classList.remove('navbar-visible');
        }
    } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        if (isScrollingDown || currentScrollY <= 100) {
            isScrollingDown = false;
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }
    }

    // Always show navbar at the top
    if (currentScrollY <= 100) {
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
        isScrollingDown = false;
    }

    lastScrollY = currentScrollY;
}

function toggleMobileMenu(forceClose = false) {
    const isOpen = navMenu.classList.contains('open');

    if (forceClose || isOpen) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = 'auto';
        document.body.classList.remove('menu-open');
    } else {
        hamburger.classList.add('active');
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
    }
}

// Hero Animations - Simplified
function initializeHeroAnimations() {
    // Using CSS animations instead of GSAP for better performance
    const heroElements = document.querySelectorAll('.hero-logo, .gallery-hero-title, .gallery-hero-subtitle, .hero-divider');
    heroElements.forEach(el => el.classList.add('animate-in'));
}


function updateVisibleImages() {
    visibleImages = Array.from(galleryItems)
        .map(item => {
            const img = item.querySelector('.gallery-image');
            // Use data-src if src is not yet loaded, or src if already loaded
            return img ? (img.src || img.dataset.src) : null;
        })
        .filter(src => src !== null);

    if (lightboxTotal) {
        lightboxTotal.textContent = visibleImages.length;
    }
}

// Gallery Animations with ScrollTrigger - Optimized
function initializeGalleryAnimations() {
    // No animation, just add visible class immediately
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.add('visible');
    });

    // Use Intersection Observer for lazy loading visibility only
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    galleryItems.forEach(item => observer.observe(item));
}

// Lightbox functionality
function initializeLightbox() {
    if (!lightboxModal) return;

    // Update visible images
    updateVisibleImages();

    // Add click event to each gallery item
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            const allImages = Array.from(galleryItems).map(i => {
                const img = i.querySelector('.gallery-image');
                // Use data-src if src is not yet loaded, or src if already loaded
                return img ? (img.src || img.dataset.src) : null;
            }).filter(src => src !== null);

            openLightbox(allImages.indexOf(allImages[index]));
        });
    });

    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);

    // Click outside to close
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop')) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(index) {
    if (!lightboxModal || !visibleImages.length) return;

    // Get all images
    visibleImages = Array.from(galleryItems).map(item => {
        const img = item.querySelector('.gallery-image');
        return img ? (img.src || img.dataset.src) : null;
    }).filter(src => src !== null);

    currentLightboxIndex = index;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Show modal
    lightboxModal.classList.add('active');

    // Load and display image
    updateLightboxImage();

    // Animate modal opening with CSS
    lightboxModal.style.opacity = '1';

    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.style.transform = 'scale(1)';
        lightboxContent.style.opacity = '1';
    }
}

function closeLightbox() {
    if (!lightboxModal) return;

    // Animate modal closing with CSS
    lightboxModal.style.transition = 'opacity 0.25s ease';
    lightboxModal.style.opacity = '0';

    const lightboxContent = document.querySelector('.lightbox-content');
    if (lightboxContent) {
        lightboxContent.style.transition = 'all 0.25s ease';
        lightboxContent.style.transform = 'scale(0.85)';
        lightboxContent.style.opacity = '0';
    }

    setTimeout(() => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 250);
}

function updateLightboxImage() {
    if (!lightboxImage || !visibleImages[currentLightboxIndex]) return;

    // Update counter
    if (lightboxCurrent) {
        lightboxCurrent.textContent = currentLightboxIndex + 1;
    }
    if (lightboxTotal) {
        lightboxTotal.textContent = visibleImages.length;
    }

    // Fade out and in animation with CSS
    lightboxImage.style.transition = 'opacity 0.2s ease';
    lightboxImage.style.opacity = '0';

    setTimeout(() => {
        lightboxImage.src = visibleImages[currentLightboxIndex];
        lightboxImage.style.opacity = '1';
    }, 200);
}

function showPreviousImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleImages.length;
    updateLightboxImage();
}

function handleLightboxKeyboard(e) {
    if (!lightboxModal?.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            showPreviousImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextImage();
            break;
    }
}

// Utility functions
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
    };
}

// Export functions for global access
window.galleryApp = {
    openLightbox,
    closeLightbox
};