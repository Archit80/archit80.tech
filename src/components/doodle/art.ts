// Every doodle on the page, drawn with the seeded pen. Pure functions: (seed) => Drawing.
import { FILL } from "@/lib/rough";
import { createPen, type Drawing } from "./pen";

type Draw = (seed: number) => Drawing;

// ── Icons (48 × 48) ──────────────────────────────────────────

export const gradCap: Draw = (seed) => {
  const p = createPen(seed);
  const top: [number, number][] = [
    [24, 8],
    [45, 17],
    [24, 26],
    [3, 17],
  ];
  return {
    paths: [
      ...p.polygon(top, { stroke: "none", fill: FILL, fillStyle: "hachure", hachureGap: 3.5, fillWeight: 0.8 }),
      ...p.polygon(top, { strokeWidth: 2 }),
      ...p.path("M12 21 L12 31 Q24 37 36 31 L36 21", { strokeWidth: 2 }),
      ...p.line(40, 18, 40, 32),
      ...p.dot(40, 35, 5),
    ],
  };
};

export const browserLink: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.browser(2, 4, 34, 28, "lines"),
      ...p.paper(26, 26, 22, 20),
      ...p.ellipse(32, 38, 15, 9, { strokeWidth: 1.8 }),
      ...p.ellipse(41, 33, 15, 9, { strokeWidth: 1.8 }),
    ],
  };
};

export const aiHead: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.circle(24, 29, 32, { strokeWidth: 1.8 }),
      ...p.path("M10 24 Q12 12 24 12 Q36 12 38 24", { strokeWidth: 1.4 }),
      ...p.dot(18, 29, 3.5),
      ...p.dot(30, 29, 3.5),
      ...p.path("M18 36 Q24 41 30 36"),
      ...p.box(15, 1, 18, 11, { strokeWidth: 1.4 }),
      ...p.line(24, 12, 24, 14),
    ],
    labels: [{ x: 24, y: 10, text: "AI", size: 8 }],
  };
};

export const paperPlane: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.polygon(
        [
          [3, 22],
          [45, 5],
          [30, 41],
          [22, 28],
        ],
        { strokeWidth: 1.5 },
      ),
      ...p.line(22, 28, 45, 5, { strokeWidth: 1.2 }),
    ],
  };
};

export const bolt: Draw = (seed) => {
  const p = createPen(seed);
  const shape: [number, number][] = [
    [28, 3],
    [9, 27],
    [22, 27],
    [18, 45],
    [39, 19],
    [26, 19],
  ];
  return {
    paths: [
      ...p.polygon(shape, { stroke: "none", fill: FILL, fillStyle: "hachure", hachureGap: 3.5, fillWeight: 0.8 }),
      ...p.polygon(shape, { strokeWidth: 2 }),
    ],
  };
};

export const penNib: Draw = (seed) => {
  const p = createPen(seed);
  const nib = "M24 4 L38 22 L30 40 L18 40 L10 22 Z";
  return {
    paths: [
      ...p.hatchPath(nib, 4),
      ...p.path(nib, { strokeWidth: 2 }),
      ...p.line(24, 4, 24, 27),
      ...p.circle(24, 29, 6),
      ...p.box(16, 40, 16, 6, { strokeWidth: 1.6 }),
    ],
  };
};

export const users: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.circle(31, 15, 13, { strokeWidth: 1.6 }),
      ...p.path("M21 40 Q22 26 31 26 Q41 26 43 40", { strokeWidth: 1.6 }),
      ...p.paper(4, 12, 27, 34),
      ...p.circle(17, 18, 15, { strokeWidth: 2 }),
      ...p.path("M5 44 Q6 29 17 29 Q28 29 29 44 Z", { strokeWidth: 2, fill: FILL, fillStyle: "hachure", hachureGap: 3.5, fillWeight: 0.8 }),
    ],
  };
};

export const speechBubble: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.path("M6 8 Q6 4 10 4 L40 4 Q44 4 44 8 L44 28 Q44 32 40 32 L20 32 L10 43 L12 32 L10 32 Q6 32 6 28 Z", { strokeWidth: 2 }),
      ...p.line(13, 13, 36, 13, { strokeWidth: 1.3 }),
      ...p.line(13, 20, 30, 20, { strokeWidth: 1.3 }),
    ],
  };
};

// Chunky link icons for the contact note: heavier strokes than the card icons so they read small.
const CHUNKY = { strokeWidth: 2.6 };

export const githubCat: Draw = (seed) => {
  const p = createPen(seed);
  const head = "M13 20 L11 8 L19 13 Q24 11.5 29 13 L37 8 L35 20 Q38 24 37 29 Q35 37 24 37 Q13 37 11 29 Q10 24 13 20 Z";
  return {
    paths: [
      ...p.hatchPath(head, 3.5),
      ...p.path(head, CHUNKY),
      ...p.line(20, 37, 20, 45, CHUNKY),
      ...p.line(28, 37, 28, 45, CHUNKY),
      ...p.path("M20 41 Q12 43 9 36", { strokeWidth: 2.2 }),
    ],
  };
};

export const linkedinMark: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.box(5, 5, 38, 38, CHUNKY),
      ...p.dot(15, 14, 5),
      ...p.line(15, 20, 15, 35, { strokeWidth: 3.2 }),
      ...p.line(22, 20, 22, 35, { strokeWidth: 3.2 }),
      ...p.path("M22 27 Q22 20 28 20 Q34 20 34 27 L34 35", { strokeWidth: 3.2 }),
    ],
  };
};

export const instaCamera: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.path("M14 6 L34 6 Q42 6 42 14 L42 34 Q42 42 34 42 L14 42 Q6 42 6 34 L6 14 Q6 6 14 6 Z", CHUNKY),
      ...p.circle(24, 24, 18, CHUNKY),
      ...p.dot(34.5, 13.5, 5),
    ],
  };
};

export const resumePage: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.hatchPath("M30 4 L30 14 L40 14 Z", 3),
      ...p.path("M10 4 L30 4 L40 14 L40 44 L10 44 Z", CHUNKY),
      ...p.path("M30 4 L30 14 L40 14", { strokeWidth: 2 }),
      ...p.line(16, 22, 34, 22),
      ...p.line(16, 29, 34, 29),
      ...p.line(16, 36, 27, 36),
    ],
  };
};

export const envelope: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.box(4, 11, 40, 26, CHUNKY),
      ...p.path("M5 12 L24 28 L43 12", { strokeWidth: 2.2 }),
      ...p.line(5, 36, 18, 24, { strokeWidth: 1.4 }),
      ...p.line(43, 36, 30, 24, { strokeWidth: 1.4 }),
    ],
  };
};

// ── Theme toggle (48 × 48) ───────────────────────────────────

export const sun: Draw = (seed) => {
  const p = createPen(seed);
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + 0.1;
    const r2 = i % 2 ? 19 : 22;
    return p.line(24 + Math.cos(a) * 14.5, 24 + Math.sin(a) * 14.5, 24 + Math.cos(a) * r2, 24 + Math.sin(a) * r2, { strokeWidth: 2.2 });
  });
  return {
    paths: [
      ...p.circle(24, 24, 20, { stroke: "none", fill: FILL, fillStyle: "hachure", hachureGap: 3, fillWeight: 0.9 }),
      ...p.circle(24, 24, 20, { strokeWidth: 2.2 }),
      ...rays.flat(),
    ],
  };
};

export const moon: Draw = (seed) => {
  const p = createPen(seed);
  const crescent = "M28 5 A19 19 0 1 0 44 32 A15 15 0 1 1 28 5 Z";
  return {
    paths: [...p.hatchPath(crescent, 3), ...p.path(crescent, { strokeWidth: 2.2 }), ...p.star(40, 10, 4.5, true), ...p.dot(34, 20, 2.5)],
  };
};

export const star: Draw = (seed) => ({ paths: createPen(seed).star(24, 24, 20) });
export const starFilled: Draw = (seed) => ({ paths: createPen(seed).star(24, 24, 20, true) });
export const spiral: Draw = (seed) => ({ paths: createPen(seed).spiral(24, 24, 20) });
export const squiggleWave: Draw = (seed) => ({ paths: createPen(seed).squiggle(2, 24, 44, 8, 3) });

// ── Easter-egg doodles (64 × 64) ─────────────────────────────

/** Coffee cup filled to `level` (0 = empty, 1 = full). The liquid narrows with the cup towards the bottom. */
const coffeeAt =
  (level: number): Draw =>
  (seed) => {
    const p = createPen(seed);
    const top = 54 - 26 * level;
    const inset = (3 * (top - 28)) / 26;
    return {
      paths: [
        ...(level > 0 ? p.hatchPath(`M${17 + inset} ${top} L${47 - inset} ${top} L44 54 L20 54 Z`, 4) : []),
        ...p.path("M14 22 L19 55 Q20 58 24 58 L40 58 Q44 58 45 55 L50 22 Z", { strokeWidth: 2 }),
        ...p.path("M49 29 C60 28 61 45 46 45", { strokeWidth: 2 }),
        ...p.line(8, 61, 56, 61, { strokeWidth: 2 }),
        ...p.path("M24 17 C20 12 28 9 24 3"),
        ...p.path("M33 17 C29 12 37 9 33 3"),
        ...p.path("M42 17 C38 12 46 9 42 3"),
      ],
    };
  };

/** Coffee after 0, 1, 2, 3 and 4 sips. */
export const coffeeSips: Draw[] = [1, 0.72, 0.46, 0.2, 0].map(coffeeAt);

/** `{ ; }` (64 × 64) — curly braces around the forgotten semicolon. */
export const brackets: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.path("M22 6 C13 6 16 18 16 24 C16 30 10 32 6 32 C10 32 16 34 16 40 C16 46 13 58 22 58", { strokeWidth: 2.4 }),
      ...p.path("M42 6 C51 6 48 18 48 24 C48 30 54 32 58 32 C54 32 48 34 48 40 C48 46 51 58 42 58", { strokeWidth: 2.4 }),
      ...p.dot(32, 27, 5),
      ...p.path("M33 37 C34 40 32 43 29 45", { strokeWidth: 2.4 }),
    ],
  };
};

export const sdcBadge: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.polygon(
        [
          [20, 44],
          [14, 62],
          [22, 57],
          [27, 63],
          [30, 48],
        ],
        { fill: FILL, fillStyle: "hachure", hachureGap: 3, fillWeight: 0.8 },
      ),
      ...p.polygon(
        [
          [44, 44],
          [50, 62],
          [42, 57],
          [37, 63],
          [34, 48],
        ],
        { fill: FILL, fillStyle: "hachure", hachureGap: 3, fillWeight: 0.8 },
      ),
      ...p.paper(9, 5, 46, 46),
      ...p.circle(32, 28, 46, { strokeWidth: 2 }),
      ...p.circle(32, 28, 36, { strokeWidth: 1, strokeLineDash: [3, 4] }),
    ],
    labels: [{ x: 32, y: 33, text: "SDC", size: 13 }],
  };
};

// ── Hero bits ────────────────────────────────────────────────

/** Doodle self-portrait (120 × 120): messy hair, happy closed eyes, big grin. */
export const boyFace: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.circle(60, 66, 80, { strokeWidth: 2.2 }),
      ...p.curve(
        [
          [22, 56],
          [26, 34],
          [40, 30],
          [46, 22],
          [58, 28],
          [66, 18],
          [76, 28],
          [90, 24],
          [94, 40],
          [100, 56],
        ],
        { strokeWidth: 2.2 },
      ),
      ...p.path("M30 46 Q36 34 46 40 Q52 30 62 38 Q70 30 78 40 Q88 34 92 48", { strokeWidth: 1.6 }),
      ...p.path("M40 62 Q46 55 52 62", { strokeWidth: 2.2 }),
      ...p.path("M68 62 Q74 55 80 62", { strokeWidth: 2.2 }),
      ...p.path("M42 76 Q60 98 78 76 Q60 84 42 76", { strokeWidth: 2.2 }),
      // ears, drawn last so the rest of the face keeps its wobble
      ...p.path("M21 61 Q12 61 13.5 67.5 Q15 74 22 73", { strokeWidth: 2.1 }),
      ...p.path("M99 61 Q108 61 106.5 67.5 Q105 74 98 73", { strokeWidth: 2.1 }),
    ],
  };
};

/** Paperclip (28 × 64), clipped over the top edge of a card. */
export const paperclip: Draw = (seed) => ({
  paths: createPen(seed, { roughness: 0.5, bowing: 0.3 }).path(
    "M10 18 L10 46 Q10 54 16 54 Q22 54 22 46 L22 10 Q22 3 14 3 Q6 3 6 10 L6 48 Q6 60 16 60 Q26 60 26 48 L26 22",
    { strokeWidth: 2.2 },
  ),
});

/** Little flourish under the footer signature (200 × 24). */
export const signatureSwoosh: Draw = (seed) => ({
  paths: createPen(seed, { roughness: 0.5 }).curve(
    [
      [4, 16],
      [60, 10],
      [130, 14],
      [196, 4],
    ],
    { strokeWidth: 1.8 },
  ),
});

/** Empty speech bubble (120 × 60), tail at bottom-left; the text is laid over it. */
export const speechBubbleWide: Draw = (seed) => ({
  paths: createPen(seed).path(
    "M14 6 Q4 6 4 16 L4 34 Q4 44 14 44 L24 44 L16 57 L38 44 L106 44 Q116 44 116 34 L116 16 Q116 6 106 6 Z",
    { strokeWidth: 2 },
  ),
});

/** Dense scribble under the job title (400 × 18). */
export const titleScribble: Draw = (seed) => ({ paths: createPen(seed).zigzag(2, 3, 396, 11, 6) });

/** Short hand-drawn arrows (60 × 50). */
export const arrowDownRight: Draw = (seed) => ({
  paths: createPen(seed).arrow(
    [
      [6, 4],
      [14, 30],
      [40, 44],
    ],
    { strokeWidth: 1.8 },
  ),
});

export const arrowDownLeft: Draw = (seed) => ({
  paths: createPen(seed).arrow(
    [
      [54, 4],
      [48, 30],
      [20, 44],
    ],
    { strokeWidth: 1.8 },
  ),
});

/** Long connector between cards (120 × 90). */
export const arrowLoop: Draw = (seed) => ({
  paths: createPen(seed).arrow(
    [
      [6, 6],
      [10, 52],
      [52, 70],
      [80, 44],
      [64, 30],
      [58, 58],
      [112, 82],
    ],
    { strokeWidth: 1.8 },
  ),
});

// ── Project diagrams ─────────────────────────────────────────

/** Algo Wars (400 × 210): two players battling through a socket server backed by Redis. */
export const algoWarsDiagram: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.monitor(14, 54, 86, 72),
      ...p.server(171, 36, 56, 90),
      ...p.monitor(300, 54, 86, 72),
      ...p.arrow([
        [104, 76],
        [136, 64],
        [164, 74],
      ]),
      ...p.arrow([
        [164, 104],
        [134, 114],
        [104, 102],
      ]),
      ...p.arrow([
        [296, 76],
        [264, 64],
        [234, 74],
      ]),
      ...p.arrow([
        [234, 104],
        [264, 114],
        [296, 102],
      ]),
      ...p.arrow([
        [199, 132],
        [202, 146],
        [199, 158],
      ]),
      ...p.database(180, 162, 38, 42),
      ...p.arrow(
        [
          [318, 34],
          [290, 40],
          [262, 60],
        ],
        { strokeWidth: 1.3 },
        7,
      ),
      ...p.arrow(
        [
          [104, 192],
          [140, 196],
          [174, 186],
        ],
        { strokeWidth: 1.3 },
        7,
      ),
      ...p.squiggle(26, 160, 60, 3, 3),
      ...p.star(384, 176, 8),
      ...p.star(366, 194, 5, true),
    ],
    labels: [
      { x: 57, y: 146, text: "player 1" },
      { x: 343, y: 146, text: "player 2" },
      { x: 199, y: 26, text: "socket.io" },
      { x: 226, y: 192, text: "redis", anchor: "start" },
      { x: 346, y: 28, text: "real-time magic!", rotate: -4 },
      { x: 62, y: 196, text: "goes brrr", rotate: -3 },
    ],
    // a move from player 1 → server → redis + player 2, then the reply back
    routes: [
      [
        [104, 76],
        [136, 64],
        [164, 74],
      ],
      [
        [199, 132],
        [202, 146],
        [199, 158],
      ],
      [
        [234, 104],
        [264, 114],
        [296, 102],
      ],
      [
        [296, 76],
        [264, 64],
        [234, 74],
      ],
      [
        [164, 104],
        [134, 114],
        [104, 102],
      ],
    ],
  };
};

/** LinkSlam (360 × 190): links collected → dashboard → MongoDB, with OAuth sign-in. */
export const linkSlamDiagram: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      ...p.line(26, 76, 60, 44, { strokeWidth: 1.2 }),
      ...p.line(26, 76, 46, 126, { strokeWidth: 1.2 }),
      ...p.line(46, 126, 86, 102, { strokeWidth: 1.2 }),
      ...p.line(60, 44, 86, 102, { strokeWidth: 1.2 }),
      ...p.dot(26, 76, 9),
      ...p.dot(86, 102, 8),
      ...p.star(60, 44, 13, true),
      ...p.star(46, 126, 16),
      ...p.arrow([
        [96, 88],
        [114, 76],
        [132, 80],
      ]),
      ...p.browser(136, 52, 96, 66, "lines"),
      ...p.arrow([
        [180, 122],
        [176, 134],
        [182, 144],
      ]),
      ...p.database(162, 146, 40, 38),
      ...p.arrow([
        [236, 84],
        [256, 72],
        [272, 86],
      ]),
      ...p.browser(272, 86, 80, 52, "search"),
      ...p.arrow(
        [
          [208, 168],
          [262, 172],
          [306, 146],
        ],
        { strokeWidth: 1.3 },
        7,
      ),
      ...p.star(332, 34, 7),
      ...p.star(348, 52, 4, true),
    ],
    labels: [
      { x: 188, y: 36, text: "→ share link / dashboard", size: 16 },
      { x: 312, y: 158, text: "oauth" },
      { x: 210, y: 192, text: "mongodb", anchor: "start" },
    ],
    routes: [
      [
        [96, 88],
        [114, 76],
        [132, 80],
      ],
      [
        [180, 122],
        [176, 134],
        [182, 144],
      ],
      [
        [236, 84],
        [256, 72],
        [272, 86],
      ],
      [
        [208, 168],
        [262, 172],
        [306, 146],
      ],
    ],
  };
};

/** Meme Aunty (360 × 190): upload an image → Gemini writes the caption → meme. */
export const memeAuntyDiagram: Draw = (seed) => {
  const p = createPen(seed);
  return {
    paths: [
      // monitor showing the uploaded image
      ...p.box(8, 54, 112, 70),
      ...p.imageFrame(16, 62, 52, 52),
      ...p.line(76, 70, 112, 70, { strokeWidth: 1.2 }),
      ...p.line(76, 80, 104, 80, { strokeWidth: 1.2 }),
      ...p.line(76, 90, 108, 90, { strokeWidth: 1.2 }),
      ...p.line(64, 124, 64, 138),
      ...p.line(40, 140, 88, 140, { strokeWidth: 2 }),
      ...p.arrow([
        [124, 82],
        [136, 70],
        [150, 76],
      ]),
      // the finished meme card
      ...p.box(152, 54, 76, 76),
      ...p.imageFrame(160, 62, 60, 42),
      ...p.line(160, 112, 214, 112, { strokeWidth: 1.2 }),
      ...p.line(160, 120, 200, 120, { strokeWidth: 1.2 }),
      ...p.arrow([
        [232, 76],
        [248, 62],
        [264, 68],
      ]),
      // Gemini in the cloud
      ...p.cloud(262, 50, 90, 56),
      ...p.arrow([[296, 96], [296, 72]], { strokeWidth: 1.4 }, 6),
      ...p.arrow([[314, 72], [314, 96]], { strokeWidth: 1.4 }, 6),
      ...p.arrow(
        [
          [304, 116],
          [276, 152],
          [234, 128],
        ],
        { strokeWidth: 1.5 },
      ),
      ...p.star(22, 26, 6, true),
      ...p.star(118, 30, 5),
    ],
    labels: [
      { x: 190, y: 38, text: "funny memes", size: 17 },
      { x: 330, y: 132, text: "gemini api", size: 15 },
    ],
    routes: [
      [
        [124, 82],
        [136, 70],
        [150, 76],
      ],
      [
        [232, 76],
        [248, 62],
        [264, 68],
      ],
      [
        [296, 96],
        [296, 72],
      ],
      [
        [314, 72],
        [314, 96],
      ],
      [
        [304, 116],
        [276, 152],
        [234, 128],
      ],
    ],
  };
};
