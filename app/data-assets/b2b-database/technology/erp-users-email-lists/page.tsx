import HubPage from "@/components/templates/HubPage";
import { Database } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP Users Email Lists · Technology B2B Database — Lorann LLC",
  description:
    "Eight ERP platform user lists — Epicor, IBM, Sage Timberline, BroadVision, and more.",
};

export default function ERPUsersHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "ERP Users" },
      ]}
      kicker="ERP Platforms"
      titlePlain="ERP users,"
      titleAccent="by platform."
      description="Eight platform-specific ERP user lists — Epicor, IBM, Sage Timberline, BroadVision, and more — for ERP migration, add-on, and competitive displacement campaigns."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
      intro={{
        kicker: "ERP segmentation",
        headlinePlain: "Eight ERP platforms,",
        headlineAccent: "user-level targeting.",
        paragraphs: [
          "ERP marketing is about installed-base targeting — platform-specific users for migration plays, add-on tools for existing platforms, and competitive displacement programs. Our ERP lists span eight platforms with verified user-level identification.",
      "Used by ERP migration consultants, complementary software vendors (CRM, BI, automation), system integrators, and partner channel programs.",
        ],
      }}
      childrenSection={{
        kicker: "ERP Platforms",
        titlePlain: "Eight platforms,",
        titleAccent: "targeted user lists for each.",
        description: "None",
        columns: 3,
        items: [
    { Icon: Database, title: "BroadVision ERP", desc: "Companies running BroadVision ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/broadvision-erp-users-lists" },
    { Icon: Database, title: "Epicor ERP", desc: "Companies running Epicor ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/epicor-erp-users-list" },
    { Icon: Database, title: "Unleashed Software ERP", desc: "Companies running Unleashed Software ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/unleashed-software-erp-users-lists" },
    { Icon: Database, title: "Timberline ERP (Sage 300 Construction)", desc: "Companies running Timberline ERP (Sage 300 Construction) — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/timberline-erp-users-mailing-list" },
    { Icon: Database, title: "Upside Software ERP", desc: "Companies running Upside Software ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/upside-software-erp-users-lists" },
    { Icon: Database, title: "i4a ERP", desc: "Companies running i4a ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/i4a-erp-users-lists" },
    { Icon: Database, title: "IBM ERP", desc: "Companies running IBM ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/ibm-erp-users-lists" },
    { Icon: Database, title: "IBS Enterprise ERP", desc: "Companies running IBS Enterprise ERP — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/erp-users-email-lists/ibs-enterprise-erp-users-lists" },
        ],
      }}
    />
  );
}
