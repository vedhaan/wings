"use client";

import { motion, type Variants } from "framer-motion";

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeInOut" },
  },
};

const s = {
  variants: draw,
  stroke: "#14183F",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Shapes({ id }: { id: string }) {
  switch (id) {
    case "kids-coding":
      return (
        <>
          <motion.path {...s} fill="none" d="M22 20 L10 32 L22 44" />
          <motion.path {...s} fill="none" d="M42 20 L54 32 L42 44" />
          <motion.path {...s} fill="none" d="M36 14 L28 50" />
          <motion.circle {...s} fill="#fff" cx="50" cy="12" r="4" />
        </>
      );

    case "kids-ai-robotics":
      return (
        <>
          <motion.path {...s} fill="none" d="M32 22 V12" />
          <motion.circle {...s} fill="#fff" cx="32" cy="9" r="3.5" />
          <motion.rect {...s} fill="#fff" x="14" y="22" width="36" height="28" rx="8" />
          <motion.rect {...s} fill="#fff" x="7" y="31" width="7" height="12" rx="3" />
          <motion.rect {...s} fill="#fff" x="50" y="31" width="7" height="12" rx="3" />
          <motion.circle {...s} fill="none" cx="24" cy="35" r="3" />
          <motion.circle {...s} fill="none" cx="40" cy="35" r="3" />
          <motion.path {...s} fill="none" d="M25 43 H39" />
        </>
      );

    case "kids-digital":
      return (
        <>
          <motion.rect {...s} fill="#fff" x="9" y="11" width="46" height="31" rx="5" />
          <motion.path {...s} fill="none" d="M32 42 V50" />
          <motion.path {...s} fill="none" d="M21 52 H43" />
          <motion.path {...s} fill="none" d="M17 22 H33" />
          <motion.path {...s} fill="none" d="M17 30 H27" />
          <motion.rect {...s} fill="#fff" x="37" y="24" width="10" height="9" rx="2" />
        </>
      );

    case "pro-web":
      return (
        <>
          <motion.rect {...s} fill="#fff" x="7" y="11" width="50" height="42" rx="6" />
          <motion.path {...s} fill="none" d="M7 23 H57" />
          <motion.circle {...s} fill="none" cx="14" cy="17" r="1.5" />
          <motion.circle {...s} fill="none" cx="21" cy="17" r="1.5" />
          <motion.circle {...s} fill="none" cx="28" cy="17" r="1.5" />
          <motion.rect {...s} fill="#fff" x="13" y="30" width="17" height="16" rx="3" />
          <motion.rect {...s} fill="#fff" x="35" y="30" width="16" height="6" rx="2" />
          <motion.rect {...s} fill="#fff" x="35" y="40" width="16" height="6" rx="2" />
        </>
      );

    case "pro-marketing":
      return (
        <>
          <motion.path
            {...s}
            fill="#fff"
            d="M10 26 H22 L42 13 V47 L22 34 H10 Z"
          />
          <motion.path {...s} fill="none" d="M17 34 V48 H25 V37" />
          <motion.path {...s} fill="none" d="M48 24 Q55 30 48 36" />
          <motion.path {...s} fill="none" d="M52 17 Q63 30 52 43" />
        </>
      );

    case "pro-ai":
      return (
        <>
          <motion.path
            {...s}
            fill="#fff"
            d="M28 12 C30 26 36 32 50 34 C36 36 30 42 28 56 C26 42 20 36 6 34 C20 32 26 26 28 12 Z"
          />
          <motion.path
            {...s}
            fill="#fff"
            d="M50 5 C51 9 52 10 56 11 C52 12 51 13 50 17 C49 13 48 12 44 11 C48 10 49 9 50 5 Z"
          />
        </>
      );

    case "pro-excel":
      return (
        <>
          <motion.rect {...s} fill="#fff" x="8" y="12" width="48" height="40" rx="5" />
          <motion.path {...s} fill="none" d="M8 25 H56" />
          <motion.path {...s} fill="none" d="M8 38 H56" />
          <motion.path {...s} fill="none" d="M24 12 V52" />
          <motion.path {...s} fill="none" d="M40 12 V52" />
          <motion.rect {...s} fill="#fff" x="26" y="27" width="12" height="9" rx="1.5" />
        </>
      );

    default:
      return <motion.circle {...s} fill="#fff" cx="32" cy="32" r="18" />;
  }
}

export default function CourseIcon({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      <Shapes id={id} />
    </motion.svg>
  );
}