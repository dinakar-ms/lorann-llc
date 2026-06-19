import { NextRequest, NextResponse } from "next/server";

const SITE_MARKDOWN = `# Lorann — B2B Data & Marketing Lists

Lorann provides verified B2B contact databases for healthcare professionals, real estate agents, financial advisors, and business decision-makers across the United States.

## Data Categories

### Healthcare Professionals
- Physicians & Doctors (850,000+ NPI-verified records)
- Registered Nurses, LPNs, CNAs, Nurse Practitioners, Physician Assistants
- Hospital Administrators, CEOs, CFOs, CMOs, Chief Nursing Officers
- Dentists, Dental Hygienists, Optometrists, Opticians
- Pharmacists, Physical Therapists, Occupational Therapists, Speech Therapists
- Psychologists, Psychiatrists, Mental Health Counselors, Social Workers
- Veterinarians, Chiropractors, Allied Health Professionals

### Real Estate Professionals
- Licensed Realtors and Real Estate Agents
- Real Estate Brokers
- Property Managers

### Financial Services
- Financial Advisors, Investment Advisors, Wealth Managers
- Insurance Agents and Brokers
- CPAs, Accountants, Tax Professionals
- Mortgage Brokers and Loan Officers

### Business Contacts
- Small and Medium Business Owners
- C-Suite Executives (CEO, CFO, COO, CTO)
- IT Decision Makers and Directors
- HR Directors and Managers

## Data Quality Standards

- NPI-verified records cross-referenced against CMS NPPES registry
- Weekly hygiene cycles: USPS NCOA, opt-out databases, license boards
- SMTP-validated email addresses with engagement indicators
- Bounce rates under 2%
- National DNC Registry scrubbing for phone numbers

## Compliance Framework

- HIPAA: Professional contact data only — no PHI
- CAN-SPAM: Email lists validated before delivery
- CCPA: State privacy law compliance with opt-out suppression
- FCRA: B2B marketing use only, exemption documentation available
- DNC: All phone records scrubbed before delivery

## Delivery Options

- File formats: CSV, Excel (.xlsx), pipe-delimited
- CRM integrations: Salesforce, HubSpot, Veeva, Zoho, Marketo
- Digital activation: programmatic audience segments available
- Turnaround: same-day to 48 hours depending on list size

## Contact

- Website: https://www.lorannllc.com
- Request a sample or count: https://www.lorannllc.com/contact-us
- Email: support@lorannllc.com
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || "/";

  return new NextResponse(SITE_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
      "X-Content-Path": path,
    },
  });
}
