"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import Link from "next/link";

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Scroll-triggered animations for steps
        const steps = gsap.utils.toArray("[data-step]");
        steps.forEach((step) => {
            gsap.fromTo(
                step as HTMLElement,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: step as HTMLElement,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

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

                        <Link href="/waitlist">
                            <Button variant="primary" className="!py-3 !px-6 !text-base">
                                Join Waitlist
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-[var(--color-youthpay-neutral-grey)] to-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-6xl md:text-7xl font-black text-[var(--color-youthpay-neutral-dark)] mb-6">
                        From Student ID to Spending Power.
                    </h1>
                    <p className="text-2xl text-gray-600">
                        It's actually super simple. Here's the game plan.
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section ref={sectionRef} className="py-20">
                <div className="max-w-7xl mx-auto px-6 space-y-32">
                    {/* Step 1 */}
                    <div data-step className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-[var(--color-youthpay-action-orange)] text-white text-sm font-bold rounded-full">
                                STEP 01
                            </div>
                            <h2 className="text-5xl font-black text-[var(--color-youthpay-neutral-dark)]">
                                1. Dig out that Student ID.
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Your campus card is finally useful outside the library! It's proof you exist in the system. Just snap a photo in the app.
                            </p>
                            <p className="text-sm text-gray-500 italic">
                                *We use secure verification, your info stays private.
                            </p>
                        </div>
                        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 overflow-hidden shadow-xl">
                            <div className="w-full h-full flex items-center justify-center p-8">
                                <div className="text-center space-y-4">
                                    <div className="w-48 h-32 mx-auto rounded-xl bg-gradient-to-br from-[var(--color-youthpay-primary-blue)] to-[var(--color-youthpay-accent-purple)] flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 text-sm">Student ID card close-up</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div data-step className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="aspect-[4/3] rounded-3xl bg-[var(--color-youthpay-neutral-dark)] border border-gray-800 overflow-hidden shadow-xl md:order-1">
                            <div className="w-full h-full flex items-center justify-center p-8">
                                <div className="text-center space-y-4">
                                    <div className="w-64 h-48 mx-auto rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white text-sm font-bold">Controls</span>
                                                <div className="w-12 h-6 bg-[var(--color-youthpay-action-orange)] rounded-full" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-8 bg-gray-700 rounded" />
                                                <div className="h-8 bg-gray-700 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm">Dark mode UI screenshot</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 md:order-2">
                            <div className="inline-block px-4 py-2 bg-[var(--color-youthpay-accent-purple)] text-white text-sm font-bold rounded-full">
                                STEP 02
                            </div>
                            <h2 className="text-5xl font-black text-[var(--color-youthpay-neutral-dark)]">
                                2. You're in charge (mostly).
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Parents can load funds and set limits (sorry!), but you get the freedom to spend. Lost your card at a concert? Instant freeze in the app.
                            </p>
                            <p className="text-sm text-[var(--color-youthpay-action-orange)] italic">
                                *Freedom from strict parents… with just a little permission! 😉
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div data-step className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-[var(--color-youthpay-primary-blue)] text-white text-sm font-bold rounded-full">
                                STEP 03
                            </div>
                            <h2 className="text-5xl font-black text-[var(--color-youthpay-neutral-dark)]">
                                3. Tap, Snap, Go.
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Use your virtual card instantly online, or tap your physical card at campus cafes and stores. It works everywhere major cards are accepted.
                            </p>
                        </div>
                        <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-[var(--color-youthpay-action-orange)]/10 to-[var(--color-youthpay-accent-purple)]/10 border border-[var(--color-youthpay-action-orange)]/20 overflow-hidden shadow-xl">
                            <div className="w-full h-full flex items-center justify-center p-8">
                                <div className="text-center space-y-4">
                                    <div className="relative">
                                        <div className="w-32 h-32 mx-auto rounded-full bg-[var(--color-youthpay-action-orange)] flex items-center justify-center">
                                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-[var(--color-youthpay-primary-blue)] flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">Phone tap at checkout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-youthpay-primary-blue)] py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <p className="text-white text-xl font-bold">
                        Ready to ditch cash? <span className="text-[var(--color-youthpay-action-orange)]">Get on the Waitlist</span>
                    </p>
                    <Link href="/waitlist">
                        <Button variant="primary" className="!bg-[var(--color-youthpay-action-orange)]">
                            Join Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
