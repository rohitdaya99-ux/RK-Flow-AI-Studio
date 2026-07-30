import GeminiStreamService from "../services/GeminiStreamService";

export class AIChat {
  private stream = new GeminiStreamService();

  async ask(
    prompt: string,
    onChunk: (text: string) => void
  ): Promise<string> {
    return this.stream.stream(prompt, onChunk);
  }
}

export default AIChat;
