# Spec 03: Tool Definitions for Dynamic Components

## Goal
Define AI tools (function calling) that allow the Gemini model to decide when to render specific UI components based on conversation context.

## Requirements

### 1. Create Tool Definitions File

#### `lib/ai/tools.ts`
```typescript
import { tool } from 'ai';
import { z } from 'zod';
import { experiences } from '../data/experience';
import { projects } from '../data/projects';
import { skills, skillCategories } from '../data/skills';
import { personalInfo, education, certifications } from '../data/personal';

export const portfolioTools = {
  showExperience: tool({
    description: `Display work experience timeline with roles, companies, dates, and achievements. 
    Use this when the user asks about work history, career progression, specific roles, or professional experience.
    Can optionally highlight a specific company or filter by employment type.`,
    parameters: z.object({
      highlight: z
        .string()
        .optional()
        .describe('Specific company or role to highlight in the timeline'),
      type: z
        .enum(['full-time', 'contract', 'freelance', 'internship', 'all'])
        .optional()
        .default('all')
        .describe('Filter experiences by employment type'),
    }),
    execute: async ({ highlight, type }) => {
      let filteredExperiences = experiences;

      // Filter by type if specified
      if (type && type !== 'all') {
        filteredExperiences = experiences.filter((exp) => exp.type === type);
      }

      return {
        type: 'experience',
        highlight,
        employmentType: type,
        data: filteredExperiences,
        totalYears: calculateTotalYears(filteredExperiences),
      };
    },
  }),

  showProjects: tool({
    description: `Display portfolio projects with images, descriptions, technologies, and links.
    Use this when asked about projects, portfolio work, specific technologies used, or examples of work.
    Can filter by category or show only featured projects.`,
    parameters: z.object({
      category: z
        .enum(['web', 'mobile', 'ai', 'other', 'all'])
        .optional()
        .default('all')
        .describe('Filter projects by category'),
      featured: z
        .boolean()
        .optional()
        .describe('Show only featured/highlighted projects'),
      technology: z
        .string()
        .optional()
        .describe('Filter projects that use a specific technology'),
    }),
    execute: async ({ category, featured, technology }) => {
      let filteredProjects = projects;

      // Filter by category
      if (category && category !== 'all') {
        filteredProjects = filteredProjects.filter(
          (proj) => proj.category === category
        );
      }

      // Filter by featured
      if (featured) {
        filteredProjects = filteredProjects.filter((proj) => proj.featured);
      }

      // Filter by technology
      if (technology) {
        filteredProjects = filteredProjects.filter((proj) =>
          proj.technologies.some(
            (tech) => tech.toLowerCase().includes(technology.toLowerCase())
          )
        );
      }

      return {
        type: 'projects',
        category,
        featured,
        technology,
        data: filteredProjects,
        totalProjects: projects.length,
      };
    },
  }),

  showSkills: tool({
    description: `Render interactive skills chart showing proficiency levels and years of experience.
    Use this when asked about technical skills, expertise, proficiency levels, or specific technologies.
    Can filter by skill category or show all skills.`,
    parameters: z.object({
      category: z
        .enum(['frontend', 'backend', 'tools', 'soft-skills', 'all'])
        .optional()
        .default('all')
        .describe('Filter skills by category'),
      minLevel: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe('Show only skills above this proficiency level'),
    }),
    execute: async ({ category, minLevel }) => {
      let filteredSkills = skills;

      // Filter by category
      if (category && category !== 'all') {
        filteredSkills = filteredSkills.filter(
          (skill) => skill.category === category
        );
      }

      // Filter by minimum level
      if (minLevel) {
        filteredSkills = filteredSkills.filter(
          (skill) => skill.level >= minLevel
        );
      }

      // Sort by level descending
      filteredSkills.sort((a, b) => b.level - a.level);

      return {
        type: 'skills',
        category,
        minLevel,
        data: filteredSkills,
        categories: skillCategories,
        topSkills: skills
          .sort((a, b) => b.level - a.level)
          .slice(0, 5)
          .map((s) => s.name),
      };
    },
  }),

  showEducation: tool({
    description: `Display education history including degrees, institutions, and certifications.
    Use this when asked about educational background, degrees, certifications, or academic qualifications.`,
    parameters: z.object({}),
    execute: async () => {
      return {
        type: 'education',
        data: {
          education,
          certifications,
        },
      };
    },
  }),

  showContact: tool({
    description: `Display contact information including email, phone, social media links, and availability.
    Use this when asked how to get in touch, for contact details, or about availability for opportunities.`,
    parameters: z.object({}),
    execute: async () => {
      return {
        type: 'contact',
        data: {
          email: personalInfo.email,
          phone: personalInfo.phone,
          social: personalInfo.social,
          location: personalInfo.location,
          availability: personalInfo.availability,
          preferredRoles: personalInfo.preferredRoles,
          workPreference: personalInfo.workPreference,
        },
      };
    },
  }),

  showResume: tool({
    description: `Provide a downloadable resume/CV link with complete work history.
    Use this when explicitly asked for a resume, CV, or complete professional document.`,
    parameters: z.object({}),
    execute: async () => {
      return {
        type: 'resume',
        data: {
          downloadUrl: '/resume.pdf', // Update with actual resume URL
          lastUpdated: new Date().toISOString(),
          format: 'PDF',
        },
      };
    },
  }),
};

// Helper function to calculate total years of experience
function calculateTotalYears(experiences: typeof experiences): number {
  const now = new Date();
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? now : new Date(exp.endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += months;
  });

  return Math.round(totalMonths / 12 * 10) / 10; // Round to 1 decimal
}

// Export tool names for type safety
export type ToolName = keyof typeof portfolioTools;
```

### 2. Create Type Definitions

#### `lib/ai/types.ts`
```typescript
import { z } from 'zod';
import { portfolioTools } from './tools';

// Extract tool result types
export type ToolResult = Awaited<
  ReturnType<(typeof portfolioTools)[keyof typeof portfolioTools]['execute']>
>;

// Tool call state types
export type ToolCallState =
  | 'input-streaming'
  | 'input-available'
  | 'output-available'
  | 'output-error';

// Message part types for rendering
export type MessagePart =
  | { type: 'text'; text: string }
  | {
      type: 'tool-showExperience';
      state: ToolCallState;
      toolCallId: string;
      input?: z.infer<typeof portfolioTools.showExperience.parameters>;
      output?: Awaited<ReturnType<typeof portfolioTools.showExperience.execute>>;
      errorText?: string;
    }
  | {
      type: 'tool-showProjects';
      state: ToolCallState;
      toolCallId: string;
      input?: z.infer<typeof portfolioTools.showProjects.parameters>;
      output?: Awaited<ReturnType<typeof portfolioTools.showProjects.execute>>;
      errorText?: string;
    }
  | {
      type: 'tool-showSkills';
      state: ToolCallState;
      toolCallId: string;
      input?: z.infer<typeof portfolioTools.showSkills.parameters>;
      output?: Awaited<ReturnType<typeof portfolioTools.showSkills.execute>>;
      errorText?: string;
    }
  | {
      type: 'tool-showEducation';
      state: ToolCallState;
      toolCallId: string;
      output?: Awaited<ReturnType<typeof portfolioTools.showEducation.execute>>;
      errorText?: string;
    }
  | {
      type: 'tool-showContact';
      state: ToolCallState;
      toolCallId: string;
      output?: Awaited<ReturnType<typeof portfolioTools.showContact.execute>>;
      errorText?: string;
    }
  | {
      type: 'tool-showResume';
      state: ToolCallState;
      toolCallId: string;
      output?: Awaited<ReturnType<typeof portfolioTools.showResume.execute>>;
      errorText?: string;
    };
```

## Acceptance Criteria
- [ ] All 6 tools are defined with proper descriptions
- [ ] Each tool has appropriate Zod schema for parameters
- [ ] Tool execute functions return properly typed data
- [ ] Tools filter data based on parameters
- [ ] Helper functions (like calculateTotalYears) work correctly
- [ ] Type definitions are exported for use in components
- [ ] No TypeScript errors

## Testing
1. Import tools in a test file
2. Call each tool's execute function with sample parameters
3. Verify returned data structure matches expectations
4. Test filtering logic (category, featured, etc.)
5. Verify TypeScript types are correct

## Notes
- Tool descriptions are crucial - they guide the AI on when to use each tool
- Keep execute functions simple and fast
- Return structured data that components can easily render
- Consider adding more tools later (testimonials, blog posts, etc.)
- The AI SDK will handle the actual function calling mechanism

## Next Steps
After completing this spec, move to:
- **Spec 04**: Create the API route for chat with Gemini
