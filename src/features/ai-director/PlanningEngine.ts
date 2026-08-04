
import { AIDirectorContext } from "./types";
import { AIDirectorReasoningResult } from "./ReasoningEngine";

export interface AIDirectorStorySegment {
  type: string;
  duration: number;
  content?: string;
  segment?: string;
  clip?: unknown;
}

export interface AIDirectorPlanningResult {
  overallLength: string;
  selectedSong: AIDirectorReasoningResult["selectedSong"];
  storyStructure: AIDirectorStorySegment[];
  projectResolution: string;
}

export class PlanningEngine {
  run({
    context,
    reasoningResult
  }: {
    context: AIDirectorContext;
    reasoningResult: AIDirectorReasoningResult;
  }): AIDirectorPlanningResult {
    console.log("Planning: Building story structure from Wedding AI segments...");

    const { project, userPreferences } = context;
    const { selectedSong, heroShots } = reasoningResult;

    const storySegments: AIDirectorStorySegment[] = [];

    // Simple story structure: Intro, Ceremony, Reception, Outro
    storySegments.push({ type: "intro", duration: 10, content: "Opening montage" });

    // Incorporate hero shots into ceremony/reception
    heroShots.forEach((shot: any, index: number) => {
      storySegments.push({
        type: "hero_shot",
        segment: index % 2 === 0 ? "ceremony" : "reception",
        clip: shot,
        duration: 5, // Placeholder duration
      });
    });

    storySegments.push({ type: "montage", duration: 30, content: "General wedding moments" });
    storySegments.push({ type: "outro", duration: 15, content: "Closing credits/highlights" });

    const planningResult = {
      overallLength: userPreferences.length, // Desired length from context
      selectedSong: selectedSong,
      storyStructure: storySegments,
      projectResolution: project.resolution,
    };

    return planningResult;
  }
}
