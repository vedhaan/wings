"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const LEVELS = [
  { label: "Choose", ids: ["top"] },
  { label: "Courses", ids: ["kids", "professionals"] },
  { label: "Process", ids: ["how-it-works"] },
  { label: "Know us", ids: ["find-us", "faq", "about"] },
  { label: "Start", ids: ["start"] },
  { label: "Know us", ids: ["find-us", "faq", "about", "founders"] },
  { label: "Courses", ids: ["kids", "professionals", "women"] },
];

export default function JourneyRail() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const map = new Map<Element, number>();
    LEVELS.forEach((l, i) =>
      l.ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) map.set(el, i);
      })
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = map.get(e.target);
          if (i !== undefined) setActive(i);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    map.forEach((_, el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function goTo(ids: string[]) {
    const el = ids.map((id) => document.getElementById(id)).find(Boolean);
    el?.scrollIntoView({ behavior: "smooth" });
  }

  const last = LEVELS.length - 1;

  return (
    <>
      {/* thin progress bar, all screen sizes */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: bar, transformOrigin: "0% 50%" }}
        className="fixed inset-x-0 top-0 z-[60] h-1.5 bg-gradient-to-r from-wing-cyan via-wing-violet to-wing-sun"
      />

      {/* level rail, large screens only */}
      <nav
        aria-label="Page levels"
        className="fixed right-5 top-1/2 z-40 hidden h-72 w-8 -translate-y-1/2 xl:block"
      >
        <div className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 rounded-full bg-wing-navy/15">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: active / last }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-wing-cyan via-wing-violet to-wing-sun"
          />
        </div>

        {LEVELS.map((l, i) => {
          const lit = i <= active;
          return (
            <div
              key={l.label}
              className="group absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${(i / last) * 100}%` }}
            >
              <motion.button
                type="button"
                onClick={() => goTo(l.ids)}
                aria-label={`Go to level ${i + 1}: ${l.label}`}
                aria-current={i === active ? "step" : undefined}
                animate={{ scale: i === active ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-wing-navy font-display text-xs font-extrabold ${
                  lit ? "bg-wing-sun text-white" : "bg-wing-cream text-wing-navy"
                }`}
              >
                {i + 1}
              </motion.button>

              <span
                className={`pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-wing-navy bg-white px-3 py-1 font-display text-xs font-bold shadow-pop-sm transition-opacity ${
                  i === active
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {l.label}
              </span>
            </div>
          );
        })}
      </nav>
    </>
  );
}