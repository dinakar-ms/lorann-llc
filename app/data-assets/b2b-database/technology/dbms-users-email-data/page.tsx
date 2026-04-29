import HubPage from "@/components/templates/HubPage";
import { HardDrive } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DBMS Users Email Data · Technology B2B Database — Lorann LLC",
  description:
    "MongoDB and IBM Db2 database platform user lists — for data platform and modernisation marketing.",
};

export default function DBMSUsersHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "DBMS Users" },
      ]}
      kicker="Database Platforms"
      titlePlain="DBMS users,"
      titleAccent="by platform."
      description="Database platform user lists for MongoDB and IBM Db2 — built for data platform marketing, observability, and database modernisation programs."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
      intro={{
        kicker: "DBMS segmentation",
        headlinePlain: "Two platforms,",
        headlineAccent: "installed-base targeting.",
        paragraphs: [
          "Database technology marketing is one of the most technographic-heavy verticals — the platform a company runs determines almost every adjacent buying decision. Our DBMS lists target users of MongoDB and IBM Db2 directly.",
      "Used by data platform vendors, database observability tools, modernisation services, and complementary tooling marketers.",
        ],
      }}
      childrenSection={{
        kicker: "Database Platforms",
        titlePlain: "Two platforms,",
        titleAccent: "targeted user lists.",
        description: "None",
        columns: 2,
        items: [
    { Icon: HardDrive, title: "MongoDB", desc: "Companies running MongoDB — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/dbms-users-email-data/mongodb-users-list" },
    { Icon: HardDrive, title: "IBM Db2 / IBM Database", desc: "Companies running IBM Db2 / IBM Database — verified user lists with role and firmographic depth.", href: "/data-assets/b2b-database/technology/dbms-users-email-data/ibm-users-email-list" },
        ],
      }}
    />
  );
}
