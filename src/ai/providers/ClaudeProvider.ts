import { BaseProvider } from "./BaseProvider";

export class ClaudeProvider extends BaseProvider {
  readonly id = "claude";
  readonly name = "Claude";

  async initialize(): Promise<void> {}

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async chat(prompt: string): Promise<string> {
    return prompt;
  }
}

export default ClaudeProvider;
