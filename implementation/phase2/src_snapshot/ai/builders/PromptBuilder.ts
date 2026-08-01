import { ProjectContext } from "../../context";
import { SYSTEM_PROMPT } from "../prompts/SystemPrompt";

export class PromptBuilder {
  build(userPrompt: string, context: ProjectContext): string {
    return `
${SYSTEM_PROMPT}

User Prompt:
${userPrompt}

Context:
${JSON.stringify(context, null, 2)}
`;
  }
}
