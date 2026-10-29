"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FaBehance } from "react-icons/fa";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { logoFor, projects, type DoodleProject } from "@/data/doodle";
import {
  aiHead,
  algoWarsDiagram,
  arrowLoop,
  bolt,
  browserLink,
  linkSlamDiagram,
  memeAuntyDiagram,
  paperclip,
  penNib,
  spiral,
  users,
} from "@/components/doodle/art";
import { CollectibleStar } from "@/components/doodle/StarHunt";
import type { Drawing } from "@/components/doodle/pen";
import { Marker } from "@/components/doodle/Marker";
import { RoughBox } from "@/components/doodle/RoughBox";
import { CircleButton, SectionHeader } from "@/components/doodle/SketchCard";
import { Sketch } from "@/components/doodle/Sketch";
import { ProjectModal } from "./ProjectModal";

type Draw = (seed: number) => Drawing;

// Cards with a paperclip on top, like a pinned-in sketch.
const CLIPPED = new Set(["linkslam", "hashtech"]);

// Per-project artwork; content lives in data/doodle.ts. Design projects show their screenshot instead of a diagram.
const ART: Record<string, { icon: Draw; diagram?: Draw; viewBox?: [number, number] }> = {
  algowars: { icon: bolt, diagram: algoWarsDiagram, viewBox: [400, 210] },
  linkslam: { icon: browserLink, diagram: linkSlamDiagram, viewBox: [360, 190] },
  "meme-aunty": { icon: aiHead, diagram: memeAuntyDiagram, viewBox: [360, 190] },
  hashtech: { icon: penNib },
  alumnet: { icon: users },
};

const OpenProjectContext = createContext<(project: DoodleProject) => void>(() => {});

/** Hosts the sketch-to-life modal so any project card on the page can open it. */
export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<DoodleProject | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <OpenProjectContext.Provider value={setOpen}>
      {children}
      <AnimatePresence>{open && <ProjectModal project={open} onClose={close} />}</AnimatePresence>
    </OpenProjectContext.Provider>
  );
}

function ProjectCard({ project, wide = false }: { project: DoodleProject; wide?: boolean }) {
  const openProject = useContext(OpenProjectContext);
  const [hovered, setHovered] = useState(false);
  const [replay, setReplay] = useState(0);
  const art = ART[project.id];
  const open = () => openProject(project);
  const behance = project.links.find((l) => l.label === "Behance");
  // Screenshot cards (design work) have no diagram to frame, so they sit tighter.
  const compact = !art.diagram;

  const visual = art.diagram ? (
    <Sketch draw={art.diagram} viewBox={art.viewBox!} replay={replay} />
  ) : (
    <div className="relative aspect-[16/10] w-full overflow-hidden border-2 border-ink">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 768px) 90vw, 560px"
        className="object-cover object-top"
      />
    </div>
  );

  return (
    <motion.article
      layoutId={`project-${project.id}`}
      className={`group h-full cursor-pointer ${wide ? "md:col-span-2" : ""}`}
      onClick={open}
      onPointerEnter={(e) => {
        setHovered(true);
        // Re-ink the doodles on every mouse hover (touch taps open the card instead).
        if (e.pointerType === "mouse") setReplay((n) => n + 1);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <RoughBox className={`h-full ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"} ${wide ? "lg:grid lg:grid-cols-[1fr_1.35fr] lg:gap-10" : "flex flex-col"}`}>
        {CLIPPED.has(project.id) && (
          <Sketch draw={paperclip} viewBox={[28, 64]} width={22} animate={false} className="absolute -top-7 right-14 rotate-12" />
        )}
        <div className="flex flex-col">
          <header className="flex items-center gap-3 sm:gap-4">
            <Sketch draw={art.icon} viewBox={[48, 48]} width={48} className="shrink-0" replay={replay} />
            <h3 className="font-display text-[1.7rem] leading-none font-bold tracking-wide uppercase sm:text-4xl">
              <Marker trigger="controlled" active={hovered}>
                {project.title}
              </Marker>
            </h3>
          </header>
          <p className="mt-4 font-hand text-lg text-ink-soft">
            {project.kicker}
            {project.quote && <> — “{project.quote}”</>}
          </p>
          {wide && <div className="mt-auto hidden lg:block">{footer()}</div>}
        </div>

        <div className={`flex items-center ${compact ? "mt-4 mb-3" : "my-6"} ${wide ? "lg:my-0" : "flex-1"}`}>{visual}</div>

        <div className={`mt-auto ${wide ? "lg:hidden" : ""}`}>{footer()}</div>
      </RoughBox>
    </motion.article>
  );

  function footer() {
    return (
      <div className={`flex items-end justify-between gap-6 ${compact ? "pt-1" : "pt-6"}`}>
        <StackLogos stack={project.stack} />
        {/* Design work lives on Behance, so those cards link straight there instead of a "view" button. */}
        {behance ? (
          <a
            href={behance.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mr-1 mb-1 flex shrink-0 items-center gap-1.5 font-hand text-3xl transition-transform hover:translate-x-0.5 hover:-translate-y-0.5"
          >
            <span aria-hidden>↗</span>
            <FaBehance aria-hidden className="text-4xl" />
            <span className="sr-only">{project.title} on Behance</span>
          </a>
        ) : (
          <CircleButton
            aria-haspopup="dialog"
            className="mr-4 mb-2 shrink-0 text-center"
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
          >
            view
            <br />
            {project.kind === "design" ? "case study" : "project"}
            <span className="sr-only">: {project.title}</span>
          </CircleButton>
        )}
      </div>
    );
  }
}

/** The card's tech stack as a row of logos (full names live in the tooltip and the modal). */
function StackLogos({ stack }: { stack: string[] }) {
  const items = stack.flatMap((name) => {
    const skill = logoFor(name);
    return skill ? [{ name, skill }] : [];
  });
  return (
    <ul aria-label="Tech stack" className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
      {items.map(({ name, skill }) => (
        <li key={name} title={name} className="transition-transform hover:-translate-y-0.5 hover:-rotate-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny local SVGs; next/image adds nothing */}
          <img
            src={skill.logo}
            alt={name}
            width={28}
            height={28}
            loading="lazy"
            decoding="async"
            draggable={false}
            // Single-color logos are inverted in dark mode so they stay visible.
            className={`size-7 object-contain ${skill.mono ? "dark:invert" : ""}`}
          />
        </li>
      ))}
    </ul>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 inline-flex items-center gap-2 font-hand text-2xl">
      <span aria-hidden>↘</span>
      {children}
    </p>
  );
}

export function Projects() {
  const development = projects.filter((p) => p.kind === "development");
  const design = projects.filter((p) => p.kind === "design");

  return (
    <section id="projects" aria-label="Projects" className="relative mt-20 scroll-mt-24 sm:mt-28">
      <SectionHeader title="Projects" note="(click a sketch to bring it to life)" />

      <GroupLabel>development</GroupLabel>
      <div className="relative grid gap-10 md:grid-cols-2 md:gap-12">
        {development.map((project, i) => (
          <ProjectCard key={project.id} project={project} wide={i === 0} />
        ))}
        <CollectibleStar width={26} className="absolute top-[48%] left-[49%] hidden md:block" />
      </div>

      <div className="relative mt-12 sm:mt-16">
        <Sketch draw={arrowLoop} viewBox={[120, 90]} width={100} className="absolute -top-16 right-[8%] hidden md:block" />
        <GroupLabel>design</GroupLabel>
        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {design.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Sketch draw={spiral} viewBox={[48, 48]} width={30} className="doodle-spin absolute -bottom-12 left-[48%] hidden md:block" />
      </div>
    </section>
  );
}
