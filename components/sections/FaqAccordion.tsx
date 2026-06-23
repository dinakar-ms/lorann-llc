"use client";

import { useState } from "react";
import RichText from "@/components/RichText";

type FaqItem = { question: string; answer: any; _key?: string };

function FaqCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-500 ease-out overflow-hidden ${
        isOpen
          ? "border-blue-200 bg-white shadow-[0_8px_40px_-12px_rgba(29,69,217,0.12)]"
          : "border-slate-150 bg-white hover:border-blue-100 hover:shadow-md"
      }`}
    >
      {/* Gradient accent bar on left edge */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-500 ${
          isOpen
            ? "bg-gradient-to-b from-blue-600 via-cyan-500 to-blue-400 opacity-100"
            : "bg-blue-200 opacity-0 group-hover:opacity-40"
        }`}
      />

      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 px-7 py-6 text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <span
          className={`flex-shrink-0 w-9 h-9 rounded-xl text-[13px] font-bold font-mono grid place-items-center transition-all duration-500 ${
            isOpen
              ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_4px_12px_-2px_rgba(29,69,217,0.35)]"
              : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className={`flex-1 font-display font-semibold text-[16px] lg:text-[17px] tracking-[-0.01em] leading-snug transition-colors duration-300 ${
            isOpen ? "text-slate-900" : "text-slate-800"
          }`}
        >
          {item.question}
        </h3>

        {/* Animated plus/minus icon */}
        <span className="relative flex-shrink-0 w-8 h-8 rounded-lg grid place-items-center">
          <span
            className={`absolute w-4 h-[2px] rounded-full transition-all duration-400 ${
              isOpen ? "bg-blue-600 rotate-0" : "bg-slate-400 group-hover:bg-blue-500"
            }`}
          />
          <span
            className={`absolute w-4 h-[2px] rounded-full transition-all duration-400 ${
              isOpen
                ? "bg-blue-600 rotate-0 opacity-0"
                : "bg-slate-400 rotate-90 group-hover:bg-blue-500"
            }`}
          />
        </span>
      </button>

      {/* Animated answer panel */}
      <div
        className={`grid transition-all duration-500 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pl-10 sm:px-7 sm:pb-7 sm:pl-[4.5rem]">
            <div className="text-slate-600 text-[15px] leading-[1.75] prose-p:mb-3 last:prose-p:mb-0">
              <RichText value={item.answer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(29, 69, 217, 0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="container-custom relative">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-blue-400" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              FAQ
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400" />
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
            Frequently asked{" "}
            <span className="text-gradient">questions</span>
          </h2>
        </div>

        {/* FAQ grid */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {items.map((item, idx) => (
            <FaqCard
              key={item._key || idx}
              item={item}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
