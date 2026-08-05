import type { ReelPlan as PromptReelPlan } from "../prompt-reel/types";
import type { ReelPlan } from "./models";

// The current AutoEditAssembler consumes Prompt Reel's plan shape. Keep conversion
// explicit until Phase 2 moves the active planner to the new domain model.
export function toPromptReelPlan(plan: ReelPlan): PromptReelPlan {
  return {
    title: "Auto Reel Plan",
    templateName: "Auto Reel",
    intentSummary: "Auto Reel Generated Plan",
    targetDurationSeconds: plan.totalDuration,
    totalDurationSeconds: plan.totalDuration,
    selectionMode: "sequence",
    resolutionPath: "memory",
    clips: plan.beats.map((beat) => ({
      clipId: beat.clipId,
      clipName: beat.clipId,
      start: beat.startTime,
      end: beat.endTime,
      sourceDuration: beat.endTime - beat.startTime,
      durationSeconds: beat.endTime - beat.startTime,
      track: 0,
      mediaType: "video",
      projectItemId: beat.clipId,
      shotType: "planned",
      emotionWeight: 0,
      musicEnergyWeight: 0,
      shotWeight: 0,
      selectionScore: 100,
      reason: "Selected by Auto Reel",
      promptTags: []
    })),
    notes: []
  };
}
