/**
 * Fix prose section paragraphs and highlight descriptions.
 * Each page gets completely unique prose content.
 *
 * Usage: node scripts/fix-prose-descriptions.mjs [--dry-run]
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
function richBlock(t) {
  return { _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" };
}
function block(t) {
  return [{ _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" }];
}
function hl(label, text) {
  return { _key: k(), label, text: block(text) };
}
function proseSection(style, kicker, titlePlain, titleAccent, paragraphs, highlights) {
  return {
    _key: k(), _type: "proseSection", style, kicker, titlePlain, titleAccent,
    paragraphs: paragraphs.map(p => richBlock(p)),
    highlights,
  };
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
   Generate 2 prose sections per page — completely unique
   ═══════════════════════════════════════════════════ */

function genProseSections(h1, sn, cat, catIdx, existingProse) {
  // Preserve kicker, titlePlain, titleAccent from existing (already unique)
  const p0k = existingProse?.[0]?.kicker || `${sn} Data Sourcing`;
  const p0tp = existingProse?.[0]?.titlePlain || "How we build the";
  const p0ta = existingProse?.[0]?.titleAccent || `${h1}.`;
  const p1k = existingProse?.[1]?.kicker || `${sn} Applications`;
  const p1tp = existingProse?.[1]?.titlePlain || "Who uses the";
  const p1ta = existingProse?.[1]?.titleAccent || `${h1}.`;

  // ─── HEALTHCARE (12 unique sets) ──────────────
  const hcSets = [
    // 0: Cardiologists
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Building a reliable cardiologist database starts with the NPPES registry and ABIM board certification files. We cross-reference each record against hospital catheterization lab rosters and electrophysiology department directories to confirm subspecialty focus and active procedural privileges.`,
        `Contact details undergo multi-step validation — SMTP handshake for email, carrier lookup for phone, and NCOA processing for mailing addresses. Records failing any checkpoint are suppressed, maintaining deliverability rates above 95% across the cardiologist dataset.`,
      ], [
        hl(`Subspecialty Verification`, `Each cardiologist's subspecialty — interventional, EP, heart failure, or general — is confirmed through ABIM records rather than self-reported directory data.`),
        hl(`Cath Lab Affiliation`, `Hospital catheterization lab rosters identify proceduralist cardiologists performing interventions, distinguishing them from non-invasive consultative cardiologists.`),
        hl(`Quarterly Reverification`, `Board certification status, practice affiliations, and contact details are rechecked every 90 days against authoritative credentialing sources.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Cardiovascular drug manufacturers use this dataset to detail anti-arrhythmics, anticoagulants, and heart failure therapies to high-prescribing cardiologists. Medical device companies target interventional cardiologists evaluating stents, pacemakers, and catheter-based valve systems.`,
        `Cardiac imaging vendors, remote monitoring platform providers, and cardiovascular clinical trial sponsors each leverage the subspecialty segmentation to reach the precise cardiologist audiences that drive their pipeline — without wasting budget on poorly-matched contacts.`,
      ], [
        hl(`Pharma Field Teams`, `Align territory-level cardiologist lists with rep assignments for coordinated detailing of cardiovascular therapeutics across managed care formularies.`),
        hl(`Device Sales Reps`, `Build target lists of interventional cardiologists at hospitals with active cath lab programs for surgical device demonstrations and trial placements.`),
        hl(`Clinical Research`, `Identify cardiology principal investigators at academic medical centers for Phase II-IV trial recruitment in heart failure, arrhythmia, and lipid management.`),
        hl(`Cardiac IT Vendors`, `Reach cardiology department heads evaluating remote patient monitoring, cardiac PACS, and electrophysiology mapping system purchases.`),
      ]),
    ],
    // 1: Chiropractors
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Chiropractic data sourcing begins with state licensing boards that maintain current DC credentials, practice addresses, and disciplinary records. We supplement this with professional association memberships from ACA and ICA directories to capture technique specializations and continuing education activity.`,
        `Each chiropractor record is enriched with practice-type classification — solo clinic, multi-provider group, or integrated wellness center — enabling marketers to tailor messaging based on practice size, service mix, and purchasing authority.`,
      ], [
        hl(`License Board Sourcing`, `Active DC licensure confirmed through each state's chiropractic examining board, including compact-state eligibility and scope-of-practice classification.`),
        hl(`Technique Classification`, `Practice technique specializations — Diversified, Gonstead, Activator, Thompson — identified through association memberships and CE course completions.`),
        hl(`Practice Size Indicators`, `Solo practitioners, multi-DC clinics, and corporate-affiliated practices identified through employer cross-referencing and clinic directory analysis.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Equipment manufacturers marketing adjusting tables, laser therapy devices, and spinal decompression systems use this data to target clinic owners with capital purchasing authority. Supplement companies reach chiropractors who retail nutraceuticals to their patient base.`,
        `Practice management software vendors, patient scheduling platforms, and chiropractic billing services each segment by practice size and technology adoption indicators to prioritize outreach to clinics most likely to convert.`,
      ], [
        hl(`Equipment Manufacturers`, `Target chiropractic clinic owners with table, therapy device, and diagnostic imaging equipment promotions timed to practice expansion and technology refresh cycles.`),
        hl(`Supplement Brands`, `Reach chiropractors who maintain retail supplement inventories with wholesale programs, private-label opportunities, and patient protocol partnerships.`),
        hl(`Software Vendors`, `Identify chiropractic practices using outdated scheduling and billing systems for EHR, practice management, and patient engagement platform demonstrations.`),
        hl(`CE Course Providers`, `Promote technique certification workshops and state-required continuing education programs to chiropractors based on license renewal timelines.`),
      ]),
    ],
    // 2: Dentist
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Dental data compilation starts with state dental board licensing records that verify active practice status, specialty certifications, and DEA registrations. ADA membership directories and dental service organization filings provide additional practice-type and group affiliation context.`,
        `Every dentist record undergoes email deliverability testing through SMTP validation, phone verification through carrier lookup databases, and address standardization through CASS-certified postal processing — ensuring campaign-ready accuracy across all contact channels.`,
      ], [
        hl(`State Board Validation`, `Active dental license status confirmed through each state's board of dentistry, including specialty permits for orthodontics, endodontics, and oral surgery.`),
        hl(`DSO Network Mapping`, `Dental service organization affiliations identified and mapped, distinguishing independently-owned practices from corporate-managed multi-location groups.`),
        hl(`Sedation Credentialing`, `DEA registration and state sedation permits verified for dentists offering IV sedation, nitrous oxide, and oral conscious sedation services.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Dental equipment companies marketing CAD/CAM systems, digital imaging sensors, and operatory chairs target practice owners during capital budget planning. Supply distributors reach purchasing managers with consumables promotions timed to quarterly restocking cycles.`,
        `Dental software companies, patient financing providers, and dental staffing agencies each use specialty and practice-type segmentation to build campaigns that resonate with the specific operational needs of their target dental audience.`,
      ], [
        hl(`Equipment Companies`, `Build target lists of practice owners evaluating digital radiography, 3D cone beam CT, and chairside milling system investments for technology demonstrations.`),
        hl(`Supply Distributors`, `Segment dental practices by procedure mix and volume to promote specialty consumables — endodontic files, orthodontic brackets, implant components.`),
        hl(`Practice Software`, `Identify dental offices on legacy practice management systems for cloud-based EHR, imaging integration, and patient communication platform conversions.`),
        hl(`Staffing Agencies`, `Target growing dental practices and DSO-affiliated locations with hygienist, assistant, and associate dentist placement services.`),
      ]),
    ],
    // 3: Doctors
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `The physician dataset originates from the CMS National Plan and Provider Enumeration System, which assigns every practicing physician a unique NPI number. We augment this foundation with state medical board licensing files, hospital credentialing records, and specialty board certification databases to create multi-dimensional provider profiles.`,
        `Contact enrichment combines corporate directory matching for hospital-employed physicians, practice website scraping for independent offices, and professional network analysis for academic faculty — producing verified email, phone, and mailing data across all practice settings.`,
      ], [
        hl(`NPI Registry Foundation`, `Every physician record is anchored to a CMS-assigned NPI with active-practice confirmation, eliminating deceased, retired, and surrendered-license records from the dataset.`),
        hl(`Multi-Source Enrichment`, `Specialty codes, practice locations, and group affiliations are cross-referenced across NPPES, state boards, and hospital directories for maximum accuracy.`),
        hl(`Contact Channel Validation`, `Email SMTP verification, phone line-type detection, and NCOA address processing run on every record before it enters the deliverable dataset.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Pharmaceutical sales teams use the physician dataset to align territory assignments, build call plans, and execute HCP engagement programs across primary care and specialty audiences. Device companies target proceduralists by surgical volume and facility capabilities.`,
        `Health IT vendors, clinical staffing agencies, and CRO site selection teams each apply different segmentation logic — EHR adoption signals for IT, career-stage data for recruiting, and therapeutic-area expertise for trials — all supported by the same comprehensive physician dataset.`,
      ], [
        hl(`Pharma Commercial Teams`, `Align physician call lists with territory assignments and managed care formulary positions for coordinated HCP engagement across field and digital channels.`),
        hl(`Device Market Access`, `Identify proceduralist physicians at hospitals with specific surgical capabilities and capital equipment budgets for medical device sales campaigns.`),
        hl(`Health IT Marketing`, `Target physician practices evaluating EHR transitions, telehealth platforms, and clinical decision support tools with technology adoption stage indicators.`),
        hl(`Clinical Trial Operations`, `Map physician investigators by therapeutic expertise, patient access, and institutional research infrastructure for multi-site trial feasibility assessments.`),
      ]),
    ],
    // 4: Hospital
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Hospital data compilation integrates CMS Provider of Services files, Joint Commission accreditation records, and AHA annual survey responses. Each facility profile includes bed count, teaching status, trauma designation, ownership type, and health system network affiliation.`,
        `Decision-maker contacts are identified through corporate directory services, press release monitoring, and LinkedIn organizational mapping — then validated through SMTP email verification and direct phone confirmation to ensure campaign-ready accuracy.`,
      ], [
        hl(`CMS Certification Data`, `Every hospital record is linked to its CMS certification number with active Medicare/Medicaid participation status, bed count, and service-line classifications.`),
        hl(`Accreditation Mapping`, `Joint Commission, DNV-GL, and HFAP accreditation status tracked alongside Magnet designation, trauma level, and specialty program certifications.`),
        hl(`System Network Linking`, `Individual hospitals are mapped to parent health system organizations, enabling enterprise-level account strategies across multi-facility networks.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Capital equipment manufacturers present imaging systems, surgical robotics, and laboratory platforms to hospital C-suite executives during annual budget cycles. Supply chain companies engage GPO coordinators and value analysis committees with contracted pricing proposals.`,
        `Health IT companies, clinical staffing firms, and facility services providers each navigate hospital purchasing through different stakeholder paths — CIO for technology, CNO for nursing, COO for operations — all supported by the department-level contact mapping in this dataset.`,
      ], [
        hl(`Capital Equipment`, `Reach hospital CFOs and department directors with capital equipment proposals timed to fiscal year budget planning and replacement cycle schedules.`),
        hl(`Supply Chain`, `Engage materials management directors and GPO coordinators with contracted supply agreements and value analysis committee presentation opportunities.`),
        hl(`Health System IT`, `Target hospital CIOs and IT directors with enterprise platform proposals that address cybersecurity, interoperability, and digital transformation priorities.`),
        hl(`Clinical Workforce`, `Connect nurse staffing agencies and physician recruiting firms with hospital HR directors and department managers facing critical workforce shortages.`),
      ]),
    ],
    // 5: Medical Mailing
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `This multi-provider dataset is built by integrating physician NPI records, state nursing board files, allied health credential databases, and hospital administrative directories into a unified schema. The normalization process standardizes job titles, credential codes, and facility identifiers across provider types.`,
        `Deduplication algorithms identify individuals appearing in multiple source files — a physician listed in both NPI and hospital directories, for example — and merge them into single comprehensive records with all contact channels and credential attributes preserved.`,
      ], [
        hl(`Multi-Source Integration`, `Provider records from NPI registries, licensing boards, and employer directories are merged using identity-resolution algorithms that prevent duplicate mailings.`),
        hl(`Role Standardization`, `Job titles across healthcare organizations are normalized to functional role categories — clinical, administrative, IT, finance — for persona-based targeting.`),
        hl(`Unified Contact Schema`, `Email, phone, and mailing data from different sources are consolidated into a single record format with channel-level deliverability indicators.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Healthcare marketing agencies use this cross-provider dataset to build integrated campaign audiences that reach entire care teams — physicians, nurses, and administrators — at target organizations with coordinated messaging across roles.`,
        `Medical conference organizers, healthcare publishers, and multi-specialty pharmaceutical companies each benefit from the ability to segment by provider type, facility, and geography without managing separate data silos for each audience.`,
      ], [
        hl(`Agency Campaign Teams`, `Build multi-role audience segments for healthcare clients running integrated brand campaigns that require coordinated messaging across clinical and administrative contacts.`),
        hl(`Conference Organizers`, `Drive registration across provider types for medical meetings with role-specific session tracks, exhibition invitations, and CME credit promotions.`),
        hl(`Healthcare Publishers`, `Target healthcare professionals across disciplines with journal subscriptions, clinical content, and medical education resources matched to specialty interests.`),
        hl(`Pharma Marketing`, `Execute multi-prescriber drug launch campaigns that simultaneously reach primary care physicians, specialists, and advanced practice providers.`),
      ]),
    ],
    // 6: Nurses
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Nursing data originates from state boards of nursing that maintain current RN, LPN, and APRN licensure records. We enrich these with ANCC specialty certification data, Magnet hospital employment rosters, and nursing school alumni databases to build comprehensive professional profiles.`,
        `Compact-state licensure eligibility, specialty certification expiration dates, and employer facility identifiers are tracked for each nurse record — enabling campaigns segmented by credential type, employment setting, and geographic mobility.`,
      ], [
        hl(`Board of Nursing Data`, `Active licensure confirmed through each state's board of nursing with license type (RN, LPN, APRN), issue date, and renewal status tracking.`),
        hl(`ANCC Certification`, `Specialty certifications — CCRN, OCN, CEN, CNOR — tracked from ANCC and other credentialing bodies with expiration dates for recertification targeting.`),
        hl(`Employer Facility Mapping`, `Each nurse linked to their employing facility with department assignment, shift pattern indicators, and Magnet recognition status.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Nurse staffing agencies use this dataset to source travel nurse candidates with compact licenses, ICU experience, and specialty certifications that match hospital assignment requirements. Permanent placement firms identify nurses seeking career advancement opportunities.`,
        `Medical device companies, clinical education providers, and nursing informatics vendors each target specific nursing segments — critical care for monitoring devices, oncology for chemotherapy supplies, informatics for documentation tools — using the specialty certification filters.`,
      ], [
        hl(`Staffing Agencies`, `Source travel and per diem nurses by specialty certification, compact license status, and geographic preferences for rapid assignment matching.`),
        hl(`Device Companies`, `Target nurses who administer therapies, operate equipment, or influence unit-level purchasing decisions with product education and trial programs.`),
        hl(`Education Providers`, `Promote BSN-to-MSN bridge programs, DNP enrollment, and specialty certification prep courses to nurses at specific career development stages.`),
        hl(`Informatics Vendors`, `Reach nurse informaticists and clinical documentation specialists with EHR workflow tools, barcode medication systems, and clinical analytics platforms.`),
      ]),
    ],
    // 7: Physician
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Physician records are compiled from a combination of state medical board licensing databases, DEA registration files, and hospital medical staff credentialing systems. This multi-authority approach catches physicians who may be missing from any single source due to licensing jurisdiction or practice-type variations.`,
        `Academic faculty identification draws from medical school department directories and NIH grant recipient databases. Community-based physician detection leverages practice website analysis and professional network profiling to capture the independent practice segment.`,
      ], [
        hl(`Multi-Authority Sourcing`, `Physician records verified against state medical boards, DEA registries, and hospital credentialing systems for comprehensive coverage across practice settings.`),
        hl(`Academic Faculty Detection`, `Medical school department rosters and NIH grant databases identify physician faculty for academic detailing, research collaboration, and KOL engagement programs.`),
        hl(`Practice Website Analysis`, `Independent physician practices identified through automated web scraping that captures provider bios, specialties offered, and insurance panel participation.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Pharmaceutical companies engage this physician dataset for new drug launches, formulary pull-through campaigns, and medical science liaison outreach to key opinion leaders. Biotech firms use it to identify investigators for early-phase clinical trials.`,
        `Health system strategy teams, physician recruiting firms, and medical liability insurers each apply the dataset differently — M&A teams for practice acquisition targets, recruiters for candidate sourcing, and insurers for policy marketing — demonstrating the breadth of physician data applications.`,
      ], [
        hl(`Drug Launch Teams`, `Execute launch-sequence campaigns that build awareness with medical education, drive trial with sampling programs, and sustain adoption with formulary support outreach.`),
        hl(`MSL Field Teams`, `Identify key opinion leaders and clinical thought leaders for medical science liaison engagement based on publication history, trial participation, and speaking activity.`),
        hl(`Recruiting Firms`, `Source physician candidates for permanent placement, locum tenens coverage, and executive leadership positions using specialty, geography, and career-stage filters.`),
        hl(`Health System M&A`, `Identify independent physician groups as acquisition targets based on practice size, patient volume, payer mix, and strategic geographic fit indicators.`),
      ]),
    ],
    // 8: Plastic Surgeons
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Plastic surgeon data sourcing distinguishes between ABPS board-certified plastic surgeons, ABMS-recognized facial plastic surgeons, and cosmetic practitioners from other surgical specialties. This certification-level precision prevents campaigns from reaching non-qualified contacts.`,
        `Practice setting classification identifies surgeons operating private aesthetic clinics, med-spa facilities, hospital-based reconstructive departments, and academic programs — each with different product needs, purchasing processes, and marketing receptivity.`,
      ], [
        hl(`Board Certification Depth`, `ABPS, ABFPRS, and ABCS certifications distinguished to separate plastic surgeons from dermatologists and other physicians performing cosmetic procedures.`),
        hl(`Aesthetic vs. Reconstructive`, `Procedure focus classified as primarily cosmetic, primarily reconstructive, or mixed — enabling product-matched campaign targeting for each segment.`),
        hl(`ASC Ownership Data`, `Ambulatory surgery center ownership and operating privileges identified for surgeons who control facility-level purchasing decisions.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Aesthetic device manufacturers use this data to promote laser platforms, body contouring systems, and injectable delivery devices to cosmetic-focused surgeons at private practices and med-spas. Implant companies target reconstructive surgeons at hospital-based programs.`,
        `Medical skincare brands, patient financing companies, and practice marketing agencies each serve the plastic surgery market with offerings tailored to practice type — aesthetic companies for private practices, clinical companies for hospital departments.`,
      ], [
        hl(`Aesthetic Device Makers`, `Target cosmetic plastic surgeons with energy-based device demonstrations, trade-in programs, and procedure-volume-based financing for capital equipment purchases.`),
        hl(`Skincare Brands`, `Reach plastic surgeons dispensing medical-grade skincare with wholesale programs, private-label opportunities, and clinical protocol partnerships.`),
        hl(`Patient Financing`, `Offer practice-integrated financing solutions to aesthetic surgery practices that serve elective self-pay patients seeking payment plan options.`),
        hl(`Practice Marketing`, `Market SEO, social media management, and patient review platforms to plastic surgery practices competing for cosmetic procedure market share.`),
      ]),
    ],
    // 9: US Pharmacist
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Pharmacist data compilation begins with state pharmacy board licensing records that confirm active RPh and PharmD credentials, practice setting authorization, and controlled substance dispensing privileges. DEA registration cross-referencing validates prescriptive authority scope.`,
        `Pharmacy employer identification links each pharmacist to their practice setting — retail chain, independent, hospital, specialty, compounding, or mail-order — using chain corporate directories, health system staff rosters, and PCAB accreditation records.`,
      ], [
        hl(`Pharmacy Board Licensing`, `Active pharmacist licensure verified through each state's board of pharmacy with practice setting authorizations and disciplinary history screening.`),
        hl(`BPS Specialty Tracking`, `Board of Pharmacy Specialties certifications — oncology, critical care, ambulatory care — tracked for clinical pharmacist audience segmentation.`),
        hl(`Chain vs. Independent`, `National chain pharmacists distinguished from independent pharmacy owners for campaigns tailored to different purchasing authority and operational models.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Pharmaceutical manufacturers engage pharmacists through formulary education programs, generic substitution awareness campaigns, and specialty pharmacy distribution partnerships. Pharmacy automation vendors target high-volume dispensing locations with robotic fulfillment systems.`,
        `Clinical pharmacy service providers, compounding supply companies, and pharmacy benefit consultants each reach specific pharmacist segments — hospital for clinical services, independent for compounding, PBM-affiliated for benefit consulting.`,
      ], [
        hl(`Pharma Manufacturers`, `Engage pharmacists with formulary education, generic launch awareness, and specialty drug distribution partnership opportunities through targeted outreach campaigns.`),
        hl(`Automation Vendors`, `Target pharmacy directors at high-volume retail and hospital pharmacies with robotic dispensing, automated verification, and inventory management technology.`),
        hl(`Compounding Suppliers`, `Reach compounding pharmacists with USP-compliant equipment, bulk pharmaceutical ingredients, and sterile preparation facility design services.`),
        hl(`Clinical Service Platforms`, `Market MTM documentation tools, pharmacogenomic testing platforms, and clinical protocol systems to pharmacists expanding patient care services.`),
      ]),
    ],
    // 10: Veterinarians
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Veterinary data sourcing combines state veterinary board licensing records with AVMA membership directories and corporate veterinary group employee rosters. Species-focus classification — companion animal, equine, food animal, exotic — is derived from practice descriptions and continuing education patterns.`,
        `Practice ownership data distinguishes solo-owner DVMs from associates employed by corporate consolidators like Mars Veterinary Health, NVA, and VCA — a critical segmentation for vendors whose sales approach varies between owner-buyers and employed clinicians.`,
      ], [
        hl(`Species Focus Detection`, `Practice species focus classified through AVMA practice categories, state license endorsements, and CE course enrollment patterns.`),
        hl(`Corporate Affiliation`, `Corporate veterinary group ownership mapped for Mars, NVA, VCA, and regional consolidators to distinguish owner-buyers from employed associates.`),
        hl(`USDA Accreditation`, `Federal veterinary accreditation status tracked for DVMs authorized to issue health certificates and participate in disease surveillance programs.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Animal pharmaceutical companies use this data to detail companion animal therapeutics, livestock vaccines, and parasiticides to veterinarians segmented by species focus and prescribing patterns. Diagnostic equipment vendors target practice owners evaluating in-clinic analyzer investments.`,
        `Pet nutrition brands, veterinary software companies, and practice acquisition firms each leverage the ownership and species-focus segmentation to build campaigns matched to the operational reality of different veterinary practice types.`,
      ], [
        hl(`Animal Pharma`, `Detail companion animal drugs, livestock biologics, and parasiticide products to veterinarians segmented by species focus, practice size, and prescribing authority.`),
        hl(`Diagnostic Vendors`, `Target veterinary practice owners with in-clinic blood analyzer, digital radiography, and ultrasound equipment demonstrations and lease financing programs.`),
        hl(`Pet Nutrition`, `Reach veterinarians recommending pet food brands with clinic-exclusive diet programs, therapeutic nutrition protocols, and retail partnership opportunities.`),
        hl(`Practice Acquirers`, `Identify independently-owned veterinary practices for consolidation outreach based on revenue estimates, location, and owner retirement timeline indicators.`),
      ]),
    ],
    // 11: X-Ray Laboratories
    [
      proseSection("split", p0k, p0tp, p0ta, [
        `Imaging facility data originates from CMS certification records for Medicare-participating diagnostic centers, supplemented by ACR accreditation databases and state radiation control program registrations. Each facility profile includes modality inventory, patient volume indicators, and ownership classification.`,
        `Decision-maker identification at imaging centers maps radiologist medical directors, facility administrators, and technical supervisors through organizational directory research and professional association membership cross-referencing.`,
      ], [
        hl(`CMS Facility Certification`, `Medicare-certified imaging centers identified with modality-specific service codes, patient volume ranges, and most recent survey compliance dates.`),
        hl(`ACR Accreditation Status`, `American College of Radiology accreditation tracked by modality — CT, MRI, mammography, nuclear medicine — for quality-credential-based targeting.`),
        hl(`Equipment Age Estimation`, `Installed equipment vintage estimated through original certification dates and technology refresh patterns to identify replacement-cycle opportunities.`),
      ]),
      proseSection("centered", p1k, p1tp, p1ta, [
        `Medical imaging OEMs marketing CT scanners, MRI systems, and digital radiography platforms use this data to identify facilities approaching equipment replacement cycles. Service contract providers target centers with expiring OEM warranties.`,
        `Radiology IT companies, contrast media suppliers, and radiation safety consultants each reach different facility stakeholders — PACS administrators for IT, radiologists for contrast protocols, RSOs for safety compliance.`,
      ], [
        hl(`Imaging OEMs`, `Identify diagnostic centers on equipment replacement timelines for CT, MRI, and digital X-ray system upgrade proposals and competitive displacement campaigns.`),
        hl(`Service Providers`, `Target facilities with expiring OEM warranties for independent service contracts, tube replacement programs, and preventive maintenance agreements.`),
        hl(`Radiology IT`, `Reach PACS administrators and imaging informatics specialists with enterprise viewing, AI-assisted interpretation, and cloud archiving platform solutions.`),
        hl(`Safety Compliance`, `Market dosimetry monitoring, shielding assessments, and MQSA compliance consulting to imaging facility radiation safety officers and quality managers.`),
      ]),
    ],
  ];

  // For non-HC categories, generate with product name variations
  function industryProse(sn, h1, catIdx) {
    const p1Variants = [
      `The ${h1} is assembled through systematic collection from government registries, industry association databases, and corporate filing systems. Each company and contact record is enriched with current firmographic data, role classifications, and multi-channel contact details verified against authoritative business directories.`,
      `Building the ${h1} starts with authoritative industry data sources — regulatory filings, licensing databases, and trade association membership rolls. Contact enrichment adds verified email addresses, direct phone numbers, and decision-maker role classifications through corporate directory matching and professional network analysis.`,
      `Our approach to the ${h1} prioritizes data provenance — every company record traces back to a verifiable registration, filing, or directory listing. Contact details are validated through independent channels including SMTP email verification, phone carrier databases, and NCOA-processed mailing addresses.`,
      `The ${h1} combines public record data with proprietary intelligence gathered through industry event participation tracking, trade publication subscriber lists, and vendor partnership ecosystem mapping. This multi-signal approach captures ${sn.toLowerCase()} decision-makers that single-source databases miss.`,
      `Compiling the ${h1} requires navigating fragmented data sources across the ${sn.toLowerCase()} sector — from regional business registries to national industry directories. Our data pipeline normalizes company identifiers, standardizes job titles to functional roles, and deduplicates contacts appearing in multiple sources.`,
      `The ${h1} draws from sector-specific databases that general B2B providers don't access — ${sn.toLowerCase()} regulatory filings, industry certification records, and specialized trade association directories. Each source contributes unique data attributes that enable the deep segmentation ${sn.toLowerCase()} marketers require.`,
    ];
    const p2Variants = [
      `Sales development teams use the ${h1} to build territory-aligned prospect lists filtered by company size, geography, and role function. Marketing operations teams power ABM programs with firmographic enrichment and multi-threaded contact coverage across target accounts.`,
      `Channel partners, solution providers, and consulting firms serving the ${sn.toLowerCase()} market each leverage the ${h1} to identify net-new opportunities, build referral networks, and expand their client base through precisely-targeted outreach campaigns.`,
      `Whether running account-based campaigns, filling industry event registrations, or sourcing distribution partners, the ${h1} provides the firmographic depth and decision-maker access needed to execute full-funnel ${sn.toLowerCase()} marketing programs efficiently.`,
      `Growth teams use the ${h1} to power outbound prospecting sequences, while marketing operations teams build segmented nurture campaigns and digital advertising audiences. Both benefit from the same verified contact foundation and company intelligence layer.`,
      `The ${h1} supports the entire revenue cycle — from demand generation and lead qualification through pipeline acceleration and customer expansion — with consistent data quality and segmentation precision across every campaign channel.`,
      `From competitive displacement campaigns to trade show follow-up programs, the ${h1} enables ${sn.toLowerCase()} marketers to execute multi-touch outreach strategies that align messaging with buyer role, company stage, and purchasing timeline.`,
    ];
    const hlSets = [
      [
        hl(`${sn} Registry Sources`, `Company records sourced from government registries, industry licensing databases, and regulatory filing systems for authoritative data provenance and coverage.`),
        hl(`${sn} Contact Verification`, `Decision-maker email addresses verified through SMTP handshake, phone numbers validated through carrier databases, and addresses processed through NCOA.`),
        hl(`${sn} Data Currency`, `Records refreshed on a scheduled cadence with automated suppression of outdated contacts, closed businesses, and returned-mail indicators.`),
      ],
      [
        hl(`${sn} Industry Intelligence`, `Company profiles enriched with sector-specific attributes — license types, certification status, and market segment classifications — beyond standard firmographics.`),
        hl(`${sn} Role Mapping`, `Job titles normalized to functional role categories enabling persona-based targeting across procurement, operations, IT, and executive leadership.`),
        hl(`${sn} Multi-Channel Data`, `Every ${sn.toLowerCase()} contact includes verified email, phone, and mailing address for coordinated campaign activation across digital and traditional channels.`),
      ],
      [
        hl(`${sn} Firmographic Depth`, `Company size, revenue range, employee count, and geographic footprint data enabling account prioritization and territory alignment for field teams.`),
        hl(`${sn} Decision-Maker Access`, `C-suite, VP, and director-level contacts identified and verified through corporate directory services and professional network analysis.`),
        hl(`${sn} Compliance Ready`, `CAN-SPAM, TCPA, and CCPA compliance documentation with documented opt-in provenance and channel-specific permission indicators for every contact.`),
      ],
    ];
    const hl2Sets = [
      [
        hl(`${sn} SDR Teams`, `Build territory-aligned prospect lists from the ${h1} filtered by company size, geography, and buyer role for outbound prospecting sequences.`),
        hl(`${sn} Marketing Ops`, `Power segmented email campaigns, direct mail programs, and digital audience matching with compliance-ready ${sn.toLowerCase()} contact records.`),
        hl(`${sn} ABM Programs`, `Execute account-based marketing strategies with multi-threaded contact coverage and firmographic enrichment across ${sn.toLowerCase()} target accounts.`),
        hl(`${sn} Channel Teams`, `Identify and recruit distribution partners, resellers, and strategic alliance opportunities within the ${sn.toLowerCase()} market ecosystem.`),
      ],
      [
        hl(`${sn} Demand Gen`, `Generate marketing-qualified leads from ${sn.toLowerCase()} decision-makers through gated content, webinar registration, and demo request campaigns.`),
        hl(`${sn} Field Sales`, `Equip territory reps with verified contact data and account intelligence for personalized outreach to ${sn.toLowerCase()} prospects and customers.`),
        hl(`${sn} Event Marketing`, `Fill conference exhibition spaces, sponsored sessions, and networking events with targeted ${sn.toLowerCase()} professional audience building.`),
        hl(`${sn} Customer Growth`, `Expand revenue within existing ${sn.toLowerCase()} accounts through cross-sell targeting, upsell identification, and multi-department penetration strategies.`),
      ],
    ];
    return [
      proseSection("split", p0k, p0tp, p0ta,
        [p1Variants[catIdx % p1Variants.length], p2Variants[catIdx % p2Variants.length]],
        hlSets[catIdx % hlSets.length]),
      proseSection("centered", p1k, p1tp, p1ta,
        [p2Variants[(catIdx + 1) % p2Variants.length], p1Variants[(catIdx + 2) % p1Variants.length]],
        hl2Sets[catIdx % hl2Sets.length]),
    ];
  }

  if (cat === "hc") return hcSets[catIdx % hcSets.length];
  // All other categories use the industry/tech generator
  return industryProse(sn, h1, catIdx);
}

/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");
  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current, proseSections } | order(slug.current)'
  );
  console.log(`Found ${pages.length} leaf pages\n`);

  const catCounters = {};
  for (let gi = 0; gi < pages.length; gi++) {
    const { _id, h1, slug, proseSections: existing } = pages[gi];
    const cat = getCat(slug);
    const sn = shortName(h1);
    const catIdx = catCounters[cat] || 0;
    catCounters[cat] = catIdx + 1;

    const newProse = genProseSections(h1, sn, cat, catIdx, existing);
    console.log(`[${gi + 1}] ${slug} (${cat}#${catIdx})`);

    if (DRY_RUN) {
      console.log(`  P0-para0: ${newProse[0].paragraphs[0].children[0].text.slice(0, 60)}...`);
      console.log(`  P0-hl0: ${newProse[0].highlights[0].label} → ${newProse[0].highlights[0].text[0].children[0].text.slice(0, 50)}...`);
    } else {
      await client.patch(_id).set({ proseSections: newProse }).commit();
      try {
        const d = await client.getDocument(`drafts.${_id}`);
        if (d) await client.patch(`drafts.${_id}`).set({ proseSections: newProse }).commit();
      } catch {}
      console.log("  ✓");
    }
  }
  console.log(`\nDone! ${pages.length} pages updated.`);
}

main().catch(e => { console.error(e); process.exit(1); });
