"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BANKS = ["Meezan Bank", "HBL", "Bank Alfalah", "UBL", "Standard Chartered"];
const SCHOOLS = ["The Lyceum", "Karachi Grammar School", "Cedar College", "Nixor College", "Habib University", "IBA"];

export default function PosterIntegrations() {
    return (
        <section className="py-24 bg-[#F3F4F6] overflow-hidden relative">
            <div className="container-custom relative z-10 text-center mb-16">
                <p className="text-[#FF2E00] font-black uppercase tracking-widest mb-4">
                    Linked Bank Account
                </p>
                <h2 className="text-5xl md:text-7xl font-black text-black leading-[0.9] mb-6">
                    YOUR BANK ACCOUNT.<br />
                    <span className="text-[#2B00FF]">LINK IT.</span> LOAD IT.<br />
                    LOVE IT.
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                    Connect your existing bank or your school ID.
                    We are bringing the top Karachi schools on board.
                </p>
            </div>

            {/* The "Link" Visual - Inspired by the user image */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-20">
                {/* Bank Side */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-purple-900 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                        <span className="text-white font-bold text-xs text-center">MEEZAN<br />BANK</span>
                    </div>
                </div>

                {/* Arrow */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[#FF2E00]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>

                {/* YouthPay Side */}
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#FF2E00] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                        <span className="text-white font-black text-2xl tracking-tighter italic">YP</span>
                    </div>
                </div>
            </div>

            {/* Marquee Section for Schools & Banks */}
            <div className="relative border-y-4 border-black bg-white py-6 transform -rotate-1 shadow-[0px_10px_20px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="flex items-center gap-12 animate-marquee-fast w-max">
                    {[...SCHOOLS, ...BANKS, ...SCHOOLS, ...BANKS].map((name, i) => (
                        <div key={i} className="flex items-center gap-4 flex-shrink-0">
                            <span className="text-2xl font-black uppercase text-gray-800">{name}</span>
                            <div className="w-3 h-3 bg-[#FEC33D] rounded-full" />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-fast {
                    animation: marquee 40s linear infinite;
                }
             `}</style>
        </section>
    );
}
