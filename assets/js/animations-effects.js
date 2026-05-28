/**
 * ============================================================
 * ANIMATIONS-EFFECTS.JS
 * Animations légères : apparition au scroll, hover effects,
 * FAQ accordéon, smooth transitions
 * ============================================================
 */

(function () {
    'use strict';

    // ----- ANIMATION AU SCROLL (Intersection Observer) -----
    const animatedElements = document.querySelectorAll(
        '.service-product-card, .why-us-card, .about-stat-item, .testimonial-card, .advantage-item'
    );

    // Configuration de l'observateur
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    };

    /**
     * Callback de l'Intersection Observer
     */
    const observerCallback = function (entries, observer) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                // Délai progressif pour un effet cascade
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'all 0.5s ease';
                }, index * 80);
                // Arrêter d'observer une fois animé
                observer.unobserve(entry.target);
            }
        });
    };

    // Initialiser les éléments avec l'état caché
    animatedElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    // Créer l'observateur
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback pour navigateurs sans IntersectionObserver
        animatedElements.forEach(function (el) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }

    // ----- FAQ ACCORDÉON -----
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function () {
                // Fermer les autres FAQ
                faqItems.forEach(function (otherItem) {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle l'item courant
                item.classList.toggle('active');
            });
        }
    });

    // ----- SMOOTH SCROLL POUR LIENS ANCRES -----
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.getElementById('main-header')?.offsetHeight || 72;
                const targetPosition = targetElement.offsetTop - headerHeight - 16;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----- EFFET HOVER SUR CARTES (amélioration tactile) -----
    const cards = document.querySelectorAll('.service-product-card, .why-us-card');

    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1.2)';
        });

        // Sur mobile, reset après le toucher
        card.addEventListener('touchstart', function () {
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('touchend', function () {
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    console.log('Animations et effets initialisés');

})();