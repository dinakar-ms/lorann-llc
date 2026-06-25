/**
 * Lists all fields of specific documents to find the extra one.
 */
import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry",
  dataset: "production",
  apiVersion: "2021-06-07",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// Physicians & Doctors (has 43 fields vs 42 for others)
const doc = await client.getDocument("drafts.XCp4eNJ6YVZskS4ztz1IdR");
if (doc) {
  const keys = Object.keys(doc).sort();
  console.log(`\nPhysicians & Doctors draft (${keys.length} fields):`);
  keys.forEach(k => {
    const val = doc[k];
    const preview = val === null ? "null" :
      Array.isArray(val) ? `[array:${val.length}]` :
      typeof val === "object" ? `{object}` :
      String(val).slice(0, 60);
    console.log(`  ${k}: ${preview}`);
  });
}

// Compare with NP draft (42 fields)
const np = await client.getDocument("drafts.P4n5H6Le0izBS9IEByevXu");
if (np) {
  const npKeys = Object.keys(np).sort();
  const docKeys = doc ? Object.keys(doc).sort() : [];
  const extra = docKeys.filter(k => !npKeys.includes(k));
  const missing = npKeys.filter(k => !docKeys.includes(k));
  console.log(`\nExtra fields in Physicians vs NP:`, extra);
  console.log(`Missing fields in Physicians vs NP:`, missing);
}
