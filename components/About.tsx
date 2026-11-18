"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import SectionArt from "./SectionArt";
import LevelTag from "./LevelTag";
import { ABOUT } from "@/lib/about";

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
}

const STAT_TONES = [
  "bg-wing-cyan text-wing-navy -rotate-1",
  "bg-wing-violet text-white rotate-1",
];

export default function About({ from }: { from: string }) {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 overflow-hidden bg-wing-cream px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36"
      style={{
        backgroundImage:
          "radial-gradient(rgba(20,24,63,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill={from} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <LevelTag n={4} label="About" />
            <span className="inline-block rounded-full border-2 border-wing-navy bg-wing-violet px-4 py-1.5 font-display text-xs font-bold text-white shadow-pop-sm sm:text-sm">
              About WINGS
            </span>
          </div>
          <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            An initiative of {ABOUT.company}
          </h2>
          <div className="mt-5 max-w-xl space-y-4 text-lg text-wing-navy/80">
            {ABOUT.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={ABOUT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-wing-navy bg-wing-navy px-5 py-2.5 font-display text-sm font-bold text-wing-cream shadow-pop-sm transition-all hover:-translate-y-0.5 hover:bg-wing-blue hover:shadow-pop"
          >
            Visit {ABOUT.company}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.1} className="w-full max-w-[420px] lg:ml-auto">
            <SectionArt variant="about" />
          </Reveal>

          {ABOUT.stats && ABOUT.stats.length > 0 && (
            <div className="grid max-w-[420px] gap-5 sm:grid-cols-2 lg:ml-auto">
              {ABOUT.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.15 + i * 0.12}>
                  <div
                    className={`rounded-3xl border-2 border-wing-navy p-5 shadow-pop transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-0 ${
                      STAT_TONES[i % STAT_TONES.length]
                    }`}
                  >
                    <p className="font-display text-5xl font-extrabold leading-none">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 font-display text-base font-bold">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}