"use client";

import { useId, useMemo, useRef, type HTMLAttributes, type ReactNode } from "react";
import { FILL, SketchPaths, generator, seedFrom, sketch, useElementSize, type SketchPath } from "@/lib/rough";

const INSET = 3;

interface RoughBoxProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "aside" | "li";
  children?: ReactNode;
  /** Hard, solid offset shadow (px). 0 disables it. */
  shadow?: number;
  roughness?: number;
  strokeWidth?: number;
  /** Draws a wireframe "image goes here" cross through the box. */
  cross?: boolean;
  /** Fill the box with paper so it hides what's beneath (e.g. its own shadow). */
  filled?: boolean;
  /** Color class for that paper fill (e.g. to tint it on hover). */
  fillClassName?: string;
  seed?: number;
}

/**
 * A container with a hand-drawn rough.js border. Adds the `sketch` class, so hovering it
 * thickens the line and "retraces" it with a second pencil pass (see globals.css).
 */
export function RoughBox({
  as: Tag = "div",
  children,
  className = "",
  shadow = 9,
  roughness = 1.1,
  strokeWidth = 2.2,
  cross = false,
  filled = true,
  fillClassName = "text-paper",
  seed,
  ...rest
}: RoughBoxProps) {
  const ref = useRef<HTMLElement>(null);
  const size = useElementSize(ref);
  const autoSeed = seedFrom(useId());
  const s = seed ?? autoSeed;

  const paths = useMemo(() => {
    if (!size) return [];
    const w = size.width - INSET * 2;
    const h = size.height - INSET * 2;
    const base = { seed: s, roughness, strokeWidth };
    const out: SketchPath[] = [];

    if (shadow > 0) {
      // Pencil-hatched drop shadow, like the shading in a sketchbook.
      out.push(
        ...sketch(
          generator.rectangle(INSET + shadow, INSET + shadow, w, h, {
            ...base,
            strokeWidth: 1,
            fill: FILL,
            fillStyle: "hachure",
            hachureGap: 4,
            fillWeight: 0.8,
            hachureAngle: -41,
          }),
          "text-ink-soft",
        ),
      );
    }
    if (filled) {
      out.push(
        ...sketch(
          generator.rectangle(INSET, INSET, w, h, { ...base, fill: FILL, fillStyle: "solid", stroke: "none" }),
          fillClassName,
        ),
      );
    }
    out.push(...sketch(generator.rectangle(INSET, INSET, w, h, base), "rough-line text-ink"));
    if (cross) {
      out.push(
        ...sketch(generator.line(INSET, INSET, INSET + w, INSET + h, { ...base, strokeWidth: 1 }), "text-ink-soft"),
        ...sketch(generator.line(INSET + w, INSET, INSET, INSET + h, { ...base, strokeWidth: 1 }), "text-ink-soft"),
      );
    }
    out.push(
      ...sketch(
        generator.rectangle(INSET, INSET, w, h, { ...base, seed: s + 7, disableMultiStroke: true, strokeWidth: strokeWidth + 0.6 }),
        "rough-retrace text-ink",
        true,
      ),
    );
    return out;
  }, [size, s, roughness, strokeWidth, shadow, filled, fillClassName, cross]);

  const Component = Tag as "div";

  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} className={`sketch relative isolate ${className}`} {...rest}>
      {size && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-visible"
          width={size.width}
          height={size.height}
        >
          <SketchPaths paths={paths} />
        </svg>
      )}
      {children}
    </Component>
  );
}

/** Absolutely positioned double-pass ellipse circling its parent (which must be `relative`). */
export function RoughCircle({ className = "", pad = 10 }: { className?: string; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const size = useElementSize(ref);
  const seed = seedFrom(useId());

  const paths = useMemo(() => {
    if (!size) return [];
    const { width: w, height: h } = size;
    const o = { seed, roughness: 1.3, strokeWidth: 1.8, disableMultiStroke: true };
    return [
      ...sketch(generator.ellipse(w / 2, h / 2, w - 2, h - 2, o)),
      ...sketch(generator.ellipse(w / 2 + 1, h / 2 - 1, w - 6, h - 4, { ...o, seed: seed + 3, strokeWidth: 1.2 })),
    ];
  }, [size, seed]);

  return (
    <span
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{ inset: `-${pad}px -${pad * 1.6}px` }}
    >
      {size && (
        <svg width={size.width} height={size.height} className="block overflow-visible">
          <SketchPaths paths={paths} />
        </svg>
      )}
    </span>
  );
}

/** A full-height hand-drawn vertical line (e.g. a timeline spine); position it with `className`. */
export function RoughVRule({ className = "", strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useElementSize(ref);
  const seed = seedFrom(useId());

  const paths = useMemo(() => {
    if (!size) return [];
    const o = { seed, roughness: 1, bowing: 0.4, strokeWidth, maxRandomnessOffset: 3 };
    return [
      ...sketch(generator.line(4, 0, 4, size.height, o)),
      ...sketch(generator.line(8, 0, 7, size.height, { ...o, seed: seed + 1, strokeWidth: strokeWidth * 0.5 })),
    ];
  }, [size, seed, strokeWidth]);

  return (
    <div ref={ref} aria-hidden className={`w-3 ${className}`}>
      {size && (
        <svg width={12} height={size.height} className="block overflow-visible">
          <SketchPaths paths={paths} />
        </svg>
      )}
    </div>
  );
}

/** A full-width hand-drawn horizontal rule. */
export function RoughRule({ className = "", strokeWidth = 1.5 }: { className?: string; strokeWidth?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useElementSize(ref);
  const seed = seedFrom(useId());

  const paths = useMemo(
    () => (size ? sketch(generator.line(2, 4, size.width - 2, 4, { seed, roughness: 1.6, bowing: 0.6, strokeWidth })) : []),
    [size, seed, strokeWidth],
  );

  return (
    <div ref={ref} aria-hidden className={`h-2 w-full ${className}`}>
      {size && (
        <svg width={size.width} height={8} className="block overflow-visible">
          <SketchPaths paths={paths} />
        </svg>
      )}
    </div>
  );
}
