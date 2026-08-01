import { BaseProvider } from "./BaseProvider";

export class OpenAIProvider extends BaseProvider {
  readonly id = "openai";
  readonly name = "OpenAI";
}

export default OpenAIProvider;
