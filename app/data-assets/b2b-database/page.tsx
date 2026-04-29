import HubPage from "@/components/templates/HubPage";
import {
  Activity,
  Cpu,
  Factory,
  Briefcase,
  ShieldCheck,
  Globe,
  BarChart3,
  Mail,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Database · Lorann LLC",
  description:
    "Targeted B2B email lists across Healthcare, Technology, and 10+ industries — built for prospecting, ABM, and enterprise outreach.",
};

export default function B2BDatabasePage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Data Assets", href: "/data-assets" },
        { label: "B2B Database" },
      ]}
      kicker="B2B Database"
      titlePlain="Reach decision-makers across"
      titleAccent="every industry that matters."
      description="A comprehensive B2B contact universe — segmented by Healthcare, Technology, and 10+ vertical industries — designed for prospecting, account-based marketing, and full-funnel outreach."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "View Data Cards", href: "/data-assets/data-cards" }}
      intro={{
        kicker: "The B2B universe",
        headlinePlain: "Three category branches.",
        headlineAccent: "One verified contact universe.",
        paragraphs: [
          "Whether you\u2019re reaching practising physicians, IT decision-makers running a specific software stack, or hard-to-find vertical buyers in agriculture or manufacturing — the B2B Database is structured around the way enterprise marketers actually plan their campaigns.",
          "Every record is verified monthly, deliverability-tested, and activation-ready across email, postal, and outbound telemarketing channels.",
        ],
      }}
      childrenSection={{
        kicker: "Explore By Branch",
        titlePlain: "Three categories,",
        titleAccent: "90+ targetable lists.",
        description:
          "Each branch organises lists the way buyers actually segment — by specialty, by tech stack, or by industry vertical.",
        columns: 3,
        items: [
          {
            Icon: Activity,
            title: "Healthcare",
            desc: "12 specialty-driven lists covering physicians, hospitals, surgeons, dentists, pharmacists, nurses, and allied healthcare professionals.",
            href: "/data-assets/b2b-database/healthcare",
            badge: "12 lists",
          },
          {
            Icon: Cpu,
            title: "Technology",
            desc: "Tech-stack and software-user lists across operating systems, ERP, CRM, DBMS, networks, and business technology platforms.",
            href: "/data-assets/b2b-database/technology",
            badge: "40+ lists",
          },
          {
            Icon: Factory,
            title: "Other Industry",
            desc: "Vertical-specific B2B audiences spanning construction, agriculture, banking, hospitality, real estate, manufacturing, and more.",
            href: "/data-assets/b2b-database/other-industry",
            badge: "10 lists",
          },
        ],
      }}
      attributesSection={{
        kicker: "What You Get",
        titlePlain: "Eight ways our B2B database",
        titleAccent: "drives campaign results.",
        columns: 4,
        items: [
          { Icon: Briefcase, title: "Contact-Level Data", desc: "Name, title, email, direct line — verified monthly." },
          { Icon: BarChart3, title: "Firmographics", desc: "Industry, revenue, employee size, and HQ location." },
          { Icon: Cpu, title: "Technographics", desc: "Installed software, tech stack, and adoption signals." },
          { Icon: Globe, title: "Global Coverage", desc: "US core with international coverage available on request." },
          { Icon: Mail, title: "Email-Deliverable", desc: "Continuously validated for high deliverability rates." },
          { Icon: ShieldCheck, title: "Compliance-Ready", desc: "GDPR, CAN-SPAM, and CCPA-aligned data governance." },
          { Icon: Activity, title: "Multi-Channel", desc: "Activate across postal, email, and outbound telemarketing." },
          { Icon: Factory, title: "Vertical Depth", desc: "Built for both broad reach and niche targeting." },
        ],
      }}
    />
  );
}
