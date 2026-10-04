import type { PrepareStepFunction } from "ai";
import { tools } from "./tools";
import { SYSTEM_PROMPT } from "./system-prompt";
import type { ToolIntent } from "./tool-intent";

/** Request-scoped definitions prevent unselected tools from executing. */
export function createToolPolicy(intent: ToolIntent) {
  const scopedTools = {
    ...tools,
    showProjects: {
      ...tools.showProjects,
      execute: (input: Parameters<NonNullable<typeof tools.showProjects.execute>>[0], options: Parameters<NonNullable<typeof tools.showProjects.execute>>[1]) =>
        tools.showProjects.execute!({
          ...input,
          ...(intent.projectIds ? { projectIds: intent.projectIds, category: "all" as const, featured: undefined } : {}),
        }, options),
    },
    showSkills: {
      ...tools.showSkills,
      execute: (input: Parameters<NonNullable<typeof tools.showSkills.execute>>[0], options: Parameters<NonNullable<typeof tools.showSkills.execute>>[1]) =>
        tools.showSkills.execute!({
          ...input,
          ...(intent.skillIds ? { skillIds: intent.skillIds, category: "all" as const } : {}),
        }, options),
    },
  };
  const selectedTools = Object.fromEntries(intent.selectedTools.map(name => [name, scopedTools[name]])) as Partial<typeof scopedTools>;
  const prepareStep: PrepareStepFunction<typeof selectedTools> = ({ steps }) => {
    const attempted = new Set(steps.flatMap(step => step.toolCalls.flatMap(call => call ? [call.toolName] : [])));
    const remaining = intent.selectedTools.filter(name => !attempted.has(name));
    // Retire attempted calls too: malformed calls must not cause repeated cards or loops.
    return {
      activeTools: remaining,
      // Manifest can route to thinking models that reject required/named choices.
      // The scoped tool map and activeTools enforce the allowed set independently.
      toolChoice: remaining.length === 0 ? "none" : "auto",
      system: `${SYSTEM_PROMPT}\n\n# CURRENT TURN TOOL SELECTION\n${remaining.length
        ? `The user requested these components. Call each remaining tool before your final answer: ${remaining.join(", ")}.`
        : "No tools remain for this turn. Answer conversationally without calling tools."}\n${intent.projectIds
        ? `The server selected project IDs: ${intent.projectIds.join(", ")}. Do not broaden these filters.` : ""}\n${intent.skillIds
        ? `The server selected skill IDs: ${intent.skillIds.join(", ")}. Do not broaden these filters.` : ""}`,
    };
  };
  return { tools: selectedTools, prepareStep, maxSteps: intent.selectedTools.length + 1 };
}
