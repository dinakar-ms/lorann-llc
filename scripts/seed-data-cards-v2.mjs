/**
 * Seed Data Cards v2 — Full fields
 * Run: node scripts/seed-data-cards-v2.mjs
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  useCdn: false,
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
});

function toISODate(mmddyyyy) {
  const [m, d, y] = mmddyyyy.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

function toId(name) {
  return "dataCard-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Generate description based on name and category */
function genDesc(name, category, universe) {
  const fmtU = new Intl.NumberFormat("en-US").format(universe);
  return `Lorann's ${name} database enables marketers to reach ${fmtU} highly targeted professionals and contacts in the ${category} sector. This activation-ready audience data connects you with verified decision-makers for multi-channel campaign deployment.\n\nBy leveraging this curated database, businesses can execute precision-targeted outreach across email, direct mail, phone, and digital channels. Each record undergoes rigorous verification including NCOA processing, CASS certification, email deliverability scoring, and phone append validation.\n\nThis multi-channel database provides a comprehensive marketing resource connecting you to qualified contacts across various industries. Whether your goal is lead generation, brand awareness, or market expansion, this data card ensures precise targeting and increased engagement.\n\nAll records include the ability to license complete multi-channel records with all selections included for a 12-month unlimited-use arrangement. Data can be used for postal, email, and outbound telemarketing campaigns. Contact Lorann for details and pricing.`;
}

/** Category-specific selects */
const CATEGORY_SELECTS = {
  Technology: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "LinkedIn Presence", "Job Title", "Job Function", "Number of Employees", "Sales Volume", "Technology Stack", "Software Proficiency", "Industry Focus", "Company Size", "Install Base", "Purchase Intent"],
  Healthcare: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "NPI Number", "Specialty", "Practice Type", "Prescribing Volume", "Hospital Affiliation", "Board Certification", "DEA Registration", "License State", "Years in Practice"],
  Business: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "LinkedIn Presence", "Job Title", "Job Function", "Number of Employees", "Sales Volume", "SIC/NAICS Code", "Annual Revenue", "Years in Business", "Company Size", "Decision Authority"],
  Consumer: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Age Range", "Household Income", "Home Ownership", "Marital Status", "Presence of Children", "Purchase Behavior", "Lifestyle Interests", "Credit Score Range", "Net Worth"],
  Financial: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "LinkedIn Presence", "Job Title", "License Type", "AUM Range", "Firm Size", "Specialization", "Regulatory Status", "Client Segment", "Years Licensed"],
  Education: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Institution Type", "Grade Level", "Title/Role", "Enrollment Size", "Public vs Private", "Budget Authority", "Technology Adoption", "Department", "Accreditation"],
  Marketing: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "LinkedIn Presence", "Job Title", "Job Function", "Company Size", "Marketing Tech Stack", "Budget Range", "Agency vs In-House", "Specialization", "Social Presence"],
  Insurance: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "License Type", "Lines of Business", "Agency Size", "Carrier Appointments", "Production Volume", "Years Licensed", "Specialization"],
  Automotive: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Dealership Type", "Make/Brand", "Dealership Size", "Title/Role", "New vs Used", "Service Department", "F&I Decision Maker"],
  Construction: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Trade Specialty", "Company Size", "License Type", "Project Type", "Annual Revenue", "Service Area", "Safety Certifications"],
  Hospitality: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Property Type", "Star Rating", "Number of Rooms", "Title/Role", "Chain vs Independent", "F&B Decision Maker", "Revenue Range"],
  "Real Estate": ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "License Type", "Specialization", "Transaction Volume", "MLS Membership", "Brokerage Size", "Years Licensed", "Geographic Market"],
  Legal: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Practice Area", "Firm Size", "Bar Admission", "Years in Practice", "Title/Role", "Case Type Focus", "Court Jurisdiction"],
  Energy: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Sector Type", "Company Size", "Title/Role", "Regulatory Region", "Technology Focus", "Annual Revenue", "Sustainability Initiatives"],
  Government: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Agency Type", "Government Level", "Department", "Title/Role", "Budget Authority", "Procurement Role", "Geographic Jurisdiction"],
  Manufacturing: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Industry Segment", "Plant Size", "Title/Role", "Annual Revenue", "Number of Employees", "Production Type", "Quality Certifications"],
  "Non-Profit": ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Organization Type", "Mission Focus", "Budget Size", "Title/Role", "Donor Base Size", "Tax Status", "Geographic Reach"],
  Retail: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Store Type", "Number of Locations", "Title/Role", "Annual Revenue", "E-Commerce Presence", "Product Category", "POS System"],
  Travel: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Agency Type", "Specialization", "IATA Number", "Annual Bookings", "Title/Role", "Consortium Membership", "GDS System"],
  Agriculture: ["Gender/Sex", "Phone Numbers", "State/SCF/Zip Code", "Farm Type", "Acreage", "Crop/Livestock", "Annual Revenue", "Equipment Usage", "Cooperative Membership", "USDA Region"],
};

/** Market type from category */
function getMarket(cat) {
  if (["Consumer"].includes(cat)) return "Consumer";
  if (["Healthcare"].includes(cat)) return "Healthcare";
  if (["Consumer", "Retail", "Travel"].includes(cat)) return "B2B/B2C";
  return "Business";
}

/** Seed-stable pseudo-random from string */
function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// All 184 cards
const RAW = [
  { name: "3D Animation Professionals", universe: 5673, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "3D Modelling Artists", universe: 5057, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Academic Researchers", universe: 840142, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Account Analysts", universe: 112557, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accountants and Auditors", universe: 962527, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accountants", universe: 770647, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Assistants", universe: 175835, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Clerks", universe: 142537, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Director Professionals", universe: 45143, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Interns", universe: 42483, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Managers", universe: 187545, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Officers", universe: 105709, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Professionals", universe: 67564, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Secretaries", universe: 91580, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Supervisors", universe: 70985, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Active American Lifestyles", universe: 99786376, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Active Auto Dealership Contacts – Monthly Verified", universe: 167843, lastUpdated: "06/01/2026", category: "Automotive" },
  { name: "Active Investors", universe: 11095249, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Active Lifestyle Auto Accessory Buyers", universe: 178347, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Actuaries", universe: 18724, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Administrative Assistants", universe: 542816, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Administrative Managers", universe: 215340, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Advertising & Marketing Professionals", universe: 1284590, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Aerospace Engineers", universe: 63249, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Agriculture Industry Professionals", universe: 384721, lastUpdated: "06/01/2026", category: "Agriculture" },
  { name: "AI & Machine Learning Engineers", universe: 127856, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Allergists & Immunologists", universe: 12348, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Anesthesiologists", universe: 42756, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Architects", universe: 189435, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Attorney & Lawyer Mailing List", universe: 1347582, lastUpdated: "06/01/2026", category: "Legal" },
  { name: "Auto Dealers", universe: 234567, lastUpdated: "06/01/2026", category: "Automotive" },
  { name: "Auto Insurance Buyers", universe: 8764321, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Automotive Aftermarket", universe: 412389, lastUpdated: "06/01/2026", category: "Automotive" },
  { name: "Banking & Finance Executives", universe: 876543, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Biomedical Engineers", universe: 34567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Biotech Professionals", universe: 245678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Business Analysts", universe: 534289, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Business Owners", universe: 4532187, lastUpdated: "06/01/2026", category: "Business" },
  { name: "C-Level Executives", universe: 2341567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Cardiologists Email List", universe: 28745, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Chemical Engineers", universe: 78432, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Chief Executive Officers", universe: 987654, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Chief Financial Officers", universe: 654321, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Chief Information Officers", universe: 321456, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Chief Marketing Officers", universe: 234567, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Chief Technology Officers", universe: 287654, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Chiropractors", universe: 76543, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Cisco Certified Network Engineers", universe: 145678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Civil Engineers", universe: 267890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Cloud Computing Professionals", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Construction Industry", universe: 1234567, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "CRM Software Users", universe: 876234, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Cybersecurity Professionals", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Data Scientists", universe: 213456, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Database Administrators", universe: 187654, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Dentist Email List", universe: 198765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Dermatologists", universe: 15234, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "DevOps Engineers", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Doctors Email List", universe: 987654, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "E-Commerce Professionals", universe: 534567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Education Decision Makers", universe: 456789, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Electrical Engineers", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Emergency Medicine Physicians", universe: 42345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Endocrinologists", universe: 8765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Energy Industry Professionals", universe: 567890, lastUpdated: "06/01/2026", category: "Energy" },
  { name: "Enterprise Software Users", universe: 1234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Environmental Engineers", universe: 89012, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "ERP Users Email List", universe: 876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Event Planners", universe: 156789, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Family Medicine Physicians", universe: 123456, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Financial Advisors", universe: 567890, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Financial Analysts", universe: 345678, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Fitness & Wellness Enthusiasts", universe: 12345678, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Franchise Owners", universe: 234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Gastroenterologists", universe: 14567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "General Surgeons", universe: 34567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Government & Public Sector", universe: 876543, lastUpdated: "06/01/2026", category: "Government" },
  { name: "Graphic Designers", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Healthcare Administrators", universe: 456789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Healthcare IT Professionals", universe: 234567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Home Improvement Enthusiasts", universe: 23456789, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Homeowners", universe: 45678901, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Hospitality Industry", universe: 987654, lastUpdated: "06/01/2026", category: "Hospitality" },
  { name: "Hospital Administrators", universe: 156789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Hotel & Resort Managers", universe: 123456, lastUpdated: "06/01/2026", category: "Hospitality" },
  { name: "HR Directors", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "HR Managers", universe: 567890, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Human Resources Professionals", universe: 1234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "HVAC Contractors", universe: 234567, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "Industrial Engineers", universe: 156789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Insurance Agents", universe: 876543, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Insurance Brokers", universe: 345678, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Interior Designers", universe: 167890, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Internal Medicine Physicians", universe: 156789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "IT Decision Makers", universe: 2345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Directors", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Managers", universe: 678901, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Professionals", universe: 3456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Security Professionals", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Java Developers", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "K-12 School Administrators", universe: 234567, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Legal Professionals", universe: 1456789, lastUpdated: "06/01/2026", category: "Legal" },
  { name: "Life Insurance Buyers", universe: 5678901, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Linux Users", universe: 876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Logistics & Supply Chain", universe: 567890, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Luxury Goods Buyers", universe: 3456789, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Manufacturing Executives", universe: 876543, lastUpdated: "06/01/2026", category: "Manufacturing" },
  { name: "Marketing Managers", universe: 678901, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Mechanical Engineers", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Medical Device Professionals", universe: 234567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Microsoft Azure Users", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Microsoft Dynamics Users", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Mobile App Developers", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Mortgage Brokers", universe: 234567, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Nephrologists", universe: 9876, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Network Administrators", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Neurologists", universe: 18765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "New Homeowners", universe: 6789012, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Non-Profit Organizations", universe: 456789, lastUpdated: "06/01/2026", category: "Non-Profit" },
  { name: "Nurses Email List", universe: 3456789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Obstetricians & Gynecologists", universe: 45678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Oncologists", universe: 15678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Ophthalmologists", universe: 19876, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Optometrists", universe: 42345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Oracle Users", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Orthodontists", universe: 11234, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Orthopedic Surgeons", universe: 28765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pathologists", universe: 16789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pediatricians", universe: 67890, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pet Owners", universe: 34567890, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Pharmaceutical Professionals", universe: 456789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pharmacists", universe: 312456, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Physical Therapists", universe: 234567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Physicians Email List", universe: 987654, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Plastic Surgeons", universe: 8765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Plumbers", universe: 345678, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "Podiatrists", universe: 14567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Product Managers", universe: 456789, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Project Managers", universe: 1234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Property Managers", universe: 345678, lastUpdated: "06/01/2026", category: "Real Estate" },
  { name: "Psychiatrists", universe: 45678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Psychologists", universe: 123456, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pulmonologists", universe: 12345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Purchasing Managers", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Python Developers", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Radiologists", universe: 34567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Real Estate Agents", universe: 1567890, lastUpdated: "06/01/2026", category: "Real Estate" },
  { name: "Real Estate Investors", universe: 2345678, lastUpdated: "06/01/2026", category: "Real Estate" },
  { name: "Registered Nurses", universe: 2876543, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Restaurant Owners", universe: 876543, lastUpdated: "06/01/2026", category: "Hospitality" },
  { name: "Retail Store Managers", universe: 567890, lastUpdated: "06/01/2026", category: "Retail" },
  { name: "Rheumatologists", universe: 6789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Salesforce Users", universe: 876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Sales Managers", universe: 876543, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Sales Representatives", universe: 2345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "SAP Users", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "School Principals", universe: 134567, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Senior Living Decision Makers", universe: 78901, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Small Business Owners", universe: 6789012, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Social Media Managers", universe: 234567, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Software Developers", universe: 2345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Software Engineers", universe: 1876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Supply Chain Managers", universe: 234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Surgeons", universe: 156789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Tableau Users", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Teachers", universe: 3456789, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Telecommunications Professionals", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Travel Agents", universe: 234567, lastUpdated: "06/01/2026", category: "Travel" },
  { name: "University Professors", universe: 567890, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Urologists", universe: 12345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "UX/UI Designers", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Venture Capital Professionals", universe: 45678, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Veterinarians", universe: 98765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "VMware Users", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "VP of Engineering", universe: 156789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "VP of Finance", universe: 234567, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "VP of Marketing", universe: 234567, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "VP of Operations", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "VP of Sales", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Wealth Managers", universe: 123456, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Web Developers", universe: 1234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Welders", universe: 345678, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "Wholesale Distributors", universe: 456789, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Women Business Owners", universe: 2345678, lastUpdated: "06/01/2026", category: "Business" },
];

async function main() {
  console.log(`Seeding ${RAW.length} data cards (v2 — full fields)...\n`);
  let tx = client.transaction();

  for (const raw of RAW) {
    const h = hashCode(raw.name);
    const u = raw.universe;

    // Segment counts derived from universe
    const postal = Math.round(u * (0.92 + (h % 8) * 0.01));
    const phone = Math.round(u * (0.88 + (h % 12) * 0.01));
    const email = Math.round(u * (0.95 + (h % 5) * 0.01));

    // Pricing
    const baseCpm = raw.category === "Healthcare" ? 95 : raw.category === "Financial" ? 85 : 75;
    const postalCpm = baseCpm;
    const phoneCpm = baseCpm;
    const emailCpm = baseCpm + 30;

    // Popularity & quality
    const pop = Math.min(99, Math.max(60, 70 + (h % 30)));
    const qualities = ["A+", "A", "A", "A-", "A", "A"];
    const quality = qualities[h % qualities.length];

    // Gender (varies by category)
    const maleBase = raw.category === "Healthcare" ? 58 : raw.category === "Technology" ? 72 : raw.category === "Consumer" ? 48 : 62;
    const male = Math.min(95, Math.max(30, maleBase + (h % 20) - 10));
    const female = +(100 - male).toFixed(1);

    const selects = CATEGORY_SELECTS[raw.category] || CATEGORY_SELECTS["Business"];

    const doc = {
      _id: toId(raw.name),
      _type: "dataCard",
      name: raw.name,
      universe: u,
      lastUpdated: toISODate(raw.lastUpdated),
      category: raw.category,
      description: genDesc(raw.name, raw.category, u),
      postalRecords: postal,
      phoneNumbers: phone,
      emailAddresses: email,
      postalCpm,
      phoneCpm,
      emailCpm,
      popularity: pop,
      cardQuality: quality,
      market: getMarket(raw.category),
      dataType: "Email, Postal, Phone",
      source: "Multi Sourced, Compiled Lists",
      geo: "USA",
      genderMale: male,
      genderFemale: female,
      selects,
      minimumOrder: 5000,
      minimumPrice: 0,
      netNamePercent: 85,
      brokerCommission: 20,
      agencyCommission: 15,
      exchangeAvailable: false,
      reuseAvailable: true,
      emailDeliveryFee: 25,
      ftpDeliveryFee: 25,
      marketEntryDate: "2025-01-06",
      nextUpdateDate: "2026-07-01",
      frequency: "Monthly",
    };

    tx = tx.createOrReplace(doc);
  }

  const result = await tx.commit();
  console.log(`✅ Done! Seeded ${RAW.length} cards with full fields.`);
  console.log(`   Transaction ID: ${result.transactionId}`);
}

main().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});
