"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import TiltCard from "./TiltCard";
import JourneyPath, { STAGES } from "./JourneyPath";
import LevelTag from "./LevelTag";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const word: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

const pop: Variants = {
  hidden: { scale: 0, rotate: -20 },
  show: {
    scale: 1,
    rotate: -2,
    transition: { type: "spring", stiffness: 220, damping: 10 },
  },
};

const HEADLINE_WORDS = ["Take", "your", "skills", "to", "the"];

const CARDS = [
  {
    id: "kids",
    href: "#kids",
    chip: "For school students",
    title: "I'm a parent",
    text: "Coding, AI and robotics, and everyday digital skills for your child.",
    cta: "See kids courses",
    className:
      "block overflow-hidden rounded-3xl border-2 border-wing-navy bg-wing-cyan p-6 text-wing-navy shadow-pop transition-shadow hover:shadow-pop-lg sm:p-7",
    rotate: -1.5,
  },
  {
    id: "professionals",
    href: "#professionals",
    chip: "For working professionals",
    title: "I'm a professional",
    text: "Web development, digital marketing, AI tools and Excel for your career.",
    cta: "See professional courses",
    className:
      "block overflow-hidden rounded-3xl border-2 border-wing-navy bg-wing-violet p-6 text-white shadow-pop transition-shadow hover:shadow-pop-lg sm:p-7",
    rotate: 1.5,
  },
  {
    id: "women",
    href: "#women",
    chip: "For women entrepreneurs",
    title: "I'm a woman entrepreneur",
    text: "Marketing, websites, finance and WhatsApp skills to run or start your business.",
    cta: "See women entrepreneur courses",
    className:
      "block overflow-hidden rounded-3xl border-2 border-wing-navy bg-wing-rose p-6 text-white shadow-pop transition-shadow hover:shadow-pop-lg sm:p-7 md:col-span-2 lg:col-span-1",
    rotate: -1,
  },
];

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });

  const aX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const aY = useTransform(sy, [-0.5, 0.5], [-30, 30]);
  const bX = useTransform(sx, [-0.5, 0.5], [40, -40]);
  const bY = useTransform(sy, [-0.5, 0.5], [40, -40]);
  const cX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const cY = useTransform(sy, [-0.5, 0.5], [18, -18]);

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="top"
      onPointerMove={onMove}
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-36"
      style={{
        backgroundImage:
          "radial-gradient(rgba(20,24,63,0.14) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      {/* floating shapes: outer layer follows the mouse, inner layer floats */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ x: aX, y: aY }}
          className="absolute right-6 top-24 sm:right-[44%] sm:top-32"
        >
          <span className="block h-8 w-8 animate-float rounded-full border-2 border-wing-navy bg-wing-cyan" />
        </motion.div>

        <motion.div
          style={{ x: bX, y: bY }}
          className="absolute left-[3%] top-[52%] hidden sm:block"
        >
          <span
            className="block h-10 w-10 rotate-12 animate-float rounded-lg border-2 border-wing-navy bg-wing-violet"
            style={{ animationDelay: "1.2s" }}
          />
        </motion.div>

        <motion.div
          style={{ x: cX, y: cY }}
          className="absolute right-[4%] top-[58%] hidden lg:block"
        >
          <span
            className="block h-6 w-6 animate-float rounded-full border-2 border-wing-navy bg-wing-sun"
            style={{ animationDelay: "2.1s" }}
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* top row: headline on the left, journey path on the right */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div>
            <motion.span
              variants={rise}
              className="inline-flex items-center gap-2 rounded-full border-2 border-wing-navy bg-white px-4 py-1.5 font-display text-xs font-bold shadow-pop-sm sm:text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping-soft rounded-full bg-wing-sun" />
                <span className="relative h-2 w-2 rounded-full bg-wing-sun" />
              </span>
              New academy in Bhavnagar
            </motion.span>

            <motion.h1
              variants={headline}
              className="mt-6 text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              {HEADLINE_WORDS.map((w) => (
                <span key={w}>
                  <span className="-mb-2 inline-block overflow-hidden pb-2 align-bottom">
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>{" "}
                </span>
              ))}
              <motion.span
                variants={pop}
                whileHover={{ rotate: 4, scale: 1.08 }}
                className="mt-2 inline-block cursor-default rounded-2xl border-2 border-wing-navy bg-wing-sun px-3 text-white shadow-pop-sm"
              >
                next level.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-xl text-lg text-wing-navy/80 sm:text-xl"
            >
              Coding, AI and digital skills classes in Bhavnagar, for school
              students, working professionals and women entrepreneurs.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-8 flex flex-wrap items-center gap-5"
            >
              <WhatsAppButton label="Chat on WhatsApp" pulse />
              <span className="text-sm text-wing-navy/70">
                Classes held offline in Bhavnagar
              </span>
            </motion.div>

            {/* mobile and tablet: compact progress strip */}
            <motion.ol
              variants={rise}
              aria-label="Your learning journey"
              className="mt-10 flex items-start justify-between lg:hidden"
            >
              {STAGES.map((s, i) => (
                <li
                  key={s.n}
                  className="relative flex flex-1 flex-col items-center text-center"
                >
                  {i < STAGES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-5 w-full border-t-2 border-dashed border-wing-navy/40"
                    />
                  )}
                  <span
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-wing-navy font-display font-extrabold shadow-pop-sm ${s.bg} ${s.text}`}
                  >
                    {s.n}
                  </span>
                  <span className="mt-2 font-display text-xs font-bold">
                    {s.label}
                  </span>
                </li>
              ))}
            </motion.ol>
          </div>

          <div className="hidden lg:block">
            <JourneyPath />
          </div>
        </motion.div>

        {/* audience cards */}
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          animate="show"
          className="mt-14"
        >
          <motion.div variants={rise}>
            <LevelTag n={1} label="Choose your path" />
          </motion.div>

          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {CARDS.map((c) => (
              <TiltCard
                key={c.id}
                href={c.href}
                variants={rise}
                rotate={c.rotate}
                className={c.className}
              >
                <span className="inline-block rounded-full border-2 border-wing-navy bg-white px-3 py-1 font-display text-xs font-bold text-wing-navy">
                  {c.chip}
                </span>
                <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-2 text-base opacity-90 sm:text-lg">{c.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-display font-bold">
                  {c.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </TiltCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}