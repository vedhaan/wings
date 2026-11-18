"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Logo from "./Logo";
import Mascot from "./Mascot";
import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import WhatsAppButton from "./WhatsAppButton";

import { ABOUT } from "@/lib/about";
import { IS_DEV, SHOW_FIND_US, SITE, directionsUrl } from "@/lib/site";

const NAVY = "#14183F";
const CREAM = "#FBF6EC";
const SUN = "#F77B24";

const SKY =
  "linear-gradient(180deg, #14183F 0%, #232C7A 38%, #8A5CE0 72%, #F77B24 100%)";

const LINKS = [
  { href: "#kids", label: "Kids courses" },
  { href: "#professionals", label: "Professional courses" },
  { href: "#how-it-works", label: "How it works" },
  ...(SHOW_FIND_US ? [{ href: "#find-us", label: "Find us" }] : []),
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About" },
];

const LETTERS = [
  { c: "W", hover: "hover:text-wing-cyan" },
  { c: "I", hover: "hover:text-wing-violet" },
  { c: "N", hover: "hover:text-wing-sun" },
  { c: "G", hover: "hover:text-wing-blue" },
  { c: "S", hover: "hover:text-wing-cyan" },
];

const PHRASES = ["See you in class", "Level up", "Keep learning", "Start today"];

const STARS = Array.from({ length: 34 }, (_, i) => ({
  left: `${(i * 53 + 7) % 97}%`,
  top: `${((i * 29 + 5) % 46) + 3}%`,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.45,
}));

const MARKERS = [
  { x: 60, y: 400, label: "Choose" },
  { x: 338, y: 385, label: "Courses" },
  { x: 600, y: 384, label: "Process" },
  { x: 799, y: 365, label: "Know us" },
  { x: 973, y: 292, label: "Start" },
];

const FONT = { fontFamily: "var(--font-display), system-ui, sans-serif" };

function Stars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full bg-wing-cream ${
            i % 2 ? "hidden sm:block" : ""
          }`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={inView ? { opacity: [0.15, 1, 0.15] } : { opacity: 0.5 }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}

function Moon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-28 h-12 w-12 animate-float sm:right-[12%] sm:top-32 sm:h-16 sm:w-16"
    >
      <div className="relative h-full w-full rounded-full border-2 border-wing-cream bg-wing-cream shadow-[0_0_40px_8px_rgba(251,246,236,0.35)]">
        <span className="absolute left-[22%] top-[26%] h-[18%] w-[18%] rounded-full bg-wing-navy/15" />
        <span className="absolute left-[56%] top-[50%] h-[24%] w-[24%] rounded-full bg-wing-navy/15" />
        <span className="absolute left-[30%] top-[64%] h-[12%] w-[12%] rounded-full bg-wing-navy/15" />
      </div>
    </div>
  );
}

function Hills() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMaxYMax slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="footer-sun-glow">
          <stop offset="0%" stopColor={SUN} stopOpacity="0.65" />
          <stop offset="100%" stopColor={SUN} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sun glow and rising sun */}
      <circle cx="560" cy="300" r="280" fill="url(#footer-sun-glow)" />
      <circle cx="560" cy="290" r="84" fill={CREAM} />

      {/* paper plane crossing the sky */}
      <motion.g
        initial={{ x: -140 }}
        animate={{ x: [-140, 1580], y: [0, -26, 10, -18, 0] }}
        transition={{
          x: { duration: 30, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <g transform="translate(0 80)">
          <path
            d="M-96 34 Q-56 40 -12 24"
            fill="none"
            stroke={CREAM}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="2 9"
            opacity="0.8"
          />
          <path
            d="M0 14 L56 -10 L24 28 L18 14 Z"
            fill={CREAM}
            stroke={NAVY}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M18 14 L56 -10" stroke={NAVY} strokeWidth="2" />
        </g>
      </motion.g>

      {/* hills */}
      <path
        d="M0 290 C140 250 300 262 440 296 C600 336 760 290 900 260 C1040 230 1200 250 1440 290 V420 H0 Z"
        fill="#4A3AA8"
        stroke="rgba(251,246,236,0.22)"
        strokeWidth="2"
      />
      <path
        d="M0 330 C180 295 360 320 520 340 C700 362 860 312 1010 280 C1140 252 1280 270 1440 305 V420 H0 Z"
        fill="#262B7C"
        stroke="rgba(251,246,236,0.2)"
        strokeWidth="2"
      />
      <path
        d="M0 380 C200 360 420 372 640 382 C800 388 900 352 980 296 C1030 258 1070 214 1120 206 C1170 214 1210 256 1260 298 C1320 346 1390 370 1440 374 V420 H0 Z"
        fill={NAVY}
        stroke="rgba(251,246,236,0.18)"
        strokeWidth="2"
      />

      {/* winding path up to the summit */}
      <path
        d="M60 400 C260 372 420 392 600 384 C760 378 860 360 930 318 C990 282 1040 250 1090 222"
        fill="none"
        stroke={CREAM}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="2 14"
        opacity="0.75"
      />

      {/* level markers */}
      {MARKERS.map((m, i) => (
        <g key={m.label}>
          <text
            x={m.x}
            y={m.y - 26}
            textAnchor="middle"
            fontSize="17"
            fontWeight="800"
            fill={CREAM}
            style={FONT}
          >
            {m.label}
          </text>
          <motion.g
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 14,
              delay: 0.2 + i * 0.15,
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx={m.x} cy={m.y} r="15" fill={CREAM} stroke={NAVY} strokeWidth="3" />
            <text
              x={m.x}
              y={m.y + 6}
              textAnchor="middle"
              fontSize="17"
              fontWeight="800"
              fill={NAVY}
              style={FONT}
            >
              {i + 1}
            </text>
          </motion.g>
        </g>
      ))}

      {/* summit flag */}
      <path
        d="M1210 256 V138"
        stroke={CREAM}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <motion.path
        fill={SUN}
        stroke={NAVY}
        strokeWidth="3"
        strokeLinejoin="round"
        initial={{ d: "M1210 138 L1262 150 L1210 164 Z" }}
        animate={{
          d: [
            "M1210 138 L1262 150 L1210 164 Z",
            "M1210 138 L1254 158 L1210 164 Z",
            "M1210 138 L1262 150 L1210 164 Z",
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* mascot at the summit */}
      <foreignObject
        x="1038"
        y="42"
        width="164"
        height="180"
        style={{ overflow: "visible" }}
      >
        <Mascot pose="cheer" tone="cyan" className="block h-full w-full" />
      </foreignObject>

      {/* speech bubble */}
      <g transform="translate(920 6)">
        <motion.g
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.6 }}
        >
          <rect
            width="196"
            height="44"
            rx="22"
            fill={CREAM}
            stroke={NAVY}
            strokeWidth="3"
          />
          <path
            d="M170 42 L184 64 L150 42 Z"
            fill={CREAM}
            stroke={NAVY}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="152" y="38" width="30" height="8" fill={CREAM} />
          <text
            x="98"
            y="29"
            textAnchor="middle"
            fontSize="19"
            fontWeight="800"
            fill={NAVY}
            style={FONT}
          >
            See you in class!
          </text>
        </motion.g>
      </g>
    </svg>
  );
}

function Panel({
  title,
  shadow,
  delay,
  children,
}: {
  title: string;
  shadow: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`h-full rounded-3xl border-2 border-wing-cream bg-wing-cream p-6 text-wing-navy transition-all duration-300 hover:-translate-y-1 sm:p-7 ${shadow}`}
      >
        <h2 className="font-display text-xs font-bold uppercase tracking-wider text-wing-navy/60">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </Reveal>
  );
}

function Missing({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 rounded-md border border-dashed border-wing-navy/30 px-2 py-1 text-sm text-wing-navy/40">
      {children}
    </p>
  );
}

function StripRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {PHRASES.map((p) => (
        <li
          key={p}
          className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-extrabold uppercase sm:text-3xl"
        >
          {p}
          <span aria-hidden="true" className="text-wing-navy">
            &#10022;
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Footer({ from }: { from: string }) {
  const directions = directionsUrl();

  return (
    <footer className="relative overflow-hidden bg-wing-navy text-wing-cream">
      <SectionWave fill={from} />

      {/* sunrise scene */}
      <div className="relative" style={{ background: SKY }}>
        <Stars />
        <Moon />

        <div className="relative mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-wing-sun px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              <span aria-hidden="true">&#10022;</span>
              Level complete
            </span>
            <div className="mt-6">
              <Logo variant="badge" />
            </div>
            <p className="mt-5 max-w-sm text-lg text-wing-cream/85">
              Coding, AI and digital skills classes in {SITE.city}, for school
              students and working professionals.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-4 h-[300px] sm:mt-0 sm:aspect-[1440/420] sm:h-auto sm:max-h-[480px]">
          <Hills />
        </div>
      </div>

      {/* ground */}
      <div className="relative px-4 pb-0 sm:px-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-wing-violet/30 blur-3xl" />
          <span className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-wing-cyan/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            <Panel
              title="Explore"
              delay={0}
              shadow="shadow-[6px_6px_0_0_#2CC6E8] hover:shadow-[9px_9px_0_0_#2CC6E8]"
            >
              <nav aria-label="Footer">
                <ul className="space-y-1">
                  {LINKS.map((l, i) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="group flex items-center justify-between rounded-xl border-2 border-transparent px-3 py-2 font-display text-lg font-bold transition-all hover:translate-x-1 hover:border-wing-navy hover:bg-wing-sun hover:text-white"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-sm text-wing-navy/50 group-hover:text-white/80">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {l.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          &rarr;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Panel>

            <Panel
              title="Visit us"
              delay={0.1}
              shadow="shadow-[6px_6px_0_0_#8A5CE0] hover:shadow-[9px_9px_0_0_#8A5CE0]"
            >
              <p className="font-display text-xl font-bold">
                Offline classes in {SITE.city}
              </p>

              {SITE.address ? (
                <p className="mt-2 text-wing-navy/80">{SITE.address}</p>
              ) : (
                IS_DEV && <Missing>Address to be added (lib/site.ts)</Missing>
              )}

              {SITE.timings ? (
                <dl className="mt-4 space-y-2 border-t-2 border-dashed border-wing-navy/20 pt-4">
                  {SITE.timings.map((t) => (
                    <div
                      key={t.label}
                      className="flex flex-wrap justify-between gap-x-4 text-sm"
                    >
                      <dt className="font-display font-bold">{t.label}</dt>
                      <dd className="text-wing-navy/80">{t.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                IS_DEV && <Missing>Timings to be added (lib/site.ts)</Missing>
              )}

              {directions && (
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-wing-navy bg-wing-navy px-4 py-2 font-display text-sm font-bold text-wing-cream transition-all hover:-translate-y-0.5 hover:bg-wing-blue"
                >
                  Get directions
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </Panel>

            <Panel
              title="Get in touch"
              delay={0.2}
              shadow="shadow-[6px_6px_0_0_#F77B24] hover:shadow-[9px_9px_0_0_#F77B24]"
            >
              <p className="font-display text-xl font-bold">
                The quickest way to reach us is WhatsApp.
              </p>
              <p className="mt-2 text-wing-navy/80">
                Tell us who the course is for and which one you are interested
                in.
              </p>
              <div className="mt-5">
                <WhatsAppButton label="Chat on WhatsApp" />
              </div>
            </Panel>
          </div>
        </div>

        {/* marquee strip */}
        <div className="-mx-10 mt-16 -rotate-1 overflow-hidden border-y-2 border-wing-cream bg-wing-sun py-4 text-white">
          <div className="flex w-max animate-marquee">
            <StripRow />
            <StripRow hidden />
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mt-12 flex flex-col gap-5 border-t-2 border-wing-cream/15 pt-6 text-sm text-wing-cream/70 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {SITE.name}. All rights
              reserved.
            </p>

            <p>
              A{" "}
              <a
                href={ABOUT.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-wing-cream underline decoration-wing-sun decoration-2 underline-offset-4 transition-colors hover:text-wing-sun"
              >
                {ABOUT.company}
              </a>{" "}
              initiative
            </p>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-wing-cream bg-wing-sun px-4 py-2 font-display text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-wing-cyan hover:text-wing-navy"
            >
              <span
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-1"
              >
                &uarr;
              </span>
              Back to level 1
            </button>
          </div>

          <div
            aria-hidden="true"
            className="mt-10 flex select-none justify-center font-display text-[22vw] font-extrabold leading-none tracking-tight md:text-[18vw] xl:text-[16rem]"
            style={{ marginBottom: "-0.2em" }}
          >
            {LETTERS.map((l, i) => (
              <motion.span
                key={`${l.c}-${i}`}
                initial={{ y: "55%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -16 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 14,
                  delay: i * 0.08,
                }}
                className={`cursor-default text-transparent transition-colors duration-200 ${l.hover}`}
                style={{ WebkitTextStroke: "2px rgba(251,246,236,0.24)" }}
              >
                {l.c}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}