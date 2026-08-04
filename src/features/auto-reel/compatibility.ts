import type { ReelPlan as PromptReelPlan } from "../prompt-reel/types";
import type { ReelPlan } from "./models";

// The current AutoEditAssembler consumes Prompt Reel's plan shape. Keep conversion
// explicit until Phase 2 moves the active planner to the new domain model.
export function toPromptReelPlan(plan: ReelPlan): PromptReelPlan {
  return {
    title: plan.title,
    templateName: "Auto Reel",
    intentSummary: plan.intentSummary,
    targetDurationSeconds: plan.targetDurationSeconds,
    totalDurationSeconds: plan.totalDurationSeconds,
    selectionMode: "sequence",
    resolutionPath: "memory",
    clips: plan.segments.map((segment) => ({
      clipId: segment.clipId,
      clipName: segment.clipId,
      start: segment.sourceInSeconds,
      end: segment.sourceOutSeconds,
      sourceDuration: segment.sourceOutSeconds - segment.sourceInSeconds,
      durationSeconds: segment.durationSeconds,
      track: 0,
      mediaType: "video",
      projectItemId: segment.projectItemId,
      shotType: "planned",
      emotionWeight: 0,
      musicEnergyWeight: 0,
      shotWeight: 0,
      selectionScore: segment.score,
      reason: segment.reason,
      promptTags: []
    })),
    notes: plan.warnings
  };
}
