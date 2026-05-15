/**
 * Update the B2C Database hub page to include all 10 children.
 * Run:  node scripts/update-b2c-hub.mjs
 */

import { readFileSync } from "fs";
import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

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

const key = () => randomBytes(6).toString("hex");

function toPortableText(str) {
  if (!str || typeof str !== "string") return null;
  return [{
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: str, marks: [] }],
  }];
}

const NEW_CHILDREN = [
  { icon: "GraduationCap", title: "Education & EdTech", desc: "Students, educators & lifelong learners.", href: "/data-assets/b2c-database/education-edtech" },
  { icon: "HeartHandshake", title: "Healthcare & Wellness", desc: "Health-conscious consumers & patients.", href: "/data-assets/b2c-database/healthcare-wellness" },
  { icon: "Landmark", title: "Financial Services", desc: "Banking, insurance & investment consumers.", href: "/data-assets/b2c-database/financial-services" },
  { icon: "ShoppingCart", title: "Retail & Ecommerce", desc: "Online shoppers & retail loyalty audiences.", href: "/data-assets/b2c-database/retail-ecommerce" },
  { icon: "Package", title: "DTC & CPG", desc: "Direct-to-consumer & packaged goods buyers.", href: "/data-assets/b2c-database/dtc-cpg" },
  { icon: "Globe", title: "Travel", desc: "Frequent travelers & vacation planners.", href: "/data-assets/b2c-database/travel" },
  { icon: "Wifi", title: "Telecommunications", desc: "Mobile, broadband & streaming subscribers.", href: "/data-assets/b2c-database/telecommunications" },
  { icon: "Wrench", title: "Home Services", desc: "Homeowners seeking services & improvement.", href: "/data-assets/b2c-database/home-services" },
];

async function update() {
  const slug = "data-assets/b2c-database";
  const doc = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{ _id, childrenItems }`,
    { slug }
  );

  if (!doc) {
    console.log("B2C hub page not found — skipping.");
    return;
  }

  const existingItems = doc.childrenItems || [];
  const newItems = NEW_CHILDREN.map((c) => ({
    _key: key(),
    _type: "featureItem",
    icon: c.icon,
    title: c.title,
    desc: toPortableText(c.desc),
    href: c.href,
  }));

  const merged = [...existingItems, ...newItems];

  // Patch published
  await client.patch(doc._id).set({ childrenItems: merged }).commit();
  console.log(`  PATCHED ${doc._id} — now has ${merged.length} children`);

  // Patch draft
  const draftId = `drafts.${doc._id}`;
  try {
    await client.patch(draftId).set({ childrenItems: merged }).commit();
    console.log(`  PATCHED ${draftId}`);
  } catch {
    console.log(`  No draft for ${doc._id}`);
  }

  console.log("\n✅ Done.");
}

update().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
