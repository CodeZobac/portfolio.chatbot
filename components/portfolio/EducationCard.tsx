import { Education } from '@/lib/types';

interface EducationCardProps {
  data: {
    education: Education;
  };
}

export default function EducationCard({ data }: EducationCardProps) {
  const { education } = data;

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <h3 className="mb-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
        Education
      </h3>
      <div className="space-y-6">
        <div className="relative pl-6 border-l-2 border-indigo-500/30">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-indigo-500 bg-white dark:bg-zinc-900" />

          <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {education.degree}
          </h4>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {education.institution}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
            {education.location} • Graduated {education.graduationYear}
          </p>
          <span className="mt-3 inline-block rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-500/10">
            {education.level}
          </span>
        </div>

        {education.certifications && education.certifications.length > 0 && (
          <div className="pt-4 border-t border-zinc-200/10 dark:border-zinc-700/30">
            <h5 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Certifications
            </h5>
            <ul className="space-y-2">
              {education.certifications.map((cert, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <svg className="mr-2 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
