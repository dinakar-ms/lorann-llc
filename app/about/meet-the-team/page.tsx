// import SubPageHero from "@/components/ui/SubPageHero";
// import SectionHeader from "@/components/ui/SectionHeader";
// import FinalCTA from "@/components/sections/FinalCTA";
// import ScrollReveal from "@/components/ScrollReveal";
// import { Linkedin, Mail } from "lucide-react";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Meet the Team · Lorann LLC",
//   description:
//     "Decades of experience across data, marketing, and audience strategy — combining deep industry knowledge with real campaign performance.",
// };

// const TEAM = [
//   {
//     name: "[Founder / CEO Name]",
//     title: "Founder & Chief Executive Officer",
//     bio: "Decades of leadership across data, marketing, and audience strategy. Sets Lorann's direction on what performance-driven data should look like.",
//     initials: "F",
//   },
//   {
//     name: "[Head of Data]",
//     title: "Head of Data & Development",
//     bio: "Leads the data development function — from sourcing and validation through to the proprietary Signal eXchange™ build.",
//     initials: "H",
//   },
//   {
//     name: "[VP Client Strategy]",
//     title: "VP, Client Strategy",
//     bio: "Partners directly with enterprise clients on audience briefs, activation planning, and campaign outcomes.",
//     initials: "V",
//   },
//   {
//     name: "[Director of Activation]",
//     title: "Director, Activation",
//     bio: "Runs the activation and integration function — the bridge between our data and your platforms.",
//     initials: "D",
//   },
//   {
//     name: "[Senior Data Scientist]",
//     title: "Senior Data Scientist",
//     bio: "Owns modeling, intent scoring, and lookalike development across the Lorann platform.",
//     initials: "S",
//   },
//   {
//     name: "[Healthcare Practice Lead]",
//     title: "Healthcare Practice Lead",
//     bio: "Specialist in healthcare data, compliance posture, and provider-to-patient audience architectures.",
//     initials: "H",
//   },
// ];

// export default function MeetTheTeamPage() {
//   return (
//     <>
//       <ScrollReveal />
//       <SubPageHero
//         crumbs={[
//           { label: "Home", href: "/" },
//           { label: "About", href: "/about" },
//           { label: "Meet the Team" },
//         ]}
//         kicker="About"
//         title={
//           <>
//             Decades of experience across{" "}
//             <span className="text-gradient">data, marketing, and audience strategy.</span>
//           </>
//         }
//         description="Our team combines deep industry knowledge with a practical understanding of how data drives real campaign performance."
//       />

//       <section className="py-20 lg:py-28 bg-white">
//         <div className="container-custom">
//           <SectionHeader
//             kicker="Leadership"
//             title={
//               <>
//                 The people behind{" "}
//                 <span className="text-gradient">your audience strategy.</span>
//               </>
//             }
//             description="Practical experts — not résumé-heavy, just people who build audiences that perform."
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {TEAM.map((m) => (
//               <article
//                 key={m.name}
//                 className="reveal bg-white border border-slate-150 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 flex flex-col"
//               >
//                 <div
//                   className="aspect-[4/3] relative grid place-items-center overflow-hidden"
//                   style={{
//                     background:
//                       "radial-gradient(ellipse 70% 55% at 30% 30%, rgba(79, 125, 245, 0.4), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.35), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
//                   }}
//                 >
//                   <span className="font-display font-bold text-6xl lg:text-7xl text-white/90 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
//                     {m.initials}
//                   </span>
//                   <div
//                     className="absolute inset-0 pointer-events-none"
//                     style={{
//                       backgroundImage:
//                         "radial-gradient(circle, rgba(111, 211, 255, 0.12) 1px, transparent 1px)",
//                       backgroundSize: "18px 18px",
//                     }}
//                   />
//                 </div>
//                 <div className="p-6 flex flex-col flex-1">
//                   <h3 className="font-display font-bold text-lg text-slate-900 tracking-[-0.02em] mb-1">
//                     {m.name}
//                   </h3>
//                   <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-700 mb-3.5">
//                     {m.title}
//                   </div>
//                   <p className="text-[14px] text-slate-600 leading-relaxed flex-1">{m.bio}</p>
//                   <div className="flex gap-2 mt-5 pt-5 border-t border-slate-150">
//                     <a
//                       href="#"
//                       aria-label={`${m.name} on LinkedIn`}
//                       className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all"
//                     >
//                       <Linkedin className="w-4 h-4" />
//                     </a>
//                     <a
//                       href="mailto:info@lorannllc.com"
//                       aria-label={`Email ${m.name}`}
//                       className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all"
//                     >
//                       <Mail className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <FinalCTA />
//     </>
//   );
// }

// 

import Image from "next/image";
import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team · Lorann LLC",
  description:
    "Decades of experience across data, marketing, and audience strategy — combining deep industry knowledge with real campaign performance.",
};

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  initials: string;
  photo?: string;   // Optional. Path inside /public, e.g. "/team/michael-connolly.jpg". If empty, the initials block renders instead.
  linkedin: string; // Individual LinkedIn profile URL
  email: string;    // Individual email address
};

// ─────────────────────────────────────────────────────────────────────────────
// 📸 PHOTOS
// Drop each person's headshot into:  /public/team/<filename>.jpg
// Recommended: square or 4:3 ratio, ~600x600 minimum, optimized JPG/WebP.
// If a `photo` is left empty (""), the card falls back to the initials block.
//
// 🔗 LINKEDIN + EMAIL
// Replace the placeholder LinkedIn URLs and emails below with each person's real ones.
// ─────────────────────────────────────────────────────────────────────────────

const TEAM: TeamMember[] = [
  {
    name: "Michael Connolly",
    title: "Chief Executive Officer",
    bio: "Michael Connolly is the CEO of Lorann, LLC, with a career spanning data sales, audience development, and performance-driven marketing. He has held leadership roles at Compilers Plus, Venture Direct NYC, and Lake Group, where he helped scale data solutions across B2B and consumer markets over more than two decades. At Lorann, Michael focuses on delivering high-quality, results-oriented data solutions and building long-term client partnerships.",
    initials: "MC",
    // photo: "/team/michael-connolly.jpg",
    linkedin: "https://www.linkedin.com/in/mike-connolly-3126893/",
    email: "michael@lorannllc.com",
  },
  {
    name: "Paul Gerardi",
    title: "VP, Data Platforms & Product Development",
    bio: "Paul Gerardi is a data and marketing strategy leader with experience across audience development, analytics, and performance-driven campaigns. He specializes in building and optimizing data systems that support targeting, activation, and measurable results across digital and traditional channels. His work spans B2B, financial services, and healthcare, with a focus on aligning data with real-world marketing outcomes.",
    initials: "PG",
    // photo: "/team/paul-gerardi.jpg",
    linkedin: "https://www.linkedin.com/in/paulgerardi/",
    email: "paul@lorannllc.com",
  },
  {
    name: "Fred Onemma",
    title: "Chief Marketing Officer",
    bio: "Fred Onemma is an acquisition intelligence leader focused on building data-driven systems that power scalable customer growth. He specializes in predictive modeling, audience development, and marketing infrastructure, helping organizations move beyond traditional targeting to precision-based acquisition. His work spans catalog, insurance, financial services, and direct response, with a focus on measurable performance and long-term value creation.",
    initials: "FO",
    // photo: "/team/fred-onemma.jpg",
    linkedin: "https://www.linkedin.com/in/fred-onemma/",
    email: "fred@lorannllc.com",
  },
  {
    name: "Joanne Iadarola",
    title: "VP of Sales",
    bio: "Joanne is a seasoned expert in data sales and marketing, committed to enhancing client prospecting, acquisition, and retention efforts. She has a remarkable ability to identify target audiences and craft data-driven strategies that enable organizations to attract, engage, and retain customers. Her expertise spans both B2B and B2C sectors across Insurance, IT, Finance, Healthcare, Senior Markets, and Direct-to-Consumer.",
    initials: "JI",
    // photo: "/team/joanne-iadarola.jpg",
    linkedin: "https://www.linkedin.com/in/joanne-iadarola/",
    email: "joanne@lorannllc.com",
  },
  {
    name: "Bill Woods",
    title: "VP, Partnerships",
    bio: "Bill Woods is a seasoned expert in sales, business development, and strategic partnerships. He has helped organizations across industries — from healthcare and finance to education and manufacturing — achieve meaningful results through smart, data-driven marketing. Bill enjoys collaborating with both experienced professionals and forward-thinking companies looking to grow and innovate in a changing landscape.",
    initials: "BW",
    // photo: "/team/bill-woods.jpg",
    linkedin: "https://www.linkedin.com/in/bill-woods/",
    email: "bill@lorannllc.com",
  },
  {
    name: "Caryn Trazi",
    title: "Senior Account Executive",
    bio: "Caryn Trazi is a trusted data professional specializing in the selection and fulfillment of targeted marketing lists. With extensive experience in medical and B2B markets, she helps mailers execute precise, data-driven marketing strategies. She also collaborates with list brokers, resellers, and advertising agencies — helping them grow their clients' businesses through informed list recommendations backed by industry expertise.",
    initials: "CT",
    // photo: "/team/caryn-trazi.jpg",
    linkedin: "https://www.linkedin.com/in/caryn-trazi/",
    email: "caryn@lorannllc.com",
  },
];

export default function MeetTheTeamPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Meet the Team" },
        ]}
        kicker="About"
        title={
          <>
            Decades of experience across{" "}
            <span className="text-gradient">data, marketing, and audience strategy.</span>
          </>
        }
        description="Our team combines deep industry knowledge with a practical understanding of how data drives real campaign performance."
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Leadership"
            title={
              <>
                The people behind{" "}
                <span className="text-gradient">your audience strategy.</span>
              </>
            }
            description="Practical experts — not résumé-heavy, just people who build audiences that perform."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <article
                key={m.name}
                className="reveal bg-white border border-slate-150 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div
                  className="aspect-[4/3] relative grid place-items-center overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 55% at 30% 30%, rgba(79, 125, 245, 0.4), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.35), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                  }}
                >
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={`${m.name}, ${m.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <span className="font-display font-bold text-6xl lg:text-7xl text-white/90 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                        {m.initials}
                      </span>
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, rgba(111, 211, 255, 0.12) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />
                    </>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-slate-900 tracking-[-0.02em] mb-1">
                    {m.name}
                  </h3>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-700 mb-3.5">
                    {m.title}
                  </div>
                  <p className="text-[14px] text-slate-600 leading-relaxed flex-1">{m.bio}</p>
                  <div className="flex gap-2 mt-5 pt-5 border-t border-slate-150">
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${m.name} on LinkedIn`}
                      className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${m.email}`}
                      aria-label={`Email ${m.name}`}
                      className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
