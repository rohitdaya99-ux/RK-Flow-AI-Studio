import { AutoReelJob, RankedClipCandidate } from "./models";
import { 
  StoryPlan, 
  NarrativeSection, 
  StorySegment, 
  ClipPlacement,
  StoryMode,
  NarrativeSectionType,
  NarrativeSectionTiming,
  DurationEstimate
} from "./storyModels";

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
}

export function buildStory(job: AutoReelJob, mode: StoryMode): AutoReelJob {
    const rankedClips = job.scoring?.rankedClips || [];
    
    const plan: StoryPlan = {
        id: generateId(),
        mode,
        sequence: {
            id: generateId(),
            sections: []
        },
        confidence: 0,
        createdAt: new Date().toISOString()
    };

    const sectionsToBuild: { type: NarrativeSectionType, timing: NarrativeSectionTiming }[] = [
        { type: "Opening", timing: "Beginning" },
        { type: "Venue", timing: "Beginning" },
        { type: "Bride Prep", timing: "Build-up" },
        { type: "Groom Prep", timing: "Build-up" },
        { type: "Bride Entry", timing: "Peak" },
        { type: "Groom Entry", timing: "Peak" },
        { type: "Varmala", timing: "Peak" },
        { type: "Pheras", timing: "Peak" },
        { type: "Emotional Moments", timing: "Emotional" },
        { type: "Ending", timing: "Ending" }
    ];

    const usedClipIds = new Set<string>();
    const usedAngles = new Set<string>();
    // const usedFaces = new Set<string>();

    let totalConfidence = 0;
    let placedCount = 0;
    let rejectedCount = 0;

    for (const sectionDef of sectionsToBuild) {
        const section: NarrativeSection = {
            id: generateId(),
            type: sectionDef.type,
            timing: sectionDef.timing,
            segments: []
        };

        const segment: StorySegment = {
            id: generateId(),
            clips: []
        };

        // Filter clips that match this section's event (WeddingEvidence)
        const relevantClips = rankedClips.filter(rc => {
            if (usedClipIds.has(rc.clipId)) return false;
            
            const eventSignal = job.weddingEventSignals?.find(ws => ws.clipId === rc.clipId);
            const primaryEvent = eventSignal?.primaryEvent;
            
            // Map narrative section to expected wedding event
            if (sectionDef.type === "Opening" || sectionDef.type === "Venue") return primaryEvent === "decor" || primaryEvent === "drone" || !primaryEvent;
            if (sectionDef.type === "Bride Prep") return primaryEvent === "jewellery" || primaryEvent === "family";
            if (sectionDef.type === "Groom Prep") return primaryEvent === "family";
            if (sectionDef.type === "Bride Entry") return primaryEvent === "bride-entry";
            if (sectionDef.type === "Groom Entry") return primaryEvent === "groom-entry";
            if (sectionDef.type === "Varmala") return primaryEvent === "varmala";
            if (sectionDef.type === "Pheras") return primaryEvent === "pheras";
            if (sectionDef.type === "Emotional Moments") return primaryEvent === "family" || primaryEvent === "couple-portrait";
            if (sectionDef.type === "Ending") return primaryEvent === "dance" || primaryEvent === "cake" || primaryEvent === "reception";
            
            return false; // strict mapping
        });

        const sortedCandidates = relevantClips.sort((a, b) => b.score - a.score);
        const clipsForSegment = sortedCandidates.slice(0, 4);

        for (const candidate of clipsForSegment) {
            const vision = job.vision?.clips?.find(v => v.clipId === candidate.clipId);
            const cameraAngle = vision?.frames?.[0]?.sceneEstimate?.shotType || "unknown";

            // Avoid jump cuts & repeated angles
            if (usedAngles.has(cameraAngle) && cameraAngle !== "unknown") {
                rejectedCount++;
                continue;
            }

            usedClipIds.add(candidate.clipId);
            usedAngles.add(cameraAngle);

            const placement: ClipPlacement = {
                id: generateId(),
                clipId: candidate.clipId,
                reason: `Relevance: ${section.type}, Quality: ${candidate.score.toFixed(1)}, Angle: ${cameraAngle}`,
                confidence: candidate.breakdown.confidence || 0.8,
                storyImportance: candidate.score,
                durationEstimate: estimateDuration(candidate, sectionDef.timing),
                state: "active"
            };

            segment.clips.push(placement);
            totalConfidence += placement.confidence;
            placedCount++;
        }

        if (segment.clips.length > 0) {
            section.segments.push(segment);
            plan.sequence.sections.push(section);
        }
        
        usedAngles.clear(); // Reset for next section
    }

    if (placedCount > 0) {
        plan.confidence = totalConfidence / placedCount;
    }

    const version = {
        id: generateId(),
        plan,
        createdAt: new Date().toISOString(),
        reason: "Initial Story Generation"
    };

    const newJob = {
        ...job,
        storyPlan: plan,
        storyHistory: {
            currentVersionId: version.id,
            versions: [version]
        }
    };

    console.log(`[StoryBuilder] Mode: ${mode}`);
    console.log(`[StoryBuilder] Selected Clips: ${placedCount}`);
    console.log(`[StoryBuilder] Rejected Clips: ${rejectedCount} (Duplicate/Jump Cut Avoidance)`);
    console.log(`[StoryBuilder] Overall Confidence: ${plan.confidence.toFixed(2)}`);

    return newJob;
}

function estimateDuration(candidate: RankedClipCandidate, timing: NarrativeSectionTiming): DurationEstimate {
    // Peak / Emotional moments tend to get longer duration if quality is high
    if (timing === "Peak" || timing === "Emotional") {
        if (candidate.score > 75) return "long";
        return "medium";
    }
    
    // Build-up is usually faster
    if (timing === "Build-up") {
        if (candidate.score < 50) return "short";
        return "medium";
    }

    if (candidate.score > 80) return "long";
    if (candidate.score > 50) return "medium";
    return "short";
}
