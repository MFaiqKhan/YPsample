"use client";

import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    size?: "small" | "medium" | "large";
    className?: string;
}

export function BentoCard({ children, size = "medium", className = "" }: BentoCardProps) {
    const sizeClasses = {
        small: "bento-card-small",
        medium: "bento-card-medium",
        large: "bento-card-large",
    };

    return (
        <div className={`bento-card ${sizeClasses[size]} ${className}`}>
            {children}
        </div>
    );
}

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export default function BentoGrid({ children, className = "" }: BentoGridProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {children}
        </div>
    );
}
