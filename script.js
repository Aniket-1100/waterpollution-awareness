// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 31, 63, 0.95)';
        navbar.style.padding = '0.8rem 5%';
    } else {
        navbar.style.background = 'rgba(0, 31, 63, 0.9)';
        navbar.style.padding = '1rem 5%';
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.querySelector('.newsletter-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--success-color)';
        contactForm.reset();
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.style.backgroundColor = 'var(--success-color)';
        input.value = '';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.disabled = false;
        }, 3000);
    }, 1500);
});

// Add CSS class for section animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .section-hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s;
        }

        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .stat-card, .cause-card, .solution-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.5s ease;
        }

        .animate-in .stat-card, 
        .animate-in .cause-card, 
        .animate-in .solution-card {
            opacity: 1;
            transform: translateY(0);
        }

        .animate-in .stat-card:nth-child(1) { transition-delay: 0.2s; }
        .animate-in .stat-card:nth-child(2) { transition-delay: 0.4s; }
        .animate-in .stat-card:nth-child(3) { transition-delay: 0.6s; }

        .animate-in .cause-card:nth-child(1) { transition-delay: 0.2s; }
        .animate-in .cause-card:nth-child(2) { transition-delay: 0.4s; }
        .animate-in .cause-card:nth-child(3) { transition-delay: 0.6s; }
        .animate-in .cause-card:nth-child(4) { transition-delay: 0.8s; }

        .animate-in .solution-card:nth-child(1) { transition-delay: 0.2s; }
        .animate-in .solution-card:nth-child(2) { transition-delay: 0.4s; }
        .animate-in .solution-card:nth-child(3) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Animate statistics when they come into view
const stats = document.querySelectorAll('.stat-card h3');
stats.forEach(stat => {
    const targetNumber = parseInt(stat.textContent);
    stat.textContent = '0';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(stat, targetNumber);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(stat);
});

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const interval = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 100 ? '+' : '%');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (target > 100 ? '+' : '%');
        }
    }, interval);
}