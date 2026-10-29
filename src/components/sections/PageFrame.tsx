"use client";

import type { CSSProperties, ReactNode } from "react";
import { spiral, squiggleWave } from "@/components/doodle/art";
import { Sketch } from "@/components/doodle/Sketch";
import { CollectibleStar } from "@/components/doodle/StarHunt";

type MarginDoodle = "star" | "starFilled" | "spiral" | "squiggle";

// Margin doodles: [kind, side, top %, size]
const MARGIN_DOODLES: [MarginDoodle, "left" | "right", number, number][] = [
  ["starFilled", "left", 4, 22],
  ["spiral", "left", 14, 28],
  ["star", "right", 9, 26],
  ["squiggle", "right", 22, 34],
  ["star", "left", 31, 20],
  ["spiral", "right", 41, 26],
  ["starFilled", "left", 52, 18],
  ["squiggle", "left", 63, 32],
  ["star", "right", 60, 24],
  ["spiral", "left", 78, 26],
  ["starFilled", "right", 84, 20],
];

/** Stars can be collected; spirals spin and squiggles wiggle on hover. */
function GutterDoodle({ kind, width, className, style }: { kind: MarginDoodle; width: number; className: string; style: CSSProperties }) {
  if (kind === "star" || kind === "starFilled") {
    return <CollectibleStar filled={kind === "starFilled"} width={width} className={className} style={style} />;
  }
  return (
    <Sketch
      draw={kind === "spiral" ? spiral : squiggleWave}
      viewBox={[48, 48]}
      width={width}
      className={`${kind === "spiral" ? "doodle-spin" : "doodle-wiggle"} ${className}`}
      style={style}
    />
  );
}

/** The page column, with doodles scattered in the gutters on wide screens. */
export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto max-w-7xl px-5 pb-6 sm:px-10 md:px-14">
      {MARGIN_DOODLES.map(([kind, side, top, size], i) => (
        <GutterDoodle
          key={i}
          kind={kind}
          width={size}
          className={`absolute hidden xl:block ${side === "left" ? "-left-10" : "-right-10"}`}
          style={{ top: `${top}%` }}
        />
      ))}
      {children}
    </div>
  );
}
