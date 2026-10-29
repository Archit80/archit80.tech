"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { DoodleProject } from "@/data/doodle";
import { RoughBox, RoughCircle } from "@/components/doodle/RoughBox";
import { CircleLink, sketchyRadius } from "@/components/doodle/SketchCard";

/**
 * The "brought to life" half of a project card: shares a layoutId with the card, so Framer Motion
 * morphs the sketch into this full sketchbook page (and back on close).
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: DoodleProject;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const titleId = `project-title-${project.id}`;
  const [primary] = project.links;

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-ink/40 dark:bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        layoutId={`project-${project.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-3xl lg:max-w-6xl"
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
      >
        {/* The rough frame stays put while the page inside it scrolls (only needed on small screens;
            on desktop the two-column layout fits without scrolling). */}
        <RoughBox shadow={10} strokeWidth={2.6} className="flex max-h-[90dvh] flex-col p-2.5 sm:p-3.5 lg:max-h-[95dvh]">
          <motion.div
            data-lenis-prevent
            className="dot-paper no-scrollbar min-h-0 overflow-y-auto overscroll-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.12 } }}
            exit={{ opacity: 0, transition: { duration: 0.08 } }}
          >
            {/* hand-drawn browser chrome */}
            <div className="flex items-center gap-3 border-b-2 border-ink px-5 py-3 pr-16">
              <span aria-hidden className="flex gap-1.5">
                <span className="size-3 rounded-full border-2 border-ink bg-ink" />
                <span className="size-3 rounded-full border-2 border-ink" />
                <span className="size-3 rounded-full border-2 border-ink" />
              </span>
              <span
                className={`truncate border-2 border-ink/60 bg-paper px-3 py-0.5 font-hand text-sm ${sketchyRadius}`}
              >
                {primary.href.replace(/^https?:\/\/(www\.)?/, "")}
              </span>
            </div>

            <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div className="px-5 pt-5 sm:px-8 sm:pt-7 lg:py-5">
                <div className="relative aspect-[16/9] overflow-hidden border-2 border-ink bg-paper shadow-hard">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 800px) 90vw, (max-width: 1024px) 700px, 600px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="px-5 pt-7 pb-9 sm:px-8 lg:py-5 lg:pl-2">
                <p className="font-hand text-lg text-ink-soft">{project.kicker}</p>
                <h2
                  id={titleId}
                  className="mt-1 font-display text-4xl leading-none font-bold tracking-wide uppercase sm:text-5xl"
                >
                  {project.title}
                </h2>
                {project.quote && (
                  <p className="mt-3 -rotate-1 font-hand text-xl">
                    “{project.quote}”
                  </p>
                )}
                <p className="mt-5 max-w-prose leading-relaxed lg:mt-4 lg:text-[15px]">
                  {project.description}
                </p>

                <ul
                  aria-label={project.kind === "design" ? "Tags" : "Tech stack"}
                  className="mt-6 flex flex-wrap gap-2.5 lg:mt-5"
                >
                  {project.stack.map((tech, i) => (
                    <li
                      key={tech}
                      className={`border-2 border-ink bg-paper px-2.5 py-0.5 font-hand text-sm shadow-hard-sm ${sketchyRadius} ${
                        i % 2 ? "rotate-1" : "-rotate-1"
                      }`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 pl-4 lg:mt-6">
                  {project.links.map((link) => (
                    <CircleLink
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl"
                    >
                      {link.label} ↗
                    </CircleLink>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project"
            className="group absolute top-5 right-6 grid size-9 cursor-pointer place-items-center font-hand text-xl transition-transform hover:rotate-90 sm:top-6 sm:right-7"
          >
            <RoughCircle pad={2} />✕
          </button>
        </RoughBox>
      </motion.div>
    </div>
  );
}
