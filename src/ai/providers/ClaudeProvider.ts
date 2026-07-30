import { BaseProvider } from "./BaseProvider";

export class ClaudeProvider extends BaseProvider {
  readonly name = "claude";
  async chat(prompt: string) {
    return prompt;
  }
}
