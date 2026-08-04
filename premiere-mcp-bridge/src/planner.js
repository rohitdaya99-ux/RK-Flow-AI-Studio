import { parsePrompt } from './prompt-parser.js';
import { getWeddingPlan } from './wedding-logic.js';

export function createPlanner() {
  return {
    plan(prompt, context = {}) {
      const parsed = parsePrompt(prompt);
      const wedding = getWeddingPlan(parsed, context);

      const toolByEvent = {
        haldi: "reel.autoSfx",
        mehndi: "reel.autoSfx",
        sangeet: "reel.matchReference",
        baraat: "reel.matchReference",
        pheras: "project.inspect",
        vidaai: "reel.applyReferenceEnergy",
        reception: "reel.matchReference",
        reel: "reel.matchReference",
        generic: "project.inspect"
      };

      const tool = toolByEvent[parsed.event] || "project.inspect";

      return {
        tool,
        args: {
          prompt,
          parsed,
          wedding,
          context
        },
        plan: {
          event: parsed.event,
          tone: parsed.tone,
          faceMode: parsed.faceMode,
          referenceMode: parsed.referenceMode,
          exportProfile: parsed.event === "reel" ? "vertical_reel" : "wedding_master",
          useSfx: true,
          useFaceBin: parsed.faceMode === "face-bin",
          steps: [
            "analyze prompt",
            "choose event preset",
            "prepare sequence",
            "apply cuts and markers",
            "apply effects and SFX",
            "export result"
          ]
        }
      };
    }
  };
}
