import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import {
  CreditCard,
  Search,
  Download,
  ArrowUpRight,
  Filter,
  FileText,
  BarChart3,
  Clock,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Cards · Lorann LLC",
  description:
    "Detailed audience definitions, attributes, and counts available through our data card library to support planning and campaign development.",
};

export default function DataCardsPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Data Assets", href: "/data-assets" },
          { label: "Data Cards" },
        ]}
        kicker="Data Asset"
        title={
          <>
            Audience definitions, attributes,{" "}
            <span className="text-gradient">and counts — at your fingertips.</span>
          </>
        }
        description="Detailed audience definitions, attributes, and counts available through our data card library — designed to support planning, quoting, and campaign development."
        primaryCta={{ label: "View Data Cards", href: "/contact" }}
        secondaryCta={{ label: "Request Overview", href: "/contact" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why data cards matter
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                The fastest way to move from{" "}
                <span className="text-gradient">concept to campaign.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Every Lorann audience is documented on a data card — the definition, the attributes,
                the counts, and the selects you can apply. Use them to plan, quote, and approve
                campaigns before you&rsquo;re in production.
              </p>
              <p>
                Data cards link directly into our activation pipeline, so once you&rsquo;re ready to
                execute, the audience is already specified.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="What Each Card Tells You"
            title={
              <>
                Everything you need to{" "}
                <span className="text-gradient">spec a campaign.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: FileText, title: "Audience Definition", desc: "A clear description of who is in the audience and how it was built." },
              { Icon: Filter, title: "Available Selects", desc: "Which attributes and filters you can apply to tighten the audience." },
              { Icon: BarChart3, title: "Counts & Universe", desc: "Total universe and counts by geography, role, and select." },
              { Icon: CreditCard, title: "Pricing Structure", desc: "Per-record and licensed-use pricing options documented per card." },
              { Icon: Clock, title: "Update Cadence", desc: "How often the audience refreshes and when it was last verified." },
              { Icon: Download, title: "Export Options", desc: "Available delivery formats and activation channels." },
              { Icon: Search, title: "Search & Filter", desc: "Find relevant audiences quickly across our card library." },
              { Icon: ArrowUpRight, title: "Direct Activation", desc: "Approve a card and move straight into deployment." },
            ]}
          />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="reveal bg-white border border-slate-150 rounded-3xl p-8 lg:p-12 shadow-md grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3">
                Not ready to browse the full library?
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-[1.8rem] tracking-[-0.02em] text-slate-900 mb-2">
                Request a data overview instead.
              </h3>
              <p className="text-slate-600 text-[15px] leading-relaxed max-w-xl">
                Tell us your audience brief and we&rsquo;ll hand-pick the cards most relevant to your
                goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 transition-all"
            >
              Request Data Overview
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
