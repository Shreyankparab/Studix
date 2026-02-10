'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Button from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const lines = headlineRef.current?.querySelectorAll('.hero-line');
            const subheading = containerRef.current?.querySelector('.hero-subheading');
            const cta = containerRef.current?.querySelector('.hero-cta');

            if (!lines || !subheading || !cta) return;

            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' }
            });

            // Animate headline lines with stagger
            tl.from(lines, {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.12,
            })
                // Subheading fades in after headline
                .from(subheading, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                }, '-=0.3')
                // CTA appears last with subtle scale
                .from(cta, {
                    opacity: 0,
                    scale: 0.96,
                    duration: 0.6,
                }, '-=0.4');
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex items-center px-6 md:px-12 lg:px-20"
            style={{ position: 'relative', zIndex: 5, backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-5xl">
                {/* Large headline with line splitting */}
                <h1
                    ref={headlineRef}
                    className="hero-headline mb-8"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        lineHeight: 1.05,
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                    }}
                >
                    <span className="hero-line block text-primary">
                        Study smarter.
                    </span>
                    <span className="hero-line block text-primary">
                        Learn faster.
                    </span>
                    <span className="hero-line block text-secondary">
                        Achieve more.
                    </span>
                </h1>

                {/* Subheading */}
                <p
                    className="hero-subheading body-lg text-secondary max-w-xl mb-12"
                    style={{ lineHeight: 1.6 }}
                >
                    A focused learning platform designed to help you master any subject with clarity and discipline.
                </p>

                {/* CTA */}
                <div className="hero-cta flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" size="lg">
                        Get Started
                    </Button>
                    <Button variant="outline" size="lg">
                        Learn More
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
