import { BaseProvider } from "./BaseProvider";

export class GeminiProvider extends BaseProvider {
  readonly id = "gemini";
  readonly name = "Gemini";

  async initialize(): Promise<void> {}

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async chat(prompt: string): Promise<string> {
    return prompt;
  }
}

export default GeminiProvider;
