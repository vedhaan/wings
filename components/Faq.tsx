"use client";

import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import WhatsAppButton from "./WhatsAppButton";
import { FAQS, type FaqTab } from "@/lib/faq";
import { IS_DEV } from "@/lib/site";
import SectionArt from "./SectionArt";
import LevelTag from "./LevelTag";

const TABS: { id: FaqTab; label: string; activeClass: string }[] = [
  { id: "kids", label: "Kids", activeClass: "bg-wing-cyan text-wing-navy" },
  {
    id: "professionals",
    label: "Professionals",
    activeClass: "bg-wing-violet text-white",
  },
  {
    id: "women",
    label: "Women",
    activeClass: "bg-wing-rose text-white",
  },
];

function Item({
  id,
  q,
  a,
  open,
  onToggle,
}: {
  id: string;
  q: string;
  a: string | null;
  open: boolean;
  onToggle: () => void;
}) {
  const missing = a === null;

  return (
    <div
      className={`rounded-2xl border-2 bg-white shadow-pop-sm transition-shadow hover:shadow-pop ${missing ? "border-dashed border-wing-navy/40" : "border-wing-navy"
        }`}
    >
      <h3>
        <button
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-lg font-bold sm:text-xl"
        >
          <span>{q}</span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-wing-navy bg-wing-sun text-xl leading-none text-white"
          >
            +
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className={`px-5 pb-5 text-base sm:text-lg ${missing ? "text-wing-navy/40" : "text-wing-navy/80"
                }`}
            >
              {a ?? "To be added (set the answer in lib/faq.ts)"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq({ from }: { from: string }) {
  const uid = useId();
  const [tab, setTab] = useState<FaqTab>("kids");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = useMemo(
    () => FAQS[tab].filter((f) => IS_DEV || f.a !== null),
    [tab]
  );
  const hiddenCount = FAQS[tab].filter((f) => f.a === null).length;

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden bg-wing-sun-soft px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-36"
      style={{
        backgroundImage:
          "radial-gradient(rgba(20,24,63,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill={from} />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <LevelTag n={4} label="FAQ" />
            <h2 className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl">
              Questions people ask
            </h2>

            <div
              role="tablist"
              aria-label="Choose your audience"
              className="mt-8 inline-flex items-center gap-1 rounded-full border-2 border-wing-navy bg-white p-1 shadow-pop-sm"
            >
              {TABS.map((t) => {
                const isActive = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setTab(t.id);
                      setOpenIndex(0);
                    }}
                    className="relative rounded-full px-4 py-2 font-display text-sm font-bold"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="faq-pill"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                        className={`absolute inset-0 rounded-full ${t.activeClass}`}
                      />
                    )}
                    <span
                      className={`relative ${isActive && t.id !== "kids" ? "text-white" : ""
                        }`}
                    >
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-8 hidden lg:block">
              <SectionArt variant="faq" />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <div className="rounded-3xl border-2 border-wing-navy bg-white p-6 shadow-pop-sm">
              <h3 className="text-xl font-extrabold">Still have a question?</h3>
              <p className="mt-1 text-wing-navy/75">
                Ask us directly on WhatsApp.
              </p>
              <div className="mt-4">
                <WhatsAppButton audience={tab} label="Ask on WhatsApp" />
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {items.map((f, i) => (
                <Item
                  key={`${tab}-${f.q}`}
                  id={`${uid}-${tab}-${i}`}
                  q={f.q}
                  a={f.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {IS_DEV && hiddenCount > 0 && (
            <p className="mt-6 rounded-xl border border-dashed border-wing-navy/40 px-4 py-3 text-sm text-wing-navy/60">
              Dev note: {hiddenCount} unanswered question
              {hiddenCount > 1 ? "s" : ""} in this tab will be hidden in
              production until you fill in the answers in lib/faq.ts.
            </p>
          )}

          <div className="mt-8 rounded-3xl border-2 border-wing-navy bg-white p-6 shadow-pop-sm lg:hidden">
            <h3 className="text-xl font-extrabold">Still have a question?</h3>
            <p className="mt-1 text-wing-navy/75">
              Ask us directly on WhatsApp.
            </p>
            <div className="mt-4">
              <WhatsAppButton audience={tab} label="Ask on WhatsApp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}