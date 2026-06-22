/**
 * Updates heroDescription for all technology pages under
 * /data-assets/b2b-database/technology/ with unique, keyword-rich copy.
 * Each description embeds the page H1 (primary keyword) naturally.
 *
 * Usage:
 *   node scripts/fix-tech-hero-descriptions.mjs                                      (development)
 *   NEXT_PUBLIC_SANITY_DATASET=production node scripts/fix-tech-hero-descriptions.mjs (production)
 *   node scripts/fix-tech-hero-descriptions.mjs --dry-run
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const envPath = join(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const DRY_RUN = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "development";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

function block(text) {
  const key = Math.random().toString(36).slice(2, 14);
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", _key: key + "s", text, marks: [] }],
    markDefs: [],
  };
}
function rt(text) { return [block(text)]; }

// Each value is a function (h1) => string so the primary keyword (H1) is embedded naturally.
const DESCRIPTIONS = {

  // ── ERP Leaf Pages ──────────────────────────────────────────────────────────
  "broadvision-erp-users-lists": (h1) =>
    `Our ${h1} gives you verified access to IT architects, e-commerce directors, and platform owners at enterprises running BroadVision for digital commerce and self-service portals — contacts enriched with role, seniority, and firmographic depth.`,

  "epicor-erp-users-list": (h1) =>
    `The ${h1} from Lorann connects you with plant managers, IT directors, and operations executives at manufacturing, distribution, and retail companies running Epicor in production — verified, installation-confirmed records ready for outreach.`,

  "unleashed-software-erp-users-lists": (h1) =>
    `Our ${h1} targets warehouse managers, operations directors, and finance leads at SMB and mid-market product-based businesses using Unleashed Software to manage inventory and manufacturing — each contact deployment-confirmed and role-verified.`,

  "timberline-erp-users-mailing-list": (h1) =>
    `The ${h1} from Lorann delivers verified contacts for project managers, CFOs, and IT leads at general contractors and property developers running Sage Timberline (now Sage 300 CRE) — the industry-standard ERP for construction and real estate.`,

  "ibm-erp-users-lists": (h1) =>
    `Our ${h1} provides verified decision-maker contacts — IT directors, system architects, and CIOs — at large manufacturing, financial, and government organizations running IBM ERP environments including AS/400 and iSeries platforms.`,

  "ibs-enterprise-erp-users-lists": (h1) =>
    `The ${h1} from Lorann connects you with supply chain managers, distribution executives, and warehouse technology buyers at companies running IBS Enterprise ERP for distribution and logistics — contacts verified against corporate directories and industry registries.`,

  "i4a-erp-users-lists": (h1) =>
    `Our ${h1} targets membership directors, association executives, and technology administrators at professional associations and nonprofits using i4a (now iMIS) — the leading ERP for association management — with verified, role-matched contact data.`,

  "upside-software-erp-users-lists": (h1) =>
    `The ${h1} from Lorann gives you verified access to procurement managers, contract administrators, and travel technology buyers at enterprises running Upside Software for contract and travel management — role-specific, deployment-verified contacts.`,

  // ── ERP Hub ─────────────────────────────────────────────────────────────────
  "erp-users-email-lists": (h1) =>
    `Our ${h1} cover the full spectrum of ERP deployments — from manufacturing to distribution — giving you verified access to IT directors, operations executives, and procurement leads at companies actively running ERP platforms in production.`,

  // ── CRM Leaf Pages ──────────────────────────────────────────────────────────
  "salesforce-crm-email-list": (h1) =>
    `Our ${h1} delivers verified contacts for CRM administrators, sales operations managers, and Salesforce platform owners at the 150,000+ companies worldwide running Salesforce — enriched with org size, edition tier, and module-level adoption data.`,

  "microsoft-dynamics-crm-users-mailing-list": (h1) =>
    `The ${h1} from Lorann connects you with Dynamics administrators, IT managers, and sales directors at enterprises and mid-market companies running Microsoft Dynamics 365 or on-premise deployments — verified, role-matched contacts ready for outreach.`,

  "siebel-crm-users-list": (h1) =>
    `Our ${h1} provides verified access to enterprise IT architects, CRM program managers, and business transformation leaders at Fortune 1000 companies running Oracle Siebel CRM in financial services, telecom, and manufacturing sectors.`,

  "oncontact-crm-customers-email-list": (h1) =>
    `The ${h1} from Lorann targets sales managers, CRM administrators, and business development leads at mid-market manufacturers and distributors running Oncontact (CDC Software) CRM — verified, firmographic-enriched contact records.`,

  "achiever-crm-users-lists": (h1) =>
    `Our ${h1} connects you with program managers, marketing directors, and CRM system owners at companies running the Achiever platform for loyalty and incentive-driven customer relationship management — each contact verified and role-matched.`,

  "acqueon-crm-users-lists": (h1) =>
    `The ${h1} from Lorann delivers verified contacts for customer engagement directors, contact center managers, and CX technology leads at enterprises using Acqueon for AI-driven outbound campaign management and contact center intelligence.`,

  "crm-solutions-users-email-lists": (h1) =>
    `Our ${h1} span every major CRM platform — giving you verified access to sales operations leaders, CRM administrators, and technology evaluators at organizations actively managing customer relationships through enterprise CRM systems.`,

  "crm-users-mailing-data-detail": (h1) =>
    `The ${h1} from Lorann goes beyond the platform name — each record includes verified email, direct-dial phone, role title, company firmographics, and technographic signals for decision-makers at organizations running production CRM deployments.`,

  // ── CRM Hub ─────────────────────────────────────────────────────────────────
  "crm-users-mailing-data": (h1) =>
    `Our ${h1} cover every major CRM platform across every industry vertical — connecting you with sales operations directors, CRM administrators, and technology decision-makers at companies running leading CRM platforms with verified, installation-confirmed contacts.`,

  // ── DBMS Leaf Pages ─────────────────────────────────────────────────────────
  "ibm-users-email-list": (h1) =>
    `Our ${h1} gives you verified access to database administrators, enterprise architects, and IT infrastructure managers at banks, insurers, and large manufacturers running IBM Db2 and IMS systems — contacts confirmed against enterprise IT directories.`,

  "mongodb-users-list": (h1) =>
    `The ${h1} from Lorann connects you with backend engineers, DevOps architects, and CTO-level decision-makers at organizations running MongoDB Atlas or self-hosted deployments — verified, role-specific contacts spanning startups to Fortune 500 companies.`,

  // ── DBMS Hub ─────────────────────────────────────────────────────────────────
  "dbms-users-email-data": (h1) =>
    `Our ${h1} reach database administrators, data architects, and enterprise IT leaders across relational, NoSQL, and cloud database platforms — verified, technographic-confirmed contacts at organizations where data infrastructure is mission-critical.`,

  // ── OS Leaf Pages ────────────────────────────────────────────────────────────
  "linux-users-email-list": (h1) =>
    `Our ${h1} connects you with system administrators, DevOps engineers, and open-source technology leads at organizations running Red Hat, Ubuntu, CentOS, and other Linux distributions — verified contacts at companies where Linux powers production workloads.`,

  "ms-customers-list": (h1) =>
    `The ${h1} from Lorann delivers verified contacts for IT administrators, Microsoft solution architects, and technology directors at organizations running Windows Server, Azure, Active Directory, and Microsoft 365 — enriched with role, company size, and deployment scope.`,

  "unix-users-mailing-data": (h1) =>
    `Our ${h1} provides verified access to system administrators, UNIX engineers, and infrastructure architects managing AIX, HP-UX, and Solaris environments at large enterprises, financial institutions, and government agencies where Unix remains foundational.`,

  // ── OS Hub ───────────────────────────────────────────────────────────────────
  "operating-system-users-list": (h1) =>
    `Our ${h1} spans Windows, Linux, and Unix environments — connecting you with system administrators, infrastructure architects, and IT operations managers at organizations whose OS deployments reveal their broader infrastructure strategy.`,

  // ── Software Leaf Pages ──────────────────────────────────────────────────────
  "tibco-user-email-list": (h1) =>
    `Our ${h1} delivers verified contacts for integration architects, middleware administrators, and enterprise architecture leads at large financial services, retail, and manufacturing companies running TIBCO middleware and integration platforms.`,

  "paycom-users-lists": (h1) =>
    `The ${h1} from Lorann targets HR directors, payroll managers, and HRIS administrators at mid-market and enterprise companies running Paycom for HCM, payroll, and talent management — verified contacts enriched by company size and employee count.`,

  "vmware-users-email-list": (h1) =>
    `Our ${h1} provides verified access to virtualization engineers, vSphere administrators, and infrastructure managers at the tens of thousands of enterprises running VMware in their data centers — contacts confirmed with deployment and license-tier data.`,

  "cisco-resellers-email-database": (h1) =>
    `The ${h1} from Lorann connects you with channel account managers, networking solution architects, and partner principal engineers at certified Cisco reseller organizations selling networking, security, and collaboration solutions.`,

  "cogz-cmms-contact-database": (h1) =>
    `Our ${h1} targets maintenance managers, facilities directors, and plant engineering leads at manufacturing and facilities-intensive organizations running Cogz CMMS for work order, asset, and preventive maintenance management.`,

  "plm-software-user-list": (h1) =>
    `The ${h1} from Lorann delivers verified access to engineering managers, CAD administrators, and product development directors at manufacturers across aerospace, automotive, and industrial sectors running PLM platforms for product lifecycle management.`,

  "esri-mailing-list": (h1) =>
    `Our ${h1} connects you with GIS specialists, spatial data analysts, and mapping technology decision-makers at government agencies, utilities, and environmental organizations running Esri ArcGIS — verified contacts at Esri-licensed organizations worldwide.`,

  "quickbooks-email-list": (h1) =>
    `The ${h1} from Lorann gives you verified access to business owners, accountants, and bookkeepers at the millions of small and mid-market companies running QuickBooks for accounting and financial management — segmented by company size and industry vertical.`,

  "tableau-users-list": (h1) =>
    `Our ${h1} targets data analysts, BI managers, and analytics platform administrators at organizations running Tableau Desktop, Server, or Cloud — verified, role-matched contacts at companies where Tableau drives business intelligence and data visualization strategy.`,

  // ── Software Hub ─────────────────────────────────────────────────────────────
  "software-email-lists": (h1) =>
    `Our ${h1} span the full enterprise and mid-market software landscape — connecting you with IT directors, software procurement managers, and platform administrators at organizations running verified, active software deployments.`,

  // ── Business Technology Leaf Pages ──────────────────────────────────────────
  "apple-ios-developers-email-list": (h1) =>
    `Our ${h1} connects you with independent app developers, mobile engineering leads, and iOS platform architects at agencies, startups, and enterprise mobile teams — verified contacts at organizations actively building and maintaining iOS applications.`,

  "google-app-engine-users-email-list": (h1) =>
    `The ${h1} from Lorann targets cloud engineers, platform architects, and DevOps leads at organizations deploying production workloads on Google App Engine — verified contacts enriched with company size, industry, and cloud infrastructure profile.`,

  "3d-printing-industry-email-list": (h1) =>
    `Our ${h1} reaches manufacturing engineers, R&D directors, and additive manufacturing specialists at companies across aerospace, healthcare, and consumer goods adopting 3D printing and additive manufacturing for prototyping, tooling, and production.`,

  "database-users-mailing-lists": (h1) =>
    `The ${h1} from Lorann delivers verified contacts for database administrators, data engineers, and IT infrastructure leads across relational, cloud, and analytical database environments — deployment-confirmed records at data-driven organizations of all sizes.`,

  // ── Business Technology Hub ──────────────────────────────────────────────────
  "business-technology-email-lists": (h1) =>
    `Our ${h1} span cloud platforms, developer tools, and enterprise applications — connecting you with CIOs, technology directors, and platform owners across the full spectrum of business technology deployments with verified, firmographic-enriched contacts.`,

  // ── Groupware ────────────────────────────────────────────────────────────────
  "groupware-email-lists": (h1) =>
    `Our ${h1} provide verified access to IT administrators, collaboration platform managers, and digital workplace leads at large enterprises and government organizations running Lotus Notes, HCL Domino, and other groupware collaboration suites.`,

  // ── Network ──────────────────────────────────────────────────────────────────
  "network-users-data-list": (h1) =>
    `The ${h1} from Lorann gives you verified contacts for network engineers, infrastructure architects, and IT operations managers at organizations managing Cisco, Juniper, Palo Alto, and other enterprise networking environments — role-confirmed, installation-verified records.`,

  // ── Technology Hub ───────────────────────────────────────────────────────────
  "technology": (h1) =>
    `Lorann's ${h1} database covers every software and infrastructure category — connecting you with CIOs, IT directors, platform owners, and technology procurement leads at verified, technographic-confirmed organizations across the full B2B technology landscape.`,
};

function getDescription(slug, h1) {
  const lastSegment = slug.split("/").pop();
  if (DESCRIPTIONS[lastSegment]) return DESCRIPTIONS[lastSegment](h1);

  // Sub-category fallback functions
  if (slug.includes("/erp-users")) return `Our ${h1} provides verified access to IT directors, operations executives, and ERP administrators at companies running this platform — installation-confirmed contacts enriched with role, seniority, and firmographic depth.`;
  if (slug.includes("/crm-users")) return `The ${h1} from Lorann delivers verified contacts for CRM administrators, sales operations leaders, and technology decision-makers at organizations running this platform — role-matched records with deployment and firmographic data.`;
  if (slug.includes("/dbms-users")) return `Our ${h1} connects you with database administrators, data architects, and IT infrastructure managers at organizations running this database platform — technographic-confirmed contacts enriched with company size and deployment scope.`;
  if (slug.includes("/operating-system")) return `The ${h1} from Lorann gives you verified access to system administrators, infrastructure architects, and IT operations managers at organizations running this operating system — deployment-confirmed, role-matched contacts.`;
  if (slug.includes("/software-email")) return `Our ${h1} delivers verified contacts for platform administrators, procurement managers, and technology directors at organizations running this software solution — firmographic-enriched records with role and deployment data.`;
  if (slug.includes("/business-technology")) return `The ${h1} from Lorann reaches IT directors, platform architects, and technology procurement leads at organizations adopting this technology — verified, deployment-confirmed contact data enriched with company firmographics.`;

  // Generic tech fallback
  return `Our ${h1} provides verified access to IT decision-makers, platform administrators, and technology buyers at organizations running this solution — installation-confirmed contacts enriched with role, seniority, and firmographic depth.`;
}

async function run() {
  console.log(`\nUpdating technology hero descriptions (keyword-inclusive)`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const pages = await client.fetch(
    `*[_type == "page" && !(_id match "drafts.*") && slug.current match "data-assets/b2b-database/technology*"]
    { _id, h1, "slug": slug.current } | order(slug.current)`
  );

  console.log(`Found ${pages.length} technology page(s)\n`);

  let updated = 0;
  for (const page of pages) {
    const desc = getDescription(page.slug, page.h1);
    const heroDescription = rt(desc);

    console.log(`  ${page.slug}`);
    console.log(`  H1: "${page.h1}"`);
    console.log(`  → "${desc.slice(0, 90)}..."`);

    if (!DRY_RUN) {
      await client.patch(page._id).set({ heroDescription }).commit();
      try {
        const draft = await client.getDocument(`drafts.${page._id}`);
        if (draft) await client.patch(`drafts.${page._id}`).set({ heroDescription }).commit();
      } catch {}
      console.log(`  ✓\n`);
    } else {
      console.log(`  [dry-run]\n`);
    }
    updated++;
  }

  console.log(`Done — ${updated} page(s) ${DRY_RUN ? "would be" : "were"} updated.\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
