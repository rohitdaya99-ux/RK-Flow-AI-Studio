import { ProjectContext } from "../types/ContextTypes";
import { ContextStrategy } from "../strategies/ContextStrategy";

export class ContextComposer {
  constructor(private readonly strategies: ContextStrategy[] = []) {}

  compose(context: ProjectContext): ProjectContext {
    return this.strategies.reduce(
      (current, strategy) => strategy.apply(current),
      context
    );
  }
}
