import { BrainPlanStep } from "./types";

export class PlanningEngine {
  buildPlan(goal: string, reasoning: string): BrainPlanStep[] {
    return [
      {
        id: "capture-context",
        title: `Capture context for: ${goal}`,
        status: "ready"
      },
      {
        id: "review-reasoning",
        title: reasoning.slice(0, 120) || "Review Gemini reasoning",
        status: "ready"
      },
      {
        id: "confirm-execution",
        title: "Confirm before any timeline change",
        status: "pending"
      }
    ];
  }
}
