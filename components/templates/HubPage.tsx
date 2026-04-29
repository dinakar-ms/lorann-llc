import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import type { ReactNode } from "react";
import type { Crumb } from "@/components/ui/SubPageHero";

export type HubChild = {
  Icon: React.ElementType;
  title: string;
  desc: string;
  href: string;
  badge?: string;
};

export type HubAttribute = {
  Icon: React.ElementType;
  title: string;
  desc: string;
};

export interface HubPageProps {
  /** Breadcrumb trail leading to this page */
  crumbs: Crumb[];
  /** Small uppercase label above the hero title */
  kicker: string;
  /** Hero title — first part is plain, second part renders in gradient */
  titlePlain: string;
  titleAccent: string;
  /** Hero description paragraph */
  description: string;
  /** Hero CTAs (defaults preserved if omitted) */
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Two-column intro block */
  intro: {
    kicker: string;
    headlinePlain: string;
    headlineAccent: string;
    paragraphs: ReactNode[];
  };
  /** Children listing — the categories or leaves users can drill into */
  childrenSection: {
    kicker: string;
    titlePlain: string;
    titleAccent: string;
    description?: string;
    /** Number of columns for the grid (defaults to 3) */
    columns?: 2 | 3 | 4;
    items: HubChild[];
  };
  /** Optional "What you get" attribute strip below the children */
  attributesSection?: {
    kicker: string;
    titlePlain: string;
    titleAccent: string;
    description?: string;
    columns?: 2 | 3 | 4;
    items: HubAttribute[];
  };
}

/**
 * Shared template for hub and sub-hub pages — i.e. category landings that
 * route users into deeper pages (Healthcare, Technology, ERP Users, etc).
 */
export default function HubPage({
  crumbs,
  kicker,
  titlePlain,
  titleAccent,
  description,
  primaryCta = { label: "Request Counts", href: "/contact" },
  secondaryCta = { label: "View Data Cards", href: "/data-assets/data-cards" },
  intro,
  childrenSection,
  attributesSection,
}: HubPageProps) {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={crumbs}
        kicker={kicker}
        title={
          <>
            {titlePlain} <span className="text-gradient">{titleAccent}</span>
          </>
        }
        description={description}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />

      {/* Intro split */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                {intro.kicker}
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                {intro.headlinePlain}{" "}
                <span className="text-gradient">{intro.headlineAccent}</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Children listing */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker={childrenSection.kicker}
            title={
              <>
                {childrenSection.titlePlain}{" "}
                <span className="text-gradient">{childrenSection.titleAccent}</span>
              </>
            }
            description={childrenSection.description}
          />
          <FeatureCardGrid
            columns={childrenSection.columns ?? 3}
            features={childrenSection.items}
          />
        </div>
      </section>

      {/* Optional attribute strip */}
      {attributesSection && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-custom">
            <SectionHeader
              kicker={attributesSection.kicker}
              title={
                <>
                  {attributesSection.titlePlain}{" "}
                  <span className="text-gradient">{attributesSection.titleAccent}</span>
                </>
              }
              description={attributesSection.description}
            />
            <FeatureCardGrid
              columns={attributesSection.columns ?? 4}
              features={attributesSection.items}
            />
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
