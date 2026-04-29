import LeafPage from "@/components/templates/LeafPage";
import { Award, Mail, MapPin, Phone, RefreshCw, ShieldCheck, Stethoscope, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiropractors Email Lists · Healthcare B2B Database — Lorann LLC",
  description:
    "US licensed chiropractors with practice and technique segmentation. Verified monthly.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Healthcare", href: "/data-assets/b2b-database/healthcare" },
      { label: "Chiropractors Email Lists" },
];

const STATS = [
  { label: "Total Records", value: "70K+" },
    { label: "Licensed", value: "100%" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for chiropractor contacts with bounce-rate control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Practice Address", desc: "Full postal address for direct mail and field-based programs." },
    { Icon: Stethoscope, title: "Specialty Code", desc: "Chiropractic technique focus segmentation tagged at record level." },
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

export default function ChiropractorsEmailListsPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Healthcare List"
      titlePlain="Chiropractors Email Lists —"
      titleAccent="licensed, practice-mapped."
      description="Licensed chiropractic practitioners across the US — with practice setting, technique focus, and credential details."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Targeted access to a specialty",
        headlineAccent: "with growing market share.",
        paragraphs: [
          "Chiropractic care is a high-growth specialty and a competitive marketing category for supplements, equipment, and practice software. Our Chiropractors Email Lists cover 70,000+ licensed practitioners with practice-setting and technique-focus segmentation.",
      "Built for nutraceutical and supplement marketing, treatment table and equipment vendors, chiropractic billing and EHR platforms, and continuing education programs.",
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
