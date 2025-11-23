/**
 * Tool Descriptions and Metadata for AI Agent
 * 
 * This file defines clear descriptions for when the AI should call each tool,
 * including trigger phrases, parameters, and usage guidelines.
 */

export interface ToolMetadata {
  name: string;
  description: string;
  triggerPhrases: string[];
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
    options?: string[];
  }[];
  usageGuidelines: string[];
  examples: string[];
}

export const toolDescriptions: Record<string, ToolMetadata> = {
  showExperience: {
    name: 'showExperience',
    description: 'Display Afonso\'s work experience in a visual timeline format. Use this tool when the recruiter asks about work history, professional background, roles, or career progression. The tool can optionally highlight specific roles or companies.',
    triggerPhrases: [
      'tell me about your experience',
      'what\'s your work history',
      'where have you worked',
      'what roles have you had',
      'tell me about your background',
      'what did you do at [company]',
      'describe your professional experience',
      'walk me through your career',
      'what\'s your work experience',
      'tell me about your time at [company]'
    ],
    parameters: [
      {
        name: 'highlight',
        type: 'string',
        required: false,
        description: 'Optional parameter to highlight a specific role or company. Use when the recruiter asks about a specific position or organization (e.g., "ETIC Algarve", "hospitality", "Full-Stack Developer").'
      }
    ],
    usageGuidelines: [
      'Use when discussing work history or career progression',
      'Use the highlight parameter when the recruiter asks about a specific role or company',
      'Combine with text explanation of strategic decisions and achievements',
      'Don\'t use if the recruiter is only asking about a specific project (use showProjects instead)',
      'Use when discussing the transition from hospitality to tech'
    ],
    examples: [
      'Q: "Tell me about your experience" → Call showExperience() with no parameters',
      'Q: "What did you do at ETIC?" → Call showExperience({ highlight: "ETIC Algarve" })',
      'Q: "Tell me about your hospitality background" → Call showExperience({ highlight: "hospitality" })',
      'Q: "Walk me through your career" → Call showExperience() with no parameters'
    ]
  },

  showProjects: {
    name: 'showProjects',
    description: 'Display Afonso\'s portfolio projects in a visual grid with images, descriptions, and tech stacks. Use this tool when the recruiter asks about projects, portfolio work, things Afonso has built, or wants to see examples of work. Supports filtering by category (web, mobile, ai) and featured status.',
    triggerPhrases: [
      'show me your projects',
      'what have you built',
      'tell me about your portfolio',
      'show me your work',
      'what projects have you worked on',
      'do you have any examples',
      'show me your [web/mobile/ai] projects',
      'what\'s your best work',
      'tell me about [project name]',
      'show me featured projects',
      'what are you most proud of'
    ],
    parameters: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter projects by category. Options: "web", "mobile", "ai", "all". Use when the recruiter asks about specific types of projects.',
        options: ['web', 'mobile', 'ai', 'all']
      },
      {
        name: 'featured',
        type: 'boolean',
        required: false,
        description: 'When true, show only featured/highlight projects. Use when the recruiter asks for "best work", "top projects", or "featured projects".'
      }
    ],
    usageGuidelines: [
      'Use when discussing portfolio work or specific projects',
      'Use category filter when recruiter asks about specific types of projects (e.g., "web projects", "AI work")',
      'Use featured=true when recruiter asks for "best work" or "top projects"',
      'Combine with text explanation of strategic decisions and problem-solving approach',
      'Always explain the "why" behind technical decisions, not just the "what"',
      'Connect projects to the core principles (problem-centric, pragmatism, etc.)'
    ],
    examples: [
      'Q: "Show me your projects" → Call showProjects({ category: "all" })',
      'Q: "What web applications have you built?" → Call showProjects({ category: "web" })',
      'Q: "Show me your AI projects" → Call showProjects({ category: "ai" })',
      'Q: "What\'s your best work?" → Call showProjects({ featured: true })',
      'Q: "Tell me about Bottleneck Ninja" → Call showProjects() and explain the specific project in text'
    ]
  },

  showSkills: {
    name: 'showSkills',
    description: 'Display Afonso\'s technical skills with proficiency levels in a visual chart format. Use this tool when the recruiter asks about technical skills, expertise, proficiency, or what technologies Afonso knows. Supports filtering by category (frontend, backend, infrastructure, ai-data, soft-skills).',
    triggerPhrases: [
      'what are your skills',
      'what technologies do you know',
      'tell me about your technical skills',
      'what\'s your tech stack',
      'how proficient are you in [technology]',
      'what [frontend/backend/infrastructure] skills do you have',
      'what programming languages do you know',
      'what frameworks do you use',
      'tell me about your expertise',
      'what are you good at'
    ],
    parameters: [
      {
        name: 'category',
        type: 'string',
        required: false,
        description: 'Filter skills by category. Options: "frontend", "backend", "infrastructure", "ai-data", "soft-skills", "all". Use when the recruiter asks about specific skill categories.',
        options: ['frontend', 'backend', 'infrastructure', 'ai-data', 'soft-skills', 'all']
      }
    ],
    usageGuidelines: [
      'Use when discussing technical capabilities or proficiency',
      'Use category filter when recruiter asks about specific skill areas',
      'Always provide context about how skills have been applied, not just proficiency numbers',
      'Connect skills to projects and real-world applications',
      'Emphasize soft skills as strategic advantages from hospitality background',
      'Don\'t just list technologies - explain when and why they\'re used'
    ],
    examples: [
      'Q: "What are your skills?" → Call showSkills({ category: "all" })',
      'Q: "What frontend technologies do you know?" → Call showSkills({ category: "frontend" })',
      'Q: "Tell me about your backend skills" → Call showSkills({ category: "backend" })',
      'Q: "What AI experience do you have?" → Call showSkills({ category: "ai-data" })',
      'Q: "How proficient are you in React?" → Call showSkills({ category: "frontend" }) and explain React experience in text'
    ]
  },

  showEducation: {
    name: 'showEducation',
    description: 'Display Afonso\'s educational background including degree, institution, and certifications. Use this tool when the recruiter asks about education, degree, certifications, or academic background.',
    triggerPhrases: [
      'tell me about your education',
      'what\'s your educational background',
      'where did you study',
      'what degree do you have',
      'do you have any certifications',
      'what certifications do you have',
      'tell me about your training',
      'what\'s your academic background'
    ],
    parameters: [],
    usageGuidelines: [
      'Use when discussing educational background or certifications',
      'Emphasize the hands-on, project-based nature of the ETIC program',
      'Mention in-progress certifications (AWS, Terraform) to show continuous learning',
      'Connect education to practical project work (e.g., ETIC Resource Hub built during studies)',
      'No parameters needed - this tool always shows all education data'
    ],
    examples: [
      'Q: "Tell me about your education" → Call showEducation()',
      'Q: "What degree do you have?" → Call showEducation()',
      'Q: "Do you have any certifications?" → Call showEducation()',
      'Q: "Where did you study?" → Call showEducation()'
    ]
  },

  showContact: {
    name: 'showContact',
    description: 'Display Afonso\'s contact information including email, phone, LinkedIn, GitHub, and website. Use this tool when the recruiter wants to get in touch, asks for contact details, or the conversation is moving toward next steps.',
    triggerPhrases: [
      'how can I contact you',
      'what\'s your email',
      'how do I reach you',
      'can I get your contact information',
      'what\'s your phone number',
      'do you have a LinkedIn',
      'what\'s your GitHub',
      'how can I get in touch',
      'let\'s connect',
      'I\'d like to reach out'
    ],
    parameters: [],
    usageGuidelines: [
      'Use when the recruiter asks for contact information',
      'Use when the conversation is moving toward scheduling interviews or next steps',
      'Use when the recruiter wants to connect on LinkedIn or see GitHub profile',
      'Combine with information about availability and interest in opportunities',
      'No parameters needed - this tool always shows all contact data'
    ],
    examples: [
      'Q: "How can I contact you?" → Call showContact()',
      'Q: "What\'s your email?" → Call showContact()',
      'Q: "Do you have a LinkedIn?" → Call showContact()',
      'Q: "I\'d like to reach out" → Call showContact()'
    ]
  },

  downloadResume: {
    name: 'downloadResume',
    description: 'Provide a link to download Afonso\'s resume in PDF format. Use this tool when the recruiter explicitly asks for a resume, CV, or downloadable document.',
    triggerPhrases: [
      'can I get your resume',
      'do you have a resume',
      'can I download your CV',
      'send me your resume',
      'I need your CV',
      'can you share your resume',
      'where can I get your resume'
    ],
    parameters: [],
    usageGuidelines: [
      'Use only when the recruiter explicitly asks for a resume or CV',
      'Don\'t use preemptively - let the recruiter ask for it',
      'The tool provides a download link to a PDF file',
      'No parameters needed - this tool always returns the resume URL'
    ],
    examples: [
      'Q: "Can I get your resume?" → Call downloadResume()',
      'Q: "Do you have a CV?" → Call downloadResume()',
      'Q: "Send me your resume" → Call downloadResume()'
    ]
  }
};

/**
 * Helper function to get tool description by name
 */
export function getToolDescription(toolName: string): ToolMetadata | undefined {
  return toolDescriptions[toolName];
}

/**
 * Helper function to get all tool names
 */
export function getAllToolNames(): string[] {
  return Object.keys(toolDescriptions);
}

/**
 * Helper function to search for tools by trigger phrase
 */
export function findToolByTriggerPhrase(phrase: string): string[] {
  const lowerPhrase = phrase.toLowerCase();
  const matchingTools: string[] = [];

  for (const [toolName, metadata] of Object.entries(toolDescriptions)) {
    const hasMatch = metadata.triggerPhrases.some(trigger => 
      lowerPhrase.includes(trigger.toLowerCase())
    );
    if (hasMatch) {
      matchingTools.push(toolName);
    }
  }

  return matchingTools;
}
