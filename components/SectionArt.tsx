"use client";

import { motion } from "framer-motion";
import Mascot, { type Pose, type Tone } from "./Mascot";

export type ArtVariant = "kids" | "pros" | "visit" | "faq" | "about";

const NAVY = "#14183F";
const CREAM = "#FBF6EC";
const SUN = "#F77B24";

const CFG: Record<ArtVariant, { bg: string; tone: Tone; pose: Pose }> = {
  kids: { bg: "bg-wing-cyan", tone: "sun", pose: "cheer" },
  pros: { bg: "bg-wing-violet", tone: "cyan", pose: "point" },
  visit: { bg: "bg-wing-cyan", tone: "sun", pose: "point" },
  faq: { bg: "bg-wing-sun", tone: "cyan", pose: "think" },
  about: { bg: "bg-wing-violet", tone: "sun", pose: "wave" },
};

function Cloud({
  x,
  y,
  scale = 1,
  delay = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: number;
}) {
  const shapes = (
    <>
      <circle cx="0" cy="0" r="13" />
      <circle cx="20" cy="-9" r="17" />
      <circle cx="42" cy="0" r="13" />
      <rect x="0" y="-1" width="42" height="14" />
    </>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <motion.g
        animate={{ x: [0, 22, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <g fill={NAVY} stroke={NAVY} strokeWidth="6">
          {shapes}
        </g>
        <g fill="#fff">{shapes}</g>
      </motion.g>
    </g>
  );
}

function Star({
  x,
  y,
  fill,
  delay = 0,
}: {
  x: number;
  y: number;
  fill: string;
  delay?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.path
        d="M0 -14 L4 -4 L14 0 L4 4 L0 14 L-4 4 L-14 0 L-4 -4 Z"
        fill={fill}
        stroke={NAVY}
        strokeWidth="2.5"
        strokeLinejoin="round"
        animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </g>
  );
}

function Bubble({
  x,
  y,
  delay = 0,
}: {
  x: number;
  y: number;
  delay?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <rect
          x="0"
          y="0"
          width="64"
          height="46"
          rx="14"
          fill="#fff"
          stroke={NAVY}
          strokeWidth="3"
        />
        <path d="M14 46 L10 60 L28 46 Z" fill="#fff" stroke={NAVY} strokeWidth="3" strokeLinejoin="round" />
        <rect x="12" y="42" width="18" height="6" fill="#fff" />
        <text
          x="32"
          y="35"
          textAnchor="middle"
          fontSize="30"
          fontWeight="800"
          fill={NAVY}
          style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
        >
          ?
        </text>
      </motion.g>
    </g>
  );
}

const BUILDINGS = [
  { x: 20, y: 150, w: 64, h: 170, c: "#E8DDFA" },
  { x: 92, y: 100, w: 72, h: 220, c: "#FFFFFF" },
  { x: 172, y: 170, w: 58, h: 150, c: "#D5F3FA" },
  { x: 238, y: 125, w: 66, h: 195, c: "#FFE5D1" },
  { x: 312, y: 160, w: 72, h: 160, c: "#E8DDFA" },
];

function Scene({ variant }: { variant: ArtVariant }) {
  switch (variant) {
    case "kids":
      return (
        <>
          <circle cx="322" cy="72" r="26" fill={SUN} stroke={NAVY} strokeWidth="3" />
          <Cloud x={56} y={76} />
          <Cloud x={196} y={44} scale={0.8} delay={2} />
          <path
            d="M0 226 C80 168 180 186 260 212 C320 232 370 198 400 188 V320 H0 Z"
            fill="#D5F3FA"
            stroke={NAVY}
            strokeWidth="3"
          />
          <path
            d="M0 272 C90 238 200 252 290 264 C340 270 380 260 400 252 V320 H0 Z"
            fill={CREAM}
            stroke={NAVY}
            strokeWidth="3"
          />
          {/* signpost */}
          <g transform="translate(330 214)">
            <path d="M0 52 V0" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
            <rect x="-4" y="2" width="58" height="24" rx="6" fill={SUN} stroke={NAVY} strokeWidth="3" />
            <text
              x="25"
              y="19"
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fill="#fff"
              style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
            >
              START
            </text>
          </g>
        </>
      );

    case "pros":
      return (
        <>
          <Cloud x={300} y={50} scale={0.8} />
          {BUILDINGS.map((b) => (
            <g key={b.x}>
              <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c} stroke={NAVY} strokeWidth="3" />
              {Array.from({ length: Math.floor((b.h - 70) / 28) }).map((_, row) =>
                [b.x + 12, b.x + b.w - 24].map((wx, col) => (
                  <rect
                    key={`${row}-${col}`}
                    x={wx}
                    y={b.y + 16 + row * 28}
                    width="12"
                    height="14"
                    rx="2"
                    fill={(row + col) % 3 === 0 ? SUN : "#fff"}
                    stroke={NAVY}
                    strokeWidth="2"
                  />
                ))
              )}
            </g>
          ))}
          <rect x="0" y="296" width="400" height="24" fill={CREAM} stroke={NAVY} strokeWidth="3" />
        </>
      );

    case "visit":
      return (
        <>
          {[
            [16, 20, 110, 96],
            [150, 20, 96, 96],
            [270, 20, 114, 96],
            [16, 160, 70, 110],
            [270, 160, 114, 110],
          ].map(([x, y, w, h]) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="12"
              fill={x === 150 ? "#fff" : "#D5F3FA"}
              stroke={NAVY}
              strokeWidth="3"
            />
          ))}
          <path d="M0 138 H400" stroke={NAVY} strokeWidth="16" />
          <path d="M0 138 H400" stroke={CREAM} strokeWidth="3" strokeDasharray="14 12" />
          <path d="M138 0 V320" stroke={NAVY} strokeWidth="16" />
          <path d="M138 0 V320" stroke={CREAM} strokeWidth="3" strokeDasharray="14 12" />
          <g transform="translate(300 120)">
            <motion.g
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M0 0 C-16 -22 -26 -34 -26 -48 A26 26 0 1 1 26 -48 C26 -34 16 -22 0 0 Z"
                fill={SUN}
                stroke={NAVY}
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="-48" r="9" fill={CREAM} stroke={NAVY} strokeWidth="3" />
            </motion.g>
            <ellipse cx="0" cy="6" rx="18" ry="5" fill={NAVY} opacity="0.2" />
          </g>
        </>
      );

    case "faq":
      return (
        <>
          <Bubble x={36} y={34} />
          <Bubble x={296} y={70} delay={0.8} />
          <Bubble x={236} y={14} delay={1.6} />
          <rect x="0" y="296" width="400" height="24" fill={CREAM} stroke={NAVY} strokeWidth="3" />
        </>
      );

    case "about":
      return (
        <>
          <Star x={60} y={70} fill={CREAM} />
          <Star x={330} y={60} fill="#2CC6E8" delay={0.7} />
          <Star x={88} y={170} fill={SUN} delay={1.4} />
          <Star x={316} y={170} fill={CREAM} delay={2} />
          <circle cx="200" cy="40" r="7" fill={SUN} stroke={NAVY} strokeWidth="2.5" />
          <rect x="140" y="64" width="16" height="8" rx="2" transform="rotate(-20 148 68)" fill="#2CC6E8" stroke={NAVY} strokeWidth="2" />
          <rect x="250" y="90" width="16" height="8" rx="2" transform="rotate(25 258 94)" fill={CREAM} stroke={NAVY} strokeWidth="2" />
          <rect x="0" y="296" width="400" height="24" fill={CREAM} stroke={NAVY} strokeWidth="3" />
        </>
      );
  }
}

export default function SectionArt({
  variant,
  className = "",
}: {
  variant: ArtVariant;
  className?: string;
}) {
  const c = CFG[variant];

  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[5/4] w-full max-w-[420px] overflow-hidden rounded-3xl border-2 border-wing-navy shadow-pop ${c.bg} ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.35) 2px, transparent 2px)",
        backgroundSize: "20px 20px",
      }}
    >
      <svg
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <Scene variant={variant} />
      </svg>

      <div className="absolute bottom-1 left-1/2 w-[46%] -translate-x-1/2">
        <Mascot pose={c.pose} tone={c.tone} />
      </div>
    </div>
  );
}