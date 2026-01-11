"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PosterNav from "./PosterNav";
import PosterHero from "./PosterHero";
import PosterFeatures from "./PosterFeatures";
import PosterHowItWorks from "./PosterHowItWorks";
import PosterWaitlist from "./PosterWaitlist";
import PosterIntegrations from "./PosterIntegrations";
import Confetti from "./Confetti"; // Keeping confetti if we want to use it later

export default function YouthPaySinglePage() {

    useEffect(() => {
        // Global smooth scroll behaviors or specific page-wide animations can go here
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    return (
        <div className="min-h-screen bg-black">
            <PosterNav />

            <main>
                <PosterHero />
                <PosterFeatures />
                <PosterHowItWorks />
                <PosterIntegrations />
                <PosterWaitlist />
            </main>
        </div>
    );
}
