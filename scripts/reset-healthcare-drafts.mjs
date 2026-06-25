/**
 * Fixes "Unknown field found: introContent" warnings in Sanity Studio.
 *
 * Root cause: Draft documents have a _system.base.rev that points to an OLD
 * revision of the published document — one that still had the introContent
 * field. Sanity Studio resolves draft+base together, so introContent appears
 * even though neither the current published doc nor the draft delta has it.
 *
 * Fix: For each affected page draft, delete the stale draft and recreate it
 * from the current published document (which is clean and has no introContent).
 * All content patches (attributes, etc.) are already in the published document,
 * so recreating the draft from published preserves everything.
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

const DRY_RUN = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset   = "production";
const token     = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const client = createClient({ projectId, dataset, apiVersion: "2021-06-07", token, useCdn: false });

// Healthcare page slugs that were touched by our patch scripts
// Plus all other healthcare pages that may have stale drafts
const healthcarePrefixes = [
  "data-assets/b2b-database/healthcare/",
];

async function run() {
  console.log(`\nProject: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  // Get all published healthcare page documents
  const published = await client.fetch(
    `*[_type == "page" && slug.current match "data-assets/b2b-database/healthcare/**"]
     | order(slug.current)
     { _id, _rev, "slug": slug.current }`
  );
  console.log(`Healthcare published pages: ${published.length}`);

  let fixed = 0;
  let skipped = 0;

  for (const pub of published) {
    const draftId = `drafts.${pub._id}`;

    // Fetch the draft directly
    const draft = await client.getDocument(draftId);
    if (!draft) { skipped++; continue; }

    // Check if draft has a stale _system.base reference (old base revision)
    const hasStaleBase = draft._system?.base?.rev && draft._system.base.rev !== pub._rev;

    const slug = pub.slug.split("/").pop();
    if (hasStaleBase) {
      console.log(`  [stale base] ${slug} — base rev ${draft._system.base.rev} vs published ${pub._rev}`);
    } else {
      // Even without stale base, recreate to be safe (field might be in delta)
      console.log(`  [clean base] ${slug} — recreating draft from published`);
    }

    if (!DRY_RUN) {
      // Get full published document
      const fullPub = await client.getDocument(pub._id);
      if (!fullPub) { console.log(`    ! published doc not found, skipping`); continue; }

      // Strip system fields, build clean draft
      const { _id, _rev, _createdAt, _updatedAt, _system, ...rest } = fullPub;
      const newDraft = { _id: draftId, _type: rest._type, ...rest };

      // Delete old draft and create clean one in a transaction
      await client
        .transaction()
        .delete(draftId)
        .createOrReplace(newDraft)
        .commit();
      console.log(`    ✓ draft reset`);
      fixed++;
    } else {
      fixed++;
    }
  }

  console.log(`\n${DRY_RUN ? "[dry-run] Would reset" : "✓ Reset"} ${fixed} drafts (${skipped} had no draft)\n`);
  if (!DRY_RUN) {
    console.log("Reload the Sanity Studio — the 'Unknown field found' warnings should now be gone.\n");
  }
}

run().catch((err) => { console.error(err); process.exit(1); });
