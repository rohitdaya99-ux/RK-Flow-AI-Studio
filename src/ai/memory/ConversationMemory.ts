export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export class ConversationMemory {
  private messages: Message[] = [];

  add(role: Message["role"], content: string): void {
    this.messages.push({ role, content });
  }

  clear(): void {
    this.messages = [];
  }

  all(): Message[] {
    return [...this.messages];
  }

  last(count = 10): Message[] {
    return this.messages.slice(-count);
  }
}
