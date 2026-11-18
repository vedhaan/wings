"use client";

import { useEffect, useRef } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useSpring,
} from "framer-motion";

export type Pose = "wave" | "cheer" | "point" | "think";
export type Tone = "sun" | "cyan" | "violet" | "blue";

const TONES: Record<Tone, string> = {
    sun: "#F77B24",
    cyan: "#2CC6E8",
    violet: "#8A5CE0",
    blue: "#2F5BD0",
};

const NAVY = "#14183F";
const CREAM = "#FBF6EC";

type Spin = { cx: number; cy: number; values: string; dur: string };

function Arm({
    d,
    hx,
    hy,
    spin,
    reduce,
}: {
    d: string;
    hx: number;
    hy: number;
    spin?: Spin;
    reduce: boolean | null;
}) {
    const inner = (
        <>
            <path
                d={d}
                fill="none"
                stroke={NAVY}
                strokeWidth="7"
                strokeLinecap="round"
            />
            <circle cx={hx} cy={hy} r="8" fill={CREAM} stroke={NAVY} strokeWidth="3.5" />
        </>
    );

    if (!spin || reduce) return <g>{inner}</g>;

    return (
        <g>
            <animateTransform
                attributeName="transform"
                type="rotate"
                values={spin.values
                    .split(";")
                    .map((v) => `${v} ${spin.cx} ${spin.cy}`)
                    .join(";")}
                dur={spin.dur}
                repeatCount="indefinite"
            />
            {inner}
        </g>
    );
}

type Props = {
    pose?: Pose;
    tone?: Tone;
    look?: boolean;
    className?: string;
};

export default function Mascot({
    pose = "wave",
    tone = "sun",
    look = true,
    className = "",
}: Props) {
    const ref = useRef<SVGSVGElement>(null);
    const reduce = useReducedMotion();
    const inView = useInView(ref, { margin: "120px" });
    const still = reduce || !inView;
    const px = useMotionValue(0);
    const py = useMotionValue(0);
    const x = useSpring(px, { stiffness: 180, damping: 18 });
    const y = useSpring(py, { stiffness: 180, damping: 18 });

    useEffect(() => {
        if (pose === "think") {
            px.set(3);
            py.set(-5);
            return;
        }
        if (!look || !inView) return;

        const onMove = (e: PointerEvent) => {
            const el = ref.current;
            if (!el) return;
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const dist = Math.hypot(dx, dy) || 1;
            const k = Math.min(dist, 320) / 320;
            px.set((dx / dist) * 6 * k);
            py.set((dy / dist) * 6 * k);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [look, pose, px, py, inView]);

    const body = TONES[tone];
    const outline = {
        stroke: NAVY,
        strokeWidth: 4,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    const leftDown = (
        <Arm d="M28 128 Q8 144 14 166" hx={14} hy={166} reduce={still} />
    );

    let leftArm = leftDown;
    let rightArm: React.ReactNode = null;

    if (pose === "wave") {
        rightArm = (
            <Arm
                d="M172 126 Q196 108 192 80"
                hx={192}
                hy={80}
                reduce={still}
                spin={{ cx: 172, cy: 126, values: "0;-16;8;-16;0", dur: "1.6s" }}
            />
        );
    } else if (pose === "cheer") {
        leftArm = (
            <Arm
                d="M28 126 Q4 104 10 72"
                hx={10}
                hy={72}
                reduce={still}
                spin={{ cx: 28, cy: 126, values: "0;14;-4;14;0", dur: "0.9s" }}
            />
        );
        rightArm = (
            <Arm
                d="M172 126 Q196 104 190 72"
                hx={190}
                hy={72}
                reduce={still}
                spin={{ cx: 172, cy: 126, values: "0;-14;4;-14;0", dur: "0.9s" }}
            />
        );
    } else if (pose === "point") {
        rightArm = <Arm d="M172 128 L212 116" hx={214} hy={115} reduce={still} />;
    } else {
        rightArm = (
            <Arm d="M172 130 Q170 156 132 142" hx={130} hy={141} reduce={still} />
        );
    }

    return (
        <svg
            ref={ref}
            viewBox="0 0 200 220"
            aria-hidden="true"
            className={`overflow-visible ${className}`}
        >
            <ellipse cx="100" cy="209" rx="46" ry="7" fill={NAVY} opacity="0.15" />

            <motion.g
                animate={
                    inView
                        ? { y: pose === "cheer" ? [0, -10, 0] : [0, -4, 0] }
                        : { y: 0 }
                }
                transition={{
                    duration: pose === "cheer" ? 0.9 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* legs */}
                <path d="M82 176 V198" fill="none" {...outline} strokeWidth={6} />
                <path d="M118 176 V198" fill="none" {...outline} strokeWidth={6} />
                <ellipse cx="80" cy="200" rx="15" ry="8" fill={NAVY} />
                <ellipse cx="120" cy="200" rx="15" ry="8" fill={NAVY} />

                {/* arms sit behind the body */}
                {leftArm}
                {rightArm}

                {/* body and belly */}
                <path
                    d="M100 28 C150 28 176 70 176 118 C176 168 144 186 100 186 C56 186 24 168 24 118 C24 70 50 28 100 28 Z"
                    fill={body}
                    {...outline}
                />
                <ellipse cx="100" cy="148" rx="38" ry="26" fill={CREAM} opacity="0.9" />

                {pose === "think" && (
                    <circle cx="130" cy="141" r="8" fill={CREAM} stroke={NAVY} strokeWidth="3.5" />
                )}

                {/* cheeks */}
                <circle cx="48" cy="116" r="7" fill="#fff" opacity="0.45" />
                <circle cx="152" cy="116" r="7" fill="#fff" opacity="0.45" />

                {/* goggle strap and bridge */}
                <path d="M26 84 L54 82" fill="none" {...outline} strokeWidth={6} />
                <path d="M146 82 L174 84" fill="none" {...outline} strokeWidth={6} />
                <path d="M94 82 H106" fill="none" {...outline} strokeWidth={6} />

                {/* goggle lenses */}
                <circle cx="74" cy="82" r="20" fill="#fff" {...outline} />
                <circle cx="126" cy="82" r="20" fill="#fff" {...outline} />

                {/* pupils follow the pointer */}
                <motion.g style={{ x, y }}>
                    <circle cx="74" cy="82" r="8" fill={NAVY} />
                    <circle cx="77" cy="79" r="2.5" fill="#fff" />
                    <circle cx="126" cy="82" r="8" fill={NAVY} />
                    <circle cx="129" cy="79" r="2.5" fill="#fff" />
                </motion.g>

                {/* mouth */}
                {pose === "cheer" ? (
                    <>
                        <path d="M82 116 Q100 150 118 116 Z" fill={NAVY} {...outline} />
                        <path d="M92 132 Q100 142 108 132 Q100 126 92 132 Z" fill="#F77B24" />
                    </>
                ) : pose === "think" ? (
                    <path d="M88 126 L112 122" fill="none" {...outline} />
                ) : (
                    <path d="M84 120 Q100 136 116 120" fill="none" {...outline} />
                )}

                {pose === "think" && (
                    <motion.g
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <circle cx="150" cy="40" r="3.5" fill="#fff" stroke={NAVY} strokeWidth="2" />
                        <circle cx="164" cy="22" r="17" fill="#fff" stroke={NAVY} strokeWidth="3.5" />
                        <text
                            x="164"
                            y="29"
                            textAnchor="middle"
                            fontSize="21"
                            fontWeight="800"
                            fill={NAVY}
                            style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}
                        >
                            ?
                        </text>
                    </motion.g>
                )}
            </motion.g>
        </svg>
    );
}