#!/usr/bin/env node
import { createClient } from "next-sanity";

const TOKEN =
  "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

function extractText(val) {
  if (!val) return "(empty)";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val.map(b => {
      if (typeof b === "string") return b;
      if (b._type === "block" && b.children) return b.children.map(c => c.text || "").join("");
      return "";
    }).join(" ");
  }
  return "";
}

async function main() {
  const hp = await client.fetch(`*[_type == "homepage" && !(_id in path("drafts.**"))][0]`);

  console.log("=== UPDATED HOMEPAGE — Lorann mentions ===\n");

  const heroDesc = extractText(hp.heroDescription);
  const signalDesc = extractText(hp.signalDescription);
  const solDesc = hp.solutionsRows ? extractText(hp.solutionsRows[0]?.desc) : "";
  const ctaDesc = extractText(hp.finalCtaDescription);

  console.log("1. HERO description:");
  console.log(`   "${heroDesc}"`);
  console.log(`   Contains Lorann: ${/lorann/i.test(heroDesc) ? "✅ YES" : "❌ NO"}\n`);

  console.log("2. SIGNAL EXCHANGE description:");
  console.log(`   "${signalDesc}"`);
  console.log(`   Contains Lorann: ${/lorann/i.test(signalDesc) ? "✅ YES" : "❌ NO"}\n`);

  console.log("3. SOLUTIONS row[0] description:");
  console.log(`   "${solDesc}"`);
  console.log(`   Contains Lorann: ${/lorann/i.test(solDesc) ? "✅ YES" : "❌ NO"}\n`);

  console.log("4. FINAL CTA description:");
  console.log(`   "${ctaDesc}"`);
  console.log(`   Contains Lorann: ${/lorann/i.test(ctaDesc) ? "✅ YES" : "❌ NO"}\n`);

  // Count total visible Lorann mentions (excluding URLs, emails, meta)
  let count = 0;
  if (/lorann/i.test(heroDesc)) count++;
  if (/lorann/i.test(signalDesc)) count++;
  if (/lorann/i.test(solDesc)) count++;
  if (/lorann/i.test(ctaDesc)) count++;

  console.log(`=== Total visible "Lorann" content mentions: ${count} ===`);
}

main().catch(console.error);
