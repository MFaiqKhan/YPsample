"use client";

import { useEffect, useRef } from "react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    blobColor: "orange" | "purple";
    delay?: number;
}

export default function FeatureCard({ icon, title, description, blobColor, delay = 0 }: FeatureCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add("revealed");
                        }, delay);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [delay]);

    const blobStyles = {
        orange: "color-blob-orange",
        purple: "color-blob-purple"
    };

    return (
        <div
            ref={cardRef}
            className="scroll-reveal group p-8 rounded-3xl bg-white border border-gray-100 hover:border-[var(--color-youthpay-action-orange)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2"
        >
            <div className={`w-20 h-20 rounded-2xl ${blobStyles[blobColor]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-youthpay-neutral-dark)] mb-3">
                {title}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
                {description}
            </p>
        </div>
    );
}
