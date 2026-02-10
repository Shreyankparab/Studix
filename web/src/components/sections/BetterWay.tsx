'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const BetterWay: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const text = textRef.current;

        if (!section || !text) return;

        const ctx = gsap.context(() => {
            // Initial state
            gsap.set(text, { opacity: 0, scale: 0.95, y: 30, filter: 'blur(10px)' });

            // Pinned timeline with dynamic z-index (same pattern as Problem)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    // Dynamic z-index: boost when entering, reset when leaving
                    onEnter: () => gsap.set(section, { zIndex: 100 }),
                    onLeave: () => gsap.set(section, { zIndex: 1 }),
                    onEnterBack: () => gsap.set(section, { zIndex: 100 }),
                    onLeaveBack: () => gsap.set(section, { zIndex: 1 }),
                }
            });

            // Text appears with blur effect
            tl.to(text, {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.4,
                ease: 'power3.out',
            });

            // Hold for user to read
            tl.to({}, { duration: 0.6 });

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="better-way-section relative w-full h-screen flex items-center justify-center"
            style={{
                backgroundColor: 'var(--bg-primary)',
                zIndex: 1  // Low default, boosted dynamically when active
            }}
        >
            <h2
                ref={textRef}
                className="text-primary text-center px-4"
                style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    maxWidth: '90%',
                }}
            >
                You deserve a better way.
            </h2>
        </section>
    );
};

export default BetterWay;
