"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { titleScribble } from "./art";
import type { Drawing } from "./pen";
import { RoughBox, RoughCircle } from "./RoughBox";
import { Sketch } from "./Sketch";

interface SketchCardProps {
  title: string;
  icon?: (seed: number) => Drawing;
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "aside";
}

// Asymmetric elliptical radii make a plain CSS border read like a pen outline (cheap: no SVG).
export const sketchyRadius = "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]";

/** A sketchbook card with a doodled icon, chunky sketched title and hatched shadow. */
export function SketchCard({ title, icon, children, className = "", as = "article" }: SketchCardProps) {
  return (
    <RoughBox as={as} className={`p-6 sm:p-8 ${className}`}>
      <header className="flex items-center gap-3 sm:gap-4">
        {icon && <Sketch draw={icon} viewBox={[48, 48]} width={48} className="shrink-0" />}
        <h3 className="font-display text-[1.6rem] leading-none font-bold tracking-wide uppercase sm:text-3xl">{title}</h3>
      </header>
      {children}
    </RoughBox>
  );
}

/** Section heading: big sketched title with a scribbled underline and a handwritten aside. */
export function SectionHeader({ title, note }: { title: string; note?: string }) {
  return (
    <header className="mb-10 flex flex-wrap items-end gap-x-5 gap-y-1 sm:mb-12">
      <div>
        <h2 className="font-display text-5xl leading-none font-bold tracking-wide uppercase sm:text-6xl">{title}</h2>
        <Sketch draw={titleScribble} viewBox={[400, 18]} className="mt-2 max-w-[18rem]" />
      </div>
      {note && <p className="pb-4 font-hand text-lg text-ink-soft">{note}</p>}
    </header>
  );
}

/** Hand-lettered label inside a scribbled double ellipse ("VIEW PROJECT"). */
export function CircleButton({ children, className = "", ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`group relative inline-flex px-2 py-1 font-display text-lg leading-tight font-bold tracking-wide uppercase transition-transform hover:-rotate-3 hover:scale-105 ${className}`}
      {...rest}
    >
      <RoughCircle className="transition-transform duration-300 group-hover:rotate-6" />
      {children}
    </button>
  );
}

/** Same look as CircleButton, for links. */
export function CircleLink({ children, className = "", ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`group relative inline-flex px-2 py-1 font-display text-lg leading-tight font-bold tracking-wide uppercase transition-transform hover:-rotate-3 hover:scale-105 ${className}`}
      {...rest}
    >
      <RoughCircle className="transition-transform duration-300 group-hover:rotate-6" />
      {children}
    </a>
  );
}
