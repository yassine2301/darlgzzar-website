/**
 * DAR L'GZZAR - Main JavaScript
 * Site statique - Vanilla JS (ES6+)
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const productTabs = document.querySelectorAll('.products__tab');
    const productPanels = document.querySelectorAll('.products__panel');
    const sections = document.querySelectorAll('section[id]');

    // Hero dropdown
    const heroDropdownBtn  = document.getElementById('heroDropdownBtn');
    const heroDropdownMenu = document.getElementById('heroDropdownMenu');

    // ============================================
    // Mobile Navigation
    // ============================================
    function openMenu() {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', openMenu);
    }

    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) closeMenu();
            closeDropdown();
        }
    });

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // Initial check
    handleHeaderScroll();

    // ============================================
    // Active Navigation Link on Scroll
    // ============================================
    function setActiveNavLink() {
        const scrollY = window.scrollY;
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink, { passive: true });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // ============================================
    // Hero Dropdown
    // ============================================
    function openDropdown() {
        if (!heroDropdownMenu || !heroDropdownBtn) return;
        heroDropdownMenu.classList.add('open');
        heroDropdownBtn.classList.add('open');
        heroDropdownBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        if (!heroDropdownMenu || !heroDropdownBtn) return;
        heroDropdownMenu.classList.remove('open');
        heroDropdownBtn.classList.remove('open');
        heroDropdownBtn.setAttribute('aria-expanded', 'false');
    }

    if (heroDropdownBtn) {
        heroDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            heroDropdownMenu.classList.contains('open') ? closeDropdown() : openDropdown();
        });
    }

    // Dropdown items → scroll to products + activate correct tab
    document.querySelectorAll('.hero__dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            closeDropdown();

            const tabId = this.dataset.tab;
            if (tabId) switchTab(tabId);

            // Scroll to products section
            const productsSection = document.getElementById('produits');
            if (productsSection) {
                const headerHeight   = header.offsetHeight;
                const targetPosition = productsSection.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (heroDropdownMenu && !heroDropdownMenu.contains(e.target) && e.target !== heroDropdownBtn) {
            closeDropdown();
        }
    });

    // ============================================
    // Nav Dropdown (À Propos submenu)
    // ============================================
    document.querySelectorAll('.nav__item--dropdown').forEach(item => {
        const toggle = item.querySelector('.nav__dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                // On mobile, toggle the submenu open/close
                if (window.innerWidth < 1024) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });

    // Close nav submenu links on mobile
    document.querySelectorAll('.nav__submenu-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
            document.querySelectorAll('.nav__item--dropdown').forEach(item => {
                item.classList.remove('open');
            });
        });
    });

    // ============================================
    // Products Tabs
    // ============================================
    function switchTab(tabId) {
        // Update tabs
        productTabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update panels
        productPanels.forEach(panel => {
            if (panel.id === `panel-${tabId}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    }

    productTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            switchTab(tabId);
        });
    });

    // ============================================
    // Form Validation Enhancement
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('.form-input');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Add visual feedback on input
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            // Remove error state on input
            input.addEventListener('input', function() {
                this.classList.remove('error');
                removeErrorMessage(this);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                // Focus first error field
                const firstError = contactForm.querySelector('.form-input.error');
                if (firstError) {
                    firstError.focus();
                }
            } else {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Envoi en cours...';
            }
        });
        
        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMsg = '';
            
            // Check required
            if (field.hasAttribute('required') && value === '') {
                isValid = false;
                errorMsg = 'Ce champ est requis';
            }
            
            // Check email format
            if (field.type === 'email' && value !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMsg = 'Adresse email invalide';
                }
            }
            
            // Check minlength
            if (field.hasAttribute('minlength') && value !== '') {
                const minLen = parseInt(field.getAttribute('minlength'));
                if (value.length < minLen) {
                    isValid = false;
                    errorMsg = `Minimum ${minLen} caractères requis`;
                }
            }
            
            // Update field state
            if (!isValid) {
                field.classList.add('error');
                field.classList.remove('success');
                showErrorMessage(field, errorMsg);
            } else if (value !== '') {
                field.classList.remove('error');
                field.classList.add('success');
                removeErrorMessage(field);
            }
            
            return isValid;
        }
        
        function showErrorMessage(field, message) {
            removeErrorMessage(field);
            const errorEl = document.createElement('span');
            errorEl.className = 'form-error';
            errorEl.textContent = message;
            errorEl.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorEl);
        }
        
        function removeErrorMessage(field) {
            const existingError = field.parentNode.querySelector('.form-error');
            if (existingError) {
                existingError.remove();
            }
        }
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about__content, .about__image-wrapper, .value-card, .service-card, .cert-card, .iso-card'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // ============================================
    // Video autoplay fallback
    // ============================================
    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
        heroVideo.play().catch(() => {
            // Autoplay blocked — video stays paused
        });
    }

    // ============================================
    // Prevent Flash of Unstyled Content
    // ============================================
    document.documentElement.classList.add('js-loaded');

})();

// ============================================
// CSS for Animation Classes (add to main.css)
// ============================================
/*
.animate-ready {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.form-input.error {
    border-color: var(--color-primary) !important;
}
*/
