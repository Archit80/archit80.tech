export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "code" | "behance";
}

export interface Project {
  id: string;
  title: string;
  category: "Development" | "Design";
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
  links: ProjectLink[];
  featured?: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  date: string;
  logo: string;
  logoAlt: string;
  bullets: string[];
}

export const hero = {
  name: "Archit Taneja",
  image: "/pfp.png",
  role: "Full-Stack Developer · UI/UX Designer · Product Builder",
  intro: "I build digital products where systems thinking and visual clarity meet.",
  resume: "/Archit_Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/Archit80" },
    { label: "LinkedIn", href: "https://linkedin.com/in/archit80" },
    { label: "Instagram", href: "https://instagram.com/archit.mp4" },
  ],
};

export const about = {
  statement: "I make complex things feel obvious.",
  body: "I'm Archit, a 20-year-old engineering student from GGSIPU, Delhi. I work across full-stack development and UX/UI design — crafting responsive apps, thoughtful interfaces, and smooth user flows. I care about the distance between an idea and the moment it becomes useful.",
  education: "B.Tech Information Technology · USICT, GGSIPU · 8.81 CGPA",
};

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Prisma",
  "Socket.IO",
  "AWS",
  "Docker",
  "Figma",
  "Framer",
  "Product thinking",
  "Design systems",
  "Motion",
];

export const projects: Project[] = [
  {
    id: "algowars",
    title: "AlgoWars",
    category: "Development",
    description: "A fast 1v1 DSA battle platform with real-time feedback, gamified progression, solo practice, and quick concept revision.",
    tags: ["Next.js", "Socket.IO", "Prisma", "PostgreSQL", "Redis"],
    image: "/algowars.png",
    imageAlt: "AlgoWars interface preview",
    featured: true,
    links: [
      { label: "Live demo", href: "https://algo-wars.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/archit80/algowars", kind: "code" },
    ],
  },
  {
    id: "linkslam",
    title: "LinkSlam",
    category: "Development",
    description: "A social link-sharing platform blending public discovery with private organization, tag search, and Google OAuth.",
    tags: ["Next.js", "Express", "MongoDB", "Google Auth"],
    image: "/link-slam.png",
    imageAlt: "LinkSlam interface preview",
    links: [
      { label: "Live demo", href: "https://link-slam.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/Archit80/LinkSlam", kind: "code" },
    ],
  },
  {
    id: "meme-aunty",
    title: "Meme Aunty",
    category: "Development",
    description: "An AI meme generator with desi Gen Z energy, built around image uploads, Gemini captions, and a lightweight FastAPI service.",
    tags: ["React", "FastAPI", "Gemini API", "Cloudinary"],
    image: "/meme-aunty.png",
    imageAlt: "Meme Aunty interface preview",
    links: [
      { label: "Live demo", href: "https://meme-aunty.vercel.app/", kind: "live" },
      { label: "Source", href: "https://github.com/Archit80/meme-gen-backend", kind: "code" },
    ],
  },
  {
    id: "hashtech",
    title: "HashTech 2025",
    category: "Design",
    description: "A cyberpunk visual redesign for a technology festival, focused on hierarchy, motion, and a stronger digital identity.",
    tags: ["UI/UX", "Figma", "Redesign"],
    image: "/hashtech.png",
    imageAlt: "HashTech 2025 website redesign preview",
    links: [{ label: "Case study", href: "https://www.behance.net/gallery/217205387/HashTech-2025-Cyberpunk-Theme-Website-Redesign", kind: "behance" }],
  },
  {
    id: "alumnet",
    title: "Alumnet",
    category: "Design",
    description: "A product concept for alumni networking, mentorship, donations, event alerts, and student-volunteer collaboration.",
    tags: ["Product design", "Figma", "Problem solving"],
    image: "/alumnet.png",
    imageAlt: "Alumnet product design preview",
    links: [{ label: "Case study", href: "https://www.behance.net/gallery/209333177/Alumnet-UI-UX-Case-Study", kind: "behance" }],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "venwiz",
    company: "Venwiz",
    role: "Software Engineering Intern",
    location: "Bengaluru · Remote",
    date: "June 2026 — Present",
    logo: "/vz-logo.png",
    logoAlt: "Venwiz logo",
    bullets: [
      "Built an internal CMS dashboard with React, Redux, TypeScript, and NestJS, including role-based access control and rollback support for enterprise project data.",
      "Shipped notes, tagging, and SendGrid alerts that became a primary collaboration workflow across teams.",
      "Integrated Google Docs API report generation and replaced unsigned document links with signed, time-limited CloudFront URLs.",
    ],
  },
  {
    id: "chalksnboard",
    company: "ChalksnBoard",
    role: "Software Developer Intern",
    location: "Gurugram · Hybrid",
    date: "January 2025 — May 2025",
    logo: "/chalksnboard-logo.jpg",
    logoAlt: "ChalksnBoard logo",
    bullets: [
      "Owned the frontend lifecycle for FindMySchool.net, supporting onboarding for 3,000+ schools with React and Tailwind CSS.",
      "Designed backend flows, database schemas, and multi-role controller systems with Java Spring Boot.",
      "Defined Razorpay API contracts and webhook listeners for secure fee-payment validation.",
    ],
  },
  {
    id: "brainchant",
    company: "Brainchant",
    role: "UI Design & Video Editing Intern",
    location: "Delhi · Remote",
    date: "August 2024 — September 2024",
    logo: "/brainchant-logo.png",
    logoAlt: "Brainchant logo",
    bullets: [
      "Produced video content that reached 20,000+ views on Instagram.",
      "Designed consistent interfaces and social content aligned with brand and UX goals.",
    ],
  },
  {
    id: "sdc",
    company: "SDC USICT",
    role: "User Experience Designer",
    location: "Delhi · India",
    date: "November 2024 — Present",
    logo: "/sdc-logo.jpg",
    logoAlt: "Software Development Cell logo",
    bullets: [
      "Improved collaborative design workflows and dev-designer communication across student product teams.",
      "Contributed to Anugoonj 2025 and created UI systems and social assets with Figma and Canva.",
    ],
  },
];

export const contact = {
  email: "archittaneja80@gmail.com",
  message: "Open to good problems, thoughtful teams, and work that rewards attention to detail.",
};
