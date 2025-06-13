// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typing Animation
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            cursor.style.cssText = `
                animation: blink 1s infinite;
                color: var(--primary-color);
            `;
            element.appendChild(cursor);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        setTimeout(() => {
            typeWriter(typingElement, 'Halo, Saya Glendy Hernandez', 150);
        }, 2500);
    }
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = [
        { selector: '.hero-text', animation: 'fade-in' },
        { selector: '.hero-image', animation: 'fade-in' },
        { selector: '.about-text', animation: 'slide-in-left' },
        { selector: '.about-image', animation: 'slide-in-right' },
        { selector: '.stats', animation: 'fade-in' },
        { selector: '.skill-card', animation: 'fade-in' },
        { selector: '.project-card', animation: 'fade-in' },
        { selector: '.featured-project', animation: 'fade-in' },
        { selector: '.certificate-card', animation: 'fade-in' },
        { selector: '.contact-links', animation: 'fade-in' }
    ];
    
    animateElements.forEach(({ selector, animation }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add(animation);
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Profile image parallax
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        const yPos = -(scrolled * 0.2);
        profileContainer.style.transform = `translateY(${yPos}px)`;
    }
});

// Image Modal Functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close');


// Improved Image Modal Functionality
function openImageModal(imageSrc, imageAlt) {
    modal.style.display = 'flex';
    modalImg.src = imageSrc;
    modalImg.alt = imageAlt;
    document.body.style.overflow = 'hidden';
    
    // Add fade in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Check if image is larger than viewport and add proper classes
    modalImg.onload = function() {
        const modalContent = document.querySelector('.modal-content');
        
        // Reset previous styles
        modalImg.style.maxHeight = '';
        modalContent.style.overflowY = '';
        
        // If image height is larger than 90% of viewport, make it scrollable
        if (this.naturalHeight > window.innerHeight * 0.9) {
            modalImg.style.maxHeight = '90vh';
            modalContent.style.overflowY = 'auto';
        }
    };
}

// Close modal function
function closeImageModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Add click handlers to close modal
closeModal.addEventListener('click', closeImageModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeImageModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeImageModal();
    }
});

// Add zoomable functionality to project and certificate images
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to project images
    document.querySelectorAll('.project-image img, .certificate-image img, .featured-image img').forEach(img => {
        img.style.cursor = 'pointer';
        img.classList.add('zoomable-image');
        
        img.addEventListener('click', () => {
            openImageModal(img.src, img.alt);
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add magnetic effect to buttons
document.querySelectorAll('.btn, .btn-icon, .contact-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Cursor trail effect
let trail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    // Only show trail on desktop
    if (window.innerWidth > 768) {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.left = e.clientX + 'px';
        trailElement.style.top = e.clientY + 'px';
        
        document.body.appendChild(trailElement);
        trail.push(trailElement);
        
        // Remove old trail elements
        if (trail.length > maxTrailLength) {
            const oldTrail = trail.shift();
            if (oldTrail && oldTrail.parentNode) {
                oldTrail.parentNode.removeChild(oldTrail);
            }
        }
        
        // Remove this trail element after animation
        setTimeout(() => {
            if (trailElement && trailElement.parentNode) {
                trailElement.parentNode.removeChild(trailElement);
            }
        }, 600);
    }
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: var(--gradient-primary);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Smooth image loading for existing images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    });
});

// Add text reveal animation
function revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = `all 0.3s ease ${i * 0.05}s`;
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, 100);
    }
}

// Apply text reveal to section titles when they come into view
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.revealed) {
            revealText(entry.target);
            entry.target.dataset.revealed = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(title => {
    titleObserver.observe(title);
});

// Add floating animation to skill cards
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'none';
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    circle.style.cssText += `
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        background-color: rgba(255, 255, 255, 0.3);
    `;
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    const ripples = button.getElementsByClassName('ripple');
    if (ripples.length > 0) {
        ripples[0].remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
});

// Add smooth scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: var(--shadow-medium);
    z-index: 1000;
    font-size: 1.2rem;
`;

document.body.appendChild(scrollToTopBtn);

// Add active navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for active nav link and cursor trail
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .nav-link.active {
        color: var(--white) !important;
    }
    .nav-link.active::before {
        opacity: 1 !important;
    }
    
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.8;
        animation: trail 0.6s ease-out forwards;
        z-index: 9999;
    }
    
    @keyframes trail {
        0% {
            transform: scale(1);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    
    .zoomable-image:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-link {
            font-size: 1.2rem;
            padding: 1rem 2rem;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
    
    // Update scroll progress
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
    
    // Show/hide scroll to top button
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
}, 10);

// Add scroll event listener
window.addEventListener('scroll', throttledScrollHandler);

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact links functionality
document.addEventListener('DOMContentLoaded', () => {
    // Gmail link
    const emailLink = document.querySelector('a[href*="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            // Add a small delay for the magnetic effect
            setTimeout(() => {
                window.location.href = 'mailto:glendyhernandezpmg@gmail.com';
            }, 100);
        });
    }
    
    // LinkedIn link
    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', (e) => {
            setTimeout(() => {
                window.open('https://www.linkedin.com/in/glendy-gunantoro/', '_blank');
            }, 100);
        });
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations to all elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.animationFillMode = 'both';
    });
    
    // Trigger initial scroll handler
    setTimeout(() => {
        throttledScrollHandler();
    }, 100);
    
    // Add loading complete message
    console.log('🚀 Portfolio website loaded successfully!');
    console.log('✨ All animations and interactions are ready!');
    console.log('📱 Responsive design activated!');
});

// Add error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.opacity = '0.5';
        img.alt = 'Image not found';
        console.log('Image failed to load:', img.src);
    });
});

// Notification system for user feedback
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#6c63ff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Navigate sections with arrow keys
    if (e.altKey) {
        const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
        const currentSection = window.location.hash.slice(1) || 'home';
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextSection = sections[currentIndex + 1];
            document.querySelector(`a[href="#${nextSection}"]`).click();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            const prevSection = sections[currentIndex - 1];
            document.querySelector(`a[href="#${prevSection}"]`).click();
        }
    }
});

// Final initialization
console.log('🎉 Portfolio ready! Use Alt + ↑/↓ to navigate sections');