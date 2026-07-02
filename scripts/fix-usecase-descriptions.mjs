/**
 * Fix use case card descriptions — make each page's 6 use case
 * descriptions truly unique, not just name-swapped templates.
 *
 * Usage: node scripts/fix-usecase-descriptions.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);
function block(t) {
  return [{ _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" }];
}
function uc(title, desc) {
  return { _key: k(), title, desc: block(desc) };
}

function getCat(slug) {
  if (slug.includes("b2c-database")) return "b2c";
  if (slug.includes("/healthcare/")) return "hc";
  if (slug.includes("/other-industry/")) return "ind";
  if (slug.includes("/crm-users")) return "crm";
  if (slug.includes("/erp-users")) return "erp";
  if (slug.includes("/dbms-users")) return "dbms";
  if (slug.includes("/operating-system")) return "os";
  if (slug.includes("/software-email")) return "sw";
  if (slug.includes("/business-technology")) return "biz";
  return "tech";
}

function shortName(h1) {
  return h1.replace(/ Email List$/i, "").replace(/ Mailing List$/i, "").replace(/ Email Lists$/i, "")
    .replace(/ Mailing Data$/i, "").replace(/ Mailing Addresses$/i, "").replace(/ Email Database$/i, "")
    .replace(/ Contact Database$/i, "").replace(/ Data List$/i, "").replace(/ Contact Lists$/i, "")
    .replace(/ Users Lists$/i, "").replace(/ Users List$/i, "").replace(/ Users Email List$/i, "")
    .replace(/ Email Data$/i, "").replace(/ Customers Email List$/i, "").replace(/ User Email List$/i, "")
    .replace(/ User List$/i, "").replace(/ Data$/i, "").replace(/ Lists$/i, "").replace(/ List$/i, "").trim();
}

/* ═══════════════════════════════════════════════════
   UNIQUE USE CASE DESCRIPTIONS PER PAGE
   Each page gets 6 use cases with completely different
   titles AND descriptions.
   ═══════════════════════════════════════════════════ */

function genUseCases(h1, sn, cat, catIdx) {
  // ─── HEALTHCARE (12 pages, each unique) ──────
  const hcSets = [
    // 0: Cardiologists
    [
      uc(`Cardiovascular Drug Launches`, `Launch new anticoagulants, anti-arrhythmics, and heart failure therapies to interventional and general cardiologists segmented by prescribing volume and formulary committee membership.`),
      uc(`Cardiac Device Campaigns`, `Promote pacemakers, stents, catheter systems, and cardiac monitoring devices to cardiologists at facilities with active catheterization lab programs.`),
      uc(`Cardiology CME Outreach`, `Fill cardiology continuing education events and clinical webinars by targeting cardiologists due for board recertification or seeking subspecialty credits.`),
      uc(`Heart Failure Trial Enrollment`, `Recruit principal investigators and site coordinators at cardiology practices for Phase II–IV clinical trials in heart failure, arrhythmia, and interventional therapies.`),
      uc(`Cardiac IT Solutions`, `Market remote patient monitoring platforms, cardiac PACS systems, and EHR cardiology modules to practices managing high-volume patient populations.`),
      uc(`Cardiology Staffing`, `Connect with cardiologists for locum tenens coverage, fellowship-trained permanent placements, and hospital-employed position recruitment campaigns.`),
    ],
    // 1: Chiropractors
    [
      uc(`Chiropractic Equipment Sales`, `Promote adjusting tables, spinal decompression systems, and therapeutic laser devices to chiropractic clinic owners evaluating practice technology upgrades.`),
      uc(`Wellness Product Marketing`, `Market supplements, braces, orthotics, and rehabilitation supplies to chiropractors who retail health products directly to their patient base.`),
      uc(`Chiropractic Practice Growth`, `Offer practice management software, patient scheduling platforms, and digital marketing services to solo and group chiropractic practices.`),
      uc(`Sports Chiropractic Outreach`, `Target chiropractors with sports medicine certifications for partnerships with athletic programs, fitness facilities, and sports rehabilitation centers.`),
      uc(`Chiropractic CE Programs`, `Promote continuing education seminars, technique workshops, and certification courses to chiropractors maintaining state licensure requirements.`),
      uc(`Multi-Disciplinary Referrals`, `Connect with chiropractors in integrative health settings for cross-referral programs with physical therapists, acupuncturists, and pain management physicians.`),
    ],
    // 2: Dentist
    [
      uc(`Dental Equipment Campaigns`, `Market chairside CAD/CAM systems, digital X-ray sensors, and practice operatory equipment to dental offices planning technology refresh cycles.`),
      uc(`Dental Supply Promotions`, `Promote consumable supplies — composites, impression materials, anesthetics, and infection control products — to general and specialty dental practices.`),
      uc(`Dental Software Sales`, `Offer practice management, imaging, and patient communication software to dental offices evaluating workflow automation and digital transformation.`),
      uc(`Orthodontic Product Marketing`, `Target orthodontists and general dentists offering clear aligner therapy with bracket systems, aligner programs, and 3D treatment planning tools.`),
      uc(`Dental Staffing Solutions`, `Recruit dental hygienists, dental assistants, and associate dentists for temporary and permanent placement at growing dental practices and DSOs.`),
      uc(`Dental CE & Training`, `Fill dental continuing education courses, hands-on workshops, and specialty certification programs with targeted outreach to dentists by specialty and career stage.`),
    ],
    // 3: Doctors
    [
      uc(`Pharmaceutical Detailing`, `Execute targeted drug detailing campaigns to physicians segmented by prescribing patterns, therapeutic area, and managed care formulary influence across 65+ specialties.`),
      uc(`Medical Device Sales`, `Reach proceduralist physicians evaluating surgical instruments, diagnostic systems, and point-of-care devices with specialty-matched product messaging.`),
      uc(`Clinical Education Programs`, `Promote CME-accredited symposia, grand rounds presentations, and online clinical education modules to physicians based on recertification timelines and specialty focus.`),
      uc(`Clinical Trial Recruitment`, `Identify qualified principal investigators and clinical research coordinators at academic medical centers and community practices for multi-site trial enrollment.`),
      uc(`Health IT Adoption`, `Market electronic health records, telemedicine platforms, and clinical decision support tools to physician practices evaluating technology modernization.`),
      uc(`Physician Recruitment`, `Source candidates for permanent, locum tenens, and fellowship-trained positions at hospitals, health systems, and physician practice groups nationwide.`),
    ],
    // 4: Hospital
    [
      uc(`Capital Equipment Sales`, `Present imaging systems, surgical robotics, and laboratory analyzers to hospital C-suite executives and department directors during capital budget planning cycles.`),
      uc(`Health System IT Projects`, `Market enterprise EHR platforms, revenue cycle management solutions, and cybersecurity services to hospital CIOs and IT steering committees.`),
      uc(`Supply Chain Partnerships`, `Engage hospital supply chain directors and GPO coordinators with medical supply contracts, distribution agreements, and value analysis committee presentations.`),
      uc(`Clinical Staffing Services`, `Offer nurse staffing, allied health placement, and physician recruiting services to hospital HR directors and department managers facing workforce shortages.`),
      uc(`Patient Experience Programs`, `Promote patient engagement platforms, wayfinding solutions, and satisfaction survey tools to hospital quality officers and patient experience executives.`),
      uc(`Facility Services Contracts`, `Target hospital facilities directors and operations VPs with building maintenance, biomedical engineering, and environmental services management contracts.`),
    ],
    // 5: Medical Mailing
    [
      uc(`Cross-Provider Campaigns`, `Execute coordinated outreach programs that reach physicians, nurses, and administrators at the same healthcare organizations for unified brand messaging.`),
      uc(`Healthcare Event Marketing`, `Fill medical conference exhibition halls, satellite symposia, and virtual CME events by targeting multiple provider types with role-specific invitations.`),
      uc(`Multi-Specialty Drug Launches`, `Launch pharmaceutical products that span multiple prescriber types — primary care, specialists, and advanced practice providers — with specialty-segmented messaging.`),
      uc(`Healthcare Survey Research`, `Recruit representative panels of healthcare professionals across disciplines for market research, brand perception studies, and product concept testing.`),
      uc(`Clinical Workflow Solutions`, `Market workflow automation, communication platforms, and care coordination tools that serve multiple healthcare roles within integrated delivery systems.`),
      uc(`Healthcare Talent Campaigns`, `Run multi-discipline recruitment campaigns for health systems hiring physicians, nurses, pharmacists, and allied health professionals simultaneously.`),
    ],
    // 6: Nurses
    [
      uc(`Nursing Education Products`, `Market clinical simulation equipment, online learning platforms, and certification review courses to nurses pursuing specialty credentials and advanced degrees.`),
      uc(`Nurse-Administered Therapies`, `Promote infusion therapy products, wound care supplies, and point-of-care diagnostics to nurses in inpatient, outpatient, and home health settings.`),
      uc(`Travel Nursing Recruitment`, `Source travel nurse candidates for 13-week assignments by targeting RNs with compact licenses and acute care experience in high-demand specialties.`),
      uc(`Nurse Leadership Programs`, `Offer leadership development courses, DNP program enrollment, and management training to nurses transitioning from clinical to administrative roles.`),
      uc(`Nursing Informatics Solutions`, `Market clinical documentation tools, barcode medication administration systems, and nursing-specific EHR modules to nurse informaticists and CNOs.`),
      uc(`Nursing Conference Promotion`, `Drive registration for nursing specialty conferences, ANCC certification workshops, and professional development events with targeted nurse outreach.`),
    ],
    // 7: Physician
    [
      uc(`Specialty Pharma Campaigns`, `Deliver targeted pharmaceutical messaging to physicians in rare disease, oncology, and immunology specialties where small patient populations demand precision targeting.`),
      uc(`Surgical Technology Sales`, `Reach proceduralist physicians with robotic-assisted surgery platforms, minimally invasive instruments, and intraoperative navigation systems.`),
      uc(`Physician Advisory Boards`, `Recruit key opinion leaders and clinical thought leaders for pharmaceutical advisory boards, speaker bureaus, and medical expert witness panels.`),
      uc(`Telemedicine Platform Sales`, `Market virtual care platforms, remote patient monitoring solutions, and asynchronous telehealth tools to physicians expanding their digital care delivery models.`),
      uc(`Physician Practice Acquisition`, `Identify independent physician practices for health system acquisition outreach based on practice size, specialty mix, and geographic strategic fit.`),
      uc(`Academic Medicine Outreach`, `Target physician faculty at academic medical centers for research collaborations, clinical trial partnerships, and publication-supported education programs.`),
    ],
    // 8: Plastic Surgeons
    [
      uc(`Aesthetic Device Marketing`, `Promote laser resurfacing systems, body contouring devices, and injectable delivery systems to cosmetic plastic surgeons at private aesthetic practices.`),
      uc(`Skincare Brand Partnerships`, `Market medical-grade skincare lines, chemical peels, and post-procedure recovery products to plastic surgeons who dispense aesthetic products at their practices.`),
      uc(`Med-Spa Technology Sales`, `Reach plastic surgeons operating med-spa locations with non-invasive treatment devices, patient scheduling software, and aesthetic practice management platforms.`),
      uc(`Reconstructive Surgery Supplies`, `Target hospital-based reconstructive surgeons with microsurgical instruments, tissue expanders, and craniofacial implant systems for clinical purchasing.`),
      uc(`Aesthetic Training Courses`, `Fill advanced injection technique workshops, laser safety certifications, and aesthetic fellowship programs by targeting plastic surgeons by career stage and procedure focus.`),
      uc(`Patient Financing Programs`, `Offer patient financing solutions, membership programs, and treatment package platforms to plastic surgery practices that serve elective cosmetic procedure patients.`),
    ],
    // 9: US Pharmacist
    [
      uc(`Pharmacy Automation Sales`, `Market robotic dispensing systems, automated pill counters, and prescription verification technology to pharmacy directors at high-volume retail and hospital pharmacies.`),
      uc(`Specialty Pharmacy Programs`, `Promote specialty drug distribution agreements, limited distribution network enrollment, and REMS program compliance tools to specialty pharmacy operators.`),
      uc(`Pharmacy Benefit Consulting`, `Engage pharmacists in PBM advisory roles, formulary committee positions, and medication therapy management programs with payer-pharmacy collaboration opportunities.`),
      uc(`Compounding Pharmacy Supplies`, `Target compounding pharmacists with USP 797/800 compliant equipment, bulk pharmaceutical ingredients, and sterile preparation technology.`),
      uc(`Clinical Pharmacy Services`, `Market pharmacogenomic testing platforms, medication reconciliation tools, and clinical decision support systems to pharmacists expanding clinical service lines.`),
      uc(`Pharmacy CE & Certification`, `Promote board of pharmacy specialties certification prep, immunization training programs, and state-required continuing education to pharmacists maintaining licensure.`),
    ],
    // 10: Veterinarians
    [
      uc(`Animal Pharmaceutical Sales`, `Detail companion animal therapeutics, livestock vaccines, and parasiticide products to veterinarians segmented by species focus and prescribing authority.`),
      uc(`Veterinary Diagnostic Equipment`, `Promote in-clinic analyzers, digital radiography systems, and ultrasound devices to veterinary practice owners evaluating diagnostic technology investments.`),
      uc(`Veterinary Practice Software`, `Market cloud-based practice management, client communication platforms, and veterinary telemedicine solutions to clinic owners modernizing operations.`),
      uc(`Pet Nutrition Partnerships`, `Offer veterinary-exclusive diet lines, therapeutic nutrition programs, and clinic retail partnerships to veterinarians recommending pet food brands.`),
      uc(`Veterinary CE Programs`, `Fill veterinary continuing education conferences, wet labs, and online certification courses with species-specific and specialty-focused targeting.`),
      uc(`Corporate Vet Acquisition`, `Identify independent veterinary practices for corporate consolidation outreach based on revenue, location, and ownership succession planning indicators.`),
    ],
    // 11: X-Ray Laboratories
    [
      uc(`Imaging Equipment Upgrades`, `Present digital radiography retrofit kits, new CT scanner models, and MRI system upgrades to imaging center administrators on equipment replacement timelines.`),
      uc(`Radiology IT Solutions`, `Market PACS, RIS, and AI-assisted image analysis platforms to radiology directors and imaging informatics specialists at diagnostic facilities.`),
      uc(`Service Contract Renewals`, `Target imaging facility managers with preventive maintenance agreements, tube replacement programs, and uptime guarantee service contracts for installed equipment.`),
      uc(`Radiation Safety Compliance`, `Promote dosimetry monitoring services, radiation shielding assessments, and regulatory compliance consulting to imaging facility radiation safety officers.`),
      uc(`Mobile Imaging Services`, `Market portable X-ray and mobile CT services to facilities needing temporary imaging capacity for construction periods, surge demand, or remote locations.`),
      uc(`Imaging Staff Training`, `Offer radiologic technologist certification programs, CE credit courses, and equipment-specific operator training to imaging department managers building staff capabilities.`),
    ],
  ];

  // ─── OTHER INDUSTRY (10 pages, each unique) ──
  const indSets = [
    // 0: Agriculture
    [
      uc(`Precision Ag Technology Sales`, `Market GPS-guided equipment, drone crop monitoring, and IoT soil sensors to farm operators and agribusiness managers adopting precision agriculture practices.`),
      uc(`Agricultural Input Sales`, `Promote seed, fertilizer, crop protection, and animal nutrition products to farm purchasing managers during seasonal planning and input procurement windows.`),
      uc(`Farm Equipment Campaigns`, `Reach farm owners and equipment managers with tractor, harvester, and implement promotions timed to pre-season purchasing cycles and trade-in programs.`),
      uc(`Agribusiness Financial Services`, `Market crop insurance, operating loans, and farm real estate financing to agricultural producers and cooperative managers during annual planning periods.`),
      uc(`Agricultural Software Sales`, `Promote farm management software, commodity trading platforms, and supply chain traceability systems to agribusiness operations seeking digital transformation.`),
      uc(`Agricultural Trade Events`, `Drive exhibitor traffic and attendee registration for agricultural trade shows, field days, and commodity conferences with regional farm-operator targeting.`),
    ],
    // 1: Banking Finance
    [
      uc(`Core Banking Technology Sales`, `Market core processing platforms, digital banking solutions, and payment processing systems to bank CTOs and credit union technology officers evaluating platform modernization.`),
      uc(`Regulatory Compliance Solutions`, `Promote BSA/AML monitoring software, fair lending analytics, and audit management platforms to compliance officers at financial institutions.`),
      uc(`Wealth Management Platforms`, `Reach financial advisors and wealth management directors with portfolio analytics tools, client reporting platforms, and robo-advisory technology solutions.`),
      uc(`Commercial Lending Products`, `Market loan origination systems, credit decisioning platforms, and commercial underwriting tools to lending VPs and credit risk officers at community and regional banks.`),
      uc(`Financial Services Recruiting`, `Source compliance officers, risk analysts, and fintech specialists for permanent and contract placements at banks, credit unions, and investment firms.`),
      uc(`Banking Industry Events`, `Fill banking conference registrations, fintech summit exhibitor spots, and regulatory workshop seats with targeted financial institution decision-maker outreach.`),
    ],
    // 2: Construction
    [
      uc(`Construction Equipment Sales`, `Promote heavy machinery, power tools, and jobsite technology to general contractors and specialty subcontractors planning equipment fleet expansions.`),
      uc(`Building Materials Marketing`, `Market structural steel, concrete products, roofing systems, and sustainable building materials to project estimators and procurement managers.`),
      uc(`Construction Software Sales`, `Offer project management, BIM collaboration, and estimating software to construction firms transitioning from spreadsheet-based to digital project workflows.`),
      uc(`Jobsite Safety Programs`, `Promote safety training programs, PPE product lines, and OSHA compliance consulting to construction safety directors and site superintendents.`),
      uc(`Subcontractor Recruitment`, `Identify specialty trade contractors for bid invitations, preferred subcontractor programs, and strategic partnership opportunities on large-scale projects.`),
      uc(`Construction Insurance Services`, `Market surety bonds, builders risk policies, and contractor liability coverage to construction company owners and risk managers.`),
    ],
    // 3: Hotels
    [
      uc(`Hotel Technology Sales`, `Market property management systems, guest experience platforms, and revenue management solutions to hotel GMs and corporate technology officers.`),
      uc(`Hospitality Supply Programs`, `Promote linens, amenities, furniture, and room renovation packages to hotel procurement directors and property operations managers.`),
      uc(`Hotel F&B Partnerships`, `Offer food and beverage supply agreements, kitchen equipment packages, and restaurant concept licensing to hotel food and beverage directors.`),
      uc(`Revenue Management Consulting`, `Market pricing optimization services, distribution strategy consulting, and competitive benchmarking tools to hotel revenue managers and commercial directors.`),
      uc(`Hotel Staffing Solutions`, `Provide seasonal staffing, management placement, and hospitality training programs to hotel HR directors managing workforce challenges.`),
      uc(`Group Sales Prospecting`, `Target hotel sales directors with corporate travel RFP tools, meeting planner databases, and group booking technology platforms.`),
    ],
    // 4: Insurance
    [
      uc(`Insurtech Platform Sales`, `Market policy administration systems, claims automation platforms, and digital quoting tools to insurance carrier CIOs and operations executives.`),
      uc(`Agency Management Solutions`, `Promote agency management systems, comparative raters, and producer licensing platforms to independent agency principals and brokerage operations managers.`),
      uc(`Actuarial Software Sales`, `Reach chief actuaries and pricing analysts with predictive modeling tools, loss reserving platforms, and catastrophe risk assessment systems.`),
      uc(`Insurance Program Marketing`, `Market specialty insurance programs, surplus lines products, and niche market coverage to MGAs, wholesale brokers, and program administrators.`),
      uc(`Claims Technology Solutions`, `Promote AI-powered claims triage, fraud detection analytics, and virtual inspection tools to claims VPs and insurance technology officers.`),
      uc(`Insurance Talent Acquisition`, `Source underwriters, actuaries, and claims professionals for carrier, agency, and insurtech positions through targeted insurance industry recruitment campaigns.`),
    ],
    // 5: IT Decision Makers
    [
      uc(`Enterprise Software Demos`, `Generate qualified demo requests from CIOs and IT directors evaluating enterprise software platforms for ERP, CRM, ITSM, and security implementations.`),
      uc(`Cloud Migration Campaigns`, `Target IT leaders managing on-premises infrastructure with cloud migration assessments, hybrid architecture consulting, and managed cloud service proposals.`),
      uc(`Cybersecurity Solution Sales`, `Reach CISOs and security directors with endpoint protection, SIEM platforms, and zero-trust architecture solutions through targeted multi-touch campaigns.`),
      uc(`IT Consulting Lead Generation`, `Generate project leads for digital transformation consulting, IT staff augmentation, and managed services engagements from technology decision-makers.`),
      uc(`Technology Event Marketing`, `Drive registration for technology conferences, vendor-sponsored webinars, and executive roundtable events with IT leader audience targeting.`),
      uc(`IT Vendor Consolidation`, `Identify organizations managing multiple overlapping technology vendors for platform consolidation, license optimization, and vendor rationalization proposals.`),
    ],
    // 6: Manufacturing
    [
      uc(`Industrial Automation Sales`, `Market PLCs, robotic work cells, and SCADA systems to plant managers and automation engineers implementing smart manufacturing initiatives.`),
      uc(`MRO Supply Agreements`, `Promote maintenance, repair, and operations supply contracts to manufacturing procurement directors managing plant consumables and spare parts inventories.`),
      uc(`ERP Implementation Services`, `Offer manufacturing-specific ERP deployment, customization, and training services to operations VPs evaluating production planning system upgrades.`),
      uc(`Quality Management Solutions`, `Market SPC software, inspection equipment, and ISO audit preparation services to quality managers maintaining certification standards.`),
      uc(`Workforce Training Programs`, `Promote CNC operator certifications, safety compliance training, and lean manufacturing workshops to plant HR managers addressing skills gaps.`),
      uc(`Industrial Energy Solutions`, `Target plant facilities managers with energy audit services, LED lighting retrofits, and compressed air efficiency programs to reduce manufacturing operating costs.`),
    ],
    // 7: Real Estate
    [
      uc(`Real Estate CRM Sales`, `Market agent CRM platforms, lead management systems, and automated follow-up tools to top-producing agents and brokerage operations managers.`),
      uc(`Mortgage Lender Partnerships`, `Connect mortgage originators with real estate agents and brokerages for preferred lender relationships and co-marketing partnership programs.`),
      uc(`Property Technology Marketing`, `Promote virtual tour platforms, electronic signature solutions, and transaction management software to real estate brokerages modernizing their tech stacks.`),
      uc(`Real Estate Training Programs`, `Fill real estate coaching programs, designation courses, and brokerage onboarding academies with targeted agent and team leader outreach.`),
      uc(`Title & Closing Services`, `Market title insurance, escrow services, and digital closing platforms to real estate brokerages and transaction coordinators managing settlement workflows.`),
      uc(`Real Estate Franchise Recruitment`, `Recruit independent brokerages and top-producing teams for franchise affiliation opportunities with national and regional real estate brands.`),
    ],
    // 8: Sports Industry
    [
      uc(`Sports Sponsorship Sales`, `Present sponsorship packages, naming rights opportunities, and experiential marketing partnerships to brand marketing directors evaluating sports sponsorship ROI.`),
      uc(`Venue Technology Upgrades`, `Market ticketing platforms, fan engagement apps, and stadium Wi-Fi infrastructure to venue operations directors and facility technology managers.`),
      uc(`Athletic Equipment Sales`, `Promote team apparel contracts, training equipment, and performance technology to collegiate athletic directors and professional team equipment managers.`),
      uc(`Sports Media Rights`, `Engage media executives and broadcasting directors with content licensing, streaming distribution, and digital rights management opportunities.`),
      uc(`Sports Analytics Platforms`, `Market player performance analytics, scouting databases, and team strategy software to front office executives and coaching staff leadership.`),
      uc(`Fan Experience Programs`, `Promote loyalty programs, premium hospitality packages, and season ticket retention tools to team marketing directors and CRM managers.`),
    ],
    // 9: Travel Data
    [
      uc(`Travel Technology Sales`, `Market booking engines, GDS integrations, and travel CRM platforms to agency owners and tour operator technology managers modernizing reservation systems.`),
      uc(`Destination Marketing Programs`, `Connect DMOs, tourism boards, and resort properties with travel agents specializing in their destination markets through co-op advertising programs.`),
      uc(`Cruise Line Agent Outreach`, `Promote ship-inspection FAM trips, certification programs, and group booking incentives to travel advisors with cruise specialization credentials.`),
      uc(`Corporate Travel Management`, `Market travel management company services, expense reporting platforms, and duty-of-care solutions to corporate travel managers and procurement directors.`),
      uc(`Travel Insurance Products`, `Distribute travel protection plans, cancel-for-any-reason coverage, and medical evacuation products through travel advisor distribution networks.`),
      uc(`Travel Advisor Recruitment`, `Recruit experienced travel advisors for host agency enrollment, franchise opportunities, and consortium membership programs.`),
    ],
  ];

  // ─── B2C (10 pages, each unique) ─────────────
  const b2cSets = [
    // 0: Automotive
    [
      uc(`New Vehicle Conquest`, `Reach owners of competing vehicle brands approaching lease maturity with conquest incentives, trade-in valuations, and test-drive event invitations.`),
      uc(`Service & Maintenance`, `Target vehicle owners at scheduled maintenance milestones with service department promotions, tire offers, and extended warranty programs.`),
      uc(`Auto Insurance Cross-Sell`, `Market competitive auto insurance quotes to vehicle owners at policy renewal dates using household vehicle data and driver demographic indicators.`),
      uc(`Electric Vehicle Campaigns`, `Reach environmentally-conscious consumers with EV test drive events, charging infrastructure information, and federal tax credit education campaigns.`),
      uc(`Auto Aftermarket Products`, `Promote accessories, performance parts, and vehicle protection products to car enthusiasts and owners of specific makes and model years.`),
      uc(`Dealer Event Marketing`, `Drive showroom traffic for dealer sales events, model launch parties, and holiday promotions with geo-targeted owner and prospect mailing lists.`),
    ],
    // 1: DTC & CPG
    [
      uc(`Subscription Box Acquisition`, `Acquire new subscribers for meal kits, beauty boxes, and wellness subscription services using lookalike modeling against best-customer profiles.`),
      uc(`Brand Sampling Programs`, `Distribute product samples to targeted consumer segments matched by category affinity, household size, and lifestyle indicators for trial-to-purchase conversion.`),
      uc(`Loyalty Program Reactivation`, `Re-engage lapsed loyalty program members with personalized win-back offers, bonus point promotions, and exclusive product preview access.`),
      uc(`Seasonal Product Launches`, `Time new product introductions to seasonal demand peaks with pre-launch awareness campaigns targeting category-active consumers.`),
      uc(`Retail Channel Expansion`, `Support retail launch campaigns with direct-to-consumer awareness programs that drive in-store trial and shelf velocity at new retail distribution points.`),
      uc(`Consumer Review Generation`, `Recruit verified purchasers for product review campaigns, UGC content programs, and social proof amplification across retail and DTC channels.`),
    ],
    // 2: Education & EdTech
    [
      uc(`K-12 Parent Outreach`, `Market tutoring services, educational apps, and enrichment programs to parents of school-age children segmented by grade level and school district.`),
      uc(`College Enrollment Campaigns`, `Reach high school juniors and seniors with university recruitment materials, campus visit invitations, and financial aid information packages.`),
      uc(`Online Learning Acquisition`, `Acquire adult learners for online degree programs, professional certifications, and skills-based courses using career-stage and education-level targeting.`),
      uc(`EdTech Product Marketing`, `Promote educational software, learning management systems, and classroom technology to parents and educators in home-learning and supplemental education contexts.`),
      uc(`Test Prep Program Enrollment`, `Target families of students approaching SAT, ACT, and AP exam dates with test preparation course enrollment and study material promotions.`),
      uc(`Student Loan Refinancing`, `Reach recent graduates and current borrowers with student loan refinancing offers, income-driven repayment information, and debt consolidation programs.`),
    ],
    // 3: Financial Services
    [
      uc(`Credit Card Acquisition`, `Acquire new cardholders through pre-screened firm-offer-of-credit campaigns targeting consumers by credit tier, spending patterns, and reward preferences.`),
      uc(`Mortgage Origination`, `Reach home buyers and refinance candidates with mortgage rate comparisons, pre-qualification invitations, and purchase-readiness assessment tools.`),
      uc(`Wealth Management Growth`, `Attract affluent consumers to investment advisory services using household income, investable asset, and financial life-stage targeting.`),
      uc(`Insurance Product Cross-Sell`, `Market life, auto, and home insurance bundles to existing banking customers and new prospects using household composition and asset ownership data.`),
      uc(`Personal Loan Marketing`, `Target consumers with personal loan offers for debt consolidation, home improvement, and major purchases using credit pre-screen and income indicators.`),
      uc(`Financial Literacy Programs`, `Promote financial education workshops, budgeting tools, and retirement planning resources to consumers at key financial life-stage transitions.`),
    ],
    // 4: Healthcare & Wellness
    [
      uc(`Fitness Membership Growth`, `Acquire new gym and fitness studio members using proximity targeting, lifestyle indicators, and lapsed-membership reactivation campaigns.`),
      uc(`Supplement & Nutrition Sales`, `Market vitamins, dietary supplements, and functional nutrition products to health-conscious consumers segmented by wellness interest and purchase history.`),
      uc(`Telehealth Enrollment`, `Promote virtual care platforms and digital health subscriptions to consumers seeking convenient access to primary care, mental health, and specialist consultations.`),
      uc(`Health Insurance Enrollment`, `Drive individual and family health plan enrollment during open enrollment periods with age, income, and coverage-gap targeted outreach campaigns.`),
      uc(`Wellness App Acquisition`, `Acquire users for meditation, fitness tracking, and health monitoring apps using behavioral indicators and device ownership data.`),
      uc(`Senior Health Services`, `Market Medicare supplement plans, home health services, and aging-in-place technology to seniors and caregiver household members.`),
    ],
    // 5: Home Services
    [
      uc(`HVAC Service Marketing`, `Target homeowners with aging heating and cooling systems for seasonal maintenance contracts, energy efficiency upgrades, and emergency replacement financing.`),
      uc(`Roofing & Exterior Projects`, `Reach homeowners in properties with aging roofs and exteriors using building-age data, storm damage indicators, and permit-activity triggers.`),
      uc(`Home Remodeling Leads`, `Generate kitchen and bathroom remodeling leads from homeowners with high home equity, long tenure, and renovation spending propensity indicators.`),
      uc(`Pest Control Subscriptions`, `Acquire seasonal and annual pest control service subscribers using geographic pest-pressure data and homeownership verification.`),
      uc(`Landscaping & Lawn Care`, `Market lawn treatment programs, landscape design services, and outdoor living installations to homeowners by property size, home value, and seasonal timing.`),
      uc(`Home Security Systems`, `Promote home security monitoring, smart home automation, and video doorbell systems to homeowners and new move-ins with property-level targeting.`),
    ],
    // 6: Real Estate Consumer
    [
      uc(`First-Time Buyer Programs`, `Reach first-time home buyers with mortgage education, down payment assistance information, and new construction community invitations using renter and age demographic data.`),
      uc(`Move-Up Buyer Targeting`, `Identify homeowners likely to upsize based on growing families, rising home equity, and length-of-residence indicators for move-up property marketing.`),
      uc(`Relocation Assistance`, `Target consumers with job-change and corporate relocation signals for destination real estate services, moving company promotions, and settlement assistance.`),
      uc(`Listing Lead Generation`, `Identify likely sellers using equity accumulation models, neighborhood turnover data, and pre-mover behavioral signals for listing agent prospecting.`),
      uc(`Home Equity Products`, `Market HELOCs, cash-out refinancing, and home equity loans to owners with significant equity positions and renovation or debt-consolidation intent signals.`),
      uc(`Rental Property Investment`, `Reach high-income consumers and existing property owners with investment property marketing, 1031 exchange information, and rental market analysis tools.`),
    ],
    // 7: Retail & Ecommerce
    [
      uc(`New Customer Acquisition`, `Build lookalike audiences from best-customer profiles and deploy prospecting campaigns across email, direct mail, and digital channels for efficient customer acquisition.`),
      uc(`Cart Abandonment Recovery`, `Re-engage online shoppers who abandoned carts with personalized reminder emails, limited-time discount offers, and free shipping incentive campaigns.`),
      uc(`Seasonal Campaign Targeting`, `Reach high-propensity shoppers ahead of Black Friday, holiday, and back-to-school seasons with early-access promotions and gift guide content.`),
      uc(`Brand Loyalty Programs`, `Enroll high-value customers in VIP loyalty programs with tiered rewards, exclusive product access, and birthday promotions using purchase-frequency segmentation.`),
      uc(`Marketplace Seller Outreach`, `Recruit new marketplace sellers and brand partners with category-specific performance data, fulfillment service promotions, and advertising program enrollment.`),
      uc(`Retail Store Traffic`, `Drive foot traffic to physical retail locations with geo-targeted promotions, in-store event invitations, and BOPIS promotional campaigns.`),
    ],
    // 8: Telecommunications
    [
      uc(`Carrier Switch Campaigns`, `Target subscribers on competing carriers with plan comparison offers, device trade-in promotions, and family plan savings calculators timed to contract expirations.`),
      uc(`Broadband Expansion`, `Market fiber and 5G home internet services to households in newly covered service areas using address-level broadband availability mapping.`),
      uc(`Bundle Upsell Programs`, `Promote multi-service bundles — mobile, internet, streaming, home security — to existing single-service subscribers with household savings messaging.`),
      uc(`Device Upgrade Campaigns`, `Reach smartphone owners approaching device upgrade eligibility with new model previews, installment plan offers, and trade-in value promotions.`),
      uc(`Cord-Cutter Streaming Offers`, `Market streaming TV bundles, premium channel add-ons, and ad-supported tier promotions to consumers who have cancelled traditional cable subscriptions.`),
      uc(`Business Service Cross-Sell`, `Identify small business owners within the consumer base for SMB internet, phone system, and managed networking service cross-sell campaigns.`),
    ],
    // 9: Travel Consumer
    [
      uc(`Destination Awareness Campaigns`, `Inspire vacation planning with destination-specific content, travel deal alerts, and seasonal package promotions matched to consumer travel-style preferences.`),
      uc(`Cruise Line Acquisition`, `Acquire first-time cruise passengers with introductory offers, virtual ship tours, and destination itinerary comparisons targeting ocean-cruise-curious demographics.`),
      uc(`Loyalty Program Enrollment`, `Recruit frequent travelers into airline, hotel, and rental car loyalty programs with sign-up bonuses and tier-match challenges based on travel frequency.`),
      uc(`Travel Credit Card Marketing`, `Promote travel rewards credit cards with sign-up bonus offers to frequent travelers identified through trip frequency, spending, and loyalty program membership data.`),
      uc(`Group & Event Travel`, `Market group travel packages, destination wedding planning, and corporate retreat services to consumers showing group-booking intent signals.`),
      uc(`Last-Minute Deal Distribution`, `Distribute unsold inventory and last-minute travel deals to price-sensitive consumers with high booking-response propensity and flexible travel dates.`),
    ],
  ];

  // ─── TECHNOLOGY (36 pages — varied by catIdx) ──
  function techUseCases(sn, catIdx) {
    const sets = [
      [
        uc(`${sn} Competitive Displacement`, `Identify organizations on ${sn} evaluating platform alternatives and engage them with migration ROI calculators, feature comparisons, and transition support packages.`),
        uc(`${sn} Ecosystem Expansion`, `Reach ${sn} administrators with complementary integration tools, marketplace plugins, and API-connected solutions that extend platform capabilities.`),
        uc(`${sn} Admin Training`, `Promote ${sn}-specific certification courses, admin bootcamps, and advanced configuration workshops to current platform administrators and power users.`),
        uc(`${sn} Version Migration`, `Target organizations on older ${sn} versions with cloud migration assessments, upgrade planning services, and modernization incentive programs.`),
        uc(`${sn} Implementation Services`, `Market deployment consulting, data migration support, and custom configuration services to organizations in early-stage ${sn} rollout phases.`),
        uc(`${sn} Managed Support`, `Promote outsourced administration, 24/7 monitoring, and technical support contracts to ${sn} customer organizations lacking dedicated internal platform teams.`),
      ],
      [
        uc(`${sn} User Acquisition`, `Build awareness and trial demand among organizations evaluating ${sn} category solutions through targeted product demonstration and free trial campaigns.`),
        uc(`${sn} Cross-Sell Campaigns`, `Identify ${sn} customers using only basic features and promote advanced modules, premium tiers, and add-on capabilities for revenue expansion.`),
        uc(`${sn} Partner Recruitment`, `Recruit systems integrators, consultants, and resellers into the ${sn} partner ecosystem with certification programs and deal registration incentives.`),
        uc(`${sn} Renewal Campaigns`, `Time outreach to ${sn} customers approaching contract renewal dates with retention offers, multi-year discount programs, and customer success reviews.`),
        uc(`${sn} Technical Webinars`, `Drive registration for ${sn}-focused technical webinars, product update briefings, and best-practice sharing sessions targeting current administrators.`),
        uc(`${sn} Customer Advocacy`, `Recruit satisfied ${sn} customers for case study participation, reference call programs, and peer review site testimonial campaigns.`),
      ],
      [
        uc(`${sn} Platform Evaluation`, `Generate qualified evaluation requests from IT leaders comparing ${sn} against competitive alternatives by highlighting differentiated capabilities and TCO advantages.`),
        uc(`${sn} Data Migration`, `Market data migration tools, ETL services, and integration middleware to organizations consolidating disparate systems onto ${sn} as a platform standard.`),
        uc(`${sn} Security Compliance`, `Promote security audit services, compliance documentation tools, and governance frameworks to ${sn} administrators managing regulatory and policy requirements.`),
        uc(`${sn} Performance Optimization`, `Offer performance tuning consulting, infrastructure right-sizing assessments, and monitoring tool implementations to ${sn} operations teams managing scalability.`),
        uc(`${sn} User Community`, `Build ${sn} user community engagement through local meetup sponsorship, online forum programs, and annual user conference exhibition opportunities.`),
        uc(`${sn} Talent Sourcing`, `Help organizations staff ${sn} projects by connecting them with certified professionals, contract administrators, and implementation specialists through targeted recruiting.`),
      ],
      [
        uc(`${sn} ROI Assessment`, `Engage ${sn} prospects with ROI modeling tools, business case templates, and peer benchmark data that quantify the value of platform adoption.`),
        uc(`${sn} Custom Development`, `Market custom application development, workflow automation, and platform extension services to ${sn} customers needing tailored solutions beyond standard configuration.`),
        uc(`${sn} Compliance Audit`, `Promote configuration review services, access control assessments, and data governance audits to ${sn} administrators responsible for regulatory compliance.`),
        uc(`${sn} Capacity Planning`, `Offer infrastructure planning, license optimization, and growth forecasting services to IT teams managing expanding ${sn} deployments across business units.`),
        uc(`${sn} Executive Briefings`, `Drive attendance at executive-level strategy sessions, CIO roundtables, and digital transformation workshops focused on maximizing ${sn} platform investment.`),
        uc(`${sn} Disaster Recovery`, `Market backup, replication, and business continuity solutions specifically designed for ${sn} environments to infrastructure and security leaders.`),
      ],
      [
        uc(`${sn} Stack Integration`, `Target ${sn} customers with middleware, iPaaS, and API management solutions that connect the platform to adjacent enterprise applications and data sources.`),
        uc(`${sn} Analytics & Reporting`, `Promote business intelligence tools, dashboard builders, and analytics platforms optimized for ${sn} data to operations and strategy leaders.`),
        uc(`${sn} Change Management`, `Market organizational change management consulting, end-user training programs, and adoption measurement tools to ${sn} project sponsors.`),
        uc(`${sn} Cost Optimization`, `Offer license audit services, usage analysis tools, and contract renegotiation support to IT finance teams managing ${sn} total cost of ownership.`),
        uc(`${sn} Innovation Labs`, `Engage ${sn} technology leaders with emerging capability previews, beta program enrollment, and innovation workshop invitations for early-adopter positioning.`),
        uc(`${sn} Succession Planning`, `Help organizations prepare for ${sn} platform knowledge transfer by marketing documentation services, admin training programs, and managed service transitions.`),
      ],
      [
        uc(`${sn} Global Rollout`, `Support multi-region ${sn} deployment projects with localization consulting, data residency planning, and international compliance advisory services.`),
        uc(`${sn} DevOps Integration`, `Market CI/CD pipeline integrations, infrastructure-as-code templates, and automated testing frameworks designed for ${sn} development environments.`),
        uc(`${sn} User Onboarding`, `Promote guided onboarding programs, interactive training platforms, and contextual help systems that accelerate ${sn} end-user adoption and productivity.`),
        uc(`${sn} Vendor Assessment`, `Engage IT procurement teams evaluating ${sn} with structured vendor assessment frameworks, RFP response support, and proof-of-concept coordination.`),
        uc(`${sn} Architecture Review`, `Market architecture assessment services, scalability audits, and infrastructure modernization roadmaps to ${sn} platform architects and engineering leaders.`),
        uc(`${sn} Knowledge Transfer`, `Offer documentation services, runbook creation, and institutional knowledge capture programs to ${sn} teams managing platform operations transitions.`),
      ],
    ];
    return sets[catIdx % sets.length];
  }

  // ─── Route to the right set ──────────────────
  if (cat === "hc") return hcSets[catIdx % hcSets.length];
  if (cat === "ind") return indSets[catIdx % indSets.length];
  if (cat === "b2c") return b2cSets[catIdx % b2cSets.length];
  return techUseCases(sn, catIdx);
}


/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");

  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current } | order(slug.current)'
  );
  console.log(`Found ${pages.length} leaf pages\n`);

  const catCounters = {};

  for (let gi = 0; gi < pages.length; gi++) {
    const { _id, h1, slug } = pages[gi];
    const cat = getCat(slug);
    const sn = shortName(h1);
    const catIdx = catCounters[cat] || 0;
    catCounters[cat] = catIdx + 1;

    const useCases = genUseCases(h1, sn, cat, catIdx);

    console.log(`[${gi + 1}] ${slug} (${cat}#${catIdx})`);

    if (DRY_RUN) {
      useCases.forEach((u, i) => console.log(`  UC${i}: ${u.title} → ${u.desc[0].children[0].text.slice(0, 60)}...`));
    } else {
      await client.patch(_id).set({ useCases }).commit();
      try {
        const d = await client.getDocument(`drafts.${_id}`);
        if (d) await client.patch(`drafts.${_id}`).set({ useCases }).commit();
      } catch {}
      console.log("  ✓");
    }
  }
  console.log(`\nDone! ${pages.length} pages updated.`);
}

main().catch(e => { console.error(e); process.exit(1); });
