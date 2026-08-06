import { Skill } from "@/lib/types";
import SkillsBento from "./SkillsBento";

interface SkillsCardProps {
  data: {
    skills: Skill[];
    category?: string;
  };
}

export default function SkillsCard({ data }: SkillsCardProps) {
  const { skills, category } = data;

  const categoryLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    infrastructure: "Infrastructure",
    "ai-data": "AI & Data",
    "soft-skills": "Soft Skills",
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-3 px-2">
        <h3 className="min-w-0 text-xl font-bold text-[var(--color-accent-strong)]">
          Skills
        </h3>
        {category && category !== "all" && (
          <span className="whitespace-nowrap rounded-full border border-[var(--color-rule)] bg-[var(--color-paper-2)] px-3 py-1 text-xs font-semibold text-[var(--color-ink-soft)]">
            {categoryLabels[category]}
          </span>
        )}
      </div>
      <SkillsBento skills={skills} category={category} />
    </div>
  );
}
