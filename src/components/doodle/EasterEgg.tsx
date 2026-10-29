"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/rough";

interface EasterEggProps {
  /** Accessible name for the doodle, e.g. "Coffee cup doodle". */
  label: string;
  note: string;
  children: ReactNode;
  /** Sticky-note tilt in degrees (-2 to 3 feels organic). */
  tilt?: number;
  className?: string;
  /** Called on every click/tap, for doodles that also do something when poked. */
  onPoke?: () => void;
}

const NOTE_WIDTH = 248;
const CURSOR_GAP = 18;

/**
 * A background doodle that reveals a handwritten sticky note next to the cursor on hover.
 * Keyboard focus and taps pin the note under the doodle instead.
 */
export function EasterEgg({ label, note, children, tilt = 2, className = "", onPoke }: EasterEggProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const pointerType = useRef("");
  const isClient = useIsClient();
  const noteId = useId();

  const anchorBelow = (el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setPos({ x: r.left + r.width / 2 - NOTE_WIDTH / 2, y: r.bottom + 6 });
  };

  const followCursor = (e: PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    setPos({ x: e.clientX + CURSOR_GAP, y: e.clientY + CURSOR_GAP });
  };

  // Keep the note on-screen.
  const left = pos ? Math.min(Math.max(pos.x, 8), window.innerWidth - NOTE_WIDTH - 8) : 0;
  const top = pos ? (pos.y > window.innerHeight - 140 ? pos.y - 150 : pos.y) : 0;

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-describedby={pos ? noteId : undefined}
        className={`group ${onPoke ? "cursor-pointer" : "cursor-help"} text-ink transition-transform duration-300 hover:-rotate-6 ${className}`}
        onPointerDown={(e) => (pointerType.current = e.pointerType)}
        onPointerMove={followCursor}
        onPointerLeave={(e) => e.pointerType === "mouse" && setPos(null)}
        onFocus={(e) => e.currentTarget.matches(":focus-visible") && anchorBelow(e.currentTarget)}
        onBlur={() => setPos(null)}
        onClick={(e) => {
          onPoke?.();
          if (pointerType.current === "mouse") return; // hover already shows the note
          if (pos) setPos(null);
          else anchorBelow(e.currentTarget);
        }}
      >
        {children}
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {pos && (
              <motion.div
                id={noteId}
                role="tooltip"
                className="pointer-events-none fixed z-[70] rounded-sm border-2 border-ink bg-surface px-4 py-3 font-hand text-lg leading-snug text-ink shadow-hard"
                style={{ left, top, width: NOTE_WIDTH }}
                initial={{ opacity: 0, scale: 0.85, rotate: tilt - 4 }}
                animate={{ opacity: 1, scale: 1, rotate: tilt }}
                exit={{ opacity: 0, scale: 0.9, rotate: tilt + 2, transition: { duration: 0.12 } }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                {/* strip of tape */}
                <span
                  aria-hidden
                  className="absolute -top-2.5 left-1/2 h-4 w-14 -translate-x-1/2 -rotate-3 border border-ink/30 bg-ink/10 backdrop-blur-[1px]"
                />
                {note}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
