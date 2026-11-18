"use client";

import { motion } from "framer-motion";

export type Stage = {
  n: number;
  label: string;
  bg: string;
  text: string;
};

export const STAGES: Stage[] = [
  { n: 1, label: "Start", bg: "bg-wing-cyan", text: "text-wing-navy" },
  { n: 2, label: "Learn", bg: "bg-wing-blue", text: "text-white" },
  { n: 3, label: "Practice", bg: "bg-wing-violet", text: "text-white" },
  { n: 4, label: "Level up", bg: "bg-wing-sun", text: "text-white" },
];

const PATH =
  "M 50 420 C 50 340 230 360 210 280 C 190 200 60 220 100 140 C 140 60 330 90 360 40";

// node positions are the segment endpoints of PATH, as percentages of the 420 x 460 viewBox
const NODES = [
  { left: "11.9%", top: "91.3%", side: "right", delay: 0.6 },
  { left: "50%", top: "60.9%", side: "right", delay: 1.2 },
  { left: "23.8%", top: "30.4%", side: "right", delay: 1.8 },
  { left: "85.7%", top: "8.7%", side: "left", delay: 2.4 },
] as const;

export default function JourneyPath() {
  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      style={{ aspectRatio: "420 / 460" }}
      role="img"
      aria-label="Your learning journey in four stages: Start, Learn, Practice, Level up"
    >
      <svg
        viewBox="0 0 420 460"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="journey-grad"
            gradientUnits="userSpaceOnUse"
            x1="50"
            y1="420"
            x2="360"
            y2="40"
          >
            <stop offset="0%" stopColor="#2CC6E8" />
            <stop offset="50%" stopColor="#8A5CE0" />
            <stop offset="100%" stopColor="#F77B24" />
          </linearGradient>
        </defs>

        {/* faint dotted track */}
        <path
          d={PATH}
          fill="none"
          stroke="#14183F"
          strokeOpacity="0.25"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="1 14"
        />

        {/* colored progress that draws itself */}
        <motion.path
          d={PATH}
          fill="none"
          stroke="url(#journey-grad)"
          strokeWidth="9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {NODES.map((node, i) => {
        const s = STAGES[i];
        return (
          <motion.div
            key={s.n}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 14,
              delay: node.delay,
            }}
            style={{ left: node.left, top: node.top }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-wing-navy font-display text-xl font-extrabold shadow-pop-sm ${s.bg} ${s.text}`}
              >
                {s.n}
              </span>

              <span
                className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-wing-navy bg-white px-3 py-1 font-display text-sm font-bold shadow-pop-sm ${
                  node.side === "right" ? "left-full ml-3" : "right-full mr-3"
                }`}
              >
                {s.label}
              </span>

              {i === 0 && (
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-wing-navy px-3 py-1 font-display text-xs font-bold text-wing-cream"
                >
                  You are here
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-wing-navy"
                  />
                </motion.span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}