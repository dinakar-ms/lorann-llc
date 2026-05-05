// "use client";

// import { useState } from "react";
// import {
//   ShieldCheck, Target, Zap, Activity, GitMerge, Lock,
//   Check, ArrowRight, RefreshCw,
// } from "lucide-react";
// import Link from "next/link";
// import SectionHeader from "../ui/SectionHeader";

// const CARDS = [
//   {
//     variant: "v-1",
//     icon: ShieldCheck,
//     title: "Verified, high-accuracy data",
//     desc: "Every record is continuously verified, deduplicated, and refreshed — so campaigns reach live contacts.",
//     backTitle: "What's inside",
//     backList: [
//       "Monthly phone verification",
//       "Real-time email validation",
//       "Automated deduplication",
//       "Bounce + hard-fail removal",
//     ],
//     link: "mailto:info@lorannllc.com?subject=Data%20Accuracy",
//     accent: "linear-gradient(135deg, #1D45D9, #2F5DEC)",
//     accentBg: "linear-gradient(135deg, #13256E, #162D8C)",
//   },
//   {
//     variant: "v-2",
//     icon: Target,
//     title: "Precision targeting at scale",
//     desc: "Segment by industry, role, intent, geography, and behaviour across B2B, healthcare, and consumer datasets.",
//     backTitle: "Segmentation powers",
//     backList: [
//       "Firmographic filters",
//       "Technographic signals",
//       "Intent & Behavioral data",
//       "Marketing Analytics Modeling",
//     ],
//     link: "/solutions#audience-targeting",
//     accent: "linear-gradient(135deg, #00A7EF, #22BFFF)",
//     accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
//   },
//   {
//     variant: "v-3",
//     icon: Zap,
//     title: "Built for activation",
//     desc: "Audiences deploy directly into CRM, email, Programmatic, and omnichannel workflows — no reformatting, no friction.",
//     backTitle: "Native integrations",
//     backList: [
//       "Salesforce, HubSpot, Marketo",
//       "LinkedIn, Meta, Google Ads",
//       "Direct mail workflows",
//       "Custom CSV / API delivery",
//     ],
//     link: "/solutions#data-activation",
//     accent: "linear-gradient(135deg, #1736B3, #00A7EF)",
//     accentBg: "linear-gradient(135deg, #162D8C, #008AC7)",
//   },
//   {
//     variant: "v-4",
//     icon: Activity,
//     title: "Signal intelligence",
//     desc: "Signal eXchange™ layers first-party lead data with intent signals — producing audiences that convert at higher rates.",
//     backTitle: "Signal eXchange™ power",
//     backList: [
//       "First-party lead data layer",
//       "Real-time intent signals",
//       "Continuous profile refresh",
//       "Higher-converting audiences",
//     ],
//     link: "/signal-exchange",
//     accent: "linear-gradient(135deg, #2F5DEC, #00A7EF)",
//     accentBg: "linear-gradient(135deg, #1736B3, #0C4A6E)",
//   },
//   {
//     variant: "v-5",
//     icon: GitMerge,
//     title: "Flexible delivery",
//     desc: "We work with your existing platforms and stack — delivering data in formats aligned to your campaign workflows.",
//     backTitle: "Delivery options",
//     backList: [
//       "CSV, Excel, JSON, XML",
//       "REST API integration",
//       "SFTP / secure transfer",
//       "Scheduled refresh cycles",
//     ],
//     link: "mailto:info@lorannllc.com?subject=Delivery",
//     accent: "linear-gradient(135deg, #162D8C, #1D45D9)",
//     accentBg: "linear-gradient(135deg, #13256E, #1736B3)",
//   },
//   {
//     variant: "v-6",
//     icon: Lock,
//     title: "Privacy-first compliance",
//     desc: "GDPR, CCPA, and CAN-SPAM compliant across all datasets. Strong governance from source to delivery.",
//     backTitle: "Compliance framework",
//     backList: [
//       "GDPR / UK-GDPR",
//       "CCPA / CPRA",
//       "CAN-SPAM Act",
//       "HIPAA-conscious practices",
//     ],
//     link: "mailto:info@lorannllc.com?subject=Compliance",
//     accent: "linear-gradient(135deg, #008AC7, #22BFFF)",
//     accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
//   },
// ];

// export default function ValueProps() {
//   // Tracks which cards are currently flipped to the back face.
//   // Used on every device — taps toggle, and on desktop the CSS :hover rule
//   // (scoped to hover-capable devices) still flips cards on cursor enter.
//   const [flipped, setFlipped] = useState<Set<number>>(new Set());

//   // const toggle = (i: number) => {
//   //   setFlipped((prev) => {
//   //     const next = new Set(prev);
//   //     if (next.has(i)) next.delete(i);
//   //     else next.add(i);
//   //     return next;
//   //   });
//   // };

//   const toggle = (i: number) => {
//   // Delete this line ↓
//   // if (!window.matchMedia("(hover: none)").matches) return;
//   setFlipped((prev) => {
//     const next = new Set(prev);
//     if (next.has(i)) next.delete(i);
//     else next.add(i);
//     return next;
//   });
// };

//   return (
//     <section id="value" className="py-24 lg:py-32">
//       <div className="container-custom">
//         <SectionHeader
//           kicker="Why Lorann"
//           title={
//             <>
//               The data advantage that
//               <br />
//               drives <span className="text-gradient">real performance</span>
//             </>
//           }
//           // Updated copy: works on touch (iPad, iPhone) where there is no hover.
//           description="Tap or hover any card to explore. Purpose-built for teams that need more than a list — they need audiences that perform."
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {CARDS.map((card, i) => (
//             // <div
//             //   key={card.variant}
//             //   className={`flip-card reveal ${flipped.has(i) ? "flipped" : ""}`}
//             //   onClick={() => toggle(i)}
//             //   role="button"
//             //   tabIndex={0}
//             //   aria-pressed={flipped.has(i)}
//             //   onKeyDown={(e) => {
//             //     if (e.key === "Enter" || e.key === " ") {
//             //       e.preventDefault();
//             //       toggle(i);
//             //     }
//             //   }}
//             // >
//             <div
//   key={card.variant}
//   className={`flip-card reveal ${flipped.has(i) ? "flipped" : ""}`}
//   onClick={(e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     toggle(i);
//   }}
//   role="button"
//   tabIndex={0}
//   onKeyDown={(e) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       toggle(i);
//     }
//   }}
// >
//               <div className="flip-inner">
//                 <div
//                   className="flip-front bg-white shadow-md"
//                   style={{ borderTop: "3px solid transparent" }}
//                 >
//                   <div
//                     className="absolute top-0 left-0 right-0 h-[3px]"
//                     style={{ background: card.accent }}
//                   />
//                   <div
//                     className="w-14 h-14 rounded-[14px] grid place-items-center mb-5 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] relative flex-shrink-0"
//                     style={{ background: card.accent }}
//                   >
//                     <card.icon className="w-6 h-6" />
//                     <div
//                       className="absolute -inset-2 rounded-[18px] opacity-25 blur-[14px] -z-10"
//                       style={{ background: card.accent }}
//                     />
//                   </div>
//                   <h3 className="font-display font-semibold text-xl mb-2.5 tracking-tight text-slate-900">
//                     {card.title}
//                   </h3>
//                   <p className="text-slate-600 text-[14.5px] leading-relaxed flex-1">
//                     {card.desc}
//                   </p>
//                   <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] text-blue-600 uppercase tracking-wider opacity-70">
//                     Tap to explore <RefreshCw className="w-3 h-3" />
//                   </span>
//                 </div>
//                 <div
//                   className="flip-back text-white"
//                   style={{ background: card.accentBg }}
//                 >
//                   <h4 className="font-display font-semibold text-lg mb-4 tracking-tight flex-shrink-0">
//                     {card.backTitle}
//                   </h4>
//                   <ul className="list-none flex flex-col gap-2.5 mb-auto">
//                     {card.backList.map((item) => (
//                       <li
//                         key={item}
//                         className="flex items-start gap-2.5 text-[13.5px] leading-relaxed opacity-90"
//                       >
//                         <Check className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-cyan-300" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                   <Link
//                     href={card.link}
//                     onClick={(e) => e.stopPropagation()}
//                     className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan-300 hover:gap-2.5 transition-all self-start"
//                   >
//                     Learn more <ArrowRight className="w-3.5 h-3.5" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useState } from "react";
// import {
//   ShieldCheck, Target, Zap, Activity, GitMerge, Lock,
//   Check, ArrowRight, RefreshCw,
// } from "lucide-react";
// import Link from "next/link";
// import SectionHeader from "../ui/SectionHeader";

// const CARDS = [
//   {
//     variant: "v-1",
//     icon: ShieldCheck,
//     title: "Verified, high-accuracy data",
//     desc: "Every record is continuously verified, deduplicated, and refreshed — so campaigns reach live contacts.",
//     backTitle: "What's inside",
//     backList: [
//       "Monthly phone verification",
//       "Real-time email validation",
//       "Automated deduplication",
//       "Bounce + hard-fail removal",
//     ],
//     link: "/why-lorann/verified-data",
//     accent: "linear-gradient(135deg, #1D45D9, #2F5DEC)",
//     accentBg: "linear-gradient(135deg, #13256E, #162D8C)",
//   },
//   {
//     variant: "v-2",
//     icon: Target,
//     title: "Precision targeting at scale",
//     desc: "Segment by industry, role, intent, geography, and behavior across B2B, healthcare, and consumer datasets.",
//     backTitle: "Segmentation powers",
//     backList: [
//       "Firmographic filters",
//       "Technographic signals",
//       "Intent & Behavioral data",
//       "Marketing Analytics Modeling",
//     ],
//     link: "/why-lorann/precision-targeting",
//     accent: "linear-gradient(135deg, #00A7EF, #22BFFF)",
//     accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
//   },
//   {
//     variant: "v-3",
//     icon: Zap,
//     title: "Built for activation",
//     desc: "Audiences deploy directly into CRM, email, Programmatic, and omnichannel workflows — no reformatting, no friction.",
//     backTitle: "Native integrations",
//     backList: [
//       "Salesforce, HubSpot, Marketo",
//       "LinkedIn, Meta, Google Ads",
//       "Direct mail workflows",
//       "Custom CSV / API delivery",
//     ],
//     link: "/solutions/data-activation",
//     accent: "linear-gradient(135deg, #1736B3, #00A7EF)",
//     accentBg: "linear-gradient(135deg, #162D8C, #008AC7)",
//   },
//   {
//     variant: "v-4",
//     icon: Activity,
//     title: "Signal intelligence",
//     desc: "Signal eXchange™ layers first-party lead data with intent signals — producing audiences that convert at higher rates.",
//     backTitle: "Signal eXchange™ power",
//     backList: [
//       "First-party lead data layer",
//       "Real-time intent signals",
//       "Continuous profile refresh",
//       "Higher-converting audiences",
//     ],
//     link: "/solutions/signal-exchange",
//     accent: "linear-gradient(135deg, #2F5DEC, #00A7EF)",
//     accentBg: "linear-gradient(135deg, #1736B3, #0C4A6E)",
//   },
//   {
//     variant: "v-5",
//     icon: GitMerge,
//     title: "Flexible delivery",
//     desc: "We work with your existing platforms and stack — delivering data in formats aligned to your campaign workflows.",
//     backTitle: "Delivery options",
//     backList: [
//       "CSV, Excel, JSON, XML",
//       "REST API integration",
//       "SFTP / secure transfer",
//       "Scheduled refresh cycles",
//     ],
//     link: "/why-lorann/flexible-delivery",
//     accent: "linear-gradient(135deg, #162D8C, #1D45D9)",
//     accentBg: "linear-gradient(135deg, #13256E, #1736B3)",
//   },
//   {
//     variant: "v-6",
//     icon: Lock,
//     title: "Privacy-first compliance",
//     desc: "GDPR, CCPA, and CAN-SPAM compliant across all datasets. Strong governance from source to delivery.",
//     backTitle: "Compliance framework",
//     backList: [
//       "GDPR / UK-GDPR",
//       "CCPA / CPRA",
//       "CAN-SPAM Act",
//       "HIPAA-conscious practices",
//     ],
//     link: "/why-lorann/privacy-compliance",
//     accent: "linear-gradient(135deg, #008AC7, #22BFFF)",
//     accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
//   },
// ];

// // Helper: a route that lives inside the Next.js app starts with "/" (and isn't
// // a protocol-relative URL like "//example.com").
// const isInternal = (href: string) =>
//   href.startsWith("/") && !href.startsWith("//");

// export default function ValueProps() {
//   // Track which cards are currently showing the back face.
//   const [flipped, setFlipped] = useState<Set<number>>(new Set());

//   const toggle = (i: number) => {
//     setFlipped((prev) => {
//       const next = new Set(prev);
//       if (next.has(i)) next.delete(i);
//       else next.add(i);
//       return next;
//     });
//   };

//   return (
//     <section id="value" className="py-24 lg:py-32">
//       <div className="container-custom">
//         <SectionHeader
//           kicker="Why Lorann"
//           title={
//             <>
//               The data advantage that
//               <br />
//               drives <span className="text-gradient">real performance</span>
//             </>
//           }
//           description="Tap or hover any card to explore. Purpose-built for teams that need more than a list — they need audiences that perform."
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {CARDS.map((card, i) => {
//             const isFlipped = flipped.has(i);
//             const internal = isInternal(card.link);

//             const handleFlip = () => toggle(i);
//             const handleKeyDown = (e: React.KeyboardEvent) => {
//               if (e.key === "Enter" || e.key === " ") {
//                 e.preventDefault();
//                 toggle(i);
//               }
//             };

//             return (
//               <div
//                 key={card.variant}
//                 className={`flip-card reveal ${isFlipped ? "flipped" : ""}`}
//               >
//                 <div className="flip-inner">
//                   {/* FRONT — only clickable surface for flipping. */}
//                   <div
//                     className="flip-front bg-white shadow-md cursor-pointer"
//                     style={{ borderTop: "3px solid transparent" }}
//                     role="button"
//                     tabIndex={0}
//                     aria-pressed={isFlipped}
//                     aria-label={`${card.title} — tap to see details`}
//                     onClick={handleFlip}
//                     onKeyDown={handleKeyDown}
//                   >
//                     <div
//                       className="absolute top-0 left-0 right-0 h-[3px]"
//                       style={{ background: card.accent }}
//                     />
//                     <div
//                       className="w-14 h-14 rounded-[14px] grid place-items-center mb-5 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] relative flex-shrink-0"
//                       style={{ background: card.accent }}
//                     >
//                       <card.icon className="w-6 h-6" />
//                       <div
//                         className="absolute -inset-2 rounded-[18px] opacity-25 blur-[14px] -z-10"
//                         style={{ background: card.accent }}
//                       />
//                     </div>
//                     <h3 className="font-display font-semibold text-xl mb-2.5 tracking-tight text-slate-900">
//                       {card.title}
//                     </h3>
//                     <p className="text-slate-600 text-[14.5px] leading-relaxed flex-1">
//                       {card.desc}
//                     </p>
//                     <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] text-blue-600 uppercase tracking-wider opacity-70">
//                       Tap to explore <RefreshCw className="w-3 h-3" />
//                     </span>
//                   </div>

//                   {/* BACK — NOT a button. Link navigates with no handler conflict. */}
//                   <div
//                     className="flip-back text-white"
//                     style={{ background: card.accentBg }}
//                   >
//                     <h4 className="font-display font-semibold text-lg mb-4 tracking-tight flex-shrink-0">
//                       {card.backTitle}
//                     </h4>
//                     <ul className="list-none flex flex-col gap-2.5 mb-auto">
//                       {card.backList.map((item) => (
//                         <li
//                           key={item}
//                           className="flex items-start gap-2.5 text-[13.5px] leading-relaxed opacity-90"
//                         >
//                           <Check className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-cyan-300" />
//                           {item}
//                         </li>
//                       ))}
//                     </ul>

//                     {internal ? (
//                       <Link
//                         href={card.link}
//                         className="learn-more-link mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan-300 hover:gap-2.5 transition-all self-start relative z-10"
//                       >
//                         Learn more <ArrowRight className="w-3.5 h-3.5" />
//                       </Link>
//                     ) : (
//                       <a
//                         href={card.link}
//                         className="learn-more-link mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan-300 hover:gap-2.5 transition-all self-start relative z-10"
//                         {...(card.link.startsWith("http")
//                           ? { target: "_blank", rel: "noopener noreferrer" }
//                           : {})}
//                       >
//                         Learn more <ArrowRight className="w-3.5 h-3.5" />
//                       </a>
//                     )}

//                     {/* Small flip-back button on the back so users can return without
//                         accidentally tapping the Learn More link. */}
//                     <button
//                       type="button"
//                       onClick={handleFlip}
//                       aria-label="Flip card back"
//                       className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors"
//                     >
//                       <RefreshCw className="w-3.5 h-3.5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import {
  ShieldCheck, Target, Zap, Activity, GitMerge, Lock,
  Check, ArrowRight, RefreshCw,
} from "lucide-react";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";

const CARDS = [
  {
    variant: "v-1",
    icon: ShieldCheck,
    title: "Verified, high-accuracy data",
    desc: "Every record is continuously verified, deduplicated, and refreshed — so campaigns reach live contacts.",
    backTitle: "What's inside",
    backList: [
      "Monthly phone verification",
      "Real-time email validation",
      "Automated deduplication",
      "Bounce + hard-fail removal",
    ],
    link: "/why-lorann/verified-data",
    accent: "linear-gradient(135deg, #1D45D9, #2F5DEC)",
    accentBg: "linear-gradient(135deg, #13256E, #162D8C)",
  },
  {
    variant: "v-2",
    icon: Target,
    title: "Precision targeting at scale",
    desc: "Segment by industry, role, intent, geography, and behavior across B2B, healthcare, and consumer datasets.",
    backTitle: "Segmentation powers",
    backList: [
      "Firmographic filters",
      "Technographic signals",
      "Intent & Behavioral data",
      "Marketing Analytics Modeling",
    ],
    link: "/why-lorann/precision-targeting",
    accent: "linear-gradient(135deg, #00A7EF, #22BFFF)",
    accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
  },
  {
    variant: "v-3",
    icon: Zap,
    title: "Built for activation",
    desc: "Audiences deploy directly into CRM, email, Programmatic, and omnichannel workflows — no reformatting, no friction.",
    backTitle: "Native integrations",
    backList: [
      "Salesforce, HubSpot, Marketo",
      "LinkedIn, Meta, Google Ads",
      "Direct mail workflows",
      "Custom CSV / API delivery",
    ],
    link: "/solutions/data-activation",
    accent: "linear-gradient(135deg, #1736B3, #00A7EF)",
    accentBg: "linear-gradient(135deg, #162D8C, #008AC7)",
  },
  {
    variant: "v-4",
    icon: Activity,
    title: "Signal intelligence",
    desc: "Signal eXchange™ layers first-party lead data with intent signals — producing audiences that convert at higher rates.",
    backTitle: "Signal eXchange™ power",
    backList: [
      "First-party lead data layer",
      "Real-time intent signals",
      "Continuous profile refresh",
      "Higher-converting audiences",
    ],
    link: "/solutions/signal-exchange",
    accent: "linear-gradient(135deg, #2F5DEC, #00A7EF)",
    accentBg: "linear-gradient(135deg, #1736B3, #0C4A6E)",
  },
  {
    variant: "v-5",
    icon: GitMerge,
    title: "Flexible delivery",
    desc: "We work with your existing platforms and stack — delivering data in formats aligned to your campaign workflows.",
    backTitle: "Delivery options",
    backList: [
      "CSV, Excel, JSON, XML",
      "REST API integration",
      "SFTP / secure transfer",
      "Scheduled refresh cycles",
    ],
    link: "/why-lorann/flexible-delivery",
    accent: "linear-gradient(135deg, #162D8C, #1D45D9)",
    accentBg: "linear-gradient(135deg, #13256E, #1736B3)",
  },
  {
    variant: "v-6",
    icon: Lock,
    title: "Privacy-first compliance",
    desc: "GDPR, CCPA, and CAN-SPAM compliant across all datasets. Strong governance from source to delivery.",
    backTitle: "Compliance framework",
    backList: [
      "GDPR / UK-GDPR",
      "CCPA / CPRA",
      "CAN-SPAM Act",
      "HIPAA-conscious practices",
    ],
    link: "/why-lorann/privacy-compliance",
    accent: "linear-gradient(135deg, #008AC7, #22BFFF)",
    accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
  },
];

export default function ValueProps() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section id="value" className="py-24 lg:py-32">
      <div className="container-custom">
        <SectionHeader
          kicker="Why Lorann"
          title={
            <>
              The data advantage that
              <br />
              drives <span className="text-gradient">real performance</span>
            </>
          }
          description="Tap or hover any card to explore. Purpose-built for teams that need more than a list — they need audiences that perform."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const isFlipped = flipped.has(i);
            const handleFlip = () => toggle(i);
            const handleKeyDown = (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
              }
            };

            return (
              <div
                key={card.variant}
                className={`flip-card ${isFlipped ? "flipped" : ""}`}
              >
                <div className="flip-inner">
                  {/* FRONT — only clickable surface for flipping. */}
                  <div
                    className="flip-front bg-white shadow-md cursor-pointer"
                    style={{ borderTop: "3px solid transparent" }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isFlipped}
                    aria-label={`${card.title} — tap to see details`}
                    onClick={handleFlip}
                    onKeyDown={handleKeyDown}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ background: card.accent }}
                    />
                    <div
                      className="w-14 h-14 rounded-[14px] grid place-items-center mb-5 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] relative flex-shrink-0"
                      style={{ background: card.accent }}
                    >
                      <card.icon className="w-6 h-6" />
                      <div
                        className="absolute -inset-2 rounded-[18px] opacity-25 blur-[14px] -z-10"
                        style={{ background: card.accent }}
                      />
                    </div>
                    <h3 className="font-display font-semibold text-xl mb-2.5 tracking-tight text-slate-900">
                      {card.title}
                    </h3>
                    <p className="text-slate-600 text-[14.5px] leading-relaxed flex-1">
                      {card.desc}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] text-blue-600 uppercase tracking-wider opacity-70">
                      Tap to explore <RefreshCw className="w-3 h-3" />
                    </span>
                  </div>

                  {/* BACK — Learn More link, always navigates to a real page. */}
                  <div
                    className="flip-back text-white"
                    style={{ background: card.accentBg }}
                  >
                    <h4 className="font-display font-semibold text-lg mb-4 tracking-tight flex-shrink-0">
                      {card.backTitle}
                    </h4>
                    <ul className="list-none flex flex-col gap-2.5 mb-auto">
                      {card.backList.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13.5px] leading-relaxed opacity-90"
                        >
                          <Check className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-cyan-300" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={card.link}
                      className="learn-more-link mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-cyan-300 hover:gap-2.5 transition-all self-start relative z-10"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleFlip}
                      aria-label="Flip card back"
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
