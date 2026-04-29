import HubPage from "@/components/templates/HubPage";
import { Settings2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Technology Email Lists · Technology B2B Database — Lorann LLC",
  description:
    "Emerging-technology user lists — 3D printing, iOS development, enterprise databases, and Google App Engine.",
};

export default function BusinessTechnologyHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "Business Technology" },
      ]}
      kicker="Business Technology"
      titlePlain="Emerging technology audiences,"
      titleAccent="four targeted lists."
      description="Audiences across emerging technology categories — 3D printing, iOS development, enterprise databases, and Google App Engine."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
      intro={{
        kicker: "Tech segmentation",
        headlinePlain: "Four lists,",
        headlineAccent: "emerging-technology depth.",
        paragraphs: [
          "Business technology marketing covers categories that are growing fast but don't fit neatly into traditional ERP/CRM/database buckets. 3D printing operators, iOS developers, broad-database users, and Google App Engine builders each represent unique B2B audiences.",
      "Used by category-specific software, hardware, services, and channel partner programs targeting these emerging audiences.",
        ],
      }}
      childrenSection={{
        kicker: "Business Tech Categories",
        titlePlain: "Four categories,",
        titleAccent: "targeted user lists.",
        description: "None",
        columns: 2,
        items: [
    { Icon: Settings2, title: "3D printing / additive manufacturing", desc: "Audiences using or building on 3D printing / additive manufacturing — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/business-technology-email-lists/3d-printing-industry-email-list" },
    { Icon: Settings2, title: "Apple iOS development", desc: "Audiences using or building on Apple iOS development — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/business-technology-email-lists/apple-ios-developers-email-list" },
    { Icon: Settings2, title: "Enterprise databases (broad)", desc: "Audiences using or building on Enterprise databases (broad) — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/business-technology-email-lists/database-users-mailing-lists" },
    { Icon: Settings2, title: "Google App Engine", desc: "Audiences using or building on Google App Engine — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/business-technology-email-lists/google-app-engine-users-email-list" },
        ],
      }}
    />
  );
}
