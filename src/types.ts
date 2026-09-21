export interface Project {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  tags: string[];
  highlights: string[];
  github?: string;
  live?: string;
  status: string;
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
  highlights: string[];
}
