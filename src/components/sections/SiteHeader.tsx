"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { sketchyRadius } from "@/components/doodle/SketchCard";
import { navLinks } from "@/data/doodle";
import { Marker } from "@/components/doodle/Marker";
import { RoughCircle, RoughRule } from "@/components/doodle/RoughBox";
import { ThemeToggle } from "@/components/doodle/ThemeToggle";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;
    // Active = the last section whose top has crossed 40% of the viewport (none while in the hero).
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((l) => l.id);

/**
 * Phones have no nav links in the header, so once you're past the hero a small pill in the corner
 * names the current section and opens a jump list.
 */
function JumpMenu({ active }: { active: string | null }) {
  const [open, setOpen] = useState(false);
  const visible = active !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed right-4 bottom-4 z-40 flex flex-col items-end sm:hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
        >
          {open && <button type="button" aria-label="Close menu" className="fixed inset-0 -z-10 cursor-default" onClick={() => setOpen(false)} />}
          <AnimatePresence>
            {open && (
              <motion.ul
                id="jump-menu"
                className={`mb-2 border-2 border-ink bg-paper px-4 py-2 shadow-hard-sm ${sketchyRadius}`}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                style={{ originX: 1, originY: 1 }}
              >
                {[{ id: "top", label: "top ↑" }, ...navLinks].map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-right font-hand text-lg tracking-wider uppercase"
                    >
                      <Marker active={active === link.id}>{link.label}</Marker>
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="jump-menu"
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center gap-2 border-2 border-ink bg-paper px-4 py-1.5 font-hand text-base tracking-wider uppercase shadow-hard-sm ${sketchyRadius}`}
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
            {open ? "close" : active}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The header's ruled line, inked in bold as you read down the page. */
function ProgressRule() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="relative">
      <RoughRule />
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-ink"
        style={{ scaleX: scrollYProgress, originX: 0 }}
      />
    </div>
  );
}

export function SiteHeader() {
  const active = useActiveSection(sectionIds);

  return (
    <header className="dot-paper sticky top-0 z-30">
      <nav aria-label="Primary" className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-10">
        <a href="#top" className="ink-heavy font-hand text-3xl" aria-label="Archit Taneja, back to top">
          AT.
        </a>

        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="hidden items-center gap-7 sm:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className="font-hand text-lg tracking-wider uppercase"
                >
                  <Marker active={active === link.id}>{link.label}</Marker>
                </a>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="pointer-events-none absolute inset-0"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  >
                    <RoughCircle pad={7} />
                  </motion.span>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <ProgressRule />
      </div>
      <JumpMenu active={active} />
    </header>
  );
}
