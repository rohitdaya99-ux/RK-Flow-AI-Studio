import { BaseProvider } from "./BaseProvider";

export class GrokProvider extends BaseProvider {
  readonly name = "grok";
  async chat(prompt: string) {
    return prompt;
  }
}
