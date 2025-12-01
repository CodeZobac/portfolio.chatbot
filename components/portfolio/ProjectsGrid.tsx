import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectsGridProps {
  data: {
    projects: Project[];
    category?: string;
    featured?: boolean;
  };
}

export default function ProjectsGrid({ data }: ProjectsGridProps) {
  const { projects, category, featured } = data;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 sm:p-6 shadow-sm">
      <div className="mb-3 sm:mb-4 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-zinc-50">
          Projects
        </h3>
        {(category !== 'all' || featured) && (
          <span className="rounded-full bg-blue-900 px-2 sm:px-3 py-1 text-xs font-medium text-blue-300">
            {featured ? 'Featured' : category}
          </span>
        )}
      </div>
      <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group rounded-lg border border-zinc-700 overflow-hidden transition-all hover:border-blue-500 hover:shadow-md"
          >
            {/* Project Image */}
            <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-zinc-900">
              <Image
                src={project.image}
                alt={`${project.name} - ${project.tagline}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
              />
            </div>
            
            {/* Project Content */}
            <div className="p-3 sm:p-4">
              <div className="mb-2">
                <h4 className="text-sm sm:text-base font-semibold text-zinc-50">
                  {project.name}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {project.tagline}
                </p>
              </div>
              <p className="mb-2 sm:mb-3 text-xs sm:text-sm text-zinc-300 line-clamp-3">
                {project.description}
              </p>
              
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                {project.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="rounded-full bg-zinc-700 px-2 py-0.5 text-xs text-zinc-300">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>
              
              {/* Project Links */}
              {project.links && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-700">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline active:text-blue-300 transition-colors min-h-[44px] flex items-center"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline active:text-blue-300 transition-colors min-h-[44px] flex items-center"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline active:text-blue-300 transition-colors min-h-[44px] flex items-center"
                    >
                      Demo →
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
