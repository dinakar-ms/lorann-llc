import { ArrowRight, Play } from "lucide-react";
import Button from "../ui/Button";
import HeroGlobe from "../HeroGlobe";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 lg:min-h-screen radial-hero dot-grid" id="top">
      {/* Floating orbs */}
      <div
        className="absolute top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px] animate-orb-float-1"
        style={{ background: "rgba(79, 125, 245, 0.5)" }}
      />
      <div
        className="absolute bottom-[5%] -right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[80px] animate-orb-float-2"
        style={{ background: "rgba(34, 191, 255, 0.4)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none blur-[80px] animate-orb-float-3"
        style={{ background: "rgba(111, 211, 255, 0.3)" }}
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center relative z-10">
          {/* Left content */}
          <div className="max-w-[620px] relative">
            <div
              className="inline-flex items-center gap-2.5 py-1.5 pl-1.5 pr-4 bg-white rounded-full border border-slate-200 shadow-sm text-[13px] text-slate-700 mb-7 "
              style={{
                animation: "fade-slide 0.8s 0.1s var(--ease) forwards",
              }}
            >
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-pulse-dot" />
                Live
              </span>
              95M+ verified contacts · real-time intent signals
            </div>

            <h1 className="font-display font-bold text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[1.02] tracking-[-0.035em] text-slate-900 mb-6">
              <span className="line-wrap">
                <span style={{ animationDelay: "0.2s" }}>List smarter.</span>
              </span>
              <span className="line-wrap">
                <span style={{ animationDelay: "0.35s" }}>
                  Target <span className="text-gradient">sharper.</span>
                </span>
              </span>
              <span className="line-wrap">
                <span style={{ animationDelay: "0.5s" }}>
                  Grow <span className="text-gradient">faster.</span>
                </span>
              </span>
            </h1>

            <p
              className="text-[clamp(1rem,1.3vw,1.15rem)] text-slate-600 max-w-[520px] mb-9 leading-relaxed"
              style={{
                animation: "fade-slide 0.9s 1.3s var(--ease) forwards",
              }}
            >
              Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets — engineered to drive measurable marketing outcomes.
            </p>

            <div
              className="flex gap-3 flex-wrap"
              style={{
                animation: "fade-slide 0.9s 1.5s var(--ease) forwards",
              }}
            >
              <Button href="/contact" variant="primary" showArrow>
                Get Started Free
              </Button>
              <Button
                href="/how-it-works"
                variant="outline"
                icon={<Play className="w-4 h-4" />}
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right: Globe */}
          <div className="relative aspect-square max-w-[680px] mx-auto w-full">
            <div className="relative w-full h-full grid place-items-center">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full blur-[35px] animate-pulse-glow"
                style={{
                  background:
                    "radial-gradient(circle, rgba(29, 69, 217, 0.4) 0%, rgba(34, 191, 255, 0.25) 30%, transparent 65%)",
                }}
              />

              {/* CSS pulse rings */}
              <div className="pulse-ring" />
              <div className="pulse-ring" />
              <div className="pulse-ring" />
              <div className="pulse-ring" />

              <HeroGlobe />

              {/* Rotating text rings */}
              <div
                className="absolute inset-[8%] z-[3] pointer-events-none text-ring-svg"
                style={{ animation: "spin 40s linear infinite" }}
              >
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  <defs>
                    <path
                      id="ring-path-1"
                      d="M 250, 250 m -220, 0 a 220,220 0 1,1 440,0 a 220,220 0 1,1 -440,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#ring-path-1">
                      LORANN · DATA INTELLIGENCE · SIGNAL eXCHANGE™ · AUDIENCE
                      TARGETING · 95M+ CONTACTS ·{" "}
                    </textPath>
                  </text>
                </svg>
              </div>
              <div
                className="absolute inset-[2%] z-[3] pointer-events-none text-ring-svg reverse"
                style={{ animation: "spin 50s linear infinite reverse" }}
              >
                <svg viewBox="0 0 500 500" className="w-full h-full">
                  <defs>
                    <path
                      id="ring-path-2"
                      d="M 250, 250 m -240, 0 a 240,240 0 1,1 480,0 a 240,240 0 1,1 -480,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#ring-path-2">
                      LIVE · REAL-TIME · 98% ACCURACY · 500+ INDUSTRIES · 10K+
                      CAMPAIGNS · B2B · HEALTHCARE · CONSUMER ·{" "}
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
