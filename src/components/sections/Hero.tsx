"use client";

import type { IconType } from "react-icons";
import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { contact, hero } from "@/data/doodle";
import { arrowDownLeft, arrowDownRight, spiral, squiggleWave, titleScribble } from "@/components/doodle/art";
import { CoffeeEgg } from "@/components/doodle/Eggs";
import { RoughBox } from "@/components/doodle/RoughBox";
import { Sketch } from "@/components/doodle/Sketch";
import { CollectibleStar } from "@/components/doodle/StarHunt";
import { TalkingFace } from "@/components/doodle/TalkingFace";

const SOCIAL_ICONS: Record<string, IconType> = { GitHub: FiGithub, LinkedIn: FiLinkedin, Resume: FiFileText };
const FACE_CAPTION = "↑ hehe!";

/**
 * Fills the first screen below the header (the whole screen from tablet up, where the nav is a floating note) (so the banner starts just under the fold) and sizes its
 * text against both viewport width and height (min(vw, vh) clamps), so the name, availability line
 * and links fill that space on big screens yet still fit on short laptops and phones.
 */
export function Hero() {
  const [first, last] = hero.name.split(" ");
  const socials = [
    ...contact.socials.filter((s) => s.label in SOCIAL_ICONS),
    { label: "Email", href: `mailto:${contact.email}` },
  ];

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-5rem)] sm:min-h-svh sm:pt-20 flex-col items-center justify-center py-[clamp(0.75rem,4vh,3rem)] text-center">
      {/* On small screens the face sits above the name; on wide screens it hangs off the name's right. */}
      <TalkingFace size={68} className="relative mt-9 mb-1 md:hidden" />

      <p className="font-hand text-ink-soft sm:text-[clamp(1.125rem,2.8vh,1.6rem)]">{hero.greeting}</p>
      <div className="relative">
        <h1 className="ink-heavy mt-1 font-hand text-[clamp(2.25rem,min(11vw,14vh),8.75rem)] leading-[0.95] tracking-wider uppercase">
          {first}
          <br />
          {last}
        </h1>
        <TalkingFace caption={FACE_CAPTION} size={136} className="absolute top-1/2 left-full ml-10 hidden -translate-y-1/2 md:block" />
        <Sketch
          draw={squiggleWave}
          viewBox={[48, 48]}
          width={60}
          className="doodle-wiggle absolute top-1/2 right-full mr-14 hidden -translate-y-1/2 md:block"
        />
      </div>

      <p className="mt-[clamp(0.5rem,4vh,2.75rem)] font-hand tracking-wider uppercase sm:text-[clamp(1.25rem,3.4vh,2.1rem)]">
        {hero.title}
      </p>
      <Sketch draw={titleScribble} viewBox={[400, 18]} className="mt-1 w-full max-w-[min(30rem,52vh,78vw)]" />
      <p className="mt-[clamp(0.5rem,2.4vh,1.5rem)] sm:text-[clamp(1.125rem,2.8vh,1.5rem)]">{hero.tagline}</p>

      {/* Hovering the availability line makes the arrows nudge in towards it. */}
      <div className="group/status mt-[clamp(0.75rem,3vh,1.75rem)] flex flex-col items-center">
        <div aria-hidden className="mb-1 hidden gap-40 sm:flex [@media(max-height:720px)]:hidden">
          <Sketch
            draw={arrowDownRight}
            viewBox={[60, 50]}
            width={44}
            className="transition-transform duration-300 group-hover/status:translate-x-3 group-hover/status:translate-y-2"
          />
          <Sketch
            draw={arrowDownLeft}
            viewBox={[60, 50]}
            width={44}
            className="transition-transform duration-300 group-hover/status:-translate-x-3 group-hover/status:translate-y-2"
          />
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          <p className="text-center font-hand text-xl sm:text-left sm:text-[clamp(1.5rem,3.6vh,2.1rem)]">
            {hero.status}
            <span className="block text-base text-ink-soft sm:text-lg">({hero.statusDetail})</span>
          </p>

          <ul className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] ?? FiMail;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group/icon relative block"
                  >
                    <RoughBox
                      shadow={3}
                      className="grid size-10 place-items-center text-lg transition-transform group-hover/icon:-translate-y-0.5 group-hover/icon:-rotate-6 sm:size-12 sm:text-2xl"
                    >
                      <Icon aria-hidden />
                    </RoughBox>
                    {/* name tooltip, popped up on hover / keyboard focus */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 translate-y-1 -rotate-2 rounded-md bg-ink px-2 py-0.5 font-hand text-sm whitespace-nowrap text-paper opacity-0 transition-[opacity,translate] duration-150 group-hover/icon:translate-y-0 group-hover/icon:opacity-100 group-focus-visible/icon:translate-y-0 group-focus-visible/icon:opacity-100"
                    >
                      {s.label}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-ink" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className="mt-[clamp(0.75rem,3.2vh,2rem)] -rotate-2 font-hand text-lg sm:text-[clamp(1.25rem,3vh,1.75rem)]">{hero.statusNote}</p>

      <CollectibleStar filled width={22} className="absolute top-16 left-[8%] hidden sm:block" />
      <CollectibleStar width={30} className="absolute top-24 right-[10%] hidden sm:block" />
      <Sketch draw={spiral} viewBox={[48, 48]} width={34} className="doodle-spin absolute right-[14%] bottom-10 hidden sm:block" />
      <CoffeeEgg className="absolute bottom-8 left-[10%] hidden -rotate-6 sm:block" />
    </section>
  );
}
