import LeafPage from "@/components/templates/LeafPage";
import { Award, Briefcase, Building, Cpu, Mail, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise networking Users · Technology B2B Database — Lorann LLC",
  description:
    "Companies running Enterprise networking — verified user list with role, seniority, and firmographic depth.",
};

const CRUMBS = [
  { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "Enterprise networking" },
];

const STATS = [
  { label: "Total Records", value: "180K+" },
    { label: "Segmentation", value: "Role · Seniority" },
    { label: "Verification", value: "Monthly" },
    { label: "Coverage", value: "All 50 States" },
];

const ATTRIBUTES = [
  { Icon: Mail, title: "Verified Email", desc: "Continuously validated email for deliverability and bounce control." },
    { Icon: Phone, title: "Direct Phone", desc: "Office and direct lines where consent permits." },
    { Icon: Cpu, title: "Tech Stack", desc: "Confirmed use of Enterprise networking flagged at the company level." },
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

export default function NetworkUsersDataListPage() {
  return (
    <LeafPage
      crumbs={CRUMBS}
      kicker="Technology List"
      titlePlain="Network Users —"
      titleAccent="enterprise networking decision-makers."
      description="Enterprise networking decision-makers across switching, routing, SD-WAN, and SDN platforms — built for network infrastructure and security marketing."
      stats={STATS}
      intro={{
        kicker: "Why this list",
        headlinePlain: "Reach Enterprise networking users",
        headlineAccent: "with installed-base precision.",
        paragraphs: [
          "Network infrastructure marketing reaches a tight buying committee — network architects, network operations leads, security architects, and infrastructure VPs. Our Network Users list spans these roles across enterprise and large mid-market organizations.",
      "Used by network equipment vendors, network security marketers, monitoring and observability platforms, SD-WAN providers, and network services consultants.",
        ],
      }}
      attributes={ATTRIBUTES}
      useCases={USE_CASES}
      compliance={{
        headline: "Compliance is built in, not bolted on.",
        body: "Every record carries opt-in status, source provenance, and channel-permission flags. Maintained under CAN-SPAM, GDPR, and CCPA frameworks — with licensing terms aligned to your campaign type.",
      }}
      backLink={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
    />
  );
}
