"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SubmitState =
  | { kind: "idle" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function svgPlaceholderDataUri(title: string, subtitle: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0b10"/>
      <stop offset="1" stop-color="#1a1a22"/>
    </linearGradient>
    <radialGradient id="glow" cx="35%" cy="25%" r="70%">
      <stop offset="0" stop-color="rgba(217,255,0,0.35)"/>
      <stop offset="1" stop-color="rgba(217,255,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="900" height="1200" rx="70" fill="url(#g)"/>
  <rect width="900" height="1200" rx="70" fill="url(#glow)"/>
  <g opacity="0.12">
    <path d="M-50 260 C 120 140, 260 140, 460 260 C 650 370, 770 360, 980 250" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
    <path d="M-50 340 C 140 220, 280 220, 480 340 C 680 460, 820 440, 980 330" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
    <path d="M-50 420 C 160 310, 300 310, 500 420 C 700 540, 860 520, 980 410" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
    <path d="M-50 500 C 180 400, 320 400, 520 500 C 720 620, 900 600, 980 490" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
    <path d="M-50 580 C 200 490, 340 490, 540 580 C 740 700, 920 680, 980 570" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>
  </g>
  <g fill="rgba(255,255,255,0.92)">
    <text x="70" y="120" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="8">PLACEHOLDER</text>
    <text x="70" y="188" font-size="62" font-family="Arial, Helvetica, sans-serif" font-weight="800">${title}</text>
    <text x="70" y="246" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="600" fill="rgba(255,255,255,0.72)">${subtitle}</text>
  </g>
  <g fill="rgba(217,255,0,0.95)">
    <circle cx="820" cy="120" r="10"/>
  </g>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function YouthPayLanding() {
  const [isLocked, setIsLocked] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [isPending, startTransition] = useTransition();
  const [activePartnerIndex, setActivePartnerIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);
  const blobsRef = useRef<Array<HTMLDivElement | null>>([]);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const collectionsSectionRef = useRef<HTMLElement | null>(null);
  const collectionsTrackRef = useRef<HTMLDivElement | null>(null);
  const collectionsViewportRef = useRef<HTMLDivElement | null>(null);
  const howSectionRef = useRef<HTMLElement | null>(null);
  const howLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const howLabelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const howStepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    document.documentElement.style.overflow = isLocked ? "hidden" : "";
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLocked]);

  useEffect(() => {
    if (!heroRef.current) return;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes squirm {
        0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      }
      @keyframes gradient-xy {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .animate-squirm {
        animation: squirm 8s ease-in-out infinite;
      }
      .animate-gradient-xy {
        background-size: 200% 200%;
        animation: gradient-xy 6s ease infinite;
      }
    `;
    document.head.appendChild(style);

    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.fromTo(
        "[data-hero]",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", stagger: 0.06 },
      );

      blobsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          y: index % 2 === 0 ? -18 : 18,
          x: index % 2 === 0 ? 14 : -14,
          duration: 5.5 + index * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      if (heroRef.current && heroCardRef.current) {
        gsap.set(heroCardRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          borderRadius: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=130%",
            scrub: true,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          heroCardRef.current,
          {
            scale: 0.9,
            borderRadius: 44,
            y: 0,
            ease: "none",
          },
          0,
        )
          .to(
            heroCardRef.current,
            {
              y: -50,
              ease: "none",
            },
            0.62,
          );
      }

      if (marqueeRef.current) {
        const track = marqueeRef.current;
        const singleLoopWidth = track.scrollWidth / 2;
        if (singleLoopWidth > 0) {
          gsap.set(track, { x: 0 });
          gsap.to(track, {
            x: -singleLoopWidth,
            duration: Math.max(14, singleLoopWidth / 55),
            ease: "none",
            repeat: -1,
          });
        }
      }
    }, heroRef);

    return () => {
      document.head.removeChild(style);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (
      !collectionsSectionRef.current ||
      !collectionsTrackRef.current ||
      !collectionsViewportRef.current
    ) {
      return;
    }

    const section = collectionsSectionRef.current;
    const track = collectionsTrackRef.current;
    const viewport = collectionsViewportRef.current;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-collection-card]", track);
      if (cards.length <= 1) return;

      const scaleSetters = cards.map((el) => gsap.quickSetter(el, "scale"));
      const opacitySetters = cards.map((el) => gsap.quickSetter(el, "opacity"));
      const ySetters = cards.map((el) => gsap.quickSetter(el, "y"));
      const blurSetters = cards.map((el) => gsap.quickSetter(el, "filter"));

      const updateVisuals = (progress: number) => {
        const t = progress * (cards.length - 1);
        for (let i = 0; i < cards.length; i += 1) {
          const d = Math.abs(i - t);
          const scale = Math.max(0.8, 1 - d * 0.1);
          const opacity = Math.max(0.18, 1 - d * 0.32);
          const y = Math.min(26, d * 10);
          const blur = Math.min(10, d * 3.4);

          (scaleSetters[i] as (v: number) => void)(scale);
          (opacitySetters[i] as (v: number) => void)(opacity);
          (ySetters[i] as (v: number) => void)(y);
          (blurSetters[i] as (v: string) => void)(`blur(${blur}px)`);
        }
      };

      const computeDistance = () => {
        const first = cards[0];
        const rect = first.getBoundingClientRect();
        const cardWidth = rect.width;
        const style = window.getComputedStyle(track);
        const gap = Number.parseFloat(style.gap || "0") || 0;
        return Math.max(0, (cardWidth + gap) * (cards.length - 1));
      };

      updateVisuals(0);

      const tween = gsap.to(track, {
        x: () => -computeDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(900, computeDistance() + viewport.clientHeight * 1.2)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: { min: 0.08, max: 0.24 },
            ease: "power2.out",
          },
          onRefresh: (self) => {
            updateVisuals(self.progress);
          },
          onUpdate: (self) => {
            updateVisuals(self.progress);
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!howSectionRef.current) return;

    const section = howSectionRef.current;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const visual = section.querySelector<HTMLElement>("[data-how-visual]");
      const steps = howStepRefs.current.filter(
        (el): el is HTMLDivElement => Boolean(el),
      );
      const layers = howLayerRefs.current.filter(
        (el): el is HTMLDivElement => Boolean(el),
      );
      const labels = howLabelRefs.current.filter(
        (el): el is HTMLDivElement => Boolean(el),
      );

      if (steps.length === 0 || layers.length === 0) return;

      gsap.set(layers, {
        opacity: 0,
        y: 26,
        scale: 0.985,
        transformOrigin: "50% 60%",
      });

      gsap.set(labels, {
        opacity: 0,
        y: 10,
        scale: 0.985,
        transformOrigin: "50% 50%",
      });

      const stepAccents = steps.map((step) =>
        step.querySelector<HTMLElement>("[data-how-step-accent]"),
      );

      const activate = (index: number) => {
        for (let i = 0; i < layers.length; i += 1) {
          const isOn = i <= index;
          gsap.to(layers[i], {
            opacity: isOn ? 1 : 0,
            y: isOn ? 0 : 26,
            scale: isOn ? 1 : 0.985,
            duration: 0.42,
            ease: "power2.out",
            overwrite: true,
          });
        }

        for (let i = 0; i < labels.length; i += 1) {
          const isOn = i <= index;
          gsap.to(labels[i], {
            opacity: isOn ? 1 : 0,
            y: isOn ? 0 : 10,
            scale: isOn ? 1 : 0.985,
            duration: 0.32,
            ease: "power2.out",
            overwrite: true,
          });
        }

        for (let i = 0; i < steps.length; i += 1) {
          const isActive = i === index;
          gsap.to(steps[i], {
            opacity: isActive ? 1 : 0.7,
            duration: 0.22,
            ease: "power2.out",
            overwrite: true,
          });
          if (stepAccents[i]) {
            gsap.to(stepAccents[i], {
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.96,
              duration: 0.22,
              ease: "power2.out",
              overwrite: true,
            });
          }
        }
      };

      activate(0);

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (visual) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top+=88",
            end: () => `+=${Math.max(720, steps.length * 360)}`,
            pin: visual,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        }

        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top center",
            end: "bottom center",
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
          });

          gsap.fromTo(
            step,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 70%",
            end: "bottom 60%",
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
          });

          gsap.fromTo(
            step,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      return () => {
        mm.revert();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const howSteps = useMemo(
    () => [
      {
        title: "Sign up fast",
        desc: "Email in. Profile later. Zero friction.",
        meta: "STEP 01",
        label: "Account created",
        labelClass:
          "left-5 top-6 md:left-7 md:top-8 bg-[rgb(var(--color-youthpay-accent-rgb))] text-black",
        layerClass:
          "absolute inset-6 md:inset-8 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(217,255,0,0.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_55%)]",
      },
      {
        title: "Verify with Student ID",
        desc: "Trust checks that fit student life.",
        meta: "STEP 02",
        label: "ID verified",
        labelClass:
          "right-5 top-16 md:right-7 md:top-20 bg-white/10 text-white",
        layerClass:
          "absolute inset-0 [mask-image:radial-gradient(circle_at_70%_30%,black_40%,transparent_72%)]",
      },
      {
        title: "Transact online",
        desc: "Cards + web checkout with sane limits.",
        meta: "STEP 03",
        label: "Online spend enabled",
        labelClass:
          "left-5 bottom-6 md:left-7 md:bottom-8 bg-white/10 text-white",
        layerClass:
          "absolute inset-0 [mask-image:radial-gradient(circle_at_35%_70%,black_42%,transparent_74%)]",
      },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { label: "Audience", value: "Gen Z under 18" },
      { label: "Verification", value: "Student ID" },
      { label: "Coverage", value: "Pakistan-first" },
    ],
    [],
  );

  const partnerBrands = useMemo(
    () => [
      "JazzCash",
      "Easypaisa",
      "Mobilink Microfinance Bank",
      "Telenor Microfinance Bank",
      "U Bank",
      "FINCA",
      "Khushhali Microfinance Bank",
      "NRSP Bank",
      "Microfinance rails",
      "Audits & settlement",
    ],
    [],
  );

  const partnerLineup = useMemo(
    () => [
      {
        label: "MMBL",
        fullName: "Mobilink Microfinance Bank",
        imageSrc: svgPlaceholderDataUri("Mobilink Microfinance Bank", "PARTNER"),
      },
      {
        label: "TMFB",
        fullName: "Telenor Microfinance Bank",
        imageSrc: svgPlaceholderDataUri("Telenor Microfinance Bank", "PARTNER"),
      },
      {
        label: "U Bank",
        fullName: "U Bank",
        imageSrc: svgPlaceholderDataUri("U Bank", "PARTNER"),
      },
      {
        label: "FINCA",
        fullName: "FINCA Microfinance Bank",
        imageSrc: svgPlaceholderDataUri("FINCA Microfinance Bank", "PARTNER"),
      },
      {
        label: "KMBL",
        fullName: "Khushhali Microfinance Bank",
        imageSrc: svgPlaceholderDataUri("Khushhali Microfinance Bank", "PARTNER"),
      },
      {
        label: "NRSP",
        fullName: "NRSP Microfinance Bank",
        imageSrc: svgPlaceholderDataUri("NRSP Microfinance Bank", "PARTNER"),
      },
      {
        label: "Soneri",
        fullName: "Soneri Bank",
        imageSrc: svgPlaceholderDataUri("Soneri Bank", "PARTNER"),
      },
      {
        label: "HBL",
        fullName: "HBL Microfinance",
        imageSrc: svgPlaceholderDataUri("HBL Microfinance", "PARTNER"),
      },
    ],
    [],
  );

  const collectionsCards = useMemo(
    () => [
      {
        title: "Teen Wallet",
        subtitle: "Launch teaser",
        needed: "Portrait photo: teen holding phone, bold lighting, neutral background",
        x: -220,
        y: 46,
        rot: -14,
        z: "z-10",
      },
      {
        title: "Student ID",
        subtitle: "Verification story",
        needed: "Close-up: student ID / campus vibe (avoid readable personal info)",
        x: -110,
        y: 26,
        rot: -7,
        z: "z-20",
      },
      {
        title: "Online Spend",
        subtitle: "Checkout moment",
        needed: "Hands + phone checkout / card tap moment, modern and energetic",
        x: 0,
        y: 18,
        rot: 0,
        z: "z-30",
      },
      {
        title: "Controls",
        subtitle: "Limits + freeze",
        needed: "Phone UI screenshot-style graphic (no real user data), dark theme ok",
        x: 110,
        y: 26,
        rot: 7,
        z: "z-20",
      },
      {
        title: "Partners",
        subtitle: "Rails + settlement",
        needed: "Abstract fintech/rails graphic or bank/building shot with strong shapes",
        x: 220,
        y: 46,
        rot: 14,
        z: "z-10",
      },
    ],
    [],
  );

  const stickerCards = useMemo(
    () => [
      {
        kicker: "STUDENT ID",
        title: "Verified teens, not guesswork.",
        desc: "Sign up fast. Verify once. Get online-ready.",
        className:
          "bg-[rgb(var(--color-youthpay-accent-rgb))] text-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]",
        rotate: -4,
      },
      {
        kicker: "LIMITS",
        title: "Controls that feel normal.",
        desc: "Caps, categories, freezes — without killing the vibe.",
        className:
          "bg-white text-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]",
        rotate: 3,
      },
      {
        kicker: "ONLINE",
        title: "Spend where teens actually live.",
        desc: "Cards & web checkout, built for everyday online.",
        className:
          "bg-[rgb(var(--color-youthpay-danger-rgb))] text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]",
        rotate: -2,
      },
      {
        kicker: "PARENTS",
        title: "Optional view, not a takeover.",
        desc: "Trust-first transparency, when families want it.",
        className:
          "bg-[#0b0b10] text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)]",
        rotate: 2,
      },
    ],
    [],
  );

  const microTiles = useMemo(
    () => [
      {
        title: "Freeze instantly",
        desc: "One tap if something feels off.",
        tag: "SAFETY",
      },
      {
        title: "Smart limits",
        desc: "Daily caps + category rules.",
        tag: "CONTROL",
      },
      {
        title: "Verified flows",
        desc: "Student ID checks, built-in.",
        tag: "TRUST",
      },
      {
        title: "Settlement-ready",
        desc: "Partner rails from day one.",
        tag: "B2B",
      },
      {
        title: "Youth-first UX",
        desc: "Fast, bold, no lectures.",
        tag: "GEN Z",
      },
      {
        title: "Audit-friendly",
        desc: "Clear logs, partner-grade reporting.",
        tag: "COMPLIANCE",
      },
      {
        title: "School onboarding",
        desc: "Designed for real campuses.",
        tag: "NETWORK",
      },
      {
        title: "Goals & saving",
        desc: "Save for drops and plans.",
        tag: "MONEY",
      },
    ],
    [],
  );

  const microViz = useMemo(() => {
    const values = [
      { genZ: 39, millennials: 54 },
      { genZ: 38, millennials: 51 },
      { genZ: 30, millennials: 32 },
      { genZ: 21, millennials: 30 },
    ];

    return microTiles.slice(0, 4).map((tile, index) => ({
      ...tile,
      genZ: values[index]?.genZ ?? 35,
      millennials: values[index]?.millennials ?? 40,
      avatar: tile.title.slice(0, 1).toUpperCase(),
    }));
  }, [microTiles]);

  async function submitWaitlist() {
    const normalized = email.trim().toLowerCase();
    if (!isValidEmail(normalized)) {
      setSubmitState({ kind: "error", message: "Enter a valid email." });
      return;
    }

    setSubmitState({ kind: "idle" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: normalized }),
      });

      const payload = (await res.json().catch(() => null)) as
        | { ok: boolean; message?: string }
        | null;

      if (!res.ok) {
        setSubmitState({
          kind: "error",
          message: payload?.message ?? "Couldn’t join waitlist. Try again.",
        });
        return;
      }

      setEmail("");
      setSubmitState({
        kind: "success",
        message: payload?.message ?? "You’re on the list.",
      });
    } catch {
      setSubmitState({
        kind: "error",
        message: "Network error. Try again.",
      });
    }
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-youthpay-bg)] text-[var(--color-youthpay-fg)] selection:bg-[rgb(var(--color-youthpay-accent-rgb))]/25 selection:text-[var(--color-youthpay-fg)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={(el) => {
            blobsRef.current[0] = el;
          }}
          className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-55"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(35, 255, 182, .65), transparent 60%)",
          }}
        />
        <div
          ref={(el) => {
            blobsRef.current[1] = el;
          }}
          className="absolute -right-44 top-8 h-[520px] w-[520px] rounded-full blur-3xl opacity-45"
          style={{
            background:
              "radial-gradient(circle at 65% 25%, rgba(35, 255, 182, .35), transparent 60%)",
          }}
        />
        <div
          ref={(el) => {
            blobsRef.current[2] = el;
          }}
          className="absolute left-1/3 top-[520px] h-[560px] w-[560px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, .16), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.55)_1px,transparent_0)] [background-size:26px_26px]" />
      </div>

      <header className="fixed top-0 z-50 w-full">
        <div className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl shadow-[0_18px_60px_-35px_rgba(0,0,0,0.9)]">
            <a
              href="#"
              onClick={() => setIsNavOpen(false)}
              className="group flex items-center gap-3 font-semibold tracking-tight text-white"
            >
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(217,255,0,0.75),transparent_55%),linear-gradient(135deg,rgba(255,42,42,0.30),transparent_55%)] ring-1 ring-white/10 shadow-[0_16px_50px_-30px_rgba(217,255,0,0.65)]">
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
              </div>
              <div className="leading-none">
                <div className="text-[11px] font-semibold tracking-[0.35em] opacity-70">
                  YOUTH
                </div>
                <div className="text-base font-semibold tracking-tight">
                  PAY
                </div>
              </div>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/70 sm:inline-flex">
                BETA
              </span>
            </a>

            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold text-white/80 md:flex">
              {[
                { label: "How it works", href: "#how" },
                { label: "Safety", href: "#safety" },
                { label: "Partners", href: "#partners" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#waitlist"
                className="rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))] px-4 py-2 text-black shadow-[0_14px_36px_-24px_rgba(217,255,0,0.95)] transition hover:bg-[rgb(var(--color-youthpay-accent-rgb))]/90"
              >
                Join waitlist
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="#waitlist"
                onClick={() => setIsNavOpen(false)}
                className="hidden items-center justify-center rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))] px-4 py-2 text-xs font-semibold text-black shadow-[0_14px_36px_-24px_rgba(217,255,0,0.95)] transition hover:bg-[rgb(var(--color-youthpay-accent-rgb))]/90 sm:inline-flex md:hidden"
              >
                WAITLIST
              </a>
              <button
                type="button"
                onClick={() => setIsLocked((v) => !v)}
                className={cn(
                  "hidden rounded-full px-4 py-2 text-xs font-semibold transition sm:inline-flex",
                  isLocked
                    ? "bg-white text-black shadow-[0_16px_50px_-35px_rgba(255,255,255,0.8)] hover:bg-white/90"
                    : "bg-white/10 text-white shadow-[0_16px_50px_-35px_rgba(0,0,0,0.9)] hover:bg-white/15",
                )}
              >
                {isLocked ? "Unlock" : "Lock"}
              </button>
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={isNavOpen}
                onClick={() => setIsNavOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 md:hidden"
              >
                <div className="grid gap-1">
                  <span
                    className={cn(
                      "block h-0.5 w-5 rounded-full bg-white transition-transform",
                      isNavOpen ? "translate-y-1.5 rotate-45" : "",
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 w-5 rounded-full bg-white transition-opacity",
                      isNavOpen ? "opacity-0" : "opacity-100",
                    )}
                  />
                  <span
                    className={cn(
                      "block h-0.5 w-5 rounded-full bg-white transition-transform",
                      isNavOpen ? "-translate-y-1.5 -rotate-45" : "",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>

          {isNavOpen ? (
            <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl md:hidden">
              <div className="flex flex-col gap-2">
                {[
                  { label: "How it works", href: "#how" },
                  { label: "Safety", href: "#safety" },
                  { label: "Partners", href: "#partners" },
                  { label: "Waitlist", href: "#waitlist" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsNavOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                  >
                    <span>{item.label}</span>
                    <span className="h-2 w-2 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
                  </a>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsLocked((v) => !v)}
                  className={cn(
                    "inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 text-sm font-semibold transition",
                    isLocked
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-white/5 text-white hover:bg-white/10",
                  )}
                >
                  {isLocked ? "Unlock scroll" : "Lock scroll"}
                </button>
                <a
                  href="#waitlist"
                  onClick={() => setIsNavOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[rgb(var(--color-youthpay-accent-rgb))] text-sm font-semibold text-black transition hover:bg-[rgb(var(--color-youthpay-accent-rgb))]/90"
                >
                  Join waitlist
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main className="relative z-10 pt-[72px]">
        <section
          ref={heroRef}
          className="relative h-[calc(100vh-72px)] w-full"
        >
          <div
            ref={heroCardRef}
            className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[#0b0b10] text-white will-change-transform"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-35"
              src="/3078336-hd_1280_720_50fps.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-[#0b0b10]/55" />
            <div className="absolute inset-0 opacity-[0.22] [background-image:repeating-radial-gradient(circle_at_22%_28%,rgba(255,255,255,.09)_0,rgba(255,255,255,.09)_1px,transparent_1px,transparent_30px),repeating-radial-gradient(circle_at_72%_36%,rgba(255,255,255,.07)_0,rgba(255,255,255,.07)_1px,transparent_1px,transparent_36px)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.10),transparent_58%)]" />
            <div className="absolute -left-32 top-16 h-[520px] w-[520px] rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]/12 blur-3xl" />
            <div className="absolute -right-40 top-40 h-[520px] w-[520px] rounded-full bg-[rgb(var(--color-youthpay-danger-rgb))]/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-4 rounded-[44px] border border-[rgb(var(--color-youthpay-accent-rgb))]/70" />
            <div className="pointer-events-none absolute inset-4 rounded-[44px] shadow-[0_0_0_2px_rgba(0,0,0,1)]" />

            <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-28 pt-8 sm:px-8 md:pb-32 md:pt-10">
              <div className="grid flex-1 grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
                <div data-hero className="md:col-span-3">
                  <div className="text-[11px] font-semibold tracking-[0.35em] text-white/55">
                    PAGES
                  </div>
                  <div className="mt-4 space-y-2 text-sm font-semibold tracking-tight text-white/90">
                    {["HOME", "HOW IT WORKS", "SAFETY", "PARTNERS", "WAITLIST"].map(
                      (label) => (
                        <a
                          key={label}
                          href={
                            label === "WAITLIST"
                              ? "#waitlist"
                              : label === "HOW IT WORKS"
                                ? "#how"
                                : "#"
                          }
                          className={cn(
                            "block w-fit transition",
                            label === "WAITLIST"
                              ? "text-[rgb(var(--color-youthpay-accent-rgb))]"
                              : "hover:text-white",
                          )}
                        >
                          {label}
                        </a>
                      ),
                    )}
                  </div>
                </div>

                <div
                  data-hero
                  className="relative md:col-span-6 md:text-center"
                >
                  <div className="pointer-events-none absolute -top-10 left-1/2 w-[180px] -translate-x-1/2 opacity-80 md:-top-12">
                    <svg viewBox="0 0 240 120" className="h-auto w-full">
                      <path
                        d="M14 84c18-26 42-54 73-62 20-5 41 8 54 23 14 16 23 35 38 50 16 17 36 18 59-3"
                        fill="none"
                        stroke="rgb(var(--color-youthpay-accent-rgb))"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 88c24-18 52-34 83-30 25 3 31 21 41 39 11 20 26 33 55 19"
                        fill="none"
                        stroke="rgba(255,255,255,.65)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h1 className="text-balance text-4xl font-semibold leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
                    ALWAYS{" "}
                    <span className="text-[rgb(var(--color-youthpay-accent-rgb))]">
                      BRINGING
                    </span>
                    <br />
                    THE LIGHT.
                  </h1>
                  <p className="mt-5 text-pretty text-sm leading-6 text-white/70 sm:text-base">
                    A teen wallet for Pakistan: student ID verification, online
                    payments, and partner-ready settlement.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <a
                      href="#waitlist"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[rgb(var(--color-youthpay-accent-rgb))] px-6 text-sm font-semibold text-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition hover:translate-x-0.5 hover:-translate-y-0.5 motion-reduce:hover:translate-x-0 motion-reduce:hover:-translate-y-0"
                    >
                      Get early access
                    </a>
                    <a
                      href="#how"
                      className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition hover:translate-x-0.5 hover:-translate-y-0.5 motion-reduce:hover:translate-x-0 motion-reduce:hover:-translate-y-0"
                    >
                      How it works
                    </a>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                      >
                        <div className="text-[11px] font-semibold tracking-widest text-white/55">
                          {s.label}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-white/90">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div data-hero className="md:col-span-3 md:text-right">
                  <div className="text-[11px] font-semibold tracking-[0.35em] text-white/55">
                    FOLLOW ON
                  </div>
                  <div className="mt-4 space-y-2 text-sm font-semibold text-white/90">
                    {["TIKTOK", "INSTAGRAM", "YOUTUBE", "TWITCH"].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="block w-fit transition hover:text-white md:ml-auto"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 left-1/2 w-[calc(100%-2.5rem)] max-w-6xl -translate-x-1/2 sm:w-[calc(100%-4rem)]">
                <div className="rounded-[26px] bg-[rgb(var(--color-youthpay-accent-rgb))] p-3 shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
                  <div className="flex items-center justify-between gap-4 px-2">
                    <div className="text-[11px] font-semibold tracking-[0.35em] text-black/70">
                      PARTNERS
                    </div>
                    <div className="text-[11px] font-semibold tracking-widest text-black/60">
                      LEFT → RIGHT
                    </div>
                  </div>
                  <div className="mt-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div
                      ref={marqueeRef}
                      className="flex w-max items-center gap-3 will-change-transform"
                    >
                      {[...partnerBrands, ...partnerBrands].map((brand, index) => (
                        <span
                          key={`${brand}-${index}`}
                          className="shrink-0 rounded-full border border-black/20 bg-white/35 px-4 py-2 text-xs font-semibold text-black/75"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#111a14] text-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold tracking-widest text-white/55">
                MESSAGE
              </div>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                A youth wallet designed for real life —{" "}
                <span className="text-[rgb(var(--color-youthpay-accent-rgb))]">
                  online, verified, auditable
                </span>
                .
              </h2>
              <p className="mt-6 text-pretty text-base leading-7 text-white/70 sm:text-lg">
                Built for Gen Z, safe enough for parents, and structured for
                settlements and partner-grade audits.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={collectionsSectionRef}
          className="relative w-full overflow-hidden bg-[var(--color-youthpay-bg)] text-[var(--color-youthpay-fg)]"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-48 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.06),transparent_60%)] blur-2xl" />
            <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,.55)_1px,transparent_0)] [background-size:28px_28px]" />
          </div>

          <div className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
            <div className="relative z-20 mx-auto max-w-3xl text-center">
              <div className="text-xs font-semibold tracking-widest text-black/55">
                COLLECTIONS
              </div>
              <h3 className="mt-6 text-balance text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
                WHAT’S UP
                <br />
                ON SOCIALS
              </h3>
              <p className="mt-6 text-pretty text-sm leading-6 text-black/70 sm:text-base">
                Scroll down — the cards advance like a feed.
              </p>
            </div>

            <div
              ref={collectionsViewportRef}
              className="relative z-10 mx-auto mt-10 h-[480px] w-full sm:mt-14 sm:h-[560px]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[42px] bg-[radial-gradient(circle_at_50%_70%,rgba(217,255,0,0.24),transparent_56%),radial-gradient(circle_at_15%_25%,rgba(0,0,0,0.06),transparent_55%),radial-gradient(circle_at_85%_25%,rgba(0,0,0,0.05),transparent_55%)]" />
              <div className="pointer-events-none absolute inset-0 rounded-[42px] [mask-image:radial-gradient(circle_at_50%_55%,black_60%,transparent_92%)] bg-[linear-gradient(180deg,rgba(255,255,255,0.30),transparent_55%)]" />

              <div className="absolute inset-0 flex items-center">
                <div
                  ref={collectionsTrackRef}
                  className="flex w-max items-center gap-6 px-[calc(50vw-120px)] sm:px-[calc(50vw-140px)] will-change-transform"
                >
                  {collectionsCards.map((card) => (
                    <div
                      key={card.title}
                      data-collection-card
                      className="origin-center shrink-0 transform-gpu"
                    >
                      <div className="relative rounded-[40px] bg-[conic-gradient(from_210deg,rgba(255,42,42,0.95),rgba(217,255,0,0.95),rgba(124,58,237,0.95),rgba(0,229,255,0.90),rgba(255,42,42,0.95))] p-[3px] shadow-[0_55px_140px_-110px_rgba(0,0,0,0.65)]">
                        <div className="relative h-[360px] w-[240px] overflow-hidden rounded-[37px] bg-white/55 backdrop-blur-md sm:h-[420px] sm:w-[280px]">
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(217,255,0,0.85),transparent_55%)] opacity-55" />
                          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),rgba(255,255,255,0.30))]" />
                          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,.55)_1px,transparent_0)] [background-size:22px_22px]" />
                          <div className="pointer-events-none absolute inset-0 rounded-[37px] ring-1 ring-black/10" />

                          <div className="relative flex h-full flex-col p-6 text-black">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="grid h-10 w-10 place-items-center rounded-full bg-[conic-gradient(from_210deg,rgba(255,42,42,0.95),rgba(217,255,0,0.95),rgba(124,58,237,0.95),rgba(0,229,255,0.90),rgba(255,42,42,0.95))] p-[2px]">
                                  <div className="grid h-full w-full place-items-center rounded-full bg-white/80">
                                    <div className="h-2.5 w-2.5 rounded-full bg-black/70" />
                                  </div>
                                </div>
                                <div className="text-left text-[11px] font-semibold tracking-widest text-black/55">
                                  <div>{card.subtitle.toUpperCase()}</div>
                                  <div className="mt-1 text-[10px] tracking-[0.30em] text-black/40">
                                    YOUTHPAY
                                  </div>
                                </div>
                              </div>
                              <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-black/50">
                                DROP
                              </span>
                            </div>

                            <div className="flex flex-1 flex-col items-center justify-center text-center">
                              <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                {card.title}
                              </div>
                              <div className="mt-2 max-h-16 overflow-hidden text-pretty text-sm font-medium leading-5 text-black/55">
                                {card.needed}
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs font-semibold text-black/50">
                              <span className="rounded-full bg-black/5 px-3 py-2">
                                Tap-first
                              </span>
                              <span className="rounded-full bg-black/5 px-3 py-2">
                                Shareable
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-black/60">
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-2">
                Keep scrolling to change the active card
              </span>
              <span className="rounded-full border border-black/10 bg-black/5 px-3 py-2">
                Replace the text with real social screenshots later
              </span>
            </div>
          </div>
        </section>

        <section className="w-full bg-[var(--color-youthpay-bg)] text-[var(--color-youthpay-fg)]">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-12">
              <div>
                <div className="text-xs font-semibold tracking-widest text-black/50">
                  VIBE CHECK
                </div>
                <h3 className="mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
                  Sticker-wall fintech, but make it clean.
                </h3>
                <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-black/70 sm:text-lg">
                  High contrast, real language, and tap-first layout. The UI
                  stays simple — the energy comes from the details.
                </p>
                <div className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-semibold text-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-youthpay-danger-rgb))]" />
                  Built for teens in Pakistan
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[34px] border-2 border-black bg-white p-6 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
                <div className="absolute inset-0 opacity-[0.10] [background-image:repeating-linear-gradient(135deg,rgba(0,0,0,.20)_0,rgba(0,0,0,.20)_2px,transparent_2px,transparent_10px)]" />
                <div className="pointer-events-none absolute -left-20 -top-16 h-[240px] w-[240px] rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]/35 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 -right-24 h-[260px] w-[260px] rounded-full bg-[rgb(var(--color-youthpay-danger-rgb))]/25 blur-3xl" />

                <div className="relative grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[120px]">
                  {stickerCards.map((card, index) => (
                    <div
                      key={card.title}
                      style={{ transform: `rotate(${card.rotate}deg)` }}
                      className={cn(
                        "relative overflow-hidden rounded-3xl border-2 border-black p-5 transition duration-200 ease-out motion-reduce:transition-none hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_26px_70px_-45px_rgba(0,0,0,0.55)] focus-within:-translate-y-1",
                        index === 0
                          ? "md:col-span-3 md:row-span-2"
                          : index === 1
                            ? "md:col-span-3 md:row-span-1"
                            : index === 2
                              ? "md:col-span-3 md:row-span-1"
                              : "md:col-span-6 md:row-span-1",
                        card.className,
                      )}
                    >
                      <div className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 rounded-md bg-black/10" />
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-[11px] font-semibold tracking-widest opacity-80">
                          {card.kicker}
                        </div>
                        <div className="h-2 w-2 rounded-full bg-black/40" />
                      </div>
                      <div className={cn("mt-2 font-semibold leading-tight", index === 0 ? "text-xl" : "text-lg")}>
                        {card.title}
                      </div>
                      <div className="mt-2 text-sm leading-6 opacity-85">
                        {card.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-black text-white">
          <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24">
            <div className="relative overflow-hidden rounded-[44px] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_55%),radial-gradient(circle_at_70%_30%,rgba(217,255,0,0.10),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_60px_150px_-120px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.22)_1px,transparent_0)] [background-size:22px_22px]" />
              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-white/60">
                    MICRO-EXPERIENCES
                  </div>
                  <h3 className="mt-4 max-w-3xl text-balance text-2xl font-semibold leading-[1.1] tracking-tight sm:text-3xl">
                    Because of{" "}
                    <span className="text-[rgb(var(--color-youthpay-accent-rgb))]">
                      YouthPay
                    </span>
                    , teen payments feel more…
                  </h3>
                </div>
                <div className="hidden text-right text-[11px] font-semibold tracking-widest text-white/55 sm:block">
                  SOURCE: YOUTHPAY
                </div>
              </div>

              <div className="relative mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {microViz.map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="flex items-baseline justify-between gap-6 px-2">
                      <div className="text-left">
                        <div className="text-2xl font-semibold tabular-nums">
                          {item.millennials}%
                        </div>
                        <div className="text-[10px] font-semibold tracking-[0.30em] text-white/55">
                          MILLENNIALS
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold tabular-nums">
                          {item.genZ}%
                        </div>
                        <div className="text-[10px] font-semibold tracking-[0.30em] text-white/55">
                          GEN Z
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-5">
                      <svg
                        viewBox="0 0 120 70"
                        className="mx-auto h-[96px] w-[180px]"
                      >
                        <path
                          d="M10 60 A 50 50 0 0 1 60 10"
                          fill="none"
                          stroke="rgba(255,255,255,0.14)"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <path
                          d="M60 10 A 50 50 0 0 1 110 60"
                          fill="none"
                          stroke="rgba(255,255,255,0.14)"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />

                        <path
                          d="M10 60 A 50 50 0 0 1 60 10"
                          fill="none"
                          stroke="rgba(96,165,250,0.95)"
                          strokeWidth="10"
                          strokeLinecap="round"
                          pathLength={100}
                          strokeDasharray={`${item.millennials} 100`}
                        />
                        <path
                          d="M60 10 A 50 50 0 0 1 110 60"
                          fill="none"
                          stroke="rgb(var(--color-youthpay-accent-rgb))"
                          strokeWidth="10"
                          strokeLinecap="round"
                          pathLength={100}
                          strokeDasharray={`${item.genZ} 100`}
                        />
                      </svg>

                      <div className="absolute left-1/2 top-[46px] -translate-x-1/2">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-[conic-gradient(from_210deg,rgba(255,42,42,0.95),rgba(217,255,0,0.95),rgba(124,58,237,0.95),rgba(0,229,255,0.90),rgba(255,42,42,0.95))] p-[2px] shadow-[0_25px_70px_-50px_rgba(0,0,0,0.9)]">
                          <div className="grid h-full w-full place-items-center rounded-full bg-black/70 text-sm font-semibold text-white">
                            {item.avatar}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-sm font-semibold text-white/90">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-white/60">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full bg-[#07070a] text-white">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(217,255,0,0.18),transparent_60%)] blur-2xl" />
            <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.18)_1px,transparent_0)] [background-size:24px_24px]" />
          </div>

          <section
            id="how"
            className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24"
            ref={howSectionRef}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
                  HOW IT WORKS
                </div>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">
                  Set up fast. Stay in control. Spend online.
                </h2>
                <div className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                  Built for mobile-first habits, not endless forms.
                </div>
              </div>
              <a
                href="#waitlist"
                className="inline-flex h-11 items-center justify-center rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))] px-6 text-sm font-semibold text-black transition hover:bg-[rgb(var(--color-youthpay-accent-rgb))]/90"
              >
                Get early access
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <div className="space-y-4">
                  {howSteps.map((item, index) => (
                    <div
                      key={item.title}
                      ref={(el) => {
                        howStepRefs.current[index] = el;
                      }}
                      data-how-step
                      className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_90px_-70px_rgba(0,0,0,0.9)] backdrop-blur transition hover:bg-white/8"
                    >
                      <div
                        data-how-step-accent
                        className="pointer-events-none absolute inset-0 opacity-0 [background-image:radial-gradient(circle_at_30%_18%,rgba(217,255,0,0.22),transparent_56%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_55%)]"
                      />
                      <div className="relative flex items-start justify-between gap-4">
                        <div className="text-xs font-semibold tracking-widest text-white/60">
                          {item.meta}
                        </div>
                        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/20">
                          <div className="h-2 w-2 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
                        </div>
                      </div>
                      <div className="relative mt-4 text-lg font-semibold tracking-tight">
                        {item.title}
                      </div>
                      <div className="relative mt-2 text-sm leading-6 text-white/70">
                        {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="md:sticky md:top-24">
                  <div
                    data-how-visual
                    className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 shadow-[0_40px_120px_-90px_rgba(0,0,0,0.9)]"
                  >
                    <div className="relative h-[420px] md:h-[520px]">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,255,0,0.14),transparent_58%),radial-gradient(circle_at_72%_65%,rgba(124,58,237,0.16),transparent_60%)]" />
                      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.18)_1px,transparent_0)] [background-size:22px_22px]" />
                      <svg
                        viewBox="0 0 800 560"
                        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M-40 340 C 90 200, 200 220, 300 280 C 420 350, 520 340, 640 230 C 720 160, 780 150, 860 210"
                          fill="none"
                          stroke="rgba(255,255,255,0.18)"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M-40 420 C 140 320, 260 330, 360 380 C 490 450, 600 430, 720 320 C 790 260, 820 250, 860 280"
                          fill="none"
                          stroke="rgba(255,255,255,0.14)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="260" cy="250" r="8" fill="rgba(217,255,0,0.9)" />
                        <circle cx="520" cy="330" r="7" fill="rgba(96,165,250,0.85)" />
                        <circle cx="690" cy="250" r="8" fill="rgba(124,58,237,0.85)" />
                      </svg>

                      {howSteps.map((item, index) => (
                        <div
                          key={item.meta}
                          ref={(el) => {
                            howLayerRefs.current[index] = el;
                          }}
                          className="pointer-events-none absolute inset-0"
                        >
                          {index === 0 ? (
                            <div className={item.layerClass} />
                          ) : null}
                          {index === 1 ? (
                            <div className={item.layerClass}>
                              <div className="absolute right-10 top-10 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.32),transparent_60%)] blur-xl" />
                              <div className="absolute right-14 top-16 h-[160px] w-[160px] rounded-[34px] border border-white/15 bg-black/25 backdrop-blur">
                                <div className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
                                <div className="absolute left-4 top-10 h-2 w-24 rounded-full bg-white/15" />
                                <div className="absolute left-4 top-[52px] h-2 w-16 rounded-full bg-white/10" />
                                <div className="absolute left-4 top-[78px] h-8 w-[120px] rounded-2xl bg-white/5" />
                                <div className="absolute left-4 top-[122px] h-9 w-[120px] rounded-2xl bg-[rgb(var(--color-youthpay-accent-rgb))]/15" />
                              </div>
                            </div>
                          ) : null}
                          {index === 2 ? (
                            <div className={item.layerClass}>
                              <div className="absolute left-10 bottom-10 h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(217,255,0,0.24),transparent_60%)] blur-xl" />
                              <div className="absolute left-14 bottom-14 h-[150px] w-[220px] rounded-[34px] border border-white/15 bg-black/25 backdrop-blur">
                                <div className="absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
                                <div className="absolute left-5 top-11 h-2 w-36 rounded-full bg-white/15" />
                                <div className="absolute left-5 top-[54px] h-2 w-24 rounded-full bg-white/10" />
                                <div className="absolute left-5 top-[84px] h-10 w-[180px] rounded-2xl bg-white/5" />
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}

                      {howSteps.map((item, index) => (
                        <div
                          key={`${item.meta}-label`}
                          ref={(el) => {
                            howLabelRefs.current[index] = el;
                          }}
                          className={cn(
                            "pointer-events-none absolute inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold shadow-[0_18px_60px_-44px_rgba(0,0,0,0.9)] backdrop-blur",
                            item.labelClass,
                          )}
                        >
                          <span className="h-2 w-2 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
                          <span>{item.label}</span>
                        </div>
                      ))}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="safety"
            className="relative mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 md:pb-24"
          >
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start md:gap-24">
              <div className="sticky top-24">
                <div className="text-xs font-semibold tracking-widest text-[#a3ff00]">
                  DO YOU EVER...?
                </div>
                <h2 className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl text-white">
                  Worry about spending? <br />
                  <span className="text-[#a3ff00]">Not with YouthPay.</span>
                </h2>
                <p className="mt-6 text-pretty text-lg leading-8 text-white/70">
                  We replaced the bank lectures with a system that just works.
                </p>
              </div>

              <div className="flex flex-col gap-10">
                {[
                  {
                    title: "Wish I could freeze my card instantly.",
                    percent: "100%",
                    icon: "❄️",
                  },
                  {
                    title: "Need to pay online without borrowing a card.",
                    percent: "100%",
                    icon: "💳",
                  },
                  {
                    title: "Want student discounts that actually verify.",
                    percent: "100%",
                    icon: "🎓",
                  },
                  {
                    title: "Hate hidden fees eating my balance.",
                    percent: "0%",
                    icon: "🚫",
                  },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="mb-4 text-xl font-medium leading-snug text-white/90">
                      {item.title}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex h-6 gap-1">
                          {Array.from({ length: 20 }).map((_, idx) => (
                            <div
                              key={idx}
                              className={cn(
                                "h-full w-3 transition-all duration-300",
                                idx < (item.percent === "0%" ? 2 : 14 + (i * 2))
                                  ? (idx % 3 === 0 ? "bg-[#ff00ff]" : "bg-[#a3ff00]") + " opacity-100"
                                  : "bg-white/10 opacity-30"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-lg font-bold text-[#a3ff00] tabular-nums">{item.percent}</span>
                      </div>
                    </div>
                    <div className="mt-8 h-px w-full bg-gradient-to-r from-[#a3ff00]/50 to-transparent opacity-30" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="partners"
            className="relative w-full bg-[#030014] text-white"
          >
            <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
              <div
                className="relative mx-auto flex min-h-[70vh] items-center justify-center"
                onMouseLeave={() => setActivePartnerIndex(null)}
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.18)_1px,transparent_0)] [background-size:30px_30px]" />

                <div
                  className="relative aspect-square w-full max-w-[980px]"
                  style={{ ["--ring-radius" as any]: "clamp(260px, 33vw, 420px)" }}
                >
                  {partnerLineup.map((partner, index) => {
                    const angle = -110 + (index * 360) / partnerLineup.length;
                    const isActive = activePartnerIndex === index;
                    return (
                      <button
                        key={partner.fullName}
                        type="button"
                        onMouseEnter={() => setActivePartnerIndex(index)}
                        onFocus={() => setActivePartnerIndex(index)}
                        className={cn(
                          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-sm sm:text-base font-bold tracking-[0.2em] transition",
                          isActive
                            ? "text-white scale-125"
                            : "text-white/40 hover:text-white/80 focus:text-white/80",
                        )}
                        style={{
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translate(var(--ring-radius)) rotate(90deg)`,
                        }}
                      >
                        {partner.label.toUpperCase()}
                      </button>
                    );
                  })}

                  {(() => {
                    // Show nothing if no partner is active
                    if (activePartnerIndex === null) {
                      return (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                          <span className="text-xl font-bold tracking-[0.2em] text-white/20">
                            TRUSTED BY BANKS
                          </span>
                        </div>
                      );
                    }

                    const safeIndex = Math.max(0, Math.min(activePartnerIndex, partnerLineup.length - 1));
                    const activePartner = partnerLineup[safeIndex];

                    return (
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="relative mx-auto h-[132px] w-[132px] sm:h-[152px] sm:w-[152px] md:h-[176px] md:w-[176px]">
                          {activePartner ? (
                            <img
                              alt={activePartner.fullName}
                              src={activePartner.imageSrc}
                              className="absolute inset-0 h-full w-full object-cover grayscale"
                            />
                          ) : null}
                        </div>

                        <div className="relative -mt-9 sm:-mt-10 md:-mt-12">
                          <span className="inline-flex max-w-[92vw] items-center bg-[#0b0b10]/90 px-3 py-1.5 text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl md:text-5xl">
                            {activePartner?.fullName ?? "Partner"}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </section>

          <section
            id="waitlist"
            className="relative w-full bg-[#030014] text-white overflow-hidden py-32"
          >
            {/* Animated Background Mesh */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%] animate-gradient-xy bg-[conic-gradient(from_90deg_at_50%_50%,#030014_0%,#a3ff00_25%,#ff00ff_50%,#030014_100%)] blur-[100px]" />
            </div>

            <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 px-5 text-center sm:px-8">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#a3ff00] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3ff00] animate-pulse" />
                Beyond Banking
              </div>

              {/* Headlines */}
              <div className="max-w-3xl space-y-4">
                <h2 className="text-5xl font-extrabold tracking-tighter sm:text-7xl">
                  Early Access to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3ff00] to-[#ff00ff]">
                    Gen Z Freedom.
                  </span>
                </h2>
                <p className="text-lg text-white/60 sm:text-xl">
                  Unlock exclusive early access to the financial operating system built for the next generation.
                </p>
              </div>

              {/* Pill Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  startTransition(() => {
                    void submitWaitlist();
                  });
                }}
                className="relative flex w-full max-w-xl items-center rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition focus-within:border-[#a3ff00] focus-within:bg-black/40"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent px-6 py-4 text-lg text-white placeholder:text-white/30 outline-none"
                />
                <button
                  disabled={isPending}
                  className="shrink-0 rounded-full bg-[#a3ff00] px-8 py-4 text-sm font-bold tracking-wider text-black transition hover:scale-105 hover:bg-[#b3ff00] hover:shadow-[0_0_20px_rgba(163,255,0,0.5)] disabled:opacity-50"
                >
                  {isPending ? "JOINING..." : "SUBSCRIBE"}
                </button>
              </form>

              {/* Social Proof */}
              <div className="flex items-center gap-4 opacity-80">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-8 w-8 rounded-full border-2 border-black bg-gradient-to-br ${i === 1 ? 'from-pink-500' : i === 2 ? 'from-purple-500' : 'from-blue-500'} to-gray-700`} />
                  ))}
                </div>
                <span className="text-sm font-medium text-white/60">Trusted by 1,000+ early adopters</span>
              </div>

              {/* Feature Cards */}
              <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { icon: "⚡", title: "Instant", desc: "Real-time everything." },
                  { icon: "🛡️", title: "Secure", desc: "Bank-grade protection." },
                  { icon: "🔮", title: "Predictive", desc: "AI that knows your flow." },
                ].map((feat) => (
                  <div key={feat.title} className="group rounded-[30px] border border-white/5 bg-white/5 p-8 text-center backdrop-blur-sm transition hover:bg-white/10 hover:border-white/20">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl group-hover:bg-[#a3ff00] group-hover:text-black transition-colors">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold">{feat.title}</h3>
                    <p className="text-sm text-white/50">{feat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Footer Links (Minimal) */}
              <div className="mt-12 flex gap-8 text-xs font-bold tracking-widest text-white/30">
                <a href="#" className="hover:text-white transition">LEGAL</a>
                <a href="#" className="hover:text-white transition">TWITTER</a>
                <a href="#" className="hover:text-white transition">INSTAGRAM</a>
              </div>
            </div>
          </section>
        </section>
      </main>

      {isLocked ? (
        <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit items-center gap-3 rounded-full border border-white/15 bg-black/55 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-youthpay-accent-rgb))]" />
          Scroll is locked — tap “unlock” to explore
        </div>
      ) : null}
    </div>
  );
}
