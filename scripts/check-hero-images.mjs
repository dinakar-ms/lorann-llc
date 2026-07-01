import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
env.split("\n").forEach(l => { const m = l.match(/^([^#=]+)=(.*)/); if(m) process.env[m[1].trim()] = m[2].trim(); });

const client = createClient({
  projectId: "a694bsry", dataset: "production",
  apiVersion: "2024-10-01", token: process.env.SANITY_API_READ_TOKEN, useCdn: false,
});

const slugs = [
  "data-assets/b2b-database/technology/business-technology-email-lists/database-users-mailing-lists",
  "data-assets/b2b-database/technology/business-technology-email-lists/google-app-engine-users-email-list",
  "data-assets/b2b-database/technology/crm-users-mailing-data/achiever-crm-users-lists",
  "data-assets/b2b-database/technology/crm-users-mailing-data/acqueon-crm-users-lists",
  "data-assets/b2b-database/technology/crm-users-mailing-data/crm-solutions-users-email-lists",
  "data-assets/b2b-database/technology/crm-users-mailing-data/crm-users-mailing-data-detail",
  "data-assets/b2b-database/technology/crm-users-mailing-data/microsoft-dynamics-crm-users-mailing-list",
  "data-assets/b2b-database/technology/crm-users-mailing-data/oncontact-crm-customers-email-list",
  "data-assets/b2b-database/technology/crm-users-mailing-data/salesforce-crm-email-list",
  "data-assets/b2b-database/technology/crm-users-mailing-data/siebel-crm-users-list",
  "data-assets/b2b-database/other-industry/banking-finance-email-lists",
  "data-assets/b2b-database/other-industry/hotels-email-lists",
  "data-assets/b2b-database/other-industry/insurance-contact-lists",
  "data-assets/b2b-database/other-industry/it-decision-makers-mailing-list",
  "data-assets/b2b-database/other-industry/real-estate-data-list",
  "data-assets/b2b-database/other-industry/sports-industry-email-lists",
];

const results = await client.fetch(
  `*[_type == "page" && slug.current in $slugs && !(_id in path("drafts.**"))]{
    "slug": slug.current,
    "h1": title,
    "heroImage": heroSection.imageUrl,
    "heroImageAlt": heroSection.imageAlt,
    "heroKicker": heroSection.kicker,
    "heroHeadline": heroSection.headlinePlain,
    "heroAccent": heroSection.headlineAccent,
    "heroSubtext": heroSection.subtext,
    "featuresImage": healthcareFeaturesSection.heroImageUrl,
  }`,
  { slugs }
);

// Sort by slug order
results.sort((a, b) => slugs.indexOf(a.slug) - slugs.indexOf(b.slug));

results.forEach(r => {
  console.log(`\n━━━ ${r.slug.split("/").pop()} ━━━`);
  console.log(`  H1/Title:      ${r.h1}`);
  console.log(`  Kicker:        ${r.heroKicker ?? "(none)"}`);
  console.log(`  Headline:      ${r.heroHeadline ?? "(none)"} ${r.heroAccent ?? ""}`);
  console.log(`  Hero Image:    ${r.heroImage ?? "❌ MISSING"}`);
  console.log(`  Features Img:  ${r.featuresImage ?? "(none)"}`);
});

console.log(`\nTotal: ${results.length} pages`);
const missing = results.filter(r => !r.heroImage);
console.log(`Missing hero images: ${missing.length}`);
missing.forEach(r => console.log(`  • ${r.slug.split("/").pop()}`));
