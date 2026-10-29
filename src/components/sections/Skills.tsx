"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { skillGroups, type DoodleSkill } from "@/data/doodle";
import { BracketsEgg } from "@/components/doodle/Eggs";
import { RoughBox } from "@/components/doodle/RoughBox";
import { SectionHeader, sketchyRadius } from "@/components/doodle/SketchCard";

// Stickers slapped on slightly crooked, like a real sticker book.
const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-3", "rotate-1", "-rotate-2", "rotate-3"];

const FINE_POINTER = "(pointer: fine)";

/**
 * Stickers are only draggable with a mouse/trackpad: on touch, dragging would swallow the
 * swipe and block scrolling through the section.
 */
function useFinePointer() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(FINE_POINTER);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

// How long a tapped sticker's name stays up on phones.
const PEEK_MS = 1400;

/** On phones stickers are logo-only to save space; tapping one pops its name up briefly. */
function Sticker({ skill, tilt, draggable }: { skill: DoodleSkill; tilt: string; draggable: boolean }) {
  const [peek, setPeek] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const showName = () => {
    window.clearTimeout(timer.current);
    setPeek(true);
    timer.current = window.setTimeout(() => setPeek(false), PEEK_MS);
  };

  return (
    <motion.li
      onClick={draggable ? undefined : showName}
      drag={draggable}
      dragSnapToOrigin
      dragElastic={0.5}
      // spring home with one small overshoot, then settle
      dragTransition={{ bounceStiffness: 300, bounceDamping: 24 }}
      whileDrag={{ scale: 1.08, zIndex: 20 }}
      className={`relative ${tilt} transition-[rotate,translate] duration-300 hover:-translate-y-1 hover:rotate-0 ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <span
        className={`inline-flex items-center gap-2 border-2 border-ink bg-paper p-2 shadow-hard-sm sm:px-2.5 sm:py-1 ${sketchyRadius}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs; next/image adds nothing */}
        <img
          src={skill.logo}
          alt=""
          width={20}
          height={20}
          loading="lazy"
          decoding="async"
          draggable={false}
          // Single-color logos are inverted in dark mode so they stay visible.
          className={`pointer-events-none size-6 object-contain sm:size-5 ${skill.mono ? "dark:invert" : ""}`}
        />
        <span className="font-hand text-sm whitespace-nowrap select-none max-sm:sr-only">{skill.name}</span>
      </span>
      <AnimatePresence>
        {peek && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 rounded-md bg-ink px-2 py-0.5 font-hand text-sm whitespace-nowrap text-paper sm:hidden"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
          >
            {skill.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function Skills() {
  const draggable = useFinePointer();

  return (
    <section id="skills" aria-label="Skills" className="scroll-mt-24">
      <SectionHeader title="Skills & Tools" note={draggable ? "(the whole toolbox — go on, drag one)" : "(tap a logo for its name)"} />

      <RoughBox className="px-5 py-2 sm:px-10 sm:py-4">
        <BracketsEgg className="absolute -top-7 right-6 hidden sm:block" />

        <div className="divide-y-2 divide-dashed divide-ink/20">
          {skillGroups.map((group) => (
            <div key={group.title} className="grid gap-3 py-4 sm:py-5 md:grid-cols-[10rem_1fr] md:items-center md:gap-6">
              <h3 className="font-display text-xl font-bold tracking-wide uppercase">{group.title}</h3>
              <ul aria-label={group.title} className="flex flex-wrap gap-2.5 sm:gap-3">
                {group.skills.map((skill, i) => (
                  <Sticker key={skill.name} skill={skill} tilt={TILTS[i % TILTS.length]} draggable={draggable} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RoughBox>
    </section>
  );
}
