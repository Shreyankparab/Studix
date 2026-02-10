'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const sentences = [
    "When everything feels scattered",
    "When learning feels overwhelming",
    "When progress feels invisible",
];

const finalLine = "One calm system.";

const Audience: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        if (!section || !container) return;

        const sentenceEls = container.querySelectorAll('.narrative-sentence');
        const finalEl = container.querySelector('.final-line');
        const leadIn = container.querySelector('.lead-in'); // Now querying inside container

        if (!sentenceEls.length || !finalEl || !leadIn) return;

        const ctx = gsap.context(() => {
            // --- ENTRANCE ANIMATION ---
            // Creates visual handoff from previous section
            gsap.set(section, { opacity: 0, y: 60 });

            gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',  // Start animating before it's fully visible
                    end: 'top 60%',
                    scrub: 0.3,
                }
            });

            // Initial State
            gsap.set(sentenceEls, {
                opacity: 0,
                scale: 0.95,
                y: 20,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                willChange: 'opacity, transform',
            });

            // Final element centered and impact-ready
            gsap.set(finalEl, {
                opacity: 0,
                scale: 0.9,
                y: 40,
                filter: 'blur(12px)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                xPercent: -50,
                yPercent: -50,
                width: '100%',
                textAlign: 'center',
                willChange: 'opacity, transform, filter',
            });

            // Lead-in hidden initially, will animate in
            gsap.set(leadIn, { opacity: 0, y: 10 });

            // Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'audience-pin',
                    trigger: section,
                    start: 'top top',
                    end: '+=250%',
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                    // Dynamic z-index management
                    onEnter: () => gsap.set(section, { zIndex: 100 }),
                    onLeave: () => gsap.set(section, { zIndex: 1 }),
                    onEnterBack: () => gsap.set(section, { zIndex: 100 }),
                    onLeaveBack: () => gsap.set(section, { zIndex: 1 }),
                }
            });

            scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

            // --- ANIMATION SEQUENCE ---

            // 1. Lead-in appears with first sentence
            tl.to(leadIn, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0);

            // Sentence 1
            tl.to(sentenceEls[0], { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '<');
            tl.to({}, { duration: 0.3 }); // Read
            tl.to(sentenceEls[0], { opacity: 0, scale: 1.05, y: -20, duration: 0.2, ease: 'power2.in' });

            // Gap
            tl.to({}, { duration: 0.1 });

            // Sentence 2
            tl.to(sentenceEls[1], { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
            tl.to({}, { duration: 0.3 }); // Read
            tl.to(sentenceEls[1], { opacity: 0, scale: 1.05, y: -20, duration: 0.2, ease: 'power2.in' });

            // Gap
            tl.to({}, { duration: 0.1 });

            // Sentence 3
            tl.to(sentenceEls[2], { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
            tl.to({}, { duration: 0.3 }); // Read
            tl.to(sentenceEls[2], { opacity: 0, scale: 1.05, y: -20, duration: 0.2, ease: 'power2.in' });

            // Fade out Lead-in before final impact
            tl.to(leadIn, { opacity: 0, y: -10, duration: 0.3 }, '<');

            // --- FINAL IMPACT ---
            // "One calm system"
            // Matches "Better Way" effect: Blur -> Clear, Scale Up
            tl.to(finalEl, {
                opacity: 1,
                scale: 1,
                yPercent: -50, // Keep centered vertical
                xPercent: -50,
                y: 0, // Reset y offset
                filter: 'blur(0px)',
                duration: 0.6, // Slower, heavier impact
                ease: 'power3.out'
            }, '+=0.1');

            // Hold Final
            tl.to({}, { duration: 1.0 });

        }, section);

        return () => {
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="audience-section relative h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-20"
            style={{ overflow: 'hidden', zIndex: 1, backgroundColor: 'var(--bg-primary)' }}
        >
            <div
                className="w-full max-w-5xl mx-auto h-full relative flex flex-col justify-center"
            >
                {/* 
                   MOVED Lead-in inside the max-w-5xl container and removed absolute positioning.
                   It now sits naturally above the text container, ensuring perfect left alignment.
                */}
                <div ref={containerRef} className="relative w-full h-[60vh] flex flex-col justify-center items-center">

                    {/* Floating Lead-in (Absolute relative to this container to stay fixed position) */}
                    <span
                        className="lead-in absolute -top-12 left-0 text-secondary block"
                        style={{
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Built for different minds
                    </span>

                    {/* Sentences */}
                    {sentences.map((text, i) => (
                        <h2
                            key={i}
                            className="narrative-sentence text-left text-primary m-0 p-0"
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                                fontWeight: 600,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1,
                            }}
                        >
                            {text}
                        </h2>
                    ))}

                    {/* Final Line - Impact Style */}
                    <h2
                        className="final-line text-primary m-0 p-0"
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)', // Bigger
                            fontWeight: 700, // Bolder
                            letterSpacing: '-0.04em',
                            lineHeight: 1,
                            // Positioning handled by GSAP
                        }}
                    >
                        {finalLine}
                    </h2>
                </div>
            </div>
        </section>
    );
};

export default Audience;
