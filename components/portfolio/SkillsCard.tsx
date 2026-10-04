import { PresentedSkill } from "@/lib/types";
import SkillsBento from "./SkillsBento";

interface SkillsCardProps {
  data: {
    skills: PresentedSkill[];
    category?: string;
  };
}

export default function SkillsCard({ data }: SkillsCardProps) {
  return <SkillsBento skills={data.skills} category={data.category} />;
}
