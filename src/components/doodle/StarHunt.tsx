"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { contact } from "@/data/doodle";
import { useIsClient } from "@/lib/rough";
import { star, starFilled } from "./art";
import { Sketch } from "./Sketch";

// ── Session store: which stars are popped (survives reloads until the tab closes) ──

const STORAGE_KEY = "doodle:stars-found";
let found: Set<string> | null = null;
const listeners = new Set<() => void>();

function foundStars() {
  if (!found) {
    try {
      found = new Set(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as string[]);
    } catch {
      found = new Set();
    }
  }
  return found;
}

function persist() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...foundStars()]));
  } catch {
    // storage unavailable (private mode etc.): the hunt still works for this page view
  }
  listeners.forEach((l) => l());
}

const starStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  isFound: (id: string) => foundStars().has(id),
  add(id: string) {
    foundStars().add(id);
    persist();
  },
  /** Everything found: start over, so all the stars reappear at once. */
  reset() {
    found = new Set();
    persist();
  },
  count: () => foundStars().size,
};

/** Stars still on the page that the visitor can actually see (hidden-at-this-breakpoint ones don't count). */
function visibleStarsLeft() {
  return [...document.querySelectorAll("[data-star]")].filter((el) => el.getClientRects().length > 0).length;
}

const CollectContext = createContext<(id: string) => void>(() => {});

/**
 * Page-wide star hunt: every doodled star can be collected. A tally note shows progress; finding the
 * last visible one reveals a hidden sticky note and puts every star back.
 */
export function StarHuntProvider({ children }: { children: ReactNode }) {
  const [tally, setTally] = useState<{ found: number; left: number } | null>(null);
  const [complete, setComplete] = useState(false);
  const hideTimer = useRef<number>(undefined);
  const isClient = useIsClient();

  const collect = useCallback((id: string) => {
    starStore.add(id);
    // Wait a frame so the collected star has dropped its data-star attribute.
    requestAnimationFrame(() => {
      const left = visibleStarsLeft();
      window.clearTimeout(hideTimer.current);
      if (left === 0) {
        setTally(null);
        setComplete(true);
        // let the last burst play, then bring every star back
        window.setTimeout(() => starStore.reset(), 700);
        return;
      }
      setTally({ found: starStore.count(), left });
      hideTimer.current = window.setTimeout(() => setTally(null), 2200);
    });
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  return (
    <CollectContext.Provider value={collect}>
      {children}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {tally && (
              <motion.p
                key="tally"
                role="status"
                className="fixed bottom-5 left-5 z-[60] -rotate-2 border-2 border-ink bg-surface px-4 py-2 font-hand text-lg shadow-hard"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
              >
                ★ {tally.found} found · {tally.left} to go
              </motion.p>
            )}
            {complete && (
              <motion.div
                key="complete"
                role="dialog"
                aria-label="You found all the stars"
                className="fixed bottom-6 left-1/2 z-[60] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 border-2 border-ink bg-surface px-6 pt-7 pb-6 text-center font-hand shadow-hard"
                initial={{ y: 80, opacity: 0, rotate: -6 }}
                animate={{ y: 0, opacity: 1, rotate: -2 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <span aria-hidden className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 rotate-3 border border-ink/30 bg-ink/10" />
                <p className="text-3xl">★ ★ ★</p>
                <p className="mt-2 text-2xl leading-snug">You found them all — now you have to hire me.</p>
                <a href={`mailto:${contact.email}`} className="mt-4 inline-block text-lg underline decoration-dashed underline-offset-4">
                  {contact.email}
                </a>
                <button
                  type="button"
                  onClick={() => setComplete(false)}
                  aria-label="Close"
                  className="absolute top-2 right-3 text-xl transition-transform hover:rotate-90"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </CollectContext.Provider>
  );
}

const RAYS = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4 + Math.PI / 8);

/** A doodled star you can collect: clicking bursts a few rays out of it and it's gone (for this session). */
export function CollectibleStar({
  filled = false,
  width,
  className = "",
  style,
}: {
  filled?: boolean;
  width: number;
  className?: string;
  style?: CSSProperties;
}) {
  const collect = useContext(CollectContext);
  const id = useId();
  // Server snapshot is "not found", so hydration always matches; the client then applies the session.
  const isFound = useSyncExternalStore(
    starStore.subscribe,
    () => starStore.isFound(id),
    () => false,
  );
  // Only play the ray burst for a star collected right now, not ones restored from the session.
  const [burstKey, setBurstKey] = useState(0);

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden
      data-star={isFound ? undefined : ""}
      disabled={isFound}
      className={`${isFound ? "pointer-events-none" : "cursor-pointer transition-transform hover:scale-110"} ${className}`}
      style={style}
      onClick={() => {
        setBurstKey((k) => k + 1);
        collect(id);
      }}
    >
      <motion.span
        className="block"
        initial={false}
        animate={isFound ? { opacity: 0, scale: 0.6 } : { opacity: 1, scale: 1 }}
        transition={isFound ? { duration: 0.2, ease: "easeOut" } : { type: "spring", stiffness: 380, damping: 18 }}
      >
        <Sketch draw={filled ? starFilled : star} viewBox={[48, 48]} width={width} />
      </motion.span>

      {burstKey > 0 && isFound && (
        <svg key={burstKey} aria-hidden viewBox="-24 -24 48 48" className="pointer-events-none absolute inset-0 size-full overflow-visible text-ink">
          {RAYS.map((a) => (
            <motion.line
              key={a}
              x1={Math.cos(a) * 9}
              y1={Math.sin(a) * 9}
              x2={Math.cos(a) * 15}
              y2={Math.sin(a) * 15}
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinecap="round"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos(a) * 12, y: Math.sin(a) * 12, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          ))}
        </svg>
      )}
    </button>
  );
}
