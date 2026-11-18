export default function SectionWave({ fill }: { fill: string }) {
  const edge =
    "M1440 40 C1320 90 1200 90 1080 50 C960 10 840 10 720 50 C600 90 480 90 360 50 C240 10 120 10 0 50";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full sm:h-20"
    >
      <path d={`M0 0 H1440 V40 ${edge.slice(edge.indexOf("C"))} Z`} fill={fill} />
      <path
        d={edge}
        fill="none"
        stroke="#14183F"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}