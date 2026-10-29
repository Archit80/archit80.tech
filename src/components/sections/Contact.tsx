"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { contact } from "@/data/doodle";
import { envelope, githubCat, instaCamera, linkedinMark, resumePage, signatureSwoosh, spiral, squiggleWave } from "@/components/doodle/art";
import { BackToTopPlane } from "@/components/doodle/BackToTopPlane";
import { CollectibleStar } from "@/components/doodle/StarHunt";
import { Marker } from "@/components/doodle/Marker";
import { PaperPlane } from "@/components/doodle/PaperPlane";
import type { Drawing } from "@/components/doodle/pen";
import { RoughBox, RoughRule } from "@/components/doodle/RoughBox";
import { Sketch } from "@/components/doodle/Sketch";
import { CircleLink, SectionHeader } from "@/components/doodle/SketchCard";

const ICONS: Record<string, (seed: number) => Drawing> = {
  Email: envelope,
  GitHub: githubCat,
  LinkedIn: linkedinMark,
  Instagram: instaCamera,
  Resume: resumePage,
};

// The handle shown under each link, e.g. "@Archit80"; the resume just says what it is.
const handle = (label: string, href: string) =>
  label === "Resume" ? "pdf, opens in drive" : `@${href.replace(/\/$/, "").split("/").pop()}`;

/** One row on the contact note: a chunky doodled icon in its own sketchy box, tinted with the highlighter on hover. */
function NoteLink({ label, href, detail }: { label: string; href: string; detail: string }) {
  const external = !href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group/link sketch-trigger flex items-center gap-4"
    >
      <RoughBox
        shadow={3}
        seed={label.length * 7}
        fillClassName="text-paper transition-colors duration-200 group-hover/link:text-hl"
        className="grid size-14 shrink-0 place-items-center transition-transform duration-200 group-hover/link:-rotate-6 sm:size-16"
      >
        <Sketch draw={ICONS[label]} viewBox={[48, 48]} width={34} className="transition-colors duration-200 group-hover/link:text-charcoal" />
      </RoughBox>
      <span className="min-w-0 text-left">
        <span className="block font-hand text-xl tracking-wider uppercase">{label}</span>
        <span className="block truncate text-sm text-ink-soft">{detail}</span>
      </span>
    </a>
  );
}

export function Contact() {
  const [helloHover, setHelloHover] = useState(false);
  const links = [
    { label: "Email", href: `mailto:${contact.email}`, detail: contact.email },
    ...contact.socials.map((s) => ({ ...s, detail: handle(s.label, s.href) })),
  ];

  return (
    <>
      <section id="contact" aria-label="Contact" className="relative mt-20 scroll-mt-24 sm:mt-28">
        <SectionHeader title={contact.title} note="(my inbox is open)" />
        <RoughBox className="grid items-center gap-14 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[3fr_2fr] lg:gap-10">
          {/* left 60%: the pitch */}
          <div className="text-center lg:text-left">
            <p className="font-doodle text-4xl leading-tight sm:text-6xl">
              <span aria-hidden>{"{ "}</span>
              {contact.header}
              <span aria-hidden>{" }"}</span>
            </p>
            <p className="mt-6 max-w-xl text-lg text-ink-soft max-lg:mx-auto">{contact.message}</p>

            <div className="mt-12 flex items-center justify-center gap-10 lg:justify-start">
              <CircleLink
                href={`mailto:${contact.email}`}
                className="ml-4 px-5 py-2 text-2xl"
                onPointerEnter={() => setHelloHover(true)}
                onPointerLeave={() => setHelloHover(false)}
                onFocus={() => setHelloHover(true)}
                onBlur={() => setHelloHover(false)}
              >
                <Marker trigger="controlled" active={helloHover} tone="alt">
                  say hello ✉
                </Marker>
              </CircleLink>
              <PaperPlane width={52} />
            </div>
          </div>

          {/* right 40%: an index card taped onto the box */}
          <div className="relative mx-auto w-full max-w-sm rotate-2">
            <span
              aria-hidden
              className="absolute -top-4 left-1/2 z-10 h-8 w-28 -translate-x-1/2 -rotate-3 border-x-2 border-dashed border-ink/30 bg-ink/15"
            />
            <RoughBox shadow={6} className="px-6 pt-10 pb-7 sm:px-8">
              <p className="font-hand text-lg text-ink-soft">find me here ↓</p>
              <ul className="mt-5 flex flex-col gap-5">
                {links.map((l) => (
                  <li key={l.label}>
                    <NoteLink {...l} />
                  </li>
                ))}
              </ul>
            </RoughBox>
          </div>

          <Sketch draw={spiral} viewBox={[48, 48]} width={36} className="doodle-spin absolute bottom-8 left-8 hidden sm:block" />
          <Sketch draw={squiggleWave} viewBox={[48, 48]} width={56} className="doodle-wiggle absolute top-10 left-10 hidden sm:block" />
          <CollectibleStar filled width={22} className="absolute right-6 bottom-6 hidden sm:block" />
        </RoughBox>
      </section>

      <footer className="relative mt-14 pb-10 text-center sm:mt-20">
        <RoughRule strokeWidth={2} />

        {/* signature, "written" left to right when it scrolls into view */}
        <div className="mt-8 flex flex-col items-center">
          <motion.p
            aria-label="Signed, Archit Taneja"
            className="inline-block -rotate-3 px-4 font-signature text-5xl leading-tight sm:text-6xl"
            initial={{ clipPath: "inset(-30% 100% -30% 0)" }}
            whileInView={{ clipPath: "inset(-30% 0% -30% 0)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.6, ease: [0.45, 0, 0.55, 1] }}
          >
            Archit Taneja
          </motion.p>
          <Sketch draw={signatureSwoosh} viewBox={[200, 24]} width={176} className="-mt-1 -rotate-3" />
        </div>

        <p className="mt-6 font-hand text-ink-soft">© {new Date().getFullYear()} Archit Taneja. All rights reserved.</p>
        <BackToTopPlane className="mt-6 sm:absolute sm:top-12 sm:right-2 sm:mt-0" />
      </footer>
    </>
  );
}
