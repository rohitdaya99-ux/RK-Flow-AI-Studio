import { BaseProvider } from "./BaseProvider";

export class GrokProvider extends BaseProvider {
  readonly id = "grok";
  readonly name = "Grok";

  async initialize(): Promise<void> {}

  async isAvailable(): Promise<boolean> {
    return true;
  }

  async chat(prompt: string): Promise<string> {
    return prompt;
  }
}

export default GrokProvider;
