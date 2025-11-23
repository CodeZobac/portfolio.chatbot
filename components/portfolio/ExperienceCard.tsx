import { Experience } from '@/lib/types';

interface ExperienceCardProps {
  data: {
    roles: Experience[];
    highlight?: string;
  };
}

export default function ExperienceCard({ data }: ExperienceCardProps) {
  const { roles, highlight } = data;

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 transition-all hover:bg-white/5">
      <h3 className="mb-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
        Experience
      </h3>
      <div className="space-y-8">
        {roles.map((role) => {
          const isHighlighted = highlight &&
            (role.title.toLowerCase().includes(highlight.toLowerCase()) ||
              role.company.toLowerCase().includes(highlight.toLowerCase()));

          return (
            <div
              key={role.id}
              className={`relative pl-6 border-l-2 transition-all ${isHighlighted
                  ? 'border-indigo-500'
                  : 'border-zinc-200/20 dark:border-zinc-700/50 hover:border-indigo-500/50'
                }`}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100 opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="mb-3">
                <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
                  {role.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">{role.company}</span>
                  <span>•</span>
                  <span>{role.location}</span>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
                  {role.period}
                </p>
              </div>

              {role.achievements.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {role.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500/50" />
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}

              {role.technologies && role.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-500/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
