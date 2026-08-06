import { Skill } from '@/lib/types';
import SkillsBento from './SkillsBento';

interface SkillsCardProps {
  data: {
    skills: Skill[];
    category?: string;
  };
}

export default function SkillsCard({ data }: SkillsCardProps) {
  const { skills, category } = data;

  const categoryLabels: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    infrastructure: 'Infrastructure',
    'ai-data': 'AI & Data',
    'soft-skills': 'Soft Skills',
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between px-2">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
          Skills
        </h3>
        {category && category !== 'all' && (
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 border border-amber-500/20">
            {categoryLabels[category]}
          </span>
        )}
      </div>
      <SkillsBento skills={skills} category={category} />
    </div>
  );
}
