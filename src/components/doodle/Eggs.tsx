"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useRef, useState } from "react";
import { easterEggs } from "@/data/doodle";
import { brackets, coffeeSips, sdcBadge } from "./art";
import { EasterEgg } from "./EasterEgg";
import { Sketch } from "./Sketch";

/** Coffee cup: each poke is a sip; once it's empty it says "brb" and refills. */
export function CoffeeEgg({ className = "" }: { className?: string }) {
  const [sips, setSips] = useState(0);
  const [puffs, setPuffs] = useState<{ id: number; text: string }[]>([]);
  const nextId = useRef(0);
  const empty = coffeeSips.length - 1;

  const sip = () => {
    if (sips >= empty) return; // already off for a refill
    const next = sips + 1;
    setSips(next);
    setPuffs((p) => [...p, { id: nextId.current++, text: next === empty ? "brb ☕" : "sip!" }]);
    if (next === empty) window.setTimeout(() => setSips(0), 1800);
  };

  return (
    <EasterEgg label="Coffee cup doodle" note={easterEggs.coffee} tilt={-2} className={className} onPoke={sip}>
      <span className="relative block">
        <Sketch draw={coffeeSips[sips]} viewBox={[64, 64]} width={56} animate={false} />
        <AnimatePresence>
          {puffs.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden
              className="absolute -top-3 left-1/2 font-hand text-base whitespace-nowrap"
              initial={{ x: "-50%", y: 0, opacity: 0 }}
              animate={{ y: -42, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              onAnimationComplete={() => setPuffs((all) => all.filter((x) => x.id !== p.id))}
            >
              {p.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </EasterEgg>
  );
}

/** `{ ; }` with its hover note. */
export function BracketsEgg({ className = "" }: { className?: string }) {
  return (
    <EasterEgg label="Code brackets doodle" note={easterEggs.brackets} tilt={-1.5} className={className}>
      <Sketch draw={brackets} viewBox={[64, 64]} width={52} animate={false} />
    </EasterEgg>
  );
}

/** SDC badge: poke it and it flips like a coin. */
export function SdcBadgeEgg({ className = "" }: { className?: string }) {
  const [scope, animate] = useAnimate();
  const busy = useRef(false);

  const flip = async () => {
    if (busy.current) return;
    busy.current = true;
    await animate(scope.current, { rotateY: [0, 720], y: [0, -26, 0] }, { duration: 0.9, ease: "easeInOut" });
    await animate(scope.current, { rotateY: 0 }, { duration: 0 });
    busy.current = false;
  };

  return (
    <EasterEgg label="SDC badge doodle" note={easterEggs.sdc} tilt={3} className={className} onPoke={flip}>
      <motion.span ref={scope} className="block" style={{ transformPerspective: 400 }}>
        <Sketch draw={sdcBadge} viewBox={[64, 64]} width={46} animate={false} />
      </motion.span>
    </EasterEgg>
  );
}
