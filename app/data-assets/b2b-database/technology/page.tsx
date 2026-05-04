import HubPage from "@/components/templates/HubPage";
import { Cpu, Database, HardDrive, Layers, Monitor, Network, Settings2, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology Lists · B2B Database — Lorann LLC",
  description:
    "Tech-stack-specific email lists across operating systems, ERP, CRM, DBMS, software, networking, and business technology — 40+ lists, verified monthly.",
};

export default function TechnologyHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology" },
      ]}
      kicker="Technology Lists"
      titlePlain="Tech-stack targeting,"
      titleAccent="the way enterprise software marketers buy."
      description="Forty-plus technology-specific email lists organized by platform and category — operating systems, ERP, CRM, DBMS, networking, and emerging business technology audiences."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All B2B Lists", href: "/data-assets/b2b-database" }}
      intro={{
        kicker: "Tech stack universe",
        headlinePlain: "Eight categories,",
        headlineAccent: "40+ platform-specific lists.",
        paragraphs: [
          "Technology marketing is fundamentally about targeting installed base — the buyers of competing platforms, the users of complementary tools, the integrators and partners around an ecosystem. Our Technology branch is built around exactly this segmentation logic.",
      "Every list within Technology is verified to the same standard, with technographic tags identifying confirmed platform usage at the company or contact level.",
        ],
      }}
      childrenSection={{
        kicker: "Technology Categories",
        titlePlain: "Eight branches,",
        titleAccent: "every major enterprise platform covered.",
        description: "Click a category to see all lists in that branch, with counts and segmentation options.",
        columns: 3,
        items: [
    { Icon: Monitor, title: "Operating System Users", desc: "Microsoft Windows, Linux, and Unix users — segmented by distribution and deployment scale.", href: "/data-assets/b2b-database/technology/operating-system-users-list" },
    { Icon: Database, title: "ERP Users", desc: "Eight ERP-specific lists — Epicor, IBM, Sage Timberline, BroadVision, and more.", href: "/data-assets/b2b-database/technology/erp-users-email-lists" },
    { Icon: Users, title: "CRM Users", desc: "Salesforce, Microsoft Dynamics, Siebel, OnContact, and other CRM platform user lists.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data" },
    { Icon: Network, title: "Network Users", desc: "Enterprise networking decision-makers across switching, routing, and SDN.", href: "/data-assets/b2b-database/technology/network-users-data-list" },
    { Icon: Cpu, title: "Software Email Lists", desc: "QuickBooks, VMware, Tableau, Esri, Cisco channel, and more — nine platform lists.", href: "/data-assets/b2b-database/technology/software-email-lists" },
    { Icon: HardDrive, title: "DBMS Users", desc: "MongoDB and IBM Db2 user lists — for data platform marketing programs.", href: "/data-assets/b2b-database/technology/dbms-users-email-data" },
    { Icon: Settings2, title: "Business Technology", desc: "3D printing, iOS development, enterprise databases, Google App Engine — emerging tech audiences.", href: "/data-assets/b2b-database/technology/business-technology-email-lists" },
    { Icon: Layers, title: "Groupware", desc: "Enterprise collaboration and groupware platform users across Lotus, Exchange, and SharePoint.", href: "/data-assets/b2b-database/technology/groupware-email-lists" },
        ],
      }}
    />
  );
}
