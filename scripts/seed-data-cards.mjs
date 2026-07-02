/**
 * Seed Data Cards into Sanity CMS
 * ────────────────────────────────
 * Run: node scripts/seed-data-cards.mjs
 *
 * Reads the static data, strips "by Infodepots" from names,
 * converts dates to ISO format, and creates documents in Sanity.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  useCdn: false,
  token:
    "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
});

/** Convert "06/01/2026" → "2026-06-01" */
function toISODate(mmddyyyy) {
  const [m, d, y] = mmddyyyy.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/** Slugify a name into a stable document _id */
function toId(name) {
  return (
    "dataCard-" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

// All 184 cards — copied from data/dataCards.ts
const RAW = [
  { name: "3D Animation Professionals by Infodepots", universe: 5673, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "3D Modelling Artists by Infodepots", universe: 5057, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Academic Researchers by Infodepots", universe: 840142, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Account Analysts by Infodepots", universe: 112557, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accountants and Auditors by Infodepots", universe: 962527, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accountants by Infodepots", universe: 770647, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Assistants by Infodepots", universe: 175835, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Clerks by Infodepots", universe: 142537, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Director Professionals by Infodepots", universe: 45143, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Interns by Infodepots", universe: 42483, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Managers by Infodepots", universe: 187545, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Officers by Infodepots", universe: 105709, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Professionals by Infodepots", universe: 67564, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Secretaries by Infodepots", universe: 91580, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Accounting Supervisors by Infodepots", universe: 70985, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Active American Lifestyles by Infodepots", universe: 99786376, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Active Auto Dealership Contacts – Monthly Verified by Infodepots", universe: 167843, lastUpdated: "06/01/2026", category: "Automotive" },
  { name: "Active Investors by Infodepots", universe: 11095249, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Active Lifestyle Auto Accessory Buyers by Infodepots", universe: 178347, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Actuaries by Infodepots", universe: 18724, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Administrative Assistants by Infodepots", universe: 542816, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Administrative Managers by Infodepots", universe: 215340, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Advertising & Marketing Professionals by Infodepots", universe: 1284590, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Aerospace Engineers by Infodepots", universe: 63249, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Agriculture Industry Professionals by Infodepots", universe: 384721, lastUpdated: "06/01/2026", category: "Agriculture" },
  { name: "AI & Machine Learning Engineers by Infodepots", universe: 127856, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Allergists & Immunologists by Infodepots", universe: 12348, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Anesthesiologists by Infodepots", universe: 42756, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Architects by Infodepots", universe: 189435, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Attorney & Lawyer Mailing List by Infodepots", universe: 1347582, lastUpdated: "06/01/2026", category: "Legal" },
  { name: "Auto Dealers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Automotive" },
  { name: "Auto Insurance Buyers by Infodepots", universe: 8764321, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Automotive Aftermarket by Infodepots", universe: 412389, lastUpdated: "06/01/2026", category: "Automotive" },
  { name: "Banking & Finance Executives by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Biomedical Engineers by Infodepots", universe: 34567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Biotech Professionals by Infodepots", universe: 245678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Business Analysts by Infodepots", universe: 534289, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Business Owners by Infodepots", universe: 4532187, lastUpdated: "06/01/2026", category: "Business" },
  { name: "C-Level Executives by Infodepots", universe: 2341567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Cardiologists Email List by Infodepots", universe: 28745, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Chemical Engineers by Infodepots", universe: 78432, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Chief Executive Officers by Infodepots", universe: 987654, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Chief Financial Officers by Infodepots", universe: 654321, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Chief Information Officers by Infodepots", universe: 321456, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Chief Marketing Officers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Chief Technology Officers by Infodepots", universe: 287654, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Chiropractors by Infodepots", universe: 76543, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Cisco Certified Network Engineers by Infodepots", universe: 145678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Civil Engineers by Infodepots", universe: 267890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Cloud Computing Professionals by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Construction Industry by Infodepots", universe: 1234567, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "CRM Software Users by Infodepots", universe: 876234, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Cybersecurity Professionals by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Data Scientists by Infodepots", universe: 213456, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Database Administrators by Infodepots", universe: 187654, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Dentist Email List by Infodepots", universe: 198765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Dermatologists by Infodepots", universe: 15234, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "DevOps Engineers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Doctors Email List by Infodepots", universe: 987654, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "E-Commerce Professionals by Infodepots", universe: 534567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Education Decision Makers by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Electrical Engineers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Emergency Medicine Physicians by Infodepots", universe: 42345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Endocrinologists by Infodepots", universe: 8765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Energy Industry Professionals by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Energy" },
  { name: "Enterprise Software Users by Infodepots", universe: 1234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Environmental Engineers by Infodepots", universe: 89012, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "ERP Users Email List by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Event Planners by Infodepots", universe: 156789, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Family Medicine Physicians by Infodepots", universe: 123456, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Financial Advisors by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Financial Analysts by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Fitness & Wellness Enthusiasts by Infodepots", universe: 12345678, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Franchise Owners by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Gastroenterologists by Infodepots", universe: 14567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "General Surgeons by Infodepots", universe: 34567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Government & Public Sector by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Government" },
  { name: "Graphic Designers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Healthcare Administrators by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Healthcare IT Professionals by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Home Improvement Enthusiasts by Infodepots", universe: 23456789, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Homeowners by Infodepots", universe: 45678901, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Hospitality Industry by Infodepots", universe: 987654, lastUpdated: "06/01/2026", category: "Hospitality" },
  { name: "Hospital Administrators by Infodepots", universe: 156789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Hotel & Resort Managers by Infodepots", universe: 123456, lastUpdated: "06/01/2026", category: "Hospitality" },
  { name: "HR Directors by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "HR Managers by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Human Resources Professionals by Infodepots", universe: 1234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "HVAC Contractors by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "Industrial Engineers by Infodepots", universe: 156789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Insurance Agents by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Insurance Brokers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Interior Designers by Infodepots", universe: 167890, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Internal Medicine Physicians by Infodepots", universe: 156789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "IT Decision Makers by Infodepots", universe: 2345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Directors by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Managers by Infodepots", universe: 678901, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Professionals by Infodepots", universe: 3456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "IT Security Professionals by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Java Developers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "K-12 School Administrators by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Legal Professionals by Infodepots", universe: 1456789, lastUpdated: "06/01/2026", category: "Legal" },
  { name: "Life Insurance Buyers by Infodepots", universe: 5678901, lastUpdated: "06/01/2026", category: "Insurance" },
  { name: "Linux Users by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Logistics & Supply Chain by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Luxury Goods Buyers by Infodepots", universe: 3456789, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Manufacturing Executives by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Manufacturing" },
  { name: "Marketing Managers by Infodepots", universe: 678901, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Mechanical Engineers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Medical Device Professionals by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Microsoft Azure Users by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Microsoft Dynamics Users by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Mobile App Developers by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Mortgage Brokers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Nephrologists by Infodepots", universe: 9876, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Network Administrators by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Neurologists by Infodepots", universe: 18765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "New Homeowners by Infodepots", universe: 6789012, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Non-Profit Organizations by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Non-Profit" },
  { name: "Nurses Email List by Infodepots", universe: 3456789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Obstetricians & Gynecologists by Infodepots", universe: 45678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Oncologists by Infodepots", universe: 15678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Ophthalmologists by Infodepots", universe: 19876, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Optometrists by Infodepots", universe: 42345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Oracle Users by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Orthodontists by Infodepots", universe: 11234, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Orthopedic Surgeons by Infodepots", universe: 28765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pathologists by Infodepots", universe: 16789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pediatricians by Infodepots", universe: 67890, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pet Owners by Infodepots", universe: 34567890, lastUpdated: "06/01/2026", category: "Consumer" },
  { name: "Pharmaceutical Professionals by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pharmacists by Infodepots", universe: 312456, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Physical Therapists by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Physicians Email List by Infodepots", universe: 987654, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Plastic Surgeons by Infodepots", universe: 8765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Plumbers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "Podiatrists by Infodepots", universe: 14567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Product Managers by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Project Managers by Infodepots", universe: 1234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Property Managers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Real Estate" },
  { name: "Psychiatrists by Infodepots", universe: 45678, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Psychologists by Infodepots", universe: 123456, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Pulmonologists by Infodepots", universe: 12345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Purchasing Managers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Python Developers by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Radiologists by Infodepots", universe: 34567, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Real Estate Agents by Infodepots", universe: 1567890, lastUpdated: "06/01/2026", category: "Real Estate" },
  { name: "Real Estate Investors by Infodepots", universe: 2345678, lastUpdated: "06/01/2026", category: "Real Estate" },
  { name: "Registered Nurses by Infodepots", universe: 2876543, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Restaurant Owners by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Hospitality" },
  { name: "Retail Store Managers by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Retail" },
  { name: "Rheumatologists by Infodepots", universe: 6789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Salesforce Users by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Sales Managers by Infodepots", universe: 876543, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Sales Representatives by Infodepots", universe: 2345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "SAP Users by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "School Principals by Infodepots", universe: 134567, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Senior Living Decision Makers by Infodepots", universe: 78901, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Small Business Owners by Infodepots", universe: 6789012, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Social Media Managers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "Software Developers by Infodepots", universe: 2345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Software Engineers by Infodepots", universe: 1876543, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Supply Chain Managers by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Surgeons by Infodepots", universe: 156789, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "Tableau Users by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Teachers by Infodepots", universe: 3456789, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Telecommunications Professionals by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Travel Agents by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Travel" },
  { name: "University Professors by Infodepots", universe: 567890, lastUpdated: "06/01/2026", category: "Education" },
  { name: "Urologists by Infodepots", universe: 12345, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "UX/UI Designers by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Venture Capital Professionals by Infodepots", universe: 45678, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Veterinarians by Infodepots", universe: 98765, lastUpdated: "06/01/2026", category: "Healthcare" },
  { name: "VMware Users by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "VP of Engineering by Infodepots", universe: 156789, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "VP of Finance by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "VP of Marketing by Infodepots", universe: 234567, lastUpdated: "06/01/2026", category: "Marketing" },
  { name: "VP of Operations by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "VP of Sales by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Wealth Managers by Infodepots", universe: 123456, lastUpdated: "06/01/2026", category: "Financial" },
  { name: "Web Developers by Infodepots", universe: 1234567, lastUpdated: "06/01/2026", category: "Technology" },
  { name: "Welders by Infodepots", universe: 345678, lastUpdated: "06/01/2026", category: "Construction" },
  { name: "Wholesale Distributors by Infodepots", universe: 456789, lastUpdated: "06/01/2026", category: "Business" },
  { name: "Women Business Owners by Infodepots", universe: 2345678, lastUpdated: "06/01/2026", category: "Business" },
];

async function main() {
  console.log(`Seeding ${RAW.length} data cards into Sanity...\n`);

  // Use Sanity transaction for bulk create
  let tx = client.transaction();

  for (const raw of RAW) {
    const cleanName = raw.name.replace(/ by Infodepots$/i, "").replace(/ by Infodepots/i, "").trim();
    const doc = {
      _id: toId(cleanName),
      _type: "dataCard",
      name: cleanName,
      universe: raw.universe,
      lastUpdated: toISODate(raw.lastUpdated),
      category: raw.category,
    };
    tx = tx.createOrReplace(doc);
  }

  const result = await tx.commit();
  console.log(`✅ Done! Created/replaced ${RAW.length} data card documents.`);
  console.log(`   Transaction ID: ${result.transactionId}`);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
