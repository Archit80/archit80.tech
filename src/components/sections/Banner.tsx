"use client";

import { banner } from "@/data/doodle";
import { spiral } from "@/components/doodle/art";
import { RoughRule } from "@/components/doodle/RoughBox";
import { Sketch } from "@/components/doodle/Sketch";
import { CollectibleStar } from "@/components/doodle/StarHunt";

function Words() {
  return (
    <span className="flex shrink-0 items-center">
      {banner.words.map((word) => (
        <span key={word} className="flex items-center">
          <span className="px-5 sm:px-8">{word}</span>
          <span aria-hidden className="text-[0.5em]">
            ●
          </span>
        </span>
      ))}
    </span>
  );
}

/** The tilted "FRONTEND • BACKEND • …" band that cuts across the page, scrolling slowly. */
export function Banner() {
  return (
    <section aria-label={banner.words.join(", ")} className="relative left-1/2 my-16 w-[110vw] -translate-x-1/2 -rotate-2 sm:my-20">
      <ul aria-hidden className="absolute -top-5 left-[8vw] z-10 flex gap-2 sm:left-[12vw]">
        {banner.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 border-ink bg-paper px-3 py-0.5 font-hand text-base"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="bg-paper">
        <RoughRule strokeWidth={2.2} />
        <RoughRule strokeWidth={1.2} className="-mt-1" />
        <div className="overflow-hidden py-3 sm:py-4">
          <div aria-hidden className="marquee flex w-max font-doodle text-5xl leading-tight sm:text-7xl">
            <Words />
            <Words />
          </div>
        </div>
        <RoughRule strokeWidth={1.2} />
        <RoughRule strokeWidth={2.2} className="-mt-1" />
      </div>

      <CollectibleStar filled width={30} className="absolute top-1/2 left-[4vw] -translate-y-1/2" />
      <CollectibleStar width={24} className="absolute -bottom-8 left-[46vw]" />
      <Sketch draw={spiral} viewBox={[48, 48]} width={30} className="doodle-spin absolute -bottom-10 left-[14vw]" />
      <CollectibleStar width={30} className="absolute -top-9 right-[10vw]" />
    </section>
  );
}
