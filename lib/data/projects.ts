import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "fleetflow",
    name: "FleetFlow: AI-Powered Autonomous Fleet Management Platform",
    tagline: "AI Solutions Architect: LLMOps & Agentic Systems",
    description:
      'Engineered the transition of FleetFlow from simple task-driven assistants to fully autonomous, RAG-powered agents. Implemented a multi-layer observability architecture using Langfuse and LiteLLM, utilizing an "LLM-as-a-Judge" framework to reduce API costs while increasing output precision. Developed a predictive "Fuel Intelligence Layer" for anomaly and fraud detection via advanced algorithmic modeling. Additionally, engineered an AI Automated Testing pipeline to mitigate model hallucinations, ensuring a self-correcting, reliable production environment.',
    problem:
      "FleetFlow needed to evolve from simple task-driven assistants into fully autonomous, RAG-powered agents while controlling LLM cost and increasing production reliability.",
    solution:
      "Implemented a multi-layer observability architecture with Langfuse and LiteLLM, introduced an LLM-as-a-Judge framework for cost and precision, built a predictive Fuel Intelligence Layer for anomaly and fraud detection, and engineered AI automated testing to mitigate hallucinations.",
    role: "AI Solutions Architect: LLMOps & Agentic Systems",
    keyDecisions: [
      "MLOPS",
      "LANGFUSE",
      "AI AGENT DEVELOPMENT",
      "PREDICTIVE ANALYTICS",
      "AI IMPLEMENTATION",
    ],
    techStack: [
      "MLOPS",
      "LANGFUSE",
      "AI AGENT DEVELOPMENT",
      "PREDICTIVE ANALYTICS",
      "AI IMPLEMENTATION",
    ],
    category: "ai",
    featured: true,
    image: "/fleetflow.png",
    youtubeId: "tMYyik-6KR4",
    links: {},
  },
  {
    id: "in-sintonia",
    name: "IN Sintonia: Agentic Ayurvedic Nutrition Platform",
    tagline: "Full-Stack AI Solutions Architect",
    description:
      'Engineered an agentic real-time platform to align dietary interventions with Ayurvedic principles. Implemented a highly efficient Mixture-of-Experts (MoE) architecture using hierarchical prompts and a "root-level" verification layer to eliminate semantic drift. Architected a high-performance Rust backend leveraging ZeroClaw for AI orchestration, utilizing Axum and Utopia for high-throughput APIs. Integrated WebSockets to facilitate seamless, real-time nutritional guidance and continuous data streams via a modern Next.js/Tailwind frontend.',
    problem:
      "Nutritional guidance workflows needed real-time, agentic execution aligned with Ayurvedic principles while preventing semantic drift across model outputs.",
    solution:
      "Implemented a Mixture-of-Experts architecture with hierarchical prompts and a root-level verification layer, architected a high-performance Rust backend with Axum/ZeroClaw/Utopia, and integrated WebSockets plus a Next.js/Tailwind frontend for real-time guidance.",
    role: "Full-Stack AI Solutions Architect",
    keyDecisions: [
      "AI MODEL INTEGRATION",
      "AI AGENT DEVELOPMENT",
      "RUST",
      "LANGCHAIN",
      "AI COMPLIANCE",
    ],
    techStack: [
      "AI MODEL INTEGRATION",
      "AI AGENT DEVELOPMENT",
      "RUST",
      "LANGCHAIN",
      "AI COMPLIANCE",
    ],
    category: "ai",
    featured: true,
    image: "/insintonia.png",
    youtubeId: "Qgus1Lfk0lg",
    links: {},
  },
  {
    id: "etic-resource-hub",
    name: "ETIC_Algarve Resource Hub: Unified Institutional Management System",
    tagline: "Solutions Architect & Lead Engineer",
    description:
      "Engineered a high-performance ecosystem to unify fragmented institutional resources. The architecture features advanced search with intelligent autocomplete and secure identity management via Supabase/Google OAuth (RBAC). To ensure operational integrity, I implemented automated communication via Resend API and validated system stability through k6 load testing (50+ concurrent users). Deployment is fully automated using Terraform, Docker Compose, and a Makefile-based CI/CD pipeline with Nginx SSL termination.",
    problem:
      "Institutional resources were fragmented and operations required a secure, scalable architecture with validated reliability under real usage load.",
    solution:
      "Built a unified high-performance platform with intelligent search and Supabase/Google OAuth RBAC, automated communication via Resend API, validated stability with k6 load testing, and automated deployment through Terraform, Docker Compose, Makefile CI/CD, and Nginx SSL termination.",
    role: "Solutions Architect & Lead Engineer",
    keyDecisions: [
      "CI/CD",
      "PERFORMANCE TESTING",
      "LOAD TESTING",
      "TERRAFORM",
      "DOCKER",
    ],
    techStack: [
      "CI/CD",
      "PERFORMANCE TESTING",
      "LOAD TESTING",
      "TERRAFORM",
      "DOCKER",
    ],
    category: "web",
    featured: true,
    image: "/etic.png",
    youtubeId: "Qhf_GBtLPK0",
    links: {},
  },
  {
    id: "cybercompass",
    name: "CyberCompass: Agentic EdTech Simulations",
    tagline: "Full-Stack AI Solutions Architect",
    description:
      "Engineered CyberCompass, an AI-powered cyber-ethics education platform delivering adaptive training across misinformation, deepfake detection, cyberbullying, and online identity safety. Architected a distributed Rust backend using Axum, SQLx, PostgreSQL, JWT authentication, and Utoipa, with dedicated database and AI orchestration services. Implemented agentic, real-time simulations through WebSockets, pluggable LLM providers, structured prompting, safety classification, deterministic scoring, and multi-layer Langfuse observability. Built a modern, multilingual Next.js 15 and React 19 frontend with TypeScript, Tailwind CSS, React Query, and NextAuth, supported by persistent progress tracking, unified learning analytics, achievements, and privacy-conscious profile sharing.",
    problem:
      "Cyber-ethics education needed adaptive, real-time training across misinformation, deepfake detection, cyberbullying, and online identity safety — with AI simulations that stay safe, observable, and deterministic enough to score fairly.",
    solution:
      "Architected a distributed Rust backend (Axum, SQLx, PostgreSQL, JWT, Utoipa) with dedicated database and AI orchestration services, delivering agentic real-time simulations over WebSockets with pluggable LLM providers, structured prompting, safety classification, deterministic scoring, and multi-layer Langfuse observability — fronted by a multilingual Next.js 15 / React 19 experience with persistent progress tracking and privacy-conscious profile sharing.",
    role: "Full-Stack AI Solutions Architect",
    keyDecisions: [
      "RUST",
      "AGENTIC AI & LLM ORCHESTRATION",
      "PROMPT ENGINEERING & AI SAFETY",
      "WEBSOCKETS & REAL-TIME",
      "LANGFUSE OBSERVABILITY",
    ],
    techStack: [
      "RUST",
      "AGENTIC AI & LLM ORCHESTRATION",
      "PROMPT ENGINEERING & AI SAFETY",
      "WEBSOCKETS & REAL-TIME",
      "LANGFUSE OBSERVABILITY",
    ],
    category: "ai",
    featured: true,
    image: "https://img.youtube.com/vi/BpA0IFLWH-c/maxresdefault.jpg",
    youtubeId: "BpA0IFLWH-c",
    links: {},
  },
];
