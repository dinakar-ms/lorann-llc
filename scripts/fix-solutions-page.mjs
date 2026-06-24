#!/usr/bin/env node
/**
 * Fix the Solutions page:
 * 1. Set templateType to "hub" so heroDescription renders
 * 2. Add intro section fields so introParagraphs render
 * 3. Add childrenItems with links to solution sub-pages
 * Result: 3-4 visible Lorann brand mentions in content
 */
import { createClient } from "next-sanity";
import { randomBytes } from "crypto";

const TOKEN =
  "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
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

async function main() {
  const docs = await client.fetch(
    `*[_type == "page" && slug.current == "solutions"]{ _id, heroDescription, introParagraphs, childrenItems }`
  );

  if (docs.length === 0) {
    console.log("Solutions page not found.");
    return;
  }

  for (const doc of docs) {
    const isDraft = doc._id.startsWith("drafts.");
    const patch = {};

    // 1. Set templateType to hub
    patch.templateType = "hub";

    // 2. Set hero fields
    patch.kicker = "Solutions";
    patch.titlePlain = "Data-driven solutions for";
    patch.titleAccent = "every campaign.";

    // 3. heroDescription — already has 2 Lorann mentions, keep it.
    // But adjust to 1 mention for better balance (3-4 total target)
    patch.heroDescription = [
      makeBlock("Lorann delivers precision audience targeting, data enrichment, and activation solutions — built for B2B, healthcare, and consumer campaigns that demand measurable performance.")
    ];

    // 4. Add intro section fields so introParagraphs render
    patch.introKicker = "Our Approach";
    patch.introHeadlinePlain = "Solutions built for";
    patch.introHeadlineAccent = "performance.";

    // 5. Update introParagraphs (keep 2 Lorann mentions in body)
    patch.introParagraphs = [
      makeBlock("Every Lorann solution is built around one principle: data should drive performance, not just fill a database. Our solutions connect audience strategy to campaign execution across every channel your team uses."),
      makeBlock("From audience construction through Signal eXchange™ to multi-channel data activation, Lorann provides the tools and expertise that performance-driven marketing teams need to reduce cost per lead and maximize ROI."),
    ];

    // 6. Add children section fields
    patch.childrenSectionKicker = "Explore";
    patch.childrenSectionTitlePlain = "Choose the solution that";
    patch.childrenSectionTitleAccent = "fits your goals.";
    patch.childrenSectionColumns = 3;

    // 7. Add children items (solution sub-pages) if none exist
    if (!doc.childrenItems || doc.childrenItems.length === 0) {
      patch.childrenItems = [
        {
          _type: "featureItem",
          _key: key(),
          icon: "Target",
          title: "Audience Targeting",
          desc: [makeBlock("Build precision audiences from 95M+ verified contacts across B2B, healthcare, and consumer datasets — segmented by role, intent, geography, and behavior.")],
          href: "/solutions/audience-targeting",
        },
        {
          _type: "featureItem",
          _key: key(),
          icon: "Database",
          title: "Data Enrichment",
          desc: [makeBlock("Enhance existing CRM and prospect data with firmographic, technographic, and intent signals — then apply predictive modeling to prioritize high-converting prospects.")],
          href: "/solutions/data-enrichment",
        },
        {
          _type: "featureItem",
          _key: key(),
          icon: "Zap",
          title: "Data Activation",
          desc: [makeBlock("Deploy audiences directly into CRM, email, programmatic, and omnichannel workflows — formatted for your stack, ready for immediate campaign execution.")],
          href: "/solutions/data-activation",
        },
        {
          _type: "featureItem",
          _key: key(),
          icon: "Radio",
          title: "Signal eXchange™",
          desc: [makeBlock("Fuse first-party lead data with real-time intent signals to create continuously evolving audiences that reach ready buyers — not just the right people.")],
          href: "/solutions/signal-exchange",
        },
        {
          _type: "featureItem",
          _key: key(),
          icon: "LineChart",
          title: "Cost Per Lead",
          desc: [makeBlock("Understand and optimize your cost per lead with verified data, better targeting, and reduced waste — driving measurable improvements in campaign ROI.")],
          href: "/solutions/cost-per-lead",
        },
      ];
    }

    try {
      await client.patch(doc._id).set(patch).commit();
      console.log(`  ✓ ${isDraft ? "(draft)" : "(published)"} Solutions page updated`);
    } catch (err) {
      console.error(`  ✗ ${doc._id}: ${err.message}`);
    }
  }

  console.log("\n✅ Solutions page updated with hub template and brand mentions.");
  console.log("\nLorann mentions in visible content:");
  console.log("  1. Hero: \"Lorann delivers precision audience targeting...\"");
  console.log("  2. Intro para 1: \"Every Lorann solution is built around one principle...\"");
  console.log("  3. Intro para 2: \"...Lorann provides the tools and expertise...\"");
  console.log("  Total: 3 mentions in content (not in headings)");
}

main().catch(console.error);
