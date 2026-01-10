"use client";

import { useState } from "react";
import Button from "./Button";

export default function PosterWaitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Simulating API call
        setTimeout(() => {
            if (email.includes("@")) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        }, 1500);
    };

    return (
        <section id="waitlist" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background noise */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />

            <div className="container-custom relative z-10 text-center">
                <div className="mb-12 border-4 border-[#FEC33D] inline-block p-8 bg-[#2B00FF] shadow-[12px_12px_0px_#FEC33D] transform -rotate-1">
                    <h2 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4">
                        JOIN THE<br />REVOLUTION
                    </h2>
                    <p className="text-xl font-bold text-[#FEC33D] tracking-widest uppercase">
                        Campus Launch Sequence Initiated
                    </p>
                </div>

                {status === "success" ? (
                    <div className="max-w-xl mx-auto bg-white text-black p-8 border-4 border-[#FEC33D] shadow-[8px_8px_0px_white] rotate-1">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-4xl font-black uppercase mb-4">YOU'RE ON THE LIST!</h3>
                        <p className="text-xl font-bold">Keep an eye on your inbox. We ride at dawn.</p>
                        <button
                            onClick={() => setStatus("idle")}
                            className="mt-6 text-sm font-bold underline uppercase hover:text-[#FF2E00]"
                        >
                            Add another comrade
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="YOUR@STUDENT.EMAIL"
                                className="w-full bg-transparent border-4 border-white p-6 text-2xl md:text-3xl font-bold text-white placeholder-white/40 focus:outline-none focus:border-[#FEC33D] focus:bg-white/10 transition-colors uppercase text-center"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="group relative inline-block w-full md:w-auto"
                        >
                            <span className="absolute inset-0 translate-x-2 translate-y-2 bg-[#FEC33D] transition-transform group-hover:translate-y-3 group-hover:translate-x-3" />
                            <span className="relative inline-block w-full md:w-auto border-4 border-[#FEC33D] bg-black px-12 py-5 text-2xl font-black uppercase tracking-widest text-[#FEC33D] group-hover:bg-[#FEC33D] group-hover:text-black transition-colors">
                                {status === "loading" ? "PROCESSING..." : "SIGN ME UP"}
                            </span>
                        </button>

                        {status === "error" && (
                            <p className="text-[#FF2E00] font-bold text-xl bg-black inline-block px-4 py-1">
                                ⚠ ERROR: INVALID EMAIL DETECTED
                            </p>
                        )}
                    </form>
                )}

                <div className="mt-24 pt-12 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-sm font-bold uppercase tracking-widest">
                        YOUTHPAY © 2026 // EST. Pakistan
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-[#FEC33D] transition-colors">INSTAGRAM</a>
                        <a href="#" className="hover:text-[#FEC33D] transition-colors">TIKTOK</a>
                        <a href="#" className="hover:text-[#FEC33D] transition-colors">TWITTER</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
