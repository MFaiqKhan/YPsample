"use client";

import { useState, useEffect } from "react";

export default function PosterNav() {
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-black ${isScrolled ? "bg-white py-2" : "bg-[#FEC33D] py-4"
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="group relative"
                    >
                        <div className="bg-black text-white text-2xl font-black uppercase tracking-tighter px-4 py-2 transform -rotate-2 group-hover:rotate-0 transition-transform">
                            YOUTHPAY<span className="text-[#FEC33D]">.PK</span>
                        </div>
                    </button>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {["Features", "How it Works"].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, "-"))}
                                className="text-black font-bold uppercase tracking-wide hover:bg-black hover:text-white px-2 py-1 transition-colors"
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollToSection("waitlist")}
                            className="bg-[#FF2E00] text-white border-2 border-black px-6 py-2 font-black uppercase shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
                        >
                            Get Early Access
                        </button>
                    </div>

                    {/* Mobile Menu Button - simplified for now */}
                    <button
                        onClick={() => scrollToSection("waitlist")}
                        className="md:hidden bg-black text-white px-4 py-2 font-bold uppercase text-sm border-2 border-transparent hover:border-white"
                    >
                        Join
                    </button>
                </div>
            </div>
        </nav>
    );
}
