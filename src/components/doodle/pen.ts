import { FILL, generator, sketch, type Options, type SketchPath } from "@/lib/rough";

export type Pt = [number, number];

export interface Label {
  x: number;
  y: number;
  text: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  rotate?: number;
}

export interface Drawing {
  paths: SketchPath[];
  labels?: Label[];
  /** Data-flow routes (polylines); a dot travels along each when the drawing is replayed. */
  routes?: Pt[][];
}

/**
 * A seeded ink pen for composing doodles. Every stroke gets the next seed, so shapes wobble
 * differently from each other but identically on every render.
 */
export function createPen(seed: number, base: Options = {}) {
  let n = seed;
  const o = (extra: Options = {}): Options => ({ seed: n++, roughness: 0.9, bowing: 0.8, strokeWidth: 1.6, ...base, ...extra });
  const hatchOpts = (gap: number): Options =>
    o({ stroke: "none", fill: FILL, fillStyle: "hachure", hachureGap: gap, fillWeight: 0.8, hachureAngle: -41 });

  const pen = {
    line: (x1: number, y1: number, x2: number, y2: number, e?: Options) => sketch(generator.line(x1, y1, x2, y2, o(e))),
    box: (x: number, y: number, w: number, h: number, e?: Options) => sketch(generator.rectangle(x, y, w, h, o(e))),
    path: (d: string, e?: Options) => sketch(generator.path(d, o(e))),
    curve: (pts: Pt[], e?: Options) => sketch(generator.curve(pts, o(e))),
    circle: (cx: number, cy: number, d: number, e?: Options) => sketch(generator.circle(cx, cy, d, o(e))),
    ellipse: (cx: number, cy: number, w: number, h: number, e?: Options) => sketch(generator.ellipse(cx, cy, w, h, o(e))),
    dot: (cx: number, cy: number, d: number) => sketch(generator.circle(cx, cy, d, o({ fill: FILL, fillStyle: "solid" }))),
    polygon: (pts: Pt[], e?: Options) => sketch(generator.polygon(pts, o(e))),

    /** Diagonal pencil shading. */
    hatch: (x: number, y: number, w: number, h: number, gap = 4) =>
      sketch(generator.rectangle(x, y, w, h, hatchOpts(gap)), "hatch opacity-55"),
    hatchPath: (d: string, gap = 4) => sketch(generator.path(d, hatchOpts(gap)), "hatch opacity-55"),
    /** Opaque paper patch, to knock out lines behind a shape. */
    paper: (x: number, y: number, w: number, h: number) =>
      sketch(generator.rectangle(x, y, w, h, o({ stroke: "none", fill: FILL, fillStyle: "solid" })), "text-paper"),

    arrow(pts: Pt[], e: Options = {}, head = 9): SketchPath[] {
      const [tip, prev] = [pts[pts.length - 1], pts[pts.length - 2]];
      const a = Math.atan2(tip[1] - prev[1], tip[0] - prev[0]);
      const wing = (off: number): Pt => [tip[0] - head * Math.cos(a + off), tip[1] - head * Math.sin(a + off)];
      const body = pts.length > 2 ? pen.curve(pts, e) : pen.line(prev[0], prev[1], tip[0], tip[1], e);
      return [...body, ...sketch(generator.linearPath([wing(0.55), tip, wing(-0.55)], o(e)))];
    },

    monitor(x: number, y: number, w: number, h: number): SketchPath[] {
      const sh = h * 0.74;
      const cx = x + w / 2;
      return [
        ...pen.box(x, y, w, sh),
        ...pen.box(x + 5, y + 5, w - 10, sh - 10, { strokeWidth: 1 }),
        ...pen.line(x + 12, y + 14, x + w * 0.42, y + 14, { strokeWidth: 1.2 }),
        ...pen.line(x + 18, y + 22, x + w * 0.62, y + 22, { strokeWidth: 1.2 }),
        ...pen.line(x + 18, y + 30, x + w * 0.5, y + 30, { strokeWidth: 1.2 }),
        ...pen.line(cx, y + sh, cx, y + h - 4),
        ...pen.line(cx - w * 0.22, y + h, cx + w * 0.22, y + h, { strokeWidth: 2 }),
      ];
    },

    server(x: number, y: number, w: number, h: number): SketchPath[] {
      const out = [...pen.hatch(x, y + h * 0.62, w, h * 0.38, 4), ...pen.box(x, y, w, h)];
      for (let i = 1; i <= 3; i++) {
        const ly = y + (h * i) / 5;
        out.push(...pen.line(x + 6, ly, x + w - 14, ly, { strokeWidth: 1.2 }), ...pen.dot(x + w - 8, ly, 3));
      }
      return out;
    },

    database(x: number, y: number, w: number, h: number): SketchPath[] {
      const e = Math.min(14, h * 0.28);
      const rx = w / 2;
      const ry = e / 2;
      const band = (by: number) => `M ${x} ${by} A ${rx} ${ry} 0 0 0 ${x + w} ${by}`;
      return [
        ...pen.hatchPath(`M ${x} ${y + ry} L ${x} ${y + h - ry} A ${rx} ${ry} 0 0 0 ${x + w} ${y + h - ry} L ${x + w} ${y + ry} Z`, 4.5),
        ...pen.ellipse(x + rx, y + ry, w, e),
        ...pen.line(x, y + ry, x, y + h - ry),
        ...pen.line(x + w, y + ry, x + w, y + h - ry),
        ...pen.path(band(y + h - ry)),
        ...pen.path(band(y + h * 0.42)),
        ...pen.path(band(y + h * 0.68)),
      ];
    },

    browser(x: number, y: number, w: number, h: number, content: "lines" | "search" | "image" = "lines"): SketchPath[] {
      const bar = 11;
      const out = [
        ...pen.box(x, y, w, h),
        ...pen.line(x, y + bar, x + w, y + bar, { strokeWidth: 1.2 }),
        ...pen.dot(x + 6, y + bar / 2, 3.5),
        ...pen.dot(x + 12, y + bar / 2, 3.5),
        ...pen.dot(x + 18, y + bar / 2, 3.5),
      ];
      if (content === "lines") {
        out.push(
          ...pen.box(x + 7, y + bar + 7, w * 0.28, h * 0.32, { strokeWidth: 1.2 }),
          ...pen.line(x + w * 0.42, y + bar + 10, x + w - 8, y + bar + 10, { strokeWidth: 1.2 }),
          ...pen.line(x + w * 0.42, y + bar + 18, x + w - 16, y + bar + 18, { strokeWidth: 1.2 }),
          ...pen.line(x + 7, y + h - 12, x + w - 22, y + h - 12, { strokeWidth: 1.2 }),
        );
      } else if (content === "search") {
        const sy = y + bar + (h - bar) / 2 - 6;
        out.push(
          ...pen.box(x + 8, sy, w - 16, 13, { strokeWidth: 1.2 }),
          ...pen.circle(x + w - 17, sy + 6, 6, { strokeWidth: 1.1 }),
          ...pen.line(x + w - 14, sy + 9, x + w - 11, sy + 12, { strokeWidth: 1.1 }),
        );
      } else {
        out.push(...pen.imageFrame(x + 7, y + bar + 6, w - 14, h - bar - 13));
      }
      return out;
    },

    imageFrame(x: number, y: number, w: number, h: number): SketchPath[] {
      return [
        ...pen.box(x, y, w, h, { strokeWidth: 1.2 }),
        ...pen.polygon(
          [
            [x + 3, y + h - 3],
            [x + w * 0.38, y + h * 0.45],
            [x + w * 0.6, y + h * 0.72],
            [x + w * 0.74, y + h * 0.58],
            [x + w - 3, y + h - 3],
          ],
          { strokeWidth: 1.1 },
        ),
        ...pen.circle(x + w * 0.76, y + h * 0.28, Math.min(w, h) * 0.18, { strokeWidth: 1.1 }),
      ];
    },

    cloud(x: number, y: number, w: number, h: number): SketchPath[] {
      const p = (fx: number, fy: number) => `${x + w * fx} ${y + h * fy}`;
      return pen.path(
        `M ${p(0.22, 1)} Q ${p(0, 1)} ${p(0.02, 0.68)} Q ${p(0.04, 0.36)} ${p(0.3, 0.4)} Q ${p(0.36, 0)} ${p(0.62, 0.12)}` +
          ` Q ${p(0.86, 0.1)} ${p(0.84, 0.44)} Q ${p(1.02, 0.5)} ${p(0.96, 0.84)} Q ${p(0.92, 1)} ${p(0.76, 1)} Z`,
        { strokeWidth: 1.8 },
      );
    },

    star(cx: number, cy: number, r: number, filled = false): SketchPath[] {
      const pts: Pt[] = Array.from({ length: 10 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5;
        const rr = i % 2 ? r * 0.45 : r;
        return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
      });
      return pen.polygon(pts, filled ? { fill: FILL, fillStyle: "solid", strokeWidth: 1.2 } : { strokeWidth: 1.3 });
    },

    spiral(cx: number, cy: number, r: number, turns = 2.6): SketchPath[] {
      const pts: Pt[] = Array.from({ length: 40 }, (_, i) => {
        const t = i / 39;
        const a = t * turns * Math.PI * 2;
        return [cx + Math.cos(a) * r * t, cy + Math.sin(a) * r * t];
      });
      return pen.curve(pts, { strokeWidth: 1.4, roughness: 0.6 });
    },

    squiggle(x: number, y: number, w: number, amp = 5, waves = 4): SketchPath[] {
      const pts: Pt[] = Array.from({ length: waves * 4 + 1 }, (_, i) => [x + (w * i) / (waves * 4), y + Math.sin((i * Math.PI) / 2) * amp]);
      return pen.curve(pts, { strokeWidth: 1.5, roughness: 0.6 });
    },

    /** Dense back-and-forth scribble, like shading under a title. */
    zigzag(x: number, y: number, w: number, h: number, step = 7): SketchPath[] {
      const pts: Pt[] = [];
      for (let i = 0, px = x; px <= x + w; i++, px += step) pts.push([px, i % 2 ? y : y + h]);
      return sketch(generator.linearPath(pts, o({ strokeWidth: 1.5, roughness: 0.5 })));
    },
  };

  return pen;
}

export type Pen = ReturnType<typeof createPen>;
