import { Skill } from '@/lib/types';

interface SkillsChartProps {
  data: {
    skills: Skill[];
    category?: string;
  };
}

export default function SkillsChart({ data }: SkillsChartProps) {
  const { skills, category } = data;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    infrastructure: 'Infrastructure',
    'ai-data': 'AI & Data',
    'soft-skills': 'Soft Skills',
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 sm:p-6 shadow-sm">
      <div className="mb-3 sm:mb-4 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-50">
          Skills
        </h3>
        {category && category !== 'all' && (
          <span className="rounded-full bg-blue-900 px-2 sm:px-3 py-1 text-xs font-medium text-blue-300">
            {categoryLabels[category]}
          </span>
        )}
      </div>
      <div className="space-y-4 sm:space-y-6">
        {Object.entries(groupedSkills).map(([cat, categorySkills]) => (
          <div key={cat}>
            <h4 className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium text-zinc-300">
              {categoryLabels[cat]}
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm text-zinc-50 truncate">
                      {skill.name}
                    </span>
                    <span className="text-xs text-zinc-500 flex-shrink-0">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="h-1.5 sm:h-2 overflow-hidden rounded-full bg-zinc-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 ease-out"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                  {skill.yearsOfExperience && (
                    <p className="mt-0.5 sm:mt-1 text-xs text-zinc-500">
                      {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} experience
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
