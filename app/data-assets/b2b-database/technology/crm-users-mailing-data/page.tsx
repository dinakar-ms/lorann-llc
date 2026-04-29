import HubPage from "@/components/templates/HubPage";
import { Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM Users Mailing Data · Technology B2B Database — Lorann LLC",
  description:
    "Eight CRM platform user lists — Salesforce, Dynamics, Siebel, OnContact, and more.",
};

export default function CRMUsersHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "CRM Users" },
      ]}
      kicker="CRM Platforms"
      titlePlain="CRM users,"
      titleAccent="by platform."
      description="Eight CRM platform user lists — Salesforce, Microsoft Dynamics, Siebel, OnContact, and more — for migration, add-on, and competitive displacement campaigns."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
      intro={{
        kicker: "CRM segmentation",
        headlinePlain: "Eight CRM platforms,",
        headlineAccent: "user-level targeting.",
        paragraphs: [
          "CRM is the highest-volume technology category for installed-base marketing. Companies invest heavily in their CRM and the surrounding ecosystem — sales engagement, RevOps tools, marketing automation, and customer data platforms all target CRM users by platform.",
      "Used by RevOps software vendors, sales engagement platforms, marketing automation marketers, CRM consultants, and CRM channel partners.",
        ],
      }}
      childrenSection={{
        kicker: "CRM Platforms",
        titlePlain: "Eight platforms,",
        titleAccent: "installed-base lists for each.",
        description: "None",
        columns: 3,
        items: [
    { Icon: Users, title: "Achiever CRM", desc: "Companies running Achiever CRM — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/achiever-crm-users-lists" },
    { Icon: Users, title: "Acqueon CRM", desc: "Companies running Acqueon CRM — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/acqueon-crm-users-lists" },
    { Icon: Users, title: "CRM Solutions", desc: "Companies running CRM Solutions — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/crm-solutions-users-email-lists" },
    { Icon: Users, title: "CRM Users", desc: "Companies running CRM Users — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/crm-users-mailing-data-detail" },
    { Icon: Users, title: "Microsoft Dynamics CRM", desc: "Companies running Microsoft Dynamics CRM — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/microsoft-dynamics-crm-users-mailing-list" },
    { Icon: Users, title: "Salesforce CRM", desc: "Companies running Salesforce CRM — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/salesforce-crm-email-list" },
    { Icon: Users, title: "OnContact CRM", desc: "Companies running OnContact CRM — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/oncontact-crm-customers-email-list" },
    { Icon: Users, title: "Siebel CRM (Oracle)", desc: "Companies running Siebel CRM (Oracle) — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/siebel-crm-users-list" },
        ],
      }}
    />
  );
}
