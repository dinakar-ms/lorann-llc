import LeafPage from "@/components/templates/LeafPage";
import { Award, Mail, MapPin, Phone, RefreshCw, ShieldCheck, Stethoscope, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "US Pharmacist Email List · Healthcare B2B Database — Lorann LLC",
  description:
    "Practising US pharmacists across retail, hospital, specialty, and compounding settings — verified monthly with practice-setting segmentation.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Healthcare", href: "/data-assets/b2b-database/healthcare" },
      { label: "Us Pharmacist Email List" },
];

const STATS = [
  { label: "Total Records", value: "320K+" },
    { label: "Setting Types", value: "5+" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for pharmacist contacts with bounce-rate control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Practice Address", desc: "Full postal address for direct mail and field-based programs." },
    { Icon: Stethoscope, title: "Specialty Code", desc: "Pharmacy practice setting segmentation tagged at record level." },
    { Icon: Award, title: "Credentials", desc: "Licensure, board certification, and credential-state details." },
    { Icon: Target, title: "Practice Type", desc: "Solo, group, hospital-employed, academic, or specialty clinic." },
    { Icon: RefreshCw, title: "Last Verified", desc: "Per-record verification timestamp for audit and freshness." },
    { Icon: ShieldCheck, title: "Opt-In Status", desc: "Compliance-aligned permission flags per channel." },
];

const USE_CASES = [
  { title: "Pharma Brand Outreach", desc: "Reach prescribers in target therapy areas with HCP-compliant messaging across email and direct mail." },
    { title: "Medical Device Campaigns", desc: "Target practitioners and procedure-specific specialists with the practice-type filters that matter." },
    { title: "CME & Educational Content", desc: "Promote accredited courses, webinars, and clinical content to relevant specialty audiences." },
    { title: "Clinical Trial Recruitment", desc: "Identify principal investigators and referring physicians by specialty and geography." },
    { title: "Healthcare SaaS & EHR", desc: "Reach independent practices and facility-based providers with role-specific value props." },
    { title: "Recruitment & Locums", desc: "Connect with credentialed providers by license state, specialty, and practice setting." },
];

export default function USPharmacistEmailListPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Healthcare List"
      titlePlain="US Pharmacist Email List —"
      titleAccent="retail, hospital, and specialty."
      description="Verified email addresses of practising pharmacists across retail, hospital, specialty, and compounding settings throughout the United States."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach pharmacists by setting,",
        headlineAccent: "geography, and credential.",
        paragraphs: [
          "Pharmacist marketing requires segmentation by practice setting — retail chain, independent, hospital, specialty, compounding, and long-term care all behave differently. Our US Pharmacist Email List covers 320,000+ verified contacts with practice-setting tags built in.",
      "Ideal for pharma trade marketing, OTC product launches, pharmacy software, continuing pharmacy education, and procurement-targeting programs.",
        ],
      }}
      attributes={ATTRIBUTES}
      useCases={USE_CASES}
      compliance={{
        headline: "Compliance is built in, not bolted on.",
        body: "Every record carries opt-in status, source provenance, and channel-permission flags. We maintain governance under CAN-SPAM, GDPR, and CCPA frameworks — and licensing terms are aligned to your campaign type.",
      }}
      backLink={{ label: "All Healthcare Lists", href: "/data-assets/b2b-database/healthcare" }}
    />
  );
}
