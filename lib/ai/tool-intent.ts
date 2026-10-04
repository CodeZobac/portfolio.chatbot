import { projects } from "../data/projects";
import { skills } from "../data/skills";
import type { tools } from "./tools";

export type PortfolioToolName = keyof typeof tools;
export interface ToolIntent {
  selectedTools: PortfolioToolName[];
  matches: Partial<Record<PortfolioToolName, { score: number; reasons: string[] }>>;
  projectIds?: string[];
  skillIds?: string[];
}

// Priorities, not model confidence. Repeated words never accumulate points.
export const INTENT_SCORES = { section: 100, entity: 90, threshold: 90 } as const;

const normalize = (text: string) => text.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/[’']s\b/g, "").replace(/[’']/g, "").replace(/[^a-z0-9+#./?;,\s-]/g, " ")
  .replace(/\s+/g, " ").trim();

const hasPhrase = (text: string, phrase: string) => {
  const escaped = normalize(phrase).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`).test(text);
};

const sectionTerms = {
  showProjects: ["projects", "project", "portfolio", "projetos", "projeto", "built", "construiu", "construiste"],
  showSkills: ["skills", "skill", "expertise", "proficiency", "technical capabilities", "technologies", "competencias", "habilidades", "aptidoes", "tecnologias", "conhecimentos"],
  showExperience: ["experience", "work history", "career", "role", "roles", "professional background", "experiencia", "percurso profissional", "carreira", "cargo", "cargos", "funcao", "papel"],
  showEducation: ["education", "degree", "certifications", "certificates", "study", "studied", "academic background", "educacao", "formacao", "curso", "certificacoes", "estudaste", "estudou"],
  showContact: ["contact", "contact info", "email", "e-mail", "phone", "linkedin", "github", "reach you", "reach out", "get in touch", "contacto", "contato", "contactar", "telefone", "falar contigo"],
  showCV: ["cv", "resume", "curriculo", "curriculum", "full profile", "full professional overview", "complete professional overview", "perfil completo"],
} satisfies Partial<Record<PortfolioToolName, string[]>>;

const projectAliases: Record<string, string[]> = {
  "etic-resource-hub": ["etic", "etic algarve", "resource hub", "etic_algarve"],
  "in-sintonia": ["in sintonia"],
};
const requestCue = /\b(show|tell|explain|describe|list|display|give|get|see|view|want|download|what|which|where|why|how|can|could|do you|have you|mostra|mostrar|mostre|ver|veja|quero|gostaria|explica|explique|fala|fale|diz|diga|lista|quais|qual|onde|como|porque|que|tens|podes|pode|descarregar|baixar|obter)\b/;
const downloadCue = /\b(download|descarregar|descarrega|baixar|baixa|transferir)\b/;
const displayCue = /\b(show|see|view|display|mostra|mostrar|mostre|ver|veja)\b/;
const negation = /\b(not|never|dont|without|except|exclude|nao|nem|sem|exceto|excluir)\b/;
const portugueseCue = /\b(mostra|mostrar|mostre|quero|gostaria|explica|explique|fala|fale|diz|diga|quais|qual|onde|como|porque|tens|podes|pode|teu|tua|seu|sua|projeto|projetos)\b/;

/** Only user text from the current turn can authorize visual components. */
export function latestUserText(messages: readonly unknown[]): string {
  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index];
    if (!message || typeof message !== "object" || !("role" in message) || message.role !== "user") continue;
    if ("parts" in message && Array.isArray(message.parts)) {
      return message.parts.flatMap((part: unknown) =>
        part && typeof part === "object" && "type" in part && part.type === "text"
          && "text" in part && typeof part.text === "string" ? [part.text] : []
      ).join(" ");
    }
    return "content" in message && typeof message.content === "string" ? message.content : "";
  }
  return "";
}

export function resolveToolIntent(input: string): ToolIntent {
  const text = normalize(input);
  const matches: ToolIntent["matches"] = {};
  const projectIds = new Set<string>();
  const skillIds = new Set<string>();
  let allProjects = false;
  let allSkills = false;
  const add = (tool: PortfolioToolName, score: number, reason: string) => {
    const previous = matches[tool];
    matches[tool] = { score: Math.max(previous?.score ?? 0, score), reasons: [...new Set([...(previous?.reasons ?? []), reason])] };
  };

  // Keep negated lists together; affirmative conjunctions inherit request verbs.
  let requested = false;
  let excluded = false;
  let alternative = false;
  let ambiguous = false;
  const clauses = text.split(/(\b(?:and|also|e|tambem|but|mas|instead|rather|ou|or|without|sem|except|exceto)\b|[?;,]|\.(?=\s|$))/);
  for (const raw of clauses) {
    const clause = raw.trim();
    if (!clause) continue;
    if (/^(but|mas|instead|rather|[?;.]|,)$/.test(clause)) { excluded = false; requested = false; alternative = false; continue; }
    if (/^(without|sem|except|exceto)$/.test(clause)) { excluded = true; continue; }
    if (/^(or|ou)$/.test(clause)) { if (!excluded) alternative = true; continue; }
    if (/^(and|also|e|tambem)$/.test(clause)) continue;
    // Portuguese "no" means "in the", not an English exclusion.
    const negative = negation.exec(clause) ?? (!portugueseCue.test(text) ? /\bno\b/.exec(clause) : null);
    // "Show ETIC, not skills" and "show ETIC without skills" preserve the positive part.
    const positive = negative ? clause.slice(0, negative.index).trim() : clause;
    const isRequest = requestCue.test(positive);
    if (excluded && !isRequest) continue;
    if (isRequest) excluded = false;
    const sections = Object.entries(sectionTerms).filter(([, terms]) => terms.some(term => hasPhrase(positive, term)));
    const namedProjects = projects.filter(project => [project.id, project.name, project.name.split(":")[0], ...(projectAliases[project.id] ?? [])].some(alias => hasPhrase(positive, alias)));
    const namedSkills = skills.filter(skill => hasPhrase(positive, skill.name) || hasPhrase(positive, skill.id));
    const bareTopic = [...sections.flatMap(([, terms]) => terms), ...namedProjects.flatMap(p => [p.id, p.name.split(":")[0], ...(projectAliases[p.id] ?? [])]), ...namedSkills.map(s => s.name)]
      .some(term => normalize(term) === positive.replace(/\b(please|por favor)\b/g, "").trim());
    requested = requested || isRequest || bareTopic;
    if (positive && requested) {
      const has = (name: string) => sections.some(([tool]) => tool === name);
      const career = has("showExperience") && !/\b(with|using|com|em)\b/.test(positive.replace(/\b(em etic|em vivadrive)\b/g, ""));
      const education = has("showEducation");
      // Shared-object requests: "show and download CV", "download CV and show it".
      const cv = has("showCV") || (displayCue.test(positive)
        && /^(show|see|view|display|mostra|mostrar|mostre|ver|veja)( it| o| lo)?$/.test(positive)
        && sectionTerms.showCV.some(term => hasPhrase(text, term)));
      const pdf = hasPhrase(positive, "pdf");
      const download = downloadCue.test(positive) || (pdf && /\b(get|give|want|show|see|view|quero|ver|mostra|mostrar|obter)\b/.test(positive));
      const scopedToProject = projectIds.size > 0 && /\b(its|their|used|nesse|neste|dele|deles|utilizadas|usadas)\b/.test(positive);
      if (alternative && (sections.length || namedProjects.length || namedSkills.length)) ambiguous = true;
      if (cv || (download && (pdf || (matches.showCV && /\b(it|lo|o)\b/.test(positive))))) {
        if (download) add("downloadResume", INTENT_SCORES.section, "Explicit resume download request");
        if (!download) add("showCV", INTENT_SCORES.section, "Explicit CV display request");
      } else if (education) {
        add("showEducation", INTENT_SCORES.section, "Explicit education request");
      } else if (career) {
        add("showExperience", INTENT_SCORES.section, "Explicit work history request");
      } else if (has("showProjects") || namedProjects.length) {
        add("showProjects", has("showProjects") ? INTENT_SCORES.section : INTENT_SCORES.entity, "Requested projects");
        namedProjects.forEach(project => projectIds.add(project.id));
        if (!namedProjects.length) allProjects = true;
      } else if ((has("showSkills") || namedSkills.length) && !scopedToProject) {
        add("showSkills", has("showSkills") ? INTENT_SCORES.section : INTENT_SCORES.entity, "Requested skills");
        namedSkills.forEach(skill => skillIds.add(skill.id));
        if (!namedSkills.length) allSkills = true;
      } else if (has("showContact")) {
        add("showContact", INTENT_SCORES.section, "Explicit contact request");
      }
    }
    if (negative) excluded = true;
  }
  if (ambiguous) return { selectedTools: [], matches: {} };
  return {
    selectedTools: (Object.keys(matches) as PortfolioToolName[]).filter(tool => matches[tool]!.score >= INTENT_SCORES.threshold),
    matches,
    ...(projectIds.size && !allProjects ? { projectIds: [...projectIds] } : {}),
    ...(skillIds.size && !allSkills ? { skillIds: [...skillIds] } : {}),
  };
}
