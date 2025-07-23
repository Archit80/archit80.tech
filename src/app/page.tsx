"use client";
import Image from "next/image";
import {
  Github,
  Linkedin,
  FileText,
  Command,
  ExternalLink,
  Instagram,
} from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = {
    languages: [
      {
        name: "C",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        name: "C++",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
    ],
    frontend: [
      {
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "TailwindCSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Framer",
        logo: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
      },
    ],
    backend: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "FastAPI",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "PostgreSQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
    ],
    tools: [
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "VS Code",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
      },
      {
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      // { name: "Cloudinary", logo: "https://res.cloudinary.com/cloudinary-marketing/image/upload/f_auto,q_auto/v1599098500/creative_source/Logo/Cloud%20Glyph/cloudinary_cloud_glyph_blue.svg" }
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-neutral-900 text-neutral-100 min-h-screen px-2 sm:px-0">
      {/* --- STICKY HEADER --- */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800"
      >
        <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm font-medium">
              <a
                href="#home"
                className={`transition-colors ${
                  activeSection === "home"
                    ? "text-accent"
                    : "hover:text-neutral-300"
                }`}
              >
                Home
              </a>
              <a
                href="#about"
                className={`transition-colors hidden sm:visible ${
                  activeSection === "about"
                    ? "text-accent"
                    : "hover:text-neutral-300"
                }`}
              >
                About
              </a>
              <a
                href="#skills"
                className={`transition-colors ${
                  activeSection === "skills"
                    ? "text-accent"
                    : "hover:text-neutral-300"
                }`}
              >
                Skills
              </a>
              <a
                href="#projects"
                className={`transition-colors ${
                  activeSection === "projects"
                    ? "text-accent"
                    : "hover:text-neutral-300"
                }`}
              >
                Projects
              </a>
              <a
                href="#experience"
                className={`transition-colors ${
                  activeSection === "experience"
                    ? "text-accent"
                    : "hover:text-neutral-300"
                }`}
              >
                Experience
              </a>
              <a
                href="#contact"
                className={`transition-colors ${
                  activeSection === "contact"
                    ? "text-accent"
                    : "hover:text-neutral-300"
                }`}
              >
                Contact
              </a>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="p-2 rounded-md hover:bg-neutral-800 transition-colors hover:cursor-pointer text-neutral-400 hover:text-accent"
              >
                <Command size={16} />
              </button>
              <ThemeDropdown
                isOpen={showThemeDropdown}
                onClose={() => setShowThemeDropdown(false)}
              />
            </div>
          </nav>
        </div>
      </motion.header>

      <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
        <main className="space-y-12">
          {/* --- HERO SECTION --- */}
          <motion.section
            id="home"
            className="text-center pt-4"
            initial={{ opacity: 0, y: 90 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 18,
              delay: 0.1,
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 16,
                delay: 0.2,
              }}
            >
              <Image
                src="/pfp.png"
                alt="Archit Taneja"
                width={110}
                height={110}
                className="rounded-full mx-auto mb-3 border border-neutral-800"
                priority
              />
            </motion.div>
            <motion.h1
              className="text-2xl font-bold mb-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.3,
              }}
            >
              Archit Taneja
            </motion.h1>
            <motion.p
              className="text-sm text-neutral-400 mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.35,
              }}
            >
              Software Engineering Student
            </motion.p>
            <motion.p
              className="text-base font-medium mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.4,
              }}
            >
              Full-Stack Developer · UI/UX Designer · Product Builder
            </motion.p>
            <motion.div
              className="flex justify-center items-center gap-2 text-sm"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.45,
              }}
            >
              <a
                href="https://github.com/Archit80"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 bg-neutral-800 rounded hover:bg-accent hover:text-neutral-900 transition-colors"
              >
                <Github size={14} />
                <span>Github</span>
                <ExternalLink size={10} className="opacity-50" />
              </a>
              <a
                href="https://linkedin.com/in/archit80"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 bg-neutral-800 rounded hover:bg-accent hover:text-neutral-900 transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
                <ExternalLink size={10} className="opacity-50" />
              </a>
              <a
                href="https://drive.google.com/file/d/1ogsJMSPVddBfAlYAC4Q8o1TEsT7eLMQr/view"
                target="_blank"
                className="flex items-center gap-1 px-3 py-1 bg-accent text-neutral-900 rounded hover:bg-opacity-80 transition-colors"
              >
                <FileText size={14} />
                <span>Resume</span>
                <ExternalLink size={10} className="opacity-80" />
              </a>
            </motion.div>
          </motion.section>

          {/* --- ABOUT ME --- */}
          <motion.section
            id="about"
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold text-accent mb-2">About Me</h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              I&apos;m Archit, a 20-year-old engineering student from GGSIPU,
              Delhi. I&apos;m passionate about combining clean design with
              functional code. I work across Full-Stack Development and UX UI
              design — crafting responsive apps, thoughtful interfaces, and
              smooth user flows. Currently exploring modern web tech, design
              systems, and everything in between.
            </p>
            <div className="mt-6 pb-8 border-neutral-800 border-b">
              <h3 className="text-base font-bold text-accent mb-2">
                Education
              </h3>
              <ul className="space-y-3">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                  <div>
                    <span className="font-bold text-neutral-100 text-sm">
                      University School of Information, Communication and
                      Technology
                    </span>
                    <div className="italic text-xs text-neutral-300">
                      Bachelor of Technology - Information Technology
                    </div>
                    <div className="text-xs text-neutral-400">
                      Overall CGPA: 8.81
                    </div>
                  </div>
                  <div className="flex flex-col items-end sm:items-end text-right min-w-[110px]">
                    <span className="text-xs text-neutral-300">
                      Delhi, India
                    </span>
                    <span className="italic text-xs text-neutral-400">
                      September 2023 - August 2027
                    </span>
                  </div>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5">
                  <div>
                    <span className="font-bold text-neutral-100 text-sm">
                      Mahavir Senior Model School
                    </span>
                    <div className="italic text-xs text-neutral-300">
                      Central Board of Secondary Education (91.2%)
                    </div>
                  </div>
                  <div className="flex flex-col items-end sm:items-end text-right min-w-[110px]">
                    <span className="text-xs text-neutral-300">
                      Delhi, India
                    </span>
                    <span className="italic text-xs text-neutral-400">
                      April 2021 - March 2023
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* --- SKILLS --- */}
          <motion.section
            id="skills"
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold text-accent mb-3">Skills</h2>
            <div className="space-y-3 border-b border-neutral-800 pb-8">
              <div>
                <h3 className="text-sm font-semibold mb-2 text-neutral-200">
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.languages.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 px-2 py-1 bg-neutral-800 rounded text-xs font-medium text-neutral-200"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2,
                        type: "spring",
                      }}
                      viewport={{ once: true }}
                    >
                      <Image
                        width={6}
                        height={6}
                        src={skill.logo}
                        alt={skill.name}
                        className="w-4 h-4"
                      />
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-neutral-200">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.frontend.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 px-2 py-1 bg-neutral-800 rounded text-xs font-medium text-neutral-200"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2,
                        type: "spring",
                      }}
                      viewport={{ once: true }}
                    >
                      <Image
                        width={6}
                        height={6}
                        src={skill.logo}
                        alt={skill.name}
                        className="w-4 h-4"
                      />
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-neutral-200">
                  Backend
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.backend.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 px-2 py-1 bg-neutral-800 rounded text-xs font-medium text-neutral-200"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2,
                        type: "spring",
                      }}
                      viewport={{ once: true }}
                    >
                      <Image
                        width={6}
                        height={6}
                        src={skill.logo}
                        alt={skill.name}
                        className="w-4 h-4"
                      />
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 text-neutral-200">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.tools.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 px-2 py-1 bg-neutral-800 rounded text-xs font-medium text-neutral-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        width={6}
                        height={6}
                        src={skill.logo}
                        alt={skill.name}
                        className="w-4 h-4"
                      />
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* --- PROJECTS --- */}
          <motion.section
            id="projects"
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            viewport={{ once: true }}
            className="border-b border-neutral-800 pb-8"
          >
            <h2 className="text-lg font-bold text-accent mb-3">Projects</h2>

            {/* Development Projects */}
            <div className="mb-6">
              <h3 className="text-base font-semibold mb-3 text-neutral-200">
                Development
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    stiffness: 150,
                    damping: 12,
                  }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    title="LinkSlam"
                    emoji="🔗"
                    description="LinkSlam is a social link-sharing platform where users can save, like, and share links publicly or privately. It blends Reddit-style engagement with Linktree-style organization, featuring Google OAuth, tag-based search, and responsive UI built with Next.js and MongoDB."
                    stack={["Next.js", "Express", "MongoDB", "Google Auth"]}
                    liveUrl="https://link-slam.vercel.app/"
                    githubUrl="https://github.com/Archit80/LinkSlam"
                    image="/link-slam.png"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    stiffness: 150,
                    damping: 12,
                  }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    title="Meme Aunty"
                    emoji="👩🏼‍🦰"
                    description="Meme Aunty is an AI-powered meme generator with desi Gen Z vibes. Users upload photos and get savage, wholesome, or spicy captions using Gemini API. Rate-limited by browser fingerprinting, and built with React, FastAPI, Pillow, and Cloudinary."
                    stack={["React", "FastAPI", "Gemini API"]}
                    liveUrl="https://meme-aunty.vercel.app/"
                    githubUrl="https://github.com/Archit80/meme-gen-backend"
                    image="/meme-aunty.png"
                  />
                </motion.div>
              </div>
            </div>

            {/* Design Projects */}
            <div>
              <h3 className="text-base font-semibold mb-3 text-neutral-200">
                Design
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 150,
                    damping: 12,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="bg-neutral-800 rounded-2xl p-4 hover:shadow-md transition-shadow hover:border-neutral-600">
                    <div className="w-full h-40 bg-neutral-700 rounded-lg mb-3 flex items-center justify-center">
                      <Image
                        width={800}
                        height={400}
                        src="/hashtech.png"
                        alt="HashTech 2025 Website preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-1 flex items-center text-neutral-100">
                        HashTech 2025
                      </h3>
                      <p className="text-sm leading-snug text-justify text-neutral-300 mb-3">
                        Led the creative redesign of HASHTECH, crafting a
                        high-impact visual experience rooted in cyberpunk
                        design. Focused on minimalist UI, smooth transitions,
                        and a bold design language to make the tech fest
                        identity pop across screens.
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm">
                          UI/UX
                        </span>
                        <span className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm">
                          Figma
                        </span>
                        <span className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm">
                          Redesign
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://www.behance.net/gallery/217205387/HashTech-2025-Cyberpunk-Theme-Website-Redesign"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs bg-accent text-black px-3 py-1 rounded hover:bg-opacity-80 transition-colors"
                        >
                          <ExternalLink size={12} /> Behance
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 150,
                    damping: 12,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="bg-neutral-800 rounded-2xl p-4 hover:shadow-md transition-shadow hover:border-neutral-600">
                    <div className="w-full h-40 bg-neutral-700 rounded-lg mb-3 flex items-center justify-center">
                      <Image
                        width={600}
                        height={300}
                        src="/alumnet.png"
                        alt="Alumnet preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-1 flex items-center text-neutral-100">
                        Alumnet
                      </h3>
                      <p className="text-sm leading-snug text-justify text-neutral-300 mb-3">
                        Conceptualised and designed a user-friendly alumni
                        platform UX UI With features like Razorpay-powered
                        donations, smart search for networking, mentorship
                        matching, event alerts, and a unique Student Volunteer
                        tool to boost alumni-student engagement.
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm">
                          Product Design
                        </span>
                        <span className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm">
                          Figma
                        </span>
                        <span className="bg-neutral-700 text-neutral-200 text-xs px-2 py-1 rounded-sm">
                          Problem Solving
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://www.behance.net/gallery/209333177/Alumnet-UI-UX-Case-Study"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs bg-accent text-black px-3 py-1 rounded hover:bg-opacity-80 transition-colors"
                        >
                          <ExternalLink size={12} /> Behance
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* --- EXPERIENCE --- */}
          <motion.section
            id="experience"
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-bold text-accent mb-6">Experience</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neutral-700"></div>
              {/* Timeline Items */}
              <div className="space-y-8">
                {/* CHALKSNBOARD - Software Developer Intern */}
                <motion.div
                  className="relative flex items-start gap-6"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  viewport={{ once: false }}
                >
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full">
                    <Image
                      src="/chalksnboard-logo.jpg"
                      alt="Chalksnboard Logo"
                      width={40}
                      height={40}
                      className="w-12 h-12 rounded-full border-2 border-accent-neutral object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-white">
                        Software Developer Intern
                      </h3>
                      <span className="text-sm text-neutral-400">
                        Jan 2025 - Apr 2025 · 4 mos
                      </span>
                    </div>
                    <p className="text-md text-accent mb-2">
                      {" "}
                      <span className="font-bold text-md">Chalksnboard</span> ·
                      Internship · Gurugram, Haryana, India · Hybrid
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 mb-2 text-sm">
                      <li>
                        Developed the frontend using React.js, ensuring
                        responsiveness and consistency across devices.
                      </li>
                      <li>
                        Integrated RESTful APIs for efficient data handling and
                        dynamic content updates.
                      </li>
                      <li>
                        Built the backend admin panel logic, enabling smooth
                        management and operational control.
                      </li>
                      <li>
                        Integrated Razorpay Payments Gateway in the website
                        (with backend validation).
                      </li>
                      <li>
                        
                      </li>
                    </ul>
                    {/* <div className="flex flex-wrap gap-1 mt-1"> */}
                    {/* <span className="text-xs bg-accent/20 text-accent px-1 py-1 rounded">Front-End Development</span>
                    <span className="text-xs bg-accent/20 text-accent px-1 py-1 rounded">API Integration</span>
                    <span className="text-xs bg-accent/20 text-accent py-1 px-1/2 rounded">+7 skills</span> */}
                    {/* </div> */}
                  </div>
                </motion.div>

                {/* Brainchant Official - UI Design and Video Editing Intern */}
                <motion.div
                  className="relative flex items-start gap-6"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  viewport={{ once: false }}
                >
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/brainchant-logo.png"
                      alt="Brainchant Logo"
                      width={40}
                      height={40}
                      className="w-12 h-12 rounded-full border-2 border-accent-neutral object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-white">
                        UI Design and Video Editing Intern
                      </h3>
                      <span className="text-sm text-neutral-400">
                        Aug 2024 - Sep 2024 · 2 mos
                      </span>
                    </div>
                    <p className="text-md text-accent mb-2">
                      <span className="font-bold "> Brainchant Official </span>·
                      Internship · Delhi · Remote
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 mb-2 text-sm">
                      <li>
                        Produced video content that achieved 20,000+ views on
                        Instagram, driving increased brand engagement and online
                        reach.
                      </li>
                      <li>
                        Designed visually consistent and intuitive user
                        interfaces across platforms, maintaining alignment with
                        the brand’s identity and user experience goals.
                      </li>
                    </ul>
                    {/* <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Social Media Outreach</span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Content Strategy</span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">+4 skills</span>
                  </div> */}
                  </div>
                </motion.div>

                {/* SDC USICT, GGSIPU - User Experience Designer */}
                <motion.div
                  className="relative flex items-start gap-6"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  viewport={{ once: false }}
                >
                  <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Image
                      src="/sdc-logo.jpg"
                      alt="SDC USICT Logo"
                      width={40}
                      height={40}
                      className="w-12 h-12 rounded-full border-2 border-accent-neutral object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-white">
                        User Experience Designer
                      </h3>
                      <span className="text-sm text-neutral-400">
                        Nov 2024 - Present
                      </span>
                    </div>
                    <p className="text-md text-accent mb-2">
                      <span className="font-bold">
                        Software Development Cell USICT, GGSIPU
                      </span>
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 mb-2 text-sm">
                      <li>
                        Improved team workflows by implementing collaborative
                        design strategies and enhancing dev-designer
                        communication. Major contribution: Anugoonj 2025 the
                        university’s cultural fest website.
                      </li>
                      <li>
                        Utilized Figma and Canva to create intuitive UI designs
                        and social media posts, improving overall design
                        consistency and user engagement.
                      </li>
                    </ul>
                    {/* <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Figma</span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Canva</span>
                  </div> */}
                  </div>
                </motion.div>

                {/* ACM Student Chapter USICT, GGSIPU - Web Developer and UX Designer */}
                <motion.div
                  className="relative flex items-start gap-6"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    type: "spring",
                    stiffness: 180,
                    damping: 18,
                  }}
                  viewport={{ once: false }}
                >
                  <div className="relative z-10 w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/acm-logo.png"
                      alt="ACM Student Chapter Logo"
                      width={40}
                      height={40}
                      className="w-12 h-12 rounded-full border-2 border-accent-neutral object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-neutral-800 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-white">
                        Web Developer and UX Designer
                      </h3>
                      <span className="text-sm text-neutral-400">
                        Oct 2024 - Present
                      </span>
                    </div>
                    <p className="text-md text-accent mb-2">
                      <span className="font-bold">
                        ACM Student Chapter USICT, GGSIPU
                      </span>
                    </p>
                    <ul className="list-disc pl-5 text-neutral-300 mb-2 text-sm">
                      <li>
                        Designed and developed websites for ACM Student Chapter,
                        including:
                      </li>
                      <ul className="list-disc pl-8 text-xs text-neutral-300 mb-2">
                        <li>
                          <span className="font-semibold">Utkrisht:</span>{" "}
                          Simplified professor-student communication and
                          internship applications.
                        </li>
                        <li>
                          <span className="font-semibold">HashTech:</span>{" "}
                          Focused on aesthetics, attracting high engagement from
                          students.
                        </li>
                      </ul>
                    </ul>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded">
                        Next.js
                      </span>
                      <span className="text-sm bg-accent/20 text-accent px-2 py-1 rounded">
                        UI/UX
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </main>

        {/* --- FOOTER / CONTACT --- */}
        <motion.footer
          id="contact"
          className="text-center mt-12 py-4 border-t border-neutral-800"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 15,
            delay: 0.3,
          }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg font-bold text-accent mb-2">Get in Touch</h2>
          <p className="mb-3 text-sm text-neutral-200">
            Feel free to reach out for collaborations or just a friendly chat!
          </p>
          <a
            href="mailto:archittaneja80@gmail.com"
            className="text-sm font-medium hover:text-neutral-300 transition-colors text-neutral-200"
          >
            archittaneja80@gmail.com
          </a>
          <motion.div
            className="flex justify-center gap-4 mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/Archit80"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/archit80"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://instagram.com/archit.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <Instagram size={18} />
            </a>
          </motion.div>
          <p className="text-xs text-neutral-500 mt-4">
            © {new Date().getFullYear()} Archit Taneja. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
