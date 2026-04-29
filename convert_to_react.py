import re

with open('extracted.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract styles
style_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
styles = style_match.group(1) if style_match else ""

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write('@import "tailwindcss";\n\n')
    f.write(styles.replace('â€”', '-').replace('Â·', '·'))

# Extract body
body_match = re.search(r'<body>(.*?)<script>', html, re.DOTALL)
body = body_match.group(1) if body_match else ""

# Replace class with className
body = body.replace('class="', 'className="')

# Replace inline styles
def repl_style(m):
    style_str = m.group(1)
    props = style_str.split(';')
    react_style = []
    for p in props:
        if ':' not in p: continue
        k, v = p.split(':', 1)
        k = k.strip()
        v = v.strip().replace("'", "\\'")
        # camelCase the key
        k_parts = k.split('-')
        k_camel = k_parts[0] + ''.join(x.title() for x in k_parts[1:])
        react_style.append(f"{k_camel}: '{v}'")
    return "style={{" + ", ".join(react_style) + "}}"

body = re.sub(r'style="(.*?)"', repl_style, body)

# Replace self-closing tags without trailing slash
tags = ['input', 'img', 'br', 'hr', 'path', 'circle', 'ellipse', 'rect']
for tag in tags:
    body = re.sub(r'<(' + tag + r'\b[^>]*(?<!/))>', r'<\1 />', body)

# Clean up unicode decoding artifacts
body = body.replace('â€”', '—').replace('Â·', '·').replace('ðŸŒ™', '🌙').replace('ðŸ‘´', '👴').replace('â†’', '→').replace('â˜•', '☕').replace('ðŸ •', '🍕').replace('ðŸ‘©', '👩').replace('ðŸ  ', '🏠').replace('ðŸ’³', '💳').replace('ðŸŽ¯', '🎯').replace('ðŸ‘¤', '👤').replace('ðŸ †', '🏆').replace('ðŸ ”ï¸ ', '🏔️').replace('âˆ’', '−')

# Remove onclick handlers to reimplement them in react
body = re.sub(r'onclick="[^"]+"', '', body)

# Fix common svg and dom properties for react
svg_props = {
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-width': 'strokeWidth',
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'text-align': 'textAlign',
    'for': 'htmlFor',
    'maxlength': 'maxLength',
}

for k, v in svg_props.items():
    body = body.replace(f'{k}="', f'{v}="')

body = body.replace('className="nav" id="nav"', 'className={`nav ${navSolid ? "solid" : ""}`} id="nav"')
body = body.replace('<div className="jar-fill" id="jar-fill"></div>', '<div className="jar-fill" id="jar-fill" style={{ height: jarFilled ? "65%" : "0" }}></div>')
body = body.replace('<button className="nav-cta">', '<button className="nav-cta" onClick={() => goto("waitlist")}>')
body = body.replace('<button className="btn-red">', '<button className="btn-red" onClick={() => goto("waitlist")}>')
body = body.replace('<button className="btn-ghost">', '<button className="btn-ghost" onClick={() => goto("product")}>')
body = body.replace('<button className="wl-btn">', '<button className="wl-btn" onClick={handleJoin}>')
body = body.replace('<div id="wl-form-wrap">', '<div id="wl-form-wrap" style={{ display: success ? "none" : "block" }}>')
body = body.replace('<div className="wl-success" id="wl-success">', '<div className={`wl-success ${success ? "show" : ""}`} id="wl-success">')
body = body.replace("<div id=\"confetti-wrap\" style={{position: 'absolute', inset: '0', overflow: 'hidden', pointerEvents: 'none'}}></div>", 
                 '<div id="confetti-wrap" style={{position: "absolute", inset: "0", overflow: "hidden", pointerEvents: "none"}}>{confetti.map(c => <div key={c.id} className="confetti-p" style={{left: c.left, top: c.top, width: c.width, height: c.height, background: c.background, borderRadius: c.borderRadius, animationDelay: c.animationDelay, animationDuration: c.animationDuration}}></div>)}</div>')


react_comp = '''"use client";
import React, { useEffect, useState } from 'react';

export default function YouthPaySinglePage() {
  const [navSolid, setNavSolid] = useState(false);
  const [jarFilled, setJarFilled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const handleScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.r, .rl, .rr').forEach(el => obs.observe(el));

    const jarObs = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        setJarFilled(true);
        jarObs.disconnect();
      }
    }, { threshold: 0.5 });
    const jf = document.getElementById('jar-fill');
    if(jf) jarObs.observe(jf.closest('section'));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      obs.disconnect();
      jarObs.disconnect();
    };
  }, []);

  const goto = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoin = () => {
    const inp = document.getElementById('phone-inp');
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
      ''' + body + '''
    </>
  );
}
'''

# Small hack for JSX comments
react_comp = react_comp.replace("<!--", "{/*").replace("-->", "*/}")

with open('src/components/YouthPaySinglePage.tsx', 'w', encoding='utf-8') as f:
    f.write(react_comp)
