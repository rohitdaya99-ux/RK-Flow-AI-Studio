import { AIPlanner } from "../planner/AIPlanner";
import { AIDiagnostics } from "../diagnostics/AIDiagnostics";

console.log(new AIPlanner().createPlan("Create Wedding Reel"));
console.log(new AIDiagnostics().report());
