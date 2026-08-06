import source from "@/content/portfolio-content.json";
import { portfolioContentSchema } from "./schema";

export const portfolioContent = portfolioContentSchema.parse(source);
export const skills = portfolioContent.skills;
export const projects = portfolioContent.projects;
export const experiences = portfolioContent.experiences;

