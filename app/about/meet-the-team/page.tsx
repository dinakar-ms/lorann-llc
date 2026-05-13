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
  photo?: string;
  // objectPosition controls where the image is anchored inside the container.
  // Use "top" for headshots so the face is never cropped.
  // Use "center" (default) for already-centered square shots.
  objectPosition?: string;
  linkedin: string;
  email: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// 📸 PHOTOS
// Drop each person's headshot into:  /public/team/<filename>.jpg
// Recommended: square or 4:3 ratio, ~600×600 minimum, optimized JPG/WebP.
// If `photo` is omitted or empty, the card shows the initials block instead.
//
// 🎯 OBJECT POSITION
// Set objectPosition: "top" when the face is near the top of the image
// (portrait shots). Set "center" for square headshots where face is centered.
// ─────────────────────────────────────────────────────────────────────────────

const TEAM: TeamMember[] = [
  {
    name: "Michael Connolly",
    title: "Chief Executive Officer",
    bio: "Michael Connolly is the CEO of Lorann, LLC, with a career spanning data sales, audience development, and performance-driven marketing. He has held leadership roles at Compilers Plus, Venture Direct NYC, and Lake Group, where he helped scale data solutions across B2B and consumer markets over more than two decades. At Lorann, Michael focuses on delivering high-quality, results-oriented data solutions and building long-term client partnerships.",
    initials: "MC",
    // photo: "/team/michael-connolly.jpg",
    // objectPosition: "top",
    linkedin: "https://www.linkedin.com/in/mike-connolly-3126893/",
    email: "michael@lorannllc.com",
  },
  {
    name: "Paul Gerardi",
    title: "VP, Data Platforms & Product Development",
    bio: "Paul Gerardi is a data and marketing strategy leader with experience across audience development, analytics, and performance-driven campaigns. He specializes in building and optimizing data systems that support targeting, activation, and measurable results across Programmatic and traditional channels. His work spans B2B, financial services, and healthcare, with a focus on aligning data with real-world marketing outcomes.",
    initials: "PG",
    photo: "/team/paul-gerardi.png",
    objectPosition: "top",
    linkedin: "https://www.linkedin.com/in/paulgerardi/",
    email: "paul@lorannllc.com",
  },
  {
    name: "Fred Onemma",
    title: "Chief Marketing Officer",
    bio: "Fred Onemma is an acquisition intelligence leader focused on building data-driven systems that power scalable customer growth. He specializes in predictive modeling, audience development, and marketing infrastructure, helping organizations move beyond traditional targeting to precision-based acquisition. His work spans catalog, insurance, financial services, and direct response, with a focus on measurable performance and long-term value creation.",
    initials: "FO",
    photo: "/team/fred-onemma.jpeg",
    objectPosition: "Center 15%",
    linkedin: "https://www.linkedin.com/in/fredone/",
    email: "fred@lorannllc.com",
  },
  {
    name: "Joanne Iadarola",
    title: "VP of Sales",
    bio: "Joanne is a seasoned expert in data sales and marketing, committed to enhancing client prospecting, acquisition, and retention efforts. She has a remarkable ability to identify target audiences and craft data-driven strategies that enable organizations to attract, engage, and retain customers. Her expertise spans both B2B and B2C sectors across Insurance, IT, Finance, Healthcare, Senior Markets, and Direct-to-Consumer.",
    initials: "JI",
    photo: "/team/joanne-iadarola.png",
    objectPosition: "center 15%", // ← pulls face slightly toward top-center of the 4:3 crop
    linkedin: "https://www.linkedin.com/in/joanne-iadarola/",
    email: "joanne@lorannllc.com",
  },
  {
    name: "Bill Woods",
    title: "VP, Partnerships",
    bio: "Bill Woods is a seasoned expert in sales, business development, and strategic partnerships. He has helped organizations across industries — from healthcare and finance to education and manufacturing — achieve meaningful results through smart, data-driven marketing. Bill enjoys collaborating with both experienced professionals and forward-thinking companies looking to grow and innovate in a changing landscape.",
    initials: "BW",
    photo: "/team/bill-woods.jpg",
    // objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/bill-woods-9a50179/",
    email: "bill@lorannllc.com",
  },
  {
    name: "Caryn Trazi",
    title: "Senior Account Executive",
    bio: "Caryn Trazi is a trusted data professional specializing in the selection and fulfillment of targeted marketing lists. With extensive experience in medical and B2B markets, she helps mailers execute precise, data-driven marketing strategies. She also collaborates with list brokers, resellers, and advertising agencies — helping them grow their clients' businesses through informed list recommendations backed by industry expertise.",
    initials: "CT",
    photo: "/team/caryn-trazi.png",
    // objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/caryn-trazi-b6224bb/",
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
                {/* ── Photo / initials block ─────────────────────────────── */}
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
                      // object-cover fills the container.
                      // objectPosition (from data) pins the face correctly:
                      //   "center 15%" = face near top-center of square shots
                      //   "top"        = face at very top for portrait shots
                      className="object-cover"
                      style={{ objectPosition: m.objectPosition ?? "center 20%" }}
                      priority
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

                {/* ── Text content ──────────────────────────────────────── */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-lg text-slate-900 tracking-[-0.02em] mb-1">
                    {m.name}
                  </h3>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-700 mb-3.5">
                    {m.title}
                  </div>
                  <p className="text-[14px] text-slate-600 leading-relaxed flex-1">
                    {m.bio}
                  </p>
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