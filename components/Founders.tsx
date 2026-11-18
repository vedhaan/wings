import Image from "next/image";
import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import LevelTag from "./LevelTag";
import { ABOUT } from "@/lib/about";
import { COFOUNDERS, OWNER, type Person } from "@/lib/founders";
import { IS_DEV } from "@/lib/site";

const TONES = {
  cyan: {
    band: "bg-wing-cyan",
    chip: "bg-wing-cyan text-wing-navy",
    initials: "text-wing-cyan",
  },
  violet: {
    band: "bg-wing-violet",
    chip: "bg-wing-violet text-white",
    initials: "text-wing-violet",
  },
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function OwnerCard() {
  return (
    <Reveal>
      <div
        className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border-2 border-wing-navy bg-wing-navy p-6 text-wing-cream shadow-[8px_8px_0_0_#8A5CE0] sm:p-9"
        style={{
          backgroundImage:
            "radial-gradient(rgba(251,246,236,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-wing-sun"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-6 right-24 h-14 w-14 rounded-full bg-wing-cyan"
        />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-wing-cream bg-wing-cream sm:h-28 sm:w-28">
            {OWNER.logo ? (
              <Image
                src={OWNER.logo}
                alt={`${OWNER.name} logo`}
                width={112}
                height={112}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <span
                aria-hidden="true"
                className="font-display text-6xl font-extrabold text-wing-navy"
              >
                V
              </span>
            )}
          </div>

          <div>
            <span className="inline-block rounded-full bg-wing-sun px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wider text-white">
              {OWNER.label}
            </span>
            <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {OWNER.name}
            </h3>
            <p className="mt-2 max-w-md text-wing-cream/80">
              {ABOUT.text[0]}
            </p>
            <a
              href={ABOUT.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-wing-cream px-4 py-2 font-display text-sm font-bold transition-all hover:-translate-y-0.5 hover:bg-wing-cream hover:text-wing-navy"
            >
              Visit {OWNER.name}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FounderCard({ person, index }: { person: Person; index: number }) {
  const t = TONES[person.tone];

  return (
    <Reveal delay={0.1 + index * 0.12} className="h-full">
      <article
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-wing-navy bg-white shadow-pop transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-pop-lg ${
          index % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"
        }`}
      >
        <div
          className={`relative border-b-2 border-wing-navy p-6 ${t.band}`}
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.35) 2px, transparent 2px)",
            backgroundSize: "18px 18px",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute right-5 top-5 animate-float text-3xl text-wing-cream"
          >
            &#10022;
          </span>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-[250px] overflow-hidden rounded-2xl border-2 border-wing-navy bg-wing-cream shadow-pop-sm">
            {person.photo ? (
              <Image
                src={person.photo}
                alt={`${person.name}, ${person.role} of WINGS`}
                fill
                sizes="(min-width: 768px) 260px, 70vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center"
              >
                <span
                  className={`font-display text-8xl font-extrabold ${t.initials}`}
                  style={{ WebkitTextStroke: "3px #14183F" }}
                >
                  {initials(person.name)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <span
            className={`w-fit rounded-full border-2 border-wing-navy px-3 py-1 font-display text-xs font-bold ${t.chip}`}
          >
            {person.role}
          </span>
          <h3 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            {person.name}
          </h3>

          {person.bio ? (
            <p className="mt-3 text-base text-wing-navy/80">{person.bio}</p>
          ) : (
            IS_DEV && (
              <p className="mt-3 rounded-md border border-dashed border-wing-navy/30 px-2 py-1 text-sm text-wing-navy/40">
                Bio to be added (lib/founders.ts)
              </p>
            )
          )}

          {IS_DEV && !person.photo && (
            <p className="mt-2 rounded-md border border-dashed border-wing-navy/30 px-2 py-1 text-sm text-wing-navy/40">
              Photo to be added (lib/founders.ts)
            </p>
          )}

          {person.linkedin && (
            <div className="mt-auto pt-5">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-wing-navy bg-wing-navy px-4 py-2 font-display text-sm font-bold text-wing-cream transition-all hover:-translate-y-0.5 hover:bg-wing-blue"
              >
                LinkedIn
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Founders({ from }: { from: string }) {
  return (
    <section
      id="founders"
      className="relative scroll-mt-20 overflow-hidden bg-wing-violet-soft px-4 pb-24 pt-28 sm:px-6 sm:pb-32 sm:pt-36"
      style={{
        backgroundImage:
          "radial-gradient(rgba(20,24,63,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill={from} />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <LevelTag n={4} label="Founders" />
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
            The people behind WINGS
          </h2>
          <p className="mt-4 max-w-xl text-lg text-wing-navy/80">
            WINGS is owned by {OWNER.name} and led by two co-founders.
          </p>
        </Reveal>

        <div className="mt-14">
          <OwnerCard />

          <div className="mx-auto max-w-4xl">
            {/* connectors, desktop */}
            <div aria-hidden="true" className="relative hidden h-14 md:block">
              <span className="absolute left-1/2 top-0 h-1/2 border-l-2 border-dashed border-wing-navy/50" />
              <span className="absolute left-1/4 right-1/4 top-1/2 border-t-2 border-dashed border-wing-navy/50" />
              <span className="absolute left-1/4 top-1/2 h-1/2 border-l-2 border-dashed border-wing-navy/50" />
              <span className="absolute right-1/4 top-1/2 h-1/2 border-l-2 border-dashed border-wing-navy/50" />
            </div>

            {/* connector, mobile */}
            <span
              aria-hidden="true"
              className="mx-auto block h-10 w-0 border-l-2 border-dashed border-wing-navy/50 md:hidden"
            />

            <div className="grid gap-8 md:grid-cols-2">
              {COFOUNDERS.map((p, i) => (
                <FounderCard key={p.id} person={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}