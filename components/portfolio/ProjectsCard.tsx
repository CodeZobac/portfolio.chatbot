import MagicBento from "./MagicBento";
import { Project } from "@/lib/types";

interface ProjectsCardProps {
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
}: ProjectsCardProps) {
  const { projects, category, featured } = data;

  return (
    <div className="w-full">
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
        projects={projects}
        onModalOpen={onModalOpen}
        onLensActiveChange={onLensActiveChange}
      />
    </div>
  );
}
