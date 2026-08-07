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

  const isFiltered = Boolean(category && category !== "all");

  return (
    <div className="w-full">
      <header className="mb-5 px-2">
        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
            Field Manual
          </span>
          <span
            aria-hidden="true"
            className="h-px min-w-4 flex-1 bg-[var(--color-rule-strong)]"
          />
          {isFiltered && (
            <span className="whitespace-nowrap rounded-full border border-[var(--color-accent-strong)] bg-[var(--color-paper-2)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-accent-strong)]">
              {categoryLabels[category as string]}
            </span>
          )}
        </div>
        <div className="mt-1 flex min-w-0 flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="min-w-0 text-2xl font-extrabold tracking-tight text-[var(--color-ink)] sm:text-3xl">
            Skills
          </h3>
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-neutral)]">
            Capabilities · By section
          </span>
        </div>
        <div
          aria-hidden="true"
          className="mt-2 border-b-2 border-[var(--color-ink)]"
        />
        <div
          aria-hidden="true"
          className="mt-[3px] border-b border-[var(--color-rule)]"
        />
      </header>
      <SkillsBento skills={skills} category={category} />
    </div>
  );
}
