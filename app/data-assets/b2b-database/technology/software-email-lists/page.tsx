import HubPage from "@/components/templates/HubPage";
import { Cpu } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Email Lists · Technology B2B Database — Lorann LLC",
  description:
    "Nine software platform user lists — QuickBooks, VMware, Tableau, Esri, Cisco, and more.",
};

export default function SoftwareEmailListsHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "Software Email Lists" },
      ]}
      kicker="Software Platforms"
      titlePlain="Software users,"
      titleAccent="by platform."
      description="Nine platform-specific software user lists — QuickBooks, VMware, Tableau, Esri, Cisco channel, and more — for installed-base and competitive marketing programs."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
      intro={{
        kicker: "Software segmentation",
        headlinePlain: "Nine platforms,",
        headlineAccent: "user-level targeting.",
        paragraphs: [
          "Software marketing is fundamentally about platform context. The right complementary tool, integration, or alternative offering only resonates with users of a specific platform. Our Software lists span nine high-volume enterprise platforms.",
      "Used by integration software vendors, alternative platform marketers, training and certification programs, and platform-specific consultants and resellers.",
        ],
      }}
      childrenSection={{
        kicker: "Software Platforms",
        titlePlain: "Nine platforms,",
        titleAccent: "installed-base lists.",
        description: "None",
        columns: 3,
        items: [
    { Icon: Cpu, title: "Intuit QuickBooks", desc: "Companies using Intuit QuickBooks — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/quickbooks-email-list" },
    { Icon: Cpu, title: "VMware", desc: "Companies using VMware — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/vmware-users-email-list" },
    { Icon: Cpu, title: "TIBCO Software", desc: "Companies using TIBCO Software — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/tibco-user-email-list" },
    { Icon: Cpu, title: "Tableau", desc: "Companies using Tableau — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/tableau-users-list" },
    { Icon: Cpu, title: "PLM Software (PTC, Siemens, Dassault)", desc: "Companies using PLM Software (PTC, Siemens, Dassault) — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/plm-software-user-list" },
    { Icon: Cpu, title: "Esri ArcGIS", desc: "Companies using Esri ArcGIS — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/esri-mailing-list" },
    { Icon: Cpu, title: "Cogz CMMS", desc: "Companies using Cogz CMMS — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/cogz-cmms-contact-database" },
    { Icon: Cpu, title: "Paycom", desc: "Companies using Paycom — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/paycom-users-lists" },
    { Icon: Cpu, title: "Cisco channel", desc: "Companies using Cisco channel — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/software-email-lists/cisco-resellers-email-database" },
        ],
      }}
    />
  );
}
