import Link from "next/link";

interface LogoProps {
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ dark = false, size = "md" }: LogoProps) {
  const sizes = {
    sm: { mark: 36, name: "text-xl", tag: "text-[9px]" },
    md: { mark: 44, name: "text-2xl", tag: "text-[10.5px]" },
    lg: { mark: 56, name: "text-3xl", tag: "text-xs" },
  };
  const s = sizes[size];
  const uid = size + (dark ? "-d" : "-l");

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 flex-shrink-0"
      aria-label="Lorann — List Smarter"
    >
      <div
        className="relative flex-shrink-0"
        style={{ width: s.mark, height: s.mark }}
      >
        <svg
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 4px 12px rgba(29, 69, 217, 0.35))" }}
        >
          <defs>
            <radialGradient id={`lg-globe-${uid}`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#4F7DF5" />
              <stop offset="50%" stopColor="#1D45D9" />
              <stop offset="100%" stopColor="#13256E" />
            </radialGradient>
            <radialGradient id={`lg-node-${uid}`}>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#6FD3FF" />
              <stop offset="100%" stopColor="#22BFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="32" fill={`url(#lg-globe-${uid})`} />
          <g stroke="#CDDCFE" strokeWidth="1" fill="none" opacity="0.9">
            <ellipse cx="60" cy="60" rx="32" ry="32" />
            <ellipse cx="60" cy="60" rx="12" ry="32" />
            <ellipse cx="60" cy="60" rx="24" ry="32" />
            <ellipse cx="60" cy="60" rx="32" ry="12" />
            <ellipse cx="60" cy="60" rx="32" ry="24" />
          </g>
          <circle cx="60" cy="36" r="3" fill="#FFFFFF" />
          <circle cx="60" cy="36" r="5" fill={`url(#lg-node-${uid})`} />
          <circle cx="60" cy="84" r="3" fill="#FFFFFF" />
          <circle cx="60" cy="84" r="5" fill={`url(#lg-node-${uid})`} />
          <circle cx="48" cy="60" r="2.5" fill="#FFFFFF" />
          <circle cx="72" cy="60" r="2.5" fill="#FFFFFF" />
          <g
            style={{
              animation: "spin 18s linear infinite reverse",
              transformOrigin: "center",
            }}
          >
            <ellipse
              cx="60"
              cy="60"
              rx="50"
              ry="18"
              fill="none"
              stroke="#6FD3FF"
              strokeWidth="1.5"
              opacity="0.8"
              transform="rotate(30 60 60)"
            />
            <circle
              cx="110"
              cy="60"
              r="3"
              fill="#6FD3FF"
              transform="rotate(30 60 60)"
            />
            <circle
              cx="10"
              cy="60"
              r="3"
              fill="#6FD3FF"
              transform="rotate(30 60 60)"
            />
          </g>
          <g
            style={{
              animation: "spin 22s linear infinite",
              transformOrigin: "center",
            }}
          >
            <ellipse
              cx="60"
              cy="60"
              rx="50"
              ry="18"
              fill="none"
              stroke="#7FA2FB"
              strokeWidth="1.5"
              opacity="0.8"
              transform="rotate(-30 60 60)"
            />
            <circle
              cx="10"
              cy="60"
              r="3"
              fill="#7FA2FB"
              transform="rotate(-30 60 60)"
            />
            <circle
              cx="110"
              cy="60"
              r="3"
              fill="#7FA2FB"
              transform="rotate(-30 60 60)"
            />
          </g>
        </svg>
      </div>
      <div className="flex flex-col leading-none font-display">
        <span
          className={`font-bold tracking-tight ${s.name} ${dark ? "text-white" : "text-blue-700"}`}
        >
          Lorann
        </span>
        <span
          className={`font-medium uppercase tracking-[0.1em] mt-1 flex items-center gap-1.5 ${s.tag} ${dark ? "text-white/50" : "text-blue-500"}`}
        >
          <span
            className={`block flex-none w-2.5 h-[1.5px] ${dark ? "bg-white/30" : "bg-blue-400"}`}
          />
          List Smarter
          <span
            className={`block flex-none w-2.5 h-[1.5px] ${dark ? "bg-white/30" : "bg-blue-400"}`}
          />
        </span>
      </div>
    </Link>
  );
}

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