import { StarHuntProvider } from "@/components/doodle/StarHunt";
import { About } from "@/components/sections/About";
import { Banner } from "@/components/sections/Banner";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PageFrame } from "@/components/sections/PageFrame";
import { Projects, ProjectsProvider } from "@/components/sections/Projects";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <a
        href="#skills"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-ink focus:px-3 focus:py-1 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader />
      <StarHuntProvider>
        <ProjectsProvider>
          {/* clip: the tilted banner is wider than the viewport */}
          <main className="overflow-x-clip">
            <PageFrame>
              <Hero />
              <Banner />
              <Skills />
              <Projects />
              <Experience />
              <About />
              <Contact />
            </PageFrame>
          </main>
        </ProjectsProvider>
      </StarHuntProvider>
    </>
  );
}
