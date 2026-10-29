"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// Anchor jumps land below the sticky nav via each section's scroll-margin (scroll-mt-24), which Lenis honours.
function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis root options={{ lerp: 0.14, smoothWheel: !reduceMotion, anchors: true }}>
      {children}
    </ReactLenis>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>{children}</SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
