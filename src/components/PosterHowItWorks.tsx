"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
    {
        id: "01",
        title: "Parent Funds Wallet",
        desc: "Parents add money to their teen's YouthPay digital wallet securely.",
        icon: "💳",
        color: "bg-[#2B00FF]", // Blue
        text: "text-white"
    },
    {
        id: "02",
        title: "Scan QR Code",
        desc: "Teen scans vendor QR code at canteen or shop for instant payment.",
        icon: "📸",
        color: "bg-[#FEC33D]", // Yellow
        text: "text-black"
    },
    {
        id: "03",
        title: "Instant Transfer",
        desc: "Funds move securely from student wallet to vendor wallet instantly.",
        icon: "⚡",
        color: "bg-[#FF2E00]", // Red/Orange
        text: "text-white"
    },
    {
        id: "04",
        title: "Track & Learn",
        desc: "Parents monitor spending; teens learn money management in real-time.",
        icon: "📊",
        color: "bg-black",
        text: "text-white"
    }
];

export default function PosterHowItWorks() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Staggered entrance for cards
        gsap.from(".step-card", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#how-it-works-grid",
                start: "top 80%",
            }
        });

        // Connector Line Animation
        gsap.from(".connector-line", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.5,
            ease: "none",
            scrollTrigger: {
                trigger: "#how-it-works-grid",
                start: "top 60%",
                end: "bottom 80%",
                scrub: true
            }
        });

    }, []);

    return (
        <section id="how-it-works" className="bg-[#F9FAFB] text-black py-32 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEC33D]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2B00FF]/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="container-custom relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="bg-[#FF2E00] text-white px-6 py-2 text-sm font-bold uppercase tracking-widest inline-block mb-6 rounded-full shadow-lg">
                        The Workflow
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black text-black tracking-tight leading-none mb-6">
                        Seamless.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B00FF] to-[#FF2E00]">
                            Secure. Simple.
                        </span>
                    </h2>
                </div>

                {/* Steps Grid */}
                <div id="how-it-works-grid" className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-1 bg-gray-200 z-0">
                        <div className="connector-line h-full w-full bg-gradient-to-r from-[#2B00FF] via-[#FEC33D] to-[#FF2E00] origin-left scale-x-0" />
                        {/* TODO: FIX ANIMATION ABOVE TO SCALE X instead of Y for horizontal line if I want horizontal fill */}
                    </div>

                    {STEPS.map((step, i) => (
                        <div key={i} className="step-card group relative z-10">
                            {/* Card Container */}
                            <div className="bg-white rounded-[2rem] p-8 h-full border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2">

                                {/* Number Badge */}
                                <div className="absolute -top-6 left-8">
                                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-xl shadow-lg ${step.color} ${step.text}`}>
                                        {step.id}
                                    </div>
                                </div>

                                {/* Icon Area */}
                                <div className="mt-6 mb-6">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                        {step.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-black mb-3 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
