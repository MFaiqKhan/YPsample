"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";

function Sticker({
  className,
  children,
  style,
}: {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      className={[
        "absolute select-none border-[3px] border-black px-3 py-2 shadow-[6px_6px_0_#000]",
        "text-[11px] font-black uppercase tracking-[0.18em]",
        className ?? "",
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}

export default function PosterHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 28,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to("[data-float]", {
        y: -10,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.18,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative overflow-hidden bg-[#4b33ff] pt-24 text-white sm:pt-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_15%_15%,rgba(255,208,0,0.22),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(0,0,0,0.18),transparent_26%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:54px_54px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.14),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1.15fr]">
          <div className="relative order-2 pt-8 lg:order-1 lg:pt-12">
            <div
              data-hero-item
              className="inline-flex -rotate-2 border-2 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-black shadow-[5px_5px_0_#000]"
            >
              The future is loud
            </div>

            <h1
              data-hero-item
              className="mt-5 max-w-xl text-[clamp(3.4rem,10vw,7.4rem)] font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#17181f] drop-shadow-[0_2px_0_rgba(255,255,255,0.14)]"
            >
              Aurafarming
            </h1>

            <div className="mt-5 flex flex-wrap gap-3">
              <span
                data-hero-item
                className="border-[3px] border-black bg-[#fff8f0] px-4 py-2 text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-none text-black shadow-[6px_6px_0_#000]"
              >
                The
              </span>
              <span
                data-hero-item
                className="border-[3px] border-black bg-[#ff8d6b] px-4 py-2 text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-none text-[#30141a] shadow-[6px_6px_0_#000]"
              >
                New
              </span>
              <span
                data-hero-item
                className="border-[3px] border-black bg-[#111111] px-4 py-2 text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-none text-white shadow-[6px_6px_0_#000]"
              >
                Hype
              </span>
            </div>

            <div
              data-hero-item
              className="mt-8 max-w-2xl border-l-[6px] border-[#ffd400] bg-[#3327a0]/80 px-5 py-5 text-center text-sm leading-7 text-white shadow-[8px_8px_0_#000] sm:px-8 sm:text-base"
            >
              Forget traditional banking. We are building a decentralized
              ecosystem for the digital native. Scan, farm aura, and join the
              most exclusive movement in the Gen Z financial underground.
            </div>

            <div data-hero-item className="mt-8 flex flex-wrap items-center gap-4">
              <button className="border-2 border-black bg-[#ffd400] px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-black shadow-[6px_6px_0_#000] transition-transform hover:-translate-y-0.5">
                Join the Movement
              </button>
              <button className="text-sm font-black uppercase tracking-[0.2em] text-white/90 underline decoration-2 underline-offset-4">
                Explore the Vault
              </button>
            </div>
          </div>

          <div className="relative order-1 min-h-[520px] lg:order-2 lg:min-h-[700px]">
            <div
              data-hero-item
              data-float
              className="absolute left-0 top-16 w-[190px] -rotate-8 sm:w-[240px] lg:left-[-18px] lg:top-28 lg:w-[280px]"
            >
              <div className="relative overflow-hidden border-[4px] border-black bg-[#111024] shadow-[10px_10px_0_#000]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.24),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_45%)]" />
                <div className="aspect-[4/5] p-4">
                  <div className="relative h-full rounded-[28px] border-[3px] border-white/20 bg-[linear-gradient(180deg,#1b1538,#0a0a12)]">
                    <div className="absolute left-1/2 top-6 h-24 w-24 -translate-x-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_50%_35%,#ffffff 0%,#d5d5ef 10%,#40415e 45%,#17182d 100%)]" />
                    <div className="absolute left-1/2 top-16 h-36 w-20 -translate-x-1/2 rounded-b-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03))]" />
                    <div className="absolute bottom-10 left-1/2 h-24 w-28 -translate-x-1/2 rounded-[40px] bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.25),transparent_58%),linear-gradient(180deg,#35304a,#11111a)] blur-[0.2px]" />
                  </div>
                </div>
                <Sticker className="left-3 bottom-4 rotate-[-6deg] bg-[#ffd400] text-black">
                  Vintage Void
                </Sticker>
                <Sticker className="left-[78px] top-[120px] rotate-[10deg] bg-[#ff5d2d] text-white">
                  No limits
                </Sticker>
              </div>
            </div>

            <div
              data-hero-item
              data-float
              className="absolute right-0 top-12 w-[220px] rotate-[10deg] sm:w-[260px] lg:right-4 lg:top-14 lg:w-[320px]"
            >
              <div className="border-[4px] border-black bg-white p-4 shadow-[10px_10px_0_#000]">
                <div className="flex items-start gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center bg-[#4b33ff] text-white">
                    <span className="text-xl">◫</span>
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-black uppercase tracking-[0.18em] text-black">
                      Scan Student ID
                    </div>
                    <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/55">
                      Authentication pending
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-hero-item
              data-float
              className="absolute right-6 top-[255px] w-[220px] -rotate-6 sm:w-[250px] lg:right-10 lg:top-[290px] lg:w-[300px]"
            >
              <div className="border-[4px] border-black bg-[#141414] p-5 shadow-[10px_10px_0_#ffd400]">
                <div className="border-2 border-dashed border-[#ffd400]/70 p-6 text-center">
                  <div className="text-3xl">⬢</div>
                  <div className="mt-3 text-lg font-black uppercase tracking-[0.18em] text-[#ffd400]">
                    $Anarchy_Drops
                  </div>
                </div>
              </div>
            </div>

            <div
              data-hero-item
              data-float
              className="absolute right-[125px] top-[128px] hidden w-[120px] rotate-[-6deg] bg-[#3c2cff] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-[6px_6px_0_#000] lg:block"
            >
              Power level: max
            </div>

            <div className="absolute left-[32%] top-[180px] hidden w-[54px] rotate-[16deg] bg-[#2d0c82] px-2 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_#000] lg:block">
              Raw
            </div>

            <div
              data-hero-item
              className="absolute left-1/2 top-[120px] hidden -translate-x-1/2 lg:block"
            >
              <div className="border-[4px] border-black bg-[#ffd400] px-5 py-3 text-[clamp(2.8rem,6vw,5.8rem)] font-black uppercase tracking-[-0.08em] text-[#1d1d1d] shadow-[10px_10px_0_#000]">
                Aurafarming
              </div>
            </div>
          </div>
        </div>

        <div
          data-hero-item
          className="mt-10 grid gap-0 border-[3px] border-black bg-[#efe8e1] text-black shadow-[8px_8px_0_#000] sm:grid-cols-3"
        >
          {[
            { value: "420K+", label: "nodes_active", accent: "text-[#4b33ff]" },
            { value: "$69M+", label: "funds_dropped", accent: "text-[#d35400]" },
            { value: "24/7", label: "uptime_static", accent: "text-black" },
          ].map((item, index) => (
            <div
              key={item.label}
              className={[
                "flex items-center justify-center gap-3 px-6 py-6 text-center",
                index < 2 ? "border-b-[3px] border-black sm:border-b-0 sm:border-r-[3px]" : "",
              ].join(" ")}
            >
              <div className="text-left">
                <div className={["text-3xl font-black leading-none sm:text-4xl", item.accent].join(" ")}>
                  {item.value}
                </div>
                <div className="mt-1 text-[11px] font-black uppercase tracking-[0.22em] text-black/50">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center pb-2">
          <div className="inline-flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-full border-[3px] border-black bg-[#ffd400] shadow-[4px_4px_0_#000]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/65">
              Scroll for intel
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
