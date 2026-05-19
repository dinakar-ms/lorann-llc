/**
 * Fix Meet the Team page:
 * 1. Adjust Michael Connolly's photo objectPosition to align with other team members
 * 2. Set all team member emails to info@lorannllc.com
 *
 * Usage:
 *   $env:SANITY_WRITE_TOKEN = "sk..."; node scripts/fix-team-page.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local if present
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {}

const writeToken = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!writeToken) {
  console.error("No token found. Set SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: writeToken,
  useCdn: false,
});

async function run() {
  console.log("🔧  Fixing Meet the Team page…\n");

  // Fetch the meet-the-team page
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "about/meet-the-team" && !(_id in path("drafts.**"))][0]`
  );

  if (!page) {
    console.error("❌  Could not find about/meet-the-team page in Sanity.");
    process.exit(1);
  }

  // Find the teamMembers field — could be in sections or at top level
  // Let's inspect the document structure first
  const keys = Object.keys(page).filter(k => !k.startsWith("_"));
  console.log("  Document fields:", keys.join(", "));

  // Look for team members in sections array
  let teamMembers = null;
  let teamSectionIndex = -1;
  let teamFieldPath = null;

  if (page.sections && Array.isArray(page.sections)) {
    for (let i = 0; i < page.sections.length; i++) {
      const section = page.sections[i];
      if (section.teamMembers || section.members || section.team) {
        teamMembers = section.teamMembers || section.members || section.team;
        teamSectionIndex = i;
        const fieldName = section.teamMembers ? "teamMembers" : section.members ? "members" : "team";
        teamFieldPath = `sections[${i}].${fieldName}`;
        break;
      }
    }
  }

  // Also check top-level fields
  if (!teamMembers) {
    for (const key of keys) {
      const val = page[key];
      if (Array.isArray(val) && val.length > 0 && val[0]?.name) {
        teamMembers = val;
        teamFieldPath = key;
        break;
      }
    }
  }

  if (!teamMembers || !Array.isArray(teamMembers)) {
    console.log("\n  ⚠  Could not find teamMembers array. Dumping sections structure:");
    if (page.sections) {
      for (let i = 0; i < page.sections.length; i++) {
        const s = page.sections[i];
        console.log(`    sections[${i}]: _type=${s._type}, keys=${Object.keys(s).filter(k => !k.startsWith("_")).join(", ")}`);
      }
    }
    // Try dumping all array fields
    for (const key of keys) {
      if (Array.isArray(page[key])) {
        console.log(`    ${key}: array of ${page[key].length} items, first item keys: ${page[key][0] ? Object.keys(page[key][0]).join(", ") : "empty"}`);
      }
    }
    process.exit(1);
  }

  console.log(`\n  Found ${teamMembers.length} team members at "${teamFieldPath}":\n`);

  for (let i = 0; i < teamMembers.length; i++) {
    const m = teamMembers[i];
    console.log(`    ${i + 1}. ${m.name || "unnamed"}`);
    console.log(`       objectPosition: ${m.objectPosition || "(not set, default: center 20%)"}`);
    console.log(`       email: ${m.email || "(not set)"}`);
  }

  // ── Apply fixes ──────────────────────────────────────────
  const updatedMembers = teamMembers.map((m, i) => {
    const updated = { ...m };

    // Fix #1: Adjust first member (Michael Connolly) photo position
    if (i === 0) {
      const oldPos = m.objectPosition || "center 20%";
      updated.objectPosition = "center 15%";
      console.log(`\n  📸  ${m.name}: objectPosition "${oldPos}" → "center 15%"`);
    }

    // Fix #2: Set all emails to info@lorannllc.com
    if (m.email && m.email !== "info@lorannllc.com") {
      console.log(`  ✉️   ${m.name}: email "${m.email}" → "info@lorannllc.com"`);
    }
    updated.email = "info@lorannllc.com";

    return updated;
  });

  // Build patch
  const patch = {};
  patch[teamFieldPath] = updatedMembers;

  // Patch published version
  const publishedId = page._id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;

  try {
    await client.patch(publishedId).set(patch).commit();
    console.log(`\n  ✅  Published document patched.`);
  } catch (err) {
    console.error(`  ❌  Failed to patch published: ${err.message}`);
  }

  // Patch draft version if it exists
  try {
    const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId });
    if (draft) {
      // Find team members in draft too
      let draftPatch = {};
      if (draft.sections && teamSectionIndex >= 0) {
        const draftSection = draft.sections[teamSectionIndex];
        const fieldName = teamFieldPath.split(".").pop();
        if (draftSection && draftSection[fieldName]) {
          const draftMembers = draftSection[fieldName].map((m, i) => {
            const updated = { ...m };
            if (i === 0) updated.objectPosition = "center 15%";
            updated.email = "info@lorannllc.com";
            return updated;
          });
          draftPatch[teamFieldPath] = draftMembers;
        }
      } else {
        draftPatch = patch;
      }
      await client.patch(draftId).set(draftPatch).commit();
      console.log(`  ✅  Draft document patched.`);
    } else {
      console.log(`  ⏭   No draft version found.`);
    }
  } catch (err) {
    console.error(`  ❌  Failed to patch draft: ${err.message}`);
  }

  console.log(`\n🏁  Done!\n`);
}

run().catch((err) => {
  console.error("Script failed:", err.message);
  process.exit(1);
});
