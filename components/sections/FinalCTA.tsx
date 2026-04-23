"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "absolute w-1 h-1 rounded-full";
      const blue = Math.random() > 0.5;
      p.style.background = blue ? "#7FA2FB" : "#22BFFF";
      p.style.boxShadow = blue ? "0 0 10px #7FA2FB" : "0 0 10px #22BFFF";
      p.style.left = Math.random() * 100 + "%";
      p.style.animation = `particle-rise ${8 + Math.random() * 6}s linear ${Math.random() * 10}s infinite`;
      p.style.opacity = String(0.3 + Math.random() * 0.5);
      container.appendChild(p);
    }
  }, []);

  return (
    <section id="contact-cta" className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <div className="final-bg rounded-[32px] px-8 sm:px-12 lg:px-20 py-20 sm:py-24 lg:py-32 text-center relative overflow-hidden text-white shadow-[0_50px_120px_-25px_rgba(29,69,217,0.5)] reveal">
          <div className="absolute inset-0 grid-drift-bg" />
          <div
            ref={particlesRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          />
          {/* Orbits */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/8 rounded-full pointer-events-none"
            style={{ animation: "spin 40s linear infinite" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_#22BFFF]" />
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/8 rounded-full pointer-events-none"
            style={{ animation: "spin 60s linear infinite reverse" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_#22BFFF]" />
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/8 rounded-full pointer-events-none"
            style={{ animation: "spin 80s linear infinite" }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_#22BFFF]" />
          </div>

          <div className="relative z-[2]">
            <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.15em] text-cyan-300 px-3.5 py-1.5 bg-cyan-400/15 border border-cyan-400/30 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
              Let&apos;s Build Together
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] tracking-[-0.025em] mb-5 max-w-[720px] mx-auto">
              Build the right audience
              <br />
              for your <span className="text-gradient-cyan">business.</span>
            </h2>
            <p className="text-[17px] opacity-85 max-w-[560px] mx-auto mb-9 leading-relaxed">
              Tell us your goals — we&apos;ll develop a data strategy aligned to
              your targeting, activation, and performance needs.
            </p>
            <div className="flex justify-center gap-3 flex-wrap mb-8">
              <Link
                href="/contact"
                className="group/btn relative inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-semibold text-[14.5px] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(111,211,255,0.5)] transition-all overflow-hidden"
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(135deg, #6FD3FF, #A9C2FD)" }}
                />
                <span className="relative">Get Started</span>
                <ArrowRight className="w-4 h-4 relative" />
              </Link>
              <Link
                href="mailto:info@lorannllc.com?subject=Talk%20to%20an%20Expert"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white font-semibold text-[14.5px] rounded-xl backdrop-blur-md hover:bg-white/18 hover:-translate-y-0.5 transition-all"
              >
                Talk to an Expert
              </Link>
            </div>
            <div className="flex justify-center gap-6 flex-wrap text-[13.5px] opacity-80">
              {["No long-term contracts", "GDPR & CCPA compliant", "Free consultation"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
