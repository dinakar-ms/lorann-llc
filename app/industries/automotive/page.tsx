import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Car,
  Wrench,
  Building2,
  Truck,
  Activity,
  Target,
  Database,
  MapPin,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automotive Data & Audiences · Lorann LLC",
  description:
    "In-market buyers, dealerships, fleet operators, and aftermarket networks — segmented by vehicle, geography, and refresh-cycle intent for OEM, dealer, and parts marketing.",
};

export default function AutomotivePage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Automotive" },
        ]}
        kicker="Industry · Automotive"
        title={
          <>
            From in-market buyers to{" "}
            <span className="text-gradient">aftermarket networks.</span>
          </>
        }
        description="Verified automotive audiences across OEM, dealer, fleet, and aftermarket — segmented by vehicle, geography, and refresh-cycle intent. Built for direct-response, dealer co-op, and parts-network campaigns that need to convert at the local level."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "All Industries", href: "/industries" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why automotive teams choose Lorann
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Local-level precision,{" "}
                <span className="text-gradient">national-level scale.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Automotive marketing has to land at the right ZIP, the right vehicle segment, and the right point in the ownership cycle — all at once. Generic consumer files don&apos;t know that someone&apos;s lease is up in 90 days, or that they just moved into truck-buying territory.
              </p>
              <p>
                Our automotive audiences combine in-market signals, refresh-cycle modeling, and dealer-DMA geo precision — so OEM, dealer, and aftermarket campaigns reach buyers when the buying window opens, not after it closes.
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
                Four automotive audiences{" "}
                <span className="text-gradient">we deliver every week.</span>
              </>
            }
            description="From OEM brand campaigns to single-dealer co-op activations."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Car, title: "In-Market Buyers", desc: "Consumers actively shopping new or used vehicles, scored by refresh-cycle and intent." },
              { Icon: Building2, title: "Dealer Networks", desc: "Dealership decision-makers, GMs, marketing leads, and parts directors." },
              { Icon: Truck, title: "Fleet & Commercial", desc: "Fleet operators, logistics buyers, and commercial vehicle decision-makers." },
              { Icon: Wrench, title: "Aftermarket Networks", desc: "Service, parts, and accessory buyers across independent and franchise networks." },
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
                Built for dealer co-op and{" "}
                <span className="text-gradient">direct-response programs.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Activity, title: "Refresh-Cycle Intent", desc: "Signal eXchange™ flags consumers whose lease, finance, or warranty window is opening." },
              { Icon: MapPin, title: "Dealer-DMA Geo", desc: "ZIP-level, radius, and dealer-territory targeting for co-op activation." },
              { Icon: Target, title: "Vehicle-Segment Modeling", desc: "Sedan, SUV, truck, EV, and luxury segments scored at the household level." },
              { Icon: Database, title: "Verified Sources", desc: "Sourced from compliant consumer programs with continuous suppression hygiene." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
