"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";

function SolutionRow({
  reverse,
  kicker,
  title,
  titleAccent,
  desc,
  feats,
  cta,
  ctaHref,
  viz,
  id,
}: {
  reverse?: boolean;
  kicker: string;
  title: string;
  titleAccent: string;
  desc: string;
  feats: string[];
  cta: string;
  ctaHref: string;
  viz: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      className={`sol-row grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-24 lg:mb-32 last:mb-0 relative`}
      data-observe
      id={id}
    >
      <div className={`sol-copy ${reverse ? "lg:order-2" : ""}`}>
        <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.15em] text-blue-700 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2F5DEC] animate-pulse-dot" />
          {kicker}
        </span>
        <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.1] tracking-tight my-4 text-slate-900">
          {title} <span className="text-gradient">{titleAccent}</span>
        </h3>
        <p className="text-slate-600 text-[16.5px] leading-relaxed mb-6">{desc}</p>
        <ul className="flex flex-col gap-3 mb-7 sol-feats">
          {feats.map((feat) => (
            <li key={feat} className="flex items-center gap-3 text-slate-700 text-[14.5px]">
              <span className="w-5.5 h-5.5 w-[22px] h-[22px] rounded-full bg-blue-100 text-blue-700 grid place-items-center flex-shrink-0">
                <Check className="w-3 h-3" strokeWidth={3} />
              </span>
              {feat}
            </li>
          ))}
        </ul>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 transition-all"
        >
          {cta} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="sol-viz aspect-[5/4] rounded-[22px] border border-slate-150 relative overflow-hidden p-10 grid place-items-center shadow-md"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(29, 69, 217, 0.08), transparent 60%), linear-gradient(135deg, #E4EDFF 0%, #F0F5FF 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(29, 69, 217, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 69, 217, 0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            WebkitMaskImage: "radial-gradient(ellipse at center, #000, transparent 80%)",
            maskImage: "radial-gradient(ellipse at center, #000, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0 animate-sheen"
          style={{
            background: "linear-gradient(135deg, transparent, rgba(34, 191, 255, 0.05), transparent)",
          }}
        />
        <div className="relative z-[1] w-full max-w-[380px]">{viz}</div>
      </div>

      <style jsx>{`
        .sol-row .sol-copy {
          opacity: 0;
          transform: translateX(${reverse ? "50px" : "-50px"});
          transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
        }
        .sol-row .sol-viz {
          opacity: 0;
          transform: translateX(${reverse ? "-50px" : "50px"}) rotate(${reverse ? "-3deg" : "3deg"});
          transition: opacity 1s var(--ease) 0.3s, transform 1s var(--ease) 0.3s;
        }
        .sol-row :global(.sol-feats li) {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
        }
        .sol-row.in-view .sol-copy,
        .sol-row.in-view .sol-viz {
          opacity: 1;
          transform: translateX(0) rotate(0);
        }
        .sol-row.in-view :global(.sol-feats li) { opacity: 1; transform: translateX(0); }
        .sol-row.in-view :global(.sol-feats li:nth-child(1)) { transition-delay: 0.4s; }
        .sol-row.in-view :global(.sol-feats li:nth-child(2)) { transition-delay: 0.5s; }
        .sol-row.in-view :global(.sol-feats li:nth-child(3)) { transition-delay: 0.6s; }
        .sol-row.in-view :global(.sol-feats li:nth-child(4)) { transition-delay: 0.7s; }
      `}</style>
    </div>
  );
}

function VizA() {
  return (
    <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hub1"><stop offset="0%" stopColor="#4F7DF5" /><stop offset="100%" stopColor="#162D8C" /></radialGradient>
      </defs>
      <circle cx="160" cy="130" r="115" fill="none" stroke="#CDDCFE" strokeWidth="1.5" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 160 130" to="360 160 130" dur="40s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="130" r="90" fill="none" stroke="#A9C2FD" strokeWidth="1" strokeDasharray="1 3">
        <animateTransform attributeName="transform" type="rotate" from="360 160 130" to="0 160 130" dur="30s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="130" r="70" fill="none" stroke="#7FA2FB" strokeWidth="1.5" strokeDasharray="3 3">
        <animateTransform attributeName="transform" type="rotate" from="360 160 130" to="0 160 130" dur="25s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="130" r="38" fill="url(#hub1)">
        <animate attributeName="r" values="34;42;34" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="160" y="126" fill="#fff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle">AUDIENCE</text>
      <text x="160" y="140" fill="#fff" fontFamily="Inter" fontSize="9" fontWeight="500" textAnchor="middle">95M+</text>
      <circle cx="50" cy="130" r="7" fill="#1D45D9"><animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite" /></circle>
      <circle cx="270" cy="130" r="7" fill="#22BFFF"><animate attributeName="r" values="5;9;5" dur="2.3s" repeatCount="indefinite" /></circle>
      <circle cx="160" cy="20" r="7" fill="#4F7DF5"><animate attributeName="r" values="5;9;5" dur="2.5s" repeatCount="indefinite" /></circle>
      <circle cx="160" cy="240" r="7" fill="#2F5DEC"><animate attributeName="r" values="5;9;5" dur="2.2s" repeatCount="indefinite" /></circle>
      <g stroke="#A9C2FD" strokeWidth="1" opacity="0.5">
        <line x1="50" y1="130" x2="160" y2="130" />
        <line x1="270" y1="130" x2="160" y2="130" />
        <line x1="160" y1="20" x2="160" y2="130" />
        <line x1="160" y1="240" x2="160" y2="130" />
      </g>
    </svg>
  );
}

function VizB() {
  return (
    <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#CDDCFE" strokeWidth="1" opacity="0.5">
        <line x1="30" y1="210" x2="300" y2="210" />
        <line x1="30" y1="170" x2="300" y2="170" strokeDasharray="2 4" />
        <line x1="30" y1="130" x2="300" y2="130" strokeDasharray="2 4" />
        <line x1="30" y1="90" x2="300" y2="90" strokeDasharray="2 4" />
        <line x1="30" y1="50" x2="300" y2="50" strokeDasharray="2 4" />
      </g>
      <g transform="translate(40, 60)">
        <rect x="0" y="120" width="36" height="40" rx="8" fill="#CDDCFE"><animate attributeName="height" values="30;50;30" dur="3s" repeatCount="indefinite" /><animate attributeName="y" values="130;110;130" dur="3s" repeatCount="indefinite" /></rect>
        <rect x="46" y="90" width="36" height="70" rx="8" fill="#A9C2FD"><animate attributeName="height" values="70;90;70" dur="2.8s" repeatCount="indefinite" /><animate attributeName="y" values="90;70;90" dur="2.8s" repeatCount="indefinite" /></rect>
        <rect x="92" y="60" width="36" height="100" rx="8" fill="#7FA2FB"><animate attributeName="height" values="100;120;100" dur="3.2s" repeatCount="indefinite" /><animate attributeName="y" values="60;40;60" dur="3.2s" repeatCount="indefinite" /></rect>
        <rect x="138" y="30" width="36" height="130" rx="8" fill="#4F7DF5"><animate attributeName="height" values="130;150;130" dur="3s" repeatCount="indefinite" /><animate attributeName="y" values="30;10;30" dur="3s" repeatCount="indefinite" /></rect>
        <rect x="184" y="10" width="36" height="150" rx="8" fill="#1D45D9"><animate attributeName="height" values="150;170;150" dur="2.6s" repeatCount="indefinite" /><animate attributeName="y" values="10;-10;10" dur="2.6s" repeatCount="indefinite" /></rect>
      </g>
      <polyline points="60,150 110,120 160,90 210,60 260,30" fill="none" stroke="#00A7EF" strokeWidth="3" strokeLinecap="round" strokeDasharray="400" strokeDashoffset="400">
        <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" fill="freeze" />
      </polyline>
      <circle cx="60" cy="150" r="6" fill="#fff" stroke="#00A7EF" strokeWidth="2.5" />
      <circle cx="110" cy="120" r="6" fill="#fff" stroke="#00A7EF" strokeWidth="2.5" />
      <circle cx="160" cy="90" r="6" fill="#fff" stroke="#00A7EF" strokeWidth="2.5" />
      <circle cx="210" cy="60" r="6" fill="#fff" stroke="#00A7EF" strokeWidth="2.5" />
      <circle cx="260" cy="30" r="8" fill="#00A7EF"><animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" /></circle>
      <g transform="translate(232, 50)">
        <rect x="0" y="0" width="64" height="30" rx="15" fill="#1D45D9" />
        <text x="32" y="20" fill="#fff" fontFamily="Inter" fontSize="13" fontWeight="700" textAnchor="middle">+40%</text>
      </g>
    </svg>
  );
}

export default function SolutionsSection() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          kicker="Solutions"
          title={<>Flexible solutions for<br /><span className="text-gradient">every campaign</span></>}
          description="Focused services that adapt to your marketing stack and operational workflow."
        />

        <SolutionRow
          id="audience-targeting"
          kicker="Core Service"
          title="Precision"
          titleAccent="audience targeting"
          desc="Leverage high-quality B2B, healthcare, and consumer data to build precise audiences based on industry, role, behaviour, and intent signals — with lookalike modelling for scale."
          feats={[
            "Custom audience segmentation",
            "Firmographic, technographic, behavioural filters",
            "B2B, healthcare & consumer datasets",
            "Lookalike audience modelling",
          ]}
          cta="Learn More"
          ctaHref="mailto:info@lorannllc.com?subject=Audience%20Targeting"
          viz={<VizA />}
        />

        <SolutionRow
          id="data-enrichment"
          reverse
          kicker="Enhancement"
          title="Data"
          titleAccent="enrichment"
          desc="Enhance existing datasets with firmographic, technographic, and intent signals — then apply predictive modeling to prioritise the prospects most likely to convert."
          feats={[
            "Firmographic & technographic append",
            "Real-time intent signal integration",
            "Predictive lead scoring models",
            "CRM-ready delivery formats",
          ]}
          cta="Learn More"
          ctaHref="mailto:info@lorannllc.com?subject=Data%20Enrichment"
          viz={<VizB />}
        />
      </div>
    </section>
  );
}
