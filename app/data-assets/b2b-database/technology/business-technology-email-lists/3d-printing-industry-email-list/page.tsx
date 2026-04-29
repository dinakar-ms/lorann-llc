import LeafPage from "@/components/templates/LeafPage";
import { Award, Briefcase, Building, Cpu, Mail, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D printing / additive manufacturing Users · Technology B2B Database — Lorann LLC",
  description:
    "Companies running 3D printing / additive manufacturing — verified user list with role, seniority, and firmographic depth.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "Business Technology", href: "/data-assets/b2b-database/technology/business-technology-email-lists" },
      { label: "3D printing / additive manufacturing" },
];

const STATS = [
  { label: "Total Records", value: "25K+" },
    { label: "Segmentation", value: "Role · Seniority" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for deliverability and bounce control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: Cpu, title: "Tech Stack", desc: "Confirmed use of 3D printing / additive manufacturing flagged at the company level." },
    { Icon: Building, title: "Firmographics", desc: "Industry, revenue, employee size, and HQ location." },
    { Icon: Briefcase, title: "Job Title & Role", desc: "Decision-maker targeting by function and seniority." },
    { Icon: Award, title: "Seniority", desc: "C-level, VP, Director, Manager, and Individual Contributor flags." },
    { Icon: RefreshCw, title: "Last Verified", desc: "Per-record verification timestamp for audit and freshness." },
    { Icon: ShieldCheck, title: "Opt-In Status", desc: "Compliance-aligned permission flags per channel." },
];

const USE_CASES = [
  { title: "Competitive Displacement", desc: "Target users of competing platforms with switch-and-save and migration messaging." },
    { title: "Add-On & Integration", desc: "Reach existing platform users with complementary tools and integration offers." },
    { title: "Partner & Channel", desc: "Connect with installed-base reseller and integrator ecosystems." },
    { title: "Training & Certification", desc: "Promote certifications and training programs to platform-using practitioners." },
    { title: "Migration & Modernisation", desc: "Reach legacy platform users with cloud and modernisation programs." },
    { title: "Industry Events", desc: "Drive registration to platform-specific user conferences and trade shows." },
];

export default function ThreeDPrintingIndustryEmailListPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Technology List"
      titlePlain="3D printing / additive manufacturing —"
      titleAccent="business technology user list."
      description="Companies running 3D printing / additive manufacturing across the United States — verified email contacts with role, seniority, and firmographic depth for installed-base and competitive marketing campaigns."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach 3D printing / additive manufacturing users",
        headlineAccent: "with installed-base precision.",
        paragraphs: [
          "3D printing / additive manufacturing marketing requires installed-base precision. Whether you\u2019re selling complementary tools, running a migration program, or targeting competitive displacement, the list needs to be platform-specific and role-aware.",
      "Our 3D printing / additive manufacturing user list is verified to the same standard as every Lorann file: monthly verification, opt-in compliant, and segmented by role and seniority across decision-making teams.",
        ],
      }}
      attributes={ATTRIBUTES}
      useCases={USE_CASES}
      compliance={{
        headline: "Compliance is built in, not bolted on.",
        body: "Every record carries opt-in status, source provenance, and channel-permission flags. Maintained under CAN-SPAM, GDPR, and CCPA frameworks — with licensing terms aligned to your campaign type.",
      }}
      backLink={{ label: "All Business Technology Lists", href: "/data-assets/b2b-database/technology/business-technology-email-lists" }}
    />
  );
}
