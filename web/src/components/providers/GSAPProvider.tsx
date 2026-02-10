'use client';

import { useLayoutEffect, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap'; // Centralized import - no duplicate registration

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
    useLayoutEffect(() => {
        // Initial refresh after layout
        ScrollTrigger.refresh();

        return () => {
            // Kill all ScrollTriggers on unmount to prevent ghost animations
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            // Clear all GSAP animations
            gsap.killTweensOf('*');
        };
    }, []);

    // Refresh on window load (fonts, images loaded)
    useEffect(() => {
        const handleLoad = () => {
            ScrollTrigger.refresh();
        };

        if (document.readyState === 'complete') {
            ScrollTrigger.refresh();
        } else {
            window.addEventListener('load', handleLoad);
        }

        // Refresh on resize
        const handleResize = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <>{children}</>;
}
