"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function GlassmorphicNav() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-nav shadow-sm" : "bg-transparent"
                }`}
        >
            <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-youthpay-primary-blue)] to-[var(--color-youthpay-accent-purple)] flex items-center justify-center group-hover:scale-105 transition-transform">
                            <div className="w-3 h-3 rounded-full bg-white" />
                        </div>
                        <div>
                            <div className="text-xs font-bold tracking-[0.3em] text-gray-500">
                                YOUTH
                            </div>
                            <div className="text-lg font-bold text-[var(--color-youthpay-neutral-dark)]">
                                PAY
                            </div>
                        </div>
                    </button>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection("features")}
                            className="text-gray-600 hover:text-[var(--color-youthpay-primary-blue)] font-semibold transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-gray-600 hover:text-[var(--color-youthpay-primary-blue)] font-semibold transition-colors"
                        >
                            How it Works
                        </button>
                        <button
                            onClick={() => scrollToSection("waitlist")}
                            className="px-6 py-3 bg-[var(--color-youthpay-action-orange)] text-white rounded-full font-bold hover:shadow-lg transition-all animate-bouncy-hover"
                        >
                            Join Waitlist
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => scrollToSection("waitlist")}
                        className="md:hidden px-6 py-3 bg-[var(--color-youthpay-action-orange)] text-white rounded-full font-bold text-sm"
                    >
                        Join
                    </button>
                </div>
            </div>
        </nav>
    );
}
