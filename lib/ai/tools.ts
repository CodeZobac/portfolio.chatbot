import { tool } from 'ai';
import { z } from 'zod';
import { experiences } from '../data/experience';
import { projects } from '../data/projects';
import { skills } from '../data/skills';
import { education, personalInfo } from '../data/personal';

/**
 * Tool: showExperience
 * Displays Afonso's work experience with optional highlighting
 */
export const showExperience = tool({
  description: `Use this tool when the user asks about Afonso's work experience, professional background, roles, or career history. 
  Examples: "Tell me about your experience", "What have you worked on?", "Show me your work history", "Tell me about ETIC"`,
  inputSchema: z.object({
    highlight: z
      .string()
      .optional()
      .describe('Optional: specific role, company, or keyword to highlight in the experience display'),
  }),
  execute: async ({ highlight }) => {
    return {
      type: 'cv' as const,
      data: {
        personal: personalInfo,
        experience: experiences,
        education,
        skills: skills.filter(s => [
          'React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS',
          'Python', 'FastAPI', 'CrewAI', 'PostgreSQL', 'Docker',
          'Terraform', 'AWS', 'Kubernetes', 'Git',
          'Empathetic Thinking', 'Out-of-the-box Perspective', 'Mental Visualization', 'Present Attitude', 'Nurturing Environments'
        ].includes(s.name)),
        projects: projects.filter(p => p.featured),
      },
    };
  },
});

/**
 * Tool: showProjects
 * Displays Afonso's portfolio projects with filtering options
 */
export const showProjects = tool({
  description: `Use this tool when the user asks about Afonso's projects, portfolio work, or things he has built.
  Examples: "Show me your projects", "What have you built?", "Tell me about your portfolio", "Show me web projects", "What are your featured projects?"`,
  inputSchema: z.object({
    category: z
      .enum(['web', 'mobile', 'ai', 'all'])
      .optional()
      .default('all')
      .describe('Filter projects by category: web, mobile, ai, or all'),
    featured: z
      .boolean()
      .optional()
      .describe('If true, only show featured projects'),
  }),
  execute: async ({ category = 'all', featured }) => {
    let filteredProjects = projects;

    // Filter by category if not 'all'
    if (category !== 'all') {
      filteredProjects = filteredProjects.filter((project) => project.category === category);
    }

    // Filter by featured if specified
    if (featured === true) {
      filteredProjects = filteredProjects.filter((project) => project.featured);
    }

    return {
      type: 'projects' as const,
      data: {
        projects: filteredProjects,
        category,
        featured,
      },
    };
  },
});

/**
 * Tool: showSkills
 * Displays Afonso's technical skills with proficiency levels
 */
export const showSkills = tool({
  description: `Use this tool when the user asks about Afonso's technical skills, expertise, proficiency, or technologies he knows.
  Examples: "What are your skills?", "Tell me about your technical expertise", "What technologies do you know?", "Show me your frontend skills"`,
  inputSchema: z.object({
    category: z
      .enum(['frontend', 'backend', 'infrastructure', 'ai-data', 'soft-skills', 'all'])
      .optional()
      .default('all')
      .describe('Filter skills by category: frontend, backend, infrastructure, ai-data, soft-skills, or all'),
  }),
  execute: async ({ category = 'all' }) => {
    let filteredSkills = skills;

    // Filter by category if not 'all'
    if (category !== 'all') {
      filteredSkills = filteredSkills.filter((skill) => skill.category === category);
    }

    return {
      type: 'skills' as const,
      data: {
        skills: filteredSkills,
        category,
      },
    };
  },
});

/**
 * Tool: showEducation
 * Displays Afonso's education and certifications
 */
export const showEducation = tool({
  description: `Use this tool when the user asks about Afonso's education, degree, certifications, or academic background.
  Examples: "What's your education?", "Tell me about your degree", "Do you have any certifications?", "Where did you study?"`,
  inputSchema: z.object({}),
  execute: async () => {
    return {
      type: 'education' as const,
      data: {
        education,
      },
    };
  },
});

/**
 * Tool: showContact
 * Displays Afonso's contact information and social links
 */
export const showContact = tool({
  description: `Use this tool when the user asks about how to contact Afonso, reach out, get in touch, or asks for contact information.
  Examples: "How can I contact you?", "What's your email?", "How do I reach you?", "Show me your contact info", "Are you available?"`,
  inputSchema: z.object({}),
  execute: async () => {
    return {
      type: 'contact' as const,
      data: {
        contact: personalInfo,
      },
    };
  },
});

/**
 * Tool: showCV
 * Displays a comprehensive overview of Afonso's CV with all key information
 */
export const showCV = tool({
  description: `Use this tool when the user asks to see Afonso's CV, resume, or full professional overview.
  Examples: "Show me your CV", "Can I see your resume?", "Tell me about your background", "Show me your full profile"`,
  inputSchema: z.object({}),
  execute: async () => {
    return {
      type: 'cv' as const,
      data: {
        personal: personalInfo,
        experience: experiences,
        education,
        skills: skills.filter(s => [
          'React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS',
          'Python', 'FastAPI', 'CrewAI', 'PostgreSQL', 'Docker',
          'Terraform', 'AWS', 'Kubernetes', 'Git',
          'Empathetic Thinking', 'Out-of-the-box Perspective', 'Mental Visualization', 'Present Attitude', 'Nurturing Environments'
        ].includes(s.name)),
        projects: projects.filter(p => p.featured), // Featured projects only
      },
    };
  },
});

/**
 * Tool: downloadResume
 * Provides a link to download Afonso's resume
 */
export const downloadResume = tool({
  description: `Use this tool when the user explicitly asks to download the PDF resume.
  Examples: "Download resume", "Get PDF", "I want the PDF version"`,
  inputSchema: z.object({}),
  execute: async () => {
    return {
      type: 'resume' as const,
      data: {
        url: '/resume/afonso-caboz-resume.pdf',
      },
    };
  },
});

// Export all tools as a single object for easy import
export const tools = {
  showExperience,
  showProjects,
  showSkills,
  showEducation,
  showContact,
  showCV,
  downloadResume,
};
