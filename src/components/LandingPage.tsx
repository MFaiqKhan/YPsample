"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import FeatureCard from "./FeatureCard";
import Link from "next/link";

export default function LandingPage() {
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero fade-in animation
        const heroElements = gsap.utils.toArray("[data-hero-animate]");
        gsap.fromTo(
            heroElements,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-youthpay-primary-blue)] to-[var(--color-youthpay-accent-purple)] flex items-center justify-center">
                                <div className="w-3 h-3 rounded-full bg-white" />
                            </div>
                            <div>
                                <div className="text-xs font-bold tracking-[0.3em] text-gray-500">YOUTH</div>
                                <div className="text-lg font-bold text-[var(--color-youthpay-neutral-dark)]">PAY</div>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-8">
                            <Link href="#how" className="text-gray-600 hover:text-[var(--color-youthpay-primary-blue)] font-semibold transition-colors">
                                How it Works
                            </Link>
                            <Link href="#features" className="text-gray-600 hover:text-[var(--color-youthpay-primary-blue)] font-semibold transition-colors">
                                Features
                            </Link>
                            <Link href="/waitlist">
                                <Button variant="primary" className="!py-3 !px-6 !text-base">
                                    Join Waitlist
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-youthpay-primary-blue)] pt-20"
            >
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-youthpay-action-orange)] rounded-full opacity-20 blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-youthpay-accent-purple)] rounded-full opacity-20 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-white space-y-8">
                        <h1
                            data-hero-animate
                            className="text-6xl md:text-7xl font-black text-[var(--color-youthpay-action-orange)] leading-tight"
                        >
                            Banking for Students, Reimagined. 🚀
                        </h1>

                        <p
                            data-hero-animate
                            className="text-2xl md:text-3xl text-white/90 leading-relaxed"
                        >
                            Secure payments powered by your Student ID. Freedom without the fuss.
                        </p>

                        <div data-hero-animate>
                            <Link href="/waitlist">
                                <Button variant="primary" className="!text-xl !py-5 !px-10 shadow-[0_20px_60px_rgba(255,107,0,0.4)]">
                                    Join the Waitlist
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Image Placeholder */}
                    <div data-hero-animate className="relative">
                        <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center space-y-4 p-8">
                                    <div className="w-32 h-32 mx-auto rounded-full bg-[var(--color-youthpay-action-orange)] flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-white/70 text-sm">Portrait photo: teen holding phone</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl md:text-6xl font-black text-center text-[var(--color-youthpay-neutral-dark)] mb-4">
                        Why you need this yesterday.
                    </h2>
                    <p className="text-xl text-center text-gray-600 mb-16">
                        Everything you need, nothing you don't.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={
                                <svg className="w-10 h-10 text-[var(--color-youthpay-action-orange)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            }
                            title="Verified in 30s flat."
                            description="Scan your school ID. Boom. You're in. No long forms."
                            blobColor="orange"
                            delay={0}
                        />

                        <FeatureCard
                            icon={
                                <svg className="w-10 h-10 text-[var(--color-youthpay-accent-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            title="Zero Hidden Fees."
                            description="We don't do surprise charges. Seriously. What you see is what you get."
                            blobColor="purple"
                            delay={150}
                        />

                        <FeatureCard
                            icon={
                                <svg className="w-10 h-10 text-[var(--color-youthpay-action-orange)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            }
                            title="Instant Friend Transfers."
                            description="Pay them back for pizza before the last slice is gone."
                            blobColor="orange"
                            delay={300}
                        />
                    </div>
                </div>
            </section>

            {/* Trust Footer */}
            <section className="py-16 bg-[var(--color-youthpay-neutral-grey)]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-8 mb-6 flex-wrap">
                        <div className="px-6 py-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-500">SBP</span>
                        </div>
                        <div className="px-6 py-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-500">LICENSED</span>
                        </div>
                        <div className="px-6 py-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-sm font-bold text-gray-500">SECURE</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Built on secure rails. Licensed and regulated by SBP.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-[var(--color-youthpay-neutral-dark)] text-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-youthpay-primary-blue)] to-[var(--color-youthpay-accent-purple)] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-[0.3em] text-white/50">YOUTH</div>
                            <div className="text-base font-bold">PAY</div>
                        </div>
                    </div>
                    <p className="text-white/60">
                        © 2026 YouthPay. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
