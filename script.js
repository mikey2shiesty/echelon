// Echelon Realty - Interactive JavaScript

// Sydney suburbs data for autocomplete
const sydneySuburbs = [
    'Bondi', 'Bondi Beach', 'Bondi Junction', 'Bronte', 'Clovelly', 'Coogee',
    'Double Bay', 'Dover Heights', 'Paddington', 'Point Piper', 'Rose Bay',
    'Surry Hills', 'Potts Point', 'Darlinghurst', 'Kings Cross', 'Woollahra',
    'Bellevue Hill', 'Vaucluse', 'Watsons Bay', 'Tamarama', 'Randwick',
    'Kensington', 'Maroubra', 'Mascot', 'Alexandria', 'Waterloo', 'Zetland',
    'Newtown', 'Glebe', 'Annandale', 'Leichhardt', 'Balmain', 'Birchgrove',
    'Rozelle', 'Pyrmont', 'Ultimo', 'Sydney CBD', 'The Rocks', 'Circular Quay',
    'Mosman', 'Neutral Bay', 'Cremorne', 'Cammeray', 'North Sydney', 'Milsons Point',
    'Kirribilli', 'McMahons Point', 'Waverton', 'Wollstonecraft', 'Artarmon',
    'Chatswood', 'Lane Cove', 'Greenwich', 'Hunters Hill', 'Woolwich',
    'Manly', 'Dee Why', 'Brookvale', 'Frenchs Forest', 'Warringah', 'Avalon',
    'Palm Beach', 'Whale Beach', 'Collaroy', 'Narrabeen', 'Mona Vale'
];

// DOM Elements
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');
const suburbInput = document.getElementById('suburb-input');
const autocompleteDropdown = document.getElementById('autocomplete');
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const particlesContainer = document.getElementById('particles');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initParticleSystem();
    initScrollAnimations();
    initSuburbAutocomplete();
    initMobileMenu();
    initHeadlineAnimation();
    initSearchWidget();
    initPropertyCards();
    initCarousel();
    initStatsCounter();
    initPropertyHearts();
});

// Custom Cursor
function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor movement
    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
        cursorFollower.style.transform = `translate(${followerX - 15}px, ${followerY - 15}px)`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, input, select, .nav-link');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Particle System
function initParticleSystem() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random starting position along bottom
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        particlesContainer.appendChild(particle);

        // Remove particle after animation
        particle.addEventListener('animationend', () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
    }

    // Create initial particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createParticle(), i * 2000);
    }

    // Continue creating particles
    setInterval(createParticle, 3000);
}

// Scroll Animations
function initScrollAnimations() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Navbar background on scroll
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Parallax effect on hero video
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Suburb Autocomplete
function initSuburbAutocomplete() {
    let selectedIndex = -1;

    suburbInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        autocompleteDropdown.innerHTML = '';
        selectedIndex = -1;

        if (query.length > 0) {
            const matches = sydneySuburbs.filter(suburb =>
                suburb.toLowerCase().includes(query)
            ).slice(0, 6);

            if (matches.length > 0) {
                matches.forEach((suburb, index) => {
                    const item = document.createElement('div');
                    item.classList.add('autocomplete-item');
                    item.textContent = suburb;
                    item.addEventListener('click', () => {
                        suburbInput.value = suburb;
                        autocompleteDropdown.classList.remove('active');
                    });
                    autocompleteDropdown.appendChild(item);
                });
                autocompleteDropdown.classList.add('active');
            } else {
                autocompleteDropdown.classList.remove('active');
            }
        } else {
            autocompleteDropdown.classList.remove('active');
        }
    });

    // Keyboard navigation for autocomplete
    suburbInput.addEventListener('keydown', function(e) {
        const items = autocompleteDropdown.querySelectorAll('.autocomplete-item');

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && items[selectedIndex]) {
                suburbInput.value = items[selectedIndex].textContent;
                autocompleteDropdown.classList.remove('active');
            }
        } else if (e.key === 'Escape') {
            autocompleteDropdown.classList.remove('active');
            selectedIndex = -1;
        }
    });

    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    // Close autocomplete when clicking outside
    document.addEventListener('click', function(e) {
        if (!suburbInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
            autocompleteDropdown.classList.remove('active');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle swipe gestures on mobile
    if (window.innerWidth <= 768) {
        let startX = 0;
        let startY = 0;

        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            // Swipe right to close mobile menu
            if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 50 && mobileMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Headline Animation
function initHeadlineAnimation() {
    const words = document.querySelectorAll('.headline-word');
    words.forEach((word, index) => {
        word.style.animationDelay = (index * 200) + 'ms';
    });
}

// Search Widget Functionality
function initSearchWidget() {
    const searchButton = document.querySelector('.search-button');
    const priceRange = document.getElementById('price-range');
    const propertyType = document.getElementById('property-type');

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Haptic feedback simulation on mobile
        if (window.innerWidth <= 768 && navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Get form values
        const location = suburbInput.value;
        const price = priceRange.value;
        const type = propertyType.value;

        // Simple validation
        if (!location) {
            showNotification('Please enter a location to search', 'warning');
            suburbInput.focus();
            return;
        }

        // Simulate search
        showNotification('Searching exclusive properties...', 'success');

        // Add loading state
        searchButton.style.opacity = '0.7';
        searchButton.disabled = true;

        setTimeout(() => {
            searchButton.style.opacity = '1';
            searchButton.disabled = false;
            showNotification(`Found ${Math.floor(Math.random() * 50) + 10} exclusive properties in ${location}`, 'success');
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'rgba(201, 169, 97, 0.9)' : 'rgba(26, 35, 50, 0.9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        font-size: 14px;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 400);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 4000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization - Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that need animation
document.querySelectorAll('.search-widget, .hero-content').forEach(el => {
    observer.observe(el);
});

// Video optimization
const video = document.querySelector('.hero-video');
if (video) {
    video.addEventListener('loadeddata', () => {
        video.style.opacity = '1';
    });

    // Pause video when not visible for performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    videoObserver.observe(video);
}

// Error handling for failed video load
video?.addEventListener('error', function() {
    // Fallback to a static background if video fails to load
    const heroSection = document.querySelector('.hero');
    heroSection.style.background = 'linear-gradient(135deg, #1A2332 0%, #010101 100%)';
    console.warn('Video failed to load, using fallback background');
});

// Preload critical resources
function preloadResources() {
    const links = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&family=Oswald:wght@300;400;500&display=swap'
    ];

    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

preloadResources();

// SEGMENT 2 JavaScript Functions

function initPropertyCards() {
    const propertyCards = document.querySelectorAll('.property-card');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('reveal');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    propertyCards.forEach(card => cardObserver.observe(card));
}

function initCarousel() {
    const carouselContainer = document.querySelector('.spotlight-carousel');
    if (!carouselContainer) return;

    const slides = document.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentSlide = 0;
    let autoplayInterval;
    let isPaused = false;

    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = n;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        if (!isPaused) {
            goToSlide(currentSlide + 1);
        }
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    carouselContainer.addEventListener('mouseenter', () => {
        isPaused = true;
        stopAutoplay();
    });

    carouselContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoplay();
    });

    startAutoplay();
}

function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
                            clearInterval(timer);
                        } else {
                            stat.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                        }
                    }, 16);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const statsSection = document.querySelector('.echelon-difference');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

function initPropertyHearts() {
    const hearts = document.querySelectorAll('.property-heart');

    hearts.forEach(heart => {
        heart.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('saved');

            if (window.innerWidth <= 768 && navigator.vibrate) {
                navigator.vibrate(30);
            }

            const propertyCard = this.closest('.property-card');
            const address = propertyCard.querySelector('.property-address').textContent;

            if (this.classList.contains('saved')) {
                showNotification(`${address} saved to favorites`, 'success');
            } else {
                showNotification(`${address} removed from favorites`, 'info');
            }
        });
    });
}

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        showNotification(`Filtering by ${this.querySelector('h3').textContent}...`, 'info');

        setTimeout(() => {
            showNotification(`Found ${Math.floor(Math.random() * 30) + 10} properties`, 'success');
        }, 1000);
    });
});

document.querySelector('.spotlight-button')?.addEventListener('click', function() {
    if (window.innerWidth <= 768 && navigator.vibrate) {
        navigator.vibrate(50);
    }
    showNotification('Scheduling your private viewing...', 'success');
    setTimeout(() => {
        showNotification('Our agent will contact you within 24 hours', 'success');
    }, 2000);
});