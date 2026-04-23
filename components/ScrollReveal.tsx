"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            // Count-up support
            entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
              if (el.dataset.done) return;
              el.dataset.done = "1";
              const target = parseInt(el.dataset.count || "0", 10);
              const suffix = el.dataset.suffix || "";
              const duration = 2200;
              const start = performance.now();
              const frame = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased) + suffix;
                if (progress < 1) requestAnimationFrame(frame);
                else el.textContent = target + suffix;
              };
              requestAnimationFrame(frame);
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            entry.target.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
              if (el.dataset.done) return;
              el.dataset.done = "1";
              const target = parseInt(el.dataset.count || "0", 10);
              const suffix = el.dataset.suffix || "";
              const duration = 2200;
              const start = performance.now();
              const frame = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(target * eased) + suffix;
                if (progress < 1) requestAnimationFrame(frame);
                else el.textContent = target + suffix;
              };
              requestAnimationFrame(frame);
            });
            io2.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document
      .querySelectorAll("[data-observe]")
      .forEach((el) => io2.observe(el));

    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  return null;
}
