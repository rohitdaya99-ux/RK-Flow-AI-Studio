export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class ConversationMemory {
  private messages: ChatMessage[] = [];

  addUser(content: string) {
    this.messages.push({ role: "user", content });
  }

  addAssistant(content: string) {
    this.messages.push({ role: "assistant", content });
  }

  clear() {
    this.messages = [];
  }

  getHistory(): ChatMessage[] {
    return [...this.messages];
  }

  buildPrompt(prompt: string): string {
    const history = this.messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    return history
      ? `${history}\n\nUSER: ${prompt}\nASSISTANT:`
      : prompt;
  }
}

export default ConversationMemory;
