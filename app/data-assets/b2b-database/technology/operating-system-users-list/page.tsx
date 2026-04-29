import HubPage from "@/components/templates/HubPage";
import { Monitor } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operating System Users List · Technology B2B Database — Lorann LLC",
  description:
    "Companies running Windows, Linux, and Unix — segmented by distribution and deployment scale.",
};

export default function OperatingSystemUsersHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Technology", href: "/data-assets/b2b-database/technology" },
      { label: "Operating System Users" },
      ]}
      kicker="Operating Systems"
      titlePlain="Operating system users,"
      titleAccent="by platform and deployment scale."
      description="Companies running Windows, Linux, and Unix-family operating systems — segmented by distribution, deployment context, and infrastructure scale."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All Technology Lists", href: "/data-assets/b2b-database/technology" }}
      intro={{
        kicker: "OS segmentation",
        headlinePlain: "Three platforms,",
        headlineAccent: "three different buyer profiles.",
        paragraphs: [
          "Operating system marketing depends on platform context — Windows-heavy environments respond differently than Linux server estates, and enterprise Unix is its own world. Our OS lists segment companies by platform with deployment-scale tagging.",
      "Used by infrastructure software vendors, security platform marketers, monitoring and observability tools, and channel partner ecosystems.",
        ],
      }}
      childrenSection={{
        kicker: "Operating Systems",
        titlePlain: "Three platforms,",
        titleAccent: "distinct buyer audiences.",
        description: "None",
        columns: 3,
        items: [
    { Icon: Monitor, title: "Microsoft Windows", desc: "Companies running Microsoft Windows operating systems — segmented by deployment scale, industry, and supporting Microsoft stack components.", href: "/data-assets/b2b-database/technology/operating-system-users-list/ms-customers-list" },
    { Icon: Monitor, title: "Linux", desc: "Linux-using companies and engineers — distribution-segmented (RHEL, Ubuntu, SUSE, Debian) and tagged by deployment context (server, container, embedded).", href: "/data-assets/b2b-database/technology/operating-system-users-list/linux-users-email-list" },
    { Icon: Monitor, title: "Unix", desc: "Companies running enterprise Unix variants — AIX, Solaris, HP-UX — typically large-enterprise installations across financial services, telco, and manufacturing.", href: "/data-assets/b2b-database/technology/operating-system-users-list/unix-users-mailing-data" },
        ],
      }}
    />
  );
}
