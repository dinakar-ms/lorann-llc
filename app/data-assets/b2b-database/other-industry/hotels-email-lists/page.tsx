import LeafPage from "@/components/templates/LeafPage";
import { Award, Briefcase, Building, Mail, MapPin, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotels Email List · B2B Database — Lorann LLC",
  description:
    "US hotel owners, GMs, F&B leaders, and revenue management professionals across property classes.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Other Industry", href: "/data-assets/b2b-database/other-industry" },
      { label: "Hotels Email List" },
];

const STATS = [
  { label: "Total Records", value: "95K+" },
    { label: "Segmentation", value: "Property Class" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for deliverability and bounce control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Business Address", desc: "Full postal address for direct mail and field marketing." },
    { Icon: Building, title: "Firmographics", desc: "Industry, revenue, employee size, and HQ location." },
    { Icon: Briefcase, title: "Job Title & Role", desc: "Hospitality decision-maker targeting by function." },
    { Icon: Award, title: "Seniority", desc: "C-level, VP, Director, Manager, and Individual Contributor flags." },
    { Icon: RefreshCw, title: "Last Verified", desc: "Per-record verification timestamp for audit and freshness." },
    { Icon: ShieldCheck, title: "Opt-In Status", desc: "Compliance-aligned permission flags per channel." },
];

const USE_CASES = [
  { title: "Account-Based Marketing", desc: "Target named accounts with role-mapped contacts across decision-makers." },
    { title: "Outbound Prospecting", desc: "Build verified prospect lists for SDR teams and sales-led campaigns." },
    { title: "Industry Event Marketing", desc: "Promote conferences, webinars, and trade shows to vertical audiences." },
    { title: "Partner & Channel", desc: "Reach reseller, integrator, and channel partner ecosystems efficiently." },
    { title: "SaaS & Software", desc: "Connect with operational decision-makers for category-relevant software." },
    { title: "Industry Publications", desc: "Drive subscriptions and content distribution to qualified vertical audiences." },
];

export default function HotelsEmailListsPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Industry List"
      titlePlain="Hotels Email List —"
      titleAccent="owners, GMs, F&B leaders."
      description="Hotel decision-makers across owners, general managers, food and beverage leaders, and revenue management professionals across the US hospitality landscape."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach the right buyer in",
        headlineAccent: "hospitality.",
        paragraphs: [
          "Hospitality marketing requires precision by property class and management role. Independent boutiques, branded full-service, limited-service, and resort properties all have different buying committees. Our Hotels Email List spans property-level decision-makers across the US hospitality industry.",
      "Used by hotel technology platforms (PMS, RMS, distribution), F&B vendors, hospitality consultants, cleaning and amenity suppliers, and trade publications.",
        ],
      }}
      attributes={ATTRIBUTES}
      useCases={USE_CASES}
      compliance={{
        headline: "Compliance is built in, not bolted on.",
        body: "Every record carries opt-in status, source provenance, and channel-permission flags. Maintained under CAN-SPAM, GDPR, and CCPA frameworks — with licensing terms aligned to your campaign type.",
      }}
      backLink={{ label: "All Other Industry Lists", href: "/data-assets/b2b-database/other-industry" }}
    />
  );
}
