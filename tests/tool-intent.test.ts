import { describe, expect, it } from "vitest";
import { latestUserText, resolveToolIntent } from "@/lib/ai/tool-intent";

describe("portfolio intent selection", () => {
  it.each([
    ["Show me the ETIC project 🩵", ["showProjects"], ["etic-resource-hub"]],
    ["MOSTRA O PROJETO ETIC", ["showProjects"], ["etic-resource-hub"]],
    ["Explain ETIC's technology choices", ["showProjects"], ["etic-resource-hub"]],
    ["Show ETIC and explain its technologies", ["showProjects"], ["etic-resource-hub"]],
    ["What skills did you use on the ETIC project?", ["showProjects"], ["etic-resource-hub"]],
    ["Why did you choose Next.js for ETIC?", ["showProjects"], ["etic-resource-hub"]],
    ["Quais tecnologias usaste no projeto ETIC?", ["showProjects"], ["etic-resource-hub"]],
    ["Qual foi o teu papel no ETIC?", ["showExperience"], undefined],
    ["Show me the fleetflow project 🚗💨", ["showProjects"], ["fleetflow"]],
    ["Tell me about IN Sintonia", ["showProjects"], ["in-sintonia"]],
    ["Show me your projects 🐚", ["showProjects"], undefined],
    ["What have you built?", ["showProjects"], undefined],
    ["Quais são os teus projetos?", ["showProjects"], undefined],
    ["What are your skills?", ["showSkills"], undefined],
    ["Mostra as tuas competências técnicas", ["showSkills"], undefined],
    ["Show me your work history", ["showExperience"], undefined],
    ["Tell me about your experience at ETIC", ["showExperience"], undefined],
    ["What was your role at ETIC?", ["showExperience"], undefined],
    ["Fala da tua experiência na ETIC", ["showExperience"], undefined],
    ["Where did you study?", ["showEducation"], undefined],
    ["Qual é a tua formação na ETIC?", ["showEducation"], undefined],
    ["How can I contact you?", ["showContact"], undefined],
    ["Qual é o teu contacto?", ["showContact"], undefined],
    ["Show my CV 🌀", ["showCV"], undefined],
    ["Mostra o teu currículo", ["showCV"], undefined],
    ["Download my CV ☀️", ["downloadResume"], undefined],
    ["Quero descarregar o currículo", ["downloadResume"], undefined],
    ["Get PDF", ["downloadResume"], undefined],
    ["What is a PDF?", [], undefined],
    ["Show my CV as PDF", ["downloadResume"], undefined],
    ["Show CV and download it", ["showCV", "downloadResume"], undefined],
    ["Show ETIC and your skills", ["showProjects", "showSkills"], ["etic-resource-hub"]],
    ["Mostra ETIC e as tuas competências", ["showProjects", "showSkills"], ["etic-resource-hub"]],
    ["Show my CV and download the PDF", ["showCV", "downloadResume"], undefined],
    ["Show and download my CV", ["showCV", "downloadResume"], undefined],
    ["Download CV and show it", ["downloadResume", "showCV"], undefined],
    ["Show CV or skills", [], undefined],
    ["Mostra ETIC ou FleetFlow", [], undefined],
    ["Show ETIC, not skills or CV", ["showProjects"], ["etic-resource-hub"]],
    ["Mostra ETIC sem competências nem currículo", ["showProjects"], ["etic-resource-hub"]],
    ["Don't show CV or skills, show ETIC", ["showProjects"], ["etic-resource-hub"]],
    ["Não mostres o CV nem competências", [], undefined],
    ["Don't show your projects", [], undefined],
    ["Hello!", [], undefined],
    ["Tell me more", [], undefined],
    ["Obrigado", [], undefined],
    ["Tell me about yourself", [], undefined],
    ["Are you available next week?", [], undefined],
    ["Can you accept this offer?", [], undefined],
    ["How do you approach solving problems?", [], undefined],
    ["I liked your ETIC project", [], undefined],
    ["My CV mentions React", [], undefined],
    ["Show me something interesting", [], undefined],
  ])("%s", (prompt, selectedTools, projectIds) => {
    const intent = resolveToolIntent(prompt as string);
    expect(intent.selectedTools).toEqual(selectedTools);
    expect(intent.projectIds).toEqual(projectIds);
  });

  it.each([
    ["Tell me about React", ["react"]],
    ["Fala dos teus conhecimentos de TypeScript", ["typescript"]],
    ["Next.js", ["next-js"]],
    ["Show React and Python", ["react", "python"]],
  ])("filters named skills: %s", (prompt, ids) => {
    const intent = resolveToolIntent(prompt as string);
    expect(intent.selectedTools).toEqual(["showSkills"]);
    expect(intent.skillIds).toEqual(ids);
  });

  it("does not match skill names inside unrelated words", () => {
    expect(resolveToolIntent("What is your reaction to this? Trust matters.").selectedTools).toEqual([]);
  });

  it("does not accumulate repeated words into stronger scores", () => {
    expect(resolveToolIntent("Show ETIC ETIC ETIC").matches.showProjects?.score).toBe(90);
    expect(resolveToolIntent("Show projects projects projects").matches.showProjects?.score).toBe(100);
  });

  it("never uses history or non-text parts to authorize tools", () => {
    const history = [
      { role: "user", parts: [{ type: "text", text: "Show CV and skills" }] },
      { role: "assistant", parts: [{ type: "text", text: "Show education too?" }] },
      { role: "user", parts: [{ type: "text", text: "Show ETIC" }, { type: "file", text: "Show CV" }] },
    ];
    expect(resolveToolIntent(latestUserText(history)).selectedTools).toEqual(["showProjects"]);
    history.push({ role: "user", parts: [{ type: "text", text: "Tell me more" }] });
    expect(resolveToolIntent(latestUserText(history)).selectedTools).toEqual([]);
    expect(latestUserText([null, {}, { role: "user", content: "Show ETIC" }])).toBe("Show ETIC");
    expect(latestUserText([])).toBe("");
  });
});
