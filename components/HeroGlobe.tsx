"use client";

/**
 * Pure-CSS globe — replaces the 280KB Three.js version.
 * Uses CSS transforms, gradients, and keyframes for a lightweight
 * data-globe effect with orbiting rings, nodes, and particles.
 * Zero JavaScript animation loops = zero main-thread blocking.
 */

export default function HeroGlobe() {
  return (
    <div
      className="w-full h-full relative z-[2] select-none"
      aria-hidden
      style={{ perspective: "800px" }}
    >
      {/* ── Globe core ── */}
      <div className="absolute inset-[15%] rounded-full globe-core">
        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(79,125,245,0.35) 0%, rgba(29,69,217,0.2) 40%, rgba(13,27,94,0.15) 70%, transparent 100%)",
          }}
        />
        {/* Wireframe grid overlay — latitude lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden globe-rotate">
          {[20, 35, 50, 65, 80].map((top) => (
            <div
              key={`lat-${top}`}
              className="absolute left-0 right-0 border-t"
              style={{
                top: `${top}%`,
                borderColor: "rgba(79,125,245,0.25)",
                transform: `scaleX(${Math.sin((top / 100) * Math.PI)})`,
              }}
            />
          ))}
          {/* Longitude arcs */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <div
              key={`lon-${deg}`}
              className="absolute inset-0 rounded-full border"
              style={{
                borderColor: "rgba(79,125,245,0.18)",
                transform: `rotateY(${deg}deg)`,
              }}
            />
          ))}
        </div>
        {/* Surface shimmer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
            animation: "globeShimmer 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Orbital rings ── */}
      {[
        { size: "inset-[5%]", dur: "18s", tilt: "rotateX(72deg) rotateZ(15deg)", color: "rgba(111,211,255,0.4)" },
        { size: "inset-[2%]", dur: "24s", tilt: "rotateX(68deg) rotateZ(-20deg)", color: "rgba(79,125,245,0.35)", rev: true },
        { size: "inset-[-2%]", dur: "30s", tilt: "rotateX(75deg) rotateZ(35deg)", color: "rgba(34,191,255,0.25)" },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full border pointer-events-none"
          style={{
            ...parseInset(ring.size),
            borderColor: ring.color,
            transform: ring.tilt,
            animation: `globeOrbitSpin ${ring.dur} linear infinite ${ring.rev ? "reverse" : "normal"}`,
          }}
        >
          {/* Satellite dot */}
          <div
            className="absolute w-2 h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
            style={{
              background: i === 0 ? "#22BFFF" : i === 1 ? "#4F7DF5" : "#6FD3FF",
              boxShadow: `0 0 12px ${i === 0 ? "#22BFFF" : i === 1 ? "#4F7DF5" : "#6FD3FF"}`,
            }}
          />
        </div>
      ))}

      {/* ── Floating data nodes ── */}
      {NODES.map((n, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: n.top,
            left: n.left,
            background: "#fff",
            boxShadow: `0 0 8px rgba(79,125,245,0.8), 0 0 20px rgba(34,191,255,0.4)`,
            animation: `globeNodePulse ${2 + i * 0.3}s ease-in-out infinite ${i * 0.4}s`,
          }}
        />
      ))}

      {/* ── Floating particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            background: p.color,
            opacity: 0,
            animation: `globeParticleDrift ${p.dur}s linear infinite ${i * 0.8}s`,
          }}
        />
      ))}

      {/* ── Animations ── */}
      <style jsx>{`
        .globe-core {
          animation: globeBreathe 6s ease-in-out infinite;
        }
        .globe-rotate {
          animation: globeSpin 25s linear infinite;
          transform-style: preserve-3d;
        }
        @keyframes globeSpin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes globeBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes globeShimmer {
          0%, 100% { opacity: 0.4; transform: rotate(0deg); }
          50% { opacity: 0.8; transform: rotate(8deg); }
        }
        @keyframes globeOrbitSpin {
          from { rotate: z 0deg; }
          to { rotate: z 360deg; }
        }
        @keyframes globeNodePulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
        @keyframes globeParticleDrift {
          0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { opacity: 0; transform: translate(var(--dx, 30px), var(--dy, -60px)) scale(0); }
        }
      `}</style>
    </div>
  );
}

/* Pre-computed positions — no runtime randomness */
const NODES = [
  { top: "28%", left: "42%" },
  { top: "35%", left: "58%" },
  { top: "52%", left: "36%" },
  { top: "48%", left: "62%" },
  { top: "65%", left: "45%" },
  { top: "30%", left: "52%" },
  { top: "58%", left: "55%" },
  { top: "42%", left: "38%" },
  { top: "70%", left: "52%" },
  { top: "38%", left: "48%" },
  { top: "55%", left: "42%" },
  { top: "45%", left: "56%" },
];

const PARTICLES = [
  { top: "15%", left: "20%", size: "3px", dur: 8, color: "rgba(34,191,255,0.7)", "--dx": "40px", "--dy": "-80px" },
  { top: "80%", left: "75%", size: "2px", dur: 10, color: "rgba(79,125,245,0.6)", "--dx": "-30px", "--dy": "-70px" },
  { top: "25%", left: "78%", size: "3px", dur: 9, color: "rgba(111,211,255,0.7)", "--dx": "20px", "--dy": "-90px" },
  { top: "70%", left: "25%", size: "2px", dur: 11, color: "rgba(79,125,245,0.5)", "--dx": "-40px", "--dy": "-60px" },
  { top: "45%", left: "12%", size: "2px", dur: 7, color: "rgba(34,191,255,0.6)", "--dx": "50px", "--dy": "-50px" },
  { top: "60%", left: "85%", size: "3px", dur: 12, color: "rgba(111,211,255,0.5)", "--dx": "-20px", "--dy": "-80px" },
  { top: "20%", left: "55%", size: "2px", dur: 9, color: "rgba(79,125,245,0.7)", "--dx": "30px", "--dy": "-70px" },
  { top: "75%", left: "40%", size: "2px", dur: 10, color: "rgba(34,191,255,0.5)", "--dx": "-35px", "--dy": "-65px" },
] as const;

function parseInset(cls: string): React.CSSProperties {
  const m = cls.match(/inset-\[(-?\d+)%\]/);
  if (!m) return {};
  const v = `${m[1]}%`;
  return { top: v, right: v, bottom: v, left: v };
}
