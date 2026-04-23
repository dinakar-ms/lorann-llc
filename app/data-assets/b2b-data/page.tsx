import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Briefcase,
  Building,
  Users,
  Globe,
  Cpu,
  BarChart3,
  Target,
  Mail,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Data · Lorann LLC",
  description:
    "Comprehensive business and professional datasets for prospecting, account-based marketing, and audience development across industries.",
};

export default function B2BDataPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Data Assets", href: "/data-assets" },
          { label: "B2B Data" },
        ]}
        kicker="Data Asset"
        title={
          <>
            Comprehensive business and{" "}
            <span className="text-gradient">professional datasets.</span>
          </>
        }
        description="Built for prospecting, account-based marketing, and audience development across every industry — with the contact, firmographic, and technographic depth enterprise teams need."
        primaryCta={{ label: "Request Sample", href: "/contact" }}
        secondaryCta={{ label: "View Data Cards", href: "/data-assets/data-cards" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                The B2B anchor
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                From single-title prospecting to{" "}
                <span className="text-gradient">full account-based programs.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Our B2B dataset covers the attributes that matter: verified contact-level
                information, firmographics, technographics, and the role-level detail required to
                reach decision makers across functions and industries.
              </p>
              <p>
                Whether you&rsquo;re building a targeted outbound list, stitching together an ABM play,
                or enriching your existing records, the B2B file is the anchor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="What You Get"
            title={
              <>
                Eight ways B2B data powers{" "}
                <span className="text-gradient">your campaigns.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Briefcase, title: "Contact-Level Data", desc: "Name, title, email, direct line — verified monthly." },
              { Icon: Building, title: "Firmographics", desc: "Industry (SIC/NAICS), revenue, employee size, HQ location." },
              { Icon: Users, title: "Role & Seniority", desc: "Decision-maker targeting by function and level." },
              { Icon: Cpu, title: "Technographics", desc: "Installed tech stack and software-use signals." },
              { Icon: BarChart3, title: "Intent Overlay", desc: "Buying signals layered from Signal eXchange™." },
              { Icon: Globe, title: "Global Coverage", desc: "US core with international coverage on demand." },
              { Icon: Target, title: "ABM-Ready", desc: "Account lists with role-based contact mapping." },
              { Icon: Mail, title: "Email-Deliverable", desc: "Continuously validated email deliverability." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
