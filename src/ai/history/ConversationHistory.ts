export interface ConversationEntry {
  role: "user" | "assistant";
  content: string;
}

export class ConversationHistory {
  private entries: ConversationEntry[] = [];

  add(role: ConversationEntry["role"], content: string): void {
    this.entries.push({ role, content });
  }

  all(): ConversationEntry[] {
    return [...this.entries];
  }

  clear(): void {
    this.entries = [];
  }
}
