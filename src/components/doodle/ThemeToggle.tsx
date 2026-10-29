"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useId } from "react";
import { useIsClient } from "@/lib/rough";

const RAYS = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);

function SunIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      {RAYS.map((a, i) => (
        // Alternate ray lengths and a little wobble for the hand-drawn feel.
        <line
          key={a}
          x1={12 + Math.cos(a) * 8}
          y1={12 + Math.sin(a) * 8}
          x2={12 + Math.cos(a + 0.06) * (i % 2 ? 10.5 : 11.8)}
          y2={12 + Math.sin(a + 0.06) * (i % 2 ? 10.5 : 11.8)}
        />
      ))}
    </svg>
  );
}

function MoonIcon() {
  const maskId = `moon-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <mask id={maskId}>
        <rect x="-4" y="-4" width="32" height="32" fill="white" />
        <circle cx="17" cy="6.5" r="7.5" fill="black" />
      </mask>
      <circle cx="12" cy="12" r="9" fill="currentColor" stroke="currentColor" strokeWidth="2" mask={`url(#${maskId})`} />
    </svg>
  );
}

/** Sun/moon toggle: the current icon jumps up and away, the other one drops into its place. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const isDark = isClient && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Lights on" : "Lights off"}
      className="grid size-11 place-items-center text-ink"
    >
      {isClient && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            className="block"
            initial={{ y: -28, opacity: 0, rotate: -25 }}
            animate={{ y: 0, opacity: 1, rotate: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ y: -28, opacity: 0, rotate: 25, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
          >
            {isDark ? <MoonIcon /> : <SunIcon />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
