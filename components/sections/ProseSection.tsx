import RichText from "@/components/RichText";

type ProseHighlight = { label: string; text: any; _key?: string };

export type ProseSectionData = {
  style?: "split" | "centered";
  kicker?: string;
  titlePlain?: string;
  titleAccent?: string;
  paragraphs?: any[];
  highlights?: ProseHighlight[];
  _key?: string;
};

/* ─────────────────────────────────────────────────────────
   LAYOUT A — "split"
   Prose paragraphs on the left, vertical timeline-style
   highlight callouts on the right with a gradient
   connecting line.
   ───────────────────────────────────────────────────────── */
function SplitLayout({ section }: { section: ProseSectionData }) {
  const hasHighlights = section.highlights && section.highlights.length > 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="reveal mb-12 lg:mb-16">
        {section.kicker && (
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            {section.kicker}
          </div>
        )}
        <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900 max-w-3xl">
          {section.titlePlain}{" "}
          {section.titleAccent && (
            <span className="text-gradient">{section.titleAccent}</span>
          )}
        </h2>
      </div>

      <div
        className={`reveal ${
          hasHighlights
            ? "grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start"
            : ""
        }`}
      >
        {/* Prose paragraphs */}
        <div className="space-y-5">
          {(section.paragraphs || []).map((p, i) => (
            <p
              key={i}
              className="text-slate-700 text-[17px] leading-[1.8] tracking-[-0.005em]"
            >
              <RichText value={typeof p === "string" ? p : [p]} />
            </p>
          ))}
        </div>

        {/* Timeline-style highlights */}
        {hasHighlights && (
          <div className="relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-300 rounded-full" />
            <div className="flex flex-col gap-6">
              {section.highlights!.map((h, i) => (
                <div key={h._key || i} className="relative pl-10">
                  <div className="absolute left-[9px] top-[6px] w-[14px] h-[14px] rounded-full border-[3px] border-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_0_3px_rgba(29,69,217,0.12)] z-10" />
                  <div className="bg-white border border-slate-150 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                    <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-blue-700 mb-1.5">
                      {h.label}
                    </div>
                    <p className="text-slate-700 text-[14.5px] leading-relaxed">
                      <RichText value={typeof h.text === "string" ? h.text : h.text} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   LAYOUT B — "centered"
   Dark gradient container with audience-persona highlight
   cards — a completely different visual language from the
   split/timeline layout above.
   ───────────────────────────────────────────────────────── */
const PERSONA_COLORS = [
  { border: "border-l-cyan-400", bg: "bg-cyan-400/10", dot: "bg-cyan-400" },
  { border: "border-l-blue-500", bg: "bg-blue-500/10", dot: "bg-blue-500" },
  { border: "border-l-violet-500", bg: "bg-violet-500/10", dot: "bg-violet-500" },
  { border: "border-l-emerald-400", bg: "bg-emerald-400/10", dot: "bg-emerald-400" },
];

function CenteredLayout({ section }: { section: ProseSectionData }) {
  const hasHighlights = section.highlights && section.highlights.length > 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dark gradient container */}
      <div
        className="relative overflow-hidden rounded-[28px] p-8 lg:p-14 reveal"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(34, 191, 255, 0.18), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
        }}
      >
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(111, 211, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative">
          {/* Header */}
          <div className="mb-10">
            {section.kicker && (
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                {section.kicker}
              </div>
            )}
            <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-white max-w-2xl">
              {section.titlePlain}{" "}
              {section.titleAccent && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                  {section.titleAccent}
                </span>
              )}
            </h2>
          </div>

          {/* Two-column: prose + persona cards */}
          <div className={`${hasHighlights ? "grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start" : ""}`}>
            {/* Prose paragraphs */}
            <div className="space-y-5">
              {(section.paragraphs || []).map((p, i) => (
                <p
                  key={i}
                  className="text-white/70 text-[16px] leading-[1.85] tracking-[-0.005em]"
                >
                  <RichText value={typeof p === "string" ? p : [p]} />
                </p>
              ))}
            </div>

            {/* Audience persona cards — stacked with colored left borders */}
            {hasHighlights && (
              <div className="flex flex-col gap-3 mt-6 lg:mt-0">
                {section.highlights!.map((h, i) => {
                  const color = PERSONA_COLORS[i % PERSONA_COLORS.length];
                  return (
                    <div
                      key={h._key || i}
                      className={`relative border-l-[3px] ${color.border} rounded-xl bg-white/[0.06] backdrop-blur-sm p-5 hover:bg-white/[0.1] transition-all duration-300 group`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className={`w-2 h-2 rounded-full ${color.dot} mt-1.5 flex-shrink-0 shadow-[0_0_6px_currentColor]`} />
                        <div>
                          <div className="font-display font-semibold text-[15px] text-white tracking-[-0.01em] mb-1">
                            {h.label}
                          </div>
                          <p className="text-white/55 text-[13.5px] leading-relaxed">
                            <RichText value={typeof h.text === "string" ? h.text : h.text} />
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   Reads the `style` field to pick the right layout.
   ───────────────────────────────────────────────────────── */
export default function ProseSection({
  section,
  variant = "light",
}: {
  section: ProseSectionData;
  variant?: "light" | "tinted";
}) {
  // Use .includes() instead of === to handle Sanity stega-encoded strings
  // (visual editing injects invisible Unicode chars that break strict equality)
  const isCentered = (section.style || "").includes("centered");

  return (
    <section
      className={`py-20 lg:py-28 ${
        variant === "tinted" ? "radial-stats" : "bg-white"
      }`}
    >
      <div className="container-custom">
        {isCentered ? (
          <CenteredLayout section={section} />
        ) : (
          <SplitLayout section={section} />
        )}
      </div>
    </section>
  );
}
