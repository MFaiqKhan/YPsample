"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StickyScrollSectionProps {
    steps: Array<{
        title: string;
        description: string;
        visual: ReactNode;
    }>;
}

export default function StickyScrollSection({ steps }: StickyScrollSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRefs = useRef<Array<HTMLDivElement | null>>([]);
    const visualRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            steps.forEach((_, index) => {
                const titleEl = titleRefs.current[index];
                const visualEl = visualRefs.current[index];

                if (titleEl && visualEl) {
                    ScrollTrigger.create({
                        trigger: visualEl,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => {
                            // Activate current title
                            gsap.to(titleEl, {
                                color: "#FF6B00",
                                scale: 1.05,
                                duration: 0.3,
                            });
                        },
                        onLeave: () => {
                            // Deactivate title
                            gsap.to(titleEl, {
                                color: "#9CA3AF",
                                scale: 1,
                                duration: 0.3,
                            });
                        },
                        onEnterBack: () => {
                            // Reactivate on scroll back
                            gsap.to(titleEl, {
                                color: "#FF6B00",
                                scale: 1.05,
                                duration: 0.3,
                            });
                        },
                        onLeaveBack: () => {
                            // Deactivate on scroll back
                            gsap.to(titleEl, {
                                color: "#9CA3AF",
                                scale: 1,
                                duration: 0.3,
                            });
                        },
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [steps]);

    return (
        <section ref={sectionRef} className="py-20 md:py-32">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                    {/* Left: Sticky Titles */}
                    <div className="md:sticky md:top-32 md:h-fit space-y-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    titleRefs.current[index] = el;
                                }}
                                className="transition-all duration-300"
                            >
                                <h3 className="text-4xl md:text-5xl font-black text-gray-400 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Scrolling Visuals */}
                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={(el) => {
                                    visualRefs.current[index] = el;
                                }}
                                className="min-h-[400px] flex items-center justify-center"
                            >
                                {step.visual}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
