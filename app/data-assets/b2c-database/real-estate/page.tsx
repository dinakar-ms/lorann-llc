import LeafPage from "@/components/templates/LeafPage";
import {
  Mail,
  MapPin,
  Phone,
  Home,
  TrendingUp,
  Users,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Consumer Data · B2C Database — Lorann LLC",
  description:
    "US homeowners, recent movers, and mortgage-active consumers — segmented by property type, equity, and life moment for direct-response campaigns.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
  { label: "Data Assets", href: "/data-assets" },
  { label: "B2C Database", href: "/data-assets/b2c-database" },
  { label: "Real Estate" },
];

const STATS = [
  { label: "Homeowner Records", value: "120M+" },
  { label: "Coverage", value: "All 50 States" },
  { label: "Refresh Cycle", value: "Monthly" },
  { label: "Channels", value: "Email · Mail · Phone" },
];

const ATTRIBUTES = [
  {
    Icon: Mail,
    title: "Verified Email",
    desc: "Permission-based email contacts validated for deliverability.",
  },
  {
    Icon: MapPin,
    title: "Postal Address",
    desc: "Standardized US postal address for direct mail activation.",
  },
  {
    Icon: Phone,
    title: "Phone Where Available",
    desc: "Landline and mobile numbers with TCPA permission flags.",
  },
  {
    Icon: Home,
    title: "Property Data",
    desc: "Property type, value range, year built, and square footage.",
  },
  {
    Icon: TrendingUp,
    title: "Equity & Mortgage",
    desc: "Estimated equity, mortgage status, and refinance propensity.",
  },
  {
    Icon: Users,
    title: "Household Composition",
    desc: "Household size, presence of children, and life-stage indicators.",
  },
  {
    Icon: Calendar,
    title: "Life Moments",
    desc: "Recent mover, new homeowner, and in-market triggers.",
  },
  {
    Icon: ShieldCheck,
    title: "Privacy-Aligned",
    desc: "CCPA, CAN-SPAM, and TCPA-aligned permission posture.",
  },
];

const USE_CASES = [
  {
    title: "Mortgage Acquisition",
    desc: "Reach homeowners with equity for refinance, HELOC, and cash-out programs at the right moment.",
  },
  {
    title: "Home Improvement",
    desc: "Target by property age, value, and recent move activity to drive contractor and retail response.",
  },
  {
    title: "Solar & Energy",
    desc: "Identify ideal solar candidates by property type, equity, and geography for high-ROI campaigns.",
  },
  {
    title: "Insurance Acquisition",
    desc: "Reach homeowners during shopping windows for home, life, and bundled insurance offers.",
  },
  {
    title: "Real Estate Services",
    desc: "Connect with movers, downsizers, and second-home buyers for brokerage and proptech offers.",
  },
  {
    title: "Home Warranty",
    desc: "Target new homeowners and aging-property owners with home warranty and service plan offers.",
  },
];

export default function RealEstatePage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="B2C List"
      titlePlain="Real Estate Consumer Data —"
      titleAccent="homeowners, movers, and equity-rich buyers."
      description="Verified US homeowner data segmented by property type, equity, and life moment — built for mortgage, home-improvement, solar, insurance, and real-estate services marketers."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach homeowners at the moments",
        headlineAccent: "that drive purchase response.",
      paragraphs: [
          "Real estate consumer marketing is fundamentally about timing — the right offer to the right homeowner during the right life moment. Our Real Estate file covers 120M+ US homeowner records with property, equity, and life-moment segmentation built in.",
          "Whether you\u2019re running mortgage acquisition, home improvement promotions, solar and energy programs, or insurance and home warranty campaigns — this is the file consumer real-estate marketers depend on.",
        ],
      }}
      attributes={ATTRIBUTES}
      useCases={USE_CASES}
      compliance={{
        headline: "Compliance is built in, not bolted on.",
        body: "Every record carries channel-permission flags, source provenance, and life-event metadata. Maintained under CAN-SPAM, CCPA, and TCPA frameworks — with licensing terms aligned to your campaign type.",
      }}
      backLink={{ label: "All B2C Lists", href: "/data-assets/b2c-database" }}
    />
  );
}
