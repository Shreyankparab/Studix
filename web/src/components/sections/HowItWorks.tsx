'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const steps = [
    {
        number: '01',
        title: 'Choose Your Subject',
        description: 'Select from a curated library of subjects or create your own custom learning path.',
    },
    {
        number: '02',
        title: 'Focus & Learn',
        description: 'Engage with distraction-free content designed for deep understanding and retention.',
    },
    {
        number: '03',
        title: 'Track Progress',
        description: 'Monitor your growth with intelligent insights and personalized recommendations.',
    },
];

const HowItWorks: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        const stepsEls = container.querySelectorAll('.step-item');
        const bgNums = container.querySelectorAll('.bg-number');

        if (!stepsEls.length) return;

        const ctx = gsap.context(() => {
            // 1. Initial State: Stacked
            stepsEls.forEach((el, i) => {
                gsap.set(el, {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: i === 0 ? 1 : 0,
                    y: i === 0 ? 0 : 40,
                    scale: i === 0 ? 1 : 0.95,
                    zIndex: 10 - i,
                });
                gsap.set(bgNums[i], {
                    opacity: i === 0 ? 0.06 : 0,
                });
            });

            // 2. Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'howitworks-stack',
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

            scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;

            // ANIMATION LOGIC

            // Phase 1: Hold Step 1
            tl.to({}, { duration: 0.5 });

            // Phase 2: Switch 1 -> 2
            tl.to(stepsEls[0], { opacity: 0, y: -40, scale: 0.95, duration: 1, ease: 'power2.inOut' })
                .to(bgNums[0], { opacity: 0, duration: 1 }, '<')

                .to(stepsEls[1], { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }, '-=0.5')
                .to(bgNums[1], { opacity: 0.06, duration: 1 }, '<');

            // Phase 3: Hold 2
            tl.to({}, { duration: 0.5 });

            // Phase 4: Switch 2 -> 3
            tl.to(stepsEls[1], { opacity: 0, y: -40, scale: 0.95, duration: 1, ease: 'power2.inOut' })
                .to(bgNums[1], { opacity: 0, duration: 1 }, '<')

                .to(stepsEls[2], { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }, '-=0.5')
                .to(bgNums[2], { opacity: 0.06, duration: 1 }, '<');

            // Phase 5: Hold 3 (reduced to prevent lingering)
            tl.to({}, { duration: 0.4 });

            // Phase 6: Exit Animation - Clear Narrative Closure
            // This signals "the story is complete" and prevents phantom continuation
            tl.to(stepsEls[2], { opacity: 0.5, y: -30, scale: 0.98, duration: 0.6, ease: 'power2.in' });
            tl.to(bgNums[2], { opacity: 0.02, duration: 0.6 }, '<');

        }, section);

        return () => {
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            // Z-Index increased to 20 to strictly layer ABOVE the Solution section (z-10)
            className="how-it-works-section relative h-screen flex items-center px-6 md:px-12 lg:px-20"
            style={{
                backgroundColor: 'var(--bg-primary)',
                zIndex: 1,
                overflow: 'hidden'
            }}
        >
            <div
                ref={containerRef}
                className="relative max-w-5xl w-full mx-auto"
                style={{ height: '50vh' }}
            >
                {steps.map((step, i) => (
                    <div
                        key={step.number}
                        className="step-item flex flex-col justify-center"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    >
                        {/* Background Number */}
                        <span
                            className="bg-number absolute right-0 top-1/2 -translate-y-1/2 text-primary pointer-events-none select-none"
                            style={{
                                fontSize: 'clamp(8rem, 25vw, 20rem)',
                                fontWeight: 800,
                                lineHeight: 1,
                                opacity: 0,
                            }}
                        >
                            {step.number}
                        </span>

                        {/* Content */}
                        <div className="relative z-10 text-left max-w-2xl">
                            <span
                                className="text-secondary block mb-6"
                                style={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Step {step.number}
                            </span>
                            <h2
                                className="text-primary mb-8"
                                style={{
                                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                }}
                            >
                                {step.title}
                            </h2>
                            <p
                                className="text-secondary max-w-lg"
                                style={{
                                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                                    lineHeight: 1.6
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
