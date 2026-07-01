/**
 * Technology sub-page hero photos
 * Covers: 1 hub + 8 category sub-hubs + 20 leaf pages = 29 unique photos
 *
 * getHeroIllustration() walks slugParts right-to-left so the deepest
 * matching slug wins (leaf beats parent beats hub).
 *
 * Tech/scene photos use `crop=entropy` so Unsplash auto-picks the most
 * visually interesting region instead of always cropping centre.
 */
import Image from "next/image";
import type { ReactNode } from "react";

interface HeroPhotoProps {
  src: string;
  alt: string;
  /** Use face-detection crop for images containing people */
  hasPeople?: boolean;
}

function HeroPhoto({ src, alt, hasPeople }: HeroPhotoProps) {
  const crop = hasPeople ? "crop=faces,top&" : "crop=entropy&";
  const url = `${src}?auto=format&fit=crop&${crop}w=700&q=80`;
  return (
    <div className="relative w-full aspect-[4/3]">
      <Image
        src={url}
        alt={alt}
        fill
        className={`object-cover ${hasPeople ? "object-top" : "object-center"}`}
        sizes="(max-width: 1024px) 0px, 44vw"
        quality={60}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-cyan-500/8 pointer-events-none" />
    </div>
  );
}

/* ─── Photo map ───────────────────────────────────────────────────────────── */

const PHOTOS: Record<string, { src: string; alt: string; hasPeople?: boolean }> = {

  /* ── Technology hub ─────────────────────────────────────────────────── */
  "technology": {
    src: "https://plus.unsplash.com/premium_photo-1740363268539-cd9093c3b5d1",
    alt: "Modern data center server room with rows of enterprise servers",
  },

  /* ── Operating System Users ─────────────────────────────────────────── */
  "operating-system-users-list": {
    src: "https://images.unsplash.com/photo-1580106815433-a5b1d1d53d85",
    alt: "Data center corridor with glass-enclosed server infrastructure",
  },
  "ms-customers-list": {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    alt: "Enterprise IT professional managing Microsoft Windows Server, Azure Active Directory, and Microsoft 365 deployment on laptop",
    hasPeople: true,
  },
  "linux-users-email-list": {
    src: "https://plus.unsplash.com/premium_photo-1764541331325-90603301ea1c",
    alt: "Laptop screen displaying Linux network ping and terminal command-line statistics",
  },
  "unix-users-mailing-data": {
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    alt: "Unix terminal command-line interface showing system administration scripts used in AIX, HP-UX, and Solaris enterprise environments",
  },

  /* ── Network Users Data List (direct leaf) ──────────────────────────── */
  "network-users-data-list": {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    alt: "Network infrastructure cable connections in enterprise IT environment",
  },

  /* ── ERP Users Email Lists ──────────────────────────────────────────── */
  "erp-users-email-lists": {
    src: "https://plus.unsplash.com/premium_photo-1682126323430-febbf2858d19",
    alt: "Business analyst reviewing KPI dashboard analytics on computer",
    hasPeople: true,
  },
  "broadvision-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    alt: "E-commerce analytics dashboard showing digital sales performance and B2B commerce metrics",
  },
  "epicor-erp-users-list": {
    src: "https://images.unsplash.com/photo-1647427060118-4911c9821b82",
    alt: "Modern factory floor filled with automated orange manufacturing machines",
  },
  "unleashed-software-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c",
    alt: "Large warehouse with organized inventory on shelving racks",
  },
  "timberline-erp-users-mailing-list": {
    src: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f",
    alt: "Low-angle view of tall tower crane at construction site",
  },
  "upside-software-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    alt: "Procurement manager and contract administrator reviewing enterprise sourcing agreements and vendor contracts at desk",
    hasPeople: true,
  },
  "i4a-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
    alt: "Professional trade association executive team meeting in boardroom managing membership and organizational operations",
    hasPeople: true,
  },
  "ibm-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1639066648921-82d4500abf1a",
    alt: "Large array of enterprise IBM mainframe and server equipment",
  },
  "ibs-enterprise-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    alt: "Supply chain distribution center with organized logistics and warehouse management operations",
  },

  /* ── CRM Users Mailing Data ─────────────────────────────────────────── */
  "crm-users-mailing-data": {
    src: "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6",
    alt: "Business data analytics technology displayed on creative desktop setup",
  },
  "achiever-crm-users-lists": {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    alt: "Sales manager reviewing Achiever CRM customer account performance metrics and relationship pipeline on laptop",
    hasPeople: true,
  },
  "acqueon-crm-users-lists": {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    alt: "Enterprise outbound contact center team using Acqueon predictive dialing CRM and AI-powered sales engagement platform",
    hasPeople: true,
  },
  "crm-solutions-users-email-lists": {
    src: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2",
    alt: "Sales team reviewing CRM solution customer pipeline with contact management and deal-stage tracking dashboard",
  },
  "crm-users-mailing-data-detail": {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    alt: "Data specialist analyzing detailed CRM contact records, mailing segmentation lists, and buyer profile data on dual screens",
  },
  "microsoft-dynamics-crm-users-mailing-list": {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692",
    alt: "Enterprise sales team reviewing Microsoft Dynamics CRM customer data and pipeline analytics on dual monitors",
    hasPeople: true,
  },
  "salesforce-crm-email-list": {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    alt: "Enterprise sales team collaborating on Salesforce CRM strategy with customer pipeline analytics and deal-stage review at whiteboard",
    hasPeople: true,
  },
  "oncontact-crm-customers-email-list": {
    src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c",
    alt: "B2B account manager reviewing OnContact CRM customer database and sales opportunity pipeline with client on laptop",
    hasPeople: true,
  },
  "siebel-crm-users-list": {
    src: "https://images.unsplash.com/photo-1542744094-3a31f272c490",
    alt: "Large-enterprise Oracle Siebel CRM operations center with multi-screen customer data analytics and sales management dashboards",
  },

  /* ── Software Email Lists ────────────────────────────────────────────── */
  "software-email-lists": {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "Software performance analytics graphs displayed on laptop screen",
  },
  "quickbooks-email-list": {
    src: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0",
    alt: "Small business owner and accountant using QuickBooks accounting software for invoicing, bookkeeping, and financial management",
    hasPeople: true,
  },
  "vmware-users-email-list": {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
    alt: "Enterprise data center server infrastructure managed by VMware vSphere virtualization platform for cloud and virtual machine operations",
  },
  "tibco-user-email-list": {
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    alt: "Enterprise integration architects and middleware engineers collaborating on TIBCO platform deployment across financial services and manufacturing systems",
    hasPeople: true,
  },
  "tableau-users-list": {
    src: "https://images.unsplash.com/photo-1543286386-2e659306cd6c",
    alt: "Data analyst reviewing Tableau business intelligence dashboard with multiple interactive charts, bar graphs, and KPI visualizations on screen",
  },
  "plm-software-user-list": {
    src: "https://plus.unsplash.com/premium_photo-1682140914933-f9704d7bc14f",
    alt: "CAD engineer designing industrial product using PLM software on computer",
    hasPeople: true,
  },
  "esri-mailing-list": {
    src: "https://images.unsplash.com/photo-1524661135-423995f22d0b",
    alt: "Aerial satellite view of urban landscape used in Esri ArcGIS spatial data analysis and geographic information systems mapping",
  },
  "cogz-cmms-contact-database": {
    src: "https://plus.unsplash.com/premium_photo-1678766819678-35fc6c1f1170",
    alt: "Maintenance technician in hard hat working on facility wiring and equipment",
    hasPeople: true,
  },
  "paycom-users-lists": {
    src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21",
    alt: "HR director and payroll manager using Paycom HCM software to process employee payroll, manage talent, and administer benefits",
    hasPeople: true,
  },
  "cisco-resellers-email-database": {
    src: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5",
    alt: "Enterprise network switch and cabling infrastructure deployed by Cisco certified reseller and channel partner",
  },

  /* ── DBMS Users Email Data ───────────────────────────────────────────── */
  "dbms-users-email-data": {
    src: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee",
    alt: "Enterprise database server rack in professional data center",
  },
  "mongodb-users-list": {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd",
    alt: "Backend engineer at workstation with multiple monitors showing database queries and code for MongoDB deployment",
  },
  "ibm-users-email-list": {
    src: "https://images.unsplash.com/photo-1588508065123-287b28e013da",
    alt: "IBM enterprise server rack with blinking status lights in professional data center",
  },

  /* ── Business Technology Email Lists ─────────────────────────────────── */
  "business-technology-email-lists": {
    src: "https://plus.unsplash.com/premium_photo-1682130147350-c1f80c968967",
    alt: "IT engineer working on business technology algorithm on computer in office",
    hasPeople: true,
  },
  "3d-printing-industry-email-list": {
    src: "https://images.unsplash.com/photo-1702863361902-93c51bfbd923",
    alt: "Modern 3D printer in operation producing prototype objects layer by layer",
  },
  "apple-ios-developers-email-list": {
    src: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48",
    alt: "Apple iPhone held open-palm representing iOS app development ecosystem",
  },
  "database-users-mailing-lists": {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    alt: "Enterprise server rack infrastructure hosting Oracle, SQL Server, MySQL, and PostgreSQL database systems",
  },
  "google-app-engine-users-email-list": {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    alt: "Satellite view of Earth from orbit representing Google App Engine global cloud platform and scalable application infrastructure",
  },

  /* ── Groupware Email Lists ───────────────────────────────────────────── */
  "groupware-email-lists": {
    src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74",
    alt: "Team collaboration monitoring screen for groupware communication platform",
  },
};

/* ─── Exported helper ────────────────────────────────────────────────────── */

export function getTechnologyIllustration(slugParts: string[]): ReactNode | null {
  if (!slugParts.includes("technology")) return null;
  for (let i = slugParts.length - 1; i >= 0; i--) {
    const entry = PHOTOS[slugParts[i]];
    if (entry) {
      return <HeroPhoto src={entry.src} alt={entry.alt} hasPeople={entry.hasPeople} />;
    }
  }
  return null;
}
