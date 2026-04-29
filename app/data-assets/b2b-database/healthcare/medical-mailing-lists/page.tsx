import LeafPage from "@/components/templates/LeafPage";
import { Award, Mail, MapPin, Phone, RefreshCw, ShieldCheck, Stethoscope, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Mailing Lists · Healthcare B2B Database — Lorann LLC",
  description:
    "Comprehensive US medical practitioner mailing lists across primary care, internal medicine, and clinical staff — verified monthly.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Healthcare", href: "/data-assets/b2b-database/healthcare" },
      { label: "Medical Mailing Lists" },
];

const STATS = [
  { label: "Total Records", value: "1.5M+" },
    { label: "Specialties", value: "40+" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for practitioner contacts with bounce-rate control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Practice Address", desc: "Full postal address for direct mail and field-based programs." },
    { Icon: Stethoscope, title: "Specialty Code", desc: "Primary care and clinical segmentation tagged at record level." },
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

export default function MedicalMailingListsPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Healthcare List"
      titlePlain="Medical Mailing Lists —"
      titleAccent="general practitioners and clinical staff."
      description="Comprehensive medical mailing lists covering general practitioners, internists, family medicine providers, and clinical staff across all care settings."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "The broadest medical practitioner file",
        headlineAccent: "we maintain.",
        paragraphs: [
          "When a campaign needs the widest reach across general medical practitioners — internists, family medicine, GPs, and clinical staff — this is the file. 1.5 million+ practitioner-level records with full postal address, verified email, and direct phone where consented.",
      "Built for healthcare publishers, medical product launches, condition-management campaigns, and direct mail programs that need broad practitioner coverage.",
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
