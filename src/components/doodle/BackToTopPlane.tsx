"use client";

import { useAnimate } from "framer-motion";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { paperPlane } from "./art";
import { Sketch } from "./Sketch";

// The drawing's nose points up-right (about -22°); this turn points it straight up.
const NOSE_UP = -68;

/** Footer paper plane: turns its nose up, climbs off the top of the screen, then the page glides back to the top. */
export function BackToTopPlane({ className = "" }: { className?: string }) {
  const [scope, animate] = useAnimate();
  const lenis = useLenis();
  const flying = useRef(false);

  const fly = async () => {
    if (flying.current) return;
    flying.current = true;
    const el = scope.current;
    const rise = -(el.getBoundingClientRect().bottom + 120); // far enough to clear the top edge

    await animate(el, { rotate: NOSE_UP, y: -8 }, { duration: 0.3, ease: [0.45, 0, 0.55, 1] });
    await animate(el, { y: [-8, rise * 0.25, rise], x: [0, 18, 40], rotate: [NOSE_UP, NOSE_UP + 4, NOSE_UP + 8] }, { duration: 0.9, ease: "easeIn" });
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    // It's off-screen now: park it back home, ready for next time.
    await animate(el, { x: 0, y: 0, rotate: 0, opacity: 0 }, { duration: 0 });
    await animate(el, { opacity: 1 }, { duration: 0.3, delay: 1.2 });
    flying.current = false;
  };

  return (
    <button
      type="button"
      onClick={fly}
      aria-label="Back to top"
      className={`group inline-flex cursor-pointer items-center gap-2 font-hand text-lg ${className}`}
    >
      <span ref={scope} className="block transition-transform group-hover:-translate-y-1">
        <Sketch draw={paperPlane} viewBox={[48, 48]} width={40} animate={false} />
      </span>
      back to top ↑
    </button>
  );
}
