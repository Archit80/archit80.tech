"use client";

import { motion, useAnimate } from "framer-motion";
import { useRef } from "react";
import { paperPlane } from "./art";
import { Sketch } from "./Sketch";

type Pt = [number, number];

// Nose direction of the paper-plane drawing (tail → tip), in degrees (y points down).
const HEADING = (Math.atan2(5 - 22, 45 - 3) * 180) / Math.PI;

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const unitAt = (deg: number): Pt => [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)];

/**
 * Samples a cubic Bézier into keyframes. Rotation follows the tangent, kept continuous with
 * `fromRotate` so the plane never spins the long way round. `ease` remaps progress (speed-up / slow-down).
 */
function sampleFlight(P: Pt[], fromRotate: number, ease: (t: number) => number, steps = 24) {
  const x: number[] = [];
  const y: number[] = [];
  const rotate: number[] = [];
  let prev = fromRotate;

  for (let i = 0; i <= steps; i++) {
    const t = ease(i / steps);
    const m = 1 - t;
    const at = (k: 0 | 1) => m ** 3 * P[0][k] + 3 * m * m * t * P[1][k] + 3 * m * t * t * P[2][k] + t ** 3 * P[3][k];
    const slope = (k: 0 | 1) => 3 * m * m * (P[1][k] - P[0][k]) + 6 * m * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]);
    let r = (Math.atan2(slope(1), slope(0)) * 180) / Math.PI - HEADING;
    while (r - prev > 180) r -= 360;
    while (r - prev < -180) r += 360;
    prev = r;
    x.push(at(0));
    y.push(at(1));
    rotate.push(r);
  }
  return { x, y, rotate };
}

/**
 * A fresh, randomised flight plan for one throw: lift, then either an anticlockwise turn and a swoop
 * off the left edge, or straight off the right edge with no turn. After a pause off-screen, a return
 * route brings it back in from the left to glide home. `toLeft` / `toRight` are the px to each edge.
 */
function planFlight(toLeft: number, toRight: number) {
  const lift = -rand(60, 110);
  const goRight = Math.random() < 0.5;
  const turn = goRight ? 0 : -rand(120, 155); // anticlockwise: nose ends up pointing up-left
  const [nx, ny] = unitAt(HEADING + turn);

  // Outbound: launch along the (new) heading, dip (or not) into a swoop, climb off-screen.
  const side = goRight ? toRight : -toLeft;
  const launch = rand(110, 220);
  const swoop = rand(-60, 120); // positive = dips below the start, negative = straight climb
  const exit: Pt = [side, lift - rand(150, 520)];
  const speedUp = rand(1.2, 1.7);
  const out = sampleFlight(
    [[0, lift], [launch * nx, lift + launch * ny], [side * rand(0.25, 0.55), swoop], exit],
    turn,
    (t) => t ** speedUp, // speed up as it leaves
  );
  const distance = toLeft;

  // Return: come back in from the left at a random height, loop round, and land nose-first at home.
  const [hx, hy] = unitAt(HEADING);
  const approach = rand(110, 200);
  const slowDown = rand(1.6, 2.2);
  const back = sampleFlight(
    [
      [-distance, rand(-260, 220)],
      [-distance * rand(0.3, 0.6), rand(120, 340)],
      [-approach * hx, -approach * hy + rand(-40, 40)],
      [0, 0],
    ],
    0,
    (t) => 1 - (1 - t) ** slowDown, // slow down as it lands
  );
  back.rotate[back.rotate.length - 1] = 0;

  return {
    lift: { y: lift, duration: rand(0.3, 0.5) },
    turn: goRight ? null : { rotate: turn, duration: rand(0.3, 0.55) },
    out: { path: out, duration: rand(1.0, 1.7) },
    pause: rand(0.2, 0.9),
    back: { path: back, duration: rand(1.3, 2.1) },
  };
}

/** A paper-plane doodle you can throw: it lifts, flies off-screen left or right, and glides back home — differently every time. */
export function PaperPlane({ width = 44, className = "" }: { width?: number; className?: string }) {
  const [scope, animate] = useAnimate();
  const flying = useRef(false);

  const fly = async () => {
    if (flying.current) return;
    flying.current = true;
    const el = scope.current;
    const rect = el.getBoundingClientRect();
    const plan = planFlight(rect.right + 160, window.innerWidth - rect.left + 160);
    const { back } = plan;

    await animate(el, { y: plan.lift.y }, { duration: plan.lift.duration, ease: [0.22, 1, 0.36, 1] });
    if (plan.turn) await animate(el, { rotate: plan.turn.rotate }, { duration: plan.turn.duration, ease: [0.45, 0, 0.55, 1] });
    await animate(el, plan.out.path, { duration: plan.out.duration, ease: "linear" });
    // Off-screen: line up at the start of the return leg (invisible jump).
    await animate(el, { x: back.path.x[0], y: back.path.y[0], rotate: back.path.rotate[0] }, { duration: 0 });
    await animate(el, back.path, { duration: back.duration, ease: "linear", delay: plan.pause });
    flying.current = false;
  };

  return (
    <button
      type="button"
      onClick={fly}
      aria-label="Throw the paper plane"
      title="Throw me!"
      className={`cursor-pointer transition-transform hover:scale-110 ${className}`}
    >
      <motion.span ref={scope} className="pointer-events-none block">
        <Sketch draw={paperPlane} viewBox={[48, 48]} width={width} animate={false} />
      </motion.span>
    </button>
  );
}
