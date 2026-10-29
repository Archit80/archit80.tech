"use client";

import { motion, useInView } from "framer-motion";
import { useId, useMemo, useRef, useState, type ReactNode } from "react";
import { FILL, SketchPaths, generator, seedFrom, sketch, useIsClient } from "@/lib/rough";

interface MarkerProps {
  children: ReactNode;
  /** hover: sweeps on pointer hover · view: once when scrolled into view · controlled: follows `active` */
  trigger?: "hover" | "view" | "controlled";
  active?: boolean;
  /** Highlighter ink: the theme's highlight (lime on paper, pink in dark mode), or the other one for the odd big call to action. */
  tone?: "main" | "alt";
  className?: string;
}

// The marker is drawn in a fixed 200×40 box and stretched to the text.
const VIEW_W = 200;
const VIEW_H = 40;

/**
 * Highlighter swept across the text (lime, or pink in dark mode). Text under lime turns charcoal so it stays readable; under pink it stays white.
 * With `trigger="hover"`, `active` keeps it on regardless of hover (e.g. the current nav link).
 */
export function Marker({ children, trigger = "hover", active, tone = "main", className = "" }: MarkerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const isClient = useIsClient();
  const seed = seedFrom(useId());

  const on = trigger === "controlled" ? Boolean(active) : trigger === "view" ? inView : hovered || Boolean(active);

  const wash = useMemo(
    () =>
      sketch(
        generator.polygon(
          [
            [2, 5],
            [VIEW_W - 1, 2],
            [VIEW_W - 3, VIEW_H - 1],
            [0, VIEW_H - 3],
          ],
          { seed, roughness: 2.2, fill: FILL, fillStyle: "solid", stroke: "none" },
        ),
      ),
    [seed],
  );

  const hoverProps =
    trigger === "hover" ? { onPointerEnter: () => setHovered(true), onPointerLeave: () => setHovered(false) } : {};

  return (
    <span ref={ref} className={`relative isolate inline-block ${className}`} {...hoverProps}>
      {isClient && (
        <motion.svg
          aria-hidden
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          className={`pointer-events-none absolute -inset-x-[0.2em] -top-[8%] -z-10 h-[116%] w-[calc(100%+0.4em)] overflow-visible opacity-90 ${tone === "alt" ? "text-pink dark:text-lime" : "text-lime dark:text-pink"}`}
          initial={false}
          animate={{ scaleX: on ? 1 : 0 }}
          transition={{ duration: on ? 0.38 : 0.22, ease: [0.65, 0, 0.35, 1] }}
          style={{ originX: 0 }}
        >
          <SketchPaths paths={wash} />
        </motion.svg>
      )}
      {/* Dark text on lime; on the dark board's pink the text stays chalk-white. */}
      <span
        className={`relative transition-colors duration-200 ${on ? (tone === "alt" ? "text-charcoal dark:text-charcoal" : "text-charcoal dark:text-ink") : ""}`}
      >
        {children}
      </span>
    </span>
  );
}
