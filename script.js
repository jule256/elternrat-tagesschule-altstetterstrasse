// ==================================================
// GSAP ScrollTrigger Registration and Configuration
// ==================================================

gsap.registerPlugin(ScrollTrigger);
const mm = gsap.matchMedia();

// ===================================
// DESKTOP / MOBILE DEFINITION
// ===================================
const desktopMobileBreakpoint = 768;

// ===================================
// DYNAMIC COPYRIGHT YEAR AND VERSION
// ===================================

document.getElementById('current-year').textContent = new Date().getFullYear();
const version = 'developer-preview';
document.getElementById('current-version').textContent = version;

// ===================================
// MOBILE BURGER MENU
// ===================================

const burgerMenu = document.querySelector('.burger-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

// toggle burger menu
burgerMenu.addEventListener('click', () => {
    const isActive = burgerMenu.classList.contains('active');

    if (isActive) {
        closeMobileMenu();
    } else {
        burgerMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuOverlay.classList.remove('closing');
        document.body.style.overflow = 'hidden';
    }
});

// close menu when clicking on a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

function closeMobileMenu() {
    burgerMenu.classList.remove('active');
    mobileMenuOverlay.classList.add('closing');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';

    setTimeout(() => {
        // remove closing class after animation completes
        mobileMenuOverlay.classList.remove('closing');
    }, 200);
}

// ===================================
// SHRINKING NAVIGATION ON SCROLL
// ===================================

// get nav elements (used both for shrinking and shadow effects)
const nav = document.querySelector('.nav');
const navLogoContainer = document.querySelector('.nav-logo');
const navLogo = document.querySelector('.nav-logo img');

// only apply shrinking effect on desktop
if (window.innerWidth > desktopMobileBreakpoint) {

    gsap.fromTo(nav,
        {
            height: '120px'
        },
        {
            height: '59px',
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: '+=200',
                scrub: 0.5,
                onUpdate: (self) => {
                    const progress = self.progress;

                    // shrink logo from 79px to 40px
                    const logoHeight = 79 - (progress * (79 - 40));
                    navLogo.style.height = logoHeight + 'px';

                    // reduce padding from 20px to 10px
                    const logoPadding = 20 - (progress * (20 - 10));
                    navLogoContainer.style.padding = logoPadding + 'px';
                }
            }
        }
    );
}

// fade in "Elternrat" text when hero section scrolls out
gsap.to('.nav-elternrat', {
    opacity: 1,
    duration: 0.5,
    scrollTrigger: {
        trigger: '.hero',
        start: 'bottom top',
        toggleActions: 'play none none reverse'
    }
});

// ===================================
// HERO ANIMATIONS
// ===================================

// animate hero content on load
gsap.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.to('.hero-text', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.7,
    ease: 'power3.out'
});

gsap.to('.hero-cta', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.9,
    ease: 'power3.out'
});

// ===================================
// HERO PARALLAX
// ===================================

gsap.fromTo('.hero-bg',
    {
        yPercent: 0
    },
    {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            id: 'hero-parallax'
        }
    }
);

// ===================================
// ABOUT SECTION ANIMATIONS
// ===================================

// text fades in from left
gsap.from('.about-text > *', {
    opacity: 0,
    x: -60,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
        id: "about-text"
    }
});

// about image animation
const baseTrigger = {
    trigger: '.about',
    end: 'top-=130px top',
    scrub: 1
};

mm.add({
    isDesktop: `(min-width: ${desktopMobileBreakpoint + 1}px)`,
    isMobile: `(max-width: ${desktopMobileBreakpoint}px)`
}, context => {
    let { isDesktop } = context.conditions;

    gsap.from('.about-image', {
        opacity: 0,
        ease: 'circ.out',
        x: isDesktop ? '100vw' : '20vw',
        scrollTrigger: {
            ...baseTrigger,
            start: isDesktop ? 'top bottom' : 'top 50%',
            id: isDesktop ? 'about-image-desktop' : 'about-image-mobile'
        }
    });
});

// ===================================
// AGENDA SECTION ANIMATIONS
// ===================================

gsap.from('.agenda .section-title, .agenda .section-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.agenda',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.calendar-container', {
    opacity: 0,
    scale: 0.95,
    duration: 1,
    scrollTrigger: {
        trigger: '.calendar-container',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    }
});

// ===================================
// TESTIMONIALS SECTION ANIMATIONS
// ===================================

gsap.from('.testimonials .section-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    scrollTrigger: {
        trigger: '.testimonials',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// fly-in animation for testimonial cards with predefined positions
const testimonialCards = gsap.utils.toArray('.testimonial-card');

testimonialCards.forEach((card, index) => {
    const fromLeft = card.dataset.from === 'left';
    const finalMargin = parseFloat(card.dataset.margin);
    const finalRotation = parseFloat(card.dataset.rotation);
    const delay = index * 0.15;

    // apply margin to card
    card.style.margin = `${finalMargin}px`;

    gsap.fromTo(card,
        {
            x: fromLeft ? -window.innerWidth - 200 : window.innerWidth + 200,
            y: 0,
            opacity: 0,
            rotation: fromLeft ? -35 : 35
        },
        {
            x: 0,
            y: 0,
            opacity: 1,
            rotation: finalRotation,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.testimonials-grid',
                start: 'top 100%',
                toggleActions: 'play none none reverse'
            },
            delay: delay
        }
    );
});

gsap.from('.cta-box', {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 1,
    scrollTrigger: {
        trigger: '.cta-box',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// ===================================
// EVENTS SECTION - NATIVE HORIZONTAL SCROLL
// ===================================

const eventsScrollWrapper = document.querySelector('.events-scroll-wrapper');
const eventItems = gsap.utils.toArray('.event-item');
const eventsDots = document.querySelector('.events-dots');
const eventsPrev = document.querySelector('.events-arrow-prev');
const eventsNext = document.querySelector('.events-arrow-next');

let currentEventIndex = 0;

if (eventsScrollWrapper && eventItems.length) {
    eventItems.forEach((item, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'events-dot';
        dot.setAttribute('aria-label', 'Event ' + (index + 1));
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToEvent(index));
        eventsDots.appendChild(dot);
    });

    const eventDots = gsap.utils.toArray('.events-dot');

    let eventsScrollAnimating = false;

    function scrollToEvent(index) {
        index = Math.max(0, Math.min(index, eventItems.length - 1));
        currentEventIndex = index;

        if (eventsScrollAnimating) return;

        const wrapper = eventsScrollWrapper;
        const wrapperRect = wrapper.getBoundingClientRect();
        const itemRect = eventItems[index].getBoundingClientRect();
        const maxTarget = wrapper.scrollWidth - wrapper.clientWidth;
        const target = Math.max(0, Math.min(
            wrapper.scrollLeft + (itemRect.left - wrapperRect.left) -
            (wrapper.clientWidth - itemRect.width) / 2,
            maxTarget
        ));

        const start = wrapper.scrollLeft;
        const delta = target - start;
        if (Math.abs(delta) < 1) return;

        // disable snapping during the animated scroll so the browser cannot cancel it
        wrapper.style.scrollSnapType = 'none';
        eventsScrollAnimating = true;

        const duration = 500;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            wrapper.scrollLeft = start + delta * eased;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                wrapper.style.scrollSnapType = '';
                eventsScrollAnimating = false;
            }
        }

        requestAnimationFrame(step);
    }

    function updateActiveEvent() {
        const scrollLeft = eventsScrollWrapper.scrollLeft;
        const wrapper = eventsScrollWrapper;
        const wrapperRect = wrapper.getBoundingClientRect();
        const maxTarget = wrapper.scrollWidth - wrapper.clientWidth;
        let closest = 0;
        let closestDistance = Infinity;

        eventItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const target = Math.max(0, Math.min(
                scrollLeft + (itemRect.left - wrapperRect.left) -
                (wrapperRect.width - itemRect.width) / 2,
                maxTarget
            ));
            const distance = Math.abs(target - scrollLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closest = index;
            }
        });

        currentEventIndex = closest;
        eventDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === closest);
        });
    }

    eventsScrollWrapper.addEventListener('scroll', debounce(updateActiveEvent, 60), { passive: true });
    eventsPrev.addEventListener('click', () => scrollToEvent(currentEventIndex - 1));
    eventsNext.addEventListener('click', () => scrollToEvent(currentEventIndex + 1));
}

// ===================================
// EVENTS SWIPE HINT (mobile)
// ===================================

const eventsSwipeHint = document.querySelector('.events-swipe-hint');

if (eventsSwipeHint && eventsScrollWrapper) {
    let hintShown = false;

    const hintObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!hintShown) {
                    hintShown = true;
                    eventsSwipeHint.classList.add('visible');
                }
            } else if (hintShown) {
                eventsSwipeHint.classList.remove('visible');
                hintObserver.disconnect();
            }
        });
    }, { threshold: 0.4 });

    hintObserver.observe(eventsScrollWrapper);

    // hide the hint as soon as the user actually starts swiping
    const hideSwipeHint = () => {
        if (!hintShown) return;
        eventsSwipeHint.classList.remove('visible');
        hintObserver.disconnect();
        eventsScrollWrapper.removeEventListener('scroll', handleHorizontalSwipe);
        eventsScrollWrapper.removeEventListener('pointerdown', handleHorizontalSwipe);
        eventsScrollWrapper.removeEventListener('touchstart', handleHorizontalSwipe);
    };
    const handleHorizontalSwipe = () => hideSwipeHint();
    eventsScrollWrapper.addEventListener('scroll', handleHorizontalSwipe, { passive: true });
    eventsScrollWrapper.addEventListener('pointerdown', handleHorizontalSwipe, { passive: true });
    eventsScrollWrapper.addEventListener('touchstart', handleHorizontalSwipe, { passive: true });
}

// ===================================
// FOOTER ANIMATIONS
// ===================================

gsap.from('.footer-section', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.footer-share', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    delay: 0.6,
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// ===================================
// NAVIGATION SHADOW ON SCROLL
// ===================================

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // add stronger shadow when scrolled
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#' || !targetId.startsWith('#')) return;

        e.preventDefault();

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// DEBOUNCE UTILITY
// ===================================

function debounce(func, wait) {
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

// ===================================
// REFRESH SCROLLTRIGGER ON RESIZE
// ===================================

const debouncedRefresh = debounce(() => {
    ScrollTrigger.refresh();
}, 300);

window.addEventListener('resize', debouncedRefresh);

// ===================================
// FOOTER SHARE
// ===================================

(function initShare() {
    const pageUrl = window.location.href;
    const pageTitle = document.title || 'Elternrat Tagesschule Altstetterstrasse';

    const shareText = pageTitle + '\n' + pageUrl;

    const whatsappBtn = document.getElementById('share-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(shareText);
    }

    const emailBtn = document.getElementById('share-email');
    if (emailBtn) {
        emailBtn.href = 'mailto:?subject=' + encodeURIComponent(pageTitle) + '&body=' + encodeURIComponent(shareText);
    }

    const nativeBtn = document.getElementById('share-native');
    if (nativeBtn && navigator.share) {
        if (window.matchMedia('(pointer: coarse)').matches) {
            nativeBtn.classList.add('available');
        }

        nativeBtn.addEventListener('click', function () {
            // never invoke navigator.share() on fine-pointer (desktop) devices:
            // desktop Chrome can kill the renderer there instead of rejecting,
            // and no .catch() can recover from a killed process.
            if (!navigator.share || !window.matchMedia('(pointer: coarse)').matches) {
                nativeBtn.classList.remove('available');
                nativeBtn.style.display = 'none';
                return;
            }
            navigator.share({ title: pageTitle, url: pageUrl })
                .catch(function (err) {
                    if (err.name === 'NotAllowedError' || err.name === 'TypeError') {
                        nativeBtn.classList.remove('available');
                        nativeBtn.style.display = 'none';
                    }
                });
        });
    }

    const copyBtn = document.getElementById('share-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText(pageUrl).then(function () {
                copyBtn.classList.add('copied');
                var label = copyBtn.querySelector('.copy-label');
                var originalText = label.textContent;
                label.textContent = 'Kopiert!';
                setTimeout(function () {
                    copyBtn.classList.remove('copied');
                    label.textContent = originalText;
                }, 2000);
            });
        });
    }
})();
