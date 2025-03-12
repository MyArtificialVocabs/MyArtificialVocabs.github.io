// Warten, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Partikelhintergrund für Hero-Sektion initialisieren
    initParticles();
    
    // Scrollanimationen initialisieren
    initScrollAnimations();
    
    // Navbar-Scrolleffekt initialisieren
    initNavbarScroll();
    
    // Statistikzähler initialisieren
    initStatCounters();
    
    // Theme-Toggler initialisieren
    initThemeToggler();
    
    // Mobile Menü initialisieren
    initMobileMenu();
});

// Partikelhintergrund für Hero-Sektion
function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable_auto: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'window',
                events: {
                    onhover: {
                        enable: true,
                        mode: ['bubble','grab']
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 100,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 1
                    },
                    bubble: {
                        distance: 180,
                        size: 8,
                        opacity: 0.2,
                        duration: 10
                    },
                    repulse: {
                        distance: 200,
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Scrollanimationen für Elemente, die ins Viewport kommen
function initScrollAnimations() {
    // Alle Sektionen mit "reveal" Klasse selektieren
    const revealElements = document.querySelectorAll('.reveal');
    
    // IntersectionObserver für Scroll-Animationen
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Beobachten aller Reveal-Elemente
    revealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Feature-Karten mit Reveal-Klasse versehen und verzögern
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Timeline-Elemente mit Reveal-Klasse versehen
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Statistik-Elemente mit Reveal-Klasse versehen
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Navbar-Hintergrund bei Scrollen ändern
function initNavbarScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Statistik-Animation mit CountUp.js
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const options = {
        duration: 3,
        useEasing: true,
        easingFn: (t, b, c, d) => {
            // Angepasste Easing-Funktion für langsamere Animation am Ende
            t /= d;
            return c * (1 - Math.pow(1 - t, 3)) + b;
        },
        useGrouping: true,
        separator: '.',
        decimal: ',',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.dataset.value);
                const countUp = new CountUp(target, value, options);
                
                if (!countUp.error) {
                    countUp.start();
                } else {
                    console.error(countUp.error);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Dark Mode Funktionalität
function initThemeToggler() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');
    const text = themeToggleBtn.querySelector('span');
    
    // Prüfe gespeicherte Einstellung
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        text.textContent = 'Light Mode';
    }
    
    // Theme-Umschaltung bei Klick
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            text.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            text.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Mobile Menü Toggler
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Icon ändern: Burger zu X
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Menü schließen, wenn auf einen Link geklickt wird
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });
}

// Smooth Scroll für Anker-Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Ignorieren wenn # oder leer
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Headeroffset berücksichtigen
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial-Karussell-Funktionalität
function initTestimonialCarousel() {
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollInterval = 50;
    
    function autoScroll() {
        scrollAmount += scrollStep;
        testimonialCarousel.scrollLeft = scrollAmount;
        
        if (scrollAmount >= testimonialCarousel.scrollWidth - testimonialCarousel.clientWidth) {
            scrollAmount = 0;
        }
    }
    
    let scrollTimer = setInterval(autoScroll, scrollInterval);
    
    testimonialCarousel.addEventListener('mouseenter', () => {
        clearInterval(scrollTimer);
    });
    
    testimonialCarousel.addEventListener('mouseleave', () => {
        scrollTimer = setInterval(autoScroll, scrollInterval);
    });
}

// Funktion für die Zahlen-Animation
function animateNumbers() {
    const stats = [
        { element: document.querySelector('[data-stat="active-users"]'), target: 1200 },
        { element: document.querySelector('[data-stat="learned-vocab"]'), target: 165000 },
        { element: document.querySelector('[data-stat="supported-langs"]'), target: 12 },
        { element: document.querySelector('[data-stat="happy-users"]'), target: 96 }
    ];

    const duration = 2000; // 2 Sekunden für die Animation
    const steps = 60;
    const interval = duration / steps;

    stats.forEach(stat => {
        let current = 0;
        const increment = stat.target / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                current = stat.target;
                clearInterval(timer);
            }
            stat.element.textContent = Math.round(current).toLocaleString('de-DE');
        }, interval);
    });
}

// Intersection Observer für die Animation
const statsContainer = document.querySelector('.stats-container');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsContainer) {
    observer.observe(statsContainer);
} 