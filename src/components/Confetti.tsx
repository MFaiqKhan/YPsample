"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
    isActive: boolean;
    onComplete?: () => void;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    size: number;
}

export default function Confetti({ isActive, onComplete }: ConfettiProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        if (!isActive || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Brand colors
        const colors = [
            "#0044FF", // Vivid Blue
            "#FF6B00", // Bright Orange
            "#7F00FF", // Electric Purple
        ];

        // Create particles
        const particleCount = 100;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: -20,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
        }));

        let startTime = Date.now();
        const duration = 3000; // 3 seconds

        const animate = () => {
            const elapsed = Date.now() - startTime;

            if (elapsed > duration) {
                if (onComplete) onComplete();
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += particle.rotationSpeed;
                particle.vy += 0.1; // Gravity

                // Draw particle
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate((particle.rotation * Math.PI) / 180);
                ctx.fillStyle = particle.color;
                ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ width: "100vw", height: "100vh" }}
        />
    );
}
