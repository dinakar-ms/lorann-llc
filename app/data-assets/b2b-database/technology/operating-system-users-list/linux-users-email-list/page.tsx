import LeafPage from "@/components/templates/LeafPage";
import { Award, Briefcase, Building, Cpu, Mail, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linux Users · Technology B2B Database — Lorann LLC",
  description:
    "Companies running Linux — verified user list with role, seniority, and firmographic depth.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "Operating System Users", href: "/data-assets/b2b-database/technology/operating-system-users-list" },
      { label: "Linux" },
];

const STATS = [
  { label: "Total Records", value: "320K+" },
    { label: "Segmentation", value: "Distribution & Scale" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for deliverability and bounce control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: Cpu, title: "Tech Stack", desc: "Confirmed use of Linux flagged at the company level." },
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

export default function LinuxUsersEmailListPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Technology List"
      titlePlain="Linux Users Email List —"
      titleAccent="open-source operating system."
      description="Linux-using companies and engineers — distribution-segmented (RHEL, Ubuntu, SUSE, Debian) and tagged by deployment context (server, container, embedded)."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach Linux users",
        headlineAccent: "with installed-base precision.",
        paragraphs: [
          "Linux marketing requires installed-base precision. Whether you\u2019re selling complementary tools, running a migration program, or targeting competitive displacement, the list needs to be platform-specific and role-aware.",
      "Our Linux user list is verified to the same standard as every Lorann file: monthly verification, opt-in compliant, and segmented by role and seniority across decision-making teams.",
        ],
      }}
      attributes={ATTRIBUTES}
      useCases={USE_CASES}
      compliance={{
        headline: "Compliance is built in, not bolted on.",
        body: "Every record carries opt-in status, source provenance, and channel-permission flags. Maintained under CAN-SPAM, GDPR, and CCPA frameworks — with licensing terms aligned to your campaign type.",
      }}
      backLink={{ label: "All Operating System Users Lists", href: "/data-assets/b2b-database/technology/operating-system-users-list" }}
    />
  );
}
