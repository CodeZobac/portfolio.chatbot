import { Education } from "@/lib/types";

interface EducationCardProps {
  data: {
    education: Education;
  };
}

export default function EducationCard({ data }: EducationCardProps) {
  const { education } = data;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
      <h3 className="mb-6 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-500">
        Education
      </h3>
      <div className="space-y-6">
        <div className="relative pl-6 border-l-2 border-amber-400/50">
          <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-amber-500 bg-white" />

          <h4 className="text-lg font-semibold text-stone-800">
            {education.degree}
          </h4>
          <p className="text-sm font-medium text-amber-600">
            {education.institution}
          </p>
          <p className="mt-1 text-xs text-stone-400 uppercase tracking-wider">
            {education.location} • Graduated {education.graduationYear}
          </p>
          <span className="mt-3 inline-block rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 border border-amber-500/20">
            {education.level}
          </span>
        </div>

        {education.certifications && education.certifications.length > 0 && (
          <div className="pt-4 border-t border-amber-200/50">
            <h5 className="mb-3 text-sm font-semibold text-stone-600">
              Certifications
            </h5>
            <ul className="space-y-2">
              {education.certifications.map((cert, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm text-stone-500"
                >
                  <svg
                    className="mr-2 h-4 w-4 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
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
