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
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val.map(b => {
      if (typeof b === "string") return b;
      if (b._type === "block" && b.children) {
        return b.children.map(c => c.text || "").join("");
      }
      return "";
    }).join(" ");
  }
  if (val._type === "block" && val.children) {
    return val.children.map(c => c.text || "").join("");
  }
  return JSON.stringify(val);
}

async function main() {
  const hp = await client.fetch(`*[_type == "homepage"][0]`);
  if (!hp) { console.log("No homepage document found."); return; }

  console.log("=== HOMEPAGE CONTENT (all text fields) ===\n");

  // Hero
  console.log("--- HERO ---");
  console.log("heroBadgeLabel:", hp.heroBadgeLabel);
  console.log("heroBadgeText:", hp.heroBadgeText);
  console.log("heroLine1:", hp.heroLine1);
  console.log("heroLine2Start:", hp.heroLine2Start);
  console.log("heroLine2Highlight:", hp.heroLine2Highlight);
  console.log("heroLine3Start:", hp.heroLine3Start);
  console.log("heroLine3Highlight:", hp.heroLine3Highlight);
  console.log("heroDescription:", extractText(hp.heroDescription));

  // Value Props
  console.log("\n--- VALUE PROPS ---");
  console.log("valueKicker:", hp.valueKicker);
  console.log("valueTitleStart:", hp.valueTitleStart);
  console.log("valueTitleHighlight:", hp.valueTitleHighlight);
  if (hp.valueCards) {
    hp.valueCards.forEach((c, i) => {
      console.log(`  card[${i}] title: ${c.title}`);
      console.log(`  card[${i}] desc: ${extractText(c.desc)}`);
    });
  }

  // Signal Exchange
  console.log("\n--- SIGNAL EXCHANGE ---");
  console.log("signalKicker:", hp.signalKicker);
  console.log("signalTitle:", hp.signalTitle);
  console.log("signalDescription:", extractText(hp.signalDescription));
  if (hp.signalFeatures) {
    hp.signalFeatures.forEach((f, i) => console.log(`  feature[${i}]:`, f));
  }

  // How It Works
  console.log("\n--- HOW IT WORKS ---");
  console.log("howKicker:", hp.howKicker);
  console.log("howTitleStart:", hp.howTitleStart);
  console.log("howTitleHighlight:", hp.howTitleHighlight);
  console.log("howTitleEnd:", hp.howTitleEnd);
  console.log("howDescription:", extractText(hp.howDescription));
  if (hp.howSteps) {
    hp.howSteps.forEach((s, i) => {
      console.log(`  step[${i}] title: ${s.title}`);
      console.log(`  step[${i}] desc: ${extractText(s.desc)}`);
    });
  }

  // Numbers/Stats
  console.log("\n--- NUMBERS ---");
  console.log("numbersKicker:", hp.numbersKicker);
  console.log("numbersTitleStart:", hp.numbersTitleStart);
  console.log("numbersTitleHighlight:", hp.numbersTitleHighlight);
  console.log("numbersDescription:", extractText(hp.numbersDescription));

  // Solutions
  console.log("\n--- SOLUTIONS ---");
  console.log("solutionsKicker:", hp.solutionsKicker);
  console.log("solutionsTitleStart:", hp.solutionsTitleStart);
  console.log("solutionsTitleHighlight:", hp.solutionsTitleHighlight);
  console.log("solutionsDescription:", extractText(hp.solutionsDescription));
  if (hp.solutionsRows) {
    hp.solutionsRows.forEach((r, i) => {
      console.log(`  row[${i}] kicker: ${r.kicker}`);
      console.log(`  row[${i}] title: ${r.title}`);
      console.log(`  row[${i}] titleAccent: ${r.titleAccent}`);
      console.log(`  row[${i}] desc: ${extractText(r.desc)}`);
    });
  }

  // Industries
  console.log("\n--- INDUSTRIES ---");
  console.log("industriesKicker:", hp.industriesKicker);
  console.log("industriesTitleStart:", hp.industriesTitleStart);
  console.log("industriesTitleHighlight:", hp.industriesTitleHighlight);
  console.log("industriesDescription:", extractText(hp.industriesDescription));
  if (hp.industriesItems) {
    hp.industriesItems.forEach((it, i) => {
      console.log(`  item[${i}] title: ${it.title}`);
      console.log(`  item[${i}] desc: ${extractText(it.desc)}`);
    });
  }

  // Final CTA
  console.log("\n--- FINAL CTA ---");
  console.log("finalCtaKicker:", hp.finalCtaKicker);
  console.log("finalCtaTitleStart:", hp.finalCtaTitleStart);
  console.log("finalCtaTitleHighlight:", hp.finalCtaTitleHighlight);
  console.log("finalCtaDescription:", extractText(hp.finalCtaDescription));
  if (hp.finalCtaTrust) {
    hp.finalCtaTrust.forEach((t, i) => console.log(`  trust[${i}]:`, t));
  }

  // Count Lorann mentions
  const allText = JSON.stringify(hp);
  const matches = allText.match(/lorann/gi) || [];
  console.log(`\n=== Total "Lorann" mentions: ${matches.length} ===`);
  // Show context for each
  const lines = allText.split(",");
  lines.forEach(l => {
    if (/lorann/i.test(l) && !/lorannllc\.com|lorann@|token/i.test(l)) {
      console.log("  Found in:", l.substring(0, 120));
    }
  });
}

main().catch(console.error);
