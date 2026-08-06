import { AutoReelJob } from "./models";
import { StoryPlan, NarrativeSectionTiming } from "./storyModels";
import { 
  DurationPlan, 
  ClipDurationDecision, 
  TimingProfile, 
  DurationReason 
} from "./durationModels";

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
}

function getBasePacingMultiplier(timing: NarrativeSectionTiming): number {
  switch (timing) {
    case "Beginning": return 1.5;
    case "Build-up": return 1.0;
    case "Peak": return 0.6;
    case "Emotional": return 1.8;
    case "Ending": return 1.5;
    default: return 1.0;
  }
}

function getSourceDuration(job: AutoReelJob, clipId: string): number {
  const descriptor = job.clips.find(c => c.id === clipId);
  if (descriptor && descriptor.durationSeconds) {
    return descriptor.durationSeconds;
  }
  return 5.0; // fallback if no metadata
}

export function buildDurationPlan(job: AutoReelJob): AutoReelJob {
    const storyPlan: StoryPlan = job.storyPlan;
    if (!storyPlan) {
        throw new Error("No StoryPlan found in AutoReelJob");
    }

    const profile: TimingProfile = {
        id: generateId(),
        mode: storyPlan.mode,
        baseDurationMin: 0.5,
        baseDurationMax: 10.0,
        pacingMultiplier: 1.0
    };

    const decisions: ClipDurationDecision[] = [];
    let totalEstimatedDuration = 0;

    for (const section of storyPlan.sequence.sections) {
        const sectionPacing = getBasePacingMultiplier(section.timing);

        for (const segment of section.segments) {
            for (const placement of segment.clips) {
                const clipId = placement.clipId;
                const sourceDuration = getSourceDuration(job, clipId);

                // Fetch existing analysis for this clip
                const rankedCandidate = job.scoring?.rankedClips?.find(c => c.clipId === clipId);
                const score = rankedCandidate?.score || 50;
                
                const vision = job.vision?.clips?.find(v => v.clipId === clipId);
                const shotType = vision?.frames?.[0]?.sceneEstimate?.shotType || "unknown";
                const droneLikelihood = vision?.frames?.[0]?.sceneEstimate?.droneLikelihood || 0;

                const emotion = job.emotion?.clips?.find(e => e.clipId === clipId);
                const mood = emotion?.moodEstimate?.dominant_mood;

                const eventSignal = job.weddingEventSignals?.find(ws => ws.clipId === clipId);
                const primaryEvent = eventSignal?.primaryEvent;

                // Base targets
                let targetDuration = 2.5 * sectionPacing * profile.pacingMultiplier;
                let minDuration = 0.5;
                let maxDuration = Math.min(profile.baseDurationMax, sourceDuration);
                let reason: DurationReason = "standard_cut";
                let detailedReasoning = `Standard cut based on ${section.timing} pacing.`;

                // Applied Heuristics in order of precedence
                
                // Low quality
                if (score < 40) {
                    targetDuration = minDuration;
                    reason = "low_quality_trim";
                    detailedReasoning = "Clipped short due to low quality score.";
                }
                // Drone Reveal
                else if (droneLikelihood > 0.8 || primaryEvent === "drone") {
                    targetDuration = 5.0;
                    reason = "drone_reveal";
                    detailedReasoning = "Long hold for cinematic drone reveal.";
                }
                // Emotion / Smiles
                else if (mood === "joyful" || mood === "emotional") {
                    targetDuration = 4.0;
                    reason = "emotion_hold";
                    detailedReasoning = `Extended hold for ${mood} emotion.`;
                }
                // Reaction shot / Close up
                else if (shotType === "close" && section.timing === "Peak") {
                    targetDuration = 1.0;
                    reason = "reaction_shot";
                    detailedReasoning = "Quick reaction shot during peak.";
                }
                // Fast Dance / Music Peak
                else if (primaryEvent === "dance" && section.timing === "Ending") {
                    targetDuration = 1.5;
                    reason = "music_rhythm";
                    detailedReasoning = "Fast paced rhythmic cut for dance.";
                }
                // Fast intro (if configured differently, but we default to slow intro usually)
                else if (section.timing === "Beginning" && placement.durationEstimate === "short") {
                   targetDuration = 1.0;
                   reason = "pacing_fast";
                   detailedReasoning = "Fast pacing in intro despite being beginning.";
                }

                // Final Bounds Check (Clamp)
                if (targetDuration > sourceDuration) {
                    targetDuration = sourceDuration;
                    reason = "source_limit";
                    detailedReasoning = "Clamped target duration to available source media.";
                }

                if (targetDuration < minDuration) {
                    targetDuration = minDuration;
                }

                if (targetDuration > maxDuration) {
                    targetDuration = maxDuration;
                }

                const decision: ClipDurationDecision = {
                    clipId,
                    targetDuration,
                    minimumDuration: minDuration,
                    maximumDuration: maxDuration,
                    preferredCutPoint: 0, // Simplified for phase 12
                    confidence: placement.confidence,
                    reason,
                    detailedReasoning
                };

                decisions.push(decision);
                totalEstimatedDuration += targetDuration;

                console.log(`[DurationEngine] Clip: ${clipId} | Section: ${section.type} | Duration: ${targetDuration.toFixed(2)}s | Reason: ${reason}`);
            }
        }
    }

    const durationPlan: DurationPlan = {
        id: generateId(),
        storyPlanId: storyPlan.id,
        decisions,
        profile,
        totalEstimatedDuration,
        createdAt: new Date().toISOString()
    };

    const version = {
        id: generateId(),
        plan: durationPlan,
        createdAt: new Date().toISOString(),
        reason: "Initial Duration Generation"
    };

    const newJob = {
        ...job,
        durationPlan,
        durationHistory: {
            currentVersionId: version.id,
            versions: [version]
        }
    };

    return newJob;
}
