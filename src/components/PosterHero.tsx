"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PosterHero() {
    const heroRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial Entrance
        const tl = gsap.timeline();
        tl.from(".hero-text-char", {
            y: 150,
            opacity: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out"
        })
            .from(".hero-phone-main", {
                y: 300,
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out"
            }, "-=1.0")
            .from(".hero-cta-group", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }, "-=0.5");

        // Scroll Parallax Logic (Mojek Style)
        // Center Phone "Pins" or moves slowly, while text moves fast behind it.

        gsap.to(".hero-text-layer", {
            y: -200, // Text moves UP away/faster
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom center",
                scrub: true
            }
        });

        gsap.to(".hero-phone-container", {
            y: 100, // Phone moves DOWN slightly (heavy feel)
            scale: 1.05, // Slight zoom
            ease: "none",
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Background rotation
        gsap.to(".hero-bg-shape", {
            rotation: 90,
            scale: 1.2,
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const scrollToWaitlist = () => {
        const element = document.getElementById("waitlist");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FEC33D] pt-20 pb-20"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Visual Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

                {/* Animated Shape - Changed to Purple for contrast against Yellow */}
                <div className="hero-bg-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-[#2B00FF] rounded-full mix-blend-hard-light filter blur-3xl opacity-30 z-0" />
            </div>

            {/* Main Content Info Container */}
            <div ref={containerRef} className="container-custom relative z-10 flex flex-col items-center text-center w-full h-full justify-center">

                {/* Layer 1: The Giant Text (Now Front) */}
                <div className="hero-text-layer relative z-30 select-none pointer-events-none mb-4 transform perspective-1000">
                    <div className="inline-block mb-2 transform -rotate-1">
                        <span className="bg-black text-white px-3 py-1 text-xs md:text-sm font-black uppercase tracking-wider border-2 border-white shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
                            The Cool People's Bank
                        </span>
                    </div>

                    <h1 className="text-[3vw] md:text-[3vw] leading-[0.9] font-black text-black tracking-tighter mix-blend-normal uppercase max-w-4xl mx-auto">
                        changing the way <br />
                        <span className="text-white drop-shadow-[4px_4px_0px_#000]">minors pay</span>
                    </h1>
                </div>

                {/* Layer 2: The Phone (Behind Text) */}
                <div className="hero-phone-container relative z-20 w-auto flex justify-center mt-0">
                    <div className="relative w-[150px] md:w-[240px] lg:w-[280px]">

                        {/* The Phone Itself */}
                        <img
                            src="/flat_iphone_mockup.png"
                            alt="YouthPay App"
                            style={{ transform: 'none' }}
                            className="hero-phone-main w-full h-auto drop-shadow-[0px_30px_60px_rgba(0,0,0,0.6)] rounded-[2.5rem] md:rounded-[3rem] z-10 relative"
                        />
                    </div>
                </div>

                {/* Layer 3: CTA (Overlapping Phone) */}
                <div className="hero-cta-group relative z-40 mt-8 pb-8">
                    <p className="text-black text-sm md:text-lg font-bold mb-4 max-w-xs md:max-w-md mx-auto drop-shadow-sm bg-white/80 px-2 py-1 backdrop-blur-sm rounded border-2 border-black transform rotate-1">
                        From Gen Z, For Gen Z. <br className="hidden md:block" />Ready to start Aurafarming?
                    </p>

                    <button
                        onClick={scrollToWaitlist}
                        className="group relative inline-block focus:outline-none hover:scale-105 transition-transform"
                    >
                        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-white" />
                        <span className="relative inline-block border-2 border-black bg-black text-[#FEC33D] px-6 py-2 md:px-10 md:py-4 text-base md:text-xl font-black uppercase tracking-widest group-active:translate-x-1 group-active:translate-y-1">
                            LET'S YOUTHPAY
                        </span>
                    </button>
                </div>

            </div>

            {/* Bottom Marquee */}
            <div className="absolute bottom-0 w-full bg-black py-4 overflow-hidden z-30 border-t-4 border-white">
                <div className="whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-white font-black text-xl md:text-3xl px-8 uppercase tracking-widest">
                            INFINITY AURA <span className="text-[#FEC33D">///</span> GEN Z BANKING <span className="text-[#FEC33D">///</span> SLAY THE PAY <span className="text-[#FEC33D">///</span>
                        </span>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
             `}</style>
        </section>
    );
}
