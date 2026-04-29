import LeafPage from "@/components/templates/LeafPage";
import { Award, Mail, MapPin, Phone, RefreshCw, ShieldCheck, Stethoscope, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physician Email Lists · Healthcare B2B Database — Lorann LLC",
  description:
    "Specialty-segmented physician email contacts across the US — verified monthly, opt-in compliant, and activation-ready for pharma, medical device, and CME campaigns.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Healthcare", href: "/data-assets/b2b-database/healthcare" },
      { label: "Physician Email Lists" },
];

const STATS = [
  { label: "Total Records", value: "1.2M+" },
    { label: "Specialties", value: "60+" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for physician contacts with bounce-rate control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Practice Address", desc: "Full postal address for direct mail and field-based programs." },
    { Icon: Stethoscope, title: "Specialty Code", desc: "Primary and sub-specialty segmentation tagged at record level." },
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

export default function PhysicianEmailListsPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Healthcare List"
      titlePlain="Physician Email Lists —"
      titleAccent="specialty-segmented, verified."
      description="Physician email contacts segmented by primary and secondary specialty — built for pharma brand teams, medical device marketers, CME providers, and clinical trial recruitment."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Specialty-level targeting that matches",
        headlineAccent: "how brand teams plan campaigns.",
        paragraphs: [
          "Physician marketing only works when the list is segmented the way brand teams actually plan — by specialty, sub-specialty, and practice setting. Our Physician Email Lists cover over 1.2 million practising MDs and DOs in the United States with the depth required for therapy-area targeting.",
      "Use the list for pharma brand outreach, medical device launches, accredited CME programs, peer-to-peer marketing, and clinical trial recruitment campaigns at scale.",
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
