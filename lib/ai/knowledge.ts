import { experiences, projects, skills } from "../content/content";

/**
 * Prompt sections generated from the validated content JSON, so admin edits
 * reach the assistant after the next build. Factual lists only: voice and
 * rules stay hand-written in system-prompt.ts. Skill proficiency is omitted on purpose.
 */

const CLIENT_PROJECT_IDS = ["fleetflow", "etic-resource-hub"];

const bullets = (label: string, items?: string[]) =>
  items?.length ? `**${label}**:\n${items.map(item => `- ${item}`).join("\n")}` : "";

const join = (parts: Array<string | false | undefined>) => parts.filter(Boolean).join("\n\n");

export const experienceKnowledge = () =>
  experiences
    .map(experience => join([
      `## ${experience.title} @ ${experience.company} (${experience.period})`,
      `**Location**: ${experience.location}`,
      bullets("Responsibilities", experience.responsibilities),
      bullets("Key Interventions", experience.achievements),
      !!experience.technologies?.length && `**Tech**: ${experience.technologies.join(", ")}`,
    ]))
    .join("\n\n");

export const projectsKnowledge = () => {
  const section = (heading: string, list: typeof projects) =>
    list.length
      ? `## ${heading}\n\n${list.map(project => join([
          `### ${project.name} (canonical ID: ${project.id})`,
          `- **Role**: ${project.role}`,
          `- **Tagline**: ${project.tagline}`,
          `- **Description**: ${project.description}`,
          `- **Problem**: ${project.problem}`,
          `- **Solution**: ${project.solution}`,
          project.keyDecisions.length ? `- **Key decisions**: ${project.keyDecisions.join("; ")}` : "",
          `- **Tech**: ${project.techStack.join(", ")}`,
        ])).join("\n\n")}`
      : "";
  const isClient = (id: string) => CLIENT_PROJECT_IDS.includes(id);
  return join([
    section("Client Projects", projects.filter(project => isClient(project.id))),
    section("Portfolio Projects", projects.filter(project => !isClient(project.id))),
  ]);
};

export const projectClassification = () => {
  const clients = projects.filter(project => CLIENT_PROJECT_IDS.includes(project.id));
  const others = projects.filter(project => !CLIENT_PROJECT_IDS.includes(project.id));
  const names = (list: typeof projects) => list.map(project => `${project.name} (canonical ID: ${project.id})`).join(", ") || "none";
  return `- **Client projects**: ${names(clients)}. ETIC Algarve Resource Hub is also called ETIC Resource Hub or ETIC.\n- **Portfolio projects**: ${names(others)}. Do not describe them as client commissions or imply a client relationship.`;
};

export const skillsKnowledge = () => {
  const labels: Record<string, string> = {
    "ai-data": "AI / Data",
    backend: "Backend",
    frontend: "Frontend",
    infrastructure: "Infrastructure",
    "soft-skills": "Soft skills",
  };
  return Object.entries(labels)
    .map(([category, label]) => {
      const list = skills.filter(skill => skill.category === category);
      if (!list.length) return "";
      const lines = list.map(skill => {
        const years = skill.yearsOfExperience ? ` (${skill.yearsOfExperience} years)` : "";
        const applied = skill.appliedIn?.length ? `: ${skill.appliedIn.join("; ")}` : "";
        return `- ${skill.name}${years}${applied}`;
      });
      return `**${label}**\n${lines.join("\n")}`;
    })
    .filter(Boolean)
    .join("\n\n");
};
