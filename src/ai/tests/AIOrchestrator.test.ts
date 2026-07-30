import { AIOrchestrator } from "../orchestrator/AIOrchestrator";

(async () => {
  const ai = new AIOrchestrator();
  console.log(await ai.execute("Create cinematic wedding reel"));
})();
