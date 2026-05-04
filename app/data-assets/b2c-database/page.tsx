import HubPage from "@/components/templates/HubPage";
import {
  Home,
  Car,
  Users,
  ShieldCheck,
  Mail,
  Globe,
  BarChart3,
  Target,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2C Database · Lorann LLC",
  description:
    "Consumer email and direct marketing audiences across Real Estate and Automotive — built for high-engagement direct response campaigns.",
};

export default function B2CDatabasePage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Data Assets", href: "/data-assets" },
        { label: "B2C Database" },
      ]}
      kicker="B2C Database"
      titlePlain="Reach the right consumers —"
      titleAccent="at the right life moment."
      description="Behavioral, lifestyle, and demographic consumer audiences engineered for direct response, retention, and acquisition campaigns across Real Estate and Automotive verticals."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "View Data Cards", href: "/data-assets/data-cards" }}
      intro={{
        kicker: "The B2C universe",
        headlinePlain: "Two consumer verticals.",
        headlineAccent: "Built for direct response.",
        paragraphs: [
          "Our B2C audiences are organized around the moments where consumer intent and marketing budget actually meet — homeownership, mortgage activity, vehicle purchase cycles, and lifestyle behaviors that drive response.",
          "Every record is consumer-permissioned, multi-channel-ready, and built for the volume and segmentation that direct-response and CRM teams require.",
        ],
      }}
      childrenSection={{
        kicker: "Explore By Vertical",
        titlePlain: "Two consumer audiences,",
        titleAccent: "one performance file.",
        description:
          "Each vertical is built around the segmentation, life-moment, and Behavioral attributes marketers need to drive measurable response.",
        columns: 2,
        items: [
          {
            Icon: Home,
            title: "Real Estate",
            desc: "Homeowners, recent movers, mortgage-active consumers, and home-improvement responders — segmented by property type, equity, and life moment.",
            href: "/data-assets/b2c-database/real-estate",
          },
          {
            Icon: Car,
            title: "Automotive",
            desc: "Vehicle owners, in-market buyers, and service-loyal consumers — segmented by make, model year, ownership cycle, and purchase intent.",
            href: "/data-assets/b2c-database/automotive",
          },
        ],
      }}
      attributesSection={{
        kicker: "What You Get",
        titlePlain: "Eight ways our B2C database",
        titleAccent: "drives consumer engagement.",
        columns: 4,
        items: [
          { Icon: Users, title: "Demographics", desc: "Age, income, household composition, and life-stage indicators." },
          { Icon: BarChart3, title: "Behavioral", desc: "Purchase activity, response history, and category affinity." },
          { Icon: Mail, title: "Multi-Channel", desc: "Verified email, postal address, and phone where consented." },
          { Icon: Target, title: "Life Moments", desc: "Triggers like new homeowner, recent mover, and in-market buyer." },
          { Icon: Globe, title: "National Coverage", desc: "Comprehensive US household coverage across all 50 states." },
          { Icon: ShieldCheck, title: "Privacy-Compliant", desc: "CCPA, CAN-SPAM, and TCPA-aligned permission flags." },
          { Icon: Home, title: "Real Estate Depth", desc: "Property data, equity, mortgage activity, and home value." },
          { Icon: Car, title: "Auto Depth", desc: "Make, model, year, ownership length, and replacement cycle." },
        ],
      }}
    />
  );
}
