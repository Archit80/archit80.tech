"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";
import { experience, type DoodleRole } from "@/data/doodle";
import { SdcBadgeEgg } from "@/components/doodle/Eggs";
import { PaperPlane } from "@/components/doodle/PaperPlane";
import { RoughBox, RoughVRule } from "@/components/doodle/RoughBox";
import { Marker } from "@/components/doodle/Marker";
import { SectionHeader } from "@/components/doodle/SketchCard";

// Collapsed cards show only the lead bullet; the rest unfold in place.
const PREVIEW = 1;

function Point({ text }: { text: string }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
      <span aria-hidden className="font-hand text-lg leading-6 text-ink">
        →
      </span>
      {text}
    </li>
  );
}

function RoleCard({ job }: { job: DoodleRole }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const rest = job.points.slice(PREVIEW);

  return (
    <RoughBox as="article" className="p-6 sm:p-7">
      <header className="flex items-center gap-4">
        <Image
          src={job.logo}
          alt={`${job.company} logo`}
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-lg border-2 border-ink bg-white object-contain p-0.5"
        />
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight font-bold tracking-wide uppercase sm:text-2xl">{job.company}</h3>
          <p className="font-semibold">{job.role}</p>
        </div>
        {job.id === "sdc" && <SdcBadgeEgg className="ml-auto shrink-0" />}
      </header>

      <p className="mt-3 font-hand text-ink-soft">{job.meta}</p>
      {job.focus && <p className="mt-3 inline-block -rotate-1 border-b-2 border-dashed border-ink/40 font-hand text-lg">{job.focus}</p>}
      <ul className="mt-3 space-y-2">
        {job.points.slice(0, PREVIEW).map((point) => (
          <Point key={point} text={point} />
        ))}
      </ul>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={listId}
            key="rest"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* gap lives inside the clip so the height animation starts from a true 0 */}
            <ul className="space-y-2 pt-2">
              {rest.map((point) => (
                <Point key={point} text={point} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      {rest.length > 0 && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className="mt-3 cursor-pointer font-hand text-lg"
        >
          <Marker>{open ? "− show less" : `+ ${rest.length} more`}</Marker>
        </button>
      )}
    </RoughBox>
  );
}

/** Timeline: newest first, each role hanging off a hand-drawn line on the left. */
export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="relative mt-20 scroll-mt-24 sm:mt-28">
      <SectionHeader title="Experience" note="(where the code went live)" />

      <div className="relative">
        <RoughVRule className="absolute inset-y-0 left-[0.65rem]" />
        <ol className="relative space-y-10 sm:space-y-12">
          {experience.map((job) => (
            <li key={job.id} className="relative pl-12 sm:pl-16">
              {/* node on the line, level with the date */}
              <span
                aria-hidden
                className="absolute top-1 left-[1.05rem] grid size-6 -translate-x-1/2 place-items-center rounded-full border-2 border-ink bg-paper"
              >
                <span className="size-2.5 rounded-full bg-ink" />
              </span>
              <p className="mb-3 font-hand text-xl sm:text-2xl">{job.date}</p>
              <RoleCard job={job} />
            </li>
          ))}
        </ol>
      </div>

      <PaperPlane className="absolute top-4 right-4 -rotate-12" />
    </section>
  );
}
