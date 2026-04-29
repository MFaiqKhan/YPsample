"use client";
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function YouthPaySinglePage() {
  const [navSolid, setNavSolid] = useState(false);
  const [jarFilled, setJarFilled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [c1, setC1] = useState(0);
  const [c3, setC3] = useState(0);

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    
    let ctx = gsap.context(() => {
      // 1. Stagger reveals for text elements
      gsap.utils.toArray('.r, .rl, .rr').forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } }
        );
      });

      // 2. Parallax background elements
      gsap.to('.orb', { yPercent: 40, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to('.mtn-bg', { yPercent: 20, ease: "none", scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });

      // 3. Scroll-Driven Phone Sequence (360 Spin Showcase)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".product-grid", start: "top 25%", end: "bottom 75%", scrub: 1.5 }
      });
      
      // Set the phone to start fully flipped 360 degrees and slightly tilted/zoomed out
      gsap.set('.phone', { rotationY: 360, rotationX: 15, rotationZ: -5, scale: 0.75, z: -300 });
      
      // Spin the phone 360 degrees to face the user, sync glow and interactions
      tl.to('.phone', { rotationY: 0, rotationX: 0, rotationZ: 0, scale: 1, z: 0, duration: 4, ease: 'power1.inOut' }, 0)
        .to('.phone-glow', { background: 'var(--gold)', scale: 1.5, opacity: 0.5, duration: 2 }, 0)
        .to('.phone-glow', { background: '#2D7D46', scale: 1.1, opacity: 0.2, duration: 2 }, 2)
        .to('.balance-amt', { color: '#D62828', scale: 1.05, duration: 1 })
        .to('.balance-amt', { color: 'white', scale: 1, duration: 1 })
        .to('.tx', { x: 15, opacity: 0.4, stagger: 0.2, duration: 1 }, "-=1.5")
        .to('.tx', { x: 0, opacity: 1, duration: 1 });

      // 4. Interactive 3D Mouse Tilt
      const heroSec = document.getElementById("hero");
      const pingoWrap = document.querySelector(".pingo-wrap");
      if (heroSec && pingoWrap) {
        heroSec.addEventListener("mousemove", (e) => {
          const rect = heroSec.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(pingoWrap, { rotationY: x * 35, rotationX: -y * 35, duration: 0.5, ease: "power2.out", transformPerspective: 1000 });
        });
        heroSec.addEventListener("mouseleave", () => {
          gsap.to(pingoWrap, { rotationY: 0, rotationX: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
        });
      }

      // 5. Magnetic Buttons
      gsap.utils.toArray('.btn-red, .nav-cta, .wl-btn').forEach((btn: any) => {
        btn.addEventListener('mousemove', (e: any) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width/2;
          const y = e.clientY - rect.top - rect.height/2;
          gsap.to(btn, { x: x*0.4, y: y*0.4, duration: 0.3, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        });
      });

      // 6. Jar Fill Scroll
      ScrollTrigger.create({ trigger: "#jar-fill", start: "top 80%", onEnter: () => setJarFilled(true) });

      // 7. Stats Counter
      ScrollTrigger.create({
        trigger: "#stats", start: "top 85%",
        onEnter: () => {
          gsap.to({ val: 0 }, { val: 2400, duration: 2.5, ease: "power3.out", onUpdate: function() { setC1(Math.floor(this.targets()[0].val)); } });
          gsap.to({ val: 0 }, { val: 60, duration: 1.5, ease: "power3.out", onUpdate: function() { setC3(Math.floor(this.targets()[0].val)); } });
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoin = () => {
    const inp = document.getElementById('phone-inp') as HTMLInputElement;
    const phone = inp?.value?.trim();
    if(!phone || phone.length < 7) return;
    setSuccess(true);
    
    // Confetti
    const colors = ['#FAF7EF','#F7C948','#1B2A4A','#2D7D46','rgba(255,255,255,0.85)','#B0FFD0'];
    const newConfetti = [];
    for(let i=0; i<60; i++) {
      const isCircle = Math.random() > 0.5;
      newConfetti.push({
        id: i,
        left: Math.random() * 100 + '%',
        top: '-20px',
        width: Math.random() * 10 + 5 + 'px',
        height: Math.random() * 10 + 5 + 'px',
        background: colors[Math.floor(Math.random() * colors.length)],
        borderRadius: isCircle ? '50%' : '2px',
        animationDelay: Math.random() * 1 + 's',
        animationDuration: Math.random() * 2 + 2.5 + 's',
      });
    }
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 4500);
  };

  return (
    <>
      

{/* NAV */}
<nav className={`nav ${navSolid ? "solid" : ""}`} id="nav">
  <a href="#hero" className="logo">
    <div className="logo-mark">YP</div>
    <span className="logo-text">YouthPay</span>
  </a>
  <div className="nav-links">
    <a href="#story" className="nav-link">Pingo's Story</a>
    <a href="#product" className="nav-link">The App</a>
    <a href="#waitlist" className="nav-link">For Parents</a>
  </div>
  <button className="nav-cta" >Join Waitlist</button>
</nav>

{/* HERO */}
<section id="hero">
  <div className="orb orb1"></div>
  <div className="orb orb2"></div>
  <div className="orb orb3"></div>

  {/* Mountain silhouette */}
  <svg className="mtn-bg" viewBox="0 0 1440 200" preserveAspectRatio="none">
    <path d="M0 200 L160 90 L300 155 L440 65 L580 115 L720 38 L860 105 L1000 50 L1140 130 L1280 68 L1440 200Z" fill="#FAF7EF"/>
  </svg>

  {/* PINGO THE PENGUIN â€” Hero Size */}
  <div className="pingo-wrap" style={{ transformStyle: 'preserve-3d', zIndex: 10 }}>
    <div className="pingo-glow"></div>
    <img src="/mascot.png" alt="Pingo Mascot" style={{ width: '280px', height: 'auto', display: 'block', animation: 'bob 3.8s ease-in-out infinite', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))', borderRadius: '24px' }} />
  </div>

  <div className="hero-badge" style={{ animation: 'heroin 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 18px', borderRadius: '50px', backdropFilter: 'blur(16px)', marginBottom: '32px' }}>
    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 12px var(--gold)' }}></span>
    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Dropping in 2026</span>
  </div>

  <h1 className="hero-h1">Your money.<br /><em>Your</em> first card.</h1>

  <p className="hero-sub">Pakistan's first money app that makes you feel important — not managed.</p>

  <div className="hero-btns">
    <button className="btn-red" >Join the Waitlist →</button>
    <button className="btn-ghost" >See the app</button>
  </div>

  <p className="hero-trust">Trusted by parents across Pakistan · No spam · Just your number</p>

  <div className="scroll-hint">
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
</section>

{/* STORY */}
<section id="story">
  <div className="story-decor">P</div>
  <div style={{maxWidth: '1120px', margin: '0 auto'}}>
    <div className="r">
      <span className="label-tag">The Pingo Story</span>
      <h2 className="story-h2">One penguin<br />left the herd.</h2>
    </div>
    <div className="story-grid">
      <div>
        <p className="story-body rl d1">Scientists once found a lone penguin thousands of miles from its colony — climbing alone into the mountains. The world called it lost.</p>
        <div className="quote-navy rl d2">
          <p>"It wasn't lost. It was the first one willing to find out what was on the other side of the mountain."</p>
        </div>
      </div>
      <div className="r" style={{textAlign: 'center'}}>
        {/* Pingo — Story Size */}
        {/* Pingo — Story Size */}
        <div style={{ transformStyle: 'preserve-3d' }} className="story-mascot">
          <img src="/mascot.png" alt="Pingo Mascot" style={{ width: '180px', height: 'auto', margin: '0 auto', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))', borderRadius: '16px' }} />
        </div>
        <p className="pingo-center-name">PINGO</p>
        <p className="pingo-center-sub">YouthPay's pioneer mascot</p>
      </div>
      <div>
        <p className="story-body rr d1">Hania is 17. Rs. 7,000 a month. Doctor parents who are still figuring it out. A hundred dreams she's already started chasing with or without a card.</p>
        <div className="quote-red rr d2">
          <p>"YouthPay is for every Pakistani teen who was told to wait. You don't have to wait anymore."</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* PRODUCT */}
<section id="product">
  <div className="product-grid">
    {/* Phone mockup */}
    <div className="phone-wrap rl">
      <div className="phone-glow" style={{position: 'absolute', top: '50%', left: '50%', width: '320px', height: '320px', background: 'var(--red)', filter: 'blur(90px)', transform: 'translate(-50%, -50%)', opacity: 0.25, zIndex: 0, borderRadius: '50%'}}></div>
      <div className="phone phone-shimmer" style={{zIndex: 1}}>
        {/* FRONT FACE */}
        <div className="phone-face front-face">
          <div className="notch"></div>
          <div className="screen">
            <div className="st">
              <span className="st-time">9:41</span>
              <div className="battery"><div className="battery-fill"></div></div>
            </div>
            <div className="greeting">Good afternoon, Hania</div>
            <div className="balance-amt">Rs. 3,240</div>
            <div className="balance-lbl">Available Balance</div>
            <div className="phone-btns">
              <button className="pb pb-main">Add Money</button>
              <button className="pb pb-sec">Send</button>
            </div>
            <div className="sec-lbl">This Week</div>
            <div className="bars">
              <div className="bar" style={{height: '32%', background: 'rgba(214,40,40,.32)'}}></div>
              <div className="bar" style={{height: '68%', background: 'rgba(214,40,40,.32)'}}></div>
              <div className="bar" style={{height: '22%', background: 'rgba(214,40,40,.32)'}}></div>
              <div className="bar" style={{height: '80%', background: 'rgba(214,40,40,.32)'}}></div>
              <div className="bar" style={{height: '45%', background: 'rgba(214,40,40,.32)'}}></div>
              <div className="bar" style={{height: '100%', background: '#D62828'}}></div>
              <div className="bar" style={{height: '56%', background: 'rgba(214,40,40,.32)'}}></div>
            </div>
            <div className="sec-lbl">Recent</div>
            <div className="tx">
              <div className="tx-l"><div className="tx-ico">☕</div><span className="tx-name">Loop Coffee</span></div>
              <span style={{color: '#D62828', fontSize: '13px', fontWeight: '700'}}>−Rs. 280</span>
            </div>
            <div className="tx">
              <div className="tx-l"><div className="tx-ico">🍕</div><span className="tx-name">Cafeteria</span></div>
              <span style={{color: '#D62828', fontSize: '13px', fontWeight: '700'}}>−Rs. 120</span>
            </div>
            <div className="tx">
              <div className="tx-l"><div className="tx-ico">👩</div><span className="tx-name">Mom</span></div>
              <span style={{color: '#2D7D46', fontSize: '13px', fontWeight: '700'}}>+Rs. 1,000</span>
            </div>
          </div>
          <div className="pnav">
            <div className="pnav-item"><span style={{fontSize: '16px'}}>🏠</span><span className="pnav-lbl" style={{color: '#D62828'}}>Home</span></div>
            <div className="pnav-item"><span style={{fontSize: '16px'}}>💳</span><span className="pnav-lbl" style={{color: 'rgba(255,255,255,.28)'}}>Wallet</span></div>
            <div className="pnav-item"><span style={{fontSize: '16px'}}>🎯</span><span className="pnav-lbl" style={{color: 'rgba(255,255,255,.28)'}}>Goals</span></div>
            <div className="pnav-item"><span style={{fontSize: '16px'}}>👤</span><span className="pnav-lbl" style={{color: 'rgba(255,255,255,.28)'}}>Profile</span></div>
          </div>
        </div>

        {/* BACK FACE */}
        <div className="phone-face back-face">
          <div className="notch"></div>
          <div className="screen" style={{ background: 'linear-gradient(180deg, #1A1A2E 0%, #04040A 100%)' }}>
            <div className="st">
              <span className="st-time">9:41</span>
              <div className="battery"><div className="battery-fill"></div></div>
            </div>
            <div className="greeting" style={{color: '#B0FFD0'}}>Your Goals</div>
            <div className="balance-amt">Rs. 8,500</div>
            <div className="balance-lbl">Total Saved</div>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                   <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>Sneakers</span>
                   <span style={{ fontSize: '14px', color: '#F7C948' }}>60%</span>
                 </div>
                 <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                   <div style={{ height: '100%', width: '60%', background: '#F7C948', borderRadius: '4px' }}></div>
                 </div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                   <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>Concert Ticket</span>
                   <span style={{ fontSize: '14px', color: '#6EDF9B' }}>85%</span>
                 </div>
                 <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                   <div style={{ height: '100%', width: '85%', background: '#6EDF9B', borderRadius: '4px' }}></div>
                 </div>
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                   <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>Emergency</span>
                   <span style={{ fontSize: '14px', color: '#D62828' }}>20%</span>
                 </div>
                 <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                   <div style={{ height: '100%', width: '20%', background: '#D62828', borderRadius: '4px' }}></div>
                 </div>
              </div>
            </div>
          </div>
          <div className="pnav">
            <div className="pnav-item"><span style={{fontSize: '16px'}}>🏠</span><span className="pnav-lbl" style={{color: 'rgba(255,255,255,.28)'}}>Home</span></div>
            <div className="pnav-item"><span style={{fontSize: '16px'}}>💳</span><span className="pnav-lbl" style={{color: 'rgba(255,255,255,.28)'}}>Wallet</span></div>
            <div className="pnav-item"><span style={{fontSize: '16px'}}>🎯</span><span className="pnav-lbl" style={{color: '#F7C948'}}>Goals</span></div>
            <div className="pnav-item"><span style={{fontSize: '16px'}}>👤</span><span className="pnav-lbl" style={{color: 'rgba(255,255,255,.28)'}}>Profile</span></div>
          </div>
        </div>
      </div>
    </div>
    {/* Feature callouts */}
    <div className="rr">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        <span className="label-tag" style={{color: 'var(--red)', textShadow: '0 0 10px rgba(214,40,40,0.4)', margin: 0}}>The App</span>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.03)', 
          border: '1px solid rgba(255,255,255,0.1)', 
          color: 'rgba(255,255,255,0.8)', 
          fontSize: '10px', 
          fontWeight: 600, 
          letterSpacing: '2px', 
          textTransform: 'uppercase', 
          padding: '6px 12px', 
          borderRadius: '50px',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)'
          }}></span>
          Coming Soon
        </div>
      </div>
      <h2 style={{fontSize: 'clamp(34px,5vw,52px)', fontWeight: '800', color: '#fff', letterSpacing: '-1.5px', lineHeight: '1.1', marginBottom: '40px'}}>Designed for<br />how she lives.</h2>
      <div className="feat-list">
        <div>
          <div className="feat-num d1">01</div>
          <div className="feat-title">Balance in 0.2 seconds.</div>
          <p className="feat-desc">She sees exactly what she has the moment she opens the app. No login maze. Her money, front and center, always.</p>
        </div>
        <div className="feat-div"></div>
        <div>
          <div className="feat-num d2">02</div>
          <div className="feat-title">Merchant names. Not codes.</div>
          <p className="feat-desc">"Loop Coffee" not "TXN-204981-PK." Every transaction in plain language — Urdu or English, her choice.</p>
        </div>
        <div className="feat-div"></div>
        <div>
          <div className="feat-num d3">03</div>
          <div className="feat-title">AI that actually teaches.</div>
          <p className="feat-desc">Financial literacy baked into every goal, every top-up. Partnered with SBP licensed EMIs to make sure your money stays secure in the vault. She learns by doing.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* STRIP: EID MONEY */}
<section className="strip strip-dk">
  <div className="strip-inner">
    <div className="rl">
      <span className="strip-eyebrow-dk">Eid. Diwali. Any day.</span>
      <h2 className="strip-h2">Eidi.<br />In 3 seconds.</h2>
      <p className="strip-body">Nani in London. Chacha in Lahore. Family money used to arrive as cash, then disappear. Now it arrives on her phone — instantly, trackably, safely.</p>
      <div className="bullet-row"><div className="bullet-dot"></div><span className="bullet-text">Powered by Pakistan's real-time payment rails</span></div>
      <div className="bullet-row"><div className="bullet-dot"></div><span className="bullet-text">Zero transfer fees for families</span></div>
      <div className="bullet-row"><div className="bullet-dot"></div><span className="bullet-text">Notifies both sender and receiver instantly</span></div>
    </div>
    <div className="rr">
      <div className="strip-visual">
        <div className="eid-title">Eid Mubarak 🌙</div>
        <div className="eid-amount">Rs. 5,000</div>
        <div className="eid-lbl">JUST ARRIVED</div>
        <div className="eid-sender">
          <div className="eid-avatar">👴</div>
          <span className="eid-from">From: Dada — Karachi</span>
        </div>
        <div className="eid-badge">
          <div className="eid-dot"></div>
          <span className="eid-badge-text">Arrived instantly via secure transfer</span>
        </div>
      </div>
    </div>
  </div>
</section>

{/* STRIP: GOALS */}
<section className="strip strip-lt">
  <div className="strip-inner flip">
    <div className="rr">
      <div className="strip-visual">
        <div className="jar-wrap">
          <div className="jar-cap"></div>
          <div className="jar-body">
            <div className="jar-fill" id="jar-fill" style={{ height: jarFilled ? "65%" : "0" }}></div>
            <div className="jar-pct">65%</div>
          </div>
          <div className="jar-info">
            <div className="jar-name">Xander's Pasta Dinner</div>
            <div className="jar-progress">Rs. 3,250 of Rs. 5,000 saved</div>
            <div className="jar-auto">
              <div className="jar-auto-dot"></div>
              <span className="jar-auto-text">Auto-saving Rs. 200/week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="rl">
      <span className="strip-eyebrow-lt">Goals. Vaults. Dreams.</span>
      <h2 className="strip-h2">She names it.<br />She owns it.</h2>
      <p className="strip-body">Not "Savings Goal 1." "Xander's Pasta Dinner." "New Volleyball Shoes." Her goals, in her exact words. Each top-up fills the jar. Financial literacy disguised as joy.</p>
      <div style={{marginTop: '28px', padding: '22px 26px', background: 'rgba(27,42,74,.06)', borderRadius: '14px', borderLeft: '3px solid var(--navy)'}}>
        <p style={{fontSize: '15px', color: 'var(--slate)', fontStyle: 'italic', fontFamily: '\'Lora\',serif', lineHeight: '1.65'}}>"I saved for three weeks just to see the jar fill up." — Beta tester, Lahore</p>
      </div>
    </div>
  </div>
</section>

{/* STRIP: PARENTS */}
<section className="strip strip-dk">
  <div className="strip-inner">
    <div className="rl">
      <span className="strip-eyebrow-dk">Parents. Trust. Built-in.</span>
      <h2 className="strip-h2">She's safe.<br />You know it.</h2>
      <p className="strip-body">Parents see one number, one context. "Hania spent Rs. 4,200 this week." Soft limits warn her. Hard limits protect her. Dignity preserved. Trust built.</p>
      <div className="bullet-row"><div className="bullet-dot"></div><span className="bullet-text">Spending limits by category</span></div>
      <div className="bullet-row"><div className="bullet-dot"></div><span className="bullet-text">Instant top-up in one tap</span></div>
      <div className="bullet-row"><div className="bullet-dot"></div><span className="bullet-text">Monthly reports, not confrontations</span></div>
    </div>
    <div className="rr">
      <div className="strip-visual">
        <div className="parent-card">
          <div className="parent-card-lbl">Parent Dashboard</div>
          <div className="parent-card-main">Hania spent <strong>Rs. 4,200</strong> this week.</div>
          <div className="parent-card-sub">↑ Rs. 800 from last week</div>
          <div className="parent-split">
            <div className="parent-tile parent-tile-food">
              <div className="parent-tile-lbl">Food</div>
              <div className="parent-tile-val">Rs. 1,840</div>
            </div>
            <div className="parent-tile parent-tile-shop">
              <div className="parent-tile-lbl">Shopping</div>
              <div className="parent-tile-val">Rs. 2,360</div>
            </div>
          </div>
        </div>
        <button className="parent-send">Send Hania Rs. 1,000 →</button>
        <p className="parent-send-note">Arrives in 3 seconds via secure transfer</p>
      </div>
    </div>
  </div>
</section>

{/* STATS */}
<section id="stats">
  <div className="stats-inner">
    <div className="r d1" style={{textAlign: 'center'}}>
      <div className="stat-num" style={{color: 'var(--red)'}}><span>{c1.toLocaleString()}</span>+</div>
      <div className="stat-bar"></div>
      <div className="stat-lbl">teens already on<br />the waitlist</div>
    </div>
    <div className="r d2" style={{textAlign: 'center'}}>
      <div className="stat-num" style={{color: 'var(--navy)'}}>Rs.<span>0</span></div>
      <div className="stat-bar" style={{background: 'var(--navy)'}}></div>
      <div className="stat-lbl">monthly fee<br />to get started</div>
    </div>
    <div className="r d3" style={{textAlign: 'center'}}>
      <div className="stat-num" style={{color: 'var(--red)'}}><span>{c3}</span>s</div>
      <div className="stat-bar"></div>
      <div className="stat-lbl">to set up<br />your first card</div>
    </div>
  </div>
</section>

{/* WAITLIST */}
<section id="waitlist">
  <div className="wl-bg1"></div>
  <div className="wl-bg2"></div>
  <div className="wl-inner">
    {/* Pingo — Waitlist size, ghost style */}
    <div className="wl-pingo" style={{ opacity: 0.9 }}>
      <img src="/mascot.png" alt="Pingo Mascot" style={{ width: '140px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(255,255,255,0.15))', borderRadius: '12px' }} />
    </div>

    <span className="wl-tag">Join Pingo's Herd</span>
    <h2 className="wl-h2">Be the first<br />penguin.</h2>
    <p className="wl-sub">One step. No email. Just your number. Pingo will text you when your card is ready.</p>

    <div id="wl-form-wrap" style={{ display: success ? "none" : "block" }}>
      <div className="wl-form">
        <input type="tel" className="wl-input" id="phone-inp" placeholder="+92 3XX XXXXXXX" maxLength={15}/>
        <button className="wl-btn" >Get Early Access</button>
      </div>
      <p className="wl-note">No spam. No email needed. We'll text you when you're in.</p>
      <p className="wl-proof">"Finally a card that gets me." — Beta tester, Karachi</p>
    </div>

    <div className={`wl-success ${success ? "show" : ""}`} id="wl-success">
      <h3>You're in, pioneer. 🏔️</h3>
      <p>Pingo will text you when your card is ready. You're early. That matters more than you know.</p>
    </div>

    <div id="confetti-wrap" style={{position: "absolute", inset: "0", overflow: "hidden", pointerEvents: "none"}}>{confetti.map(c => <div key={c.id} className="confetti-p" style={{left: c.left, top: c.top, width: c.width, height: c.height, background: c.background, borderRadius: c.borderRadius, animationDelay: c.animationDelay, animationDuration: c.animationDuration}}></div>)}</div>
  </div>
</section>

{/* FOOTER */}
<footer>
  <div className="footer-logo">
    <div className="footer-mark">YP</div>
    <span className="footer-name">YouthPay</span>
  </div>
  <p className="footer-note">© 2026 YouthPay Academy · Karachi, Pakistan</p>
  <div className="footer-links">
    <a href="#" className="footer-link">Privacy</a>
    <a href="#" className="footer-link">Terms</a>
    <a href="#" className="footer-link">Contact</a>
  </div>
</footer>


    </>
  );
}
