"use client";

import rough from "roughjs";
import type { Drawable, Options } from "roughjs/bin/core";
import type { RoughGenerator } from "roughjs/bin/generator";
import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

export type { Drawable, Options, RoughGenerator };

// One shared, DOM-free generator. Shapes become plain <path>s rendered by React,
// so colors come from `currentColor` + CSS and follow the theme without a redraw.
export const generator = rough.generator();

// rough.js only emits a fill when `fill` is set; the value itself is ignored because
// every path is painted with currentColor.
export const FILL = "currentColor";

export interface SketchPath {
  d: string;
  fill: boolean;
  strokeWidth: number;
  className?: string;
  retrace?: boolean;
}

/** Converts a rough.js drawable into paths, tagging each with a className for coloring. */
export function sketch(drawable: Drawable, className?: string, retrace = false): SketchPath[] {
  return generator
    .toPaths(drawable)
    .filter((p) => p.stroke !== "none" || (p.fill && p.fill !== "none"))
    .map((p) => ({
      d: p.d,
      fill: Boolean(p.fill && p.fill !== "none"),
      strokeWidth: p.strokeWidth,
      className,
      retrace,
    }));
}

/**
 * Renders sketch paths. With `draw`, strokes get `pathLength=1` and a staggered delay so an
 * `.ink-draw.is-drawn` ancestor can animate them in, pen-stroke by pen-stroke (see globals.css).
 */
export function SketchPaths({ paths, draw = false, stagger = 45 }: { paths: SketchPath[]; draw?: boolean; stagger?: number }) {
  // Hachure fills are many short strokes; they fade in as one "fill" layer instead of drawing.
  const isHatch = (p: SketchPath) => p.className?.includes("hatch");

  return paths.map((p, i) => {
    const role = p.fill || isHatch(p) ? "fill" : "stroke";
    const className = [p.className, draw && role].filter(Boolean).join(" ") || undefined;
    const style = draw && role === "stroke" ? { transitionDelay: `${i * stagger}ms` } : undefined;

    return p.fill ? (
      <path key={i} d={p.d} className={className} fill="currentColor" stroke="none" />
    ) : (
      <path
        key={i}
        d={p.d}
        className={className}
        style={style}
        fill="none"
        stroke="currentColor"
        strokeWidth={p.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={p.retrace || (draw && role === "stroke") ? 1 : undefined}
      />
    );
  });
}

/** Stable numeric seed from a string, so every doodle wobbles the same way on every render. */
export function seedFrom(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) | 0;
  return (Math.abs(hash) % 2_000_000) + 1;
}

const noopSubscribe = () => () => {};

/**
 * True after hydration. rough.js output is float-heavy, so sketches render client-side only
 * to avoid server/client mismatches; every sketch sits in a fixed-size box, so there's no layout shift.
 */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0];
      const width = Math.round(box.inlineSize);
      const height = Math.round(box.blockSize);
      setSize((prev) => (prev && prev.width === width && prev.height === height ? prev : { width, height }));
    });
    observer.observe(el, { box: "border-box" });
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
