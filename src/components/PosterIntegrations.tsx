"use client";

import { useEffect, useRef, useState } from "react";
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
                    Bank and YouthPay will be linked. Schools are just distribution channels.
                </p>
            </div>

            {/* The "Link" Visual - Cycling Banks */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-20">
                {/* Bank Side - Cycling Carousel */}
                <BankCarousel />

                {/* Arrow - Flowy Animation */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-[#FF2E00] animate-flow-arrow relative z-10">
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
                @keyframes flowArrow {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(10px); }
                }
                .animate-flow-arrow {
                    animation: flowArrow 2s ease-in-out infinite;
                }
             `}</style>
        </section>
    );
}

function BankCarousel() {
    const banks = [
        { name: "Meezan Bank", logo: "/meezan-bank-logo.png" },
        { name: "HBL", logo: "/HBL-logo.png" },
        { name: "Bank Alfalah", logo: "/bank-alfalah-logo.png" },
        { name: "UBL", logo: "/png-transparent-ubl-united-bank-limited-hd-logo.png" },
        { name: "Allied Bank", logo: "/allied-bank-limited-logo.png" },
        { name: "Askari Bank", logo: "/Askari-Bank-Logo.png" },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev: number) => (prev + 1) % banks.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [banks.length]);

    const current = banks[index];

    return (
        <div className="flex items-center gap-4">
            <div key={index} className={`w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 transition-all duration-500 animate-fade-in-up p-2`}>
                <img
                    src={current.logo}
                    alt={current.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px) rotate(-3deg); }
                    to { opacity: 1; transform: translateY(0) rotate(-3deg); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
