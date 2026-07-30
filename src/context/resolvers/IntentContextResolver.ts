import { ProjectContext } from "../types/ContextTypes";
import { CommandIntent } from "../../commands";

export class IntentContextResolver {
  resolve(intent: CommandIntent, context: ProjectContext): ProjectContext {
    return {
      ...context,
      user: {
        ...context.user,
        prompt: `[${intent}] ${context.user.prompt}`
      }
    };
  }
}
