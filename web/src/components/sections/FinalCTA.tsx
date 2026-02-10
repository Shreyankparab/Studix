'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Button from '@/components/ui/Button';
import { gsap } from '@/lib/gsap';

const FinalCTA: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const content = sectionRef.current?.querySelector('.cta-content');

            if (!content) return;

            gsap.from(content, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="cta-section h-[60vh] flex items-center justify-center px-6 md:px-12 lg:px-20"
            style={{ backgroundColor: 'var(--bg-primary)', zIndex: 35 }}
        >
            <div className="cta-content text-center">
                <h2
                    className="text-primary mb-10"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '-0.03em',
                    }}
                >
                    Start learning today.
                </h2>
                <Button variant="primary" size="lg">
                    Get Started
                </Button>
            </div>
        </section>
    );
};

export default FinalCTA;
