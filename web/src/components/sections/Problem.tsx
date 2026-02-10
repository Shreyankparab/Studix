'use client';

import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Thought lines representing cognitive overload
const thoughtLines = [
    "Too many tabs open.",
    "Endless notifications.",
    "Information everywhere.",
    "Can't focus anymore.",
    "Overwhelmed daily.",
    "Nothing sticks.",
];

const Problem: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const linesContainerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Check reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
    }, []);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = linesContainerRef.current;

        if (!section || !container) return;

        const lineEls = container.querySelectorAll('.thought-line');
        if (!lineEls || lineEls.length === 0) return;

        const ctx = gsap.context(() => {
            // Initial state: all lines blurred and degraded
            gsap.set(lineEls, {
                opacity: 0.15,
                scale: 0.95,
                filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)',
                color: 'var(--text-secondary)',
            });

            // Create scrubbed timeline with dynamic z-index management
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'problem-section',
                    trigger: section,
                    start: 'top top',
                    end: '+=200%', // Scroll distance for all 6 lines
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

            scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

            // Duration settings - increased for all 6 lines to complete
            const activateDuration = 0.1;   // Time to snap into focus
            const holdDuration = 0.25;      // Time to stay in focus (readable)
            const degradeDuration = 0.1;    // Time to blur out
            const cycleDuration = activateDuration + holdDuration + degradeDuration; // 0.45 per line

            // Animate each line: activate → hold → degrade
            lineEls.forEach((el, i) => {
                const cycleStart = i * cycleDuration;

                // Activate: snap into focus
                tl.to(el, {
                    opacity: 1,
                    scale: 1.12,
                    filter: 'blur(0px)',
                    color: '#ffffff',
                    duration: activateDuration,
                    ease: 'power2.out',
                }, cycleStart);

                // Hold in focus
                tl.to({}, { duration: holdDuration }, cycleStart + activateDuration);

                // Degrade: blur and shrink
                tl.to(el, {
                    opacity: 0.12,
                    scale: 0.94,
                    filter: prefersReducedMotion ? 'blur(0px)' : 'blur(12px)',
                    color: 'var(--text-secondary)',
                    duration: degradeDuration,
                    ease: 'power2.in',
                }, cycleStart + activateDuration + holdDuration);
            });

            // Hold at end to let user absorb before next section
            tl.to({}, { duration: 0.3 });

        }, section);

        return () => {
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
            ctx.revert();
        };
    }, [prefersReducedMotion]);

    return (
        <section
            ref={sectionRef}
            className="problem-section relative h-screen w-full flex items-center px-6 md:px-12 lg:px-20"
            style={{ overflow: 'hidden', zIndex: 1, backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="w-full max-w-5xl">
                {/* Thought lines container */}
                <div
                    ref={linesContainerRef}
                    className="flex flex-col items-start gap-5"
                >
                    {thoughtLines.map((line, index) => (
                        <p
                            key={index}
                            className="thought-line text-left will-change-transform"
                            style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.75rem)',
                                fontWeight: 500,
                                letterSpacing: '-0.01em',
                                lineHeight: 1.3,
                                transformOrigin: 'left center',
                            }}
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
