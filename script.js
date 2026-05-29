// ===== Language Toggle =====
document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'ro';
    const langToggle = document.getElementById('langToggle');

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ro' ? 'en' : 'ro';
        updateLanguage();
    });

    function updateLanguage() {
        // Update toggle button display
        const spans = langToggle.querySelectorAll('span');
        if (currentLang === 'ro') {
            spans[0].classList.add('lang-active');
            spans[0].classList.remove('lang-inactive');
            spans[1].classList.add('lang-inactive');
            spans[1].classList.remove('lang-active');
        } else {
            spans[1].classList.add('lang-active');
            spans[1].classList.remove('lang-inactive');
            spans[0].classList.add('lang-inactive');
            spans[0].classList.remove('lang-active');
        }

        // Update elements with data-ro / data-en attributes
        document.querySelectorAll('[data-ro]').forEach(el => {
            const key = `data-${currentLang}`;
            if (el.hasAttribute(key)) {
                el.textContent = el.getAttribute(key);
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-ro-placeholder]').forEach(el => {
            const key = `data-${currentLang}-placeholder`;
            if (el.hasAttribute(key)) {
                el.placeholder = el.getAttribute(key);
            }
        });

        // Toggle text blocks
        document.querySelectorAll('.text-ro').forEach(el => {
            el.style.display = currentLang === 'ro' ? '' : 'none';
        });
        document.querySelectorAll('.text-en').forEach(el => {
            el.style.display = currentLang === 'en' ? '' : 'none';
        });

        // Update html lang attribute
        document.documentElement.lang = currentLang;
    }

    // ===== Mobile Menu =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ===== Active Nav Link =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== Scroll Animations =====
    const fadeElements = document.querySelectorAll('.service-card, .contact-item, .about-text, .booking-card, .contact-form-wrapper');
    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => observer.observe(el));

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Show success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = currentLang === 'ro' ? '✓ Mesaj trimis!' : '✓ Message sent!';
        btn.style.background = '#6B8F71';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });

    // ===== Smooth scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 72; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
