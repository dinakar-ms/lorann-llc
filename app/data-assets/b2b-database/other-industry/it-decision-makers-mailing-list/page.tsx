import LeafPage from "@/components/templates/LeafPage";
import { Award, Briefcase, Building, Mail, MapPin, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Decision Makers · B2B Database — Lorann LLC",
  description:
    "CIOs, CISOs, IT Directors, and infrastructure decision-makers across US enterprise, mid-market, and SMB organizations.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Other Industry", href: "/data-assets/b2b-database/other-industry" },
      { label: "IT Decision Makers" },
];

const STATS = [
  { label: "Total Records", value: "1.4M+" },
    { label: "Segmentation", value: "All Verticals" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for deliverability and bounce control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Business Address", desc: "Full postal address for direct mail and field marketing." },
    { Icon: Building, title: "Firmographics", desc: "Industry, revenue, employee size, and HQ location." },
    { Icon: Briefcase, title: "Job Title & Role", desc: "Technology decision-maker targeting by function." },
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

export default function ITDecisionMakersMailingListPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Industry List"
      titlePlain="IT Decision Makers —"
      titleAccent="across every vertical."
      description="Verified IT decision-makers — CIOs, CISOs, IT Directors, and infrastructure leaders — across enterprise, mid-market, and SMB organizations."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach the right buyer in",
        headlineAccent: "technology.",
        paragraphs: [
          "IT marketing only works when you reach the actual buyer — not just any IT employee. Our IT Decision Makers Mailing List is built around named buying committee roles across CIO, CISO, VP of IT, IT Director, and infrastructure-line leadership.",
      "Used by enterprise software vendors, cybersecurity marketers, cloud platform partners, IT services firms, and B2B publishers serving the technology buying audience.",
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
