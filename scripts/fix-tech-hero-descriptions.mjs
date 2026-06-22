/**
 * Updates heroDescription for all technology leaf pages under
 * /data-assets/b2b-database/technology/ with unique, product-specific copy.
 *
 * Usage:
 *   node scripts/fix-tech-hero-descriptions.mjs                            (development)
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
function rt(text) {
  return [block(text)];
}

// Unique hero descriptions keyed by slug suffix (last segment of the slug path).
// For pages not in this map, a category-based fallback is used.
const DESCRIPTIONS = {
  // ── ERP ─────────────────────────────────────────────────────────────────
  "broadvision-erp-users-lists":
    "BroadVision powers digital commerce and self-service portals for enterprise B2B and B2C companies — reach the IT architects, e-commerce directors, and platform owners who manage these deployments with verified contact data.",

  "epicor-erp-users-list":
    "Epicor ERP drives operations across manufacturing, distribution, and retail — connect with plant managers, IT directors, and operations executives at companies running Epicor in production with firmographic-enriched, verified contacts.",

  "unleashed-software-erp-users-lists":
    "Unleashed Software centralizes inventory and manufacturing data for product-based businesses — target warehouse managers, operations directors, and finance leads at SMB and mid-market companies using Unleashed with deployment-confirmed contact records.",

  "timberline-erp-users-mailing-list":
    "Sage Timberline (now Sage 300 CRE) is the industry-standard ERP for construction and real estate — reach project managers, CFOs, and IT leads at general contractors and property developers running Timberline with verified, role-matched contacts.",

  "ibm-erp-users-lists":
    "IBM ERP systems — including AS/400 and iSeries environments — anchor enterprise operations at large manufacturing, financial, and government organizations — connect with IT directors, system architects, and CIOs managing these platforms with verified decision-maker data.",

  "ibs-enterprise-erp-users-lists":
    "IBS Enterprise ERP serves the distribution, logistics, and supply chain sector — reach supply chain managers, distribution executives, and warehouse technology buyers at companies running IBS with contacts verified against corporate directories and industry registries.",

  "i4a-erp-users-lists":
    "i4a (now iMIS) is the leading association management ERP — target membership directors, association executives, and technology administrators at professional associations and nonprofits using i4a with verified professional contacts.",

  "upside-software-erp-users-lists":
    "Upside Software specializes in contract and travel management ERP — connect with procurement managers, contract administrators, and travel technology buyers at enterprises running Upside with role-specific, deployment-verified contact records.",

  // ── ERP hub ─────────────────────────────────────────────────────────────
  "erp-users-email-lists":
    "ERP platforms sit at the core of enterprise operations — reach IT directors, operations executives, and procurement leads across the full spectrum of ERP deployments, from manufacturing to distribution, with technographic-verified contact data.",

  // ── CRM ─────────────────────────────────────────────────────────────────
  "salesforce-crm-email-list":
    "Salesforce is deployed at over 150,000 companies worldwide — target CRM administrators, sales operations managers, and Salesforce platform owners with verified email and phone contacts enriched by org-size, edition, and module-level adoption data.",

  "microsoft-dynamics-crm-users-mailing-list":
    "Microsoft Dynamics CRM is embedded across enterprise and mid-market sales teams — reach Dynamics administrators, IT managers, and sales directors at companies running Dynamics 365 or on-premise deployments with verified, role-matched contact data.",

  "siebel-crm-users-list":
    "Oracle Siebel CRM is deployed at large enterprises across financial services, telecom, and manufacturing — connect with enterprise IT architects, CRM program managers, and business transformation leaders at Fortune 1000 Siebel accounts with verified contacts.",

  "oncontact-crm-customers-email-list":
    "Oncontact CRM (CDC Software) serves mid-market manufacturers and distributors — reach sales managers, CRM administrators, and business development leads at companies running Oncontact with verified, firmographic-enriched contact records.",

  "achiever-crm-users-lists":
    "Achiever CRM helps loyalty and incentive-driven organizations manage customer relationships — target program managers, marketing directors, and CRM system owners with verified contacts at companies running the Achiever platform.",

  "acqueon-crm-users-lists":
    "Acqueon powers AI-driven engagement and outbound campaign management for contact centers — reach customer engagement directors, contact center managers, and CX technology leads at enterprises using Acqueon with verified decision-maker contacts.",

  "crm-solutions-users-email-lists":
    "CRM adoption spans every industry and company size — target sales operations leaders, CRM administrators, and technology evaluators across the full landscape of CRM platform users with verified, firmographic-enriched contact data.",

  "crm-users-mailing-data-detail":
    "CRM contact data goes beyond the platform — our records include verified email, direct-dial phone, role title, company firmographics, and technographic signals for decision-makers at organizations actively managing customer relationships through CRM systems.",

  // ── CRM hub ─────────────────────────────────────────────────────────────
  "crm-users-mailing-data":
    "CRM systems are deployed across every industry vertical — connect with sales operations directors, CRM administrators, and technology decision-makers at companies running leading CRM platforms with verified, installation-confirmed contact data.",

  // ── DBMS ────────────────────────────────────────────────────────────────
  "ibm-users-email-list":
    "IBM Db2 and IMS database systems underpin transaction processing at banks, insurers, and large manufacturers — reach database administrators, enterprise architects, and IT infrastructure managers at Db2-dependent organizations with verified contact records.",

  "mongodb-users-list":
    "MongoDB drives modern application development at startups through Fortune 500 companies — connect with backend engineers, DevOps architects, and CTO-level decision-makers at organizations running MongoDB Atlas or self-hosted deployments with verified, role-specific contacts.",

  // ── DBMS hub ─────────────────────────────────────────────────────────────
  "dbms-users-email-data":
    "Database management systems are mission-critical infrastructure — reach database administrators, data architects, and enterprise IT leaders across relational, NoSQL, and cloud database platforms with technographic-verified contact data.",

  // ── Operating Systems ────────────────────────────────────────────────────
  "linux-users-email-list":
    "Linux powers over 90% of cloud servers and a growing share of enterprise workloads — target system administrators, DevOps engineers, and open-source technology leads at organizations running Red Hat, Ubuntu, CentOS, and other Linux distributions with verified contacts.",

  "ms-customers-list":
    "Microsoft infrastructure — Windows Server, Azure, Active Directory, and Microsoft 365 — dominates enterprise IT — reach IT administrators, Microsoft solution architects, and technology directors at Microsoft-dependent organizations with verified, role-matched contact data.",

  "unix-users-mailing-data":
    "Unix systems remain foundational at large enterprises, financial institutions, and government agencies — connect with system administrators, UNIX engineers, and infrastructure architects managing AIX, HP-UX, and Solaris environments with verified, enterprise-grade contacts.",

  // ── OS hub ───────────────────────────────────────────────────────────────
  "operating-system-users-list":
    "Operating system deployments reveal the infrastructure decisions of IT organizations — reach system administrators, infrastructure architects, and IT operations managers across Windows, Linux, and Unix environments with deployment-verified contact data.",

  // ── Software ────────────────────────────────────────────────────────────
  "tibco-user-email-list":
    "TIBCO middleware and integration platforms connect enterprise applications at large financial services, retail, and manufacturing companies — reach integration architects, middleware administrators, and enterprise architecture leads at TIBCO-dependent organizations with verified contacts.",

  "paycom-users-lists":
    "Paycom HCM manages payroll, talent, and HR operations for mid-market and enterprise companies — target HR directors, payroll managers, and HRIS administrators at organizations running Paycom with verified contacts enriched by company size and employee count.",

  "vmware-users-email-list":
    "VMware virtualization and cloud infrastructure underpins data centers at tens of thousands of enterprises — connect with virtualization engineers, vSphere administrators, and infrastructure managers at VMware-licensed organizations with verified, role-matched contacts.",

  "cisco-resellers-email-database":
    "Cisco resellers and channel partners sell networking, security, and collaboration solutions to businesses of all sizes — reach channel account managers, networking solution architects, and partner principal engineers at certified Cisco reseller organizations with verified contacts.",

  "cogz-cmms-contact-database":
    "Cogz CMMS helps maintenance teams manage work orders, assets, and preventive maintenance schedules — target maintenance managers, facilities directors, and plant engineering leads at manufacturing and facilities-intensive organizations running Cogz with verified contacts.",

  "plm-software-user-list":
    "PLM platforms manage product design, engineering, and lifecycle data at manufacturers across aerospace, automotive, and industrial sectors — reach engineering managers, CAD administrators, and product development directors at PLM-dependent companies with verified contacts.",

  "esri-mailing-list":
    "Esri ArcGIS is the world's leading GIS platform, used by government agencies, utilities, and environmental organizations — connect with GIS specialists, spatial data analysts, and mapping technology decision-makers at Esri-licensed organizations with verified contact records.",

  "quickbooks-email-list":
    "QuickBooks powers accounting and financial management for millions of small and mid-market businesses — target business owners, accountants, and bookkeepers at QuickBooks-dependent organizations with verified contacts segmented by company size and industry.",

  "tableau-users-list":
    "Tableau drives business intelligence and data visualization at thousands of enterprises — reach data analysts, BI managers, and analytics platform administrators at organizations running Tableau Desktop, Server, or Cloud with verified, role-matched contact data.",

  // ── Software hub ─────────────────────────────────────────────────────────
  "software-email-lists":
    "Enterprise and mid-market software decisions are made by a defined set of stakeholders — reach IT directors, software procurement managers, and platform administrators across the full spectrum of business software deployments with verified, technographic-confirmed contacts.",

  // ── Business Technology ──────────────────────────────────────────────────
  "apple-ios-developers-email-list":
    "iOS developers build the mobile applications that companies rely on to engage customers and employees — reach independent app developers, mobile engineering leads, and iOS platform architects at agencies, startups, and enterprise mobile teams with verified contacts.",

  "google-app-engine-users-email-list":
    "Google App Engine developers build and scale cloud-native applications on Google's managed infrastructure — connect with cloud engineers, platform architects, and DevOps leads at organizations deploying production workloads on App Engine with verified contact data.",

  "3d-printing-industry-email-list":
    "3D printing and additive manufacturing is transforming prototyping, tooling, and production across aerospace, healthcare, and consumer goods — reach manufacturing engineers, R&D directors, and additive manufacturing specialists at companies adopting 3D printing with verified contacts.",

  "database-users-mailing-lists":
    "Database platforms are the backbone of every data-driven organization — target database administrators, data engineers, and IT infrastructure leads across relational, cloud, and analytical database environments with verified, deployment-confirmed contact records.",

  // ── Business Technology hub ──────────────────────────────────────────────
  "business-technology-email-lists":
    "Business technology decisions span cloud platforms, developer tools, and enterprise applications — reach CIOs, technology directors, and platform owners across the full spectrum of business technology deployments with verified, firmographic-enriched contact data.",

  // ── Groupware ────────────────────────────────────────────────────────────
  "groupware-email-lists":
    "Groupware platforms — including Lotus Notes, HCL Domino, and collaboration suites — manage communication and workflow at large enterprises and government organizations — reach IT administrators, collaboration platform managers, and digital workplace leads with verified contacts.",

  // ── Network ──────────────────────────────────────────────────────────────
  "network-users-data-list":
    "Network infrastructure decisions are made by a concentrated group of IT leaders — reach network engineers, infrastructure architects, and IT operations managers at organizations managing Cisco, Juniper, Palo Alto, and other enterprise networking environments with verified contacts.",

  // ── Technology hub ───────────────────────────────────────────────────────
  "technology":
    "Technology buyers are among the most targeted and valuable audiences in B2B marketing — reach CIOs, IT directors, platform owners, and technology procurement leads across every software and infrastructure category with verified, technographic-confirmed contact data.",
};

function getDescription(slug) {
  // Try exact last-segment match first
  const lastSegment = slug.split("/").pop();
  if (DESCRIPTIONS[lastSegment]) return DESCRIPTIONS[lastSegment];

  // Try second-to-last segment (hub pages like /technology/erp-users-email-lists)
  const parts = slug.split("/");
  if (parts.length >= 2) {
    const parentSegment = parts[parts.length - 2];
    if (DESCRIPTIONS[parentSegment]) return DESCRIPTIONS[parentSegment];
  }

  // Fallback by sub-category
  if (slug.includes("/erp-users")) return "ERP systems drive core operations at manufacturing, distribution, and service companies — reach IT directors, operations executives, and ERP administrators at companies running this platform with verified, installation-confirmed contact data.";
  if (slug.includes("/crm-users")) return "CRM platforms are central to sales and customer engagement strategy — reach CRM administrators, sales operations leaders, and technology decision-makers at organizations running this platform with verified, role-matched contact records.";
  if (slug.includes("/dbms-users")) return "Database systems are the foundation of enterprise data infrastructure — reach database administrators, data architects, and IT infrastructure managers at organizations running this platform with verified, technographic-confirmed contacts.";
  if (slug.includes("/operating-system")) return "Operating system deployments define the infrastructure foundation of IT organizations — reach system administrators, infrastructure architects, and IT operations managers at organizations running this platform with verified contact data.";
  if (slug.includes("/software-email")) return "Enterprise software decisions are made by a defined set of IT and business stakeholders — reach platform administrators, procurement managers, and technology directors at organizations running this solution with verified, firmographic-enriched contacts.";
  if (slug.includes("/business-technology")) return "Business technology buyers evaluate solutions that drive competitive advantage — reach IT directors, platform architects, and technology procurement leads at organizations adopting this technology with verified, deployment-confirmed contact data.";

  // Generic tech fallback
  return "Technology platform users represent high-value, intent-rich B2B audiences — connect with IT decision-makers, platform administrators, and technology buyers at organizations running this solution with verified, installation-confirmed contact data.";
}

async function run() {
  console.log(`\nUpdating technology hero descriptions`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const pages = await client.fetch(
    `*[_type == "page" && !(_id match "drafts.*") && slug.current match "data-assets/b2b-database/technology*"]
    { _id, h1, "slug": slug.current } | order(slug.current)`
  );

  console.log(`Found ${pages.length} technology page(s)\n`);

  let updated = 0;
  for (const page of pages) {
    const desc = getDescription(page.slug);
    const heroDescription = rt(desc);

    console.log(`  ${page.slug}`);
    console.log(`  → "${desc.slice(0, 80)}..."`);

    if (!DRY_RUN) {
      await client.patch(page._id).set({ heroDescription }).commit();
      // Patch draft too if it exists
      try {
        const draft = await client.getDocument(`drafts.${page._id}`);
        if (draft) await client.patch(`drafts.${page._id}`).set({ heroDescription }).commit();
      } catch {}
      console.log(`  ✓\n`);
    } else {
      console.log(`  [dry-run — no changes written]\n`);
    }
    updated++;
  }

  console.log(`Done — ${updated} page(s) ${DRY_RUN ? "would be" : "were"} updated.\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
