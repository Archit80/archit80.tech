"use client";

import { useInView } from "framer-motion";
import { useEffect, useId, useMemo, useRef } from "react";
import { SketchPaths, seedFrom, useIsClient } from "@/lib/rough";
import type { Drawing } from "./pen";

interface SketchProps {
  draw: (seed: number) => Drawing;
  /** viewBox width & height; the SVG scales to `width` (or 100% of its container). */
  viewBox: [number, number];
  width?: number;
  /** Ink the strokes in when scrolled into view. */
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Bump to ink the drawing in again from scratch (e.g. on hover). */
  replay?: number;
  /** Fix the pencil wobble. By default it comes from the doodle's place in the tree, so it re-rolls when the layout around it changes. */
  seed?: number;
}

// Keep long diagrams snappy: the whole drawing finishes in about this long.
const DRAW_BUDGET_MS = 1500;

/** A decorative rough.js doodle. Reserves its aspect ratio before hydration, so no layout shift. */
export function Sketch({ draw, viewBox: [vw, vh], width, animate = true, className = "", style, replay = 0, seed: fixedSeed }: SketchProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const isClient = useIsClient();
  const autoSeed = seedFrom(useId());
  const seed = fixedSeed ?? autoSeed;
  const drawing = useMemo(() => (isClient ? draw(seed) : null), [draw, seed, isClient]);

  // Replay: snap every stroke back to undrawn (no transition), force a style flush, then release
  // so the staggered draw-in transitions run again.
  // Then, once the arrows are back, send a dot along each data-flow route in turn.
  useEffect(() => {
    const svg = ref.current;
    if (!replay || !svg || !animate) return;
    svg.classList.add("ink-reset");
    svg.getBoundingClientRect();
    svg.classList.remove("ink-reset");
    svg.querySelectorAll<SVGCircleElement>("circle.route-dot").forEach((dot, i) => {
      dot.querySelectorAll<SVGAnimationElement>("animate, animateMotion").forEach((a) => a.beginElementAt(0.7 + i * 0.35));
    });
  }, [replay, animate]);

  const stagger = drawing ? Math.min(60, DRAW_BUDGET_MS / Math.max(1, drawing.paths.length)) : 0;

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox={`0 0 ${vw} ${vh}`}
      width={width}
      height={width ? (width * vh) / vw : undefined}
      style={style}
      className={`overflow-visible ${width ? "" : "h-auto w-full"} ${animate ? "ink-draw" : ""} ${inView ? "is-drawn" : ""} ${className}`}
    >
      {drawing && <SketchPaths paths={drawing.paths} draw={animate} stagger={stagger} />}
      {drawing?.labels?.map((l) => (
        <text
          key={`${l.text}-${l.x}`}
          x={l.x}
          y={l.y}
          fontSize={l.size ?? 15}
          textAnchor={l.anchor ?? "middle"}
          transform={l.rotate ? `rotate(${l.rotate} ${l.x} ${l.y})` : undefined}
          fill="currentColor"
          className="font-hand"
        >
          {l.text}
        </text>
      ))}
      {drawing?.routes?.map((pts, i) => (
        <circle key={`route-${i}`} r={4.5} fill="#d4ff00" stroke="currentColor" strokeWidth={1.5} opacity={0} className="route-dot">
          <animateMotion dur="0.8s" begin="indefinite" fill="remove" path={`M ${pts.map((p) => p.join(" ")).join(" L ")}`} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="0.8s" begin="indefinite" fill="remove" />
        </circle>
      ))}
    </svg>
  );
}
