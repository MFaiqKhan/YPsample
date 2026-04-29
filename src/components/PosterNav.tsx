"use client";

import { useEffect, useState } from "react";

export default function PosterNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50 border-b-[3px] border-black transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.12)]" : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="text-left text-sm font-black uppercase tracking-[0.2em] text-black"
        >
          NEON_ANARCHY
          <span className="mt-1 block h-1 w-16 bg-[linear-gradient(90deg,#111_0%,#111_72%,transparent_72%)]" />
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-xs font-black uppercase tracking-[0.18em] text-[#4c2cff] underline decoration-2 underline-offset-4"
          >
            The Void
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="text-xs font-black uppercase tracking-[0.18em] text-black/75 hover:text-black"
          >
            Drops
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("waitlist")}
            className="text-xs font-black uppercase tracking-[0.18em] text-black/75 hover:text-black"
          >
            About
          </button>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("waitlist")}
          className="border-2 border-black bg-[#ffd400] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-[4px_4px_0_#000] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#000]"
        >
          Join the Movement
        </button>
      </div>
    </nav>
  );
}
