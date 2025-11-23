// Core data type interfaces

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  type: 'tech' | 'hospitality';
  achievements: string[];
  responsibilities: string[];
  technologies?: string[];
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  role: string;
  keyDecisions: string[];
  techStack: string[];
  category: 'web' | 'mobile' | 'ai';
  featured: boolean;
  image: string;
  gallery?: string[];
  links?: {
    live?: string;
    github?: string;
    demo?: string;
  };
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: 'frontend' | 'backend' | 'infrastructure' | 'ai-data' | 'soft-skills';
  yearsOfExperience?: number;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: number;
  level: string;
  certifications?: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin: string;
  github: string;
  twitter?: string;
  availability: string;
}

// Tool output types for Dynamic Components

export interface ExperienceToolOutput {
  type: 'experience';
  data: {
    roles: Experience[];
    highlight?: string;
  };
}

export interface ProjectsToolOutput {
  type: 'projects';
  data: {
    projects: Project[];
    category?: string;
    featured?: boolean;
  };
}

export interface SkillsToolOutput {
  type: 'skills';
  data: {
    skills: Skill[];
    category?: string;
  };
}

export interface EducationToolOutput {
  type: 'education';
  data: {
    education: Education;
  };
}

export interface ContactToolOutput {
  type: 'contact';
  data: {
    contact: PersonalInfo;
  };
}

export interface CVToolOutput {
  type: 'cv';
  data: {
    personal: PersonalInfo;
    experience: Experience[];
    education: Education;
    skills: Skill[];
    projects: Project[];
  };
}

export interface ResumeToolOutput {
  type: 'resume';
  data: {
    url: string;
  };
}

export type ToolOutput =
  | ExperienceToolOutput
  | ProjectsToolOutput
  | SkillsToolOutput
  | EducationToolOutput
  | ContactToolOutput
  | CVToolOutput
  | ResumeToolOutput;
