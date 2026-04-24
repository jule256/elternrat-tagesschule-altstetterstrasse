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
// EVENTS SECTION - HORIZONTAL SCROLL
// ===================================

const eventsScrollContainer = document.querySelector('.events-scroll-container');
const eventsHeaderSticky = document.querySelector('.events-header-sticky');

if (eventsScrollContainer) {
    const containerPadding = 100;

    const getScrollWidth = () => {
        return eventsScrollContainer.scrollWidth - window.innerWidth + containerPadding;
    };

    const getNavHeight = () => {
        return document.querySelector('.nav').offsetHeight;
    };

    // fade in header earlier before horizontal scroll starts
    ScrollTrigger.create({
        trigger: '.events-scroll-wrapper',
        start: () => `top ${getNavHeight() + 120}px`,
        end: () => `+=${getScrollWidth()}`,
        invalidateOnRefresh: true,
        onEnter: () => {
            gsap.to(eventsHeaderSticky, { opacity: 1, duration: 0.3 });
        },
        onLeave: () => {
            gsap.to(eventsHeaderSticky, { opacity: 0, duration: 0.3 });
        },
        onEnterBack: () => {
            gsap.to(eventsHeaderSticky, { opacity: 1, duration: 0.3 });
        },
        onLeaveBack: () => {
            gsap.to(eventsHeaderSticky, { opacity: 0, duration: 0.3 });
        }
    });

    // horizontal scroll animation
    gsap.to(eventsScrollContainer, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
            trigger: '.events-scroll-wrapper',
            start: () => `top ${getNavHeight()}px`,
            end: () => `+=${getScrollWidth()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });
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

// ===================================
// NAVIGATION SHADOW ON SCROLL
// ===================================

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

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
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

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
