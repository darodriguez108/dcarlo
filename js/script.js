/**
 * D'Carlo Jardín y Salón de Eventos
 * JavaScript - Navigation + Hero + About Animations
 * Vanilla JS - No Dependencies
 */

(function() {
    'use strict';
    
    // ========================================
    // DOM ELEMENTS
    // ========================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navLinkTargets = Array.from(navLinks).map((link) => {
        const href = link.getAttribute('href');
        const target = href && href.startsWith('#') ? document.querySelector(href) : null;
        return { link, target, href };
    });
    const body = document.body;
    
    // Hero elements
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroCtaGroup = document.querySelector('.hero__cta-group');
    const heroTrust = document.querySelector('.hero__trust');
    const heroMedia = document.getElementById('hero-media');
    
    // About/Nosotros elements
    const aboutTitle = document.querySelector('.about__title');
    const aboutLead = document.querySelector('.about__lead');
    const aboutStory = document.querySelector('.about__story');
    const aboutMedia = document.querySelector('.about__media');
    const aboutQuote = document.querySelector('.about__quote');
    const differentiators = document.querySelectorAll('.differentiator');
    const stats = document.querySelectorAll('.stat');
    const aboutCta = document.querySelector('.about__cta');
    
    // Servicios elements
    const serviciosSection = document.getElementById('servicios');
    const serviciosBlocks = document.querySelectorAll('[data-servicios-section]');
    const serviciosCta = document.querySelector('[data-servicios-cta]');
    const serviciosSubnav = document.querySelector('.servicios-subnav');
    const serviciosSubnavLinks = document.querySelectorAll('.servicios-subnav__link');

    const sectionHeaderConfigs = [
        {
            headerSelector: '.servicios__header',
            titleSelector: '.servicios__title',
            leadSelector: '.servicios__lead'
        },
        {
            headerSelector: '.galeria__header',
            titleSelector: '.galeria__title',
            leadSelector: '.galeria__lead'
        },
        {
            headerSelector: '.eventos__header',
            titleSelector: '.eventos__title',
            leadSelector: '.eventos__lead'
        },
        {
            headerSelector: '.contacto__header',
            titleSelector: '.contacto__title',
            leadSelector: '.contacto__lead'
        }
    ];

    // Galería elements
    const galeriaSection = document.getElementById('galeria');
    const galeriaFilterBar = document.querySelector('[data-galeria-filter-bar]');
    const galeriaGrid = document.querySelector('[data-galeria-grid]');
    const galeriaFilterButtons = document.querySelectorAll('[data-galeria-filter]');
    const galeriaLoadMoreButton = document.querySelector('[data-galeria-load-more]');
    const galeriaEmptyMessage = document.querySelector('[data-galeria-empty]');
    const galeriaLiveRegion = document.querySelector('[data-galeria-live-region]');
    const galeriaCardTemplate = document.getElementById('galeria-card-template');
    const galeriaLightbox = document.querySelector('[data-galeria-lightbox]');
    const galeriaLightboxBackdrop = document.querySelector('[data-galeria-lightbox-backdrop]');
    const galeriaLightboxDialog = galeriaLightbox ? galeriaLightbox.querySelector('.galeria-lightbox__dialog') : null;
    const galeriaLightboxPicture = document.querySelector('[data-galeria-lightbox-picture]');
    const galeriaLightboxTitle = document.getElementById('galeria-lightbox-title');
    const galeriaLightboxCaption = document.querySelector('[data-galeria-lightbox-caption]');
    const galeriaLightboxSpace = document.querySelector('[data-galeria-lightbox-space]');
    const galeriaLightboxTags = document.querySelector('[data-galeria-lightbox-tags]');
    const galeriaLightboxClose = document.querySelector('[data-galeria-lightbox-close]');
    const galeriaLightboxPrev = document.querySelector('[data-galeria-lightbox-prev]');
    const galeriaLightboxNext = document.querySelector('[data-galeria-lightbox-next]');
    const galeriaLightboxMedia = document.querySelector('[data-galeria-lightbox-media]');

    // Contacto elements
    const contactoSection = document.getElementById('contacto');
    const contactoForm = document.querySelector('[data-contacto-form]');
    const contactoStatus = document.getElementById('contacto-form-status');
    const contactoSuccess = document.querySelector('[data-contacto-success]');
    const contactoChips = document.querySelectorAll('.contacto-chip');
    const contactoSpaceInput = document.querySelector('[data-space-input]');
    const contactoChipsFieldset = contactoForm ? contactoForm.querySelector('.contacto-field--chips') : null;
    const contactoModalTrigger = document.querySelector('[data-contacto-open-modal]');
    const contactoMapTrigger = document.querySelector('[data-contacto-map-trigger]');
    const contactoMapContainer = document.querySelector('[data-contacto-map]');
    const contactoAccordion = document.querySelector('[data-contacto-accordion]');
    const contactoAccordionTriggers = contactoAccordion ? contactoAccordion.querySelectorAll('.contacto-accordion__trigger') : [];
    const contactoSubmitButton = contactoForm ? contactoForm.querySelector('.contacto-submit') : null;
    const contactoSecondaryButton = contactoForm ? contactoForm.querySelector('.contacto-secondary') : null;
    const contactoNewRequestButton = contactoSuccess ? contactoSuccess.querySelector('[data-contacto-new-request]') : null;

    // Footer elements
    const footer = document.querySelector('.site-footer');
    const footerYear = footer ? footer.querySelector('[data-footer-year]') : null;
    const footerBackToTop = footer ? footer.querySelector('[data-footer-backtotop]') : null;
    const footerNavGroups = footer ? footer.querySelectorAll('[data-footer-group]') : [];
    const footerNavToggles = footer ? footer.querySelectorAll('[data-footer-toggle]') : [];
    
    // ========================================
    // STATE
    // ========================================
    let isMenuOpen = false;
    let scrollThreshold = 100;
    let lastScrollY = window.scrollY;
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', (event) => {
            prefersReducedMotion = event.matches;
        });
    } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener((event) => {
            prefersReducedMotion = event.matches;
        });
    }
    const GALERIA_INITIAL_BATCH = 4;
    const GALERIA_BATCH_SIZE = 4;
    const GALERIA_IMAGE_SIZES = '(min-width: 1200px) 22vw, (min-width: 960px) 30vw, (min-width: 768px) 44vw, 50vw';
    const galeriaItems = [
        {
            id: 'galeria-01',
            type: 'image',
            priority: 'high',
            sources: [],
            srcset: 'assets/galeria/jardin-atardecer.png 900w, assets/galeria/jardin-atardecer@2x.png 1200w',
            fallback: 'assets/galeria/jardin-atardecer.png',
            alt: 'Jardín D\'Carlo al atardecer',
            caption: 'Banquete dorado — Jardín D\'Carlo',
            space: 'Jardín D\'Carlo',
            tags: ['Jardín', 'Atardecer', 'Ceremonias']
        },
        {
            id: 'galeria-02',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/salon-amanda-luces.png 900w, assets/galeria/salon-amanda-luces@2x.png 1200w',
            fallback: 'assets/galeria/salon-amanda-luces.png',
            alt: 'Salón Amanda iluminado para recepción nocturna',
            caption: 'Recepción nocturna con iluminación cálida — Salón Amanda',
            space: 'Salón Amanda',
            tags: ['Recepción', 'Nocturno', 'Decoración']
        },
        {
            id: 'galeria-03',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/america-quince.png 900w, assets/galeria/america-quince@2x.png 1200w',
            fallback: 'assets/galeria/america-quince.png',
            alt: 'Salón América - Celebración de Quinceañera',
            caption: 'Quinceañera en Salón América — Elegancia y tradición',
            space: 'Salón América',
            tags: ['Quinceañera', 'Banquete', 'Decoración']
        },
        {
            id: 'galeria-04',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/jardin-cumple.png 900w, assets/galeria/jardin-cumple@2x.png 1200w',
            fallback: 'assets/galeria/jardin-cumple.png',
            alt: 'Jardín D\'Carlo - Fiesta de cumpleaños infantil',
            caption: 'Cumpleaños infantil en Jardín D\'Carlo — Alegría y diversión al aire libre',
            space: 'Jardín D\'Carlo',
            tags: ['Cumpleaños Infantil', 'Jardín', 'Fiesta']
        },
        {
            id: 'galeria-05',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/salon-amanda-ceremonia-civil.png 900w, assets/galeria/salon-amanda-ceremonia-civil@2x.png 1200w',
            fallback: 'assets/galeria/salon-amanda-ceremonia-civil.png',
            alt: 'Salón Amanda - Ceremonia civil íntima y elegante',
            caption: 'Ceremonia civil íntima y elegante — El escenario perfecto para tu unión en Salón Amanda',
            space: 'Ceremonia Civil - Salón Amanda',
            tags: ['Ceremonia Civil', 'Salón Amanda', 'Boda']
        },
        {
            id: 'galeria-06',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/jardin-pool-party.png 900w, assets/galeria/jardin-pool-party@2x.png 1200w',
            fallback: 'assets/galeria/jardin-pool-party.png',
            alt: 'Pool Party en Jardín D\'Carlo con piscina iluminada',
            caption: 'Pool Party en Jardín D\'Carlo — Diversión y frescura al aire libre junto a la piscina',
            space: 'Pool Party - Jardín D\'Carlo',
            tags: ['Pool Party', 'Jardín', 'Fiesta']
        },
        {
            id: 'galeria-07',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/amanda-fiesta-mexicana.png 900w, assets/galeria/amanda-fiesta-mexicana@2x.png 1200w',
            fallback: 'assets/galeria/amanda-fiesta-mexicana.png',
            alt: 'Fiesta Mexicana en Salón Amanda - Tradición y color',
            caption: 'Fiesta Mexicana en Salón Amanda — Tradición, color y alegría en cada detalle',
            space: 'Fiesta Mexicana - Salón Amanda',
            tags: ['Fiesta Mexicana', 'Salón Amanda', 'Cultural']
        },
        {
            id: 'galeria-08',
            type: 'image',
            sources: [],
            srcset: 'assets/galeria/jardin-boda.png 900w, assets/galeria/jardin-boda@2x.png 1200w',
            fallback: 'assets/galeria/jardin-boda.png',
            alt: 'Boda en Jardín D\'Carlo - Elegancia y romanticismo al aire libre',
            caption: 'Boda en Jardín D\'Carlo — El escenario perfecto para tu día especial, elegante y romántico',
            space: 'Boda en Jardín D\'Carlo',
            tags: ['Boda', 'Jardín', 'Ceremonias']
        }
    ];
    const galeriaState = {
        activeSpace: 'Todos',
        visibleCount: GALERIA_INITIAL_BATCH,
        filteredItems: [],
        lastFocusedTrigger: null
    };
    const galeriaLightboxState = {
        isOpen: false,
        items: [],
        index: 0,
        previousFocus: null,
        focusTrapCleanup: null,
        touchStartX: null
    };
    let galeriaCardObserver = null;
    const contactoState = {
        isSubmitting: false,
        hasSuccess: false,
        activeSpaces: new Set(),
        mapLoaded: false
    };
    const footerState = {
        isMobileAccordion: null,
        resizeTimeout: null,
        resizeListenerAttached: false
    };
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Toggle classes
        navMenu.classList.toggle('nav-menu--open', isMenuOpen);
        navToggle.classList.toggle('nav-toggle--active', isMenuOpen);
        body.classList.toggle('menu-open', isMenuOpen);
        
        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', isMenuOpen);
        navToggle.setAttribute('aria-label', isMenuOpen ? 'Close navigation menu' : 'Open navigation menu');
        
        // Focus management
        if (isMenuOpen) {
            // Trap focus in menu
            trapFocus(navMenu);
            // Focus first nav link
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        } else {
            // Return focus to toggle button
            navToggle.focus();
        }
    }
    
    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }
    
    // ========================================
    // FOCUS TRAP (for mobile menu)
    // ========================================
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' || e.keyCode === 9) {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    function createFocusTrap(element) {
        if (!element) return () => {};
        const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])';

        function handleKeydown(event) {
            if (event.key !== 'Tab' || event.altKey) {
                return;
            }

            const focusable = element.querySelectorAll(selector);
            if (!focusable.length) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === first) {
                    last.focus();
                    event.preventDefault();
                }
            } else if (document.activeElement === last) {
                first.focus();
                event.preventDefault();
            }
        }

        element.addEventListener('keydown', handleKeydown);
        return () => element.removeEventListener('keydown', handleKeydown);
    }
    
    // ========================================
    // STICKY HEADER ON SCROLL
    // ========================================
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > scrollThreshold) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    function throttledScroll() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                handleScroll();
                updateActiveLink();
                scrollTimeout = null;
            }, 100);
        }
    }
    
    // ========================================
    // SMOOTH SCROLLING WITH OFFSET
    // ========================================
    function smoothScrollTo(targetId, additionalOffset = 0) {
        const target = document.querySelector(targetId);
        if (!target) return;
        
        // Calculate header height for offset
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - additionalOffset;
        
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Instant scroll for reduced motion preference
            window.scrollTo(0, targetPosition);
        } else {
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu after clicking link
        closeMenu();
    }
    
    // ========================================
    // NAV ACTIVE STATE HELPERS
    // ========================================
    function clearActiveNavLinks() {
        navLinks.forEach((link) => {
            link.removeAttribute('aria-current');
            if (link.parentElement) {
                link.parentElement.classList.remove('nav-item--active');
            }
        });
    }

    function setActiveNavLink(link) {
        if (!link) {
            return;
        }

        clearActiveNavLinks();
        link.setAttribute('aria-current', 'page');
        if (link.parentElement) {
            link.parentElement.classList.add('nav-item--active');
        }
    }

    // ========================================
    // ACTIVE LINK HIGHLIGHTING
    // ========================================
    function updateActiveLink() {
        // BUGFIX: Previously we only inspected elements with the `.section` class, so links like Inicio/Nosotros never matched and Espacios stayed active.
        // By iterating over the actual nav targets we ensure the clicked/visible section always owns the active state.
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        let activeLink = null;

        navLinkTargets.forEach(({ link, target }) => {
            if (!target) {
                return;
            }

            const sectionTop = target.offsetTop;
            if (scrollPosition >= sectionTop) {
                activeLink = link;
            }
        });

        if (!activeLink && navLinkTargets.length) {
            activeLink = navLinkTargets[0].link;
        }

        if (activeLink) {
            setActiveNavLink(activeLink);
        }
    }
    
    // ========================================
    // INTERSECTION OBSERVER (Modern Browsers)
    // ========================================
    function initIntersectionObserver() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback to scroll-based detection (already implemented above)
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: `-${header.offsetHeight}px 0px -60% 0px`,
            threshold: 0
        };

        const observerCallback = (entries) => {
            const isIntersecting = entries.some((entry) => entry.isIntersecting);
            if (isIntersecting) {
                updateActiveLink();
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navLinkTargets.forEach(({ target }) => {
            if (target) {
                observer.observe(target);
            }
        });
    }
    
    // ========================================
    // EVENT LISTENERS
    // ========================================
    
    // Toggle button click
    if (navToggle) {
        navToggle.addEventListener('click', toggleMenu);
    }
    
    // Navigation links click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                // FIX: ensure only the clicked nav item carries the active state before scrolling
                setActiveNavLink(this);
                smoothScrollTo(href);
            }
        });
    });
    
    // CTA button click (smooth scroll)
    const ctaButton = document.querySelector('.nav-cta');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    }

    const aboutContactButton = document.querySelector('[data-about-contact]');
    if (aboutContactButton) {
        aboutContactButton.addEventListener('click', function() {
            // About CTA primary should always guide guests to the contacto section
            smoothScrollTo('#contacto');
        });
    }
    
    // Close menu when clicking outside (backdrop)
    navMenu.addEventListener('click', function(e) {
        if (e.target === navMenu && isMenuOpen) {
            closeMenu();
        }
    });
    
    // ESC key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            closeMenu();
        }
    });
    
    // Scroll event (throttled)
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Resize event (close menu on desktop breakpoint)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth >= 1200 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });
    
    // ========================================
    // HERO ENTRANCE ANIMATIONS
    // ========================================
    function initHeroAnimations() {
        // Don't animate if elements don't exist
        if (!heroTitle) return;
        
        // Trigger animations with staggered delays
        // Using setTimeout to ensure CSS is loaded
        setTimeout(() => {
            if (heroTitle) heroTitle.classList.add('animate-in');
        }, 100);
        
        setTimeout(() => {
            if (heroSubtitle) heroSubtitle.classList.add('animate-in');
        }, 200);
        
        setTimeout(() => {
            if (heroCtaGroup) heroCtaGroup.classList.add('animate-in');
        }, 300);
        
        setTimeout(() => {
            if (heroTrust) heroTrust.classList.add('animate-in');
        }, 400);
    }
    
    // ========================================
    // HERO PARALLAX EFFECT (Desktop Only)
    // ========================================
    function initHeroParallax() {
        // Only on desktop and if user doesn't prefer reduced motion
        if (window.innerWidth < 1200 || prefersReducedMotion || !heroMedia) {
            return;
        }
        
        let parallaxTimeout;
        let isParallaxActive = true;
        
        function handleParallax() {
            if (!parallaxTimeout && isParallaxActive) {
                parallaxTimeout = setTimeout(function() {
                    const scrollY = window.scrollY;
                    const heroHeight = heroMedia.offsetHeight;
                    
                    // Only apply parallax when hero is in view
                    if (scrollY < heroHeight) {
                        const parallaxAmount = scrollY * 0.3;
                        heroMedia.style.transform = `translateY(${parallaxAmount}px)`;
                    }
                    
                    parallaxTimeout = null;
                }, 16); // ~60fps
            }
        }
        
        window.addEventListener('scroll', handleParallax, { passive: true });
        
        // Disable parallax on resize if screen becomes smaller
        window.addEventListener('resize', function() {
            if (window.innerWidth < 1200) {
                isParallaxActive = false;
                if (heroMedia) {
                    heroMedia.style.transform = '';
                }
            } else if (!prefersReducedMotion) {
                isParallaxActive = true;
            }
        });
    }
    
    // ========================================
    // ABOUT/NOSOTROS SCROLL REVEAL ANIMATIONS
    // ========================================
    function initAboutAnimations() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            if (aboutTitle) aboutTitle.classList.add('animate-in');
            if (aboutLead) aboutLead.classList.add('animate-in');
            if (aboutStory) aboutStory.classList.add('animate-in');
            if (aboutMedia) aboutMedia.classList.add('animate-in');
            if (aboutQuote) aboutQuote.classList.add('animate-in');
            differentiators.forEach(el => el.classList.add('animate-in'));
            stats.forEach(el => el.classList.add('animate-in'));
            if (aboutCta) aboutCta.classList.add('animate-in');
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before entering viewport
            threshold: 0.2
        };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Optional: unobserve after animation (one-time reveal)
                    // observer.unobserve(entry.target);
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe header elements
        if (aboutTitle) observer.observe(aboutTitle);
        if (aboutLead) observer.observe(aboutLead);
        
        // Observe story and media
        if (aboutStory) observer.observe(aboutStory);
        if (aboutMedia) observer.observe(aboutMedia);
        
        // Observe quote
        if (aboutQuote) observer.observe(aboutQuote);
        
        // Observe differentiators with staggered delays
        differentiators.forEach((differentiator, index) => {
            // Add staggered delay via inline style
            if (!prefersReducedMotion) {
                differentiator.style.transitionDelay = `${0.5 + (index * 0.15)}s`;
            }
            observer.observe(differentiator);
        });
        
        // Observe stats with staggered delays
        stats.forEach((stat, index) => {
            if (!prefersReducedMotion) {
                stat.style.transitionDelay = `${0.6 + (index * 0.1)}s`;
            }
            observer.observe(stat);
        });
        
        // Observe CTA
        if (aboutCta) observer.observe(aboutCta);
    }
    
    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        // Initial scroll check
        handleScroll();
        
        // Initialize IntersectionObserver for active link tracking
        initIntersectionObserver();
        
        // Set initial active link
        updateActiveLink();
        
        // Prevent flash of mobile menu on page load
        navMenu.style.transition = 'none';
        setTimeout(() => {
            navMenu.style.transition = '';
        }, 100);
        
        // Initialize hero animations
        initHeroAnimations();
        
    // Initialize about/nosotros scroll reveal animations
        initAboutAnimations();
        
        // Initialize espacios scroll reveal animations
        initEspaciosAnimations();

        // Initialize shared section header animations
        initSectionHeaderAnimations();
        
    // Initialize servicios scroll reveal animations and subnav
        initServiciosAnimations();
        initServiciosSubnav();

        // Initialize galería interactions
        initGaleria();

        // Initialize contacto interactions
        initContacto();

        // Initialize footer interactions
        initFooter();
        
        // Initialize parallax effect (desktop only, respects reduced-motion)
        if (!prefersReducedMotion) {
            initHeroParallax();
        }
    }
    
    // ========================================
    // ESPACIOS ANIMATIONS
    // ========================================
    
    /**
     * Initialize scroll-triggered animations for espacios section
     * Reveals space cards with staggered timing
     */
    function initEspaciosAnimations() {
        const espaciosHeader = document.querySelector('.espacios__header');
        const espaciosTitle = espaciosHeader ? espaciosHeader.querySelector('.espacios__title') : null;
        const espaciosLead = espaciosHeader ? espaciosHeader.querySelector('.espacios__lead') : null;
        const spaceCards = document.querySelectorAll('.space-card');

        if (!espaciosHeader && !spaceCards.length) {
            return; // Exit if espacios section not present
        }

        // Skip animations if user prefers reduced motion
        if (prefersReducedMotion) {
            if (espaciosTitle) espaciosTitle.classList.add('animate-in');
            if (espaciosLead) espaciosLead.classList.add('animate-in');
            spaceCards.forEach(card => {
                card.classList.add('animate-in');
            });
            return;
        }

        if (espaciosHeader) {
            const headerObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (espaciosTitle) espaciosTitle.classList.add('animate-in');
                            if (espaciosLead) espaciosLead.classList.add('animate-in');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    root: null,
                    rootMargin: '-50px 0px',
                    threshold: 0.3
                }
            );

            headerObserver.observe(espaciosHeader);
        }

        if (!spaceCards.length) {
            return;
        }

        // Configure IntersectionObserver for scroll reveals
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const cards = Array.from(spaceCards);
                        const cardIndex = cards.indexOf(entry.target);
                        const delay = cardIndex * 150; // 150ms stagger

                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, delay);

                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-50px 0px',
                threshold: 0.15
            }
        );

        spaceCards.forEach(card => {
            cardObserver.observe(card);
        });
    }
    
    // ========================================
    // SHARED SECTION HEADER ANIMATIONS
    // ========================================
    function initSectionHeaderAnimations() {
        const resolvedConfigs = sectionHeaderConfigs
            .map(({ headerSelector, titleSelector, leadSelector }) => {
                const headerElement = document.querySelector(headerSelector);
                if (!headerElement) {
                    return null;
                }

                return {
                    header: headerElement,
                    title: titleSelector ? headerElement.querySelector(titleSelector) : null,
                    lead: leadSelector ? headerElement.querySelector(leadSelector) : null
                };
            })
            .filter(Boolean);

        if (!resolvedConfigs.length) {
            return;
        }

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            resolvedConfigs.forEach(({ title, lead }) => {
                if (title) title.classList.add('animate-in');
                if (lead) lead.classList.add('animate-in');
            });
            return;
        }

        const headerMap = new Map();
        const observerOptions = {
            root: null,
            rootMargin: '-50px 0px',
            threshold: 0.3
        };

        const headerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                const config = headerMap.get(entry.target);
                if (!config) {
                    return;
                }

                if (config.title) config.title.classList.add('animate-in');
                if (config.lead) config.lead.classList.add('animate-in');
                observer.unobserve(entry.target);
            });
        }, observerOptions);

        resolvedConfigs.forEach((config) => {
            headerMap.set(config.header, config);
            headerObserver.observe(config.header);
        });
    }

    // ========================================
    // SERVICIOS ANIMATIONS
    // ========================================
    
    /**
     * Initialize scroll-triggered animations for the Servicios section
     */
    function initServiciosAnimations() {
        const animatableElements = document.querySelectorAll('.reveal-on-scroll');
        if (!animatableElements.length) {
            return;
        }
        
        if (prefersReducedMotion) {
            animatableElements.forEach(el => el.classList.add('animate-in'));
            return;
        }
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px 0px -15% 0px',
                threshold: 0.2
            }
        );
        
        animatableElements.forEach((el, index) => {
            if (!prefersReducedMotion) {
                const delay = Math.min(index * 0.08, 0.8);
                el.style.transitionDelay = `${delay}s`;
            }
            observer.observe(el);
        });
    }
    
    // ========================================
    // SERVICIOS SUBNAV INTERACTIONS
    // ========================================
    
    function initServiciosSubnav() {
        if (!serviciosSubnav || !serviciosSubnavLinks.length) {
            return;
        }
        
        const ACTIVE_CLASS = 'servicios-subnav__link--active';

        function setServiciosActiveLink(activeLink) {
            serviciosSubnavLinks.forEach(linkEl => {
                linkEl.classList.remove(ACTIVE_CLASS);
                linkEl.removeAttribute('aria-current');
            });

            if (activeLink) {
                activeLink.classList.add(ACTIVE_CLASS);
                activeLink.setAttribute('aria-current', 'true');
            }
        }
        
        serviciosSubnavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    event.preventDefault();
                    // BUGFIX: Active state relied solely on scroll spy with an incorrect offset, so the first link stayed active after clicks.
                    // We immediately update the active classes on click and scroll using the live subnav height for precise positioning.
                    setServiciosActiveLink(link);
                    const dynamicOffset = serviciosSubnav.offsetHeight + 12;
                    smoothScrollTo(targetId, dynamicOffset);
                }
            });
        });
        
        // Update active states on scroll
        function updateServiciosSubnav() {
            const headerHeight = header ? header.offsetHeight : 0;
            const dynamicOffset = serviciosSubnav.offsetHeight + 12;
            const scrollY = window.scrollY;
            const currentPosition = scrollY + headerHeight + dynamicOffset;
            let activeSet = false;
            serviciosBlocks.forEach(block => {
                const blockTop = block.offsetTop;
                const blockHeight = block.offsetHeight;
                const blockId = block.getAttribute('id');
                const link = document.querySelector(`.servicios-subnav__link[href="#${blockId}"]`);
                if (!link) return;
                
                if (currentPosition >= blockTop && currentPosition < blockTop + blockHeight) {
                    setServiciosActiveLink(link);
                    activeSet = true;
                }
            });
            
            if (!activeSet && serviciosBlocks.length && serviciosSubnavLinks.length) {
                const firstBlock = serviciosBlocks[0];
                const lastBlock = serviciosBlocks[serviciosBlocks.length - 1];
                const firstLink = serviciosSubnavLinks[0];
                const lastLink = serviciosSubnavLinks[serviciosSubnavLinks.length - 1];
                
                if (currentPosition < firstBlock.offsetTop) {
                    setServiciosActiveLink(firstLink);
                } else if (currentPosition > lastBlock.offsetTop + lastBlock.offsetHeight) {
                    setServiciosActiveLink(lastLink);
                }
            }
        }
        
        window.addEventListener('scroll', updateServiciosSubnav, { passive: true });
        updateServiciosSubnav();
    }

    // ========================================
    // CONTACTO SECTION
    // ========================================

    function initContacto() {
        if (!contactoSection || !contactoForm) {
            return;
        }

        setContactoMinimumDate();
        resetContactoFormVisuals();
        initContactoChips();
        initContactoMap();
        initContactoAccordion();
        initContactoModalTrigger();
        initContactoNewRequestButton();

    contactoForm.addEventListener('submit', handleContactoSubmit);

        const validatedFields = contactoForm.querySelectorAll('[data-validate]');
        validatedFields.forEach(field => {
            field.addEventListener('blur', () => validateContactoField(field, { showErrors: true }));

            const eventName = (field.tagName === 'SELECT' || field.type === 'date' || field.type === 'checkbox') ? 'change' : 'input';
            field.addEventListener(eventName, () => {
                exitContactoSuccessState();
                validateContactoField(field, { showErrors: false });
                clearContactoStatus();
            });
        });

        // Keep map trigger accessible after focus reset
        if (contactoMapTrigger) {
            contactoMapTrigger.addEventListener('focus', exitContactoSuccessState);
        }
    }

    function initContactoChips() {
        if (!contactoChips.length || !contactoSpaceInput) {
            return;
        }

        contactoChips.forEach(chip => {
            chip.setAttribute('aria-pressed', chip.classList.contains('is-active') ? 'true' : 'false');
            chip.addEventListener('click', () => handleContactoChipToggle(chip));
        });

        updateContactoSpacesValue();
    }

    function handleContactoChipToggle(chip) {
        if (!chip || !contactoSpaceInput) {
            return;
        }

        const space = chip.getAttribute('data-space');
        if (!space) {
            return;
        }

        const isActive = contactoState.activeSpaces.has(space);
        if (isActive) {
            contactoState.activeSpaces.delete(space);
            chip.classList.remove('is-active');
            chip.setAttribute('aria-pressed', 'false');
        } else {
            contactoState.activeSpaces.add(space);
            chip.classList.add('is-active');
            chip.setAttribute('aria-pressed', 'true');
        }

        exitContactoSuccessState();
        updateContactoSpacesValue();
        validateContactoSpaces(false);
        clearContactoStatus();
    }

    function updateContactoSpacesValue() {
        if (!contactoSpaceInput) {
            return;
        }

        if (contactoState.activeSpaces.size) {
            contactoSpaceInput.value = Array.from(contactoState.activeSpaces).join(', ');
        } else {
            contactoSpaceInput.value = '';
        }
    }

    function validateContactoSpaces(showErrors = true) {
        if (!contactoSpaceInput) {
            return true;
        }

        const hasSelection = contactoState.activeSpaces.size > 0;
        if (hasSelection) {
            setChipsErrorState(false);
        } else if (showErrors) {
            setChipsErrorState(true);
        }

        return hasSelection;
    }

    function setChipsErrorState(hasError) {
        if (!contactoChipsFieldset) {
            return;
        }

        const errorElement = contactoChipsFieldset.querySelector('#error-espacios');
        if (errorElement) {
            errorElement.hidden = !hasError;
        }

        if (hasError) {
            contactoChipsFieldset.dataset.invalid = 'true';
            contactoChipsFieldset.setAttribute('aria-invalid', 'true');
        } else {
            delete contactoChipsFieldset.dataset.invalid;
            contactoChipsFieldset.removeAttribute('aria-invalid');
        }
    }

    function setContactoMinimumDate() {
        if (!contactoForm) {
            return;
        }

        const dateInput = contactoForm.querySelector('[data-validate="date"]');
        if (!dateInput) {
            return;
        }

        const now = new Date();
        const tzOffset = now.getTimezoneOffset() * 60000;
        const todayISO = new Date(now.getTime() - tzOffset).toISOString().split('T')[0];
        dateInput.min = todayISO;

        if (dateInput.value && dateInput.value < todayISO) {
            dateInput.value = todayISO;
        }
    }

    function getContactoErrorElement(field) {
        if (!field) {
            return null;
        }

        const explicitTarget = field.getAttribute('data-error-target');
        if (explicitTarget) {
            return document.querySelector(explicitTarget);
        }

        if (field.name === 'space_interest') {
            return document.getElementById('error-espacios');
        }

        if (field.name === 'privacy_accept') {
            return document.getElementById('error-privacidad');
        }

        if (field.id && field.id.startsWith('contacto-')) {
            const suffix = field.id.replace('contacto-', '');
            return document.getElementById(`error-${suffix}`);
        }

        return null;
    }

    function setContactoErrorVisibility(field, hasError) {
        if (!field) {
            return;
        }

        const errorElement = getContactoErrorElement(field);
        if (errorElement) {
            errorElement.hidden = !hasError;
        }

        if (hasError) {
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.removeAttribute('aria-invalid');
        }

        if (field.type === 'checkbox') {
            const wrapper = field.closest('.contacto-checkbox');
            if (wrapper) {
                if (hasError) {
                    wrapper.setAttribute('aria-invalid', 'true');
                } else {
                    wrapper.removeAttribute('aria-invalid');
                }
            }
        }
    }

    function validateContactoField(field, { showErrors = true } = {}) {
        if (!field) {
            return true;
        }

        const { validate } = field.dataset;
        const value = typeof field.value === 'string' ? field.value.trim() : field.value;
        let isValid = true;

        switch (validate) {
            case 'text':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'tel': {
                const digits = value.replace(/\D+/g, '');
                isValid = digits.length >= 10;
                break;
            }
            case 'select':
                isValid = value !== '';
                break;
            case 'date':
                isValid = Boolean(value) && (!field.min || value >= field.min);
                break;
            case 'checkbox':
                isValid = field.checked;
                break;
            default:
                isValid = field.checkValidity ? field.checkValidity() : true;
        }

        if (isValid) {
            setContactoErrorVisibility(field, false);
        } else if (showErrors) {
            setContactoErrorVisibility(field, true);
        }

        return isValid;
    }

    function handleContactoSubmit(event) {
        if (!contactoForm) {
            return;
        }

        event.preventDefault();
        exitContactoSuccessState();

        if (contactoState.isSubmitting) {
            return;
        }

        const honeypot = contactoForm.querySelector('.contacto-honeypot');
        if (honeypot && honeypot.value.trim()) {
            return;
        }

        clearContactoStatus(true);

        let isValid = true;
        const fields = contactoForm.querySelectorAll('[data-validate]');
        fields.forEach(field => {
            if (!validateContactoField(field, { showErrors: true })) {
                isValid = false;
            }
        });

        if (!validateContactoSpaces(true)) {
            isValid = false;
        }

        if (!isValid) {
            if (contactoStatus) {
                contactoStatus.textContent = 'Revisa los campos marcados.';
                contactoStatus.dataset.status = 'error';
            }

            const firstInvalid = contactoForm.querySelector('[aria-invalid="true"]');
            if (firstInvalid && typeof firstInvalid.focus === 'function') {
                firstInvalid.focus();
            } else if (!contactoState.activeSpaces.size && contactoChips.length) {
                contactoChips[0].focus();
            }
            return;
        }

        setContactoSubmitting(true);
        if (contactoStatus) {
            contactoStatus.textContent = 'Enviando detalles...';
            contactoStatus.dataset.status = 'pending';
        }

        updateContactoSpacesValue();
        const submissionData = collectContactoFormData();

        // Placeholder async submission; swap with real API integration when ready.
        setTimeout(() => {
            console.info('Contacto form submission payload:', submissionData);
            handleContactoSubmissionSuccess(submissionData);
        }, 900);
    }

    function setContactoSubmitting(isSubmitting) {
        if (!contactoForm) {
            return;
        }

        contactoState.isSubmitting = isSubmitting;
        if (isSubmitting) {
            contactoForm.setAttribute('aria-busy', 'true');
        } else {
            contactoForm.removeAttribute('aria-busy');
        }

        if (contactoSubmitButton) {
            contactoSubmitButton.disabled = isSubmitting;
        }

        if (contactoSecondaryButton) {
            contactoSecondaryButton.disabled = isSubmitting;
        }
    }

    function collectContactoFormData() {
        if (!contactoForm) {
            return {};
        }

        const formData = new FormData(contactoForm);
        const payload = {};
        formData.forEach((value, key) => {
            payload[key] = value;
        });
        payload.space_interest = Array.from(contactoState.activeSpaces);
        payload.flexible_date = formData.get('flexible_date') === 'true';
        payload.privacy_accept = formData.get('privacy_accept') === 'true';
        return payload;
    }

    function handleContactoSubmissionSuccess(payload) {
        if (!contactoForm) {
            return;
        }

        setContactoSubmitting(false);
        contactoForm.reset();
        resetContactoFormVisuals({ preserveSuccess: true, resetStatus: false });
        setContactoMinimumDate();

        contactoForm.classList.add('contacto-form--success');
        if (contactoSuccess) {
            contactoSuccess.hidden = false;
        }

        contactoState.hasSuccess = true;
        if (contactoStatus) {
            contactoStatus.textContent = 'Solicitud enviada. Respondemos en 24h.';
            contactoStatus.dataset.status = 'success';
        }

        const firstSuccessAction = contactoSuccess ? contactoSuccess.querySelector('.btn') : null;
        if (firstSuccessAction && typeof firstSuccessAction.focus === 'function') {
            firstSuccessAction.focus();
        }

        if (payload) {
            const submittedEvent = new CustomEvent('contacto:submitted', {
                bubbles: true,
                detail: payload
            });
            contactoForm.dispatchEvent(submittedEvent);
        }
    }

    function resetContactoFormVisuals({ preserveSuccess = false, resetStatus = true } = {}) {
        if (!contactoForm) {
            return;
        }

        contactoState.activeSpaces.clear();
        contactoChips.forEach(chip => {
            chip.classList.remove('is-active');
            chip.setAttribute('aria-pressed', 'false');
        });
        updateContactoSpacesValue();
        setChipsErrorState(false);

        const errors = contactoForm.querySelectorAll('.contacto-field__error');
        errors.forEach(errorEl => {
            errorEl.hidden = true;
        });

        const validatedFields = contactoForm.querySelectorAll('[data-validate]');
        validatedFields.forEach(field => {
            field.removeAttribute('aria-invalid');
            if (field.type === 'checkbox') {
                const wrapper = field.closest('.contacto-checkbox');
                if (wrapper) {
                    wrapper.removeAttribute('aria-invalid');
                }
            }
        });

        if (!preserveSuccess) {
            contactoForm.classList.remove('contacto-form--success');
            if (contactoSuccess) {
                contactoSuccess.hidden = true;
            }
            contactoState.hasSuccess = false;
        } else {
            contactoState.hasSuccess = true;
        }

        if (resetStatus) {
            clearContactoStatus(true);
        }
    }

    function exitContactoSuccessState() {
        if (!contactoState.hasSuccess || !contactoForm) {
            return;
        }

        contactoForm.classList.remove('contacto-form--success');
        if (contactoSuccess) {
            contactoSuccess.hidden = true;
        }
        contactoState.hasSuccess = false;
    }

    function clearContactoStatus(force = false) {
        if (!contactoStatus) {
            return;
        }

        if (force || contactoStatus.dataset.status === 'error' || contactoStatus.dataset.status === 'pending') {
            contactoStatus.textContent = '';
            delete contactoStatus.dataset.status;
        }
    }

    function initContactoMap() {
        if (!contactoMapTrigger || !contactoMapContainer) {
            return;
        }

        const mapLink = contactoMapContainer.getAttribute('data-map-link');
        contactoMapTrigger.addEventListener('click', () => {
            if (!contactoState.mapLoaded) {
                loadContactoMapEmbed();
                contactoState.mapLoaded = true;
                contactoMapTrigger.setAttribute('aria-expanded', 'true');
                contactoMapTrigger.textContent = 'Abrir en Google Maps';
                contactoMapTrigger.setAttribute('aria-label', 'Abrir mapa interactivo en Google Maps');
                return;
            }

            if (mapLink) {
                window.open(mapLink, '_blank', 'noopener');
            }
        });
    }

    function loadContactoMapEmbed() {
        if (!contactoMapContainer) {
            return;
        }

        const mapSrc = contactoMapContainer.getAttribute('data-map-src');
        if (!mapSrc) {
            return;
        }

        contactoMapContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = mapSrc;
        iframe.width = '600';
        iframe.height = '450';
        iframe.style.border = '0';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer-when-downgrade';
        iframe.title = 'Mapa de ubicación de D\'Carlo';
        iframe.setAttribute('allowfullscreen', '');
        contactoMapContainer.appendChild(iframe);
    }

    function initContactoAccordion() {
        if (!contactoAccordionTriggers.length) {
            return;
        }

        contactoAccordionTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => toggleContactoAccordion(trigger));
        });
    }

    function toggleContactoAccordion(trigger) {
        if (!trigger) {
            return;
        }

        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const nextState = !isExpanded;
        trigger.setAttribute('aria-expanded', String(nextState));

        const panelId = trigger.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (panel) {
            panel.hidden = !nextState;
        }

        if (!contactoAccordionTriggers.length) {
            return;
        }

        if (nextState) {
            contactoAccordionTriggers.forEach(otherTrigger => {
                if (otherTrigger === trigger) {
                    return;
                }
                otherTrigger.setAttribute('aria-expanded', 'false');
                const otherPanelId = otherTrigger.getAttribute('aria-controls');
                const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
                if (otherPanel) {
                    otherPanel.hidden = true;
                }
            });
        }
    }

    function initContactoModalTrigger() {
        if (!contactoModalTrigger) {
            return;
        }

        contactoModalTrigger.addEventListener('click', () => {
            const modalEvent = new CustomEvent('contacto:open-modal', {
                bubbles: true,
                cancelable: true,
                detail: { source: 'contacto-form' }
            });

            const wasHandled = !contactoModalTrigger.dispatchEvent(modalEvent);

            if (!wasHandled && contactoStatus) {
                contactoStatus.textContent = 'Nuestro concierge coordinará la visita por correo.';
                contactoStatus.dataset.status = 'success';
            }
        });
    }

    function initContactoNewRequestButton() {
        if (!contactoNewRequestButton || !contactoForm) {
            return;
        }

        contactoNewRequestButton.addEventListener('click', () => {
            resetContactoFormVisuals();
            setContactoMinimumDate();
            if (!prefersReducedMotion) {
                contactoForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                contactoForm.scrollIntoView({ behavior: 'auto', block: 'start' });
            }

            const firstField = contactoForm.querySelector('[data-validate]');
            if (firstField && typeof firstField.focus === 'function') {
                firstField.focus();
            }
        });
    }

    // ========================================
    // FOOTER SECTION
    // ========================================

    function initFooter() {
        if (!footer) {
            return;
        }

        updateFooterYear();
        setupFooterAccordion();
        setupFooterBackToTop();
    }

    function updateFooterYear() {
        if (!footerYear) {
            return;
        }

        const currentYear = new Date().getFullYear();
        footerYear.textContent = currentYear;
    }

    function setupFooterAccordion() {
        if (!footerNavToggles.length) {
            return;
        }

        footerNavToggles.forEach(toggle => {
            toggle.addEventListener('click', () => handleFooterToggle(toggle));
        });

        applyFooterAccordionState(true);

        if (!footerState.resizeListenerAttached) {
            window.addEventListener('resize', handleFooterResize);
            footerState.resizeListenerAttached = true;
        }
    }

    function handleFooterToggle(toggle) {
        if (!toggle || toggle.disabled) {
            return;
        }

        const group = toggle.closest('[data-footer-group]');
        const panel = group ? group.querySelector('[data-footer-panel]') : null;
        if (!panel) {
            return;
        }

        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const nextState = !isExpanded;
        toggle.setAttribute('aria-expanded', String(nextState));
        panel.hidden = !nextState;
    }

    function applyFooterAccordionState(forceReset = false) {
        if (!footerNavGroups.length) {
            return;
        }

        const isMobile = window.innerWidth < 768;

        if (!isMobile) {
            footerNavGroups.forEach(group => {
                const toggle = group.querySelector('[data-footer-toggle]');
                const panel = group.querySelector('[data-footer-panel]');
                if (!toggle || !panel) {
                    return;
                }
                toggle.disabled = true;
                toggle.setAttribute('aria-expanded', 'true');
                panel.hidden = false;
            });
        } else {
            footerNavGroups.forEach(group => {
                const toggle = group.querySelector('[data-footer-toggle]');
                const panel = group.querySelector('[data-footer-panel]');
                if (!toggle || !panel) {
                    return;
                }

                toggle.disabled = false;

                if (forceReset || footerState.isMobileAccordion !== true) {
                    const shouldOpen = group.dataset.footerDefault === 'open';
                    toggle.setAttribute('aria-expanded', String(shouldOpen));
                    panel.hidden = !shouldOpen;
                } else {
                    const expanded = toggle.getAttribute('aria-expanded') === 'true';
                    panel.hidden = !expanded;
                }
            });
        }

        footerState.isMobileAccordion = isMobile;
    }

    function handleFooterResize() {
        clearTimeout(footerState.resizeTimeout);
        footerState.resizeTimeout = setTimeout(() => {
            applyFooterAccordionState();
            updateFooterBackToTop();
        }, 180);
    }

    function setupFooterBackToTop() {
        if (!footerBackToTop) {
            return;
        }

        footerBackToTop.addEventListener('click', handleFooterBackToTopClick);
        updateFooterBackToTop();

        window.addEventListener('scroll', updateFooterBackToTop, { passive: true });
        if (!footerState.resizeListenerAttached) {
            window.addEventListener('resize', handleFooterResize);
            footerState.resizeListenerAttached = true;
        }
    }

    function handleFooterBackToTopClick(event) {
        event.preventDefault();

        if (prefersReducedMotion) {
            window.scrollTo({ top: 0, behavior: 'auto' });
        } else {
            smoothScrollTo('#inicio');
        }
    }

    function updateFooterBackToTop() {
        if (!footerBackToTop) {
            return;
        }

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            footerBackToTop.hidden = false;
            footerBackToTop.classList.add('footer-back-to-top--floating');
            footerBackToTop.classList.add('is-visible');
        } else {
            footerBackToTop.classList.remove('footer-back-to-top--floating');
            const shouldShow = window.scrollY > 240;
            footerBackToTop.classList.toggle('is-visible', shouldShow);
            footerBackToTop.hidden = !shouldShow;
        }
    }

    // ========================================
    // GALERIA SECTION
    // ========================================

    function initGaleria() {
        if (!galeriaSection || !galeriaGrid || !galeriaCardTemplate) {
            return;
        }

        initGaleriaCardObserver();
        updateGaleriaFilterButtons(galeriaState.activeSpace);
        renderGaleria(false);

        galeriaFilterButtons.forEach(button => {
            button.addEventListener('click', handleGaleriaFilterClick);
        });

        if (galeriaLoadMoreButton) {
            galeriaLoadMoreButton.addEventListener('click', handleGaleriaLoadMore);
        }

        if (galeriaLightboxClose) {
            galeriaLightboxClose.addEventListener('click', () => closeGaleriaLightbox());
        }

        if (galeriaLightboxBackdrop) {
            galeriaLightboxBackdrop.addEventListener('click', () => closeGaleriaLightbox());
        }

        if (galeriaLightboxPrev) {
            galeriaLightboxPrev.addEventListener('click', () => showGaleriaLightboxPrevious());
        }

        if (galeriaLightboxNext) {
            galeriaLightboxNext.addEventListener('click', () => showGaleriaLightboxNext());
        }

        if (galeriaLightboxMedia) {
            galeriaLightboxMedia.addEventListener('touchstart', handleGaleriaLightboxTouchStart, { passive: true });
            galeriaLightboxMedia.addEventListener('touchend', handleGaleriaLightboxTouchEnd, { passive: true });
            galeriaLightboxMedia.addEventListener('pointerdown', handleGaleriaLightboxTouchStart, { passive: true });
            galeriaLightboxMedia.addEventListener('pointerup', handleGaleriaLightboxTouchEnd, { passive: true });
        }
    }

    function initGaleriaCardObserver() {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            galeriaCardObserver = null;
            return;
        }

        galeriaCardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    galeriaCardObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.18
        });
    }

    function handleGaleriaFilterClick(event) {
        const button = event.currentTarget;
        const value = button.getAttribute('data-galeria-filter');
        if (!value || galeriaState.activeSpace === value) {
            return;
        }

        galeriaState.activeSpace = value;
        galeriaState.visibleCount = GALERIA_INITIAL_BATCH;
        galeriaState.lastFocusedTrigger = button;
        updateGaleriaFilterButtons(value);
        renderGaleria();
    }

    function handleGaleriaLoadMore() {
        galeriaState.visibleCount += GALERIA_BATCH_SIZE;
        renderGaleria();
    }

    function updateGaleriaFilterButtons(activeValue) {
        galeriaFilterButtons.forEach(button => {
            const value = button.getAttribute('data-galeria-filter');
            const isActive = value === activeValue;
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function renderGaleria(announce = true) {
        if (!galeriaGrid) {
            return;
        }

        updateGaleriaFilterButtons(galeriaState.activeSpace);
        if (galeriaCardObserver) {
            galeriaCardObserver.disconnect();
        }

    const filtered = galeriaItems.filter((item, index) => matchesGaleriaFilters(item, index));
        galeriaState.filteredItems = filtered;

        const visibleItems = filtered.slice(0, galeriaState.visibleCount);
        galeriaGrid.innerHTML = '';

        visibleItems.forEach((item, index) => {
            const card = createGaleriaCard(item, index);
            galeriaGrid.appendChild(card);

            if (galeriaCardObserver) {
                card.style.transitionDelay = `${index * 60}ms`;
                galeriaCardObserver.observe(card);
            } else {
                card.classList.add('is-visible');
            }
        });

        if (galeriaLoadMoreButton) {
            const hasMore = galeriaState.visibleCount < filtered.length;
            galeriaLoadMoreButton.hidden = !hasMore;
            galeriaLoadMoreButton.disabled = !hasMore;
        }

        if (galeriaEmptyMessage) {
            galeriaEmptyMessage.hidden = filtered.length !== 0;
        }

        if (galeriaLiveRegion && announce) {
            const total = filtered.length;
            const shown = visibleItems.length;
            const spaceLabel = galeriaState.activeSpace;
            galeriaLiveRegion.textContent = total ? `${shown} de ${total} resultados mostrados para ${spaceLabel}.` : 'No se encontraron resultados con los filtros seleccionados.';
        }

        if (!filtered.length && galeriaLoadMoreButton) {
            galeriaLoadMoreButton.hidden = true;
        }
    }

    function createGaleriaCard(item, index) {
        const templateContent = galeriaCardTemplate.content.cloneNode(true);
        const card = templateContent.querySelector('.galeria-card');
        const mediaButton = templateContent.querySelector('[data-galeria-card-trigger]');
        const pictureEl = templateContent.querySelector('[data-galeria-card-picture]');
        const labelEl = templateContent.querySelector('[data-galeria-card-label]');
        const captionEl = templateContent.querySelector('[data-galeria-card-caption]');

        if (!card || !mediaButton || !pictureEl) {
            return document.createElement('div');
        }

        card.dataset.space = item.space;
        card.dataset.tags = item.tags.join('|');

        pictureEl.innerHTML = '';
        if (Array.isArray(item.sources) && item.sources.length) {
            item.sources.forEach(sourceData => {
                const source = document.createElement('source');
                if (sourceData.type) {
                    source.type = sourceData.type;
                }
                if (sourceData.srcset) {
                    source.srcset = sourceData.srcset;
                }
                source.sizes = sourceData.sizes || GALERIA_IMAGE_SIZES;
                pictureEl.appendChild(source);
            });
        }

        const img = document.createElement('img');
        const targetWidth = item.width || 900;
        const targetHeight = item.height || 1200;
        const isHighPriority = item.priority === 'high' || index === 0;

        img.classList.add('galeria-card__image');
        img.src = item.fallback;
        img.alt = item.alt;
        img.decoding = 'async';
        img.width = targetWidth;
        img.height = targetHeight;
        img.setAttribute('width', String(targetWidth));
        img.setAttribute('height', String(targetHeight));

        if (item.srcset) {
            img.srcset = item.srcset;
            img.sizes = GALERIA_IMAGE_SIZES;
        }

        if (isHighPriority) {
            img.loading = 'eager';
            img.setAttribute('loading', 'eager');
            img.setAttribute('fetchpriority', 'high');
        } else {
            img.loading = 'lazy';
            img.setAttribute('loading', 'lazy');
        }

        pictureEl.appendChild(img);

        mediaButton.dataset.galeriaItemId = item.id;
        mediaButton.setAttribute('aria-label', item.alt);
        mediaButton.addEventListener('click', () => {
            galeriaState.lastFocusedTrigger = mediaButton;
            openGaleriaLightbox(item.id);
        });

        if (labelEl) {
            labelEl.textContent = item.space;
        }

        if (captionEl) {
            captionEl.textContent = item.caption || item.alt;
        }

        return card;
    }

    function matchesGaleriaFilters(item, index) {
        const filter = galeriaState.activeSpace;

        if (filter === 'Todos') {
            return true;
        }

        // Map filters to 1-based DOM card positions as requested
        const position = index + 1; // convert 0-based index to 1-based

        if (filter === "Jardín D'Carlo") {
            return position === 1 || position === 4 || position === 6 || position === 8;
        }

        if (filter === 'Salón Amanda') {
            return position === 2 || position === 5 || position === 7;
        }

        if (filter === 'Salón América') {
            return position === 3;
        }

        return true;
    }

    function openGaleriaLightbox(itemId) {
        if (!galeriaLightbox || !galeriaLightboxDialog) {
            return;
        }

        const visibleItems = galeriaState.filteredItems.slice(0, galeriaState.visibleCount);
        const itemIndex = visibleItems.findIndex(item => item.id === itemId);
        if (itemIndex === -1) {
            return;
        }

        galeriaLightboxState.items = visibleItems;
        galeriaLightboxState.index = itemIndex;
        galeriaLightboxState.previousFocus = document.activeElement;

        updateGaleriaLightbox();

        galeriaLightbox.hidden = false;
        galeriaLightbox.setAttribute('aria-hidden', 'false');
        galeriaLightbox.classList.add('galeria-lightbox--visible');
        document.body.classList.add('lightbox-open');
        galeriaLightboxState.isOpen = true;
        galeriaLightboxState.focusTrapCleanup = createFocusTrap(galeriaLightboxDialog);

        if (galeriaLightboxClose) {
            galeriaLightboxClose.focus();
        }

        document.addEventListener('keydown', handleGaleriaLightboxKeydown);
    }

    function updateGaleriaLightbox() {
        if (!galeriaLightboxState.items.length) {
            return;
        }

        const item = galeriaLightboxState.items[galeriaLightboxState.index];
        if (!item || !galeriaLightboxPicture) {
            return;
        }

        galeriaLightboxPicture.innerHTML = '';
        item.sources.forEach(sourceData => {
            const source = document.createElement('source');
            source.type = sourceData.type;
            source.srcset = sourceData.srcset;
            source.sizes = GALERIA_IMAGE_SIZES;
            galeriaLightboxPicture.appendChild(source);
        });

        const img = document.createElement('img');
        img.src = item.fallback;
        img.alt = item.alt;
        img.sizes = GALERIA_IMAGE_SIZES;
        img.srcset = item.srcset;
        img.decoding = 'async';
        galeriaLightboxPicture.appendChild(img);

        const total = galeriaLightboxState.items.length;
        const current = galeriaLightboxState.index + 1;

        if (galeriaLightboxTitle) {
            galeriaLightboxTitle.textContent = `${current} de ${total} · ${item.space}`;
        }

        if (galeriaLightboxCaption) {
            galeriaLightboxCaption.textContent = item.caption || item.alt;
        }

        if (galeriaLightboxSpace) {
            galeriaLightboxSpace.textContent = item.space;
        }

        if (galeriaLightboxTags) {
            galeriaLightboxTags.innerHTML = '';
            item.tags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.className = 'galeria-lightbox__tag';
                tagEl.textContent = tag;
                galeriaLightboxTags.appendChild(tagEl);
            });
        }

        if (galeriaLightboxPrev) {
            galeriaLightboxPrev.disabled = galeriaLightboxState.index === 0;
        }

        if (galeriaLightboxNext) {
            galeriaLightboxNext.disabled = galeriaLightboxState.index === total - 1;
        }
    }

    function closeGaleriaLightbox() {
        if (!galeriaLightboxState.isOpen || !galeriaLightbox) {
            return;
        }

        galeriaLightboxState.isOpen = false;
        galeriaLightbox.classList.remove('galeria-lightbox--visible');
        galeriaLightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        document.removeEventListener('keydown', handleGaleriaLightboxKeydown);

        if (galeriaLightboxState.focusTrapCleanup) {
            galeriaLightboxState.focusTrapCleanup();
            galeriaLightboxState.focusTrapCleanup = null;
        }

        galeriaLightboxState.touchStartX = null;

        setTimeout(() => {
            if (galeriaLightbox) {
                galeriaLightbox.hidden = true;
            }
            if (galeriaLightboxPicture) {
                galeriaLightboxPicture.innerHTML = '';
            }
        }, 320);

        const returnFocus = galeriaState.lastFocusedTrigger || galeriaLightboxState.previousFocus;
        if (returnFocus && typeof returnFocus.focus === 'function') {
            returnFocus.focus();
        }

        galeriaState.lastFocusedTrigger = null;
        galeriaLightboxState.previousFocus = null;
    }

    function showGaleriaLightboxNext() {
        if (!galeriaLightboxState.isOpen) {
            return;
        }

        if (galeriaLightboxState.index < galeriaLightboxState.items.length - 1) {
            galeriaLightboxState.index += 1;
            updateGaleriaLightbox();
        }
    }

    function showGaleriaLightboxPrevious() {
        if (!galeriaLightboxState.isOpen) {
            return;
        }

        if (galeriaLightboxState.index > 0) {
            galeriaLightboxState.index -= 1;
            updateGaleriaLightbox();
        }
    }

    function handleGaleriaLightboxKeydown(event) {
        if (!galeriaLightboxState.isOpen) {
            return;
        }

        if (event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            closeGaleriaLightbox();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            showGaleriaLightboxNext();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showGaleriaLightboxPrevious();
        }
    }

    function handleGaleriaLightboxTouchStart(event) {
        if ('pointerType' in event && event.pointerType !== 'touch') {
            return;
        }
        const point = event.changedTouches ? event.changedTouches[0] : event;
        galeriaLightboxState.touchStartX = point.clientX;
    }

    function handleGaleriaLightboxTouchEnd(event) {
        if ('pointerType' in event && event.pointerType !== 'touch') {
            galeriaLightboxState.touchStartX = null;
            return;
        }
        if (galeriaLightboxState.touchStartX === null) {
            return;
        }

        const point = event.changedTouches ? event.changedTouches[0] : event;
        const deltaX = point.clientX - galeriaLightboxState.touchStartX;
        galeriaLightboxState.touchStartX = null;

        if (Math.abs(deltaX) < 40) {
            return;
        }

        if (deltaX < 0) {
            showGaleriaLightboxNext();
        } else {
            showGaleriaLightboxPrevious();
        }
    }
    
    // Run init when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
