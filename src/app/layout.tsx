import type { Metadata, Viewport } from "next";
import { Architects_Daughter, Cabin_Sketch, Mrs_Saint_Delafield, Rubik_Doodle_Shadow, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Hand-lettering: name, nav, annotations
const architects = Architects_Daughter({ weight: "400", subsets: ["latin"], variable: "--font-architects" });
// Chunky sketched card titles: "01 / ALGO WARS"
const cabinSketch = Cabin_Sketch({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-cabin-sketch" });
// Hollow doodle letters for the banner and contact header
const rubikDoodle = Rubik_Doodle_Shadow({ weight: "400", subsets: ["latin"], variable: "--font-rubik-doodle" });
// Clean body copy
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
// Footer signature only — not preloaded, it's far below the fold
const signature = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"], variable: "--font-mrs-saint", preload: false });

export const metadata: Metadata = {
  title: "Archit Taneja | Software Engineer",
  description:
    "Software Engineering Intern @ Venwiz, SDC Chairperson @ USICT, and full-stack & UI/UX tinkerer. Available for full-time roles from June 2027.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#161513" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${architects.variable} ${cabinSketch.variable} ${rubikDoodle.variable} ${grotesk.variable} ${signature.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
