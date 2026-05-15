/**
 * Copy leaf template data from draft → published for 6 legal pages.
 * Run:  node scripts/fix-legal-published.mjs
 */
import { readFileSync } from "fs";
import { createClient } from "@sanity/client";

const env = readFileSync(".env.local", "utf8");
const get = (key) => {
  const m = env.match(new RegExp(`${key}=(.+)`));
  return m ? m[1].trim() : "";
};

const client = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2024-01-01",
  token: get("SANITY_API_WRITE_TOKEN"),
  useCdn: false,
});

const SLUGS = [
  "privacy-policy",
  "data-security-policy",
  "ccpa-privacy-policy",
  "cookie-policy",
  "do-not-sell-my-data",
  "do-not-call-compliance",
];

async function fix() {
  for (const slug of SLUGS) {
    // Get full draft doc
    const draft = await client.fetch(
      `*[_type == "page" && _id == $id][0]`,
      { id: `drafts.page-${slug}` }
    );
    if (!draft) { console.log(`  SKIP ${slug} — no draft`); continue; }

    // Copy to published ID
    const published = { ...draft, _id: `page-${slug}` };
    delete published._rev;
    await client.createOrReplace(published);
    console.log(`  PUBLISHED page-${slug} → leaf template`);
  }
  console.log("\n✅ Done.");
}

fix().catch((err) => { console.error(err); process.exit(1); });
