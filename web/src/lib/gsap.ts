import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Export configured gsap instance
export { gsap, ScrollTrigger };

// Common animation presets
export const animations = {
    fadeIn: {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
    },
    fadeInUp: {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
    },
    scaleIn: {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
    },
    slideInLeft: {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    },
    slideInRight: {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
    },
};

// ScrollTrigger defaults
export const scrollTriggerDefaults = {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
};
