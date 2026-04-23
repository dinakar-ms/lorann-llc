import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Share2,
  Mail,
  Server,
  Phone,
  Megaphone,
  Globe,
  Workflow,
  PlugZap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Activation & Channel Integration · Lorann LLC",
  description:
    "Deploy audiences across digital, CRM, email, and traditional channels, ensuring data is activated effectively across the full marketing ecosystem.",
};

export default function DataActivationPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Data Activation & Channel Integration" },
        ]}
        kicker="Solution 04"
        title={
          <>
            Great data is only{" "}
            <span className="text-gradient">as good as where it runs.</span>
          </>
        }
        description="Deploy audiences across digital, CRM, email, and traditional channels — ensuring your data is activated effectively across the full marketing ecosystem."
        primaryCta={{ label: "Plan an Activation", href: "/contact" }}
        secondaryCta={{ label: "Our Approach", href: "/about/our-approach" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                End-to-end activation
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                From audience file to{" "}
                <span className="text-gradient">in-market campaign.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Most data goes stale between your provider and your platform. Our activation
                workflows keep audiences moving: we deliver segments in the format your tools
                expect, refresh them on schedule, and coordinate across channels.
              </p>
              <p>
                Whether you run on a CDP, send through an ESP, or dial through a call center, we
                meet you at the integration layer so the data actually performs in production.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Activation Channels"
            title={
              <>
                Where we deploy <span className="text-gradient">your audiences.</span>
              </>
            }
            description="If your team runs it, we probably integrate with it."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Mail, title: "Email / ESP", desc: "Deploy suppression-aware segments into your ESP with campaign-ready formats." },
              { Icon: Server, title: "CRM & CDP", desc: "Push enriched records and segments directly into Salesforce, HubSpot, and major CDPs." },
              { Icon: Globe, title: "Digital / DSP", desc: "Sync audiences for programmatic, social, and display activation." },
              { Icon: Phone, title: "Call Center", desc: "High-intent files routed for live-transfer and outbound dialing." },
              { Icon: Megaphone, title: "Direct Mail", desc: "Postal-ready files with verified addresses and appended attributes." },
              { Icon: Workflow, title: "Orchestration", desc: "Coordinate the same audience across multiple channels without duplication." },
              { Icon: PlugZap, title: "API & Feed", desc: "Scheduled feeds, webhooks, and API endpoints for automated pipelines." },
              { Icon: Share2, title: "Multi-Channel", desc: "One audience, many channels — tracked and refreshed centrally." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
