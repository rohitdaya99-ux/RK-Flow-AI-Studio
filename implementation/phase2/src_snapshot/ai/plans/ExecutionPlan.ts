export interface ExecutionStep {
  command: string;
  params?: Record<string, any>;
}

export interface ExecutionPlan {
  goal: string;
  steps: ExecutionStep[];
}
