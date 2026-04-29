import LeafPage from "@/components/templates/LeafPage";
import { Car, Clock, Mail, MapPin, Phone, ShieldCheck, TrendingUp, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automotive Consumer Data · B2C Database — Lorann LLC",
  description:
    "US vehicle-owner data segmented by make, model year, ownership cycle, and purchase intent — built for OEM, dealer, aftermarket, and insurance campaigns.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2C Database", href: "/data-assets/b2c-database" },
      { label: "Automotive" },
];

const STATS = [
  { label: "Vehicle Owners", value: "180M+" },
    { label: "Coverage", value: "All 50 States" },
    { label: "Refresh Cycle", value: "Monthly" },
    { label: "Channels", value: "Email · Mail · Phone" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Permission-based email contacts validated for deliverability." },
    { Icon: MapPin, title: "Postal Address", desc: "Standardized US postal address for direct mail activation." },
    { Icon: Phone, title: "Phone Where Available", desc: "Landline and mobile numbers with TCPA permission flags." },
    { Icon: Car, title: "Make · Model · Year", desc: "Vehicle MMY data for precise audience segmentation." },
    { Icon: Clock, title: "Ownership Length", desc: "How long the consumer has owned the vehicle — refresh-cycle indicator." },
    { Icon: Wrench, title: "Service Behaviour", desc: "Service-event indicators for retention and aftermarket targeting." },
    { Icon: TrendingUp, title: "In-Market Signal", desc: "Purchase-intent and lease-end propensity flags." },
    { Icon: ShieldCheck, title: "Privacy-Aligned", desc: "CCPA, CAN-SPAM, and TCPA-aligned permission posture." },
];

const USE_CASES = [
  { title: "OEM Acquisition", desc: "Target in-market consumers by make affinity, lease end-date, and trade-cycle propensity." },
    { title: "Dealer Service Retention", desc: "Reach owners by make-model-year and service-history indicators." },
    { title: "Aftermarket & Parts", desc: "Segment by vehicle age, ownership length, and service-event signals." },
    { title: "Auto Insurance", desc: "Connect with vehicle owners for shopping windows, bundling offers, and renewal campaigns." },
    { title: "Auto Finance & Lease", desc: "Reach owners during the natural refinance and lease-end decision windows." },
    { title: "EV Conversion Programs", desc: "Target ICE owners by vehicle age and household demographics for EV consideration campaigns." },
];

export default function AutomotivePagePage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="B2C List"
      titlePlain="Automotive Consumer Data —"
      titleAccent="owners, buyers, service-loyal."
      description="Vehicle owners, in-market buyers, and service-loyal consumers across the United States — segmented by make, model year, ownership cycle, and purchase intent."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach drivers at the moments",
        headlineAccent: "that drive purchase response.",
        paragraphs: [
          "Automotive marketing fragments by make-model-year, ownership cycle, and life event — new-car launches, lease-end programs, service retention, and aftermarket all need different segmentation. Our Automotive file covers 180M+ US vehicle-owner records with the depth required for performance-driven campaigns.",
      "Whether you\u2019re running OEM acquisition, dealer service retention, aftermarket parts, insurance acquisition, or in-market lookalike programs — this is the file consumer auto marketers depend on.",
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
