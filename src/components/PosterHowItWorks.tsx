"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PosterHowItWorks() {
    return (
        <section id="how-it-works" className="bg-white text-black py-0">
            {/* Step 1: TRACK / SCAN */}
            <div className="sticky top-0 h-screen flex flex-col md:flex-row bg-[#FF2E00] border-b-4 border-black overflow-hidden group">
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center border-r-4 border-black">
                    <span className="text-9xl font-black text-black/20 absolute top-4 left-4">01</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase text-white mb-6 drop-shadow-[4px_4px_0px_#000000]">
                        SCAN<br /> YOUR ID
                    </h2>
                    <p className="text-2xl font-bold max-w-md bg-white p-4 border-4 border-black shadow-[8px_8px_0px_#000000] rotate-1">
                        Use your existing student card. No new plastic. No paperwork. Just verify and go.
                    </p>
                </div>
                <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                    <div className="w-full h-full bg-[#FF2E00]/50 mix-blend-multiply" />
                </div>
            </div>

            {/* Step 2: ANALYZE / CONTROL */}
            <div className="sticky top-0 h-screen flex flex-col md:flex-row-reverse bg-[#6B46C1] border-b-4 border-black overflow-hidden group">
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center border-l-4 border-black">
                    <span className="text-9xl font-black text-black/20 absolute top-4 right-4">02</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase text-[#FEC33D] mb-6 drop-shadow-[4px_4px_0px_#000000] text-right">
                        SET<br /> LIMITS
                    </h2>
                    <div className="self-end">
                        <p className="text-2xl font-bold max-w-md bg-[#FEC33D] p-4 border-4 border-black shadow-[-8px_8px_0px_#000000] -rotate-1 text-right">
                            Parents can see. You can spend. Freeze it if you lose it.
                        </p>
                    </div>
                </div>
                <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                    <div className="w-full h-full bg-[#6B46C1]/50 mix-blend-multiply" />
                </div>
            </div>

            {/* Step 3: SPEND */}
            <div className="sticky top-0 h-screen flex flex-col md:flex-row bg-[#FEC33D] border-b-4 border-black overflow-hidden group">
                <div className="flex-1 p-12 md:p-24 flex flex-col justify-center border-r-4 border-black">
                    <span className="text-9xl font-black text-black/20 absolute top-4 left-4">03</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase text-[#2B00FF] mb-6 drop-shadow-[4px_4px_0px_#000000]">
                        SPEND<br /> FREELY
                    </h2>
                    <p className="text-2xl font-bold max-w-md bg-white p-4 border-4 border-black shadow-[8px_8px_0px_#000000] rotate-2">
                        Online. In-store. Send to friends. It's your money, finally.
                    </p>
                </div>
                <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-500">
                    <div className="w-full h-full bg-[#FEC33D]/50 mix-blend-multiply" />
                </div>
            </div>
        </section>
    );
}
