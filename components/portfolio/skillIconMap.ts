import {
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Zap,
  Bot,
  Terminal,
  Server,
  Workflow,
  Shield,
  Search,
  Layout,
  MessageSquare,
  Lightbulb,
  Brain,
  Rocket,
  ShieldCheck,
  LineChart,
  Heart,
  Eye,
  Compass,
  Sparkles,
  Activity,
  Wallet,
  ShieldAlert,
} from "lucide-react";

export const skillIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  // AI & Data
  "RAG Pipelines": Zap,
  CrewAI: Bot,
  Langfuse: Search,
  LiteLLM: Cpu,
  "LLM Observability": Shield,
  "AI Agent Development": Brain,
  "Predictive Analytics": LineChart,
  "Observability": Activity,
  "Cost Management": Wallet,
  "Prompt Engineering": ShieldAlert,

  // Backend
  Python: Code2,
  FastAPI: Zap,
  Django: Layout,
  Rust: Terminal,
  Axum: Server,
  PostgreSQL: Database,

  // Frontend
  "Next.js": Globe,
  TypeScript: Code2,
  "Tailwind CSS": Layout,
  React: Cpu,
  Vite: Zap,

  // Infrastructure
  Docker: Layers,
  Terraform: Workflow,
  "CI/CD": Rocket,
  Supabase: Database,
  Nginx: Server,

  // Soft Skills
  "Empathetic Thinking": Heart,
  "Out-of-the-box Perspective": Lightbulb,
  "Mental Visualization": Eye,
  "Present Attitude": Compass,
  "Nurturing Environments": Sparkles,
};
