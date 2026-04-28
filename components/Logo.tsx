// import Link from "next/link";

// interface LogoProps {
//   dark?: boolean;
//   size?: "sm" | "md" | "lg";
// }

// export default function Logo({ dark = false, size = "md" }: LogoProps) {
//   const sizes = {
//     sm: { mark: 36, name: "text-xl", tag: "text-[9px]" },
//     md: { mark: 44, name: "text-2xl", tag: "text-[10.5px]" },
//     lg: { mark: 56, name: "text-3xl", tag: "text-xs" },
//   };
//   const s = sizes[size];
//   const uid = size + (dark ? "-d" : "-l");

//   return (
//     <Link
//       href="/"
//       className="inline-flex items-center gap-3 flex-shrink-0"
//       aria-label="Lorann — List Smarter"
//     >
//       <div
//         className="relative flex-shrink-0"
//         style={{ width: s.mark, height: s.mark }}
//       >
//         <svg
//           viewBox="0 0 120 120"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-full h-full"
//           style={{ filter: "drop-shadow(0 4px 12px rgba(29, 69, 217, 0.35))" }}
//         >
//           <defs>
//             <radialGradient id={`lg-globe-${uid}`} cx="40%" cy="35%" r="65%">
//               <stop offset="0%" stopColor="#4F7DF5" />
//               <stop offset="50%" stopColor="#1D45D9" />
//               <stop offset="100%" stopColor="#13256E" />
//             </radialGradient>
//             <radialGradient id={`lg-node-${uid}`}>
//               <stop offset="0%" stopColor="#FFFFFF" />
//               <stop offset="40%" stopColor="#6FD3FF" />
//               <stop offset="100%" stopColor="#22BFFF" stopOpacity="0" />
//             </radialGradient>
//           </defs>
//           <circle cx="60" cy="60" r="32" fill={`url(#lg-globe-${uid})`} />
//           <g stroke="#CDDCFE" strokeWidth="1" fill="none" opacity="0.9">
//             <ellipse cx="60" cy="60" rx="32" ry="32" />
//             <ellipse cx="60" cy="60" rx="12" ry="32" />
//             <ellipse cx="60" cy="60" rx="24" ry="32" />
//             <ellipse cx="60" cy="60" rx="32" ry="12" />
//             <ellipse cx="60" cy="60" rx="32" ry="24" />
//           </g>
//           <circle cx="60" cy="36" r="3" fill="#FFFFFF" />
//           <circle cx="60" cy="36" r="5" fill={`url(#lg-node-${uid})`} />
//           <circle cx="60" cy="84" r="3" fill="#FFFFFF" />
//           <circle cx="60" cy="84" r="5" fill={`url(#lg-node-${uid})`} />
//           <circle cx="48" cy="60" r="2.5" fill="#FFFFFF" />
//           <circle cx="72" cy="60" r="2.5" fill="#FFFFFF" />
//           <g
//             style={{
//               animation: "spin 18s linear infinite reverse",
//               transformOrigin: "center",
//             }}
//           >
//             <ellipse
//               cx="60"
//               cy="60"
//               rx="50"
//               ry="18"
//               fill="none"
//               stroke="#6FD3FF"
//               strokeWidth="1.5"
//               opacity="0.8"
//               transform="rotate(30 60 60)"
//             />
//             <circle
//               cx="110"
//               cy="60"
//               r="3"
//               fill="#6FD3FF"
//               transform="rotate(30 60 60)"
//             />
//             <circle
//               cx="10"
//               cy="60"
//               r="3"
//               fill="#6FD3FF"
//               transform="rotate(30 60 60)"
//             />
//           </g>
//           <g
//             style={{
//               animation: "spin 22s linear infinite",
//               transformOrigin: "center",
//             }}
//           >
//             <ellipse
//               cx="60"
//               cy="60"
//               rx="50"
//               ry="18"
//               fill="none"
//               stroke="#7FA2FB"
//               strokeWidth="1.5"
//               opacity="0.8"
//               transform="rotate(-30 60 60)"
//             />
//             <circle
//               cx="10"
//               cy="60"
//               r="3"
//               fill="#7FA2FB"
//               transform="rotate(-30 60 60)"
//             />
//             <circle
//               cx="110"
//               cy="60"
//               r="3"
//               fill="#7FA2FB"
//               transform="rotate(-30 60 60)"
//             />
//           </g>
//         </svg>
//       </div>
//       <div className="flex flex-col leading-none font-display">
//         <span
//           className={`font-bold tracking-tight ${s.name} ${dark ? "text-white" : "text-blue-700"}`}
//         >
//           Lorann
//         </span>
//         <span
//           className={`font-medium uppercase tracking-[0.1em] mt-1 flex items-center gap-1.5 ${s.tag} ${dark ? "text-white/50" : "text-blue-500"}`}
//         >
//           <span
//             className={`block flex-none w-2.5 h-[1.5px] ${dark ? "bg-white/30" : "bg-blue-400"}`}
//           />
//           List Smarter
//           <span
//             className={`block flex-none w-2.5 h-[1.5px] ${dark ? "bg-white/30" : "bg-blue-400"}`}
//           />
//         </span>
//       </div>
//     </Link>
//   );
// }

// import Image from "next/image";

// export default function Logo() {
//   return (
//     <Image
//       src="/logo.jpg"
//       alt="Lorann Logo"
//       width={220}
//       height={70}
//       className="h-20 w-auto object-contain"
//     />
//   );
// }

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  dark?: boolean; // kept for API compatibility (e.g., dark navbars / footers)
  size?: "sm" | "md" | "lg";
}

export default function Logo({ dark = false, size = "md" }: LogoProps) {
  // Display heights tuned for the navbar.
  // Width auto-derives from the source's 3.22:1 aspect ratio.
  //   sm → 40px tall, ≈ 129px wide
  //   md → 52px tall, ≈ 167px wide   ← default, drops cleanly into the existing nav
  //   lg → 64px tall, ≈ 206px wide
  // The "List Smarter" subtitle is small in the source artwork, so
  // anything under ~40px starts to make it unreadable. These heights
  // keep both the wordmark and the tagline legible.
  const heights = { sm: 40, md: 52, lg: 64 };
  const h = heights[size];

  return (
    <Link
      href="/"
      className="inline-flex items-center flex-shrink-0"
      aria-label="Lorann — List Smarter"
    >
      <Image
        src="/lorann-logo2.png"
        alt="Lorann — List Smarter"
        // Intrinsic dimensions of the source PNG (1200×373, 3.22:1).
        // Next.js uses these only for the aspect-ratio reservation and srcset.
        width={1200}
        height={373}
        // `sizes` tells Next.js which srcset variant to deliver to the browser.
        // "256px" → on a 2× DPI retina display the browser fetches the ≈384-512px
        // wide variant, giving 2-3× display-width headroom = razor-sharp rendering
        // at every nav size we use.
        sizes="(max-width: 640px) 200px, 256px"
        // Above-the-fold asset — preload it instead of lazy-loading.
        // Also avoids the brief blur-in flash that lazy images can cause.
        priority
        // 95 is visually indistinguishable from 100 but ships fewer bytes.
        // Keeps gradients and the soft glow on the globe icon clean.
        quality={95}
        className="w-auto object-contain select-none"
        style={{ height: `${h}px` }}
        // Prevent any accidental zoom-blur on touch devices
        draggable={false}
      />
    </Link>
  );
}
