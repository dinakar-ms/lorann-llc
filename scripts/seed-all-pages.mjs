// Seeds all singleton page documents for Sanity Presentation click-to-edit.
// Idempotent — uses `setIfMissing`, so re-running will not overwrite
// fields already edited in Studio. Seeds both published + draft docs.
//
// Run: node scripts/seed-all-pages.mjs

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const envPath = join(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ── About Page ──
const ABOUT_PAGE = {
  heroKicker: "About Lorann",
  heroTitleStart: "Built to help marketers",
  heroTitleHighlight: "list smarter.",
  heroDescription: "Lorann is a premium audience development and activation partner for B2B, healthcare, and consumer data intelligence — delivering data that drives real marketing outcomes.",
  missionKicker: "Our Mission",
  missionTitleStart: "We believe great marketing starts with",
  missionTitleHighlight: "great data.",
  missionParagraph1: "Lorann was founded on a simple observation: marketing teams everywhere are drowning in tools, but starving for audiences that actually perform. Most data providers hand you a list; we hand you a strategy.",
  missionParagraph2: "We combine 95M+ continuously verified contacts with our proprietary Signal eXchange™ intent layer — then pair that with the hands-on partnership most teams never get from a data vendor.",
  missionParagraph3: "The result: audiences that don't just reach people, they reach the right people, at the right time, through the right channels.",
  valuesKicker: "Our Values",
  valuesTitleStart: "What we",
  valuesTitleHighlight: "stand for",
  valuesSubtitle: "Six principles that shape every dataset we build and every campaign we support.",
  valuesCards: [
    { iconName: "Target", title: "Precision over volume", desc: "Better-targeted audiences outperform bigger lists every time. We choose quality at every step." },
    { iconName: "Eye", title: "Transparency always", desc: "Clear sourcing, clear methods, clear compliance. Our clients know exactly what they're buying." },
    { iconName: "Heart", title: "Client-first culture", desc: "Every engagement is a partnership. We win when your campaigns win — that's the whole business." },
    { iconName: "TrendingUp", title: "Continuous improvement", desc: "Data moves. So do we. Our verification, enrichment, and modeling never stop." },
    { iconName: "Users", title: "Privacy as a value", desc: "We treat consumer and business data like the sensitive asset it is — with GDPR, CCPA, and beyond." },
    { iconName: "Award", title: "Outcomes we can prove", desc: "Open reporting, measurable impact, and campaigns that lift the metrics clients actually care about." },
  ],
  scaleKicker: "Our Scale",
  scaleTitleStart: "Built on",
  scaleTitleHighlight: "trust and volume",
  scaleStats: [
    { num: "95M+", label: "Verified Contacts" },
    { num: "98%", label: "Accuracy Rate" },
    { num: "500+", label: "Industries" },
    { num: "10K+", label: "Campaigns Powered" },
  ],
  scaleCtaLabel: "Work With Us",
  scaleCtaHref: "/contact",
  metaTitle: "About · Lorann LLC",
  metaDescription: "Lorann builds audiences that perform. Learn about our mission, team, and commitment to data quality.",
};

// ── How It Works Page ──
const HOW_IT_WORKS_PAGE = {
  heroKicker: "The Process",
  heroTitleStart: "From data to",
  heroTitleHighlight: "results",
  heroDescription: "A structured, transparent process that takes your audience from strategy to activation to continuous optimization.",
  promisesKicker: "Our Promise",
  promisesTitleStart: "What every client",
  promisesTitleHighlight: "can expect",
  promisesCards: [
    { iconName: "Clock", title: "Fast turnaround", desc: "Most engagements go from kickoff to first activation in 7–14 days." },
    { iconName: "Users2", title: "Dedicated partnership", desc: "A named data strategist works directly with your team throughout." },
    { iconName: "FileCheck", title: "Transparent reporting", desc: "Clear methodology, clear sourcing, clear outcomes — documented." },
    { iconName: "Headphones", title: "Ongoing support", desc: "Refresh cycles, optimization reviews, and direct access to our team." },
  ],
  metaTitle: "How It Works · Lorann LLC",
  metaDescription: "A structured four-step process from data strategy to audience activation and continuous optimization.",
};

// ── Industries Page ──
const INDUSTRIES_PAGE = {
  heroKicker: "Industries",
  heroTitleStart: "Vertical expertise",
  heroTitleHighlight: "that delivers",
  heroDescription: "Deep knowledge across five flagship industries — with accurate data, targeted segmentation, and measurable activation outcomes.",
  deepDivesKicker: "Deep Dives",
  deepDivesTitleStart: "Industry-specific",
  deepDivesTitleHighlight: "data assets",
  deepDivesSubtitle: "Each vertical has its own sourcing, compliance framework, and segmentation logic.",
  deepDivesItems: [
    { id: "healthcare", iconName: "Heart", title: "Healthcare", lede: "Physicians, hospital systems, specialists, and allied health professionals.", features: ["NPI-verified physician records", "Hospital & health-system hierarchies", "Specialty-level segmentation", "HIPAA-conscious practices"] },
    { id: "financial", iconName: "BarChart3", title: "Financial Services", lede: "Banks, credit unions, wealth managers, CFOs, and treasury decision-makers.", features: ["High-net-worth consumer data", "Commercial banking decision-makers", "Wealth-tier segmentation", "Regulatory-compliant sourcing"] },
    { id: "b2b", iconName: "Building2", title: "B2B", lede: "Department heads, procurement teams, and decision-makers across every industry.", features: ["Function + seniority filters", "Technographic intelligence", "Company-size & revenue filters", "ABM-ready account lists"] },
    { id: "insurance", iconName: "Shield", title: "Insurance", lede: "Auto, life, health, and property buyers from high-intent lead programs.", features: ["In-market intent signals", "Coverage-type segmentation", "Age + demographic filters", "Multi-channel activation"] },
    { id: "automotive", iconName: "Car", title: "Automotive", lede: "In-market buyers, dealerships, fleet operators, and aftermarket networks.", features: ["Vehicle-purchase intent", "Dealership contact data", "Fleet operator records", "Geographic + make/model filters"] },
  ],
  metaTitle: "Industries · Lorann LLC",
  metaDescription: "Vertical expertise across healthcare, financial, B2B, insurance, and automotive — powered by high-accuracy data.",
};

// ── Solutions Page ──
const SOLUTIONS_PAGE = {
  heroKicker: "Solutions",
  heroTitleStart: "Flexible solutions for",
  heroTitleHighlight: "every campaign",
  heroDescription: "From audience discovery to activation, our services adapt to your marketing stack and operational workflow. Explore each solution below.",
  metaTitle: "Solutions · Lorann LLC",
  metaDescription: "Precision audience targeting, data enrichment, lead generation, and data activation — built for B2B, healthcare, and consumer campaigns.",
};

// ── Insights Page ──
const INSIGHTS_PAGE = {
  heroKicker: "Insights",
  heroTitleStart: "Perspectives on",
  heroTitleHighlight: "data, audience strategy,",
  heroTitleEnd: "and performance-driven marketing.",
  heroDescription: "Our content hub for POV, commentary, case studies, and data-driven insights from the team at Lorann.",
  heroPrimaryCta: { label: "Read Industry Trends", href: "/insights/industry-trends" },
  heroSecondaryCta: { label: "See Case Studies", href: "/insights/case-studies" },
  browseKicker: "Browse by Type",
  browseTitleStart: "Three places",
  browseTitleHighlight: "to dig in.",
  browseDescription: "Short-form commentary, real-campaign results, and periodic updates — all in one place.",
  browseCards: [
    { iconName: "LineChart", title: "Industry Trends", desc: "Perspectives on data, audience strategy, and performance-driven marketing. Articles, commentary, and strategic POV.", href: "/insights/industry-trends" },
    { iconName: "FileText", title: "Case Studies", desc: "Examples of how Lorann data and audience strategies support real campaign performance across industries and channels.", href: "/insights/case-studies" },
    { iconName: "Mailbox", title: "Newsletter", desc: "Get periodic insights on data, audience strategy, and marketing performance delivered directly to your inbox.", href: "/insights/newsletter" },
  ],
  metaTitle: "Insights · Lorann LLC",
  metaDescription: "POV, commentary, case studies, and newsletters on data, audience strategy, and performance-driven marketing.",
};

// ── Signal eXchange Page ──
const SIGNAL_EXCHANGE_PAGE = {
  heroKicker: "Proprietary Intelligence",
  heroTitleStart: "Meet",
  heroTitleHighlight: "Signal eXchange™",
  heroDescription: "The industry's first continuously evolving dataset that fuses first-party lead data with real-time intent signals — delivering audiences that reach ready buyers, not just people.",
  capabilitiesKicker: "Capabilities",
  capabilitiesTitleStart: "Six capabilities,",
  capabilitiesTitleHighlight: "one engine",
  capabilitiesSubtitle: "Every Signal eXchange™ audience benefits from the full capability set — working together.",
  capabilitiesCards: [
    { iconName: "Database", title: "First-party data layer", desc: "Continuously sourced lead data from trusted partners, processed through our proprietary quality pipeline." },
    { iconName: "Radio", title: "Real-time intent signals", desc: "Live buyer-signal feeds reveal who's actively researching what — so you focus where demand exists right now." },
    { iconName: "RefreshCw", title: "Continuous refresh", desc: "Profiles never stop improving. Verification, enrichment, and scoring run continuously in the background." },
    { iconName: "Target", title: "Higher-intent segments", desc: "Intent + firmographic fusion produces audiences that convert measurably higher than traditional lists." },
    { iconName: "Zap", title: "Channel-ready output", desc: "Activate directly into CRM, email, Programmatic ads, and direct mail with no reformatting friction." },
    { iconName: "BarChart3", title: "Performance feedback loop", desc: "Campaign results feed back into the model — so your audiences get sharper with every activation." },
  ],
  resultsKicker: "Typical Results",
  resultsTitleStart: "Audiences that",
  resultsTitleHighlight: "perform",
  resultsDescription: "Signal eXchange™ audiences consistently outperform traditional list pulls across the metrics that matter — opens, engagement, meetings, and pipeline.",
  resultsCta: { label: "Request a Demo", href: "mailto:info@lorannllc.com?subject=Signal%20eXchange%20Demo" },
  resultsStats: [
    { num: "+40%", label: "Engagement lift" },
    { num: "+28%", label: "Meeting rate" },
    { num: "+35%", label: "Pipeline velocity" },
    { num: "-22%", label: "CAC reduction" },
  ],
  metaTitle: "Signal eXchange™ · Lorann LLC",
  metaDescription: "Our proprietary intelligence layer fuses first-party lead data with real-time intent signals — producing higher-converting audiences.",
};

// ── Resources Page ──
const RESOURCES_PAGE = {
  heroKicker: "Resources",
  heroTitleStart: "Ideas, guides, and",
  heroTitleHighlight: "benchmarks",
  heroDescription: "Practical thinking on audience development, data quality, and marketing performance — written by our team.",
  posts: [
    { iconName: "BookOpen", type: "Guide", title: "Building audiences that convert in 2026", excerpt: "The playbook for combining first-party data with intent signals — and why most vendors still get it wrong." },
    { iconName: "FileText", type: "White Paper", title: "Data accuracy's hidden tax on ROI", excerpt: "Every 1% drop in data accuracy costs far more than list price. Here's the math, and how to fix it." },
    { iconName: "Download", type: "Template", title: "Audience brief template", excerpt: "The one-page document every marketing team should share with their data partner before kickoff." },
    { iconName: "BookOpen", type: "Guide", title: "Intent signals explained", excerpt: "What they are, where they come from, how to use them responsibly, and what to watch out for." },
    { iconName: "FileText", type: "Case Study", title: "40% pipeline lift in healthcare", excerpt: "How a mid-market medtech client doubled their meeting book after switching to Signal eXchange™." },
    { iconName: "Download", type: "Checklist", title: "GDPR + CCPA audit checklist", excerpt: "A practical checklist for marketing teams verifying data-partner compliance." },
  ],
  newsletterTitle: "Get our best thinking, monthly",
  newsletterSubtitle: "No spam. Just high-signal ideas on audience intelligence.",
  newsletterCtaLabel: "Subscribe to newsletter",
  metaTitle: "Resources · Lorann LLC",
  metaDescription: "Guides, white papers, and case studies on audience intelligence, data quality, and marketing performance.",
};

// ── Contact Page ──
const CONTACT_PAGE = {
  heroKicker: "Get In Touch",
  heroTitleStart: "Let's build an audience",
  heroTitleHighlight: "that performs.",
  heroDescription: "Tell us your goals — we'll develop a data strategy aligned to your targeting, activation, and performance needs. Expect a reply within one business day.",
  infoTitle: "Reach us directly",
  infoDescription: "Prefer email or phone? You can also reach the team directly using the contact information below.",
  infoEmailLabel: "Email",
  infoEmailValue: "info@lorannllc.com",
  infoPhoneLabel: "Phone",
  infoPhoneValue: "+1 914-565-5300",
  infoPhoneHref: "tel:+19145655300",
  infoAddressLabel: "Address",
  infoAddressLine1: "75 Lake Rd, Suite 326",
  infoAddressLine2: "Congers, NY 10920-2343",
  responseTitle: "Typical response time",
  responseBody: "Within one business day. For urgent requests, call during business hours ET.",
  formNameLabel: "Full Name *",
  formCompanyLabel: "Company *",
  formEmailLabel: "Email *",
  formPhoneLabel: "Phone",
  formInterestLabel: "I'm interested in *",
  formInterestPlaceholder: "Choose one",
  formInterestOptions: ["Audience Targeting", "Data Enrichment", "Signal eXchange™", "Lead Generation", "Data Activation", "Other"],
  formMessageLabel: "Tell us about your goals *",
  formMessagePlaceholder: "Share your audience goals, channels, timelines…",
  formSubmitLabel: "Send Message",
  formPrivacyNote: "Your email client will open with a pre-filled message. We respect your privacy — submissions are not stored on our servers.",
  successTitle: "Message ready to send",
  successBody: "Your email client has been opened with the message pre-filled. If nothing happened, email us directly at",
  metaTitle: "Contact · Lorann LLC",
  metaDescription: "Tell us your goals — we'll develop a data strategy aligned to your targeting, activation, and performance needs.",
};

// ── Data Assets Page ──
const DATA_ASSETS_PAGE = {
  heroKicker: "Data Assets",
  heroTitleStart: "Built on",
  heroTitleHighlight: "Better Data.",
  heroDescription: "A structured view of the datasets behind our solutions — designed to support targeting, enrichment, and activation across marketing channels.",
  heroPrimaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
  heroSecondaryCta: { label: "Request Data Overview", href: "/contact" },
  sectionKicker: "Explore the Data",
  sectionTitleStart: "Five asset classes,",
  sectionTitleHighlight: "one unified platform.",
  sectionDescription: "Each dataset is built for a specific targeting need — and designed to work together when you need broader audience coverage.",
  features: [
    { icon: "Briefcase", title: "B2B Data", desc: "Comprehensive business and professional datasets for prospecting, account-based marketing, and audience development across industries.", href: "/data-assets/b2b-data" },
    { icon: "Activity", title: "Healthcare Data", desc: "Specialized healthcare datasets built with compliance, accuracy, and targeting precision in mind.", href: "/data-assets/healthcare-data" },
    { icon: "Sparkles", title: "Signal eXchange™", desc: "Lorann's proprietary dataset, combining first-party lead data with intent and behavioral signals to create more actionable, performance-driven audiences.", href: "/data-assets/signal-exchange", badge: "Flagship" },
    { icon: "Users", title: "Consumer Data", desc: "Behavioral, lifestyle, and demographic audience attributes designed to support direct and Programmatic consumer outreach.", href: "/data-assets/consumer-data" },
    { icon: "CreditCard", title: "Data Cards", desc: "Detailed audience definitions, attributes, and counts available through our data card library to support planning and campaign development.", href: "/data-assets/data-cards" },
  ],
  metaTitle: "Data Assets · Built on Better Data — Lorann LLC",
  metaDescription: "A structured view of the datasets behind our solutions — designed to support targeting, enrichment, and activation across marketing channels.",
};

// ── Seed all singletons ──
const SINGLETONS = [
  { id: "aboutPage", type: "aboutPage", data: ABOUT_PAGE },
  { id: "howItWorksPage", type: "howItWorksPage", data: HOW_IT_WORKS_PAGE },
  { id: "industriesPage", type: "industriesPage", data: INDUSTRIES_PAGE },
  { id: "solutionsPage", type: "solutionsPage", data: SOLUTIONS_PAGE },
  { id: "insightsPage", type: "insightsPage", data: INSIGHTS_PAGE },
  { id: "signalExchangePage", type: "signalExchangePage", data: SIGNAL_EXCHANGE_PAGE },
  { id: "resourcesPage", type: "resourcesPage", data: RESOURCES_PAGE },
  { id: "contactPage", type: "contactPage", data: CONTACT_PAGE },
  { id: "dataAssetsPage", type: "dataAssetsPage", data: DATA_ASSETS_PAGE },
];

for (const { id, type, data } of SINGLETONS) {
  for (const docId of [id, `drafts.${id}`]) {
    await client.createIfNotExists({ _id: docId, _type: type });
    await client.patch(docId).setIfMissing(data).commit();
  }
  console.log(`✓ Seeded ${id}`);
}

console.log("\nAll page singletons seeded (published + draft, existing fields preserved).");
