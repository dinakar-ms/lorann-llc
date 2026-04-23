import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Users,
  Home,
  CreditCard,
  ShoppingBag,
  MapPin,
  Calendar,
  Heart,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consumer Data · Lorann LLC",
  description:
    "Behavioral, lifestyle, and demographic audience attributes designed to support direct and digital consumer outreach at scale.",
};

export default function ConsumerDataPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Data Assets", href: "/data-assets" },
          { label: "Consumer Data" },
        ]}
        kicker="Data Asset"
        title={
          <>
            Reach the right consumers with{" "}
            <span className="text-gradient">the right signals.</span>
          </>
        }
        description="Behavioral, lifestyle, and demographic audience attributes — designed to support direct, digital, and omnichannel consumer outreach at scale."
        primaryCta={{ label: "Request Counts", href: "/contact" }}
        secondaryCta={{ label: "View Data Cards", href: "/data-assets/data-cards" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                What it covers
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Demographics, lifestyle, and{" "}
                <span className="text-gradient">purchase intent</span> in a single file.
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Our consumer dataset combines deterministic demographic attributes with behavioral
                signals that predict in-market activity — giving you a view of who your customer is
                and what they&rsquo;re ready to buy.
              </p>
              <p>
                Use it for direct mail, email, SMS, digital targeting, or as a lookalike seed for
                your paid channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Attribute Categories"
            title={
              <>
                Every consumer dimension <span className="text-gradient">you need.</span>
              </>
            }
            description="Mix and match attributes to build exactly the consumer segment your campaign requires."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Users, title: "Demographics", desc: "Age, gender, household composition, income brackets." },
              { Icon: Home, title: "Household & Property", desc: "Homeownership, property type, value, length of residence." },
              { Icon: CreditCard, title: "Financial Indicators", desc: "Estimated income, credit-range indicators, financial behaviors." },
              { Icon: ShoppingBag, title: "Purchase Behavior", desc: "Recent purchase activity, buyer types, retail preferences." },
              { Icon: MapPin, title: "Geographic", desc: "ZIP, DMA, and hyperlocal targeting with polygon overlays." },
              { Icon: Calendar, title: "Life Events", desc: "New parents, movers, new homeowners, and lifecycle triggers." },
              { Icon: Heart, title: "Lifestyle & Interest", desc: "Hobbies, affinity groups, charitable giving, travel patterns." },
              { Icon: Sparkles, title: "Custom Models", desc: "Build segments from seed files or describe-your-customer logic." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
