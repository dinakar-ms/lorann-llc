import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Activity,
  Stethoscope,
  Building2,
  ShieldCheck,
  Cross,
  UserCheck,
  Pill,
  HeartPulse,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Data · Lorann LLC",
  description:
    "Specialized healthcare datasets built with compliance, accuracy, and targeting precision in mind.",
};

export default function HealthcareDataPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Data Assets", href: "/data-assets" },
          { label: "Healthcare Data" },
        ]}
        kicker="Data Asset"
        title={
          <>
            Healthcare audiences built with{" "}
            <span className="text-gradient">compliance and precision.</span>
          </>
        }
        description="Specialized healthcare datasets built with compliance, accuracy, and targeting precision in mind — for provider-directed and patient-focused campaigns."
        primaryCta={{ label: "Talk to Our Team", href: "/contact" }}
        secondaryCta={{ label: "View Data Cards", href: "/data-assets/data-cards" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Healthcare coverage
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Providers, facilities, and patient-facing audiences —{" "}
                <span className="text-gradient">handled with care.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Healthcare marketing requires both precision and compliance. Our dataset spans
                providers, facilities, and patient-facing consumer audiences — with specialty,
                credential, and facility-type attributes that make real targeting possible.
              </p>
              <p>
                Governance, opt-in status, and compliance posture are baked into every record — so
                activation stays safe alongside performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Coverage Areas"
            title={
              <>
                Eight places healthcare marketers{" "}
                <span className="text-gradient">deploy our data.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Stethoscope, title: "Physicians", desc: "MD/DO specialties, credentials, practice type, and contact data." },
              { Icon: UserCheck, title: "Allied HCPs", desc: "NPs, PAs, RNs, pharmacists, therapists." },
              { Icon: Building2, title: "Facilities", desc: "Hospitals, clinics, long-term care, and specialty practices." },
              { Icon: Cross, title: "Specialty Coverage", desc: "Oncology, cardiology, dermatology, behavioral, and more." },
              { Icon: Pill, title: "Pharma-Aligned", desc: "Therapy-area targeting and prescribing behavior indicators." },
              { Icon: HeartPulse, title: "Patient Audiences", desc: "Consumer segments for condition-driven campaigns." },
              { Icon: Activity, title: "Signal Overlays", desc: "Intent and behavioral signals layered from Signal eXchange™." },
              { Icon: ShieldCheck, title: "Compliance-First", desc: "Governance, verification, and opt-in status per record." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
