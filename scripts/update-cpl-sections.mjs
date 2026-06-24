#!/usr/bin/env node
/**
 * Add new sections to the Cost Per Lead page:
 *  1. featureGridSections:
 *     - CPL by Audience Type: B2B vs. B2C vs. Healthcare
 *     - How Data Quality Drives CPL
 *     - CPL Trends: What's Shifting
 *  2. faqItems (8 questions)
 *  3. proseSections (About CPL — "Why Choose" + "Who Can Use" style)
 *
 * Run:  node scripts/update-cpl-sections.mjs
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

/* ─── Feature Grid Sections ─────────────────────────────── */

const featureGridSections = [
  // Section 1 — CPL by Audience Type
  {
    _key: key(),
    _type: "featureGridSection",
    kicker: "Audience Breakdown",
    titlePlain: "CPL by Audience Type:",
    titleAccent: "B2B vs. B2C vs. Healthcare",
    columns: 3,
    style: "card",
    features: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "Building2",
        title: "B2B CPL Benchmarks",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "B2B campaigns typically face CPLs of $50 to $200 depending on vertical complexity. Lorann's firmographic and technographic filters help you zero in on decision-makers with purchasing authority, cutting waste from unqualified clicks and generic list pulls that bloat acquisition costs.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "ShoppingCart",
        title: "B2C CPL Dynamics",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Consumer-facing campaigns often enjoy lower CPLs ($5 to $35) but demand massive volume to hit revenue targets. Our verified consumer datasets with demographic, lifestyle, and purchase-intent overlays ensure every impression connects with a real buyer, not a dead-end record.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "HeartPulse",
        title: "Healthcare CPL Challenges",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Healthcare and life-sciences campaigns contend with some of the highest CPLs ($75 to $300+) due to strict compliance, niche audiences, and long sales cycles. Lorann's HIPAA-aware targeting and NPI-validated provider records shorten the path to qualified engagement.",
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },

  // Section 2 — How Data Quality Drives CPL
  {
    _key: key(),
    _type: "featureGridSection",
    kicker: "The Data Advantage",
    titlePlain: "How Data Quality",
    titleAccent: "Drives CPL Down",
    columns: 3,
    style: "numbered",
    features: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "MailCheck",
        title: "Deliverability Eliminates Waste",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Unverified email lists generate bounce rates of 15 to 25 percent, meaning a quarter of your spend produces zero impressions. Lorann's real-time SMTP and mailbox verification keeps bounce rates under 3 percent so every dollar reaches a living inbox.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "SlidersHorizontal",
        title: "Segmentation Precision",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Broad, unsegmented audiences dilute relevance scores and tank click-through rates. With 50-plus enrichment attributes per record, you can micro-segment by role, revenue band, tech stack, and purchase stage to boost ad relevance and slash wasted impressions.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "ShieldCheck",
        title: "Compliance Prevents Penalties",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Sending to non-compliant contacts risks CAN-SPAM fines of up to $50,000 per violation and domain blacklisting that torpedoes future deliverability. Lorann datasets are scrubbed against federal and state suppression files, protecting both your budget and brand.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "RefreshCw",
        title: "Freshness Matters",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Business contact data decays at roughly 30 percent per year as people change roles, companies merge, and domains expire. Our continuous hygiene cycle refreshes records monthly so your targeting never relies on stale intelligence that inflates CPL.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Zap",
        title: "Intent Signals Prioritize Spend",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Not every qualified contact is in-market right now. Signal eXchange intent data identifies accounts actively researching your category, letting you concentrate media dollars on high-conversion windows instead of spraying budget across cold audiences.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Layers",
        title: "Deduplication Saves Budget",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Duplicate records across CRM, MAP, and vendor lists cause you to pay multiple times for the same lead. Lorann's matching and deduplication engine identifies overlaps before launch, ensuring each marketing dollar reaches a unique prospect.",
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },

  // Section 3 — CPL Trends: What's Shifting
  {
    _key: key(),
    _type: "featureGridSection",
    kicker: "Market Intelligence",
    titlePlain: "CPL Trends:",
    titleAccent: "What's Shifting in 2025",
    columns: 2,
    style: "check",
    features: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "TrendingUp",
        title: "Rising Platform Costs",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "LinkedIn CPC has increased 20 percent year-over-year, and Google Ads CPCs in competitive B2B verticals now exceed $15. Marketers who rely on platform targeting alone face steadily rising CPLs unless they bring superior first-party and third-party data to the table.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Cookie",
        title: "Cookie Deprecation Fallout",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "As third-party cookies vanish, retargeting audiences are shrinking and lookalike model accuracy is dropping. Deterministic data — verified emails, direct dials, and postal addresses — is replacing probabilistic signals as the foundation of efficient CPL.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Brain",
        title: "AI-Driven Lead Scoring",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Machine-learning models now score leads in real time based on engagement patterns, firmographic fit, and technographic signals. Teams that feed these models clean, enriched data see 30 to 50 percent CPL improvements over those relying on manual lead qualification.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Globe",
        title: "Privacy-First Acquisition",
        desc: [
          {
            _type: "block",
            _key: key(),
            style: "normal",
            markDefs: [],
            children: [
              {
                _type: "span",
                _key: key(),
                text: "Regulations like CCPA, GDPR, and state-level privacy laws are raising the compliance bar for every campaign. Ethical, permission-based data sources are becoming the only scalable path to sustainable CPL, as non-compliant vendors face enforcement and list degradation.",
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

/* ─── FAQ Items ──────────────────────────────────────────── */

const faqItems = [
  {
    _key: key(),
    question: "What is a good cost per lead benchmark?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "A competitive CPL varies by industry and channel. In B2B technology, strong CPLs range from $35 to $75. Financial services typically see $50 to $150. Healthcare runs higher at $75 to $300. The key is comparing your CPL against the lifetime value of each customer to ensure profitability, not just chasing the lowest number.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "How does data quality directly affect my cost per lead?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "Poor data quality inflates CPL in three ways: bounced emails waste send volume, inaccurate targeting wastes ad spend on the wrong audience, and duplicate records cause you to pay for the same lead multiple times. Clean, verified data eliminates all three cost multipliers simultaneously.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "What channels typically have the lowest CPL?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "Email marketing consistently delivers the lowest CPL when powered by verified lists, often under $25 per lead. Organic content and SEO also produce low-cost leads over time. Paid channels like LinkedIn and Google Ads have higher CPLs but can deliver stronger intent signals. The most efficient strategy blends multiple channels with shared audience data.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "How quickly can I expect to see CPL improvements with better data?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "Most clients see measurable CPL reductions within the first 30 to 60 days of deploying Lorann's verified data. Email campaigns show immediate improvement through lower bounce rates. Paid media campaigns typically require one to two optimization cycles to fully realize the targeting benefits.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "What is the difference between CPL and cost per acquisition?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "CPL measures the cost to generate a qualified lead — someone who has expressed interest but has not yet purchased. Cost per acquisition (CPA) measures the total cost to convert that lead into a paying customer. Improving CPL reduces CPA, but conversion optimization and sales efficiency also play critical roles in the full funnel.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "Can intent data really lower my cost per lead?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "Yes. Intent data identifies accounts and contacts actively researching topics related to your product. By concentrating spend on in-market prospects rather than cold audiences, clients typically see CPL drop by 30 to 50 percent. Signal eXchange intent signals integrate directly with major ad platforms and marketing automation tools.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "How does Lorann ensure the data stays fresh and accurate?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "Our hygiene process runs on a continuous monthly cycle. We verify emails via SMTP handshake, validate phone numbers against carrier databases, cross-reference business records with corporate filings, and flag job-change events in real time. Records that fail verification are quarantined until re-confirmed.",
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _key: key(),
    question: "Is there a minimum campaign size or contract requirement?",
    answer: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: key(),
            text: "Lorann offers flexible licensing options ranging from single-campaign list pulls to annual unlimited-use agreements. There is no minimum record count for standard list orders. Enterprise clients can license full multi-channel databases for a flat annual fee covering postal, email, and telemarketing channels.",
            marks: [],
          },
        ],
      },
    ],
  },
];

/* ─── Prose Sections (About CPL) ─────────────────────────── */

const proseSections = [
  // "Why Choose" style — split layout
  {
    _key: key(),
    _type: "proseSection",
    style: "split",
    kicker: "The Lorann Difference",
    titlePlain: "Why Smart Marketers Choose",
    titleAccent: "Data-Driven CPL Optimization",
    paragraphs: [
      "Most marketers treat cost per lead as an output metric — something you measure after a campaign ends. At Lorann, we treat it as an input you can engineer from the start. By building campaigns on verified, enriched, and intent-scored audiences, you set a lower CPL floor before a single ad dollar is committed.",
      "Our approach is different because we attack CPL from the data layer, not the creative layer. Better targeting means higher relevance scores, lower auction costs, and fewer wasted impressions. Better deliverability means every email, every call, and every direct-mail piece reaches a real person. And better intent signals mean you are spending where buyer readiness is highest.",
      "The result is not just a lower CPL — it is a compounding advantage. Each campaign cycle generates cleaner performance data, which feeds better optimization, which drives CPL even lower over time. Clients who stay with Lorann for 12 months or longer routinely see CPL reductions of 50 percent or more compared to their original benchmarks.",
    ],
    highlights: [
      { _key: key(), label: "Verified Audiences", text: "Every record passes multi-point verification before entering your campaign file, eliminating the dead weight that inflates CPL across every channel." },
      { _key: key(), label: "Intent-First Targeting", text: "Signal eXchange behavioral signals identify in-market accounts so your spend concentrates where conversion probability is highest." },
      { _key: key(), label: "Continuous Optimization", text: "Monthly data refreshes and campaign-level match-back reporting create a feedback loop that drives CPL lower with each successive campaign." },
      { _key: key(), label: "Full-Funnel Visibility", text: "Track cost per lead from first touch through closed revenue to understand true acquisition economics, not just top-of-funnel vanity metrics." },
    ],
  },
  // "Who Can Use" style — centered/dark layout
  {
    _key: key(),
    _type: "proseSection",
    style: "centered",
    kicker: "Built For Your Team",
    titlePlain: "Who Benefits from",
    titleAccent: "CPL Optimization?",
    paragraphs: [
      "Cost per lead is not just a marketing metric — it is a business performance indicator that touches demand generation, sales, finance, and executive leadership. Every team that touches the revenue pipeline has a stake in driving CPL down while maintaining lead quality.",
      "Whether you are a growth marketer managing six-figure monthly media budgets, a sales development leader who needs qualified pipeline, or a CFO evaluating marketing ROI, Lorann's data infrastructure gives you the precision and transparency to make CPL work harder for your organization.",
    ],
    highlights: [
      { _key: key(), label: "Demand Gen Marketers", text: "Build precisely targeted campaigns across email, paid search, social, and programmatic display with verified audiences that lower CPL from the first send." },
      { _key: key(), label: "Sales Development Teams", text: "Receive higher-quality leads with accurate direct dials and verified emails so outreach connects with real decision-makers, not dead ends." },
      { _key: key(), label: "Marketing Operations", text: "Integrate clean, enriched data into your CRM and MAP workflows to improve lead scoring accuracy and reduce the manual effort of data cleansing." },
      { _key: key(), label: "Revenue Leadership", text: "Gain full-funnel visibility from CPL through customer acquisition cost to understand the true ROI of every marketing dollar invested." },
    ],
  },
];

/* ─── Patch both published and draft ─────────────────────── */

async function main() {
  const docId = "page-solutions-cost-per-lead";

  for (const id of [docId, `drafts.${docId}`]) {
    try {
      await client
        .patch(id)
        .set({ featureGridSections, faqItems, proseSections })
        .commit();
      console.log(`  ✓ Patched ${id}`);
    } catch (err) {
      console.error(`  ✗ ${id}: ${err.message}`);
    }
  }

  console.log("\n✅ CPL page updated with new sections.");
}

main().catch(console.error);
