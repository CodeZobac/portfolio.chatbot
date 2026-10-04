import { notFound } from "next/navigation";
import PortfolioChat from "@/components/PortfolioChat";

const prompts = {
  cv: "Download my CV ☀️",
  "show-cv": "Show my CV 🌀",
  "showcase-fleetflow": "Show me the fleetflow project 🚗💨",
  "showcase-etic": "Show me the ETIC project 🩵",
  showcase: "Show me your projects 🐚",
  projects: "Show me your projects 🐚",
} as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(prompts).map((slug) => ({ slug }));
}

export default async function ChatShortcut({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(prompts, slug)) notFound();

  return (
    <PortfolioChat
      key={slug}
      initialPrompt={prompts[slug as keyof typeof prompts]}
      showcasedProjectId={
        slug === "showcase-fleetflow"
          ? "fleetflow"
          : slug === "showcase-etic"
            ? "etic-resource-hub"
            : undefined
      }
    />
  );
}
