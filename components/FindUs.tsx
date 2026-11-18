import Reveal from "./Reveal";
import SectionWave from "./SectionWave";
import WhatsAppButton from "./WhatsAppButton";
import SectionArt from "./SectionArt";
import LevelTag from "./LevelTag";
import {
  IS_DEV,
  SITE,
  directionsUrl,
  mapEmbedUrl,
  SHOW_FIND_US,
} from "@/lib/site";

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="#14183F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="#14183F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="#14183F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12Z" />
    </svg>
  );
}

function InfoCard({
  icon,
  label,
  tone,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  tone: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex gap-4 rounded-3xl border-2 border-wing-navy bg-white p-5 shadow-pop-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-pop sm:p-6">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-wing-navy ${tone}`}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-wing-navy/60">
            {label}
          </h3>
          <div className="mt-1.5">{children}</div>
        </div>
      </div>
    </Reveal>
  );
}

function Missing({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-dashed border-wing-navy/30 px-2 py-1 text-sm text-wing-navy/40">
      {children}
    </p>
  );
}

export default function FindUs({ from }: { from: string }) {
  if (!SHOW_FIND_US) return null;

  const embed = mapEmbedUrl();
  const directions = directionsUrl();
  const showMapColumn = Boolean(embed) || IS_DEV;

  return (
    <section
      id="find-us"
      className="relative scroll-mt-20 overflow-hidden bg-wing-cream px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36"
      style={{
        backgroundImage:
          "radial-gradient(rgba(20,24,63,0.10) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    >
      <SectionWave fill={from} />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <LevelTag n={4} label="Find us" />
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
              Learn with us in {SITE.city}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-wing-navy/80">
              All classes are held offline, in person.
            </p>
          </Reveal>

          <Reveal
            delay={0.15}
            className="w-full max-w-[420px] justify-self-center lg:justify-self-end"
          >
            <SectionArt variant="visit" />
          </Reveal>
        </div>

        <div
          className={`mt-12 grid gap-6 ${showMapColumn ? "lg:grid-cols-5" : "lg:grid-cols-2"
            }`}
        >
          <div
            className={`space-y-5 ${showMapColumn ? "lg:col-span-2" : ""}`}
          >
            {(SITE.address || IS_DEV) && (
              <InfoCard
                icon={<PinIcon />}
                label="Address"
                tone="bg-wing-cyan"
              >
                {SITE.address ? (
                  <p className="text-lg font-medium leading-snug">
                    {SITE.address}
                  </p>
                ) : (
                  <Missing>To be added (set address in lib/site.ts)</Missing>
                )}
                {directions && (
                  <a
                    href={directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-wing-navy bg-wing-navy px-4 py-2 font-display text-sm font-bold text-wing-cream transition-all hover:-translate-y-0.5 hover:bg-wing-blue"
                  >
                    Get directions
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                )}
              </InfoCard>
            )}

            {(SITE.timings || IS_DEV) && (
              <InfoCard
                icon={<ClockIcon />}
                label="Class timings"
                tone="bg-wing-violet"
                delay={0.1}
              >
                {SITE.timings ? (
                  <dl className="space-y-2">
                    {SITE.timings.map((t) => (
                      <div
                        key={t.label}
                        className="flex flex-wrap justify-between gap-x-4"
                      >
                        <dt className="font-display font-bold">{t.label}</dt>
                        <dd className="text-wing-navy/80">{t.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <Missing>To be added (set timings in lib/site.ts)</Missing>
                )}
              </InfoCard>
            )}

            <InfoCard
              icon={<ChatIcon />}
              label="Quickest way to reach us"
              tone="bg-wing-sun"
              delay={0.2}
            >
              <p className="mb-3 text-wing-navy/80">
                Message us on WhatsApp for course details.
              </p>
              <WhatsAppButton label="Chat on WhatsApp" />
            </InfoCard>
          </div>

          {showMapColumn && (
            <Reveal delay={0.15} className="h-full lg:col-span-3">
              <div className="relative h-full min-h-[340px] overflow-hidden rounded-3xl border-2 border-wing-navy bg-white shadow-pop lg:min-h-[460px]">
                <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border-2 border-wing-navy bg-wing-sun px-3 py-1 font-display text-xs font-bold text-white shadow-pop-sm">
                  Offline classes in {SITE.city}
                </span>
                {embed ? (
                  <iframe
                    title={`Map showing the ${SITE.name} location`}
                    src={embed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <Missing>Map appears here once an address is set</Missing>
                  </div>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}