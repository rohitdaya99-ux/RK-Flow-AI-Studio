import { BrainPlanStep } from "./types";

export class DecisionEngine {
  choose<T extends { score: number }>(options: T[]): T | null {
    if (options.length === 0) {
      return null;
    }

    return [...options].sort((left, right) => right.score - left.score)[0];
  }

  summarize(plan: BrainPlanStep[]) {
    return `${plan.filter((step) => step.status === "ready").length} steps ready, ${plan.filter((step) => step.status === "pending").length} pending confirmation.`;
  }
}
