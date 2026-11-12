import { experiences, projects, skills } from "@/lib/content/content";

export const SITE_URL = "https://www.codezobac.com";
export const PERSON = {
  name: "Afonso Caboz",
  jobTitle: "AI Engineer and Full-Stack Developer",
  city: "Faro",
  region: "Algarve",
  country: "PT",
  email: "afonso.caboz@gmail.com",
  linkedin: "https://www.linkedin.com/in/afonsocaboz",
  github: "https://github.com/CodeZobac",
} as const;

export const TITLE = "Afonso Caboz | Especialista em IA e Programador Full-Stack no Algarve (Faro)";
export const DESCRIPTION =
  "Afonso Caboz, AI engineer and full-stack developer in Faro, Algarve. Criação de websites, aplicações à medida, agentes e chatbots com IA para empresas em Portugal e remoto. Conversa com o meu assistente.";

export const SERVICES = [
  "AI agents and LLM applications (RAG, multi-agent orchestration)",
  "LLM observability and cost optimisation",
  "Full-stack web applications with Next.js, React and TypeScript",
  "Backend services in Python, Rust and TypeScript",
];

export const skillGroups = Object.entries(
  skills.reduce<Record<string, string[]>>((acc, s) => ((acc[s.category] ??= []).push(s.name), acc), {}),
).filter(([category]) => category !== "soft-skills");

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Afonso Caboz Portfolio",
      inLanguage: ["pt-PT", "en"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      url: SITE_URL,
      email: PERSON.email,
      address: { "@type": "PostalAddress", addressLocality: PERSON.city, addressRegion: PERSON.region, addressCountry: PERSON.country },
      knowsLanguage: ["pt", "en"],
      knowsAbout: [...new Set(skills.filter((s) => s.priority === "core").map((s) => s.name))],
      sameAs: [PERSON.linkedin, PERSON.github],
      alumniOf: { "@type": "EducationalOrganization", name: "ETIC Algarve" },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: `${PERSON.name} | AI and Full-Stack Development`,
      url: SITE_URL,
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: [{ "@type": "AdministrativeArea", name: "Algarve" }, { "@type": "Country", name: "Portugal" }],
      serviceType: SERVICES,
    },
  ],
};

export function llmsTxt(full = false) {
  const lines = [
    `# ${PERSON.name}`,
    `> ${PERSON.jobTitle} based in ${PERSON.city}, ${PERSON.region}, Portugal. Available for clients in the Algarve, across Portugal and remotely.`,
    "",
    "## Services",
    ...SERVICES.map((s) => `- ${s}`),
    "",
    "## Projects",
    ...projects.map((p) => `- ${p.name}: ${full ? p.description : p.tagline}`),
    "",
    "## Experience",
    ...experiences.map((e) => `- ${e.title}, ${e.company} (${e.period})`),
    "",
    "## Skills",
    ...skillGroups.map(([category, names]) => `- ${category}: ${names.join(", ")}`),
    "",
    "## Contact",
    `- Site: ${SITE_URL}`,
    `- Email: ${PERSON.email}`,
    `- LinkedIn: ${PERSON.linkedin}`,
    `- GitHub: ${PERSON.github}`,
  ];
  return lines.join("\n") + "\n";
}
