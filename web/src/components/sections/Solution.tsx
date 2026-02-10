'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const headlineLines = [
    "A focused space",
    "for learning."
];

const paragraphText = "No distractions. No clutter. Just you and the content that matters. Studix creates a calm environment where understanding comes naturally.";

const Solution: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const textContainer = textContainerRef.current;
        const visual = visualRef.current;

        if (!section || !textContainer || !visual) return;

        const headlineEls = textContainer.querySelectorAll('.headline-line');
        const paragraph = textContainer.querySelector('.solution-paragraph');

        if (!headlineEls || headlineEls.length === 0 || !paragraph) return;

        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(headlineEls, { opacity: 0, y: 30 });
            gsap.set(paragraph, { opacity: 0, y: 15 });
            gsap.set(visual, { opacity: 0, scale: 0.95, borderRadius: '28px' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=150%',
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

            // Animation Sequence

            // 1. Headlines appear
            tl.to(headlineEls, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.08,
                ease: 'power3.out',
            });

            // 2. Paragraph appears
            tl.to(paragraph, {
                opacity: 1,
                y: 0,
                duration: 0.25,
                ease: 'power3.out',
            }, '-=0.1');

            // 3. Visual appears
            tl.to(visual, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power3.out',
            }, '-=0.15');

            // 4. Hold at end to let user read before next section
            tl.to({}, { duration: 0.4 });

        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="solution-section relative h-screen w-full flex items-center px-6 md:px-12 lg:px-20 py-24"
            style={{ backgroundColor: 'var(--bg-primary)', zIndex: 1 }}
        >
            <div className="w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* LEFT SIDE - Text */}
                <div
                    ref={textContainerRef}
                    className="flex flex-col text-left"
                >
                    <span
                        className="text-secondary block mb-6"
                        style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                        }}
                    >
                        The Solution
                    </span>

                    {/* Split headline */}
                    <h2 className="mb-8">
                        {headlineLines.map((line, index) => (
                            <span
                                key={index}
                                className="headline-line block text-primary"
                                style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    letterSpacing: '-0.03em',
                                    willChange: 'opacity, transform'
                                }}
                            >
                                {line}
                            </span>
                        ))}
                    </h2>

                    {/* Paragraph */}
                    <p
                        className="solution-paragraph text-secondary max-w-md"
                        style={{
                            fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                            lineHeight: 1.7,
                            willChange: 'opacity, transform'
                        }}
                    >
                        {paragraphText}
                    </p>
                </div>

                {/* RIGHT SIDE - Visual Container */}
                <div
                    ref={visualRef}
                    className="aspect-[4/3] w-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] flex items-center justify-center will-change-transform"
                    style={{
                        borderRadius: '28px',
                    }}
                >
                    <span
                        className="text-secondary"
                        style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            opacity: 0.4,
                        }}
                    >
                        Visual
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Solution;
