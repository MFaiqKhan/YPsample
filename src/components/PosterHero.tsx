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
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#2B00FF] pt-20 pb-20"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Visual Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

                {/* Animated Shape */}
                <div className="hero-bg-shape absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] bg-[#FEC33D] rounded-full mix-blend-hard-light filter blur-3xl opacity-30 z-0" />
            </div>

            {/* Main Content Info Container */}
            <div ref={containerRef} className="container-custom relative z-10 flex flex-col items-center text-center w-full h-full justify-center">

                {/* Layer 1: The Giant Text (Now Front) */}
                <div className="hero-text-layer relative z-30 select-none pointer-events-none mb-4 transform perspective-1000">
                    <div className="inline-block mb-2 transform -rotate-1">
                        <span className="bg-black text-white px-3 py-1 text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#FEC33D] shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
                            The People's Bank
                        </span>
                    </div>

                    <h1 className="text-[10vw] md:text-[7vw] leading-[0.9] font-black text-white tracking-tighter drop-shadow-[5px_5px_0px_#000000] mix-blend-normal whitespace-nowrap">
                        <span className="hero-text-char inline-block">MAKE</span><br className="md:hidden" />
                        <span className="hero-text-char inline-block text-[#FEC33D]"> MONEY</span><br />
                        <span className="hero-text-char inline-block">MOVES</span>
                    </h1>
                </div>

                {/* Layer 2: The Phone (Behind Text) */}
                <div className="hero-phone-container relative z-20 w-auto flex justify-center mt-0">
                    <div className="relative w-[220px] md:w-[350px] lg:w-[400px]">

                        {/* The Phone Itself */}
                        <img
                            src="/flat_iphone_mockup.png"
                            alt="YouthPay App"
                            style={{ transform: 'none' }}
                            className="hero-phone-main w-full h-auto drop-shadow-[0px_30px_60px_rgba(0,0,0,0.6)] rounded-[2.5rem] md:rounded-[3rem] z-10 relative"
                        />

                        {/* Floating Sticker: Zero Fees */}
                        <div className="absolute top-[15%] -left-4 md:-left-12 rotate-[-12deg] bg-white text-black p-2 md:p-4 font-black text-[10px] md:text-base uppercase border-2 border-black shadow-[3px_3px_0px_#000] animate-float z-20">
                            Zero<br />Fees
                        </div>

                        {/* Floating Sticker: Instant */}
                        <div className="absolute bottom-[30%] -right-4 md:-right-12 rotate-[8deg] bg-[#FF2E00] text-white p-2 md:p-4 font-black text-[10px] md:text-base uppercase border-2 border-black shadow-[3px_3px_0px_#000] animate-float z-20" style={{ animationDelay: "1s" }}>
                            Instant<br />Transfer
                        </div>
                    </div>
                </div>

                {/* Layer 3: CTA (Overlapping Phone) */}
                <div className="hero-cta-group relative z-40 mt-[-50px] md:mt-[-80px] pb-8">
                    <p className="text-white text-sm md:text-lg font-bold mb-4 max-w-xs md:max-w-md mx-auto drop-shadow-md bg-black/50 px-2 py-1 backdrop-blur-sm rounded">
                        Stop asking mom for cash. <br className="hidden md:block" />Start building your empire.
                    </p>

                    <button
                        onClick={scrollToWaitlist}
                        className="group relative inline-block focus:outline-none hover:scale-105 transition-transform"
                    >
                        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black" />
                        <span className="relative inline-block border-2 border-black bg-[#FEC33D] text-[#2B00FF] px-6 py-2 md:px-10 md:py-4 text-base md:text-xl font-black uppercase tracking-widest group-active:translate-x-1 group-active:translate-y-1">
                            JOIN THE WAITLIST
                        </span>
                    </button>
                </div>

            </div>

            {/* Bottom Marquee */}
            <div className="absolute bottom-0 w-full bg-black py-4 overflow-hidden z-30 border-t-4 border-[#FEC33D]">
                <div className="whitespace-nowrap animate-marquee">
                    {[...Array(10)].map((_, i) => (
                        <span key={i} className="text-white font-black text-xl md:text-3xl px-8 uppercase tracking-widest">
                            STUDENT POWERED <span className="text-[#FEC33D]">///</span> NO BANKS <span className="text-[#FEC33D]">///</span> OWN YOUR CASH <span className="text-[#FEC33D]">///</span>
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
