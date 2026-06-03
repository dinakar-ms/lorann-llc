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
  // Healthcare — group icons
  Stethoscope,
  Pill,
  Building2,
  HeartPulse,
  Smile,
  UserCog,
  Brain,
  Award,
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
  // B2C categories
  GraduationCap,
  HeartHandshake,
  Landmark,
  ShoppingCart,
  Package,
  Globe,
  Wifi,
  Wrench,
} from "lucide-react";

export type DataAssetNode = {
  label: string;
  href: string;
  Icon?: React.ElementType;
  desc?: string;
  badge?: string;
  children?: DataAssetNode[];
};

/* ─────────── Healthcare — 8 specialty groups ─────────── */
const HC = "/data-assets/b2b-database/healthcare";

const HC_PHYSICIANS: DataAssetNode = {
  label: "Physicians & Advanced Practice",
  href: `${HC}/physicians-advanced-practice`,
  Icon: UserCog,
  desc: "Physicians, Podiatrists, NPs, PAs, MAs",
  children: [
    { label: "Physicians & Doctors",   href: `${HC}/physicians-advanced-practice/physicians-doctors` },
    { label: "Podiatrists",            href: `${HC}/physicians-advanced-practice/podiatrists` },
    { label: "Nurse Practitioners",    href: `${HC}/physicians-advanced-practice/nurse-practitioners` },
    { label: "Physician Assistants",   href: `${HC}/physicians-advanced-practice/physician-assistants` },
    { label: "Medical Assistants",     href: `${HC}/physicians-advanced-practice/medical-assistants` },
  ],
};

const HC_NURSING: DataAssetNode = {
  label: "Nursing Professionals",
  href: `${HC}/nursing-professionals`,
  Icon: HeartPulse,
  desc: "RNs, LPNs, CNAs, Nurse-Midwives",
  children: [
    { label: "Registered Nurses",           href: `${HC}/nursing-professionals/registered-nurses` },
    { label: "Licensed Practical Nurses",   href: `${HC}/nursing-professionals/licensed-practical-nurses` },
    { label: "Certified Nursing Assistants",href: `${HC}/nursing-professionals/certified-nursing-assistants` },
    { label: "Certified Nurse-Midwives",    href: `${HC}/nursing-professionals/certified-nurse-midwives` },
  ],
};

const HC_HOSPITAL: DataAssetNode = {
  label: "Hospital Decision Makers",
  href: `${HC}/hospital-decision-makers`,
  Icon: Building2,
  desc: "Administrators, CMO, CNO, Medical Directors",
  children: [
    { label: "Hospital Administrators",  href: `${HC}/hospital-decision-makers/hospital-administrators` },
    { label: "CEO & CFO",               href: `${HC}/hospital-decision-makers/ceo-cfo-healthcare` },
    { label: "Chief Medical Officers",  href: `${HC}/hospital-decision-makers/chief-medical-officers` },
    { label: "Chief Nursing Officers",  href: `${HC}/hospital-decision-makers/chief-nursing-officers` },
    { label: "Chief of Staff",          href: `${HC}/hospital-decision-makers/chief-of-staff` },
    { label: "Medical Directors",       href: `${HC}/hospital-decision-makers/medical-directors` },
  ],
};

const HC_THERAPY: DataAssetNode = {
  label: "Health & Therapy",
  href: `${HC}/health-therapy`,
  Icon: Activity,
  desc: "PT, OT, SLP, RT, EMT, Rad Tech, Dieticians",
  children: [
    { label: "Physical Therapists",         href: `${HC}/health-therapy/physical-therapists` },
    { label: "Occupational Therapists",     href: `${HC}/health-therapy/occupational-therapists` },
    { label: "Speech & Language Therapists",href: `${HC}/health-therapy/speech-language-therapists` },
    { label: "Respiratory Therapists",      href: `${HC}/health-therapy/respiratory-therapists` },
    { label: "Massage Therapists",          href: `${HC}/health-therapy/massage-therapists` },
    { label: "EMTs & Paramedics",           href: `${HC}/health-therapy/emts-paramedics` },
    { label: "Radiologic Technicians",      href: `${HC}/health-therapy/radiologic-technicians` },
    { label: "Dieticians & Nutritionists",  href: `${HC}/health-therapy/dieticians-nutritionists` },
  ],
};

const HC_BEHAVIORAL: DataAssetNode = {
  label: "Behavioral & Mental Health",
  href: `${HC}/behavioral-mental-health`,
  Icon: Brain,
  desc: "Psychologists, Psychiatrists, Counselors",
  children: [
    { label: "Psychologists",              href: `${HC}/behavioral-mental-health/psychologists` },
    { label: "Psychiatrists",              href: `${HC}/behavioral-mental-health/psychiatrists` },
    { label: "Mental Health Counselors",   href: `${HC}/behavioral-mental-health/mental-health-counselors` },
    { label: "Social Workers",             href: `${HC}/behavioral-mental-health/social-workers` },
    { label: "Marriage & Family Therapists",href: `${HC}/behavioral-mental-health/marriage-family-therapists` },
  ],
};

const HC_DENTAL: DataAssetNode = {
  label: "Dental & Vision",
  href: `${HC}/dental-vision`,
  Icon: Smile,
  desc: "Dentists, Hygienists, Optometrists",
  children: [
    { label: "Dentists",           href: `${HC}/dental-vision/dentists` },
    { label: "Dental Hygienists",  href: `${HC}/dental-vision/dental-hygienists` },
    { label: "Dental Assistants",  href: `${HC}/dental-vision/dental-assistants` },
    { label: "Optometrists",       href: `${HC}/dental-vision/optometrists` },
    { label: "Opticians",          href: `${HC}/dental-vision/opticians` },
  ],
};

const HC_PHARMACY: DataAssetNode = {
  label: "Pharmacy & Practice Management",
  href: `${HC}/pharmacy-practice-management`,
  Icon: Pill,
  desc: "Pharmacists, Practice Managers",
  children: [
    { label: "Pharmacists",                href: `${HC}/pharmacy-practice-management/pharmacists` },
    { label: "Physician Practice Managers",href: `${HC}/pharmacy-practice-management/physician-practice-managers` },
  ],
};

const HC_SPECIALTY: DataAssetNode = {
  label: "Specialty & Other",
  href: `${HC}/specialty-other`,
  Icon: Award,
  desc: "Chiropractors, Veterinarians, Allied Health",
  children: [
    { label: "Chiropractors",               href: `${HC}/specialty-other/chiropractors` },
    { label: "Veterinarians",               href: `${HC}/specialty-other/veterinarians` },
    { label: "Allied Healthcare Professionals", href: `${HC}/specialty-other/allied-healthcare-professionals` },
  ],
};

const HEALTHCARE: DataAssetNode = {
  label: "Healthcare",
  href: "/data-assets/b2b-database/healthcare",
  Icon: Stethoscope,
  desc: "8 specialty segments · 38 targeted lists",
  children: [
    HC_PHYSICIANS,
    HC_NURSING,
    HC_HOSPITAL,
    HC_THERAPY,
    HC_BEHAVIORAL,
    HC_DENTAL,
    HC_PHARMACY,
    HC_SPECIALTY,
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
  desc: "Consumer audiences across 10 key verticals.",
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
    {
      label: "Education & EdTech",
      href: "/data-assets/b2c-database/education-edtech",
      Icon: GraduationCap,
      desc: "Students, educators & lifelong learners.",
    },
    {
      label: "Healthcare & Wellness",
      href: "/data-assets/b2c-database/healthcare-wellness",
      Icon: HeartHandshake,
      desc: "Health-conscious consumers & patients.",
    },
    {
      label: "Financial Services",
      href: "/data-assets/b2c-database/financial-services",
      Icon: Landmark,
      desc: "Banking, insurance & investment consumers.",
    },
    {
      label: "Retail & Ecommerce",
      href: "/data-assets/b2c-database/retail-ecommerce",
      Icon: ShoppingCart,
      desc: "Online shoppers & retail loyalty audiences.",
    },
    {
      label: "DTC & CPG",
      href: "/data-assets/b2c-database/dtc-cpg",
      Icon: Package,
      desc: "Direct-to-consumer & packaged goods buyers.",
    },
    {
      label: "Travel",
      href: "/data-assets/b2c-database/travel",
      Icon: Globe,
      desc: "Frequent travelers & vacation planners.",
    },
    {
      label: "Telecommunications",
      href: "/data-assets/b2c-database/telecommunications",
      Icon: Wifi,
      desc: "Mobile, broadband & streaming subscribers.",
    },
    {
      label: "Home Services",
      href: "/data-assets/b2c-database/home-services",
      Icon: Wrench,
      desc: "Homeowners seeking services & improvement.",
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
