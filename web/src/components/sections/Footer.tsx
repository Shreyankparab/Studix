'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';

const Footer: React.FC = () => {
    const footerRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const contentEls = footerRef.current?.querySelectorAll('.footer-animate');
            if (!contentEls) return;

            gsap.from(contentEls, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative w-full"
            style={{ backgroundColor: '#0B0B0B', zIndex: 40, position: 'relative' }}
        >
            {/* Oversized brand name - cropped */}
            <div
                className="footer-animate overflow-hidden relative"
                style={{ height: 'clamp(120px, 20vw, 280px)' }}
            >
                <h2
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap select-none"
                    style={{
                        fontSize: 'clamp(8rem, 22vw, 24rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.04em',
                        lineHeight: 0.85,
                        color: '#FFFFFF',
                        opacity: 0.9,
                    }}
                >
                    STUDIX
                </h2>
            </div>

            {/* Divider */}
            <div
                className="w-full"
                style={{ height: '1px', backgroundColor: '#1F1F1F' }}
            />

            {/* Bottom grid */}
            <div className="footer-animate px-6 md:px-12 lg:px-20 py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* LEFT column */}
                    <div className="flex flex-col gap-4">
                        <a
                            href="mailto:hello@studix.app"
                            className="text-[#9A9A9A] hover:text-white transition-colors duration-300"
                            style={{ fontSize: '0.9375rem' }}
                        >
                            hello@studix.app
                        </a>
                        <a
                            href="https://twitter.com/studix"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9A9A9A] hover:text-white transition-colors duration-300"
                            style={{ fontSize: '0.9375rem' }}
                        >
                            X / Twitter
                        </a>
                        <a
                            href="https://linkedin.com/company/studix"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9A9A9A] hover:text-white transition-colors duration-300"
                            style={{ fontSize: '0.9375rem' }}
                        >
                            LinkedIn
                        </a>
                    </div>

                    {/* CENTER column */}
                    <div className="flex flex-col gap-4">
                        <span className="text-white" style={{ fontSize: '0.9375rem' }}>
                            Study tracking
                        </span>
                        <span className="text-white" style={{ fontSize: '0.9375rem' }}>
                            Focus sessions
                        </span>
                        <span className="text-white" style={{ fontSize: '0.9375rem' }}>
                            Privacy-first design
                        </span>
                        <a
                            href="/privacy"
                            className="text-[#9A9A9A] hover:text-white transition-colors duration-300 mt-2"
                            style={{ fontSize: '0.9375rem' }}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms"
                            className="text-[#9A9A9A] hover:text-white transition-colors duration-300"
                            style={{ fontSize: '0.9375rem' }}
                        >
                            Terms of Service
                        </a>
                    </div>

                    {/* RIGHT column */}
                    <div className="flex flex-col gap-3">
                        <p className="text-white" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            Built for focus.
                        </p>
                        <p className="text-white" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            Designed for clarity.
                        </p>
                        <p className="text-[#9A9A9A]" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            No noise. No pressure.
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div
                className="w-full"
                style={{ height: '1px', backgroundColor: '#1F1F1F' }}
            />

            {/* Legal line */}
            <div className="footer-animate px-6 md:px-12 lg:px-20 py-6">
                <p
                    className="text-[#9A9A9A] text-center"
                    style={{ fontSize: '0.8125rem' }}
                >
                    © 2026 Studix. Built for focused minds.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
