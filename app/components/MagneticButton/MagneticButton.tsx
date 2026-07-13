"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  /** How strongly the element follows the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps an interactive element so it subtly drifts toward the cursor on hover —
 * a tasteful desktop micro-interaction. Disabled entirely for reduced-motion
 * users and harmless on touch devices (no hover events fire).
 */
export default function MagneticButton({
  children,
  strength = 0.3,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
