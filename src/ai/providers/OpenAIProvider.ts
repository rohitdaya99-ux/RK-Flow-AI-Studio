import { BaseProvider } from "./BaseProvider";

export class OpenAIProvider extends BaseProvider {
  readonly id = "openai";
  readonly name = "OpenAI";

  async initialize(): Promise<void> {}

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async chat(prompt: string): Promise<string> {
    return prompt;
  }
}

export default OpenAIProvider;
