const SKILLS = [
  "Python",
  "Scratch",
  "AI Tools",
  "Robotics",
  "Web Development",
  "Digital Marketing",
  "Excel",
  "Canva",
  "Automation",
  "Data Skills",
];

const VERBS = ["Learn", "Build", "Create", "Grow", "Level up", "Explore"];

function Row({
  items,
  hidden = false,
  starClass,
}: {
  items: string[];
  hidden?: boolean;
  starClass: string;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-extrabold uppercase sm:text-3xl"
        >
          {item}
          <span aria-hidden="true" className={starClass}>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-x-clip py-8">
      <div className="group -mx-6 -rotate-1 overflow-hidden border-y-2 border-wing-navy bg-wing-sun py-4 text-wing-navy">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <Row items={SKILLS} starClass="text-wing-cream" />
          <Row items={SKILLS} starClass="text-wing-cream" hidden />
        </div>
      </div>
    </div>
  );
}