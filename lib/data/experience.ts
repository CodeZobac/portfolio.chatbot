import { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: "vivadrive",
    title: "AI Solutions Architect | LLMOps & Agentic Systems",
    company: "VivaDrive",
    period: "Feb 2026 – Present",
    location: "Remote / Warsaw, Poland",
    type: "tech",
    achievements: [
      'Engineered multi-layer observability architecture using Langfuse and LiteLLM, implementing an "LLM-as-a-Judge" framework to reduce API costs while increasing output precision via total request traceability.',
      'Developed the "Fuel Intelligence Layer" — transitioning architecture from static data processing to a predictive Data Warehouse model for automated anomaly and fraud detection.',
      "Engineered AI Automated Testing pipeline to mitigate model hallucinations, creating a self-correcting ecosystem where specialized models validate autonomous agent outputs.",
      "Transformed FleetFlow into a resilient, predictive architecture capable of managing complex logistics with minimal human intervention.",
    ],
    responsibilities: [
      "Scaling FleetFlow AI-powered fleet management from reactive assistants to fully autonomous RAG-driven agents",
      "LLMOps architecture design and cost optimization",
      "Multi-agent system development and observability",
      "AI testing pipeline engineering",
    ],
    technologies: [
      "RAG Pipelines",
      "Langfuse",
      "LiteLLM",
      "CrewAI",
      "Python",
      "FastAPI",
      "PostgreSQL",
    ],
  },
  {
    id: "etic-algarve",
    title: "Solutions Architect | Systemic Debt Recovery & MVP Deployment",
    company: "ETIC_Algarve",
    period: "Aug 2025 – Sep 2025",
    location: "Faro, Portugal",
    type: "tech",
    achievements: [
      "Conducted deep-dive architectural audit to identify root causes of systemic failure in a legacy resource management system, addressing structural decay rather than superficial fixes.",
      "Engineered a framework to pivot from high-maintenance refactoring toward a modern, scalable architecture for long-term maintainability.",
      "Developed a functional, high-fidelity prototype within 48 hours to validate technical viability and secure stakeholder buy-in.",
      "Delivered a production-ready MVP, transforming a failing legacy asset into a scalable, high-performance platform. Recognized by School Director as a professional-grade asset.",
    ],
    responsibilities: [
      "Architectural audit and root-cause analysis",
      "Strategic rebuild advocacy and stakeholder alignment",
      "Rapid prototyping and MVP delivery",
      "Infrastructure setup with Terraform, Docker Compose, Nginx SSL and Makefile CI/CD",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Terraform",
      "Docker",
      "Nginx",
      "k6",
      "Resend API",
    ],
  },
];
