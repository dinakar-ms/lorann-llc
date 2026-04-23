import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import {
  Sparkles,
  Radio,
  Database,
  LineChart,
  ShieldCheck,
  Layers,
  RefreshCw,
  Target,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal eXchange™ · Data Asset — Lorann LLC",
  description:
    "Lorann's proprietary dataset combining first-party lead data with intent and behavioral signals to create more actionable, performance-driven audiences.",
};

export default function DataAssetsSignalExchangePage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Data Assets", href: "/data-assets" },
          { label: "Signal eXchange™" },
        ]}
        kicker="Flagship Asset"
        title={
          <>
            Proprietary lead + intent data,{" "}
            <span className="text-gradient">continuously refreshed.</span>
          </>
        }
        description="Signal eXchange™ is Lorann's proprietary dataset — combining first-party lead data with intent and behavioral signals to create more actionable, performance-driven audiences."
        primaryCta={{ label: "Request Access", href: "/contact" }}
        secondaryCta={{ label: "How the Solution Works", href: "/solutions/signal-exchange" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                The asset
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Not a third-party file.{" "}
                <span className="text-gradient">A proprietary dataset.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Where most data providers resell third-party files, Signal eXchange™ is built on
                first-party lead data that we own — layered with intent and behavioral signals for
                real-time audience performance.
              </p>
              <p>
                It&rsquo;s the asset behind the solution — and the fastest way to activate on consumers
                who are actually in-market.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Asset Profile"
            title={
              <>
                What makes Signal eXchange™{" "}
                <span className="text-gradient">different.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Database, title: "First-Party Core", desc: "Built on lead data we own — not bundled from external sources." },
              { Icon: Sparkles, title: "Intent Layered", desc: "Behavioral and buying signals overlaid to flag in-market consumers." },
              { Icon: RefreshCw, title: "Continuously Refreshed", desc: "The file updates constantly — not quarterly." },
              { Icon: Target, title: "Vertical-Tuned", desc: "Specifically modeled for auto, insurance, financial, and healthcare." },
              { Icon: Layers, title: "Rich Attributes", desc: "Demographic, behavioral, and intent attributes per record." },
              { Icon: Radio, title: "Activation-Ready", desc: "Pre-formatted for CRM, DSP, email, and call-center deployment." },
              { Icon: LineChart, title: "Performance-Proven", desc: "Built and refined against real campaign outcomes." },
              { Icon: ShieldCheck, title: "Governance Built In", desc: "Compliance, opt-in status, and validation per record." },
            ]}
          />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div
            className="reveal relative overflow-hidden rounded-[32px] p-8 lg:p-14 text-white flex flex-wrap gap-8 items-center justify-between"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative max-w-[560px]">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-3">
                Solution view
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-[1.85rem] tracking-[-0.025em] leading-tight mb-2.5">
                Looking at this from the solution angle?
              </h3>
              <p className="text-white/75 text-[15px] leading-relaxed">
                See how Signal eXchange™ works as a managed service — from audience definition to
                channel deployment.
              </p>
            </div>
            <Link
              href="/solutions/signal-exchange"
              className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-cyan-400/30 text-white font-semibold text-[14.5px] rounded-xl backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all"
            >
              See the Solution <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
