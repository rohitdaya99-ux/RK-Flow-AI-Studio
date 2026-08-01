import { ProjectContext } from "../../context";
import { PromptBuilder } from "../builders/PromptBuilder";

export class AIContextBridge {
  private readonly builder = new PromptBuilder();

  buildPrompt(prompt: string, context: ProjectContext): string {
    return this.builder.build(prompt, context);
  }
}
