// Content for the doodle portfolio. Wording follows the `main` branch site; components only render it.

export interface DoodleLink {
  label: string;
  href: string;
}

export interface DoodleProject {
  id: string;
  kind: "development" | "design";
  title: string;
  kicker: string;
  quote?: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  /** First link is the primary action. */
  links: DoodleLink[];
}

export interface DoodleRole {
  id: string;
  company: string;
  logo: string;
  role: string;
  meta: string;
  date: string;
  focus?: string;
  points: string[];
}

export interface DoodleSkill {
  name: string;
  logo: string;
  /** Single-color logo: inverted (not colored) in dark mode so it stays visible. */
  mono?: boolean;
}

const RESUME_URL = "https://drive.google.com/file/d/1VD7WAtL83oJXJd8ld_sLQj38RXMq0jwA/view?usp=sharing";

export const hero = {
  greeting: "hey there, i'm",
  name: "Archit Taneja",
  title: "Software Engineering Student",
  // Non-breaking spaces keep each phrase whole, so narrow screens only wrap between them.
  tagline: "Full-Stack Developer · Ships Fast with AI Agents · Product Builder",
  status: "Available for Full-Time Roles",
  statusDetail: "Starting June 2027",
  statusNote: "Hire me before someone else does!",
  resume: RESUME_URL,
};

// Logos are devicon SVGs (MIT) in /public/skills, shown grayscale until hovered.
export const skillGroups: { title: string; skills: DoodleSkill[] }[] = [
  {
    title: "Languages",
    skills: [
      { name: "C", logo: "/skills/c.svg" },
      { name: "C++", logo: "/skills/cplusplus-original.svg" },
      { name: "Java", logo: "/skills/java-original.svg" },
      { name: "Python", logo: "/skills/python-original.svg" },
      { name: "Go", logo: "/skills/go-original-wordmark.svg" },
      { name: "JavaScript", logo: "/skills/javascript.svg" },
      { name: "TypeScript", logo: "/skills/typescript.svg" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", logo: "/skills/html5.svg" },
      { name: "CSS3", logo: "/skills/css3.svg" },
      { name: "React", logo: "/skills/react-original.svg" },
      { name: "Next.js", logo: "/skills/nextjs.svg", mono: true },
      { name: "Redux Toolkit", logo: "/skills/redux.svg" },
      { name: "Zustand", logo: "/skills/zustand.svg" },
      { name: "Axios", logo: "/skills/axios.svg" },
      { name: "Tailwind CSS", logo: "/skills/tailwindcss.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", logo: "/skills/nodejs.svg" },
      { name: "Express.js", logo: "/skills/express.svg", mono: true },
      { name: "NestJS", logo: "/skills/nestjs.svg" },
      { name: "FastAPI", logo: "/skills/fastapi.svg" },
      { name: "Socket.io", logo: "/skills/socketio.svg", mono: true },
      { name: "Prisma", logo: "/skills/prisma.svg", mono: true },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", logo: "/skills/postgresql-original.svg" },
      { name: "MySQL", logo: "/skills/mysql.svg" },
      { name: "MongoDB", logo: "/skills/mongodb.svg" },
      { name: "Redis", logo: "/skills/redis.svg" },
      { name: "Supabase", logo: "/skills/supabase.svg" },
      { name: "Firebase", logo: "/skills/firebase.svg" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "AWS", logo: "/skills/aws.svg", mono: true },
      { name: "Docker", logo: "/skills/docker-original.svg" },
      { name: "Git", logo: "/skills/git.svg" },
      { name: "GitHub", logo: "/skills/github.svg", mono: true },
      { name: "VS Code", logo: "/skills/vscode.svg" },
      { name: "Claude Code", logo: "/skills/claude.svg" },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "Figma", logo: "/skills/figma.svg" },
      { name: "Framer", logo: "/skills/framer.svg", mono: true },
    ],
  },
];

// The marquee repeats the skill groups (bar Languages and Design), so the two never drift apart.
export const banner = {
  tags: ["skills", "projects", "experience"],
  words: skillGroups.filter((g) => !["Languages", "Design"].includes(g.title)).map((g) => g.title.toUpperCase()),
};

// Logos for stack items that aren't on the skills board.
const extraLogos: Record<string, DoodleSkill> = {
  google: { name: "Google", logo: "/skills/google.svg" },
  gemini: { name: "Gemini", logo: "/skills/gemini.svg" },
  webrtc: { name: "WebRTC", logo: "/skills/webrtc.svg", mono: true },
  shadcn: { name: "shadcn/ui", logo: "/skills/shadcnui.svg", mono: true },
  cloudinary: { name: "Cloudinary", logo: "/skills/cloudinary.svg" },
};

// "Socket.IO" / "Socket.io" and "Express" / "Express.js" should match the same logo.
const logoKey = (name: string) => name.toLowerCase().replace(/[^a-z0-9+]/g, "").replace(/js$/, "");
const skillByKey = new Map(skillGroups.flatMap((g) => g.skills).map((s) => [logoKey(s.name), s]));

/** The skill logo for a project stack item, or undefined for non-tech tags like "Redesign". */
export function logoFor(name: string): DoodleSkill | undefined {
  const key = logoKey(name);
  return skillByKey.get(key) ?? Object.entries(extraLogos).find(([k]) => key.startsWith(k))?.[1];
}

export const projects: DoodleProject[] = [
  {
    id: "algowars",
    kind: "development",
    title: "AlgoWars",
    kicker: "Real-Time 1v1 DSA Platform",
    quote: "Where algorithms meet adrenaline.",
    description:
      "AlgoWars — LeetCode, but snappier: fast 1v1 battles with real-time WebRTC feedback, focused solo practice sessions, a gamified progression system with XP, streaks and badges, a Gen Z-friendly playful UI built with shadcn/ui, and quick concept revision tools to brush up on DSA without long problem sessions.",
    stack: [
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "Socket.IO",
      "WebRTC",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Supabase",
      "Google OAuth",
    ],
    image: "/algowars.png",
    imageAlt: "AlgoWars preview",
    links: [
      { label: "Live demo", href: "https://algo-wars.vercel.app/" },
      { label: "GitHub", href: "https://github.com/archit80/algowars" },
    ],
  },
  {
    id: "linkslam",
    kind: "development",
    title: "LinkSlam",
    kicker: "Full-Stack Link Sharing",
    quote: "Your digital identity, structured and shared.",
    description:
      "LinkSlam is a social link-sharing platform where users can save, like, and share links publicly or privately. It blends Reddit-style engagement with Linktree-style organization, featuring Google OAuth, tag-based search, and responsive UI built with Next.js and MongoDB.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Google Auth"],
    image: "/link-slam.png",
    imageAlt: "LinkSlam preview",
    links: [
      { label: "Live demo", href: "https://link-slam.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Archit80/LinkSlam" },
    ],
  },
  {
    id: "meme-aunty",
    kind: "development",
    title: "Meme Aunty",
    kicker: "AI-Powered Meme Generator",
    quote: "Because backend code needs a sense of humor.",
    description:
      "Meme Aunty is an AI-powered meme generator with desi Gen Z vibes. Users upload photos and get savage, wholesome, or spicy captions using Gemini API. Rate-limited by browser fingerprinting, and built with React, FastAPI, Pillow, and Cloudinary.",
    stack: ["React", "Python", "FastAPI", "Gemini API", "Pillow", "Cloudinary"],
    image: "/meme-aunty.png",
    imageAlt: "Meme Aunty preview",
    links: [
      { label: "Live demo", href: "https://meme-aunty.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Archit80/meme-gen-backend" },
    ],
  },
  {
    id: "hashtech",
    kind: "design",
    title: "HashTech 2025",
    kicker: "Website Redesign",
    description:
      "Led the creative redesign of HASHTECH, crafting a high-impact visual experience rooted in cyberpunk design. Focused on minimalist UI, smooth transitions, and a bold design language to make the tech fest identity pop across screens.",
    stack: ["UI/UX", "Figma", "Redesign"],
    image: "/hashtech.png",
    imageAlt: "HashTech 2025 Website preview",
    links: [
      { label: "Behance", href: "https://www.behance.net/gallery/217205387/HashTech-2025-Cyberpunk-Theme-Website-Redesign" },
    ],
  },
  {
    id: "alumnet",
    kind: "design",
    title: "Alumnet",
    kicker: "UI/UX Case Study",
    description:
      "Conceptualised and designed a user-friendly alumni platform UX UI With features like Razorpay-powered donations, smart search for networking, mentorship matching, event alerts, and a unique Student Volunteer tool to boost alumni-student engagement.",
    stack: ["Product Design", "Figma", "Problem Solving"],
    image: "/alumnet.png",
    imageAlt: "Alumnet preview",
    links: [{ label: "Behance", href: "https://www.behance.net/gallery/209333177/Alumnet-UI-UX-Case-Study" }],
  },
];

export const experience: DoodleRole[] = [
  {
    id: "venwiz",
    company: "Venwiz Technologies",
    logo: "/vz-logo.png",
    role: "Software Engineering Intern",
    meta: "Internship · Bengaluru, Karnataka (Remote)",
    date: "June 2026 - Present",
    focus: "Enterprise CMS & Secure Architecture",
    points: [
      "Built an internal CMS dashboard from scratch (React, Redux, TypeScript, NestJS) with role-based access control and a safe rollback mechanism for project-tracking data, on a platform used by enterprise clients including L&T, BPCL, CtrlS and Thermax.",
      "Shipped an end-to-end notes and tagging system (SendGrid automated email alerts) that became the platform’s primary tool for cross-team collaboration.",
      "Built a backend service (NestJS) integrating the Google Docs API to auto-generate formatted site-visit reports on demand, including the underlying data schema and migration to support it.",
      "Identified and fixed a security vulnerability in document access by replacing unsigned download links with signed, time-limited URLs (AWS CloudFront).",
    ],
  },
  {
    id: "chalksnboard",
    company: "Chalksnboard",
    logo: "/chalksnboard-logo.jpg",
    role: "Software Developer Intern",
    meta: "Internship · Gurugram, Haryana, India · Hybrid",
    date: "Jan 2025 - Apr 2025 · 4 mos",
    focus: "Scaling Onboarding & Payments",
    points: [
      "Developed the frontend using React.js, ensuring responsiveness and consistency across devices.",
      "Integrated RESTful APIs for efficient data handling and dynamic content updates.",
      "Built the backend admin panel logic, enabling smooth management and operational control.",
      "Integrated Razorpay Payments Gateway in the website (with backend validation).",
      "Collaborated with the design team to create a modern and user-friendly interface, enhancing the overall user experience.",
    ],
  },
  {
    id: "brainchant",
    company: "Brainchant Official",
    logo: "/brainchant-logo.png",
    role: "UI Design and Video Editing Intern",
    meta: "Internship · Delhi · Remote",
    date: "Aug 2024 - Sep 2024 · 2 mos",
    points: [
      "Produced video content that achieved 20,000+ views on Instagram, driving increased brand engagement and online reach.",
      "Designed visually consistent and intuitive user interfaces across platforms, maintaining alignment with the brand’s identity and user experience goals.",
    ],
  },
  {
    id: "sdc",
    company: "Software Development Cell USICT, GGSIPU",
    logo: "/sdc-logo.jpg",
    role: "Chairperson · User Experience Designer",
    meta: "Delhi · India",
    date: "Nov 2024 - Present",
    points: [
      "Improved team workflows by implementing collaborative design strategies and enhancing dev-designer communication. Major contribution: Anugoonj 2025 the university’s cultural fest website.",
      "Utilized Figma and Canva to create intuitive UI designs and social media posts, improving overall design consistency and user engagement.",
    ],
  },
];

export const about = {
  photo: "/pfp.png",
  bio: "I’m Archit, a 21-year-old engineering student from GGSIPU, Delhi, and a full-stack developer who ships. I build with AI coding agents like Claude Code every day, which lets me move fast without cutting corners: clean, typed, reviewed code that holds up in production, even in fast-paced teams. I still bring an eye for clean UI, but my focus is building and shipping real products. Currently exploring modern web tech, backend systems, and everything in between.",
};

export const education = [
  {
    school: "University School of Information, Communication and Technology",
    degree: "Bachelor of Technology - Information Technology",
    score: "Overall CGPA: 9.04",
    location: "Delhi, India",
    date: "September 2023 - August 2027",
  },
  {
    school: "Mahavir Senior Model School",
    degree: "Central Board of Secondary Education",
    score: "91.2%",
    location: "Delhi, India",
    date: "April 2021 - March 2023",
  },
];

export const contact = {
  title: "Get in Touch",
  header: "LET’S BUILD SOMETHING AWESOME",
  message: "Need something built and shipped fast, without the quality slipping? Reach out, or just say hi!",
  email: "archittaneja80@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Archit80" },
    { label: "LinkedIn", href: "https://linkedin.com/in/archit80" },
    { label: "Instagram", href: "https://instagram.com/archit.mp4" },
    { label: "Resume", href: RESUME_URL },
  ] satisfies DoodleLink[],
};

export const easterEggs = {
  coffee: "Fuel level: 87% cold coffee. Current status: Debugging a race condition.",
  brackets: "500+ LeetCode problems in C++ later, and I still forget semicolons sometimes.",
  sdc: "Herding 350+ student developers and building fest websites so you don't have to.",
};

export const navLinks = [
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];
