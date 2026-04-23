import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Radio,
  Sparkles,
  Layers,
  Target,
  Zap,
  LineChart,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal eXchange™ — Lead & Intent Data · Lorann LLC",
  description:
    "Lorann's proprietary dataset combining first-party lead data with intent and behavioral signals to create more actionable, performance-driven audiences.",
};

export default function SolutionsSignalExchangePage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Signal eXchange™" },
        ]}
        kicker="Flagship"
        title={
          <>
            Lead data. Intent signals.{" "}
            <span className="text-gradient">One dataset built to perform.</span>
          </>
        }
        description="Access high-intent audiences through Signal eXchange™, combining first-party lead data with intent and behavioral signals to deliver more actionable, performance-driven opportunities across key verticals."
        primaryCta={{ label: "Request Access", href: "/contact" }}
        secondaryCta={{ label: "See Data Asset", href: "/data-assets/signal-exchange" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                What is Signal eXchange™
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Our proprietary dataset — continuously evolving,{" "}
                <span className="text-gradient">built for activation.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Signal eXchange™ is Lorann&rsquo;s proprietary dataset, built by combining first-party
                lead data with intent signals and behavioral attributes to create more accurate,
                high-performing audiences.
              </p>
              <p>
                Unlike static third-party files, Signal eXchange is refreshed continuously — so the
                audiences you activate reflect real in-market behavior, not last quarter&rsquo;s
                snapshot.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Why It Performs"
            title={
              <>
                Six reasons marketers choose{" "}
                <span className="text-gradient">Signal eXchange™.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={3}
            features={[
              { Icon: Radio, title: "First-Party Foundation", desc: "Built on opted-in lead data we own — not aggregated third-party scraps." },
              { Icon: Sparkles, title: "Intent Signals Layered", desc: "Behavioral and buying signals overlaid to flag the consumers who are actually in-market." },
              { Icon: RefreshCw, title: "Continuously Refreshed", desc: "The file updates constantly, not quarterly — so you activate on today, not last month." },
              { Icon: Target, title: "Vertical-Specific", desc: "Tuned for auto, insurance, financial services, and healthcare audience models." },
              { Icon: Zap, title: "Activation-Ready", desc: "Delivered in the format your CRM, DSP, email platform, or call center needs." },
              { Icon: ShieldCheck, title: "Governance Built In", desc: "Compliance, opt-in status, and validation baked into every record." },
            ]}
          />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div
            className="reveal relative overflow-hidden rounded-[32px] p-8 lg:p-14 text-white grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
            }}
          >
            <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-[24px] bg-cyan-400/15 border border-cyan-400/28 grid place-items-center">
              <LineChart className="w-14 h-14 text-cyan-300" />
            </div>
            <div className="relative">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-3">
                Use Cases
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-[2rem] tracking-[-0.025em] leading-tight mb-3.5">
                Lead generation, retargeting, lookalikes, and channel-level activation.
              </h3>
              <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
                Marketers use Signal eXchange™ for in-market prospecting, retargeting engaged
                audiences, building lookalike models, and pushing activation directly to call
                centers and digital channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
