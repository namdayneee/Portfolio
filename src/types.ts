export interface Message {
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  techTags: string[];
  image?: string;
  github?: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  highlights?: string[];
}
