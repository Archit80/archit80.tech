"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { about, contact, education, hero } from "@/data/doodle";
import { gradCap, paperclip, speechBubble, spiral } from "@/components/doodle/art";
import { RoughBox } from "@/components/doodle/RoughBox";
import { Sketch } from "@/components/doodle/Sketch";
import { SectionHeader, SketchCard } from "@/components/doodle/SketchCard";
import { CollectibleStar } from "@/components/doodle/StarHunt";

const hidden = { backfaceVisibility: "hidden" } as const;

/** Taped polaroid of the profile photo; straightens up on hover and flips over on click to a note on the back. */
function Polaroid() {
  const [flipped, setFlipped] = useState(false);

  return (
    <figure className="relative mx-auto w-full max-w-[20rem] -rotate-2 transition-[rotate] duration-500 [perspective:1400px] hover:rotate-0">
      <span aria-hidden className="absolute -top-3 left-8 z-10 h-6 w-20 -rotate-6 border border-ink/25 bg-ink/10" />
      <span aria-hidden className="absolute -top-3 right-8 z-10 h-6 w-20 rotate-6 border border-ink/25 bg-ink/10" />
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Flip the photo back" : "Flip the photo over"}
        className="block w-full cursor-pointer text-left"
      >
        <motion.div
          className="relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.45, 0, 0.55, 1] }}
        >
          <div style={hidden}>
            <RoughBox shadow={10} className="p-3 pb-14 sm:p-4 sm:pb-16">
              <div className="relative aspect-square overflow-hidden border-2 border-ink">
                <Image src={about.photo} alt="Photo of Archit Taneja" fill sizes="(max-width: 1024px) 80vw, 320px" className="object-cover" />
              </div>
              <p className="absolute inset-x-0 bottom-4 text-center font-hand text-xl sm:bottom-5">the real me!</p>
            </RoughBox>
          </div>

          {/* the back of the photo */}
          <div className="absolute inset-0" style={{ ...hidden, transform: "rotateY(180deg)" }}>
            <RoughBox shadow={10} className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center font-hand">
              <p className="text-2xl leading-snug">psst! {hero.status.toLowerCase()}</p>
              <p className="text-lg text-ink-soft">({hero.statusDetail})</p>
              <p className="-rotate-2 text-xl">{hero.statusNote}</p>
              <p className="mt-2 text-base underline decoration-dashed underline-offset-4">{contact.email}</p>
            </RoughBox>
          </div>
        </motion.div>
      </button>
      <figcaption className="mt-4 text-center font-hand text-ink-soft">({flipped ? "flip me back" : "psst, flip me"})</figcaption>
    </figure>
  );
}

/** Who I am and where I study. */
export function About() {
  return (
    <section id="about" aria-label="About" className="relative mt-20 scroll-mt-24 sm:mt-28">
      <SectionHeader title="About Me" note="(the human behind the commits)" />

      <div className="grid items-start gap-12 lg:grid-cols-[20rem_1fr] lg:gap-14">
        <div className="relative pt-3">
          <Polaroid />
          <CollectibleStar filled width={20} className="absolute -top-4 left-2" />
          <Sketch draw={spiral} viewBox={[48, 48]} width={30} className="doodle-spin absolute -right-2 bottom-2" />
        </div>

        <div className="grid gap-10">
          <SketchCard title="Hello!" icon={speechBubble} as="div">
            <Sketch draw={paperclip} viewBox={[28, 64]} width={22} animate={false} className="absolute -top-7 right-12 rotate-12" />
            <p className="mt-5 text-lg leading-relaxed">{about.bio}</p>
          </SketchCard>

          <SketchCard title="Education" icon={gradCap} as="div">
            <Sketch draw={paperclip} viewBox={[28, 64]} width={22} animate={false} className="absolute -top-7 left-1/2 -rotate-6" />
            <ol className="mt-5 grid gap-6 md:grid-cols-2">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-display text-lg leading-tight font-bold tracking-wide uppercase">{e.school}</p>
                  <p className="mt-1">{e.degree}</p>
                  <p className="mt-1 font-hand text-ink-soft">
                    {e.score} · {e.location}
                  </p>
                  <p className="font-hand text-ink-soft">{e.date}</p>
                </li>
              ))}
            </ol>
          </SketchCard>
        </div>
      </div>
      <CollectibleStar width={28} className="absolute top-4 right-6 hidden md:block" />
    </section>
  );
}
