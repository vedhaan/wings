export default function LevelTag({
  n,
  label,
  dark = false,
}: {
  n: number;
  label: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border-2 px-1.5 py-1 pr-3 font-display text-xs font-extrabold uppercase tracking-wider ${
        dark
          ? "border-wing-cream bg-wing-cream text-wing-navy"
          : "border-wing-navy bg-wing-navy text-wing-cream"
      }`}
    >
      <span className="rounded-full bg-wing-sun px-2 py-0.5 text-white">
        Level {n}
      </span>
      {label}
    </span>
  );
}