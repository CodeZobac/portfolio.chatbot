import MagicBento from "./MagicBento";
import { Project } from "@/lib/types";

interface ProjectsCardProps {
  showcasedProjectId?: string;
  data: {
    projects: Project[];
    category?: string;
    featured?: boolean;
  };
  onModalOpen?: (isOpen: boolean) => void;
  onLensActiveChange?: (isActive: boolean) => void;
}

export default function ProjectsCard({
  data,
  onModalOpen,
  onLensActiveChange,
  showcasedProjectId,
}: ProjectsCardProps) {
  const { projects, category, featured } = data;
  const visibleProjects = showcasedProjectId
    ? projects.filter((project) => project.id === showcasedProjectId)
    : projects;
  if (visibleProjects.length === 0) return null;

  return (
    <div className={showcasedProjectId ? "ml-11 w-[80%] max-w-[calc(100%-2.75rem)]" : "w-full"}>
      <div className="mb-6 flex items-center justify-between px-2">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
          Projects
        </h3>
        {(category !== "all" || featured) && (
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600 border border-amber-500/20">
            {featured ? "Featured" : category}
          </span>
        )}
      </div>
      <MagicBento
        projects={visibleProjects}
        showcase={Boolean(showcasedProjectId)}
        onModalOpen={onModalOpen}
        onLensActiveChange={onLensActiveChange}
      />
    </div>
  );
}
