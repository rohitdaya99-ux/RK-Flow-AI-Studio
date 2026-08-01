export interface AITask {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
}
