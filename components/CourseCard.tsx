import Reveal from "./Reveal";
import WhatsAppButton from "./WhatsAppButton";
import CourseIcon from "./CourseIcon";
import type { Audience } from "@/lib/site";
import type { Course } from "@/lib/courses";

export type Theme = "cyan" | "violet" | "rose";

const BANDS: Record<Theme, string[]> = {
  cyan: ["bg-wing-cyan", "bg-wing-sun", "bg-wing-violet"],
  violet: ["bg-wing-violet", "bg-wing-blue", "bg-wing-sun", "bg-wing-cyan"],
  rose: ["bg-wing-rose", "bg-wing-pink", "bg-wing-purple"],
};

const TAG: Record<Theme, string> = {
  cyan: "bg-wing-cyan-soft",
  violet: "bg-wing-violet-soft",
  rose: "bg-wing-rose-soft",
};

const IS_DEV = process.env.NODE_ENV !== "production";

function Meta({ label, value }: { label: string; value: string | null }) {
  if (!value && !IS_DEV) return null;
  return (
    <div className="grid grid-cols-[92px_1fr] items-start gap-3 text-sm">
      <dt className="pt-0.5 font-display text-xs font-bold uppercase tracking-wide text-wing-navy/60">
        {label}
      </dt>
      <dd
        className={
          value
            ? "font-medium"
            : "rounded-md border border-dashed border-wing-navy/30 px-2 py-0.5 text-wing-navy/40"
        }
      >
        {value ?? "To be added"}
      </dd>
    </div>
  );
}

type Props = {
  course: Course;
  index: number;
  theme: Theme;
  audience: Audience;
  levelLabel: string;
  className?: string;
};

export default function CourseCard({
  course,
  index,
  theme,
  audience,
  levelLabel,
  className = "",
}: Props) {
  const bands = BANDS[theme];
  const band = bands[index % bands.length];

  return (
    <Reveal delay={index * 0.1} className={`h-full ${className}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-wing-navy bg-white shadow-pop-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-pop-lg">
        {/* header band */}
        <div
          className={`relative flex items-start justify-between border-b-2 border-wing-navy p-5 sm:p-6 ${band}`}
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.35) 2px, transparent 2px)",
            backgroundSize: "18px 18px",
          }}
        >
          <span className="flex h-24 w-24 -rotate-3 items-center justify-center rounded-2xl border-2 border-wing-navy bg-wing-cream shadow-pop-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 sm:h-28 sm:w-28">
            <CourseIcon id={course.id} className="h-16 w-16 sm:h-20 sm:w-20" />
          </span>

          <span
            aria-hidden="true"
            className="font-display text-6xl font-extrabold leading-none text-transparent sm:text-7xl"
            style={{ WebkitTextStroke: "2px #14183F" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">
            {course.title}
          </h3>
          <p className="mt-2 text-base text-wing-navy/80">{course.blurb}</p>

          {course.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {course.tags.map((tag) => (
                <li
                  key={tag}
                  className={`rounded-full border-2 border-wing-navy px-2.5 py-0.5 font-display text-xs font-bold ${TAG[theme]}`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-5 space-y-2.5 border-t-2 border-dashed border-wing-navy/20 pt-5 empty:hidden">
            <Meta label="Duration" value={course.duration} />
            <Meta label={levelLabel} value={course.level} />
            <Meta label="By the end" value={course.outcome} />
          </dl>

          <div className="mt-auto pt-6">
            <WhatsAppButton
              audience={audience}
              label="Ask about this course"
              extra={`I'm interested in ${course.title}.`}
              className="w-full"
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}