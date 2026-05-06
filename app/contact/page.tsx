import type { Metadata } from "next";
import { groq } from "next-sanity";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm, { type ContactFormCopy } from "./ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";

export const dynamic = "force-dynamic";

type ContactDoc = {
  heroKicker?: string;
  heroTitleStart?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;

  infoTitle?: string;
  infoDescription?: string;
  infoEmailLabel?: string;
  infoEmailValue?: string;
  infoPhoneLabel?: string;
  infoPhoneValue?: string;
  infoPhoneHref?: string;
  infoAddressLabel?: string;
  infoAddressLine1?: string;
  infoAddressLine2?: string;

  responseTitle?: string;
  responseBody?: string;

  formNameLabel?: string;
  formCompanyLabel?: string;
  formEmailLabel?: string;
  formPhoneLabel?: string;
  formInterestLabel?: string;
  formInterestPlaceholder?: string;
  formInterestOptions?: string[];
  formMessageLabel?: string;
  formMessagePlaceholder?: string;
  formSubmitLabel?: string;
  formPrivacyNote?: string;

  successTitle?: string;
  successBody?: string;

  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
};

const DEFAULTS = {
  heroKicker: "Get In Touch",
  heroTitleStart: "Let's build an audience",
  heroTitleHighlight: "that performs.",
  heroDescription:
    "Tell us your goals — we'll develop a data strategy aligned to your targeting, activation, and performance needs. Expect a reply within one business day.",

  infoTitle: "Reach us directly",
  infoDescription:
    "Prefer email or phone? You can also reach the team directly using the contact information below.",
  infoEmailLabel: "Email",
  infoEmailValue: "info@lorannllc.com",
  infoPhoneLabel: "Phone",
  infoPhoneValue: "+1 914-565-5300",
  infoPhoneHref: "tel:+19145655300",
  infoAddressLabel: "Address",
  infoAddressLine1: "75 Lake Rd, Suite 326",
  infoAddressLine2: "Congers, NY 10920-2343",

  responseTitle: "Typical response time",
  responseBody:
    "Within one business day. For urgent requests, call during business hours ET.",

  formNameLabel: "Full Name *",
  formCompanyLabel: "Company *",
  formEmailLabel: "Email *",
  formPhoneLabel: "Phone",
  formInterestLabel: "I'm interested in *",
  formInterestPlaceholder: "Choose one",
  formInterestOptions: [
    "Audience Targeting",
    "Data Enrichment",
    "Signal eXchange™",
    "Lead Generation",
    "Data Activation",
    "Other",
  ],
  formMessageLabel: "Tell us about your goals *",
  formMessagePlaceholder: "Share your audience goals, channels, timelines…",
  formSubmitLabel: "Send Message",
  formPrivacyNote:
    "Your email client will open with a pre-filled message. We respect your privacy — submissions are not stored on our servers.",

  successTitle: "Message ready to send",
  successBody:
    "Your email client has been opened with the message pre-filled. If nothing happened, email us directly at",
};

const query = groq`*[_type == "contactPage" && _id == "contactPage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<ContactDoc | null>({ query, tags: ["contactPage"] });
  return {
    title: doc?.metaTitle || "Contact · Lorann LLC",
    description: doc?.metaDescription || DEFAULTS.heroDescription,
    keywords: doc?.focusKeyphrase ? [doc.focusKeyphrase] : undefined,
    alternates: doc?.canonicalUrl ? { canonical: doc.canonicalUrl } : undefined,
    robots: doc?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

function pick<T>(value: T | undefined, fallback: T): T {
  return value === undefined || value === null || value === "" ? fallback : value;
}

export default async function ContactPage() {
  const doc = await sanityFetch<ContactDoc | null>({ query, tags: ["contactPage"] });

  const c = {
    heroKicker: pick(doc?.heroKicker, DEFAULTS.heroKicker),
    heroTitleStart: pick(doc?.heroTitleStart, DEFAULTS.heroTitleStart),
    heroTitleHighlight: pick(doc?.heroTitleHighlight, DEFAULTS.heroTitleHighlight),
    heroDescription: pick(doc?.heroDescription, DEFAULTS.heroDescription),

    infoTitle: pick(doc?.infoTitle, DEFAULTS.infoTitle),
    infoDescription: pick(doc?.infoDescription, DEFAULTS.infoDescription),
    infoEmailLabel: pick(doc?.infoEmailLabel, DEFAULTS.infoEmailLabel),
    infoEmailValue: pick(doc?.infoEmailValue, DEFAULTS.infoEmailValue),
    infoPhoneLabel: pick(doc?.infoPhoneLabel, DEFAULTS.infoPhoneLabel),
    infoPhoneValue: pick(doc?.infoPhoneValue, DEFAULTS.infoPhoneValue),
    infoPhoneHref: pick(doc?.infoPhoneHref, DEFAULTS.infoPhoneHref),
    infoAddressLabel: pick(doc?.infoAddressLabel, DEFAULTS.infoAddressLabel),
    infoAddressLine1: pick(doc?.infoAddressLine1, DEFAULTS.infoAddressLine1),
    infoAddressLine2: pick(doc?.infoAddressLine2, DEFAULTS.infoAddressLine2),

    responseTitle: pick(doc?.responseTitle, DEFAULTS.responseTitle),
    responseBody: pick(doc?.responseBody, DEFAULTS.responseBody),
  };

  const formCopy: ContactFormCopy = {
    formNameLabel: pick(doc?.formNameLabel, DEFAULTS.formNameLabel),
    formCompanyLabel: pick(doc?.formCompanyLabel, DEFAULTS.formCompanyLabel),
    formEmailLabel: pick(doc?.formEmailLabel, DEFAULTS.formEmailLabel),
    formPhoneLabel: pick(doc?.formPhoneLabel, DEFAULTS.formPhoneLabel),
    formInterestLabel: pick(doc?.formInterestLabel, DEFAULTS.formInterestLabel),
    formInterestPlaceholder: pick(
      doc?.formInterestPlaceholder,
      DEFAULTS.formInterestPlaceholder
    ),
    formInterestOptions:
      doc?.formInterestOptions && doc.formInterestOptions.length > 0
        ? doc.formInterestOptions
        : DEFAULTS.formInterestOptions,
    formMessageLabel: pick(doc?.formMessageLabel, DEFAULTS.formMessageLabel),
    formMessagePlaceholder: pick(
      doc?.formMessagePlaceholder,
      DEFAULTS.formMessagePlaceholder
    ),
    formSubmitLabel: pick(doc?.formSubmitLabel, DEFAULTS.formSubmitLabel),
    formPrivacyNote: pick(doc?.formPrivacyNote, DEFAULTS.formPrivacyNote),
    successTitle: pick(doc?.successTitle, DEFAULTS.successTitle),
    successBody: pick(doc?.successBody, DEFAULTS.successBody),
    emailFallback: c.infoEmailValue,
  };

  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker={c.heroKicker}
        title={
          <>
            {c.heroTitleStart}{" "}
            <span className="text-gradient">{c.heroTitleHighlight}</span>
          </>
        }
        description={c.heroDescription}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
            {/* Contact info */}
            <div className="reveal">
              <h2 className="font-display font-bold text-3xl lg:text-4xl leading-tight tracking-tight text-slate-900 mb-5">
                {c.infoTitle}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {c.infoDescription}
              </p>
              <div className="space-y-5">
                <a
                  href={`mailto:${c.infoEmailValue}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 grid place-items-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                      {c.infoEmailLabel}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {c.infoEmailValue}
                    </div>
                  </div>
                </a>
                <a
                  href={c.infoPhoneHref}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 grid place-items-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                      {c.infoPhoneLabel}
                    </div>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {c.infoPhoneValue}
                    </div>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 grid place-items-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                      {c.infoAddressLabel}
                    </div>
                    <div className="font-semibold text-slate-900">
                      {c.infoAddressLine1}
                      <br />
                      {c.infoAddressLine2}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-10 p-6 rounded-2xl border border-slate-150"
                style={{
                  background:
                    "linear-gradient(135deg, #E4EDFF 0%, #F0F5FF 100%)",
                }}
              >
                <h3 className="font-display font-semibold text-slate-900 mb-2">
                  {c.responseTitle}
                </h3>
                <p className="text-slate-600 text-sm">{c.responseBody}</p>
              </div>
            </div>

            {/* Form */}
            <div className="reveal">
              <ContactForm copy={formCopy} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
