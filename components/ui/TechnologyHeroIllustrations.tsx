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
    src: "https://images.unsplash.com/photo-1619597455322-4fbbd820250a",
    alt: "Modern desktop computer monitor and keyboard workstation setup",
  },
  "linux-users-email-list": {
    src: "https://plus.unsplash.com/premium_photo-1764541331325-90603301ea1c",
    alt: "Laptop screen displaying Linux network ping and terminal command-line statistics",
  },
  "unix-users-mailing-data": {
    src: "https://images.unsplash.com/photo-1762163516269-3c143e04175c",
    alt: "Enterprise server rack with blinking green status lights in data center",
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
    src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    alt: "Person holding credit card while using laptop for online e-commerce shopping",
    hasPeople: true,
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
    src: "https://images.unsplash.com/photo-1778791979650-7f23360c1b0a",
    alt: "Customers interacting with cashier at modern point-of-sale system",
    hasPeople: true,
  },
  "i4a-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a",
    alt: "Professional team meeting in modern conference room",
    hasPeople: true,
  },
  "ibm-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1639066648921-82d4500abf1a",
    alt: "Large array of enterprise IBM mainframe and server equipment",
  },
  "ibs-enterprise-erp-users-lists": {
    src: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
    alt: "Enterprise business professionals working at computer workstations",
    hasPeople: true,
  },

  /* ── CRM Users Mailing Data ─────────────────────────────────────────── */
  "crm-users-mailing-data": {
    src: "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6",
    alt: "Business data analytics technology displayed on creative desktop setup",
  },
  "achiever-crm-users-lists": {
    src: "https://plus.unsplash.com/premium_photo-1658506646178-e4ef5810361b",
    alt: "CRM agent smiling with headset managing customer relationships at computer",
    hasPeople: true,
  },
  "acqueon-crm-users-lists": {
    src: "https://plus.unsplash.com/premium_photo-1661299251279-117a49a32548",
    alt: "Contact center team with headsets working on CRM customer outreach",
    hasPeople: true,
  },
  "crm-solutions-users-email-lists": {
    src: "https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1",
    alt: "Futuristic CRM analytics with blue-violet digital bar charts on dark background",
  },
  "crm-users-mailing-data-detail": {
    src: "https://plus.unsplash.com/premium_photo-1720287601300-cf423c3d6760",
    alt: "Detailed CRM and business data visualized on computer monitor screen",
  },
  "microsoft-dynamics-crm-users-mailing-list": {
    src: "https://plus.unsplash.com/premium_photo-1733306493254-52b143296396",
    alt: "Cloud computing concept with data streams on circuit board for Microsoft CRM",
  },
  "salesforce-crm-email-list": {
    src: "https://plus.unsplash.com/premium_photo-1733328013343-e5ee77acaf05",
    alt: "CRM customer relationship management concept with global business network and data connections visualization",
  },
  "oncontact-crm-customers-email-list": {
    src: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325",
    alt: "Two business professionals collaborating on customer CRM data with laptops",
    hasPeople: true,
  },
  "siebel-crm-users-list": {
    src: "https://images.unsplash.com/photo-1686061593213-98dad7c599b9",
    alt: "Enterprise CRM analytics and sales performance dashboard on screen",
  },

  /* ── Software Email Lists ────────────────────────────────────────────── */
  "software-email-lists": {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    alt: "Software performance analytics graphs displayed on laptop screen",
  },
  "quickbooks-email-list": {
    src: "https://plus.unsplash.com/premium_photo-1661326350444-8d0e57e4cdad",
    alt: "Businesswoman using calculator for financial accounting and QuickBooks data",
    hasPeople: true,
  },
  "vmware-users-email-list": {
    src: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41",
    alt: "Dense server and virtualization hardware infrastructure in data center room",
  },
  "tibco-user-email-list": {
    src: "https://images.unsplash.com/photo-1758518730264-9235a1e5416b",
    alt: "Business analyst reviewing TIBCO data integration reports and documentation",
    hasPeople: true,
  },
  "tableau-users-list": {
    src: "https://images.unsplash.com/photo-1686061592689-312bbfb5c055",
    alt: "Tableau-style interactive bar chart data visualization on computer screen",
  },
  "plm-software-user-list": {
    src: "https://plus.unsplash.com/premium_photo-1682140914933-f9704d7bc14f",
    alt: "CAD engineer designing industrial product using PLM software on computer",
    hasPeople: true,
  },
  "esri-mailing-list": {
    src: "https://images.unsplash.com/photo-1461183479101-6c14cd5299c4",
    alt: "Close-up of geographic map used in GIS and spatial data analysis",
  },
  "cogz-cmms-contact-database": {
    src: "https://plus.unsplash.com/premium_photo-1678766819678-35fc6c1f1170",
    alt: "Maintenance technician in hard hat working on facility wiring and equipment",
    hasPeople: true,
  },
  "paycom-users-lists": {
    src: "https://plus.unsplash.com/premium_photo-1723579302123-38ae4449292b",
    alt: "Corporate HR and payroll professionals in modern business office environment",
    hasPeople: true,
  },
  "cisco-resellers-email-database": {
    src: "https://images.unsplash.com/photo-1484557052118-f32bd25b45b5",
    alt: "Network infrastructure computer cables and Cisco-style IT equipment",
  },

  /* ── DBMS Users Email Data ───────────────────────────────────────────── */
  "dbms-users-email-data": {
    src: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee",
    alt: "Enterprise database server rack in professional data center",
  },
  "mongodb-users-list": {
    src: "https://images.unsplash.com/photo-1740908900846-4bbd4f22c975",
    alt: "Wooden block spelling DATA representing MongoDB document database concept",
  },
  "ibm-users-email-list": {
    src: "https://images.unsplash.com/photo-1683322499436-f4383dd59f5a",
    alt: "Blue network cables connected in IBM database infrastructure",
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
    src: "https://images.unsplash.com/photo-1705484229341-4f7f7519b718",
    alt: "Scrabble tiles spelling DATA representing structured database management",
  },
  "google-app-engine-users-email-list": {
    src: "https://images.unsplash.com/photo-1690627931320-16ac56eb2588",
    alt: "Cloud computing concept screen representing Google App Engine deployment",
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
