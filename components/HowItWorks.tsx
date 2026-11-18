"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import WhatsAppButton from "./WhatsAppButton";
import LevelTag from "./LevelTag";
import { STEPS } from "@/lib/steps";

const NODE_COLORS = [
  "bg-wing-cyan text-wing-navy",
  "bg-wing-blue text-white",
  "bg-wing-violet text-white",
  "bg-wing-sun text-white",
];

const IS_DEV = process.env.NODE_ENV !== "production";

const item: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 18,
      delay: i * 0.12,
    },
  }),
};

const node: Variants = {
  hidden: { scale: 0 },
  show: (i: number) => ({
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 14,
      delay: i * 0.12 + 0.1,
    },
  }),
};

export default function HowItWorks() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 overflow-hidden bg-wing-navy px-4 pb-24 pt-28 text-wing-cream sm:px-6 sm:pb-32 sm:pt-36"
      style={{
        backgroundImage:
          "radial-gradient(rgba(251,246,236,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill="#FDE1EA" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute right-[7%] top-36 hidden h-10 w-10 animate-float rounded-full bg-wing-cyan sm:block" />
        <span
          className="absolute left-[5%] top-[55%] hidden h-6 w-6 rotate-12 animate-float rounded-md bg-wing-sun lg:block"
          style={{ animationDelay: "1.6s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <LevelTag n={3} label="How it works" dark />
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            From first message to first class
          </h2>
          <p className="mt-4 max-w-xl text-lg text-wing-cream/75">
            Four simple steps, and the first one takes a minute.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* progress line: vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden="true"
            className="absolute bottom-7 left-[27px] top-7 w-1 rounded-full bg-wing-cream/15 lg:hidden"
          >
            <motion.div
              style={{ scaleY: progress, transformOrigin: "top" }}
              className="h-full w-full rounded-full bg-gradient-to-b from-wing-cyan via-wing-violet to-wing-sun"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-[26px] hidden h-1 rounded-full bg-wing-cream/15 lg:block"
          >
            <motion.div
              style={{ scaleX: progress, transformOrigin: "left" }}
              className="h-full w-full rounded-full bg-gradient-to-r from-wing-cyan via-wing-violet to-wing-sun"
            />
          </div>

          <ol ref={listRef} className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                custom={i}
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative pl-20 lg:pl-0 lg:pt-20 lg:text-center"
              >
                <motion.span
                  custom={i}
                  variants={node}
                  className={`absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-wing-cream font-display text-xl font-extrabold lg:left-1/2 lg:-translate-x-1/2 ${
                    NODE_COLORS[i % NODE_COLORS.length]
                  }`}
                >
                  {i + 1}
                </motion.span>

                <div className="rounded-3xl border-2 border-wing-navy bg-wing-cream p-5 text-wing-navy transition-transform duration-300 hover:-translate-y-1.5 sm:p-6">
                  <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-wing-navy/75">
                    {step.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {IS_DEV && (
          <p className="mt-10 rounded-xl border border-dashed border-wing-cream/40 px-4 py-3 text-sm text-wing-cream/60">
            Dev note: these steps are placeholders. Replace them with your real
            process in lib/steps.ts.
          </p>
        )}

        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <WhatsAppButton label="Start with step 1" pulse />
            <span className="text-sm text-wing-cream/70">
              Classes held offline in Bhavnagar
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}