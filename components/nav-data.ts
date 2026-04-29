// Cascading mega-menu structure for the Data Assets nav item.
// Up to 4 levels deep: Category > Sub-hub > Sub-sub-hub > Leaf.
// Mirrors the route structure under /data-assets/.

import {
  Briefcase,
  Users,
  CreditCard,
  Sparkles,
  Activity,
  Cpu,
  Factory,
  Home,
  Car,
  // Healthcare
  Stethoscope,
  Pill,
  Cat,
  ClipboardList,
  Building2,
  HeartPulse,
  Scissors,
  Hand,
  Smile,
  Scan,
  UserCog,
  // Technology category icons
  Monitor,
  Database,
  Network,
  HardDrive,
  Settings2,
  Layers,
  // Other industry
  HardHat,
  Wheat,
  Trophy,
  Banknote,
  BedDouble,
  ShieldCheck,
  Plane,
  Building,
} from "lucide-react";

export type DataAssetNode = {
  label: string;
  href: string;
  Icon?: React.ElementType;
  desc?: string;
  badge?: string;
  children?: DataAssetNode[];
};

/* ─────────── Healthcare leaves (12) ─────────── */
const HEALTHCARE: DataAssetNode = {
  label: "Healthcare",
  href: "/data-assets/b2b-database/healthcare",
  Icon: Activity,
  desc: "12 specialty-driven email lists.",
  children: [
    { label: "Doctors Email List", href: "/data-assets/b2b-database/healthcare/doctors-email-list", Icon: Stethoscope },
    { label: "Physician Email Lists", href: "/data-assets/b2b-database/healthcare/physician-email-lists", Icon: UserCog },
    { label: "US Pharmacist Email List", href: "/data-assets/b2b-database/healthcare/us-pharmacist-email-list", Icon: Pill },
    { label: "Veterinarians Email DataBase", href: "/data-assets/b2b-database/healthcare/veterinarians-email-database", Icon: Cat },
    { label: "Medical Mailing Lists", href: "/data-assets/b2b-database/healthcare/medical-mailing-lists", Icon: ClipboardList },
    { label: "Hospital Mailing List", href: "/data-assets/b2b-database/healthcare/hospital-mailing-list", Icon: Building2 },
    { label: "Nurses Email List", href: "/data-assets/b2b-database/healthcare/nurses-email-list", Icon: HeartPulse },
    { label: "Plastic Surgeons Mailing Addresses", href: "/data-assets/b2b-database/healthcare/plastic-surgeons-mailing-addresses", Icon: Scissors },
    { label: "Cardiologists Email Lists", href: "/data-assets/b2b-database/healthcare/cardiologists-email-lists", Icon: Activity },
    { label: "Chiropractors Email Lists", href: "/data-assets/b2b-database/healthcare/chiropractors-email-lists", Icon: Hand },
    { label: "Dentist Email List", href: "/data-assets/b2b-database/healthcare/dentist-email-list", Icon: Smile },
    { label: "X-Ray Laboratories Mailing List", href: "/data-assets/b2b-database/healthcare/x-ray-laboratories-mailing-list", Icon: Scan },
  ],
};

/* ─────────── Technology — 8 sub-categories (mixed: leaves + sub-sub-hubs) ─────────── */
const TECHNOLOGY: DataAssetNode = {
  label: "Technology",
  href: "/data-assets/b2b-database/technology",
  Icon: Cpu,
  desc: "40+ tech-stack and software-user lists.",
  children: [
    {
      label: "Operating System Users List",
      href: "/data-assets/b2b-database/technology/operating-system-users-list",
      Icon: Monitor,
      children: [
        { label: "MS Customers List", href: "/data-assets/b2b-database/technology/operating-system-users-list/ms-customers-list" },
        { label: "Linux Users Email List", href: "/data-assets/b2b-database/technology/operating-system-users-list/linux-users-email-list" },
        { label: "Unix Users Mailing Data", href: "/data-assets/b2b-database/technology/operating-system-users-list/unix-users-mailing-data" },
      ],
    },
    {
      label: "ERP Users Email Lists",
      href: "/data-assets/b2b-database/technology/erp-users-email-lists",
      Icon: Database,
      children: [
        { label: "BroadVision ERP Users Lists", href: "/data-assets/b2b-database/technology/erp-users-email-lists/broadvision-erp-users-lists" },
        { label: "Epicor ERP Users List", href: "/data-assets/b2b-database/technology/erp-users-email-lists/epicor-erp-users-list" },
        { label: "Unleashed Software ERP Users Lists", href: "/data-assets/b2b-database/technology/erp-users-email-lists/unleashed-software-erp-users-lists" },
        { label: "Timberline ERP Users Mailing List", href: "/data-assets/b2b-database/technology/erp-users-email-lists/timberline-erp-users-mailing-list" },
        { label: "Upside Software ERP Users Lists", href: "/data-assets/b2b-database/technology/erp-users-email-lists/upside-software-erp-users-lists" },
        { label: "i4a ERP Users Lists", href: "/data-assets/b2b-database/technology/erp-users-email-lists/i4a-erp-users-lists" },
        { label: "IBM ERP Users Lists", href: "/data-assets/b2b-database/technology/erp-users-email-lists/ibm-erp-users-lists" },
        { label: "IBS Enterprise ERP Users Lists", href: "/data-assets/b2b-database/technology/erp-users-email-lists/ibs-enterprise-erp-users-lists" },
      ],
    },
    {
      label: "CRM Users Mailing Data",
      href: "/data-assets/b2b-database/technology/crm-users-mailing-data",
      Icon: Users,
      children: [
        { label: "Achiever CRM Users Lists", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/achiever-crm-users-lists" },
        { label: "Acqueon CRM Users Lists", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/acqueon-crm-users-lists" },
        { label: "CRM Solutions Users Email Lists", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/crm-solutions-users-email-lists" },
        { label: "CRM Users Mailing Data", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/crm-users-mailing-data-detail" },
        { label: "Microsoft Dynamics CRM Users Mailing List", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/microsoft-dynamics-crm-users-mailing-list" },
        { label: "Salesforce CRM Email List", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/salesforce-crm-email-list" },
        { label: "OnContact CRM Customers Email List", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/oncontact-crm-customers-email-list" },
        { label: "Siebel CRM Users List", href: "/data-assets/b2b-database/technology/crm-users-mailing-data/siebel-crm-users-list" },
      ],
    },
    {
      // Direct leaf — no children
      label: "Network Users Data List",
      href: "/data-assets/b2b-database/technology/network-users-data-list",
      Icon: Network,
    },
    {
      label: "Software Email Lists",
      href: "/data-assets/b2b-database/technology/software-email-lists",
      Icon: Cpu,
      children: [
        { label: "QuickBooks Email List", href: "/data-assets/b2b-database/technology/software-email-lists/quickbooks-email-list" },
        { label: "VMware Users Email List", href: "/data-assets/b2b-database/technology/software-email-lists/vmware-users-email-list" },
        { label: "Tibco User Email List", href: "/data-assets/b2b-database/technology/software-email-lists/tibco-user-email-list" },
        { label: "Tableau Users List", href: "/data-assets/b2b-database/technology/software-email-lists/tableau-users-list" },
        { label: "PLM Software User List", href: "/data-assets/b2b-database/technology/software-email-lists/plm-software-user-list" },
        { label: "ESRI Mailing List", href: "/data-assets/b2b-database/technology/software-email-lists/esri-mailing-list" },
        { label: "Cogz CMMS Contact Database", href: "/data-assets/b2b-database/technology/software-email-lists/cogz-cmms-contact-database" },
        { label: "Paycom Users Lists", href: "/data-assets/b2b-database/technology/software-email-lists/paycom-users-lists" },
        { label: "Cisco Resellers Email Database", href: "/data-assets/b2b-database/technology/software-email-lists/cisco-resellers-email-database" },
      ],
    },
    {
      label: "DBMS Users Email Data",
      href: "/data-assets/b2b-database/technology/dbms-users-email-data",
      Icon: HardDrive,
      children: [
        { label: "MongoDB Users List", href: "/data-assets/b2b-database/technology/dbms-users-email-data/mongodb-users-list" },
        { label: "IBM Users Email List", href: "/data-assets/b2b-database/technology/dbms-users-email-data/ibm-users-email-list" },
      ],
    },
    {
      label: "Business Technology Email Lists",
      href: "/data-assets/b2b-database/technology/business-technology-email-lists",
      Icon: Settings2,
      children: [
        { label: "3D Printing Industry Email List", href: "/data-assets/b2b-database/technology/business-technology-email-lists/3d-printing-industry-email-list" },
        { label: "Apple iOS Developers Email List", href: "/data-assets/b2b-database/technology/business-technology-email-lists/apple-ios-developers-email-list" },
        { label: "Database Users Mailing Lists", href: "/data-assets/b2b-database/technology/business-technology-email-lists/database-users-mailing-lists" },
        { label: "Google App Engine Users Email List", href: "/data-assets/b2b-database/technology/business-technology-email-lists/google-app-engine-users-email-list" },
      ],
    },
    {
      // Direct leaf — no children
      label: "Groupware Email Lists",
      href: "/data-assets/b2b-database/technology/groupware-email-lists",
      Icon: Layers,
    },
  ],
};

/* ─────────── Other Industry leaves (10) ─────────── */
const OTHER_INDUSTRY: DataAssetNode = {
  label: "Other Industry",
  href: "/data-assets/b2b-database/other-industry",
  Icon: Factory,
  desc: "10 vertical-industry email lists.",
  children: [
    { label: "IT Decision Makers Mailing List", href: "/data-assets/b2b-database/other-industry/it-decision-makers-mailing-list", Icon: Cpu },
    { label: "Construction Industry Email List", href: "/data-assets/b2b-database/other-industry/construction-industry-email-list", Icon: HardHat },
    { label: "Agriculture Industry Email Lists", href: "/data-assets/b2b-database/other-industry/agriculture-industry-email-lists", Icon: Wheat },
    { label: "Sports Industry Email Lists", href: "/data-assets/b2b-database/other-industry/sports-industry-email-lists", Icon: Trophy },
    { label: "Banking & Finance Email Lists", href: "/data-assets/b2b-database/other-industry/banking-finance-email-lists", Icon: Banknote },
    { label: "Hotels Email Lists", href: "/data-assets/b2b-database/other-industry/hotels-email-lists", Icon: BedDouble },
    { label: "Insurance Contact Lists", href: "/data-assets/b2b-database/other-industry/insurance-contact-lists", Icon: ShieldCheck },
    { label: "Travel Data Lists", href: "/data-assets/b2b-database/other-industry/travel-data-lists", Icon: Plane },
    { label: "Real Estate Data List", href: "/data-assets/b2b-database/other-industry/real-estate-data-list", Icon: Building },
    { label: "Manufacturing Industry Email Lists", href: "/data-assets/b2b-database/other-industry/manufacturing-industry-email-lists", Icon: Factory },
  ],
};

/* ─────────── B2B Database (sub-hub) ─────────── */
const B2B_DATABASE: DataAssetNode = {
  label: "B2B Database",
  href: "/data-assets/b2b-database",
  Icon: Briefcase,
  desc: "Healthcare, Technology & industry-specific lists.",
  children: [HEALTHCARE, TECHNOLOGY, OTHER_INDUSTRY],
};

/* ─────────── B2C Database (sub-hub) ─────────── */
const B2C_DATABASE: DataAssetNode = {
  label: "B2C Database",
  href: "/data-assets/b2c-database",
  Icon: Users,
  desc: "Consumer audiences across Real Estate and Automotive.",
  children: [
    {
      label: "Real Estate",
      href: "/data-assets/b2c-database/real-estate",
      Icon: Home,
      desc: "Homeowners, movers & equity-rich consumers.",
    },
    {
      label: "Automotive",
      href: "/data-assets/b2c-database/automotive",
      Icon: Car,
      desc: "Vehicle owners & in-market buyers.",
    },
  ],
};

/* ─────────── Top-level Data Assets ─────────── */
export const DATA_ASSETS_TREE: DataAssetNode[] = [
  B2B_DATABASE,
  B2C_DATABASE,
  {
    label: "Data Cards",
    href: "/data-assets/data-cards",
    Icon: CreditCard,
    desc: "Detailed audience definitions, attributes, and counts.",
  },
  {
    label: "Signal eXchange™",
    href: "/data-assets/signal-exchange",
    Icon: Sparkles,
    desc: "Proprietary lead + intent dataset.",
    badge: "New",
  },
];
