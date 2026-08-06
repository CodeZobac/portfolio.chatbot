import SkillsCard from "@/components/portfolio/SkillsCard";
import source from "@/content/portfolio-content.json";
import type { Skill } from "@/lib/types";

export default function SkillsPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] px-3 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <SkillsCard data={{ skills: source.skills as Skill[], category: "all" }} />
      </div>
    </main>
  );
}
