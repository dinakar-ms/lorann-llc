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

function inspectValue(label, val) {
  if (val === null || val === undefined) {
    console.log(`  ${label}: null/undefined`);
    return;
  }
  if (typeof val === "string") {
    console.log(`  ${label}: string (${val.length} chars) "${val.substring(0, 60)}..."`);
    return;
  }
  if (Array.isArray(val)) {
    console.log(`  ${label}: array[${val.length}]`);
    if (val.length > 0) {
      const first = val[0];
      if (typeof first === "string") {
        console.log(`    [0]: string "${first.substring(0, 60)}..."`);
      } else if (typeof first === "object") {
        console.log(`    [0]: object keys=${Object.keys(first).join(",")}`);
      }
    }
    return;
  }
  if (typeof val === "object") {
    console.log(`  ${label}: object keys=${Object.keys(val).join(",")}`);
    return;
  }
  console.log(`  ${label}: ${typeof val}`);
}

async function main() {
  // Check homepage document
  const hp = await client.fetch(`*[_type == "homepage"][0]`);
  if (!hp) {
    console.log("No homepage document found.");
    return;
  }

  console.log("=== Homepage Document Fields ===\n");
  const fields = Object.keys(hp).filter(k => !k.startsWith("_"));
  for (const field of fields) {
    inspectValue(field, hp[field]);
  }

  // Check specifically the fields that are rendered
  console.log("\n=== Key Rich Text Fields ===");
  const richFields = [
    "heroDescription", "valueDescription", "signalDescription",
    "howDescription", "numbersDescription", "solutionsDescription",
    "industriesDescription", "finalCtaDescription"
  ];

  for (const f of richFields) {
    const val = hp[f];
    if (!val) continue;
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        const item = val[i];
        if (typeof item === "object" && item._type === "block") {
          // This is expected for richText
          continue;
        }
        console.log(`  ⚠️ ${f}[${i}] is NOT a block: type=${typeof item}`);
      }
    } else if (typeof val !== "string") {
      console.log(`  ⚠️ ${f} is object but NOT array: type=${typeof val} keys=${Object.keys(val)}`);
    }
  }

  // Check value prop items and other nested fields
  console.log("\n=== Nested Rich Text Fields ===");
  const nestedFields = [
    "valueItems", "solutionRows", "howSteps", "numberItems",
    "industryItems", "signalFeatures"
  ];
  for (const f of nestedFields) {
    const arr = hp[f];
    if (!arr || !Array.isArray(arr)) continue;
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.desc !== undefined) {
        if (typeof item.desc !== "string" && !Array.isArray(item.desc)) {
          console.log(`  ⚠️ ${f}[${i}].desc is object: keys=${Object.keys(item.desc)}`);
        } else if (typeof item.desc === "string") {
          // Plain string is fine
        } else if (Array.isArray(item.desc) && item.desc.length > 0 && item.desc[0]._type === "block") {
          // Block array is fine (richText)
        }
      }
      if (item.description !== undefined) {
        if (typeof item.description === "object" && !Array.isArray(item.description) && item.description._type === "block") {
          console.log(`  ⚠️ ${f}[${i}].description is a single block object!`);
        }
      }
    }
  }

  // Check all fields for any that might be single block objects (NOT arrays)
  console.log("\n=== Single Block Object Check ===");
  function findSingleBlocks(obj, path) {
    if (!obj || typeof obj !== "object") return;
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => findSingleBlocks(item, `${path}[${i}]`));
      return;
    }
    if (obj._type === "block" && obj.children) {
      console.log(`  ⚠️ Single block object at: ${path}`);
      return;
    }
    for (const key of Object.keys(obj)) {
      if (key.startsWith("_")) continue;
      findSingleBlocks(obj[key], `${path}.${key}`);
    }
  }
  findSingleBlocks(hp, "homepage");
}

main().catch(console.error);
