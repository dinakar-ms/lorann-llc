"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, Database, GitMerge, TrendingUp } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const STEPS = [
  { icon: Crosshair, title: "Define", desc: "We align on your target audience, campaign goals, and performance metrics — establishing clear benchmarks." },
  { icon: Database, title: "Build", desc: "We construct and refine audience segments using high-quality sources and Signal eXchange™ enrichment." },
  { icon: GitMerge, title: "Activate", desc: "Audiences deploy across CRM, email, digital platforms, and lead programs — ensuring full marketing coverage." },
  { icon: TrendingUp, title: "Optimise", desc: "Continuous monitoring, data refresh, and optimisation cycles ensure your audiences improve over time." },
];

export default function HowItWorksSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const gridVisible = wh - rect.top;
      const p = Math.max(0, Math.min(1, gridVisible / (wh * 0.8)));
      setProgress(p);
      const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      setHighlight(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="how" className="py-24 lg:py-32" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0F5FF 100%)" }}>
      <div className="container-custom">
        <SectionHeader
          kicker="The Process"
          title={<>A simple, <span className="text-gradient">four-step</span> path<br />from data to results</>}
          description="Structured delivery that gets your audiences live, performing, and improving — fast."
        />

        <div className="relative">
          {/* Timeline */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[3px] bg-slate-200 rounded-full z-0 overflow-visible">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_20px_rgba(29,69,217,0.5)]"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #2F5DEC, #00A7EF)",
              }}
            />
            {progress > 0.05 && (
              <div
                className="absolute top-[-3px] w-3 h-[9px] bg-white border-2 border-cyan-500 rounded-full shadow-[0_0_12px_#22BFFF] transition-all duration-300"
                style={{ left: `${progress * 100}%`, transform: "translateX(-50%)" }}
              />
            )}
          </div>

          {/* Data packets */}
          <div
            className="hidden lg:block absolute top-[56px] w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22BFFF] z-[2]"
            style={{ animation: "packet-travel 3s linear infinite" }}
          />
          <div
            className="hidden lg:block absolute top-[56px] w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#2F5DEC] z-[2]"
            style={{ animation: "packet-travel 3s linear infinite", animationDelay: "1s" }}
          />
          <div
            className="hidden lg:block absolute top-[56px] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#6FD3FF] z-[2]"
            style={{ animation: "packet-travel 3s linear infinite", animationDelay: "2s" }}
          />
          <style jsx>{`
            @keyframes packet-travel {
              0% { left: 10%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 90%; opacity: 0; }
            }
          `}</style>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-[1]">
            {STEPS.map((step, i) => {
              const active = progress > i / STEPS.length;
              const isHighlight = active && i === highlight;
              return (
                <div
                  key={step.title}
                  className="text-center relative px-2 transition-all duration-500"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(40px)",
                  }}
                >
                  <div
                    className={`w-[120px] h-[120px] mx-auto mb-7 border-2 rounded-full grid place-items-center relative shadow-sm transition-all duration-500 ${
                      isHighlight
                        ? "border-blue-500 scale-[1.08] shadow-xl"
                        : "border-blue-100 bg-white"
                    }`}
                    style={
                      isHighlight
                        ? { background: "linear-gradient(135deg, #E4EDFF, #FFFFFF)" }
                        : { background: "#fff" }
                    }
                  >
                    <div
                      className={`absolute -inset-1.5 border border-dashed border-blue-300 rounded-full transition-opacity duration-400 ${
                        isHighlight ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ animation: "spin 20s linear infinite" }}
                    />
                    <div
                      className={`absolute -inset-3.5 border border-blue-200 rounded-full transition-opacity duration-400 ${
                        isHighlight ? "opacity-50" : "opacity-0"
                      }`}
                      style={{ animation: "spin 30s linear infinite reverse" }}
                    />
                    <step.icon
                      className={`w-[52px] h-[52px] transition-all ${
                        isHighlight ? "text-blue-700 scale-110" : "text-blue-600"
                      }`}
                      strokeWidth={1.8}
                    />
                    <span className="absolute -top-2.5 -right-2.5 w-[34px] h-[34px] rounded-full grid place-items-center font-mono text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_8px_18px_-4px_rgba(29,69,217,0.5)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-display font-semibold text-xl mb-2.5 tracking-tight text-slate-900">
                    {step.title}
                  </h4>
                  <p className="text-slate-600 text-[14.5px] leading-relaxed max-w-[260px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
