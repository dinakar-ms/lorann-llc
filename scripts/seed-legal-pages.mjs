/**
 * Seed 6 legal/policy pages into Sanity.
 * Run:  node scripts/seed-legal-pages.mjs
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

function blocks(sections) {
  const result = [];
  for (const s of sections) {
    if (s.heading) {
      result.push({
        _type: "block",
        _key: key(),
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: key(), text: s.heading, marks: [] }],
      });
    }
    if (s.paragraphs) {
      for (const p of s.paragraphs) {
        result.push({
          _type: "block",
          _key: key(),
          style: "normal",
          markDefs: [],
          children: [{ _type: "span", _key: key(), text: p, marks: [] }],
        });
      }
    }
  }
  return result;
}

function toPortableText(str) {
  if (!str || typeof str !== "string") return null;
  return [{
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: str, marks: [] }],
  }];
}

// ─── Legal Pages Data ──────────────────────────────────
const LEGAL_PAGES = [
  {
    slug: "privacy-policy",
    h1: "Privacy Policy",
    kicker: "Legal",
    titlePlain: "Privacy",
    titleAccent: "Policy",
    heroDescription: "Lorann LLC is committed to protecting the privacy of our website visitors and clients. This Privacy Policy outlines how we collect, use, and safeguard your information.",
    metaTitle: "Privacy Policy | Lorann LLC",
    metaDescription: "Learn how Lorann LLC collects, uses, and protects your personal information. Our privacy policy covers data collection, cookies, security, and your rights.",
    content: blocks([
      { heading: "Consent", paragraphs: [
        "By using our website, you are giving your consent to our Privacy Policy and agreeing to its terms."
      ]},
      { heading: "Information We Collect", paragraphs: [
        "When you visit our website, interact with our services, or contact us, we may collect personal information such as your name, email address, phone number, and company information. We also collect non-personal data including IP addresses, browser types, referral URLs, and page access patterns to help us improve the user experience."
      ]},
      { heading: "How We Use Your Information", paragraphs: [
        "The information we collect is used to operate and improve our website, personalize your experience, develop new products and services, communicate with you about updates and offerings, provide customer service, and prevent fraud. Lorann LLC will not share, sell, rent, or disclose your personal information without your prior permission."
      ]},
      { heading: "Log Files and Technical Data", paragraphs: [
        "Like many websites, we use log files to track visitor activity using standard industry practices. This includes capturing IP addresses and browser information for trend analysis and demographic insights. This data is not linked to personally identifiable individuals."
      ]},
      { heading: "Cookies and Tracking", paragraphs: [
        "Our site uses cookies to enhance user experience by remembering preferences and monitoring performance. Third-party advertising partners may place their own cookies and pixels for retargeting purposes. You can control cookie settings through your browser preferences."
      ]},
      { heading: "Data Security", paragraphs: [
        "We employ firewalls and industry-standard security measures to protect your data from loss, misuse, or unauthorized modification. While no method of transmission over the Internet is 100% secure, we strive to use commercially acceptable means to protect your personal information."
      ]},
      { heading: "Your Rights Under CCPA", paragraphs: [
        "If you are a California resident, you have the right to request disclosure of the personal information we collect about you, request deletion of your personal information, and opt out of the sale of your personal information. We will respond to verified requests within one month."
      ]},
      { heading: "Your Rights Under GDPR", paragraphs: [
        "If you are located in the European Economic Area, you have rights including access, rectification, erasure, restriction of processing, data portability, and the right to object. We will respond to verified requests within one month."
      ]},
      { heading: "Children's Privacy", paragraphs: [
        "Lorann LLC does not intentionally collect information from users under the age of 13. We encourage parents and guardians to monitor their children's internet usage."
      ]},
      { heading: "Changes to This Policy", paragraphs: [
        "We may update this Privacy Policy from time to time. Changes will be posted on this page, and we advise you to review this policy periodically. If you have questions, contact us at privacy@lorannllc.com."
      ]},
    ]),
  },
  {
    slug: "data-security-policy",
    h1: "Data Security Policy",
    kicker: "Legal",
    titlePlain: "Data Security",
    titleAccent: "Policy",
    heroDescription: "At Lorann LLC, our commitment to safeguarding the data and information of our clients, employees, and partners is unwavering. This policy outlines our approach to managing data security risks.",
    metaTitle: "Data Security Policy | Lorann LLC",
    metaDescription: "Learn about Lorann LLC's data security measures including access control, encryption, network security, and compliance standards that protect your information.",
    content: blocks([
      { heading: "Scope", paragraphs: [
        "This policy is applicable to all individuals, including employees, contractors, and third parties, who access Lorann LLC's data and information systems."
      ]},
      { heading: "Data Classification", paragraphs: [
        "Data within Lorann LLC is categorized into three levels: Confidential information that could cause harm if disclosed; Internal Use Only information not intended for public dissemination but unlikely to cause harm if disclosed; and Public information authorized for public release."
      ]},
      { heading: "Roles and Responsibilities", paragraphs: [
        "All employees are accountable for adhering to this policy and protecting the data they handle. The IT Department is tasked with ensuring the operational security of all IT systems and infrastructure."
      ]},
      { heading: "Access Control", paragraphs: [
        "Data access is granted based on the principle of least privilege. Employees are provided access only to the data and systems necessary for their job functions, and access permissions are reviewed regularly."
      ]},
      { heading: "Encryption", paragraphs: [
        "Industry-standard encryption methods are employed to encrypt data in transit and at rest. This ensures that even if data is intercepted, it cannot be read without the proper decryption keys."
      ]},
      { heading: "Physical Security", paragraphs: [
        "Access to premises housing data infrastructure is controlled and monitored. Physical records containing sensitive information are disposed of using secure destruction methods."
      ]},
      { heading: "Network Security", paragraphs: [
        "Our network is safeguarded through the use of firewalls, intrusion detection and prevention systems, and continuous monitoring. Regular vulnerability assessments and penetration testing are conducted."
      ]},
      { heading: "Employee Training", paragraphs: [
        "All staff receive regular training to familiarize them with data protection responsibilities, recognize potential security threats, and follow proper data handling procedures."
      ]},
      { heading: "Data Retention and Disposal", paragraphs: [
        "Data is retained only as long as necessary for business purposes or as required by law. When data is no longer needed, it is securely deleted using methods that prevent recovery."
      ]},
      { heading: "Compliance and Review", paragraphs: [
        "This policy undergoes annual review and is updated in response to significant business or regulatory changes. Non-compliance may result in disciplinary action. Contact privacy@lorannllc.com with questions."
      ]},
    ]),
  },
  {
    slug: "ccpa-privacy-policy",
    h1: "CCPA & GDPR Compliance Policy",
    kicker: "Legal",
    titlePlain: "CCPA & GDPR",
    titleAccent: "Compliance Policy",
    heroDescription: "Lorann LLC upholds data compliance with both the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) through stringent measures and protocols.",
    metaTitle: "CCPA & GDPR Compliance Policy | Lorann LLC",
    metaDescription: "Learn how Lorann LLC complies with CCPA and GDPR regulations through data collection consent, purpose limitation, security measures, and data subject rights.",
    content: blocks([
      { heading: "Data Collection and Consent", paragraphs: [
        "Lorann LLC strictly adheres to the principle of obtaining explicit and unambiguous consent from individuals before collecting their data. This involves ensuring that consent is freely given, specific, and informed. For GDPR compliance, we inform individuals about the categories of personal information and the purposes for which it will be used at or before the point of collection. Under CCPA, we inform consumers about the categories of personal information and the purposes for which it will be used."
      ]},
      { heading: "Data Processing and Purpose Limitation", paragraphs: [
        "We ensure that personal data is collected for specific, explicit, and legitimate purposes and is further processed in a manner compatible with those purposes. Lorann LLC limits data processing to the purposes for which the data was collected, aligning with the purpose limitation principles of both GDPR and CCPA."
      ]},
      { heading: "Data Minimization", paragraphs: [
        "Lorann LLC practices data minimization by ensuring that only the necessary personal information for the specified purposes is collected and processed. This approach aligns with GDPR's data minimization principle and CCPA's mandate to collect only relevant and limited necessary data."
      ]},
      { heading: "Security Measures", paragraphs: [
        "To comply with both GDPR and CCPA, Lorann LLC implements appropriate technical and organizational measures to ensure security appropriate to the risk. This includes protecting against unauthorized or unlawful processing, accidental loss, destruction, or damage through encryption and ensuring the confidentiality, integrity, availability, and resilience of processing systems and services."
      ]},
      { heading: "Data Subject Rights", paragraphs: [
        "Lorann LLC recognizes and facilitates the rights of data subjects under GDPR, which include the right to access, rectification, erasure, restriction of processing, data portability, and objection. Under the CCPA, consumers are given the right to know about personal information collected about them, the right to delete personal information, the right to opt out of the sale of their personal information, and the right to non-discrimination for exercising their CCPA rights."
      ]},
      { heading: "Data Breach Notification", paragraphs: [
        "In compliance with GDPR and CCPA, Lorann LLC has procedures to detect, report, and investigate personal data breaches. GDPR mandates notification of a data breach to the supervisory authority within 72 hours of discovery, while CCPA requires businesses to notify consumers of a breach in a timely manner."
      ]},
      { heading: "Vendor Management and Due Diligence", paragraphs: [
        "Lorann LLC conducts due diligence with third parties and vendors to ensure they comply with GDPR and CCPA. Contracts with processors include clauses that specify the rights and obligations of both parties, including data protection aspects."
      ]},
      { heading: "Our Commitment", paragraphs: [
        "By adhering to these principles and measures, Lorann LLC demonstrates its commitment to protecting personal data and ensuring its practices align with the CCPA and GDPR, reflecting our dedication to privacy, security, and consumer rights. Contact us at privacy@lorannllc.com with any questions."
      ]},
    ]),
  },
  {
    slug: "cookie-policy",
    h1: "Cookie Policy",
    kicker: "Legal",
    titlePlain: "Cookie",
    titleAccent: "Policy",
    heroDescription: "This Cookie Policy explains how Lorann LLC uses cookies and similar tracking technologies on our website, what types of cookies we use, and how you can manage your preferences.",
    metaTitle: "Cookie Policy | Lorann LLC",
    metaDescription: "Learn about the cookies and tracking technologies Lorann LLC uses on our website, including the types of cookies, their purposes, and how to manage your preferences.",
    content: blocks([
      { heading: "What Are Cookies?", paragraphs: [
        "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They help enhance website efficiency and enable website owners to gain insights about how the site is being used."
      ]},
      { heading: "How We Use Cookies", paragraphs: [
        "Lorann LLC employs cookies to optimize your browsing experience by remembering your preferences, monitoring site performance, enhancing security, and enabling social media sharing features. We do not utilize cookies to gather your personal information unless required by law."
      ]},
      { heading: "Strictly Necessary Cookies", paragraphs: [
        "These cookies are essential for the website to function properly. They enable core features such as secure login areas, form submissions, and page navigation. The website cannot function without these cookies, and they cannot be disabled."
      ]},
      { heading: "Analytical and Performance Cookies", paragraphs: [
        "These cookies help us understand how visitors interact with our website by tracking visitor numbers, navigation patterns, and page performance. The information collected is aggregated and anonymous, and is used solely to improve how our website works."
      ]},
      { heading: "Functionality Cookies", paragraphs: [
        "These cookies recognize returning visitors and allow us to personalize content based on your remembered preferences, such as language selection, region, and display settings."
      ]},
      { heading: "Targeting Cookies", paragraphs: [
        "These cookies record the pages you visit and the links you follow. This information is used to customize advertising content to match your interests. They may be set by our advertising partners and used to build a profile of your browsing activity."
      ]},
      { heading: "Managing Cookies", paragraphs: [
        "Most web browsers offer a degree of control over cookies through browser settings. You can set your browser to refuse cookies or delete cookies that have already been set. Please note that disabling cookies may impact website functionality and your overall user experience."
      ]},
      { heading: "Changes to This Policy", paragraphs: [
        "We may periodically update this Cookie Policy in response to legal or business developments. Significant amendments will be communicated on this page. For questions about our cookie usage, contact us at privacy@lorannllc.com."
      ]},
    ]),
  },
  {
    slug: "do-not-sell-my-data",
    h1: "Do Not Sell My Data",
    kicker: "Legal",
    titlePlain: "Do Not Sell",
    titleAccent: "My Data",
    heroDescription: "At Lorann LLC, we are deeply committed to upholding your privacy and safeguarding your personal information. This policy explains your rights and how to exercise them.",
    metaTitle: "Do Not Sell My Data | Lorann LLC",
    metaDescription: "Learn about your right to opt out of the sale of your personal data under CCPA and other privacy laws. Submit your request to Lorann LLC.",
    content: blocks([
      { heading: "What Does 'Selling' Data Mean?", paragraphs: [
        "Under privacy laws including the California Consumer Privacy Act (CCPA), 'selling' data means exchanging personal information for monetary or other valuable considerations with third parties. This definition is designed to give consumers maximum control over how their personal data is shared."
      ]},
      { heading: "Your Rights", paragraphs: [
        "You have the right to know what personal data we collect about you, to request the deletion of your personal data, and to opt out of the sale of your personal data. These rights are guaranteed under applicable privacy laws and we are committed to honoring every valid request."
      ]},
      { heading: "How to Opt Out", paragraphs: [
        "To exercise your right to opt out of the sale of your personal data, please contact us at privacy@lorannllc.com with your full name and the email address associated with your account. You may also submit a request through our website contact form."
      ]},
      { heading: "What Happens After You Opt Out", paragraphs: [
        "Upon receipt of your opt-out request, we will promptly ensure that your personal data is no longer sold to third parties. This process takes up to 45 days as permitted under applicable laws. Please note that opting out does not stop all advertisements — however, they will not be personalized based on your personal information."
      ]},
      { heading: "Non-Discrimination", paragraphs: [
        "Lorann LLC will not discriminate against you for exercising any of your privacy rights. You will not receive different pricing, a different quality of service, or be denied service for submitting an opt-out request."
      ]},
      { heading: "Changes and Contact", paragraphs: [
        "We reserve the right to modify this policy at any time. Changes will be reflected on this page. For questions about how your personal information is handled, contact us at privacy@lorannllc.com."
      ]},
    ]),
  },
  {
    slug: "do-not-call-compliance",
    h1: "Do Not Call Compliance Policy Compliance Policy",
    kicker: "Legal",
    titlePlain: "Do Not Call Compliance Policy",
    titleAccent: "Compliance Policy",
    heroDescription: "Lorann LLC upholds the highest standards of integrity and professionalism, committed to respecting your communication preferences, particularly regarding telephone contact.",
    metaTitle: "Do Not Call Compliance Policy Compliance Policy | Lorann LLC",
    metaDescription: "Learn about Lorann LLC's Do Not Call Compliance Policy Compliance Policy, how to add your number to our DNC list, and our commitment to TCPA and state telemarketing regulations.",
    content: blocks([
      { heading: "Policy Scope", paragraphs: [
        "This policy governs all telemarketing activities conducted by or on behalf of Lorann LLC. It applies to all staff, contractors, and third-party representatives operating under the Lorann LLC banner."
      ]},
      { heading: "Our Do Not Call Compliance Policy List", paragraphs: [
        "Lorann LLC maintains a Do Not Call Compliance Policy (DNC) List to accommodate the requests of individuals who prefer not to receive telemarketing calls. We promptly add the telephone numbers of individuals expressing this preference to our DNC List."
      ]},
      { heading: "How to Request Inclusion", paragraphs: [
        "You may request to be added to our Do Not Call Compliance Policy List by contacting our customer service team via phone or email, communicating your preference during a call with one of our representatives, or submitting a request through our website contact form. Please provide your full name, telephone number, and any other pertinent contact information."
      ]},
      { heading: "Training and Compliance", paragraphs: [
        "All employees and representatives engaged in telemarketing activities receive comprehensive training on our DNC Compliance Policy. We conduct regular audits and monitoring to ensure full compliance across our organization."
      ]},
      { heading: "Exceptions", paragraphs: [
        "Lorann LLC may contact individuals on the DNC List under limited circumstances: when prior written consent has been provided, when an established business relationship exists, or when calls are purely informational and not telemarketing in nature."
      ]},
      { heading: "Regulatory Compliance", paragraphs: [
        "Lorann LLC complies with the Telephone Consumer Protection Act (TCPA) and all applicable state-specific telemarketing regulations. We maintain our internal DNC List in accordance with federal and state requirements."
      ]},
      { heading: "Feedback and Inquiries", paragraphs: [
        "We welcome your feedback and are happy to address any questions regarding this policy. Contact us at privacy@lorannllc.com or call +1 914-565-5300."
      ]},
    ]),
  },
];

// ─── Seed function ─────────────────────────────────────
async function seed() {
  let created = 0;

  for (const page of LEGAL_PAGES) {
    const docId = `page-${page.slug.replace(/\//g, "-")}`;

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
      templateType: "custom",
      kicker: page.kicker,
      titlePlain: page.titlePlain,
      titleAccent: page.titleAccent,
      heroDescription: toPortableText(page.heroDescription),
      content: page.content,
      focusKeyphrase: page.slug,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
    };

    await client.createOrReplace(doc);
    console.log(`  CREATE ${page.slug} (${docId})`);

    await client.createOrReplace({ ...doc, _id: `drafts.${docId}` });
    created++;
  }

  console.log(`\n✅ Done. Created ${created} legal pages.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
