import { SYSTEM_PROMPT } from "../prompts/SystemPrompt";

export class PromptBuilder {
  static build(userPrompt: string): string {
    return `${SYSTEM_PROMPT}

User:
${userPrompt}`;
  }
}
