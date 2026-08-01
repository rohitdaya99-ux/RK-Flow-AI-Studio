import { ExecutionPlan } from "./ExecutionPlan";

export const WeddingPlans = {

  reel(): ExecutionPlan {
    return {
      goal: "Wedding Reel",
      steps: [
        { command: "read project" },
        { command: "read timeline" },
        { command: "read selection" },
        { command: "trim selected clips" },
        { command: "add transitions" },
        { command: "sync music" },
        { command: "export" }
      ]
    };
  },

  teaser(): ExecutionPlan {
    return {
      goal: "Wedding Teaser",
      steps: [
        { command: "read project" },
        { command: "read timeline" },
        { command: "trim selected clips" },
        { command: "add transitions" },
        { command: "export" }
      ]
    };
  },

  highlight(): ExecutionPlan {
    return {
      goal: "Wedding Highlight",
      steps: [
        { command: "read project" },
        { command: "read timeline" },
        { command: "sync music" },
        { command: "export" }
      ]
    };
  }

};
