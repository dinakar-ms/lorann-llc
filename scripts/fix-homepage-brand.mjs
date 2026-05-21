#!/usr/bin/env node
/**
 * Add "Lorann" brand mentions to the homepage content (2-4 times).
 * Places: Hero description, body content (value props + solutions), CTA
 */
import { createClient } from "next-sanity";
import { randomBytes } from "crypto";

const TOKEN =
  "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const key = () => randomBytes(6).toString("hex");

function makeBlock(text) {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

/** Update text inside a block array (richText) by replacing old text with new */
function updateBlockText(blocks, oldText, newText) {
  if (!blocks || !Array.isArray(blocks)) return blocks;
  return blocks.map(block => {
    if (block._type === "block" && block.children) {
      return {
        ...block,
        children: block.children.map(child => {
          if (child.text && child.text.includes(oldText)) {
            return { ...child, text: child.text.replace(oldText, newText) };
          }
          return child;
        }),
      };
    }
    return block;
  });
}

async function main() {
  // Get both published and draft versions
  const docs = await client.fetch(`*[_type == "homepage"]{ _id, heroDescription, signalDescription, solutionsRows, howDescription, finalCtaDescription, valueCards }`);

  if (docs.length === 0) {
    console.log("No homepage document found.");
    return;
  }

  for (const hp of docs) {
    const patch = {};
    const isDraft = hp._id.startsWith("drafts.");

    // 1. HERO — Add Lorann to heroDescription
    // Current: empty or generic. Set to a new description with Lorann.
    if (!hp.heroDescription || (Array.isArray(hp.heroDescription) && hp.heroDescription.length === 0)) {
      // heroDescription is empty — create it with Lorann mention
      patch.heroDescription = [
        makeBlock("Lorann delivers verified, multi-channel audience data across B2B, healthcare, and consumer markets — built for campaigns that demand precision and performance.")
      ];
    } else {
      // heroDescription exists — check if Lorann is already there
      const text = JSON.stringify(hp.heroDescription);
      if (!/lorann/i.test(text)) {
        // Add Lorann naturally by updating existing text
        patch.heroDescription = updateBlockText(
          hp.heroDescription,
          // Try common sentence starts
          "Build",
          "Lorann helps you build"
        );
        // If no change was made, just prepend
        if (JSON.stringify(patch.heroDescription) === JSON.stringify(hp.heroDescription)) {
          patch.heroDescription = [
            makeBlock("Lorann delivers verified, multi-channel audience data across B2B, healthcare, and consumer markets — built for campaigns that demand precision and performance.")
          ];
        }
      }
    }

    // 2. BODY — Signal Exchange description: add Lorann
    if (hp.signalDescription) {
      const sigText = JSON.stringify(hp.signalDescription);
      if (!/lorann/i.test(sigText)) {
        patch.signalDescription = updateBlockText(
          hp.signalDescription,
          "The industry's first continuously evolving dataset",
          "Lorann's Signal eXchange™ is the industry's first continuously evolving dataset"
        );
      }
    }

    // 3. BODY — Solutions row[0] desc: add Lorann
    if (hp.solutionsRows && Array.isArray(hp.solutionsRows) && hp.solutionsRows.length > 0) {
      const solText = JSON.stringify(hp.solutionsRows);
      if (!/lorann/i.test(solText)) {
        const updatedRows = hp.solutionsRows.map((row, i) => {
          if (i === 0) {
            // First solutions row — add Lorann
            return {
              ...row,
              desc: updateBlockText(
                row.desc,
                "Leverage high-quality B2B, healthcare, and consumer data",
                "Leverage Lorann's high-quality B2B, healthcare, and consumer data"
              ),
            };
          }
          return row;
        });
        patch.solutionsRows = updatedRows;
      }
    }

    // 4. CTA — finalCtaDescription: add Lorann
    if (hp.finalCtaDescription) {
      const ctaText = JSON.stringify(hp.finalCtaDescription);
      if (!/lorann/i.test(ctaText)) {
        patch.finalCtaDescription = updateBlockText(
          hp.finalCtaDescription,
          "Tell us your goals — we'll develop a data strategy",
          "Tell us your goals — Lorann will develop a data strategy"
        );
      }
    }

    // Apply patch
    const fields = Object.keys(patch);
    if (fields.length === 0) {
      console.log(`  ⊘ ${hp._id}: No changes needed (Lorann already present)`);
      continue;
    }

    try {
      await client.patch(hp._id).set(patch).commit();
      console.log(`  ✓ ${isDraft ? "(draft)" : "(published)"} Updated: ${fields.join(", ")}`);
    } catch (err) {
      console.error(`  ✗ ${hp._id}: ${err.message}`);
    }
  }

  console.log("\n✅ Homepage brand mentions updated.");
}

main().catch(console.error);
