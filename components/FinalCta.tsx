import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import { SITE, waLink } from "@/lib/site";
import LevelTag from "./LevelTag";

export default function FinalCta({ from }: { from: string }) {
  return (
    <section
      id="start"
      className="relative scroll-mt-20 overflow-hidden bg-wing-sun px-4 pb-24 pt-28 text-wing-navy sm:px-6 sm:pb-32 sm:pt-40"
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.28) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill={from} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute left-[6%] top-40 hidden h-12 w-12 animate-float rounded-full border-2 border-wing-navy bg-wing-cyan sm:block" />
        <span
          className="absolute right-[7%] top-52 hidden h-9 w-9 rotate-12 animate-float rounded-lg border-2 border-wing-navy bg-wing-violet sm:block"
          style={{ animationDelay: "1.3s" }}
        />
        <span
          className="absolute bottom-24 left-[12%] hidden h-6 w-6 animate-float rounded-full border-2 border-wing-navy bg-wing-cream lg:block"
          style={{ animationDelay: "2.2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <LevelTag n={5} label="Start" />

          <h2 className="mt-6 text-5xl font-extrabold leading-[1.02] sm:text-7xl lg:text-8xl">
            Ready for{" "}
            <span className="mt-2 inline-block -rotate-2 rounded-2xl border-2 border-wing-navy bg-wing-cream px-4 shadow-pop">
              level 1?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-lg font-medium sm:text-xl">
            Message us on WhatsApp and tell us who the course is for.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <a
              href={waLink("kids")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-wing-navy bg-wing-navy px-7 py-4 font-display text-lg font-bold text-wing-cream shadow-pop transition-all hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0 active:shadow-none"
            >
              I&apos;m a parent
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href={waLink("professionals")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-wing-navy bg-wing-cream px-7 py-4 font-display text-lg font-bold text-wing-navy shadow-pop transition-all hover:-translate-y-1 hover:shadow-pop-lg active:translate-y-0 active:shadow-none"
            >
              I&apos;m a professional
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>

          <p className="mt-6 text-sm font-medium">
            Classes held offline in {SITE.city}
          </p>
        </Reveal>
      </div>
    </section>
  );
}