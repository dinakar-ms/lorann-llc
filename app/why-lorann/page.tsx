import type { Metadata } from "next";
import { ShieldCheck, Target, BadgeCheck, Truck } from "lucide-react";
import HubPage from "@/components/templates/HubPage";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Why Lorann | Verified B2B Data You Can Trust",
  description:
    "Discover why thousands of marketers choose Lorann — precision-targeted, compliance-first B2B contact data with guaranteed deliverability.",
  alternates: { canonical: "/why-lorann" },
  openGraph: {
    title: "Why Lorann | Verified B2B Data You Can Trust",
    description:
      "Discover why thousands of marketers choose Lorann — precision-targeted, compliance-first B2B contact data with guaranteed deliverability.",
    url: "https://www.lorannllc.com/why-lorann",
    type: "website",
  },
};

const children = [
  {
    Icon: BadgeCheck,
    title: "Verified Data",
    desc: "NPI-verified records cross-referenced against CMS NPPES, USPS NCOA-processed, and SMTP-validated — delivering bounce rates under 2%.",
    href: "/why-lorann/verified-data",
  },
  {
    Icon: Target,
    title: "Precision Targeting",
    desc: "Filter by specialty, credential, geography, practice size, and more. Reach exactly the professionals your campaign needs.",
    href: "/why-lorann/precision-targeting",
  },
  {
    Icon: ShieldCheck,
    title: "Privacy Compliance",
    desc: "HIPAA-safe professional data only, CAN-SPAM validated email, CCPA opt-out suppression, and DNC-scrubbed phone numbers built in.",
    href: "/why-lorann/privacy-compliance",
  },
  {
    Icon: Truck,
    title: "Flexible Delivery",
    desc: "CSV, Excel, CRM-ready integrations with Salesforce, HubSpot, Veeva and more. Same-day to 48-hour turnaround on every order.",
    href: "/why-lorann/flexible-delivery",
  },
];

const attributes = [
  {
    Icon: BadgeCheck,
    title: "850,000+ Physicians",
    desc: "NPI-verified against the CMS NPPES registry for healthcare lists.",
  },
  {
    Icon: ShieldCheck,
    title: "Weekly Hygiene",
    desc: "NCOA, opt-out, and license board checks run every week.",
  },
  {
    Icon: Target,
    title: "< 2% Bounce Rate",
    desc: "SMTP-validated email addresses with engagement indicators.",
  },
  {
    Icon: Truck,
    title: "Same-Day Delivery",
    desc: "Most standard lists are ready to use within hours of ordering.",
  },
];

export default function WhyLorannPage() {
  return (
    <>
      <HubPage
        crumbs={[{ label: "Home", href: "/" }, { label: "Why Lorann" }]}
        kicker="The Lorann Difference"
        titlePlain="Data you can"
        titleAccent="trust and act on."
        description="Every record we deliver is verified, targeted, and compliance-ready — so your campaigns reach real decision-makers, not dead ends."
        primaryCta={{ label: "Request a Sample", href: "/contact-us" }}
        secondaryCta={{ label: "View Data Assets", href: "/data-assets" }}
        intro={{
          kicker: "Built for performance",
          headlinePlain: "Why marketers choose",
          headlineAccent: "Lorann over the rest.",
          paragraphs: [
            "Most data vendors recycle stale lists. Lorann runs weekly hygiene cycles against USPS NCOA, opt-out databases, NPI registries, and professional license boards — so every record you receive reflects the current state of your market.",
            "From healthcare to financial services to technology, our databases are built segment-first, not scraped-and-sold. That means tighter targeting, higher deliverability, and better ROI on every campaign you run.",
          ],
        }}
        childrenSection={{
          kicker: "What sets us apart",
          titlePlain: "Four reasons clients",
          titleAccent: "come back.",
          description: "Each pillar of the Lorann advantage — click to learn more.",
          columns: 2,
          items: children,
        }}
        attributesSection={{
          kicker: "By the numbers",
          titlePlain: "Quality at",
          titleAccent: "scale.",
          columns: 4,
          items: attributes,
        }}
        hideFinalCta
      />
      <FinalCTA />
    </>
  );
}
