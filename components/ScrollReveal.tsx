"use client";

import { useEffect } from "react";

/**
 * Single IntersectionObserver for all scroll-reveal elements.
 * Merges `.reveal` and `[data-observe]` selectors + count-up animation.
 */
export default function ScrollReveal() {
  useEffect(() => {
    // Use requestIdleCallback to avoid blocking main thread
    const init = () => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target;
            el.classList.add("in", "in-view");

            // Count-up support
            el.querySelectorAll<HTMLElement>("[data-count]").forEach((counter) => {
              if (counter.dataset.done) return;
              counter.dataset.done = "1";
              const target = parseInt(counter.dataset.count || "0", 10);
              const suffix = counter.dataset.suffix || "";
              const duration = 2200;
              const start = performance.now();
              const frame = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(target * eased) + suffix;
                if (progress < 1) requestAnimationFrame(frame);
                else counter.textContent = target + suffix;
              };
              requestAnimationFrame(frame);
            });

            io.unobserve(el);
          }
        },
        { threshold: 0.12 }
      );

      document.querySelectorAll(".reveal, [data-observe]").forEach((el) => io.observe(el));

      return () => io.disconnect();
    };

    // Defer to idle time so it doesn't block first paint
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(init);
      return () => cancelIdleCallback(id);
    } else {
      const t = setTimeout(init, 100);
      return () => clearTimeout(t);
    }
  }, []);

  return null;
}
