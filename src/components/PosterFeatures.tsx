"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PosterFeatures() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const posters = gsap.utils.toArray(".poster-card");

        // Randomize initial rotation slightly for that "wheatpasted" look
        gsap.set(posters, {
            rotation: () => Math.random() * 6 - 3
        });

        // Hover animations for posters
        posters.forEach((poster: any) => {
            const hover = gsap.to(poster, {
                scale: 1.05,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
                paused: true
            });

            poster.addEventListener("mouseenter", () => hover.play());
            poster.addEventListener("mouseleave", () => hover.reverse());
        });

        // Scroll reveal animation
        gsap.from(posters, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const features = [
        {
            title: "VERIFIED",
            subtitle: "IN 30 SECONDS",
            desc: "Scan Student ID. Done.",
            bg: "bg-[#2B00FF]", // Electric Blue
            text: "text-white",
            accent: "border-[#FF2E00]", // Red Border
            rotation: "-rotate-2"
        },
        {
            title: "ZERO",
            subtitle: "HIDDEN FEES",
            desc: "Using your money shouldn't cost money.",
            bg: "bg-white",
            text: "text-[#2B00FF]",
            accent: "border-black",
            rotation: "rotate-1"
        },
        {
            title: "INSTANT",
            subtitle: "TRANSFERS",
            desc: "Pay friends faster than cash.",
            bg: "bg-[#FF2E00]", // Bright Red
            text: "text-[#FEC33D]", // Mustard text
            accent: "border-black",
            rotation: "-rotate-1"
        },
        {
            title: "CONTROL",
            subtitle: "YOUR CASH",
            desc: "Freeze card. Set limits. Relax.",
            bg: "bg-black",
            text: "text-white",
            accent: "border-[#FEC33D]",
            rotation: "rotate-2"
        }
    ];

    return (
        <section
            id="features"
            ref={sectionRef}
            className="py-24 bg-[#FEC33D] overflow-hidden relative" // Mustard Yellow Background
        >
            {/* Background Texture/Noise could go here */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />

            <div className="container-custom relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-6xl md:text-8xl font-black text-[#2B00FF] uppercase tracking-tighter leading-[0.8] mb-4 drop-shadow-[4px_4px_0px_#000000]">
                        The People's<br />Platform
                    </h2>
                    <div className="inline-block bg-black text-white text-xl md:text-2xl font-bold px-4 py-2 transform -rotate-2">
                        FOR THE STUDENTS, BY THE STUDENTS
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={`poster-card relative group cursor-pointer ${feature.rotation}`}
                        >
                            {/* Tape effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 rotate-1 backdrop-blur-sm z-20" />

                            <div className={`
                                h-full p-6 flex flex-col justify-between 
                                ${feature.bg} ${feature.text} 
                                border-4 ${feature.accent}
                                shadow-[8px_8px_0px_rgba(0,0,0,1)]
                                transition-transform
                            `}>
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-black uppercase leading-none tracking-tight">
                                        {feature.title}
                                    </h3>
                                    <div className="text-2xl font-bold uppercase leading-none opacity-90">
                                        {feature.subtitle}
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className={`h-1 w-12 mb-4 ${feature.text === 'text-white' ? 'bg-white' : 'bg-current'}`} />
                                    <p className="font-bold text-lg leading-tight">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="
                        group relative inline-block
                        focus:outline-none focus:ring
                    ">
                        <span className="
                            absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-y-2.5 group-hover:translate-x-2.5
                        "></span>
                        <span className="
                            relative inline-block border-2 border-black bg-[#FF2E00] px-8 py-3 text-sm font-bold uppercase tracking-widest text-white group-active:text-opacity-75
                        ">
                            Join the Movement
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
