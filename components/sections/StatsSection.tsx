"use client";

import { useEffect, useRef } from "react";
import { Users, CheckCircle, Briefcase, TrendingUp } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

const STATS = [
  { icon: Users, count: 95, suffix: "M+", label: "Verified B2B & B2C Contacts", offset: 40 },
  { icon: CheckCircle, count: 98, suffix: "%", label: "Data Accuracy Rate", offset: 10 },
  { icon: Briefcase, count: 500, suffix: "+", label: "Industries & Verticals", offset: 120 },
  { icon: TrendingUp, count: 10, suffix: "K+", label: "Campaigns Powered", offset: 80 },
];

export default function StatsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("in-view");

          el.querySelectorAll<HTMLElement>("[data-count]").forEach((e) => {
            if (e.dataset.done) return;
            e.dataset.done = "1";
            const target = parseInt(e.dataset.count || "0", 10);
            const suffix = e.dataset.suffix || "";
            const duration = 2200;
            const start = performance.now();
            const frame = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              e.textContent = Math.floor(target * eased) + suffix;
              if (p < 1) requestAnimationFrame(frame);
              else e.textContent = target + suffix;
            };
            requestAnimationFrame(frame);
          });

          io.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${mx}%`);
    e.currentTarget.style.setProperty("--my", `${my}%`);
  };

  return (
    <section className="py-24 lg:py-32 radial-stats">
      <div className="container-custom">
        <SectionHeader
          kicker="The Numbers"
          title={<>Built for <span className="text-gradient">real performance</span></>}
          description="Every metric reflects data quality, process rigour, and a commitment to client outcomes."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stats-grid"
        >
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="statRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1D45D9" />
                <stop offset="100%" stopColor="#22BFFF" />
              </linearGradient>
            </defs>
          </svg>

          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              onMouseMove={handleMouseMove}
              className="stat-cell relative bg-white border border-slate-150 rounded-[22px] px-7 pt-11 pb-9 text-center overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
              style={{
                // opacity: 0,
                transform: "translateY(40px) rotateX(-15deg)",
                transformStyle: "preserve-3d",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Top accent */}
              <div
                className="stat-top-accent absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-500 origin-left scale-x-0 transition-transform duration-700"
                style={{ transitionDelay: "0.5s" }}
              />

              {/* Hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(29, 69, 217, 0.08), transparent 40%)",
                }}
              />

              {/* Circular ring */}
              <div className="relative w-[140px] h-[140px] mx-auto mb-5">
                <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="#D6E2F5" strokeWidth="6" />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="url(#statRingGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="377"
                    className="stat-ring-fill"
                    style={{
                      strokeDashoffset: 377,
                      transition: "stroke-dashoffset 2s var(--ease) 0.5s",
                      // @ts-expect-error CSS var
                      "--offset": stat.offset,
                    }}
                  />
                </svg>
                <stat.icon
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-blue-600"
                  strokeWidth={2}
                />
              </div>

              <div
                className="font-display font-bold text-[clamp(2.2rem,4vw,3rem)] leading-none tracking-[-0.025em] mb-2"
                style={{
                  background: "linear-gradient(135deg, #1736B3 0%, #00A7EF 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                data-count={stat.count}
                data-suffix={stat.suffix}
              >
                0
              </div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>

              {/* Flicker bars */}
              <div className="absolute bottom-4 left-4 right-4 h-[3px] flex gap-0.5 opacity-60">
                {Array.from({ length: 10 }).map((_, j) => (
                  <span
                    key={j}
                    className="flex-1 rounded-sm animate-bar-flicker"
                    style={{
                      background:
                        j % 5 === 0
                          ? "#1D45D9"
                          : j % 3 === 0
                            ? "#22BFFF"
                            : j % 2
                              ? "#4F7DF5"
                              : "#C1D1EC",
                      animationDelay: `${(j % 3) * 0.5}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <style jsx global>{`
          .stats-grid.in-view .stat-cell {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
          }
          .stats-grid.in-view .stat-cell:nth-child(1) { transition-delay: 0.1s; }
          .stats-grid.in-view .stat-cell:nth-child(2) { transition-delay: 0.2s; }
          .stats-grid.in-view .stat-cell:nth-child(3) { transition-delay: 0.3s; }
          .stats-grid.in-view .stat-cell:nth-child(4) { transition-delay: 0.4s; }
          .stats-grid.in-view .stat-top-accent { transform: scaleX(1); }
          .stats-grid.in-view .stat-ring-fill {
            stroke-dashoffset: var(--offset, 38);
          }
        `}</style>
      </div>
    </section>
  );
}
