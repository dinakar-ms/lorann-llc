"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "lorann_popup_v3";
const SHOW_DELAY  = 12000;

/* ─── Particle canvas (left panel) ─────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      c.width  = c.offsetWidth  * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const W = () => c.offsetWidth, H = () => c.offsetHeight;
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      r: Math.random() * .8 + .2, phase: Math.random() * Math.PI * 2,
      sp: Math.random() * .022 + .006,
    }));
    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
      r: Math.random() * 1.8 + .8,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      stars.forEach(s => {
        s.phase += s.sp;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${(.25 + .55 * Math.sin(s.phase)) * .8})`; ctx.fill();
      });
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,.9)"; ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${.32 * (1 - d / 115)})`; ctx.lineWidth = .7; ctx.stroke();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ─── CSS orbiting globe ────────────────────────────────────────── */
function Globe() {
  return (
    <div className="relative mx-auto flex items-center justify-center"
      style={{ width: 120, height: 120 }}>
      {/* Core glow */}
      <div className="absolute rounded-full"
        style={{ width: 36, height: 36,
          background: "radial-gradient(circle,rgba(56,189,248,.4) 0%,transparent 70%)",
          animation: "lp-core 2.8s ease-in-out infinite" }} />
      {/* Rings */}
      {[
        { s: 68,  c: "rgba(56,189,248,.75)", d: "3.4s", rx: "70deg", rz: "0deg"   },
        { s: 90,  c: "rgba(139,92,246,.65)", d: "5.8s", rx: "65deg", rz: "58deg"  },
        { s: 112, c: "rgba(6,182,212,.5)",   d: "9s",   rx: "68deg", rz: "-35deg" },
      ].map(({ s, c, d, rx, rz }, i) => (
        <div key={i} className="absolute rounded-full border"
          style={{ width: s, height: s, borderColor: c, borderWidth: "1px",
            animation: `lp-ring-${i + 1} ${d} linear infinite`,
            transform: `rotateX(${rx}) rotateZ(${rz})` }} />
      ))}
      {/* Orbiting dots */}
      <div className="absolute h-2 w-2 rounded-full"
        style={{ background: "#38bdf8", boxShadow: "0 0 10px 3px rgba(56,189,248,.7)",
          animation: "lp-dot1 3.4s linear infinite", transformOrigin: "0 34px" }} />
      <div className="absolute h-1.5 w-1.5 rounded-full"
        style={{ background: "#c084fc", boxShadow: "0 0 8px 2px rgba(192,132,252,.7)",
          animation: "lp-dot2 5.8s linear infinite", transformOrigin: "0 45px" }} />
      {/* Center label */}
      <div className="relative z-10 text-center select-none">
        <div style={{
          fontFamily: "var(--font-space-grotesk)", fontSize: 17, fontWeight: 900, lineHeight: 1,
          background: "linear-gradient(135deg,#38bdf8,#818cf8,#c084fc)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>95M+</div>
        <div style={{ fontSize: 6, letterSpacing: ".18em", color: "rgba(148,163,184,.65)", marginTop: 2 }}>
          RECORDS
        </div>
      </div>
    </div>
  );
}

/* ─── Count-up ──────────────────────────────────────────────────── */
function useCountUp(to: number, ms = 1800, go = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0: number | null = null;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, to, ms]);
  return v;
}

/* ─── Segment data ──────────────────────────────────────────────── */
const SEGS = [
  { icon: "🏥", val: "NPI-Verified",  label: "Healthcare Professionals" },
  { icon: "💼", val: "98% Accuracy",  label: "Verified B2B Contacts"    },
  { icon: "💻", val: "40+ Lists",     label: "Technology User Data"     },
  { icon: "🎯", val: "Real-Time",     label: "Intent-Based Signals"     },
  { icon: "🏢", val: "500+ Verticals", label: "Industries Covered"      },
];

/* ══════════════════════════════════════════════════════════════════
   LEAD POPUP
══════════════════════════════════════════════════════════════════ */
export default function LeadPopup() {
  const [phase,      setPhase]      = useState<"hidden"|"entering"|"visible"|"closing"|"minimized"|"done">("hidden");
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err,        setErr]        = useState("");
  const [tidx,       setTidx]       = useState(0);
  const [tin,        setTin]        = useState(true);
  const [form,       setForm]       = useState({ name: "", email: "", company: "" });
  const countVal = useCountUp(95, 2200, phase === "visible");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setPhase("entering");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("visible")));
    }, SHOW_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "visible") return;
    const id = setInterval(() => {
      setTin(false);
      setTimeout(() => { setTidx(i => (i + 1) % SEGS.length); setTin(true); }, 360);
    }, 2800);
    return () => clearInterval(id);
  }, [phase]);

  const dismiss = () => {
    setPhase("closing");
    setTimeout(() => setPhase("minimized"), 480);
  };

  const dismissForever = () => {
    setPhase("closing");
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setPhase("done"), 480);
  };

  const reopen = () => {
    setPhase("entering");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("visible")));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setSubmitting(true);
    try {
      const r = await fetch("/api/popup-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error();
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, "1");
      setTimeout(dismissForever, 3500);
    } catch { setErr("Something went wrong — please try again."); }
    finally { setSubmitting(false); }
  };

  if (phase === "hidden" || phase === "done") return null;

  /* ── Minimized floating widget ─────────────────────────────────── */
  if (phase === "minimized") {
    return (
      <>
        <style>{`
          @keyframes lp-widget-in {
            from { transform:translateY(-50%) translateX(110%); opacity:0; }
            to   { transform:translateY(-50%) translateX(0);    opacity:1; }
          }
          @keyframes lp-widget-pulse {
            0%,100% { box-shadow:-4px 4px 20px rgba(29,69,217,.45),0 0 0 0 rgba(99,102,241,.0); }
            50%     { box-shadow:-4px 4px 28px rgba(29,69,217,.65),0 0 0 6px rgba(99,102,241,.18); }
          }
          .lp-widget-btn:hover { transform:translateY(-50%) translateX(-4px) !important; }
        `}</style>
        <button
          onClick={reopen}
          className="lp-widget-btn fixed right-0 z-[9998] flex flex-col items-center"
          aria-label="Open free data sample form"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            animation: "lp-widget-in .5s cubic-bezier(.34,1.56,.64,1) both, lp-widget-pulse 2.8s ease-in-out 1s infinite",
            background: "linear-gradient(160deg,#1D45D9 0%,#4f46e5 55%,#7c3aed 100%)",
            borderRadius: "12px 0 0 12px",
            padding: "22px 11px",
            gap: 10,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          <span style={{ fontSize: 17, lineHeight: 1 }}>⭐</span>
          <span style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}>
            Free Sample
          </span>
          <span style={{ fontSize: 13, opacity: .75 }}>↑</span>
        </button>
      </>
    );
  }

  const seg = SEGS[tidx];

  return (
    <>
      <style>{`
        /* Keyframes */
        @keyframes lp-ring-1  { to{transform:rotateX(70deg) rotateZ(360deg);} }
        @keyframes lp-ring-2  { to{transform:rotateX(65deg) rotateZ(calc(58deg + 360deg));} }
        @keyframes lp-ring-3  { to{transform:rotateX(68deg) rotateZ(calc(-35deg + 360deg));} }
        @keyframes lp-dot1    { to{transform:rotate(360deg) translateX(34px);} }
        @keyframes lp-dot2    { to{transform:rotate(-360deg) translateX(45px);} }
        @keyframes lp-core    { 0%,100%{opacity:.7;transform:scale(1);}  50%{opacity:1;transform:scale(1.2);} }
        @keyframes lp-float   { 0%,100%{transform:translateY(0);}        50%{transform:translateY(-9px);} }
        @keyframes lp-scan    { 0%{top:-1%;opacity:.8;} 100%{top:101%;opacity:0;} }
        @keyframes lp-ping    { 0%,100%{opacity:.6;transform:scale(1);}  50%{opacity:1;transform:scale(1.4);} }
        @keyframes lp-spin    { to{transform:rotate(360deg);} }
        @keyframes lp-fade-up { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
        @keyframes lp-badge   { from{opacity:0;transform:scale(.6) translateY(6px);} to{opacity:1;transform:scale(1) translateY(0);} }
        @keyframes lp-enter   {
          from { opacity:0; transform:scale(.86) perspective(800px) rotateX(5deg) translateY(20px); }
          to   { opacity:1; transform:scale(1)   perspective(800px) rotateX(0deg) translateY(0);    }
        }
        @keyframes lp-exit    { to{opacity:0;transform:scale(.9) translateY(18px);} }
        @keyframes lp-shimmer {
          0%  { background-position: -200% center; }
          100%{ background-position:  200% center; }
        }
        @keyframes lp-border  {
          0%  { background-position: 0% 50%;   }
          100%{ background-position: 400% 50%; }
        }
        @keyframes lp-glow-text {
          0%,100% { filter: drop-shadow(0 0 8px rgba(56,189,248,.5));  }
          50%     { filter: drop-shadow(0 0 24px rgba(56,189,248,.9)); }
        }
        @keyframes lp-counter-pop {
          from { opacity:0; transform:scale(.65); }
          to   { opacity:1; transform:scale(1);   }
        }
        @keyframes lp-right-glow {
          0%,100% { opacity:.06; }
          50%     { opacity:.14; }
        }

        /* Modal wrappers */
        .lp-enter { animation: lp-enter .6s cubic-bezier(.34,1.56,.64,1) both; }
        .lp-exit  { animation: lp-exit  .45s ease both; }

        /* Animated gradient border */
        .lp-border-wrap { position:relative; border-radius:24px; }
        .lp-border-wrap::before {
          content:''; position:absolute; inset:-2.5px; border-radius:26px; z-index:-1;
          background: linear-gradient(90deg,
            #1D45D9,#00A7EF,#1D45D9,#00A7EF,#1D45D9);
          background-size:300% 100%;
          animation: lp-border 4s linear infinite;
        }

        /* CTA button */
        .lp-cta {
          position:relative; overflow:hidden;
          background: linear-gradient(135deg, #1D45D9 0%, #4f46e5 50%, #7c3aed 100%);
          border-radius:12px; padding:12px; font-size:14px;
          font-weight:700; color:#fff; width:100%; cursor:pointer;
          border:none; transition:transform .25s ease, box-shadow .25s ease;
          box-shadow: 0 6px 28px rgba(79,70,229,.55), 0 0 0 1px rgba(129,140,248,.2);
        }
        .lp-cta::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(110deg,transparent 38%,rgba(255,255,255,.28) 50%,transparent 62%);
          background-size:220% 100%;
          animation:lp-shimmer 2.4s ease-in-out infinite;
        }
        .lp-cta:hover:not(:disabled) {
          transform:translateY(-3px);
          box-shadow:0 14px 44px rgba(79,70,229,.7), 0 0 0 1px rgba(129,140,248,.3);
        }
        .lp-cta:disabled { opacity:.65; }

        /* Input */
        .lp-input {
          width:100%; padding:9px 12px;
          background:#fff; border:1.5px solid #e2e8f0; border-radius:10px;
          font-size:13px; color:#1e293b; transition:border-color .2s,box-shadow .2s;
        }
        .lp-input::placeholder { color:#94a3b8; }
        .lp-input:focus {
          outline:none; border-color:#4f46e5;
          box-shadow:0 0 0 3px rgba(79,70,229,.12), 0 0 16px rgba(79,70,229,.08);
        }

        /* Ticker */
        .lp-tick { transition:opacity .32s ease, transform .32s ease; }
        .lp-tick.in  { opacity:1; transform:translateY(0);    }
        .lp-tick.out { opacity:0; transform:translateY(10px); }

        /* ──────────── CLOSE BUTTON ──────────── */
        .lp-x {
          position:absolute; top:-18px; right:-18px; z-index:60;
          width:46px; height:46px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,#1e293b,#0f172a);
          border:2.5px solid rgba(56,189,248,.6);
          color:#38bdf8; font-size:20px; font-weight:300; line-height:1;
          cursor:pointer; user-select:none;
          box-shadow:0 0 0 5px rgba(56,189,248,.08),
                     0 0 22px rgba(56,189,248,.35),
                     0 5px 18px rgba(0,0,0,.7);
          transition:transform .26s cubic-bezier(.34,1.56,.64,1),
                     box-shadow .26s ease, border-color .26s ease,
                     background .26s ease, color .26s ease;
        }
        .lp-x:hover {
          background:linear-gradient(135deg,#0ea5e9,#6366f1);
          border-color:#7dd3fc; color:#fff;
          transform:rotate(90deg) scale(1.12);
          box-shadow:0 0 0 6px rgba(56,189,248,.15),
                     0 0 36px rgba(56,189,248,.6),
                     0 5px 22px rgba(0,0,0,.6);
        }
      `}</style>

      {/* ── Backdrop ───────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
        style={{ background:"rgba(2,6,23,.45)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)" }}
        onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
        role="dialog" aria-modal="true"
      >
        {/* ── Glow border wrapper ─────────────────────────────── */}
        <div className={`lp-border-wrap relative w-full ${phase === "closing" ? "lp-exit" : "lp-enter"}`}
          style={{ maxWidth: 820 }}>

          {/* ════ CLOSE BUTTON ════ */}
          <button className="lp-x" onClick={dismiss} aria-label="Close popup">✕</button>

          {/* ── Inner card ──────────────────────────────────────── */}
          <div className="relative overflow-hidden rounded-[22px] shadow-2xl"
            style={{ maxHeight: "92vh", overflowY: "auto" }}>

            <div className="flex flex-col md:flex-row">

              {/* ══════════════════════════════════════
                  LEFT — Dark visualization panel
              ══════════════════════════════════════ */}
              <div className="relative flex flex-col overflow-hidden md:w-[42%]"
                style={{ background:"linear-gradient(160deg,#030b1a 0%,#060d21 60%,#050a1c 100%)",
                  padding:"20px 18px", borderRight:"1px solid rgba(255,255,255,.07)" }}>

                <ParticleCanvas />

                {/* Horizontal scan line */}
                <div className="pointer-events-none absolute left-0 right-0 h-px opacity-70"
                  style={{ background:"linear-gradient(90deg,transparent,rgba(56,189,248,.6),transparent)",
                    animation:"lp-scan 3.8s linear infinite" }} />

                {/* LIVE badge */}
                <div className="relative z-10 mb-2 flex items-center gap-2"
                  style={{ animation:"lp-fade-up .45s ease .08s both" }}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute h-full w-full rounded-full bg-cyan-400"
                      style={{ animation:"lp-ping 1.4s ease-in-out infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-400"
                      style={{ boxShadow:"0 0 8px rgba(56,189,248,.9)" }} />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[.28em] text-cyan-400">
                    Live Data Intelligence
                  </span>
                </div>

                {/* Globe — floats */}
                <div className="relative z-10 mb-1"
                  style={{ animation:"lp-float 4.2s ease-in-out infinite" }}>
                  <Globe />
                </div>

                {/* Big animated counter */}
                <div className="relative z-10 mb-1 text-center select-none"
                  style={{ animation:"lp-counter-pop .6s ease .5s both" }}>
                  <div style={{
                    fontFamily:"var(--font-space-grotesk)", fontSize:42, fontWeight:900, lineHeight:1,
                    background:"linear-gradient(120deg,#38bdf8 0%,#818cf8 48%,#c084fc 100%)",
                    backgroundSize:"180% auto",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                    animation:"lp-glow-text 2.5s ease-in-out infinite",
                  }}>
                    {countVal}M+
                  </div>
                  <div className="text-xs font-bold text-white/70">Verified B2B Contacts</div>
                  <div className="mt-0.5 text-[9px] text-slate-600">Scrubbed · Compliant · Ready</div>
                </div>

                {/* Segment ticker card */}
                <div className="relative z-10 mt-3 rounded-xl p-2.5"
                  style={{ background:"rgba(255,255,255,.04)",
                    border:"1px solid rgba(56,189,248,.13)",
                    backdropFilter:"blur(6px)",
                    animation:"lp-fade-up .45s ease .38s both" }}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[.22em] text-cyan-400">
                      Active Segment
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-px text-[8px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                        style={{ animation:"lp-ping 1.5s ease-in-out infinite" }} />
                      LIVE
                    </span>
                  </div>
                  <div className={`lp-tick ${tin ? "in" : "out"}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{seg.icon}</span>
                      <span style={{
                        fontFamily:"var(--font-space-grotesk)", fontSize:20, fontWeight:900, color:"#f1f5f9",
                      }}>{seg.val}</span>
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-500">{seg.label}</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="relative z-10 mt-2 grid grid-cols-2 gap-1.5"
                  style={{ animation:"lp-fade-up .45s ease .46s both" }}>
                  {[["98%","Accuracy Rate"],["500+","Industries"],["Weekly","Data Refresh"],["DNC ✓","Suppressed"]].map(([v, l]) => (
                    <div key={l} className="rounded-lg px-2 py-1.5 text-center"
                      style={{ background:"rgba(56,189,248,.06)", border:"1px solid rgba(56,189,248,.13)" }}>
                      <div className="text-[12px] font-extrabold text-cyan-300">{v}</div>
                      <div className="text-[8px] text-slate-600">{l}</div>
                    </div>
                  ))}
                </div>

                {/* Compliance badges */}
                <div className="relative z-10 mt-2 flex flex-wrap gap-1">
                  {["HIPAA","CCPA","CAN-SPAM","FCRA","DNC"].map((b, i) => (
                    <span key={b} className="rounded-full px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wide"
                      style={{ border:"1px solid rgba(139,92,246,.35)", color:"#a78bfa",
                        background:"rgba(139,92,246,.08)",
                        animation:`lp-badge .38s ease ${.62+i*.055}s both` }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* ══════════════════════════════════════
                  RIGHT — White form panel
              ══════════════════════════════════════ */}
              <div className="relative flex flex-col justify-center overflow-hidden bg-white md:w-[58%]"
                style={{ padding:"24px 26px" }}>

                {/* Decorative corner orbs — subtle */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                  style={{ background:"radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)",
                    animation:"lp-right-glow 3s ease-in-out infinite" }} />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full"
                  style={{ background:"radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)",
                    animation:"lp-right-glow 3.5s ease-in-out infinite .5s" }} />

                {/* Decorative top gradient bar */}
                <div className="absolute left-0 right-0 top-0 h-[3px]"
                  style={{ background:"linear-gradient(90deg,#1D45D9,#00A7EF,#8b5cf6,#1D45D9)",
                    backgroundSize:"300% 100%", animation:"lp-border 5s linear infinite" }} />

                {submitted ? (
                  <div className="relative z-10 flex flex-col items-center py-8 text-center"
                    style={{ animation:"lp-enter .5s ease" }}>
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                      style={{ background:"linear-gradient(135deg,#1D45D9,#00A7EF)",
                        boxShadow:"0 0 40px rgba(29,69,217,.35)" }}>
                      ✓
                    </div>
                    <h3 style={{ fontFamily:"var(--font-space-grotesk)", fontSize:24, fontWeight:800, color:"#1e293b" }}>
                      You&apos;re All Set!
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Your free sample request is confirmed.<br />
                      <strong className="text-slate-700">Expect it within 1 business day.</strong>
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10">

                    {/* Tagline */}
                    <div className="mb-2 text-center"
                      style={{ animation:"lp-fade-up .42s ease .12s both" }}>
                      <span style={{ fontSize:12, fontWeight:700, color:"#7c3aed", letterSpacing:".01em" }}>
                        ⭐ Better Data. Better Decisions. Better Growth.
                      </span>
                    </div>

                    {/* Headline */}
                    <div style={{ animation:"lp-fade-up .42s ease .18s both", marginBottom:10 }}>
                      <h2 style={{ fontFamily:"var(--font-space-grotesk)", fontSize:"clamp(20px,2.4vw,26px)",
                        fontWeight:900, color:"#0f172a", lineHeight:1.25 }}>
                        Get a High-Quality Data Sample That{" "}
                        <span style={{
                          background:"linear-gradient(120deg,#1D45D9 0%,#00A7EF 100%)",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                        }}>
                          Drives Real Results.
                        </span>
                      </h2>
                    </div>

                    <p className="mb-3 text-sm leading-relaxed text-slate-500"
                      style={{ animation:"lp-fade-up .42s ease .25s both" }}>
                      Preview accurate and compliant data from{" "}
                      <strong style={{ color:"#1D45D9" }}>Lorann</strong>
                      {" "}and experience the quality that helps businesses connect,{" "}
                      <strong className="text-slate-700">engage, and grow.</strong>
                    </p>

                    {/* Trust badges */}
                    <div className="mb-3 flex flex-wrap gap-2"
                      style={{ animation:"lp-fade-up .42s ease .3s both" }}>
                      {[
                        { icon:"🔒", label:"Data Privacy First" },
                        { icon:"✅", label:"100% Compliant"     },
                      ].map(({ icon, label }) => (
                        <div key={label}
                          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold text-slate-700"
                          style={{ background:"#f8faff", border:"1.5px solid #e2e8f0" }}>
                          <span>{icon}</span>{label}
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-2">
                      {([
                        { k:"name",    t:"text",  ph:"Full Name *",      req:true  },
                        { k:"email",   t:"email", ph:"Business Email *", req:true  },
                        { k:"company", t:"text",  ph:"Company Name",     req:false },
                      ] as const).map(({ k, t, ph, req }, i) => (
                        <div key={k} style={{ animation:`lp-fade-up .42s ease ${.36+i*.07}s both` }}>
                          <input type={t} placeholder={ph} required={req}
                            className="lp-input"
                            autoComplete={k === "email" ? "email" : k === "name" ? "name" : "organization"}
                            value={form[k]}
                            onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                          />
                        </div>
                      ))}

                      {err && <p className="text-xs font-medium text-red-500">{err}</p>}

                      <div style={{ animation:"lp-fade-up .42s ease .58s both" }}>
                        <button type="submit" disabled={submitting} className="lp-cta">
                          {submitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                style={{ animation:"lp-spin .7s linear infinite" }} />
                              Sending...
                            </span>
                          ) : (
                            <div>
                              <div>→ Request My Data Sample →</div>
                              <div style={{ fontSize:11, fontWeight:500, opacity:.82, marginTop:3 }}>
                                High-Quality. Accurate. Actionable.
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Bottom trust indicators */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center"
                      style={{ animation:"lp-fade-up .42s ease .64s both" }}>
                      {[
                        { icon:"⚡", title:"Rapid Delivery",           sub:"Within 1 Business Day"     },
                        { icon:"✅", title:"100% Permission-Based",    sub:"Opt-In Data"               },
                        { icon:"👥", title:"Trusted by 5,000+",        sub:"Businesses"                },
                      ].map(({ icon, title, sub }) => (
                        <div key={title} className="flex flex-col items-center gap-0.5">
                          <span className="text-base">{icon}</span>
                          <div className="text-[10px] font-bold text-slate-700 leading-tight">{title}</div>
                          <div className="text-[9px] text-slate-400">{sub}</div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-center text-[9px] leading-relaxed text-slate-400"
                      style={{ animation:"lp-fade-up .42s ease .72s both" }}>
                      By submitting you agree to Lorann&apos;s{" "}
                      <a href="/privacy-policy" className="underline underline-offset-2 hover:text-indigo-500 transition-colors">
                        Privacy Policy
                      </a>
                      . We never sell or share your personal data.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
