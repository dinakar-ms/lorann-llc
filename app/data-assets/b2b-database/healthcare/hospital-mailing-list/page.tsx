import LeafPage from "@/components/templates/LeafPage";
import { Award, Mail, MapPin, Phone, RefreshCw, ShieldCheck, Stethoscope, Target } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Mailing List · Healthcare B2B Database — Lorann LLC",
  description:
    "Decision-makers across 6,500+ US hospitals — segmented by role, department, and ownership type. Verified monthly.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Healthcare", href: "/data-assets/b2b-database/healthcare" },
      { label: "Hospital Mailing List" },
];

const STATS = [
  { label: "Hospitals", value: "6,500+" },
    { label: "Decision-Makers", value: "180K+" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for hospital contacts with bounce-rate control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: MapPin, title: "Practice Address", desc: "Full postal address for direct mail and field-based programs." },
    { Icon: Stethoscope, title: "Specialty Code", desc: "Role and department segmentation tagged at record level." },
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

export default function HospitalMailingListPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Healthcare List"
      titlePlain="Hospital Mailing List —"
      titleAccent="decision-makers, by department."
      description="Hospital decision-makers segmented by role and department — administrators, department heads, procurement, IT, and clinical leadership across US health systems."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach the right decision-maker",
        headlineAccent: "in the right department.",
        paragraphs: [
          "Hospital marketing only works if you know who decides — and decision-making varies wildly by department, hospital size, and ownership type. Our Hospital Mailing List covers 6,500+ US hospitals with 180,000+ named decision-makers segmented by role and department.",
      "Built for medical device, hospital IT, healthcare consulting, GPO contracting, capital equipment, and clinical product marketing programs.",
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
