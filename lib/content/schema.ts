import { z } from "zod";

const idSchema = z
  .string()
  .trim()
  .min(1, "An ID is required.")
  .max(100)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens.");

const nonEmptyList = z.array(z.string().trim().min(1)).default([]);
const optionalList = z.array(z.string().trim().min(1)).optional();
const webUrl = z
  .string()
  .url("Enter a complete URL.")
  .refine((value) => value.startsWith("https://") || value.startsWith("http://"), {
    message: "Use an http:// or https:// URL.",
  });
const mediaPath = z.string().trim().min(1).refine(
  (value) => value.startsWith("/") || value.startsWith("https://") || value.startsWith("http://"),
  "Use a public path beginning with / or a complete URL.",
);

export const skillSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1).max(100),
  proficiency: z.number().int().min(0).max(100),
  category: z.enum(["frontend", "backend", "infrastructure", "ai-data", "soft-skills"]),
  yearsOfExperience: z.number().min(0).max(80).optional(),
  appliedIn: optionalList,
  strengthTag: z.string().trim().min(1).max(120).optional(),
  priority: z.enum(["core", "supporting", "emerging"]).optional(),
});

export const projectSchema = z.object({
  id: idSchema,
  name: z.string().trim().min(1).max(180),
  tagline: z.string().trim().min(1).max(240),
  description: z.string().trim().min(1).max(6000),
  problem: z.string().trim().min(1).max(3000),
  solution: z.string().trim().min(1).max(3000),
  role: z.string().trim().min(1).max(180),
  keyDecisions: nonEmptyList,
  techStack: nonEmptyList,
  category: z.enum(["web", "mobile", "ai"]),
  featured: z.boolean(),
  image: mediaPath,
  gallery: z.array(mediaPath).optional(),
  youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/, "Enter a valid YouTube video link.").optional(),
  links: z
    .object({ live: webUrl.optional(), github: webUrl.optional(), demo: webUrl.optional() })
    .optional(),
});

export const experienceSchema = z.object({
  id: idSchema,
  title: z.string().trim().min(1).max(180),
  company: z.string().trim().min(1).max(140),
  period: z.string().trim().min(1).max(100),
  location: z.string().trim().min(1).max(140),
  type: z.enum(["tech", "hospitality"]),
  achievements: nonEmptyList,
  responsibilities: nonEmptyList,
  technologies: optionalList,
});

export const portfolioContentSchema = z
  .object({
    version: z.literal(1),
    skills: z.array(skillSchema),
    projects: z.array(projectSchema),
    experiences: z.array(experienceSchema),
  })
  .superRefine((content, ctx) => {
    for (const [key, records] of Object.entries({
      skills: content.skills,
      projects: content.projects,
      experiences: content.experiences,
    })) {
      const seen = new Set<string>();
      records.forEach((record, index) => {
        if (seen.has(record.id)) {
          ctx.addIssue({
            code: "custom",
            path: [key, index, "id"],
            message: `The ID “${record.id}” is already in use.`,
          });
        }
        seen.add(record.id);
      });
    }
  });

export type PortfolioContentInput = z.infer<typeof portfolioContentSchema>;

