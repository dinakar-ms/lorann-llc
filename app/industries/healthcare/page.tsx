import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  HeartPulse,
  Stethoscope,
  Hospital,
  ShieldCheck,
  Users,
  Activity,
  Database,
  Target,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Data & Audiences · Lorann LLC",
  description:
    "HIPAA-conscious physician, hospital, and patient-facing audiences for life sciences, pharma, and provider marketing — built on verified, continuously refreshed data.",
};

export default function HealthcarePage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Healthcare" },
        ]}
        kicker="Industry · Healthcare"
        title={
          <>
            HCP, hospital, and patient audiences —{" "}
            <span className="text-gradient">designed for compliance.</span>
          </>
        }
        description="Reach physicians, specialists, hospital decision-makers, and patient-facing consumers with verified, segmentation-ready data — built for life-sciences, provider, and payer marketing."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "Healthcare Data", href: "/data-assets/healthcare-data" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why teams choose Lorann for healthcare
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Specialty-level targeting,{" "}
                <span className="text-gradient">compliance built in.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Healthcare campaigns operate under constraints other verticals don&apos;t see. Compliance posture, specialty fragmentation, and a buyer journey that spans provider, payer, and patient — all need to be designed into the audience from the start.
              </p>
              <p>
                Our healthcare file combines NPI-anchored HCP coverage, hospital and IDN firmographics, and HIPAA-conscious consumer overlays. Every record is continuously verified and channel-eligibility is attached at the record level — so activation never becomes the gating step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Coverage"
            title={
              <>
                Four healthcare audiences{" "}
                <span className="text-gradient">we deliver every week.</span>
              </>
            }
            description="From single-specialty HCP lists to nationwide patient-facing programs — all from the same verified source."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Stethoscope, title: "Physicians & Specialists", desc: "NPI-validated targeting by specialty, sub-specialty, and prescribing eligibility." },
              { Icon: Hospital, title: "Hospitals & IDNs", desc: "Decision-makers across hospital systems, IDNs, GPOs, and ambulatory networks." },
              { Icon: Users, title: "Allied Health Pros", desc: "Nurses, NPs, PAs, pharmacists, and clinical support staff." },
              { Icon: HeartPulse, title: "Patient-Facing Audiences", desc: "Consented consumer segments for DTC and condition-aware campaigns." },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="What's Inside"
            title={
              <>
                Built for marketers who can&apos;t{" "}
                <span className="text-gradient">cut corners on compliance.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: ShieldCheck, title: "HIPAA-Conscious", desc: "Record-level consent and channel-eligibility, designed in — not bolted on." },
              { Icon: Database, title: "Continuously Verified", desc: "Practice moves, role changes, and credential updates refreshed every cycle." },
              { Icon: Target, title: "Specialty-First Segments", desc: "Cardiology, oncology, derm, primary care, behavioral health — and far deeper." },
              { Icon: Activity, title: "Intent Overlays", desc: "Signal eXchange™ flags HCPs and accounts actively researching your category." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
