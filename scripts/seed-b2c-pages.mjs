/**
 * Seed 8 new B2C Database leaf pages into Sanity.
 * Run:  node scripts/seed-b2c-pages.mjs
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
  return str.split("\n\n").map((para) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: para, marks: [] }],
  }));
}

// ─── B2C Leaf Page Data ────────────────────────────────
const B2C_PAGES = [
  {
    slug: "data-assets/b2c-database/education-edtech",
    h1: "Education & EdTech Consumer Data",
    kicker: "Education & EdTech",
    titlePlain: "Education & EdTech",
    titleAccent: "Consumer Data",
    heroDescription:
      "Reach students, parents, educators, and lifelong learners with verified consumer profiles — built for enrollment marketing, EdTech adoption campaigns, and continuing education outreach.",
    metaTitle: "Education & EdTech Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified consumer data for education and EdTech audiences. Reach students, parents, and educators with precision targeting for enrollment and adoption campaigns.",
    focusKeyphrase: "education consumer data",
    stats: [
      { label: "Total Records", value: "8M+" },
      { label: "Segments", value: "45+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Education & EdTech Data Matters",
    introHeadlinePlain: "The right audience at the",
    introHeadlineAccent: "right stage of learning.",
    introParagraphs: [
      "Education decisions involve multiple stakeholders — students researching programs, parents evaluating options, and professionals seeking upskilling opportunities. Generic consumer data cannot capture these distinct buying signals.",
      "Lorann's Education & EdTech dataset segments audiences by education level, enrollment intent, learning modality preferences, and technology adoption signals — so your campaigns reach the right decision-maker at the right moment.",
    ],
    attributes: [
      { icon: "GraduationCap", title: "Student Profiles", desc: "Undergraduate, graduate, and continuing education learners segmented by institution type and field of study." },
      { icon: "Users", title: "Parent & Guardian Data", desc: "K-12 and college-bound household decision-makers with income, location, and school district overlays." },
      { icon: "BookOpen", title: "Educator Contacts", desc: "Teachers, administrators, and academic professionals segmented by institution level and subject expertise." },
      { icon: "Laptop", title: "EdTech Adopters", desc: "Consumers actively using or evaluating learning platforms, LMS tools, and online course providers." },
      { icon: "Target", title: "Enrollment Intent Signals", desc: "Real-time indicators of active program research, application activity, and enrollment readiness." },
      { icon: "MapPin", title: "Geographic Precision", desc: "Campus-level, district-level, and MSA-level targeting across all 50 states." },
    ],
    useCases: [
      { title: "University Enrollment Campaigns", desc: "Target prospective students actively researching degree programs with personalized outreach by field of study and education level." },
      { title: "EdTech Product Launches", desc: "Reach educators and administrators evaluating new learning technologies, filtered by institution size and current tech stack." },
      { title: "Continuing Education Marketing", desc: "Engage working professionals showing intent signals for certifications, upskilling programs, and career-change courses." },
      { title: "K-12 Parent Outreach", desc: "Connect with parents and guardians making education decisions for their children, segmented by school district and household demographics." },
    ],
    complianceHeadline: "FERPA-aware and privacy-first.",
    complianceBody:
      "All education consumer data is sourced through opt-in channels and processed in compliance with applicable privacy regulations. No protected student records are included — only consumer-facing marketing data verified through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/healthcare-wellness",
    h1: "Healthcare & Wellness Consumer Data",
    kicker: "Healthcare & Wellness",
    titlePlain: "Healthcare & Wellness",
    titleAccent: "Consumer Data",
    heroDescription:
      "Connect with health-conscious consumers, patients, and wellness enthusiasts through verified audience profiles — purpose-built for pharma DTC, telehealth, wellness brands, and health insurance marketing.",
    metaTitle: "Healthcare & Wellness Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified healthcare and wellness consumer data. Reach health-conscious audiences, patients, and wellness enthusiasts for targeted marketing campaigns.",
    focusKeyphrase: "healthcare consumer data",
    stats: [
      { label: "Total Records", value: "12M+" },
      { label: "Conditions Tracked", value: "200+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Healthcare & Wellness Data Matters",
    introHeadlinePlain: "Reach the consumers who are",
    introHeadlineAccent: "actively managing their health.",
    introParagraphs: [
      "Healthcare consumers research conditions, compare providers, evaluate insurance options, and purchase wellness products across dozens of touchpoints. One-size-fits-all targeting misses the nuance that drives conversion in this regulated space.",
      "Lorann's Healthcare & Wellness consumer dataset captures health interest signals, wellness purchasing behavior, and condition-awareness indicators — enabling compliant, high-converting campaigns across DTC pharma, telehealth, and wellness verticals.",
    ],
    attributes: [
      { icon: "HeartPulse", title: "Health Interest Profiles", desc: "Consumers segmented by health conditions, wellness interests, and preventive care engagement levels." },
      { icon: "Pill", title: "Pharma DTC Audiences", desc: "Condition-aware consumers matched to therapeutic categories for compliant direct-to-consumer pharmaceutical campaigns." },
      { icon: "Stethoscope", title: "Telehealth Adopters", desc: "Consumers actively using or considering virtual healthcare, segmented by usage frequency and platform preference." },
      { icon: "Dumbbell", title: "Fitness & Wellness Buyers", desc: "Active purchasers of supplements, fitness equipment, wearables, and wellness subscription services." },
      { icon: "ShieldCheck", title: "Insurance Shoppers", desc: "Consumers researching or switching health, dental, and vision insurance plans during open enrollment and qualifying events." },
      { icon: "Activity", title: "Behavioral Health Signals", desc: "Engagement indicators from health content consumption, provider searches, and wellness app usage patterns." },
    ],
    useCases: [
      { title: "Pharma DTC Campaigns", desc: "Reach condition-aware consumers with compliant messaging tailored to specific therapeutic categories and treatment stages." },
      { title: "Telehealth Patient Acquisition", desc: "Target consumers actively researching virtual care options, filtered by geography, condition interest, and digital readiness." },
      { title: "Wellness Brand Marketing", desc: "Engage health-conscious consumers purchasing supplements, fitness products, and wellness services with lifestyle-matched messaging." },
      { title: "Health Insurance Enrollment", desc: "Reach consumers during key enrollment windows with plan-relevant messaging based on demographics, coverage gaps, and life events." },
    ],
    complianceHeadline: "HIPAA-aware and privacy-compliant.",
    complianceBody:
      "All healthcare consumer data is sourced from permissioned, non-clinical channels. No protected health information (PHI) is included. Data is processed in compliance with applicable regulations and verified through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/financial-services",
    h1: "Financial Services Consumer Data",
    kicker: "Financial Services",
    titlePlain: "Financial Services",
    titleAccent: "Consumer Data",
    heroDescription:
      "Target banking customers, investment-minded consumers, insurance shoppers, and credit-active households with verified financial interest profiles — built for banks, fintechs, insurers, and wealth managers.",
    metaTitle: "Financial Services Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified financial services consumer data. Target banking, investment, insurance, and credit audiences with precision for acquisition and cross-sell campaigns.",
    focusKeyphrase: "financial services consumer data",
    stats: [
      { label: "Total Records", value: "15M+" },
      { label: "Financial Segments", value: "60+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Financial Services Data Matters",
    introHeadlinePlain: "Reach consumers at their",
    introHeadlineAccent: "financial decision points.",
    introParagraphs: [
      "Financial products compete for attention at pivotal life moments — home purchases, retirement planning, insurance renewals, and credit decisions. Missing these windows means losing high-value prospects to competitors with faster, more targeted outreach.",
      "Lorann's Financial Services consumer dataset identifies households by financial behavior signals, product affinity, life-stage indicators, and credit tier — enabling precise acquisition, retention, and cross-sell campaigns across banking, insurance, and investment verticals.",
    ],
    attributes: [
      { icon: "Landmark", title: "Banking Consumers", desc: "Checking, savings, and lending customers segmented by institution type, balance tier, and product usage patterns." },
      { icon: "TrendingUp", title: "Investment-Minded Households", desc: "Consumers actively researching or holding brokerage accounts, retirement plans, and wealth management products." },
      { icon: "ShieldCheck", title: "Insurance Shoppers", desc: "Auto, home, life, and health insurance consumers segmented by renewal timing, coverage type, and carrier switching intent." },
      { icon: "CreditCard", title: "Credit-Active Consumers", desc: "Households segmented by credit product usage, application activity, and estimated credit tier for responsible targeting." },
      { icon: "Home", title: "Mortgage & Home Equity", desc: "Homeowners and prospective buyers matched by loan type interest, refinance signals, and equity position indicators." },
      { icon: "Wallet", title: "Fintech Adopters", desc: "Consumers using digital banking, payment apps, robo-advisors, and cryptocurrency platforms segmented by engagement level." },
    ],
    useCases: [
      { title: "Credit Card Acquisition", desc: "Target pre-qualified consumers with card offers matched to spending behavior, credit tier, and reward preferences." },
      { title: "Insurance Cross-Sell", desc: "Identify policyholders with coverage gaps and reach them with bundled product offers timed to renewal cycles." },
      { title: "Wealth Management Prospecting", desc: "Reach high-net-worth and mass-affluent households actively researching investment and retirement planning options." },
      { title: "Fintech App Adoption", desc: "Engage digitally active consumers with high propensity to adopt mobile banking, payment, and personal finance tools." },
    ],
    complianceHeadline: "FCRA-aware and fully compliant.",
    complianceBody:
      "Financial consumer data is sourced exclusively from permissioned, non-credit-bureau channels. No FCRA-regulated data is included. All records are processed in compliance with applicable financial marketing regulations and verified through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/retail-ecommerce",
    h1: "Retail & Ecommerce Consumer Data",
    kicker: "Retail & Ecommerce",
    titlePlain: "Retail & Ecommerce",
    titleAccent: "Consumer Data",
    heroDescription:
      "Reach online shoppers, loyalty program members, and high-value retail consumers with verified purchase-intent profiles — built for omnichannel retailers, ecommerce brands, and marketplace sellers.",
    metaTitle: "Retail & Ecommerce Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified retail and ecommerce consumer data. Target online shoppers and high-value buyers with purchase-intent signals for acquisition and retention campaigns.",
    focusKeyphrase: "retail ecommerce consumer data",
    stats: [
      { label: "Total Records", value: "20M+" },
      { label: "Purchase Categories", value: "120+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Retail & Ecommerce Data Matters",
    introHeadlinePlain: "Turn shopping signals into",
    introHeadlineAccent: "measurable revenue.",
    introParagraphs: [
      "Retail consumers move between channels — browsing online, comparing in-store, purchasing on mobile, and reordering through subscriptions. Fragmented data means missed opportunities to reach buyers when purchase intent is highest.",
      "Lorann's Retail & Ecommerce dataset unifies purchase behavior signals, category affinity, brand loyalty indicators, and channel preference data — so your campaigns reach the right buyer with the right message at the right moment.",
    ],
    attributes: [
      { icon: "ShoppingCart", title: "Online Shopper Profiles", desc: "Active ecommerce buyers segmented by purchase frequency, average order value, and category preferences." },
      { icon: "Store", title: "Omnichannel Consumers", desc: "Shoppers who buy across online, in-store, and mobile channels with cross-channel behavior mapping." },
      { icon: "Star", title: "Loyalty Program Members", desc: "Consumers enrolled in retail loyalty and reward programs segmented by engagement level and point-redemption activity." },
      { icon: "Repeat", title: "Subscription Buyers", desc: "Consumers actively using subscription box, auto-replenishment, and recurring purchase services across categories." },
      { icon: "TrendingUp", title: "High-Value Segments", desc: "Top-decile spenders and frequent purchasers identified by estimated annual retail spending and brand affinity." },
      { icon: "Tag", title: "Category Affinity", desc: "Consumer-level product category preferences spanning apparel, electronics, home goods, beauty, and 100+ sub-categories." },
    ],
    useCases: [
      { title: "Customer Acquisition", desc: "Target lookalike audiences modeled on your best customers, filtered by purchase behavior, demographics, and channel preference." },
      { title: "Cart Abandonment Recovery", desc: "Re-engage high-intent shoppers who browsed or carted products but did not complete purchase, using cross-channel retargeting." },
      { title: "Seasonal Campaign Planning", desc: "Reach consumers with peak purchase propensity during key retail moments — back-to-school, holidays, and seasonal shifts." },
      { title: "Loyalty Reactivation", desc: "Identify lapsed loyalty members and dormant buyers with targeted win-back offers based on past purchase patterns." },
    ],
    complianceHeadline: "Privacy-first and CAN-SPAM compliant.",
    complianceBody:
      "All retail consumer data is sourced from opted-in channels and processed in compliance with CAN-SPAM, CCPA, and applicable state privacy regulations. No payment card data is included. Records are verified monthly through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/dtc-cpg",
    h1: "DTC & CPG Consumer Data",
    kicker: "DTC & CPG",
    titlePlain: "Direct-to-Consumer & CPG",
    titleAccent: "Consumer Data",
    heroDescription:
      "Reach direct-to-consumer brand buyers, grocery shoppers, and packaged goods enthusiasts with verified purchase behavior profiles — purpose-built for DTC brands, CPG companies, and retail media networks.",
    metaTitle: "DTC & CPG Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified DTC and CPG consumer data. Target direct-to-consumer buyers and packaged goods shoppers with purchase behavior profiles for acquisition campaigns.",
    focusKeyphrase: "DTC CPG consumer data",
    stats: [
      { label: "Total Records", value: "18M+" },
      { label: "Product Categories", value: "80+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why DTC & CPG Data Matters",
    introHeadlinePlain: "Bypass the middleman and reach",
    introHeadlineAccent: "your end consumer directly.",
    introParagraphs: [
      "The DTC revolution has shifted power from retailers to brands — but winning requires knowing exactly who your consumer is, what they buy, and when they are ready to repurchase. Generic demographic data is not enough in a landscape built on personalization.",
      "Lorann's DTC & CPG consumer dataset maps purchase behavior across product categories, brand loyalty signals, subscription adoption, and channel preferences — giving brands the precision they need to acquire, retain, and grow lifetime value.",
    ],
    attributes: [
      { icon: "Package", title: "DTC Brand Buyers", desc: "Consumers who purchase directly from brand websites, segmented by category, frequency, and average order value." },
      { icon: "ShoppingBag", title: "Grocery & Household Shoppers", desc: "Regular purchasers of packaged food, beverages, cleaning products, and personal care items across channels." },
      { icon: "Repeat", title: "Subscription Consumers", desc: "Active subscribers to meal kits, beauty boxes, supplement deliveries, and auto-replenishment programs." },
      { icon: "Heart", title: "Brand Loyalty Indicators", desc: "Consumers mapped by brand preference strength, switching propensity, and repeat purchase rates within categories." },
      { icon: "Megaphone", title: "Social Commerce Buyers", desc: "Consumers who discover and purchase products through social media platforms and influencer recommendations." },
      { icon: "BarChart3", title: "Spending Tier Segments", desc: "Household-level estimated spending on CPG categories enabling budget-aligned targeting and offer optimization." },
    ],
    useCases: [
      { title: "DTC Brand Launch", desc: "Build awareness and trial for new direct-to-consumer products by targeting consumers with proven affinity for similar categories and purchase channels." },
      { title: "CPG Trial & Sampling", desc: "Reach category-relevant households with product sampling offers timed to competitive brand switching signals and replenishment cycles." },
      { title: "Subscription Growth", desc: "Identify high-propensity subscription adopters based on purchase frequency patterns, category engagement, and digital commerce behavior." },
      { title: "Retail Media Activation", desc: "Power retail media campaigns with brand-level purchase data that connects digital impressions to in-store and online conversion." },
    ],
    complianceHeadline: "Privacy-compliant and responsibly sourced.",
    complianceBody:
      "All DTC and CPG consumer data is collected from permissioned, opt-in sources. No transaction-level PII is shared. Data is processed in compliance with CCPA, state privacy laws, and industry self-regulatory standards, and verified monthly through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/travel",
    h1: "Travel Consumer Data",
    kicker: "Travel",
    titlePlain: "Travel",
    titleAccent: "Consumer Data",
    heroDescription:
      "Target frequent flyers, vacation planners, cruise enthusiasts, and business travelers with verified travel behavior profiles — built for airlines, hotels, OTAs, travel agencies, and destination marketers.",
    metaTitle: "Travel Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified travel consumer data. Reach frequent travelers, vacation planners, and business travelers with intent-driven targeting for bookings and loyalty campaigns.",
    focusKeyphrase: "travel consumer data",
    stats: [
      { label: "Total Records", value: "10M+" },
      { label: "Travel Segments", value: "50+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Travel Data Matters",
    introHeadlinePlain: "Reach travelers before they",
    introHeadlineAccent: "book with a competitor.",
    introParagraphs: [
      "Travel purchases have long consideration windows — consumers research destinations, compare prices, read reviews, and revisit booking sites multiple times before committing. Reaching the right traveler at the right planning stage is the difference between winning and losing the booking.",
      "Lorann's Travel consumer dataset captures trip-planning signals, loyalty program engagement, travel frequency patterns, and destination affinity — so your campaigns connect with travelers when they are actively planning, not after they have already booked.",
    ],
    attributes: [
      { icon: "Plane", title: "Frequent Travelers", desc: "Consumers segmented by air travel frequency, preferred airlines, cabin class, and domestic vs. international patterns." },
      { icon: "Hotel", title: "Hotel & Resort Guests", desc: "Lodging consumers mapped by property preference, loyalty tier, average nightly rate, and booking channel habits." },
      { icon: "Ship", title: "Cruise Enthusiasts", desc: "Consumers with cruise travel history segmented by cruise line preference, destination interest, and cabin category." },
      { icon: "Briefcase", title: "Business Travelers", desc: "Road warriors and corporate travelers identified by travel frequency, preferred vendors, and expense category patterns." },
      { icon: "Globe", title: "Destination Affinity", desc: "Consumer-level destination preferences spanning beach, mountain, urban, adventure, and cultural travel segments." },
      { icon: "Calendar", title: "Seasonal Planners", desc: "Travel intent signals mapped to booking windows — early planners, last-minute bookers, and seasonal peak travelers." },
    ],
    useCases: [
      { title: "Airline Passenger Acquisition", desc: "Target frequent flyers and price-sensitive travelers with route-specific offers based on travel behavior and loyalty status." },
      { title: "Hotel & Resort Marketing", desc: "Reach leisure and business travelers with property-matched messaging based on destination preference and spending tier." },
      { title: "OTA & Aggregator Campaigns", desc: "Drive bookings by targeting in-market travelers with dynamic offers matched to active trip-planning signals and search behavior." },
      { title: "Destination Marketing", desc: "Promote destinations to consumers with matching travel affinities, leveraging seasonal patterns and historical visit data." },
    ],
    complianceHeadline: "Privacy-compliant and ethically sourced.",
    complianceBody:
      "All travel consumer data is sourced from opted-in, permissioned channels. No passport, payment, or reservation-level PII is included. Data is processed in compliance with applicable privacy regulations and verified monthly through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/telecommunications",
    h1: "Telecommunications Consumer Data",
    kicker: "Telecommunications",
    titlePlain: "Telecommunications",
    titleAccent: "Consumer Data",
    heroDescription:
      "Reach mobile subscribers, broadband households, cord-cutters, and streaming enthusiasts with verified telecom behavior profiles — built for carriers, MVNOs, ISPs, and streaming platforms.",
    metaTitle: "Telecommunications Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified telecommunications consumer data. Target mobile subscribers, broadband users, and streaming audiences for acquisition, retention, and upgrade campaigns.",
    focusKeyphrase: "telecommunications consumer data",
    stats: [
      { label: "Total Records", value: "14M+" },
      { label: "Telecom Segments", value: "40+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Telecom Data Matters",
    introHeadlinePlain: "Win subscribers in a market where",
    introHeadlineAccent: "switching is one click away.",
    introParagraphs: [
      "Telecom is one of the most competitive consumer categories — carriers, ISPs, and streaming services fight over the same households with nearly interchangeable offers. Winning requires precision: knowing who is about to switch, who is under-served, and who is ready to upgrade.",
      "Lorann's Telecommunications consumer dataset maps device ownership, plan type indicators, contract timing signals, and streaming adoption — so your campaigns target the right subscriber with the right offer before a competitor does.",
    ],
    attributes: [
      { icon: "Smartphone", title: "Mobile Subscribers", desc: "Consumers segmented by carrier type, device brand, plan category, and estimated contract renewal timing." },
      { icon: "Wifi", title: "Broadband Households", desc: "Internet subscribers mapped by connection type, speed tier, provider, and bundle vs. standalone service indicators." },
      { icon: "Tv", title: "Streaming Consumers", desc: "Cord-cutters and streaming adopters segmented by platform subscriptions, content preferences, and engagement levels." },
      { icon: "Signal", title: "Switcher Propensity", desc: "Consumers showing signals of carrier or provider dissatisfaction and active research into competitive alternatives." },
      { icon: "Zap", title: "5G & Upgrade Ready", desc: "Subscribers with aging devices or plans eligible for technology upgrades, identified by device age and plan indicators." },
      { icon: "Users", title: "Family & Multi-Line", desc: "Household-level mapping of multi-line plans, family bundles, and shared account structures for household targeting." },
    ],
    useCases: [
      { title: "Carrier Acquisition", desc: "Target subscribers at contract-end or plan-dissatisfaction signals with competitive offers matched to their usage and device preferences." },
      { title: "Broadband Expansion", desc: "Reach underserved households in newly built or upgraded coverage areas with speed-tier and price-matched broadband offers." },
      { title: "Streaming Platform Growth", desc: "Acquire new subscribers by targeting cord-cutters and competitive platform users with content-aligned messaging and trial offers." },
      { title: "Device Upgrade Campaigns", desc: "Identify subscribers with aging devices and expiring installment plans to drive handset upgrades and plan upsells." },
    ],
    complianceHeadline: "TCPA-compliant and privacy-first.",
    complianceBody:
      "All telecommunications consumer data is sourced from permissioned channels. No call detail records, CPNI, or carrier-proprietary data is included. Data is processed in compliance with TCPA, CCPA, and applicable telecom regulations, and verified monthly through our proprietary quality pipeline.",
  },
  {
    slug: "data-assets/b2c-database/home-services",
    h1: "Home Services Consumer Data",
    kicker: "Home Services",
    titlePlain: "Home Services",
    titleAccent: "Consumer Data",
    heroDescription:
      "Reach homeowners, renters, and property managers actively seeking home improvement, maintenance, and professional services — built for contractors, franchises, home warranty providers, and service marketplaces.",
    metaTitle: "Home Services Consumer Data | B2C Database | Lorann LLC",
    metaDescription:
      "Access verified home services consumer data. Target homeowners seeking contractors, renovations, and maintenance services with intent-driven audience targeting.",
    focusKeyphrase: "home services consumer data",
    stats: [
      { label: "Total Records", value: "11M+" },
      { label: "Service Categories", value: "55+" },
      { label: "Verification", value: "Monthly" },
      { label: "Coverage", value: "All 50 States" },
    ],
    introKicker: "Why Home Services Data Matters",
    introHeadlinePlain: "Reach homeowners when the",
    introHeadlineAccent: "project is top of mind.",
    introParagraphs: [
      "Home services is a timing-driven market — consumers do not plan HVAC replacements months in advance, and a roof repair is urgent the day it leaks. Winning in this space means being visible at the exact moment a homeowner recognizes a need, not weeks before or after.",
      "Lorann's Home Services consumer dataset captures property ownership signals, home age and value indicators, recent mover triggers, and service-need propensity — so your marketing reaches homeowners when intent is highest and the project is actively being sourced.",
    ],
    attributes: [
      { icon: "Home", title: "Homeowner Profiles", desc: "Property owners segmented by home age, estimated value, square footage, and ownership tenure for service-need modeling." },
      { icon: "Truck", title: "Recent Movers", desc: "Consumers who recently purchased or relocated, with high propensity for setup, renovation, and service-provider selection." },
      { icon: "Wrench", title: "Service Category Interest", desc: "Consumers mapped to 55+ home service categories including HVAC, plumbing, roofing, landscaping, and remodeling." },
      { icon: "DollarSign", title: "Spending Propensity", desc: "Household-level estimated home improvement spending enabling budget-tier targeting for service and product offers." },
      { icon: "Calendar", title: "Seasonal Triggers", desc: "Service-need signals timed to seasonal maintenance cycles — spring landscaping, fall HVAC, winter weatherproofing." },
      { icon: "MapPin", title: "Hyper-Local Targeting", desc: "ZIP+4 and neighborhood-level precision for local service area campaigns with radius and drive-time filtering." },
    ],
    useCases: [
      { title: "Contractor Lead Generation", desc: "Target homeowners actively seeking specific services in your service area with project-matched messaging and seasonal offers." },
      { title: "Franchise Territory Expansion", desc: "Identify high-density homeowner clusters in target territories with home age and service-need propensity scoring." },
      { title: "Home Warranty Marketing", desc: "Reach homeowners with aging properties, recent purchases, or expiring warranty coverage with protection plan offers." },
      { title: "Home Improvement Retail", desc: "Drive store traffic and online sales by targeting DIY-inclined homeowners with project-specific product recommendations and seasonal promotions." },
    ],
    complianceHeadline: "Privacy-compliant and property-data verified.",
    complianceBody:
      "All home services consumer data is sourced from permissioned channels and public property records. No sensitive financial data is included. Records are processed in compliance with CCPA, state privacy regulations, and industry standards, and verified monthly through our proprietary quality pipeline.",
  },
];

// ─── Seed function ─────────────────────────────────────
async function seed() {
  let created = 0;

  for (const page of B2C_PAGES) {
    const docId = `page-${page.slug.replace(/\//g, "-")}`;

    // Check if already exists
    const existing = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0]._id`,
      { slug: page.slug }
    );

    if (existing) {
      console.log(`  SKIP ${page.slug} (already exists: ${existing})`);
      continue;
    }

    const doc = {
      _id: docId,
      _type: "page",
      h1: page.h1,
      slug: { _type: "slug", current: page.slug },
      templateType: "leaf",
      kicker: page.kicker,
      titlePlain: page.titlePlain,
      titleAccent: page.titleAccent,
      heroDescription: toPortableText(page.heroDescription),
      stats: page.stats.map((s) => ({
        _key: key(),
        _type: "object",
        label: s.label,
        value: s.value,
      })),
      introKicker: page.introKicker,
      introHeadlinePlain: page.introHeadlinePlain,
      introHeadlineAccent: page.introHeadlineAccent,
      introParagraphs: page.introParagraphs,
      attributes: page.attributes.map((a) => ({
        _key: key(),
        _type: "featureItem",
        icon: a.icon,
        title: a.title,
        desc: toPortableText(a.desc),
      })),
      useCases: page.useCases.map((u) => ({
        _key: key(),
        _type: "object",
        title: u.title,
        desc: toPortableText(u.desc),
      })),
      complianceHeadline: page.complianceHeadline,
      complianceBody: toPortableText(page.complianceBody),
      backLink: {
        _type: "ctaLink",
        label: "Back to B2C Database",
        href: "/data-assets/b2c-database",
      },
      focusKeyphrase: page.focusKeyphrase,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
    };

    // Create published document
    await client.createOrReplace(doc);
    console.log(`  CREATE ${page.slug} (${docId})`);

    // Also create draft
    await client.createOrReplace({ ...doc, _id: `drafts.${docId}` });

    created++;
  }

  console.log(`\n✅ Done. Created ${created} new B2C leaf pages.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
