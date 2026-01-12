"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
    {
        id: "01",
        title: "Track",
        desc: "Parents add money to their teen's YouthPay digital wallet securely. Instant peace of mind.",
        image: "/howitworks1.png",
        color: "text-[#2B00FF]", // Blue
        bgColor: "bg-blue-50"
    },
    {
        id: "02",
        title: "Scan",
        desc: "Teen scans vendor QR code at canteen or shop for instant payment. No cash, no hassle.",
        image: "/howitworks2.png",
        color: "text-[#FEC33D]", // Yellow
        bgColor: "bg-yellow-50"
    },
    {
        id: "03",
        title: "Transfer",
        desc: "Funds move securely from student wallet to vendor wallet instantly. Fast and secure.",
        image: "/howitworks3.png",
        color: "text-[#FF2E00]", // Red/Orange
        bgColor: "bg-red-50"
    },
    {
        id: "04",
        title: "Reflect",
        desc: "See where your money is going. Gain insights with detailed reports.",
        image: "/howitworks4.png",
        color: "text-[#10B981]", // Green
        bgColor: "bg-green-50"
    }
];

export default function PosterHowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const totalSteps = STEPS.length;

        // Pin the section
        const scrollAnim = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${totalSteps * 100}%`, // Scroll distance proportional to steps
            pin: true,
            scrub: 0.5,
            onUpdate: (self) => {
                // Calculate current step based on scroll progress
                // self.progress is 0 to 1
                const stepIndex = Math.min(
                    totalSteps - 1,
                    Math.floor(self.progress * totalSteps)
                );
                setActiveStep(stepIndex);
            }
        });

        return () => {
            scrollAnim.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="h-screen w-full relative overflow-hidden bg-white text-black"
        >
            {/* Background Transitions */}
            <div className="absolute inset-0 transition-colors duration-700 ease-in-out">
                <div className={`absolute inset-0 opacity-30 transition-colors duration-700 ${STEPS[activeStep].bgColor}`} />
            </div>

            <div ref={containerRef} className="container-custom h-full relative z-10 flex flex-col">

                {/* Header: Compact and Fixed at Top */}
                <div className="flex-none pt-24 md:pt-28 pb-4 md:pb-8 text-center z-20">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500 mb-3 shadow-sm">
                        The Workflow
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black">
                        How It Works
                    </h2>
                </div>

                {/* Content Area: Fills remaining space */}
                <div className="flex-grow flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16 w-full max-h-[60vh] md:max-h-[65vh]">

                    {/* LEFT: IMAGE DISPLAY */}
                    <div className="w-full lg:w-1/2 h-[35vh] md:h-full relative flex items-center justify-center">
                        {STEPS.map((step, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out transform p-4
                                    ${activeStep === i
                                        ? 'opacity-100 translate-y-0 scale-100 rotate-0'
                                        : activeStep > i
                                            ? 'opacity-0 -translate-y-10 scale-95 -rotate-2'
                                            : 'opacity-0 translate-y-10 scale-95 rotate-2'
                                    }
                                `}
                            >
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="max-h-full max-w-full object-contain drop-shadow-2xl rounded-2xl md:rounded-3xl shadow-black/10"
                                />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: TEXT DISPLAY */}
                    <div className="w-full lg:w-1/2 h-[20vh] md:h-full relative flex flex-col items-center lg:items-start text-center lg:text-left justify-center px-4">
                        {STEPS.map((step, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out
                                    ${activeStep === i
                                        ? 'opacity-100 translate-x-0 blur-0'
                                        : 'opacity-0 translate-x-8 blur-sm'
                                    }
                                `}
                            >
                                <div className={`text-5xl md:text-7xl font-black mb-2 md:mb-4 ${step.color} opacity-20`}>
                                    {step.id}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black mb-3 md:mb-5 text-black">
                                    {step.title}
                                </h3>
                                <p className="text-base md:text-xl font-medium text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Footer: Progress Indicators */}
                <div className="flex-none pb-8 md:pb-12 flex justify-center gap-3">
                    {STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300
                                ${activeStep === i ? 'w-8 md:w-12 bg-black' : 'w-1.5 md:w-2 bg-gray-300'}
                            `}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
