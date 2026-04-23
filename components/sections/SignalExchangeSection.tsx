"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignalExchangeSection() {
  return (
    <section id="signal" className="py-16">
      <div
        className="mx-5 sm:mx-6 lg:mx-12 rounded-[32px] px-8 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24 relative overflow-hidden text-white signal-bg shadow-[0_50px_100px_-20px_rgba(29,69,217,0.3)]"
        data-observe
      >
        <div className="absolute inset-0 hex-grid-bg" />
        <div
          className="absolute left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(34, 191, 255, 0.08), transparent)",
            top: "-100%",
            animation: "scan-beam 6s ease-in-out infinite",
          }}
        />
        <style jsx>{`
          @keyframes scan-beam {
            0%, 100% { top: -50%; opacity: 0; }
            50% { top: 100%; opacity: 1; }
          }
        `}</style>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-[2]">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.15em] text-cyan-400 px-3.5 py-1.5 border border-cyan-400/30 rounded-full bg-cyan-400/8 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22BFFF] animate-pulse-dot" />
              Proprietary Intelligence
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.025em] mb-6">
              Meet <span className="text-gradient-cyan">Signal eXchange™</span>—
              <br />
              where lead data meets
              <br />
              live intent.
            </h2>
            <p className="text-white/72 text-[17px] leading-relaxed mb-8 max-w-[520px]">
              The industry&apos;s first continuously evolving dataset that fuses
              first-party lead data with real-time intent signals — delivering
              audiences that don&apos;t just reach the right people, they reach{" "}
              <em>ready buyers</em>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "First-party + intent fusion",
                "Continuously refreshed",
                "Higher conversion rates",
                "Ready for every channel",
              ].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2.5 p-3 bg-white/5 border border-white/10 rounded-[10px] text-[13.5px] text-white/92 backdrop-blur-md hover:bg-cyan-400/8 hover:border-cyan-400/30 hover:translate-x-1 transition-all relative overflow-hidden group"
                >
                  <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </div>

            <Link
              href="mailto:info@lorannllc.com?subject=Signal%20eXchange%20Demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-semibold text-[14.5px] rounded-xl shadow-[0_12px_30px_-8px_rgba(0,167,239,0.55)] hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-10px_rgba(0,167,239,0.75)] transition-all"
            >
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative aspect-square max-w-[520px] mx-auto w-full">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                <linearGradient id="flg1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1D45D9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22BFFF" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="flg2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22BFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4F7DF5" stopOpacity="0.9" />
                </linearGradient>
                <radialGradient id="eg">
                  <stop offset="0%" stopColor="#22BFFF" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#1D45D9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1D45D9" stopOpacity="0" />
                </radialGradient>
                <filter id="sg">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              <circle cx="250" cy="250" r="200" fill="none" stroke="rgba(111,211,255,0.15)" strokeWidth="1" strokeDasharray="4 6">
                <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="30s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="250" r="175" fill="none" stroke="rgba(79,125,245,0.12)" strokeWidth="1">
                <animateTransform attributeName="transform" type="rotate" from="360 250 250" to="0 250 250" dur="20s" repeatCount="indefinite" />
              </circle>

              <line x1="110" y1="130" x2="250" y2="250" stroke="url(#flg1)" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
              </line>
              <line x1="110" y1="370" x2="250" y2="250" stroke="url(#flg1)" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.4s" repeatCount="indefinite" />
              </line>
              <line x1="250" y1="250" x2="400" y2="100" stroke="url(#flg2)" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.1s" repeatCount="indefinite" />
              </line>
              <line x1="250" y1="250" x2="420" y2="200" stroke="url(#flg2)" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.3s" repeatCount="indefinite" />
              </line>
              <line x1="250" y1="250" x2="420" y2="300" stroke="url(#flg2)" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="250" y1="250" x2="400" y2="400" stroke="url(#flg2)" strokeWidth="1.5" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.2s" repeatCount="indefinite" />
              </line>

              <circle cx="80" cy="130" r="54" fill="rgba(29,69,217,0.18)" stroke="#4F7DF5" strokeWidth="1.5" />
              <text x="80" y="126" fill="#CDDCFE" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">First-Party</text>
              <text x="80" y="142" fill="#CDDCFE" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">Lead Data</text>

              <circle cx="80" cy="370" r="54" fill="rgba(34,191,255,0.18)" stroke="#6FD3FF" strokeWidth="1.5" />
              <text x="80" y="366" fill="#BAE6FD" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">Intent</text>
              <text x="80" y="382" fill="#BAE6FD" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">Signals</text>

              <circle cx="250" cy="250" r="105" fill="url(#eg)">
                <animate attributeName="r" values="95;115;95" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="250" r="70" fill="rgba(29,69,217,0.25)" stroke="#22BFFF" strokeWidth="2" />
              <circle cx="250" cy="250" r="58" fill="none" stroke="#CDDCFE" strokeWidth="1" opacity="0.4" strokeDasharray="2 3">
                <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="12s" repeatCount="indefinite" />
              </circle>
              <text x="250" y="243" fill="#fff" fontFamily="Space Grotesk" fontSize="15" fontWeight="700" textAnchor="middle">Signal</text>
              <text x="250" y="262" fill="#fff" fontFamily="Space Grotesk" fontSize="15" fontWeight="700" textAnchor="middle">eXchange</text>
              <text x="250" y="280" fill="#6FD3FF" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle">ENGINE™</text>

              {["CRM", "Email", "Digital", "Direct Mail"].map((label, i) => (
                <g key={label}>
                  <rect x="400" y={80 + i * 100} width="84" height="40" rx="10" fill="rgba(79,125,245,0.15)" stroke="#4F7DF5" strokeWidth="1" />
                  <text x="442" y={104 + i * 100} fill="#DBE7FE" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle">
                    {label}
                  </text>
                </g>
              ))}

              <circle r="5" fill="#22BFFF" filter="url(#sg)"><animateMotion dur="2s" repeatCount="indefinite" path="M 110 130 L 250 250" /></circle>
              <circle r="5" fill="#22BFFF" filter="url(#sg)"><animateMotion dur="2.2s" repeatCount="indefinite" path="M 110 370 L 250 250" /></circle>
              <circle r="5" fill="#4F7DF5" filter="url(#sg)"><animateMotion dur="2s" begin="0.5s" repeatCount="indefinite" path="M 250 250 L 400 100" /></circle>
              <circle r="5" fill="#4F7DF5" filter="url(#sg)"><animateMotion dur="2s" begin="0.8s" repeatCount="indefinite" path="M 250 250 L 420 200" /></circle>
              <circle r="5" fill="#4F7DF5" filter="url(#sg)"><animateMotion dur="2s" begin="1.1s" repeatCount="indefinite" path="M 250 250 L 420 300" /></circle>
              <circle r="5" fill="#4F7DF5" filter="url(#sg)"><animateMotion dur="2s" begin="1.4s" repeatCount="indefinite" path="M 250 250 L 400 400" /></circle>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
