"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import CourseCard, { type Theme } from "./CourseCard";
import SectionWave from "./SectionWave";
import SectionArt from "./SectionArt";
import LevelTag from "./LevelTag";
import WhatsAppButton from "./WhatsAppButton";
import type { Course } from "@/lib/courses";

type Layout = "stagger" | "bento";

type Props = {
  id: "kids" | "professionals";
  theme: Theme;
  chip: string;
  title: string;
  subtitle: string;
  courses: Course[];
  levelLabel: string;
  layout: Layout;
  watermark: string;
  from: string;
};

const BG: Record<Theme, string> = {
  cyan: "bg-wing-cyan-soft",
  violet: "bg-wing-violet-soft",
};

const CHIP: Record<Theme, string> = {
  cyan: "bg-wing-cyan text-wing-navy",
  violet: "bg-wing-violet text-white",
};

const ACCENT: Record<Theme, string> = {
  cyan: "bg-wing-cyan",
  violet: "bg-wing-violet",
};

const GRID: Record<Layout, string> = {
  stagger: "md:grid-cols-2 lg:grid-cols-3",
  bento: "md:grid-cols-2 lg:grid-cols-12",
};

function cardClass(layout: Layout, i: number) {
  if (layout === "stagger") return i === 1 ? "lg:mt-10" : "";
  return ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"][
    i % 4
  ];
}

export default function CourseSection({
  id,
  theme,
  chip,
  title,
  subtitle,
  courses,
  levelLabel,
  layout,
  watermark,
  from,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const wmX = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative scroll-mt-20 overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36 ${BG[theme]}`}
      style={{
        backgroundImage:
          "radial-gradient(rgba(20,24,63,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill={from} />

      <motion.div
        aria-hidden="true"
        style={{ x: wmX, WebkitTextStroke: "2px rgba(20,24,63,0.12)" }}
        className="pointer-events-none absolute left-0 top-24 hidden select-none whitespace-nowrap font-display text-[26vw] font-extrabold leading-none text-transparent will-change-transform sm:top-28 sm:block"
      >
        {watermark}
      </motion.div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <LevelTag n={2} label="Courses" />
              <span
                className={`inline-block rounded-full border-2 border-wing-navy px-4 py-1.5 font-display text-xs font-bold shadow-pop-sm sm:text-sm ${CHIP[theme]}`}
              >
                {chip}
              </span>
              <span className="inline-block rounded-full border-2 border-wing-navy bg-white px-3 py-1.5 font-display text-xs font-bold sm:text-sm">
                {courses.length} courses
              </span>
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-wing-navy/80">
              {subtitle}
            </p>
          </Reveal>

          <Reveal
            delay={0.15}
            className="w-full max-w-[420px] justify-self-center lg:justify-self-end"
          >
            <SectionArt variant={id === "kids" ? "kids" : "pros"} />
          </Reveal>
        </div>

        <div className={`mt-14 grid gap-6 ${GRID[layout]}`}>
          {courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              index={i}
              theme={theme}
              audience={id}
              levelLabel={levelLabel}
              className={cardClass(layout, i)}
            />
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border-2 border-wing-navy bg-wing-navy p-7 text-wing-cream sm:p-10">
            <span
              aria-hidden="true"
              className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${ACCENT[theme]}`}
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-8 right-28 h-20 w-20 rounded-full bg-wing-sun"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="max-w-md">
                <h3 className="text-3xl font-extrabold sm:text-4xl">
                  Not sure which course fits?
                </h3>
                <p className="mt-2 text-wing-cream/80">Ask us on WhatsApp.</p>
              </div>
              <WhatsAppButton audience={id} label="Chat on WhatsApp" pulse />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}