import { UserContext } from "../types/ContextTypes";

export class UserContextProvider {
  getContext(prompt: string): UserContext {
    return {
      prompt,
      language: "hinglish"
    };
  }
}
