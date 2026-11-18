"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

type Props = {
  href: string;
  className?: string;
  rotate?: number;
  variants?: Variants;
  children: React.ReactNode;
};

export default function TiltCard({
  href,
  className = "",
  rotate = 0,
  variants,
  children,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["15%", "85%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["15%", "85%"]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.4), transparent 55%)`;

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      variants={variants}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ rotate, rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative ${className}`}
    >
      <motion.span
        aria-hidden="true"
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span className="relative block">{children}</span>
    </motion.a>
  );
}