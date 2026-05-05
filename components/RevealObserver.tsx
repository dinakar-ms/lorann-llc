"use client";

import { useEffect } from "react";

/**
 * Reveal-on-scroll hook component.
 * Registers an IntersectionObserver that adds the `.in` class to any
 * element with the `.reveal` class when it scrolls into view, fading
 * it in. This mirrors the exact behavior used on
 * /solutions/signal-exchange (and every other animated section) on
 * the live Lorann site.
 *
 * Usage: drop <RevealObserver /> once at the top of any page that
 * contains `.reveal` elements. The component renders nothing.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

    // Safety net: if a user has JS-disabled motion preferences or the
    // observer hasn't fired by the time the document has finished loading
    // (rare edge case on very tall pages with content already past the
    // viewport bottom), force everything visible.
    const safety = window.setTimeout(() => {
      document
        .querySelectorAll(".reveal:not(.in)")
        .forEach((el) => el.classList.add("in"));
    }, 1500);

    return () => {
      obs.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return null;
}
