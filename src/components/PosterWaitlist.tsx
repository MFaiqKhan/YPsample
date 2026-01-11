"use client";

import { useState } from "react";
import Button from "./Button";

export default function PosterWaitlist() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
        city: "",
        country: "",
        isEarlyAccess: false
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="waitlist" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background noise */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />

            <div className="container-custom relative z-10 text-center">
                <div className="mb-12 border-4 border-[#FEC33D] inline-block p-8 bg-[#2B00FF] shadow-[12px_12px_0px_#FEC33D] transform -rotate-1">
                    <h2 className="text-4xl md:text-6xl font-black uppercase leading-none mb-4">
                        READY FOR<br />AURAFARMING?
                    </h2>
                    <p className="text-lg md:text-xl font-bold text-[#FEC33D] tracking-widest uppercase">
                        Ditch the long lines and be a VIP
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
                    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                name="name"
                                type="text"
                                placeholder="YOUR NAME"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-transparent border-4 border-white p-4 text-xl font-bold text-white placeholder-white/40 focus:outline-none focus:border-[#FEC33D] focus:bg-white/10 uppercase"
                                required
                            />
                            <input
                                name="age"
                                type="number"
                                placeholder="AGE"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full bg-transparent border-4 border-white p-4 text-xl font-bold text-white placeholder-white/40 focus:outline-none focus:border-[#FEC33D] focus:bg-white/10 uppercase"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                name="city"
                                type="text"
                                placeholder="CITY"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full bg-transparent border-4 border-white p-4 text-xl font-bold text-white placeholder-white/40 focus:outline-none focus:border-[#FEC33D] focus:bg-white/10 uppercase"
                                required
                            />
                            <input
                                name="country"
                                type="text"
                                placeholder="COUNTRY"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full bg-transparent border-4 border-white p-4 text-xl font-bold text-white placeholder-white/40 focus:outline-none focus:border-[#FEC33D] focus:bg-white/10 uppercase"
                                required
                            />
                        </div>

                        <input
                            name="email"
                            type="email"
                            placeholder="YOUR@STUDENT.EMAIL"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-transparent border-4 border-white p-4 text-xl font-bold text-white placeholder-white/40 focus:outline-none focus:border-[#FEC33D] focus:bg-white/10 uppercase"
                            required
                        />

                        <div className="flex items-center justify-center gap-4 bg-white/10 p-4 border-2 border-white/20">
                            <input
                                type="checkbox"
                                id="isEarlyAccess"
                                name="isEarlyAccess"
                                checked={formData.isEarlyAccess}
                                onChange={handleChange}
                                className="w-6 h-6 border-4 border-white accent-[#FEC33D] cursor-pointer"
                            />
                            <label htmlFor="isEarlyAccess" className="text-lg font-bold uppercase cursor-pointer select-none">
                                Do you want to get early access before commoners?
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="group relative inline-block w-full"
                        >
                            <span className="absolute inset-0 translate-x-2 translate-y-2 bg-[#FEC33D] transition-transform group-hover:translate-y-3 group-hover:translate-x-3" />
                            <span className="relative inline-block w-full border-4 border-[#FEC33D] bg-black px-12 py-5 text-2xl font-black uppercase tracking-widest text-[#FEC33D] group-hover:bg-[#FEC33D] group-hover:text-black transition-colors">
                                {status === "loading" ? "PROCESSING..." : "LET'S YOUTHPAY"}
                            </span>
                        </button>

                        {status === "error" && (
                            <p className="text-[#FF2E00] font-bold text-xl bg-black inline-block px-4 py-1">
                                ⚠ ERROR: SUBMISSION FAILED
                            </p>
                        )}
                    </form>
                )}

                <div className="mt-24 pt-12 border-t-2 border-white/20 flex flex-col md:flex-row justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-sm font-bold uppercase tracking-widest">
                        YOUTHPAY © 2026 // EST. Pakistan // FROM GEN Z FOR GEN Z
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
