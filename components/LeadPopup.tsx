"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "lorann_popup_v3";
const SHOW_DELAY  = 12000;

/* ─── Particle canvas (left panel) ─────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      c.width  = c.offsetWidth  * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const W = () => c.offsetWidth, H = () => c.offsetHeight;
    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      r: Math.random() * .8 + .2, phase: Math.random() * Math.PI * 2,
      sp: Math.random() * .022 + .006,
    }));
    const nodes = Array.from({ length: 18 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5,
      r: Math.random() * 1.8 + .8,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      stars.forEach(s => {
        s.phase += s.sp;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${(.25 + .55 * Math.sin(s.phase)) * .8})`; ctx.fill();
      });
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W()) n.vx *= -1;
        if (n.y < 0 || n.y > H()) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,.9)"; ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${.32 * (1 - d / 115)})`; ctx.lineWidth = .7; ctx.stroke();
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ─── CSS orbiting globe ────────────────────────────────────────── */
function Globe() {
  return (
    <div className="relative mx-auto flex items-center justify-center"
      style={{ width: 120, height: 120 }}>
      <div className="absolute rounded-full"
        style={{ width: 36, height: 36,
          background: "radial-gradient(circle,rgba(56,189,248,.4) 0%,transparent 70%)",
          animation: "lp-core 2.8s ease-in-out infinite" }} />
      {[
        { s: 68,  c: "rgba(56,189,248,.75)", d: "3.4s", rx: "70deg", rz: "0deg"   },
        { s: 90,  c: "rgba(139,92,246,.65)", d: "5.8s", rx: "65deg", rz: "58deg"  },
        { s: 112, c: "rgba(6,182,212,.5)",   d: "9s",   rx: "68deg", rz: "-35deg" },
      ].map(({ s, c, d, rx, rz }, i) => (
        <div key={i} className="absolute rounded-full border"
          style={{ width: s, height: s, borderColor: c, borderWidth: "1px",
            animation: `lp-ring-${i + 1} ${d} linear infinite`,
            transform: `rotateX(${rx}) rotateZ(${rz})` }} />
      ))}
      <div className="absolute h-2 w-2 rounded-full"
        style={{ background: "#38bdf8", boxShadow: "0 0 10px 3px rgba(56,189,248,.7)",
          animation: "lp-dot1 3.4s linear infinite", transformOrigin: "0 34px" }} />
      <div className="absolute h-1.5 w-1.5 rounded-full"
        style={{ background: "#c084fc", boxShadow: "0 0 8px 2px rgba(192,132,252,.7)",
          animation: "lp-dot2 5.8s linear infinite", transformOrigin: "0 45px" }} />
      <div className="relative z-10 text-center select-none">
        <div style={{
          fontFamily: "var(--font-space-grotesk)", fontSize: 17, fontWeight: 900, lineHeight: 1,
          background: "linear-gradient(135deg,#38bdf8,#818cf8,#c084fc)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>95M+</div>
        <div style={{ fontSize: 6, letterSpacing: ".18em", color: "rgba(148,163,184,.65)", marginTop: 2 }}>
          RECORDS
        </div>
      </div>
    </div>
  );
}

/* ─── Count-up ──────────────────────────────────────────────────── */
function useCountUp(to: number, ms = 1800, go = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    let t0: number | null = null;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min((t - t0) / ms, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, to, ms]);
  return v;
}

/* ─── Segment data ──────────────────────────────────────────────── */
const SEGS = [
  { icon: "🏥", val: "NPI-Verified",  label: "Healthcare Professionals" },
  { icon: "💼", val: "98% Accuracy",  label: "Verified B2B Contacts"    },
  { icon: "💻", val: "40+ Lists",     label: "Technology User Data"     },
  { icon: "🎯", val: "Real-Time",     label: "Intent-Based Signals"     },
  { icon: "🏢", val: "500+ Verticals", label: "Industries Covered"      },
];

/* ─── Page-specific popup contexts ─────────────────────────────── */
const PAGE_CONTEXTS: Record<string, {
  badge: string; icon: string;
  count: number; suffix: string; countLabel: string; countSub: string;
  segVal: string; segLabel: string;
  headline: string; desc: string;
}> = {
  /* ── Solutions ── */
  "audience-targeting": {
    badge:"Audience Targeting Platform", icon:"🎯",
    count:500, suffix:"M+", countLabel:"Targetable Profiles", countSub:"Verified · Segmented · Actionable",
    segVal:"500M+", segLabel:"Targetable Audience Profiles",
    headline:"Get a Free Audience Targeting Data Sample",
    desc:"Precision audience segments across 500+ demographic, behavioral, and intent attributes — built for multi-channel activation.",
  },
  "data-enrichment": {
    badge:"Data Enrichment Service", icon:"🔬",
    count:95, suffix:"M+", countLabel:"Enrichable Records", countSub:"Append · Verify · Refresh",
    segVal:"95M+", segLabel:"Enrichable B2B Records",
    headline:"Get a Free Data Enrichment Sample",
    desc:"Append missing fields, verify accuracy, and refresh stale records across your CRM or contact database.",
  },
  "data-activation": {
    badge:"Data Activation Platform", icon:"⚡",
    count:95, suffix:"M+", countLabel:"Activatable Contacts", countSub:"Multi-Channel · Intent-Ready",
    segVal:"95M+", segLabel:"Activatable Contacts",
    headline:"Get a Free Data Activation Sample",
    desc:"Push verified contacts directly into your ad platforms, CRMs, and marketing automation tools for instant activation.",
  },
  "cost-per-lead": {
    badge:"Cost-Per-Lead Program", icon:"💰",
    count:5000, suffix:"+", countLabel:"Qualified Leads Delivered", countSub:"Verified · Intent-Based",
    segVal:"5,000+", segLabel:"Qualified Leads Delivered",
    headline:"Get a Free Cost-Per-Lead Data Sample",
    desc:"Pay only for verified, intent-qualified leads delivered directly to your sales team — no wasted spend.",
  },
  "signal-exchange": {
    badge:"Signal eXchange™ Platform", icon:"📡",
    count:1, suffix:"B+", countLabel:"Intent Signals Tracked", countSub:"Real-Time · Cross-Channel",
    segVal:"1B+", segLabel:"Intent Signals Tracked",
    headline:"Get a Free Signal eXchange™ Data Sample",
    desc:"Real-time purchase intent signals from 1B+ behavioral touchpoints — identify in-market buyers before your competitors.",
  },

  /* ── Healthcare specialties (most-specific first, before b2b-database) ── */
  "physician-assistant": {
    badge:"Physician Assistant Database", icon:"🩺",
    count:140, suffix:"K+", countLabel:"Certified PAs", countSub:"NPI-Verified · Specialty-Matched",
    segVal:"140K+", segLabel:"Certified Physician Assistants",
    headline:"Get a Free Verified Physician Assistant Data Sample",
    desc:"NPI-verified physician assistant contacts segmented by specialty, practice setting, and geography.",
  },
  "nurse-practitioner": {
    badge:"Nurse Practitioner Database", icon:"👩‍⚕️",
    count:355, suffix:"K+", countLabel:"Licensed NPs", countSub:"NPI-Verified · Specialty-Matched",
    segVal:"355K+", segLabel:"Licensed Nurse Practitioners",
    headline:"Get a Free Verified Nurse Practitioner Data Sample",
    desc:"NPI-verified nurse practitioner contacts segmented by specialty, prescribing authority, and practice setting.",
  },
  "registered-nurse": {
    badge:"Registered Nurse Database", icon:"🏥",
    count:4, suffix:"M+", countLabel:"Registered Nurses", countSub:"License-Verified · Unit-Matched",
    segVal:"4M+", segLabel:"Registered Nurses",
    headline:"Get a Free Verified Registered Nurse Data Sample",
    desc:"License-verified RN contacts segmented by specialty unit, facility type, and state of licensure.",
  },
  "physical-therapist": {
    badge:"Physical Therapist Database", icon:"🦵",
    count:250, suffix:"K+", countLabel:"Licensed PTs", countSub:"License-Verified · Setting-Matched",
    segVal:"250K+", segLabel:"Licensed Physical Therapists",
    headline:"Get a Free Verified Physical Therapist Data Sample",
    desc:"License-verified PT contacts segmented by specialty, practice setting, and patient population.",
  },
  "occupational-therapist": {
    badge:"Occupational Therapist Database", icon:"🖐️",
    count:130, suffix:"K+", countLabel:"Licensed OTs", countSub:"License-Verified · Setting-Matched",
    segVal:"130K+", segLabel:"Licensed Occupational Therapists",
    headline:"Get a Free Verified Occupational Therapist Data Sample",
    desc:"License-verified OT contacts segmented by specialty area, facility type, and patient population.",
  },
  "certified-nursing": {
    badge:"Certified Nursing Assistant Database", icon:"🏥",
    count:1, suffix:"M+", countLabel:"Certified CNAs", countSub:"License-Verified · Facility-Matched",
    segVal:"1M+", segLabel:"Certified Nursing Assistants",
    headline:"Get a Free Verified CNA Data Sample",
    desc:"License-verified CNA contacts segmented by facility type, state, and care setting.",
  },
  "mental-health": {
    badge:"Mental Health Professional Database", icon:"🧠",
    count:500, suffix:"K+", countLabel:"Mental Health Professionals", countSub:"License-Verified · Specialty-Matched",
    segVal:"500K+", segLabel:"Mental Health Professionals",
    headline:"Get a Free Verified Mental Health Professional Data Sample",
    desc:"License-verified mental health professional contacts including psychologists, therapists, and counselors.",
  },
  "psychiatr": {
    badge:"Psychiatrist Database", icon:"🧠",
    count:45, suffix:"K+", countLabel:"Verified Psychiatrists", countSub:"NPI-Verified · Board-Certified",
    segVal:"45K+", segLabel:"Verified Psychiatrists",
    headline:"Get a Free Verified Psychiatrist Data Sample",
    desc:"NPI-verified psychiatrist contacts segmented by subspecialty, practice setting, and prescribing authority.",
  },
  "physician": {
    badge:"Physician Database", icon:"🩺",
    count:870, suffix:"K+", countLabel:"Verified Physicians", countSub:"NPI-Verified · Specialty-Matched",
    segVal:"870K+", segLabel:"Physicians & Doctors",
    headline:"Get a Free Verified Physician & Doctor Data Sample",
    desc:"NPI-verified physician contacts segmented by specialty, practice setting, prescribing authority, and geography.",
  },
  "doctor": {
    badge:"Doctor Database", icon:"🩺",
    count:870, suffix:"K+", countLabel:"Verified Doctors", countSub:"NPI-Verified · Specialty-Matched",
    segVal:"870K+", segLabel:"Verified Physicians & Doctors",
    headline:"Get a Free Verified Doctor Data Sample",
    desc:"NPI-verified doctor contacts segmented by specialty, practice setting, and geography.",
  },
  "dentist": {
    badge:"Dentist Database", icon:"🦷",
    count:200, suffix:"K+", countLabel:"Verified Dentists", countSub:"NPI-Verified · Specialty-Matched",
    segVal:"200K+", segLabel:"Verified Dentists",
    headline:"Get a Free Verified Dentist Data Sample",
    desc:"NPI-verified dentist contacts segmented by specialty, practice type, and geography.",
  },
  "dental": {
    badge:"Dental Professional Database", icon:"🦷",
    count:250, suffix:"K+", countLabel:"Dental Professionals", countSub:"NPI-Verified · Role-Matched",
    segVal:"250K+", segLabel:"Dental Professionals",
    headline:"Get a Free Verified Dental Professional Data Sample",
    desc:"NPI-verified dental professional contacts including dentists, hygienists, and office managers.",
  },
  "pharmacist": {
    badge:"Pharmacist Database", icon:"💊",
    count:340, suffix:"K+", countLabel:"Verified Pharmacists", countSub:"License-Verified · Setting-Matched",
    segVal:"340K+", segLabel:"Verified Pharmacists",
    headline:"Get a Free Verified Pharmacist Data Sample",
    desc:"License-verified pharmacist contacts segmented by practice setting, specialty, and dispensing authority.",
  },
  "pharmacy": {
    badge:"Pharmacy Database", icon:"💊",
    count:65, suffix:"K+", countLabel:"Verified Pharmacies", countSub:"Location-Verified · Chain-Matched",
    segVal:"65K+", segLabel:"Verified Pharmacy Locations",
    headline:"Get a Free Verified Pharmacy Data Sample",
    desc:"Verified pharmacy location contacts including decision-makers, buyers, and clinical staff.",
  },
  "chiropractor": {
    badge:"Chiropractor Database", icon:"🦴",
    count:70, suffix:"K+", countLabel:"Verified Chiropractors", countSub:"License-Verified · Practice-Matched",
    segVal:"70K+", segLabel:"Verified Chiropractors",
    headline:"Get a Free Verified Chiropractor Data Sample",
    desc:"License-verified chiropractor contacts segmented by practice type, technique specialty, and geography.",
  },
  "optometrist": {
    badge:"Optometrist Database", icon:"👁️",
    count:40, suffix:"K+", countLabel:"Verified Optometrists", countSub:"NPI-Verified · Practice-Matched",
    segVal:"40K+", segLabel:"Verified Optometrists",
    headline:"Get a Free Verified Optometrist Data Sample",
    desc:"NPI-verified optometrist contacts segmented by practice setting, specialty, and geography.",
  },
  "veterinarian": {
    badge:"Veterinarian Database", icon:"🐾",
    count:95, suffix:"K+", countLabel:"Verified Veterinarians", countSub:"License-Verified · Specialty-Matched",
    segVal:"95K+", segLabel:"Verified Veterinarians",
    headline:"Get a Free Verified Veterinarian Data Sample",
    desc:"License-verified veterinarian contacts segmented by specialty, practice type, and geography.",
  },
  "speech": {
    badge:"Speech-Language Pathologist Database", icon:"🗣️",
    count:185, suffix:"K+", countLabel:"Certified SLPs", countSub:"License-Verified · Setting-Matched",
    segVal:"185K+", segLabel:"Certified Speech-Language Pathologists",
    headline:"Get a Free Verified Speech-Language Pathologist Data Sample",
    desc:"License-verified SLP contacts segmented by specialty, practice setting, and patient population.",
  },
  "podiatrist": {
    badge:"Podiatrist Database", icon:"🦶",
    count:15, suffix:"K+", countLabel:"Verified Podiatrists", countSub:"NPI-Verified · Practice-Matched",
    segVal:"15K+", segLabel:"Verified Podiatrists",
    headline:"Get a Free Verified Podiatrist Data Sample",
    desc:"NPI-verified podiatrist contacts segmented by subspecialty, practice setting, and geography.",
  },
  "lpn": {
    badge:"Licensed Practical Nurse Database", icon:"🏥",
    count:800, suffix:"K+", countLabel:"Licensed LPNs", countSub:"License-Verified · Facility-Matched",
    segVal:"800K+", segLabel:"Licensed Practical Nurses",
    headline:"Get a Free Verified LPN Data Sample",
    desc:"License-verified LPN contacts segmented by facility type, specialty unit, and state of licensure.",
  },
  "hospital": {
    badge:"Hospital & Health System Database", icon:"🏨",
    count:65, suffix:"K+", countLabel:"Hospital Decision-Makers", countSub:"Admin · Clinical · Executive",
    segVal:"65K+", segLabel:"Hospital Decision-Makers",
    headline:"Get a Free Verified Hospital & Health System Data Sample",
    desc:"Hospital administrator, executive, and clinical decision-maker contacts segmented by role, department, bed count, and health system affiliation.",
  },

  /* ── Industry verticals (before b2b-database) ── */
  "industries-served": {
    badge:"Industries Served Database", icon:"🏢",
    count:500, suffix:"+", countLabel:"Industries Covered", countSub:"Verified · Segmented · Current",
    segVal:"500+", segLabel:"Industries Covered",
    headline:"Get a Free Industry-Specific Data Sample",
    desc:"Verified B2B contact databases across 500+ industries — segmented by role, company size, and geography.",
  },
  "real-estate": {
    badge:"Real Estate Professional Database", icon:"🏠",
    count:2, suffix:"M+", countLabel:"Real Estate Professionals", countSub:"Licensed · Active · Verified",
    segVal:"2M+", segLabel:"Real Estate Professionals",
    headline:"Get a Free Real Estate Professional Data Sample",
    desc:"Licensed real estate agent, broker, and investor contacts segmented by market, transaction volume, and specialty.",
  },
  "financial": {
    badge:"Financial Services Database", icon:"💳",
    count:8, suffix:"M+", countLabel:"Financial Professionals", countSub:"RIA · CPA · CFP · Banker",
    segVal:"8M+", segLabel:"Financial Professionals",
    headline:"Get a Free Financial Services Data Sample",
    desc:"Financial advisor, banker, CPA, and insurance professional contacts segmented by AUM, firm type, and specialty.",
  },
  "insurance": {
    badge:"Insurance Professional Database", icon:"🛡️",
    count:3, suffix:"M+", countLabel:"Insurance Professionals", countSub:"Agent · Broker · Underwriter",
    segVal:"3M+", segLabel:"Insurance Professionals",
    headline:"Get a Free Insurance Professional Data Sample",
    desc:"Insurance agent, broker, and underwriter contacts segmented by line of business, carrier, and territory.",
  },
  "automotive": {
    badge:"Automotive Industry Database", icon:"🚗",
    count:500, suffix:"K+", countLabel:"Automotive Professionals", countSub:"Dealer · OEM · Supplier",
    segVal:"500K+", segLabel:"Automotive Professionals",
    headline:"Get a Free Automotive Industry Data Sample",
    desc:"Automotive dealer, OEM, and supplier contacts segmented by role, brand, and geography.",
  },
  "technology": {
    badge:"Technology Sector Database", icon:"💻",
    count:12, suffix:"M+", countLabel:"Tech Decision-Makers", countSub:"CTO · IT · Developer · SaaS Buyers",
    segVal:"12M+", segLabel:"Tech Decision-Makers",
    headline:"Get a Free Technology Sector Data Sample",
    desc:"CTO, IT manager, developer, and SaaS buyer contacts segmented by company size, tech stack, and purchase intent.",
  },
  "education": {
    badge:"Education Sector Database", icon:"🎓",
    count:4, suffix:"M+", countLabel:"Education Professionals", countSub:"K-12 · Higher Ed · Admin",
    segVal:"4M+", segLabel:"Education Professionals",
    headline:"Get a Free Education Sector Data Sample",
    desc:"Teacher, administrator, and higher-education professional contacts segmented by institution type, grade level, and role.",
  },
  "legal": {
    badge:"Legal Professional Database", icon:"⚖️",
    count:1, suffix:"M+", countLabel:"Legal Professionals", countSub:"Attorney · Paralegal · Judge",
    segVal:"1M+", segLabel:"Legal Professionals",
    headline:"Get a Free Legal Professional Data Sample",
    desc:"Attorney, paralegal, and legal professional contacts segmented by practice area, firm size, and geography.",
  },
  "retail": {
    badge:"Retail Industry Database", icon:"🛒",
    count:3, suffix:"M+", countLabel:"Retail Decision-Makers", countSub:"Buyer · Manager · Owner",
    segVal:"3M+", segLabel:"Retail Decision-Makers",
    headline:"Get a Free Retail Industry Data Sample",
    desc:"Retail buyer, store manager, and owner contacts segmented by category, store count, and revenue.",
  },
  "construction": {
    badge:"Construction Industry Database", icon:"🏗️",
    count:2, suffix:"M+", countLabel:"Construction Professionals", countSub:"Contractor · Engineer · PM",
    segVal:"2M+", segLabel:"Construction Professionals",
    headline:"Get a Free Construction Industry Data Sample",
    desc:"General contractor, engineer, and project manager contacts segmented by project type, revenue, and geography.",
  },
  "manufacturing": {
    badge:"Manufacturing Industry Database", icon:"🏭",
    count:5, suffix:"M+", countLabel:"Manufacturing Professionals", countSub:"Ops · Procurement · Engineering",
    segVal:"5M+", segLabel:"Manufacturing Professionals",
    headline:"Get a Free Manufacturing Industry Data Sample",
    desc:"Operations, procurement, and engineering professional contacts segmented by sector, company size, and role.",
  },
  "industries": {
    badge:"Industries Database", icon:"🏢",
    count:500, suffix:"+", countLabel:"Industries Covered", countSub:"Verified · Segmented · Current",
    segVal:"500+", segLabel:"Industries Covered",
    headline:"Get a Free Industry-Specific Data Sample",
    desc:"Verified B2B contact databases across 500+ industries — segmented by role, company size, and geography.",
  },

  /* ── Healthcare data + generic data assets (healthcare-data before healthcare) ── */
  "healthcare-data": {
    badge:"Healthcare Data Assets", icon:"🏥",
    count:20, suffix:"M+", countLabel:"Healthcare Records", countSub:"HIPAA-Compliant · NPI-Verified",
    segVal:"20M+", segLabel:"Healthcare Records",
    headline:"Get a Free Healthcare Data Sample",
    desc:"HIPAA-compliant healthcare professional and facility contact data segmented by specialty, role, and geography.",
  },
  "healthcare": {
    badge:"Healthcare Professional Database", icon:"🏥",
    count:20, suffix:"M+", countLabel:"Healthcare Professionals", countSub:"NPI-Verified · HIPAA-Compliant",
    segVal:"20M+", segLabel:"Healthcare Professionals",
    headline:"Get a Free Healthcare Professional Data Sample",
    desc:"NPI-verified healthcare professional contacts across all specialties — HIPAA-compliant and regularly refreshed.",
  },
  "b2b-database": {
    badge:"B2B Contact Database", icon:"💼",
    count:95, suffix:"M+", countLabel:"Verified B2B Contacts", countSub:"Scrubbed · Compliant · Ready",
    segVal:"95M+", segLabel:"Verified B2B Contacts",
    headline:"Get a Free B2B Contact Database Sample",
    desc:"95M+ verified B2B contacts across industries — segmented by role, company size, revenue, and geography.",
  },
  "b2b-data": {
    badge:"B2B Data Solutions", icon:"💼",
    count:95, suffix:"M+", countLabel:"B2B Records Available", countSub:"Verified · Segmented · Fresh",
    segVal:"95M+", segLabel:"B2B Records Available",
    headline:"Get a Free B2B Data Sample",
    desc:"Verified B2B contact data segmented by industry, role, company size, and intent signals.",
  },
  "b2c-database": {
    badge:"B2C Consumer Database", icon:"👥",
    count:250, suffix:"M+", countLabel:"Consumer Records", countSub:"Opt-In · Verified · Segmented",
    segVal:"250M+", segLabel:"Consumer Records",
    headline:"Get a Free B2C Consumer Data Sample",
    desc:"250M+ opt-in consumer records segmented by demographics, lifestyle, purchase behavior, and geography.",
  },
  "consumer-data": {
    badge:"Consumer Data Solutions", icon:"👥",
    count:250, suffix:"M+", countLabel:"Consumer Records", countSub:"Opt-In · Verified · Segmented",
    segVal:"250M+", segLabel:"Consumer Records",
    headline:"Get a Free Consumer Data Sample",
    desc:"Verified consumer contact data segmented by demographics, interests, purchase history, and location.",
  },
  "data-cards": {
    badge:"Data Cards Catalog", icon:"🗂️",
    count:500, suffix:"+", countLabel:"Data Cards Available", countSub:"Industry · Role · Geography",
    segVal:"500+", segLabel:"Data Cards Available",
    headline:"Get a Free Data Card Sample",
    desc:"Browse 500+ pre-built data cards covering every industry, role, and geography — ready for immediate activation.",
  },

  /* ── About ── */
  "company-overview": {
    badge:"About Lorann LLC", icon:"🏛️",
    count:5000, suffix:"+", countLabel:"Businesses Served", countSub:"Since 1996 · Trusted · Proven",
    segVal:"5,000+", segLabel:"Businesses Served",
    headline:"Get a Free Data Sample from Lorann",
    desc:"Lorann LLC has delivered trusted B2B data solutions since 1996 — see why 5,000+ businesses choose us.",
  },
  "meet-the-team": {
    badge:"Meet the Lorann Team", icon:"👥",
    count:5000, suffix:"+", countLabel:"Businesses Served", countSub:"Expert Team · 25+ Years",
    segVal:"5,000+", segLabel:"Businesses Served",
    headline:"Get a Free Data Sample from Our Team",
    desc:"Our data experts have spent 25+ years building the most accurate and compliant B2B databases in the industry.",
  },
  "our-approach": {
    badge:"Our Data Approach", icon:"🔍",
    count:98, suffix:"%", countLabel:"Accuracy Rate", countSub:"Multi-Source Verified",
    segVal:"98%", segLabel:"Verified Accuracy Rate",
    headline:"Get a Free Sample of Our Verified Data",
    desc:"Our multi-source verification approach ensures 98%+ accuracy across every record we deliver.",
  },
  "about": {
    badge:"About Lorann LLC", icon:"🏛️",
    count:5000, suffix:"+", countLabel:"Businesses Served", countSub:"Since 1996 · Trusted · Proven",
    segVal:"5,000+", segLabel:"Businesses Served",
    headline:"Get a Free Data Sample from Lorann",
    desc:"Lorann LLC has delivered trusted B2B data solutions since 1996 — see why 5,000+ businesses choose us.",
  },

  /* ── Insights ── */
  "industry-trends": {
    badge:"Industry Trends & Insights", icon:"📈",
    count:95, suffix:"M+", countLabel:"Verified B2B Contacts", countSub:"Data-Backed Intelligence",
    segVal:"95M+", segLabel:"Verified B2B Contacts",
    headline:"Get a Free Data Sample to Power Your Strategy",
    desc:"Put Lorann's verified B2B data behind your go-to-market strategy — accurate, compliant, and ready to activate.",
  },
  "case-studies": {
    badge:"Customer Case Studies", icon:"📋",
    count:5000, suffix:"+", countLabel:"Businesses Served", countSub:"Proven Results · Real ROI",
    segVal:"5,000+", segLabel:"Businesses Served",
    headline:"Get a Free Data Sample Like Our Customers Use",
    desc:"Join 5,000+ businesses that have grown their pipeline with Lorann's verified B2B data.",
  },
  "insights": {
    badge:"Data Intelligence Insights", icon:"📊",
    count:95, suffix:"M+", countLabel:"Verified B2B Contacts", countSub:"Data-Backed Intelligence",
    segVal:"95M+", segLabel:"Verified B2B Contacts",
    headline:"Get a Free Data Sample to Power Your Strategy",
    desc:"Put Lorann's verified B2B data behind your go-to-market strategy — accurate, compliant, and ready to activate.",
  },

  /* ── Solutions hub + static pages ── */
  "solutions": {
    badge:"Data Solutions Platform", icon:"🚀",
    count:95, suffix:"M+", countLabel:"Verified Contacts Available", countSub:"All Industries · All Roles",
    segVal:"95M+", segLabel:"Verified Contacts Available",
    headline:"Get a Free Data Solutions Sample",
    desc:"Explore Lorann's full suite of B2B data solutions — audience targeting, enrichment, activation, and intent signals.",
  },
  "how-it-works": {
    badge:"How Lorann Works", icon:"⚙️",
    count:98, suffix:"%", countLabel:"Delivery Accuracy", countSub:"Verified · Compliant · Fast",
    segVal:"98%", segLabel:"Verified Delivery Accuracy",
    headline:"See How It Works — Get a Free Sample",
    desc:"Lorann's 3-step process: define your audience, verify your data, activate across channels — in under 24 hours.",
  },
  "resources": {
    badge:"Data Resources & Tools", icon:"📚",
    count:95, suffix:"M+", countLabel:"Verified B2B Contacts", countSub:"Ready to Activate",
    segVal:"95M+", segLabel:"Verified B2B Contacts",
    headline:"Get a Free Data Sample from Lorann",
    desc:"Access guides, templates, and tools — plus a free verified data sample to get started.",
  },
  "contact": {
    badge:"Talk to Our Data Team", icon:"📞",
    count:5000, suffix:"+", countLabel:"Businesses Served", countSub:"Expert Team · Fast Response",
    segVal:"5,000+", segLabel:"Businesses Served",
    headline:"Get a Free Data Sample Today",
    desc:"Our data specialists are ready to build the perfect audience for your campaign — request a free sample now.",
  },
  "data-assets": {
    badge:"Data Assets Catalog", icon:"🗄️",
    count:500, suffix:"+", countLabel:"Data Assets Available", countSub:"Industry · Role · Geography",
    segVal:"500+", segLabel:"Data Assets Available",
    headline:"Get a Free Data Asset Sample",
    desc:"Browse Lorann's full catalog of B2B data assets — ready-to-deploy lists for every industry and audience.",
  },
};

/* ─── Slug → human title ────────────────────────────────────────── */
const SLUG_ACRONYMS = new Set([
  "plm","crm","erp","sap","api","b2b","b2c","hr","ehr","emr","ai","ml","iot",
  "it","smb","cfo","cto","cmo","ceo","vp","md","rn","np","pa","lpn","cna",
  "mba","cpa","ria","etf","vc","pe","pos","kpi","roi","seo","sem","ppc",
  "ui","ux","sql","aws","gcp","saas","paas","iaas","npi","dme","pbm","dnc",
]);

function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map(w => SLUG_ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ─── Page context hook ─────────────────────────────────────────── */
function usePageContext() {
  const pathname = usePathname();
  return useMemo(() => {
    const path = (pathname ?? "").toLowerCase();
    const segments = path.split("/").filter(Boolean);

    let matchedSegIdx = -1;
    let baseCtx: (typeof PAGE_CONTEXTS)[string] | null = null;

    for (const [key, ctx] of Object.entries(PAGE_CONTEXTS)) {
      if (path.includes(key)) {
        matchedSegIdx = segments.findIndex(s => s.includes(key));
        baseCtx = ctx;
        break;
      }
    }

    if (!baseCtx) return null;

    const remaining = matchedSegIdx >= 0 ? segments.slice(matchedSegIdx + 1) : [];
    if (remaining.length > 0) {
      const leaf = remaining[remaining.length - 1];
      if (leaf && leaf.length > 2) {
        return { ...baseCtx, headline: `Get a Free ${slugToTitle(leaf)} Data Sample` };
      }
    }

    return baseCtx;
  }, [pathname]);
}

/* ══════════════════════════════════════════════════════════════════
   LEAD POPUP
══════════════════════════════════════════════════════════════════ */
export default function LeadPopup() {
  const [phase,      setPhase]      = useState<"hidden"|"entering"|"visible"|"closing"|"minimized"|"done">("hidden");
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err,        setErr]        = useState("");
  const [tidx,       setTidx]       = useState(0);
  const [tin,        setTin]        = useState(true);
  const [form,       setForm]       = useState({ name: "", email: "", company: "" });

  const pathname = usePathname();
  const pageCtx = usePageContext();
  const countVal = useCountUp(pageCtx?.count ?? 95, 2200, phase === "visible");

  useEffect(() => {
    if ((pathname ?? "").startsWith("/studio")) return;
    if (window.self !== window.top) return; // inside Sanity Studio iframe preview
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setPhase("entering");
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("visible")));
    }, SHOW_DELAY);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "visible") return;
    const id = setInterval(() => {
      setTin(false);
      setTimeout(() => { setTidx(i => (i + 1) % SEGS.length); setTin(true); }, 360);
    }, 2800);
    return () => clearInterval(id);
  }, [phase]);

  const dismiss = () => {
    setPhase("closing");
    setTimeout(() => setPhase("minimized"), 480);
  };

  const dismissForever = () => {
    setPhase("closing");
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setPhase("done"), 480);
  };

  const reopen = () => {
    setPhase("entering");
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase("visible")));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setSubmitting(true);
    try {
      const r = await fetch("/api/popup-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error();
      setSubmitted(true);
      localStorage.setItem(STORAGE_KEY, "1");
      setTimeout(dismissForever, 3500);
    } catch { setErr("Something went wrong — please try again."); }
    finally { setSubmitting(false); }
  };

  if (phase === "hidden" || phase === "done") return null;

  /* ── Minimized floating widget ─────────────────────────────────── */
  if (phase === "minimized") {
    return (
      <>
        <style>{`
          @keyframes lp-widget-in {
            from { transform:translateY(-50%) translateX(110%); opacity:0; }
            to   { transform:translateY(-50%) translateX(0);    opacity:1; }
          }
          @keyframes lp-widget-pulse {
            0%,100% { box-shadow:-4px 4px 20px rgba(29,69,217,.45),0 0 0 0 rgba(99,102,241,.0); }
            50%     { box-shadow:-4px 4px 28px rgba(29,69,217,.65),0 0 0 6px rgba(99,102,241,.18); }
          }
          .lp-widget-btn:hover { transform:translateY(-50%) translateX(-4px) !important; }
        `}</style>
        <button
          onClick={reopen}
          className="lp-widget-btn fixed right-0 z-[9998] flex flex-col items-center"
          aria-label="Open free data sample form"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            animation: "lp-widget-in .5s cubic-bezier(.34,1.56,.64,1) both, lp-widget-pulse 2.8s ease-in-out 1s infinite",
            background: "linear-gradient(160deg,#1D45D9 0%,#4f46e5 55%,#7c3aed 100%)",
            borderRadius: "12px 0 0 12px",
            padding: "22px 11px",
            gap: 10,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          <span style={{ fontSize: 17, lineHeight: 1 }}>{pageCtx?.icon ?? "⭐"}</span>
          <span style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
          }}>
            Free Sample
          </span>
          <span style={{ fontSize: 13, opacity: .75 }}>↑</span>
        </button>
      </>
    );
  }

  /* Pin segment to page-specific data; cycle generic SEGS on generic pages */
  const seg = pageCtx
    ? { icon: pageCtx.icon, val: pageCtx.segVal, label: pageCtx.segLabel }
    : SEGS[tidx];

  return (
    <>
      <style>{`
        /* Keyframes */
        @keyframes lp-ring-1  { to{transform:rotateX(70deg) rotateZ(360deg);} }
        @keyframes lp-ring-2  { to{transform:rotateX(65deg) rotateZ(calc(58deg + 360deg));} }
        @keyframes lp-ring-3  { to{transform:rotateX(68deg) rotateZ(calc(-35deg + 360deg));} }
        @keyframes lp-dot1    { to{transform:rotate(360deg) translateX(34px);} }
        @keyframes lp-dot2    { to{transform:rotate(-360deg) translateX(45px);} }
        @keyframes lp-core    { 0%,100%{opacity:.7;transform:scale(1);}  50%{opacity:1;transform:scale(1.2);} }
        @keyframes lp-float   { 0%,100%{transform:translateY(0);}        50%{transform:translateY(-9px);} }
        @keyframes lp-scan    { 0%{top:-1%;opacity:.8;} 100%{top:101%;opacity:0;} }
        @keyframes lp-ping    { 0%,100%{opacity:.6;transform:scale(1);}  50%{opacity:1;transform:scale(1.4);} }
        @keyframes lp-spin    { to{transform:rotate(360deg);} }
        @keyframes lp-fade-up { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
        @keyframes lp-badge   { from{opacity:0;transform:scale(.6) translateY(6px);} to{opacity:1;transform:scale(1) translateY(0);} }
        @keyframes lp-enter   {
          from { opacity:0; transform:scale(.86) perspective(800px) rotateX(5deg) translateY(20px); }
          to   { opacity:1; transform:scale(1)   perspective(800px) rotateX(0deg) translateY(0);    }
        }
        @keyframes lp-exit    { to{opacity:0;transform:scale(.9) translateY(18px);} }
        @keyframes lp-shimmer {
          0%  { background-position: -200% center; }
          100%{ background-position:  200% center; }
        }
        @keyframes lp-border  {
          0%  { background-position: 0% 50%;   }
          100%{ background-position: 400% 50%; }
        }
        @keyframes lp-glow-text {
          0%,100% { filter: drop-shadow(0 0 8px rgba(56,189,248,.5));  }
          50%     { filter: drop-shadow(0 0 24px rgba(56,189,248,.9)); }
        }
        @keyframes lp-counter-pop {
          from { opacity:0; transform:scale(.65); }
          to   { opacity:1; transform:scale(1);   }
        }
        @keyframes lp-right-glow {
          0%,100% { opacity:.06; }
          50%     { opacity:.14; }
        }

        /* Modal wrappers */
        .lp-enter { animation: lp-enter .6s cubic-bezier(.34,1.56,.64,1) both; }
        .lp-exit  { animation: lp-exit  .45s ease both; }

        /* Animated gradient border */
        .lp-border-wrap { position:relative; border-radius:24px; }
        .lp-border-wrap::before {
          content:''; position:absolute; inset:-2.5px; border-radius:26px; z-index:-1;
          background: linear-gradient(90deg,
            #1D45D9,#00A7EF,#1D45D9,#00A7EF,#1D45D9);
          background-size:300% 100%;
          animation: lp-border 4s linear infinite;
        }

        /* CTA button */
        .lp-cta {
          position:relative; overflow:hidden;
          background: linear-gradient(135deg, #1D45D9 0%, #4f46e5 50%, #7c3aed 100%);
          border-radius:12px; padding:12px; font-size:14px;
          font-weight:700; color:#fff; width:100%; cursor:pointer;
          border:none; transition:transform .25s ease, box-shadow .25s ease;
          box-shadow: 0 6px 28px rgba(79,70,229,.55), 0 0 0 1px rgba(129,140,248,.2);
        }
        .lp-cta::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(110deg,transparent 38%,rgba(255,255,255,.28) 50%,transparent 62%);
          background-size:220% 100%;
          animation:lp-shimmer 2.4s ease-in-out infinite;
        }
        .lp-cta:hover:not(:disabled) {
          transform:translateY(-3px);
          box-shadow:0 14px 44px rgba(79,70,229,.7), 0 0 0 1px rgba(129,140,248,.3);
        }
        .lp-cta:disabled { opacity:.65; }

        /* Input */
        .lp-input {
          width:100%; padding:9px 12px;
          background:#fff; border:1.5px solid #e2e8f0; border-radius:10px;
          font-size:13px; color:#1e293b; transition:border-color .2s,box-shadow .2s;
        }
        .lp-input::placeholder { color:#94a3b8; }
        .lp-input:focus {
          outline:none; border-color:#4f46e5;
          box-shadow:0 0 0 3px rgba(79,70,229,.12), 0 0 16px rgba(79,70,229,.08);
        }

        /* Ticker */
        .lp-tick { transition:opacity .32s ease, transform .32s ease; }
        .lp-tick.in  { opacity:1; transform:translateY(0);    }
        .lp-tick.out { opacity:0; transform:translateY(10px); }

        /* ──────────── CLOSE BUTTON ──────────── */
        .lp-x {
          position:absolute; top:-18px; right:-18px; z-index:60;
          width:46px; height:46px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg,#1e293b,#0f172a);
          border:2.5px solid rgba(56,189,248,.6);
          color:#38bdf8; font-size:20px; font-weight:300; line-height:1;
          cursor:pointer; user-select:none;
          box-shadow:0 0 0 5px rgba(56,189,248,.08),
                     0 0 22px rgba(56,189,248,.35),
                     0 5px 18px rgba(0,0,0,.7);
          transition:transform .26s cubic-bezier(.34,1.56,.64,1),
                     box-shadow .26s ease, border-color .26s ease,
                     background .26s ease, color .26s ease;
        }
        .lp-x:hover {
          background:linear-gradient(135deg,#0ea5e9,#6366f1);
          border-color:#7dd3fc; color:#fff;
          transform:rotate(90deg) scale(1.12);
          box-shadow:0 0 0 6px rgba(56,189,248,.15),
                     0 0 36px rgba(56,189,248,.6),
                     0 5px 22px rgba(0,0,0,.6);
        }
      `}</style>

      {/* ── Backdrop ───────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
        style={{ background:"rgba(2,6,23,.45)", backdropFilter:"blur(14px)", WebkitBackdropFilter:"blur(14px)" }}
        onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
        role="dialog" aria-modal="true"
      >
        {/* ── Glow border wrapper ─────────────────────────────── */}
        <div className={`lp-border-wrap relative w-full ${phase === "closing" ? "lp-exit" : "lp-enter"}`}
          style={{ maxWidth: 820 }}>

          {/* ════ CLOSE BUTTON ════ */}
          <button className="lp-x" onClick={dismiss} aria-label="Close popup">✕</button>

          {/* ── Inner card ──────────────────────────────────────── */}
          <div className="relative overflow-hidden rounded-[22px] shadow-2xl"
            style={{ maxHeight: "92vh", overflowY: "auto" }}>

            <div className="flex flex-col md:flex-row">

              {/* ══════════════════════════════════════
                  LEFT — Dark visualization panel
              ══════════════════════════════════════ */}
              <div className="relative flex flex-col overflow-hidden md:w-[42%]"
                style={{ background:"linear-gradient(160deg,#030b1a 0%,#060d21 60%,#050a1c 100%)",
                  padding:"20px 18px", borderRight:"1px solid rgba(255,255,255,.07)" }}>

                <ParticleCanvas />

                {/* Horizontal scan line */}
                <div className="pointer-events-none absolute left-0 right-0 h-px opacity-70"
                  style={{ background:"linear-gradient(90deg,transparent,rgba(56,189,248,.6),transparent)",
                    animation:"lp-scan 3.8s linear infinite" }} />

                {/* LIVE badge */}
                <div className="relative z-10 mb-2 flex items-center gap-2"
                  style={{ animation:"lp-fade-up .45s ease .08s both" }}>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute h-full w-full rounded-full bg-cyan-400"
                      style={{ animation:"lp-ping 1.4s ease-in-out infinite" }} />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-cyan-400"
                      style={{ boxShadow:"0 0 8px rgba(56,189,248,.9)" }} />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[.28em] text-cyan-400">
                    Live Data Intelligence
                  </span>
                </div>

                {/* Globe — floats */}
                <div className="relative z-10 mb-1"
                  style={{ animation:"lp-float 4.2s ease-in-out infinite" }}>
                  <Globe />
                </div>

                {/* Big animated counter */}
                <div className="relative z-10 mb-1 text-center select-none"
                  style={{ animation:"lp-counter-pop .6s ease .5s both" }}>
                  <div style={{
                    fontFamily:"var(--font-space-grotesk)", fontSize:42, fontWeight:900, lineHeight:1,
                    background:"linear-gradient(120deg,#38bdf8 0%,#818cf8 48%,#c084fc 100%)",
                    backgroundSize:"180% auto",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                    animation:"lp-glow-text 2.5s ease-in-out infinite",
                  }}>
                    {countVal}{pageCtx?.suffix ?? "M+"}
                  </div>
                  <div className="text-xs font-bold text-white/70">{pageCtx?.countLabel ?? "Verified B2B Contacts"}</div>
                  <div className="mt-0.5 text-[9px] text-slate-600">{pageCtx?.countSub ?? "Scrubbed · Compliant · Ready"}</div>
                </div>

                {/* Segment ticker card */}
                <div className="relative z-10 mt-3 rounded-xl p-2.5"
                  style={{ background:"rgba(255,255,255,.04)",
                    border:"1px solid rgba(56,189,248,.13)",
                    backdropFilter:"blur(6px)",
                    animation:"lp-fade-up .45s ease .38s both" }}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-[.22em] text-cyan-400">
                      Active Segment
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-px text-[8px] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                        style={{ animation:"lp-ping 1.5s ease-in-out infinite" }} />
                      LIVE
                    </span>
                  </div>
                  <div className={`lp-tick ${tin ? "in" : "out"}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{seg.icon}</span>
                      <span style={{
                        fontFamily:"var(--font-space-grotesk)", fontSize:20, fontWeight:900, color:"#f1f5f9",
                      }}>{seg.val}</span>
                    </div>
                    <div className="mt-0.5 text-[10px] text-slate-500">{seg.label}</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="relative z-10 mt-2 grid grid-cols-2 gap-1.5"
                  style={{ animation:"lp-fade-up .45s ease .46s both" }}>
                  {[["98%","Accuracy Rate"],["500+","Industries"],["Weekly","Data Refresh"],["DNC ✓","Suppressed"]].map(([v, l]) => (
                    <div key={l} className="rounded-lg px-2 py-1.5 text-center"
                      style={{ background:"rgba(56,189,248,.06)", border:"1px solid rgba(56,189,248,.13)" }}>
                      <div className="text-[12px] font-extrabold text-cyan-300">{v}</div>
                      <div className="text-[8px] text-slate-600">{l}</div>
                    </div>
                  ))}
                </div>

                {/* Compliance badges */}
                <div className="relative z-10 mt-2 flex flex-wrap gap-1">
                  {["HIPAA","CCPA","CAN-SPAM","FCRA","DNC"].map((b, i) => (
                    <span key={b} className="rounded-full px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wide"
                      style={{ border:"1px solid rgba(139,92,246,.35)", color:"#a78bfa",
                        background:"rgba(139,92,246,.08)",
                        animation:`lp-badge .38s ease ${.62+i*.055}s both` }}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* ══════════════════════════════════════
                  RIGHT — White form panel
              ══════════════════════════════════════ */}
              <div className="relative flex flex-col justify-center overflow-hidden bg-white md:w-[58%]"
                style={{ padding:"24px 26px" }}>

                {/* Decorative corner orbs */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
                  style={{ background:"radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)",
                    animation:"lp-right-glow 3s ease-in-out infinite" }} />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full"
                  style={{ background:"radial-gradient(circle,rgba(6,182,212,.12) 0%,transparent 70%)",
                    animation:"lp-right-glow 3.5s ease-in-out infinite .5s" }} />

                {/* Decorative top gradient bar */}
                <div className="absolute left-0 right-0 top-0 h-[3px]"
                  style={{ background:"linear-gradient(90deg,#1D45D9,#00A7EF,#8b5cf6,#1D45D9)",
                    backgroundSize:"300% 100%", animation:"lp-border 5s linear infinite" }} />

                {submitted ? (
                  <div className="relative z-10 flex flex-col items-center py-8 text-center"
                    style={{ animation:"lp-enter .5s ease" }}>
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                      style={{ background:"linear-gradient(135deg,#1D45D9,#00A7EF)",
                        boxShadow:"0 0 40px rgba(29,69,217,.35)" }}>
                      ✓
                    </div>
                    <h3 style={{ fontFamily:"var(--font-space-grotesk)", fontSize:24, fontWeight:800, color:"#1e293b" }}>
                      You&apos;re All Set!
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Your free sample request is confirmed.<br />
                      <strong className="text-slate-700">Expect it within 1 business day.</strong>
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10">

                    {/* Tagline / badge */}
                    <div className="mb-2 text-center"
                      style={{ animation:"lp-fade-up .42s ease .12s both" }}>
                      <span style={{ fontSize:12, fontWeight:700, color:"#7c3aed", letterSpacing:".01em" }}>
                        <span style={{ fontSize:13 }}>{pageCtx?.icon ?? "⭐"}</span>{" "}
                        {pageCtx?.badge ?? "Better Data. Better Decisions. Better Growth."}
                      </span>
                    </div>

                    {/* Headline */}
                    <div style={{ animation:"lp-fade-up .42s ease .18s both", marginBottom:10 }}>
                      <h2 style={{ fontFamily:"var(--font-space-grotesk)", fontSize:"clamp(20px,2.4vw,26px)",
                        fontWeight:900, color:"#0f172a", lineHeight:1.25 }}>
                        {pageCtx ? pageCtx.headline : (
                          <>Get a High-Quality Data Sample That{" "}
                            <span style={{
                              background:"linear-gradient(120deg,#1D45D9 0%,#00A7EF 100%)",
                              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                            }}>
                              Drives Real Results.
                            </span>
                          </>
                        )}
                      </h2>
                    </div>

                    <p className="mb-3 text-sm leading-relaxed text-slate-500"
                      style={{ animation:"lp-fade-up .42s ease .25s both" }}>
                      {pageCtx ? pageCtx.desc : (
                        <>Preview accurate and compliant data from{" "}
                          <strong style={{ color:"#1D45D9" }}>Lorann</strong>
                          {" "}and experience the quality that helps businesses connect,{" "}
                          <strong className="text-slate-700">engage, and grow.</strong>
                        </>
                      )}
                    </p>

                    {/* Trust badges */}
                    <div className="mb-3 flex flex-wrap gap-2"
                      style={{ animation:"lp-fade-up .42s ease .3s both" }}>
                      {[
                        { icon:"🔒", label:"Data Privacy First" },
                        { icon:"✅", label:"100% Compliant"     },
                      ].map(({ icon, label }) => (
                        <div key={label}
                          className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold text-slate-700"
                          style={{ background:"#f8faff", border:"1.5px solid #e2e8f0" }}>
                          <span>{icon}</span>{label}
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-2">
                      {([
                        { k:"name",    t:"text",  ph:"Full Name *",      req:true  },
                        { k:"email",   t:"email", ph:"Business Email *", req:true  },
                        { k:"company", t:"text",  ph:"Company Name",     req:false },
                      ] as const).map(({ k, t, ph, req }, i) => (
                        <div key={k} style={{ animation:`lp-fade-up .42s ease ${.36+i*.07}s both` }}>
                          <input type={t} placeholder={ph} required={req}
                            className="lp-input"
                            autoComplete={k === "email" ? "email" : k === "name" ? "name" : "organization"}
                            value={form[k]}
                            onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
                          />
                        </div>
                      ))}

                      {err && <p className="text-xs font-medium text-red-500">{err}</p>}

                      <div style={{ animation:"lp-fade-up .42s ease .58s both" }}>
                        <button type="submit" disabled={submitting} className="lp-cta">
                          {submitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                style={{ animation:"lp-spin .7s linear infinite" }} />
                              Sending...
                            </span>
                          ) : (
                            <div>
                              <div>→ Request My Data Sample →</div>
                              <div style={{ fontSize:11, fontWeight:500, opacity:.82, marginTop:3 }}>
                                High-Quality. Accurate. Actionable.
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                    </form>

                    {/* Bottom trust indicators */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center"
                      style={{ animation:"lp-fade-up .42s ease .64s both" }}>
                      {[
                        { icon:"⚡", title:"Rapid Delivery",           sub:"Within 1 Business Day"     },
                        { icon:"✅", title:"100% Permission-Based",    sub:"Opt-In Data"               },
                        { icon:"👥", title:"Trusted by 5,000+",        sub:"Businesses"                },
                      ].map(({ icon, title, sub }) => (
                        <div key={title} className="flex flex-col items-center gap-0.5">
                          <span className="text-base">{icon}</span>
                          <div className="text-[10px] font-bold text-slate-700 leading-tight">{title}</div>
                          <div className="text-[9px] text-slate-400">{sub}</div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-center text-[9px] leading-relaxed text-slate-400"
                      style={{ animation:"lp-fade-up .42s ease .72s both" }}>
                      By submitting you agree to Lorann&apos;s{" "}
                      <a href="/privacy-policy" className="underline underline-offset-2 hover:text-indigo-500 transition-colors">
                        Privacy Policy
                      </a>
                      . We never sell or share your personal data.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
