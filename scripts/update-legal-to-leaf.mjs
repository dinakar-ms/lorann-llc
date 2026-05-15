/**
 * Convert 6 legal pages from "custom" (plain text) to "leaf" template
 * with structured sections: stats, intro, attributes, useCases, compliance.
 *
 * Run:  node scripts/update-legal-to-leaf.mjs
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
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: str, marks: [] }],
    },
  ];
}

function richText(str) {
  return toPortableText(str);
}

// ─── Legal Pages as Leaf Templates ──────────────────────

const LEGAL_PAGES = [
  {
    slug: "privacy-policy",
    h1: "Privacy Policy",
    kicker: "Legal",
    titlePlain: "Privacy",
    titleAccent: "Policy",
    heroDescription: richText(
      "Lorann LLC is committed to protecting the privacy of our website visitors and clients. This Privacy Policy outlines how we collect, use, and safeguard your information."
    ),
    metaTitle: "Privacy Policy | Lorann LLC",
    metaDescription:
      "Learn how Lorann LLC collects, uses, and protects your personal information. Our privacy policy covers data collection, cookies, security, and your rights.",
    stats: [
      { _key: key(), label: "Data Regulations Covered", value: "CCPA + GDPR" },
      { _key: key(), label: "Data Breach Response", value: "72 hrs" },
      { _key: key(), label: "Request Resolution", value: "30 Days" },
      { _key: key(), label: "Minimum Age Requirement", value: "13+" },
    ],
    introKicker: "Our Commitment",
    introHeadlinePlain: "Transparency is the foundation of",
    introHeadlineAccent: "responsible data practices.",
    introParagraphs: [
      "By using our website, you are giving your consent to our Privacy Policy and agreeing to its terms. We believe data protection starts with honest, clear communication about what we collect and why.",
      "Lorann LLC will not share, sell, rent, or disclose your personal information without your prior permission. Our commitment to your privacy extends across every product, service, and interaction.",
    ],
    attributes: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "UserCheck",
        title: "Information We Collect",
        desc: richText(
          "We collect personal information such as your name, email address, phone number, and company details when you interact with our services. We also collect non-personal data including IP addresses, browser types, and page access patterns."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Settings",
        title: "How We Use Your Information",
        desc: richText(
          "Your data is used to operate and improve our website, personalize your experience, develop new products, communicate updates, provide customer service, and prevent fraud."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "FileText",
        title: "Log Files & Technical Data",
        desc: richText(
          "We use log files to track visitor activity using standard industry practices. This includes capturing IP addresses and browser information for trend analysis. This data is not linked to personally identifiable individuals."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Cookie",
        title: "Cookies & Tracking",
        desc: richText(
          "Our site uses cookies to enhance user experience by remembering preferences and monitoring performance. Third-party advertising partners may place their own cookies and pixels. You can control cookie settings through your browser."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Lock",
        title: "Data Security",
        desc: richText(
          "We employ firewalls and industry-standard security measures to protect your data from loss, misuse, or unauthorized modification. We strive to use commercially acceptable means to protect your information."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Baby",
        title: "Children's Privacy",
        desc: richText(
          "Lorann LLC does not intentionally collect information from users under the age of 13. We encourage parents and guardians to monitor their children's internet usage and online activity."
        ),
      },
    ],
    useCases: [
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Your Rights Under CCPA",
        desc: richText(
          "If you are a California resident, you have the right to request disclosure of the personal information we collect about you, request deletion of your personal information, and opt out of the sale of your personal information."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Your Rights Under GDPR",
        desc: richText(
          "If you are located in the European Economic Area, you have rights including access, rectification, erasure, restriction of processing, data portability, and the right to object."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Changes to This Policy",
        desc: richText(
          "We may update this Privacy Policy from time to time. Changes will be posted on this page. If you have questions, contact us at privacy@lorannllc.com."
        ),
      },
    ],
    complianceHeadline: "Your privacy is not optional — it's foundational.",
    complianceBody: richText(
      "Every data point we handle is governed by clear policies, verified processes, and full regulatory alignment with CCPA and GDPR. Contact privacy@lorannllc.com with questions."
    ),
    backLink: { _type: "cta", label: "← Back to Home", href: "/" },
  },

  {
    slug: "data-security-policy",
    h1: "Data Security Policy",
    kicker: "Legal",
    titlePlain: "Data Security",
    titleAccent: "Policy",
    heroDescription: richText(
      "At Lorann LLC, our commitment to safeguarding the data and information of our clients, employees, and partners is unwavering. This policy outlines our approach to managing data security risks."
    ),
    metaTitle: "Data Security Policy | Lorann LLC",
    metaDescription:
      "Learn about Lorann LLC's data security measures including access control, encryption, network security, and compliance standards that protect your information.",
    stats: [
      { _key: key(), label: "Classification Levels", value: "3 Tiers" },
      { _key: key(), label: "Encryption Standard", value: "AES-256" },
      { _key: key(), label: "Vulnerability Scans", value: "Continuous" },
      { _key: key(), label: "Policy Review Cycle", value: "Annual" },
    ],
    introKicker: "Security First",
    introHeadlinePlain: "Protecting data with",
    introHeadlineAccent: "defense-in-depth architecture.",
    introParagraphs: [
      "This policy is applicable to all individuals, including employees, contractors, and third parties, who access Lorann LLC's data and information systems.",
      "Data within Lorann LLC is categorized into three levels: Confidential information that could cause harm if disclosed; Internal Use Only information not intended for public dissemination; and Public information authorized for public release.",
    ],
    attributes: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "ShieldCheck",
        title: "Access Control",
        desc: richText(
          "Data access is granted based on the principle of least privilege. Employees are provided access only to the data and systems necessary for their job functions, and access permissions are reviewed regularly."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Lock",
        title: "Encryption",
        desc: richText(
          "Industry-standard encryption methods are employed to encrypt data in transit and at rest. This ensures that even if data is intercepted, it cannot be read without the proper decryption keys."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Building2",
        title: "Physical Security",
        desc: richText(
          "Access to premises housing data infrastructure is controlled and monitored. Physical records containing sensitive information are disposed of using secure destruction methods."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Wifi",
        title: "Network Security",
        desc: richText(
          "Our network is safeguarded through firewalls, intrusion detection and prevention systems, and continuous monitoring. Regular vulnerability assessments and penetration testing are conducted."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "GraduationCap",
        title: "Employee Training",
        desc: richText(
          "All staff receive regular training to familiarize them with data protection responsibilities, recognize potential security threats, and follow proper data handling procedures."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Users",
        title: "Roles & Responsibilities",
        desc: richText(
          "All employees are accountable for adhering to this policy and protecting the data they handle. The IT Department is tasked with ensuring the operational security of all IT systems."
        ),
      },
    ],
    useCases: [
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Data Retention & Disposal",
        desc: richText(
          "Data is retained only as long as necessary for business purposes or as required by law. When data is no longer needed, it is securely deleted using methods that prevent recovery."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Incident Response",
        desc: richText(
          "Lorann LLC has documented incident response procedures to detect, report, and investigate personal data breaches. Notification procedures follow GDPR and CCPA requirements."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Compliance & Review",
        desc: richText(
          "This policy undergoes annual review and is updated in response to significant business or regulatory changes. Non-compliance may result in disciplinary action."
        ),
      },
    ],
    complianceHeadline: "Security isn't a feature — it's the foundation.",
    complianceBody: richText(
      "Every system, process, and team member at Lorann LLC operates under strict data security protocols aligned with industry best practices and regulatory requirements. Contact privacy@lorannllc.com with questions."
    ),
    backLink: { _type: "cta", label: "← Back to Home", href: "/" },
  },

  {
    slug: "ccpa-privacy-policy",
    h1: "CCPA & GDPR Compliance Policy",
    kicker: "Legal",
    titlePlain: "CCPA & GDPR",
    titleAccent: "Compliance Policy",
    heroDescription: richText(
      "Lorann LLC upholds data compliance with both the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR) through stringent measures and protocols."
    ),
    metaTitle: "CCPA & GDPR Compliance Policy | Lorann LLC",
    metaDescription:
      "Learn how Lorann LLC complies with CCPA and GDPR regulations through data collection consent, purpose limitation, security measures, and data subject rights.",
    stats: [
      { _key: key(), label: "Regulations Covered", value: "CCPA + GDPR" },
      { _key: key(), label: "Breach Notification", value: "72 hrs" },
      { _key: key(), label: "Consent Model", value: "Explicit" },
      { _key: key(), label: "Vendor Compliance", value: "100%" },
    ],
    introKicker: "Dual Compliance",
    introHeadlinePlain: "Built for both",
    introHeadlineAccent: "CCPA and GDPR from day one.",
    introParagraphs: [
      "Lorann LLC strictly adheres to the principle of obtaining explicit and unambiguous consent from individuals before collecting their data. This involves ensuring that consent is freely given, specific, and informed.",
      "We ensure that personal data is collected for specific, explicit, and legitimate purposes and is further processed in a manner compatible with those purposes, aligning with the purpose limitation principles of both GDPR and CCPA.",
    ],
    attributes: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "FileCheck",
        title: "Data Collection & Consent",
        desc: richText(
          "We inform individuals about the categories of personal information and the purposes for which it will be used at or before the point of collection, meeting both GDPR and CCPA requirements."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Target",
        title: "Purpose Limitation",
        desc: richText(
          "Lorann LLC limits data processing to the purposes for which the data was collected, ensuring all processing is compatible with the original stated purposes."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Minimize2",
        title: "Data Minimization",
        desc: richText(
          "Only the necessary personal information for specified purposes is collected and processed. This aligns with GDPR's data minimization principle and CCPA's mandate for relevant and limited data."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Lock",
        title: "Security Measures",
        desc: richText(
          "We implement appropriate technical and organizational measures to ensure security, including protection against unauthorized processing, accidental loss, and maintaining confidentiality and integrity."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "UserCheck",
        title: "Data Subject Rights",
        desc: richText(
          "We facilitate GDPR rights (access, rectification, erasure, portability, objection) and CCPA rights (right to know, delete, opt out of sale, and non-discrimination)."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "AlertTriangle",
        title: "Breach Notification",
        desc: richText(
          "We have procedures to detect, report, and investigate breaches. GDPR mandates supervisory authority notification within 72 hours; CCPA requires timely consumer notification."
        ),
      },
    ],
    useCases: [
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Vendor Management",
        desc: richText(
          "Lorann LLC conducts due diligence with third parties and vendors to ensure GDPR and CCPA compliance. Contracts include clauses specifying rights, obligations, and data protection aspects."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Cross-Border Transfers",
        desc: richText(
          "Data transfers outside the EEA follow GDPR's adequacy requirements and approved transfer mechanisms, ensuring equivalent protection regardless of geography."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Our Commitment",
        desc: richText(
          "By adhering to these principles, Lorann LLC demonstrates its commitment to protecting personal data and ensuring practices align with CCPA and GDPR regulations."
        ),
      },
    ],
    complianceHeadline: "Dual-regulation compliance, zero shortcuts.",
    complianceBody: richText(
      "Every data practice at Lorann LLC is built to satisfy both CCPA and GDPR simultaneously — from consent collection through data deletion. Contact privacy@lorannllc.com with questions."
    ),
    backLink: { _type: "cta", label: "← Back to Home", href: "/" },
  },

  {
    slug: "cookie-policy",
    h1: "Cookie Policy",
    kicker: "Legal",
    titlePlain: "Cookie",
    titleAccent: "Policy",
    heroDescription: richText(
      "This Cookie Policy explains how Lorann LLC uses cookies and similar tracking technologies on our website, what types of cookies we use, and how you can manage your preferences."
    ),
    metaTitle: "Cookie Policy | Lorann LLC",
    metaDescription:
      "Learn about the cookies and tracking technologies Lorann LLC uses on our website, including the types of cookies, their purposes, and how to manage your preferences.",
    stats: [
      { _key: key(), label: "Cookie Categories", value: "4 Types" },
      { _key: key(), label: "User Control", value: "Full" },
      { _key: key(), label: "PII via Cookies", value: "None" },
      { _key: key(), label: "Third-Party Pixels", value: "Disclosed" },
    ],
    introKicker: "Transparency",
    introHeadlinePlain: "Clear choices about",
    introHeadlineAccent: "what gets tracked and why.",
    introParagraphs: [
      "Cookies are small text files placed on your computer or mobile device when you visit a website. They help enhance website efficiency and enable website owners to gain insights about site usage.",
      "Lorann LLC employs cookies to optimize your browsing experience by remembering your preferences, monitoring site performance, enhancing security, and enabling social media sharing features. We do not utilize cookies to gather personal information unless required by law.",
    ],
    attributes: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "ShieldCheck",
        title: "Strictly Necessary Cookies",
        desc: richText(
          "Essential cookies that enable core features such as secure login areas, form submissions, and page navigation. The website cannot function without these, and they cannot be disabled."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "BarChart3",
        title: "Analytical & Performance",
        desc: richText(
          "These cookies help us understand how visitors interact by tracking visitor numbers, navigation patterns, and page performance. Information is aggregated and anonymous."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Settings",
        title: "Functionality Cookies",
        desc: richText(
          "These cookies recognize returning visitors and allow us to personalize content based on remembered preferences, such as language selection, region, and display settings."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Target",
        title: "Targeting Cookies",
        desc: richText(
          "These record pages you visit and links you follow. The information is used to customize advertising content to match your interests and may be set by our advertising partners."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "SlidersHorizontal",
        title: "Managing Cookies",
        desc: richText(
          "Most web browsers offer control over cookies through browser settings. You can refuse or delete cookies. Please note that disabling cookies may impact website functionality."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "RefreshCw",
        title: "Policy Updates",
        desc: richText(
          "We may periodically update this Cookie Policy in response to legal or business developments. Significant amendments will be communicated on this page."
        ),
      },
    ],
    useCases: [
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Session Management",
        desc: richText(
          "Essential cookies maintain your session state as you navigate between pages, ensuring forms stay filled and preferences remain consistent throughout your visit."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Performance Optimization",
        desc: richText(
          "Analytics cookies help our team identify slow-loading pages, popular content, and user journeys — enabling us to continuously improve website speed and experience."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Personalized Experience",
        desc: richText(
          "Functionality cookies remember your preferences across visits so you don't have to re-enter them each time, delivering a smoother, more tailored browsing experience."
        ),
      },
    ],
    complianceHeadline: "Full disclosure. Full control. No surprises.",
    complianceBody: richText(
      "Lorann LLC gives you complete visibility into our cookie usage and full control over your preferences. For questions about our cookie usage, contact us at privacy@lorannllc.com."
    ),
    backLink: { _type: "cta", label: "← Back to Home", href: "/" },
  },

  {
    slug: "do-not-sell-my-data",
    h1: "Do Not Sell My Data",
    kicker: "Legal",
    titlePlain: "Do Not Sell",
    titleAccent: "My Data",
    heroDescription: richText(
      "At Lorann LLC, we are deeply committed to upholding your privacy and safeguarding your personal information. This policy explains your rights and how to exercise them."
    ),
    metaTitle: "Do Not Sell My Data | Lorann LLC",
    metaDescription:
      "Learn about your right to opt out of the sale of your personal data under CCPA and other privacy laws. Submit your request to Lorann LLC.",
    stats: [
      { _key: key(), label: "Processing Time", value: "≤ 45 Days" },
      { _key: key(), label: "Discrimination", value: "Zero" },
      { _key: key(), label: "Submission Channels", value: "Email + Web" },
      { _key: key(), label: "Coverage", value: "CCPA + State" },
    ],
    introKicker: "Your Rights",
    introHeadlinePlain: "You control how",
    introHeadlineAccent: "your data is shared.",
    introParagraphs: [
      "Under privacy laws including the California Consumer Privacy Act (CCPA), 'selling' data means exchanging personal information for monetary or other valuable considerations with third parties. This definition is designed to give consumers maximum control over their data.",
      "You have the right to know what personal data we collect about you, to request the deletion of your personal data, and to opt out of the sale of your personal data. These rights are guaranteed under applicable privacy laws.",
    ],
    attributes: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "Ban",
        title: "What 'Selling' Data Means",
        desc: richText(
          "Under CCPA, 'selling' means exchanging personal information for monetary or valuable consideration with third parties. This broad definition gives consumers maximum control."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "UserCheck",
        title: "Your Opt-Out Rights",
        desc: richText(
          "You can request to know, delete, and opt out of the sale of your personal data. These rights are guaranteed under applicable privacy laws and we honor every valid request."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Mail",
        title: "How to Opt Out",
        desc: richText(
          "Contact us at privacy@lorannllc.com with your full name and email address associated with your account. You may also submit a request through our website contact form."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Clock",
        title: "After You Opt Out",
        desc: richText(
          "Upon receipt of your request, we promptly ensure your personal data is no longer sold to third parties. This process takes up to 45 days as permitted under applicable laws."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Scale",
        title: "Non-Discrimination",
        desc: richText(
          "Lorann LLC will not discriminate against you for exercising your privacy rights. You will not receive different pricing, quality of service, or be denied service for opting out."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Bell",
        title: "Policy Updates",
        desc: richText(
          "We reserve the right to modify this policy at any time. Changes will be reflected on this page. Contact privacy@lorannllc.com for questions about how your information is handled."
        ),
      },
    ],
    useCases: [
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Email Opt-Out Request",
        desc: richText(
          "Send a simple email to privacy@lorannllc.com with your full name and associated email address. Our team will confirm receipt and process your request within 45 days."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Web Form Submission",
        desc: richText(
          "Use our website contact form to submit your Do Not Sell request. Include your full name and contact information so we can verify and process your request."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Ongoing Advertisements",
        desc: richText(
          "Please note that opting out does not stop all advertisements. However, they will not be personalized based on your personal information after your opt-out is processed."
        ),
      },
    ],
    complianceHeadline: "Your data, your decision — always.",
    complianceBody: richText(
      "Lorann LLC makes the opt-out process simple and transparent. We honor every valid request without discrimination or service degradation. Contact privacy@lorannllc.com."
    ),
    backLink: { _type: "cta", label: "← Back to Home", href: "/" },
  },

  {
    slug: "do-not-call-compliance",
    h1: "Do Not Call Compliance Policy Compliance Policy",
    kicker: "Legal",
    titlePlain: "Do Not Call Compliance Policy",
    titleAccent: "Compliance Policy",
    heroDescription: richText(
      "Lorann LLC upholds the highest standards of integrity and professionalism, committed to respecting your communication preferences, particularly regarding telephone contact."
    ),
    metaTitle: "Do Not Call Compliance Policy Compliance Policy | Lorann LLC",
    metaDescription:
      "Learn about Lorann LLC's Do Not Call Compliance Policy Compliance Policy, how to add your number to our DNC list, and our commitment to TCPA and state telemarketing regulations.",
    stats: [
      { _key: key(), label: "Regulatory Framework", value: "TCPA" },
      { _key: key(), label: "DNC List", value: "Maintained" },
      { _key: key(), label: "Staff Training", value: "Ongoing" },
      { _key: key(), label: "Compliance Audits", value: "Regular" },
    ],
    introKicker: "Respectful Outreach",
    introHeadlinePlain: "We respect your",
    introHeadlineAccent: "communication preferences.",
    introParagraphs: [
      "This policy governs all telemarketing activities conducted by or on behalf of Lorann LLC. It applies to all staff, contractors, and third-party representatives operating under the Lorann LLC banner.",
      "Lorann LLC maintains a Do Not Call Compliance Policy (DNC) List to accommodate the requests of individuals who prefer not to receive telemarketing calls. We promptly add telephone numbers of individuals expressing this preference.",
    ],
    attributes: [
      {
        _key: key(),
        _type: "featureItem",
        icon: "PhoneOff",
        title: "Our DNC List",
        desc: richText(
          "Lorann LLC maintains a comprehensive Do Not Call Compliance Policy List. We promptly add the telephone numbers of individuals who express a preference not to receive telemarketing calls."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "ClipboardCheck",
        title: "How to Request Inclusion",
        desc: richText(
          "Contact our customer service team via phone or email, communicate your preference during a call with a representative, or submit a request through our website contact form."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "GraduationCap",
        title: "Training & Compliance",
        desc: richText(
          "All employees and representatives engaged in telemarketing receive comprehensive training on our DNC Compliance Policy. We conduct regular audits and monitoring."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "AlertCircle",
        title: "Exceptions",
        desc: richText(
          "We may contact individuals on the DNC List when prior written consent has been provided, when an established business relationship exists, or when calls are purely informational."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "Scale",
        title: "Regulatory Compliance",
        desc: richText(
          "Lorann LLC complies with the Telephone Consumer Protection Act (TCPA) and all applicable state-specific telemarketing regulations. Our internal DNC List follows federal and state requirements."
        ),
      },
      {
        _key: key(),
        _type: "featureItem",
        icon: "MessageSquare",
        title: "Feedback & Inquiries",
        desc: richText(
          "We welcome feedback and are happy to address questions regarding this policy. Contact us at privacy@lorannllc.com or call +1 914-565-5300."
        ),
      },
    ],
    useCases: [
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Phone Opt-Out",
        desc: richText(
          "Simply tell our representative during any call that you'd like to be added to our Do Not Call Compliance Policy List. Your number will be added promptly."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Email Request",
        desc: richText(
          "Email privacy@lorannllc.com with your full name, telephone number, and contact details. Our team will add you to the DNC List and confirm via email."
        ),
      },
      {
        _key: key(),
        _type: "useCaseItem",
        title: "Web Form Submission",
        desc: richText(
          "Use the contact form on our website to submit your Do Not Call Compliance Policy request. Include your telephone number and any pertinent contact information for processing."
        ),
      },
    ],
    complianceHeadline: "Respect starts with listening — not calling.",
    complianceBody: richText(
      "Lorann LLC's Do Not Call Compliance Policy compliance is enforced through training, regular audits, and strict adherence to the TCPA and all applicable state telemarketing regulations. Contact privacy@lorannllc.com."
    ),
    backLink: { _type: "cta", label: "← Back to Home", href: "/" },
  },
];

// ─── Update function ─────────────────────────────────────
async function update() {
  let updated = 0;

  for (const page of LEGAL_PAGES) {
    const doc = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0]{ _id }`,
      { slug: page.slug }
    );

    if (!doc) {
      console.log(`  SKIP ${page.slug} — not found`);
      continue;
    }

    const patch = {
      templateType: "leaf",
      kicker: page.kicker,
      titlePlain: page.titlePlain,
      titleAccent: page.titleAccent,
      heroDescription: page.heroDescription,
      metaTitle: page.metaTitle,
      metaDescription: page.metaDescription,
      stats: page.stats,
      introKicker: page.introKicker,
      introHeadlinePlain: page.introHeadlinePlain,
      introHeadlineAccent: page.introHeadlineAccent,
      introParagraphs: page.introParagraphs,
      attributes: page.attributes,
      useCases: page.useCases,
      complianceHeadline: page.complianceHeadline,
      complianceBody: page.complianceBody,
      backLink: page.backLink,
    };

    // Clear old content field
    await client
      .patch(doc._id)
      .set(patch)
      .unset(["content"])
      .commit();
    console.log(`  UPDATED ${page.slug} (${doc._id}) → leaf template`);

    // Patch draft too
    const draftId = `drafts.${doc._id}`;
    try {
      await client
        .patch(draftId)
        .set(patch)
        .unset(["content"])
        .commit();
      console.log(`  UPDATED ${draftId}`);
    } catch {
      console.log(`  No draft for ${doc._id}`);
    }

    updated++;
  }

  console.log(`\n✅ Done. Updated ${updated} pages to leaf template.`);
}

update().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
