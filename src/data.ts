import { Project, SkillCategory, ExperienceItem } from "./types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "CORE TECHNOLOGIES",
    skills: ["React", "React Native", "Node.js", "Golang", "MERN Stack"],
  },
  {
    title: "DATA & ORM",
    skills: ["PostgreSQL", "Prisma", "MongoDB", "Redis"],
  },
  {
    title: "TOOLS & AI",
    skills: ["Cursor", "Gemini AI", "Clerk Auth", "Docker"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "lostfound",
    title: "HCMUT-LostFound",
    description:
      "University community mobile app. Features real-time messaging, advanced authentication, and an intuitive tracking system for lost belongings within the campus.",
    longDescription:
      "A community solution for HCMUT students with item classification, real-time notifications, and location tagging to help find lost assets.",
    tags: ["REACT NATIVE", "NODE.JS"],
    techTags: ["#ReactNative", "#NodeJS", "#Express", "#SocketIO", "#MongoDB"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOF4_XuJwu-Ck-_A4Bz1NlDR5Tx1BLDV4fIDvWunOq56ulWx5G1ztjL1NqAW5z_FF8AdQe-6RiSjoOnS2hzClxMU4ekCM51lsRuOSoYn6Q1voZCerEjiUR-NzwPppEGvfl2bgezKRZO_6aYgZxPZvPHZ9_uAHHHSyuP9fM52_BSzcwZ-WiZqQbfzKz28jYxn-MXk586x81j4Q3ThDwR0VVPHmnBBCg9wszgeBeHu_vIAMbjUX37qbZahS02ZKWVmpGWyUiXTGa5Jis",
    github: "https://github.com/namnd-hcmut/lost-found",
    metrics: [
      { label: "Active Students", value: "3,500+" },
      { label: "Matched Items", value: "850+" },
      { label: "Realtime Delay", value: "<150ms" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    description: "Robust full-scale MERN stack application with Stripe integration and admin dashboard.",
    longDescription:
      "Custom retail app with product indexing, admin dashboards, and Stripe checkout with webhook confirmation.",
    tags: ["MONGODB", "EXPRESS", "REACT", "STRIPE"],
    techTags: ["#MongoDB", "#Express", "#React", "#TailwindCSS", "#Stripe"],
    github: "https://github.com/namnd-hcmut/mern-store",
    metrics: [
      { label: "API Load Speed", value: "340ms avg" },
      { label: "Data Integrity", value: "100% ACID" },
    ],
  },
  {
    id: "internhub",
    title: "Intern Hub",
    description: "Platform for interns with real-time voting, shared resources, and robust DB management.",
    longDescription:
      "Collaboration platform with group voting, resource storage, and PostgreSQL/Prisma backend.",
    tags: ["POSTGRESQL", "PRISMA", "NODE.JS"],
    techTags: ["#PostgreSQL", "#Prisma", "#TypeScript", "#ClerkAuth", "#TailwindCSS"],
    github: "https://github.com/namnd-hcmut/intern-hub",
    metrics: [
      { label: "Users", value: "1,200+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "exp-eyecode",
    role: "Full-Stack Intern",
    company: "EyeCode Technology Solutions",
    duration: "June 2023 — Present",
    description:
      "Driving frontend innovation using React and Tailwind. Full-stack integration and AI-driven workflows.",
    highlights: [
      "Optimized dashboard rendering speeds by 40%.",
      "Increased test coverage to 85% with Jest and React Testing Library.",
      "Built secure REST APIs with JWT authentication.",
    ],
  },
  {
    id: "exp-hcmut",
    role: "Computer Science Student",
    company: "Ho Chi Minh University of Technology",
    duration: "2020 — 2024",
    description:
      "Software Engineering and Distributed Systems. GPA 3.6/4.0.",
    highlights: [
      "Certified Scrum Professional & Gemini Certified Student.",
      "Coursework: Databases, Distributed Systems, Web Development.",
    ],
  },
];
