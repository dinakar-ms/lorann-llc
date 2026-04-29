import HubPage from "@/components/templates/HubPage";
import {
  Stethoscope,
  Pill,
  Cat,
  ClipboardList,
  Building2,
  HeartPulse,
  Scissors,
  Activity,
  Hand,
  Smile,
  Scan,
  UserCog,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare B2B Database · Lorann LLC",
  description:
    "Twelve specialty-driven healthcare email lists — physicians, hospitals, surgeons, dentists, pharmacists, nurses, and more — verified monthly.",
};

export default function HealthcareHubPage() {
  return (
    <HubPage
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Data Assets", href: "/data-assets" },
        { label: "B2B Database", href: "/data-assets/b2b-database" },
        { label: "Healthcare" },
      ]}
      kicker="Healthcare Lists"
      titlePlain="Reach healthcare professionals"
      titleAccent="across every major specialty."
      description="Twelve specialty-driven healthcare email lists covering physicians, hospitals, surgeons, dentists, pharmacists, nurses, and allied healthcare professionals — built for pharma, medical device, CME, and healthcare technology marketers."
      primaryCta={{ label: "Request Counts", href: "/contact" }}
      secondaryCta={{ label: "All B2B Lists", href: "/data-assets/b2b-database" }}
      intro={{
        kicker: "Healthcare coverage",
        headlinePlain: "Twelve specialty lists,",
        headlineAccent: "all built the same way.",
        paragraphs: [
          "Healthcare marketing only works when the list matches the way buyers segment — by specialty, by sub-specialty, and by practice setting. Every healthcare list we maintain is built around that buyer-side segmentation logic.",
          "Each list is verified monthly through tele-verification and email validation, with opt-in status and channel-permission flags maintained record-by-record. Every contact is activation-ready across email, postal, and outbound telemarketing channels.",
        ],
      }}
      childrenSection={{
        kicker: "Healthcare Specialties",
        titlePlain: "Twelve specialties,",
        titleAccent: "twelve targeted lists.",
        description: "Click a specialty to see the full list page, segmentation options, and counts.",
        columns: 3,
        items: [
          {
            Icon: Stethoscope,
            title: "Doctors Email List",
            desc: "Practising MDs and DOs across primary care and major specialties — the foundation of healthcare marketing.",
            href: "/data-assets/b2b-database/healthcare/doctors-email-list",
          },
          {
            Icon: UserCog,
            title: "Physician Email Lists",
            desc: "Physicians segmented by primary and sub-specialty — built for therapy-area and brand-specific campaigns.",
            href: "/data-assets/b2b-database/healthcare/physician-email-lists",
          },
          {
            Icon: Pill,
            title: "US Pharmacist Email List",
            desc: "Practising pharmacists across retail, hospital, specialty, and compounding settings.",
            href: "/data-assets/b2b-database/healthcare/us-pharmacist-email-list",
          },
          {
            Icon: Cat,
            title: "Veterinarians",
            desc: "Practising vets across small animal, large animal, mixed, equine, and exotic specialties.",
            href: "/data-assets/b2b-database/healthcare/veterinarians-email-database",
          },
          {
            Icon: ClipboardList,
            title: "Medical Mailing Lists",
            desc: "Comprehensive medical practitioner mailing lists across primary care and clinical staff.",
            href: "/data-assets/b2b-database/healthcare/medical-mailing-lists",
          },
          {
            Icon: Building2,
            title: "Hospital Mailing List",
            desc: "Hospital decision-makers segmented by role, department, and ownership type.",
            href: "/data-assets/b2b-database/healthcare/hospital-mailing-list",
          },
          {
            Icon: HeartPulse,
            title: "Nurses Email List",
            desc: "RNs, LPNs, NPs, and specialty nurses — segmented by credential and care setting.",
            href: "/data-assets/b2b-database/healthcare/nurses-email-list",
          },
          {
            Icon: Scissors,
            title: "Plastic Surgeons",
            desc: "Board-certified plastic and reconstructive surgeons with practice-level firmographics.",
            href: "/data-assets/b2b-database/healthcare/plastic-surgeons-mailing-addresses",
          },
          {
            Icon: Activity,
            title: "Cardiologists",
            desc: "Sub-specialty-segmented cardiologists — interventional, EP, heart-failure, general.",
            href: "/data-assets/b2b-database/healthcare/cardiologists-email-lists",
          },
          {
            Icon: Hand,
            title: "Chiropractors",
            desc: "Licensed chiropractic practitioners with practice-setting and technique-focus tags.",
            href: "/data-assets/b2b-database/healthcare/chiropractors-email-lists",
          },
          {
            Icon: Smile,
            title: "Dentist Email List",
            desc: "General dentists and dental specialists — orthodontists, periodontists, oral surgeons.",
            href: "/data-assets/b2b-database/healthcare/dentist-email-list",
          },
          {
            Icon: Scan,
            title: "X-Ray Laboratories",
            desc: "Imaging center and radiology decision-makers segmented by modality and facility type.",
            href: "/data-assets/b2b-database/healthcare/x-ray-laboratories-mailing-list",
          },
        ],
      }}
    />
  );
}
