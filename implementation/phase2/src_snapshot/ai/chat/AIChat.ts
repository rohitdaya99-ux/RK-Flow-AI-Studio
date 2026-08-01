import GeminiStreamService from "../services/GeminiStreamService";
import ConversationMemory from "../memory/ConversationMemory";

export class AIChat {
  private stream = new GeminiStreamService();
  private memory = new ConversationMemory();

  async ask(
    prompt: string,
    onChunk: (text: string) => void
  ): Promise<string> {
    this.memory.addUser(prompt);

    const finalPrompt = this.memory.buildPrompt(prompt);

    const answer = await this.stream.stream(finalPrompt, onChunk);

    this.memory.addAssistant(answer);

    return answer;
  }

  clear() {
    this.memory.clear();
  }

  history() {
    return this.memory.getHistory();
  }
}

export default AIChat;
