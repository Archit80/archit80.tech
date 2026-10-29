"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { boyFace, speechBubbleWide } from "./art";
import { Sketch } from "./Sketch";

const LINES = ["hi!", "hire me?", "ship it!", "brb, debugging", "coffee?"];
// Pinned so the face keeps exactly this wobble, whatever changes around it on the page.
const FACE_SEED = 1507518;

/** The doodle self-portrait: poke it and it says something else (with a little squish). */
export function TalkingFace({ caption, size = 150, className = "" }: { caption?: string; size?: number; className?: string }) {
  const [line, setLine] = useState(0);
  // The bubble scales with the face, but never so small its text becomes unreadable.
  const bubble = Math.max(84, Math.round(size * 0.75));

  return (
    <div className={className}>
      <motion.button
        type="button"
        onClick={() => setLine((l) => (l + 1) % LINES.length)}
        aria-label="Poke the doodle"
        className="relative block cursor-pointer"
        whileHover={{ rotate: -3 }}
        whileTap={{ scale: 0.92, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* speech bubble */}
        <span className="absolute block rotate-6" style={{ top: -bubble * 0.5, right: -bubble * 0.56 }} aria-live="polite">
          <Sketch draw={speechBubbleWide} viewBox={[120, 60]} width={bubble} animate={false} />
          <span className="absolute inset-x-1 top-[8%] grid h-[64%] place-items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={line}
                className="font-hand whitespace-nowrap"
                style={{ fontSize: Math.round(bubble * (LINES[line].length > 6 ? 0.124 : 0.178)) }}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 24 } }}
                exit={{ scale: 0.6, opacity: 0, transition: { duration: 0.1 } }}
              >
                {LINES[line]}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>

        <Sketch draw={boyFace} viewBox={[120, 120]} width={size} seed={FACE_SEED} className="-rotate-6" />
      </motion.button>
      {caption && <p className="mt-1 -rotate-3 text-center font-hand text-lg">{caption}</p>}
    </div>
  );
}
