import HubPage from "@/components/templates/HubPage";
import { Banknote, BedDouble, Building, Cpu, Factory, HardHat, Plane, ShieldCheck, Trophy, Wheat } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Other Industry Lists · B2B Database — Lorann LLC",
  description:
    "Ten vertical-industry email lists covering construction, agriculture, banking, hospitality, insurance, manufacturing, and more — verified monthly.",
};

export default function OtherIndustryHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
      { label: "Data Assets", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "Other Industry" },
      ]}
      kicker="Vertical Industry Lists"
      titlePlain="Reach decision-makers in"
      titleAccent="every industry that matters."
      description="Ten vertical-industry email lists covering construction, agriculture, banking, hospitality, insurance, manufacturing, and more — built for ABM, prospecting, and account development across high-value B2B verticals."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All B2B Lists", href: "/data-assets/b2b-database" }}
      intro={{
        kicker: "Industry coverage",
        headlinePlain: "Ten vertical files,",
        headlineAccent: "all built the same way.",
        paragraphs: [
          "Some industries don't fit neatly into Healthcare or Technology — but they spend heavily on B2B marketing. Construction, agriculture, banking, hospitality, and the rest of the verticals here represent some of the largest and most segmentation-hungry B2B audiences in the US.",
      "Every list is built to the same standard: verified contacts, named decision-makers, role-and-seniority tagging, and continuous monthly verification.",
        ],
      }}
      childrenSection={{
        kicker: "Industry Verticals",
        titlePlain: "Ten verticals,",
        titleAccent: "ten ways to reach the right buyer.",
        description: "Click a vertical to see the full list page, segmentation options, and counts.",
        columns: 3,
        items: [
    { Icon: Cpu, title: "IT Decision Makers", desc: "CIOs, CISOs, IT Directors, and infrastructure leaders across enterprise, mid-market, and SMB.", href: "/data-assets/b2b-database/other-industry/it-decision-makers-mailing-list" },
    { Icon: HardHat, title: "Construction", desc: "General contractors, subs, and decision-makers across residential, commercial, and infrastructure.", href: "/data-assets/b2b-database/other-industry/construction-industry-email-list" },
    { Icon: Wheat, title: "Agriculture", desc: "Farm operators, agribusiness, and ag-tech buyers across crop and livestock segments.", href: "/data-assets/b2b-database/other-industry/agriculture-industry-email-lists" },
    { Icon: Trophy, title: "Sports Industry", desc: "Decision-makers at professional teams, leagues, college athletics, and sports vendors.", href: "/data-assets/b2b-database/other-industry/sports-industry-email-lists" },
    { Icon: Banknote, title: "Banking & Finance", desc: "Banks, credit unions, capital markets, asset management, and fintech decision-makers.", href: "/data-assets/b2b-database/other-industry/banking-finance-email-lists" },
    { Icon: BedDouble, title: "Hotels", desc: "Hotel owners, GMs, F&B leaders, and revenue management across the US hospitality landscape.", href: "/data-assets/b2b-database/other-industry/hotels-email-lists" },
    { Icon: ShieldCheck, title: "Insurance", desc: "Carriers, brokers, MGAs, and agents across P&C, life, health, and specialty lines.", href: "/data-assets/b2b-database/other-industry/insurance-contact-lists" },
    { Icon: Plane, title: "Travel Industry", desc: "Travel agencies, OTAs, tour operators, DMCs, and travel suppliers segmented by tier.", href: "/data-assets/b2b-database/other-industry/travel-data-lists" },
    { Icon: Building, title: "Real Estate (B2B)", desc: "Brokerages, developers, property managers, and institutional investors.", href: "/data-assets/b2b-database/other-industry/real-estate-data-list" },
    { Icon: Factory, title: "Manufacturing", desc: "Discrete and process manufacturing decision-makers across operations, supply chain, and engineering.", href: "/data-assets/b2b-database/other-industry/manufacturing-industry-email-lists" },
        ],
      }}
    />
  );
}
