
import { AIDirectorAsset, AIDirectorContext } from "./types";

export interface AIDirectorReasoningResult {
  selectedSong: AIDirectorAsset | null;
  heroShots: AIDirectorAsset[];
}

export class ReasoningEngine {
  run(context: AIDirectorContext): AIDirectorReasoningResult {
    console.log("Reasoning: Picking a song and selecting hero shots...");

    const { userPreferences, availableAssets } = context;

    // Simulate song selection
    const availableSongs = availableAssets.filter((asset) => asset.type === "audio");
    let selectedSong = null;
    if (availableSongs.length > 0) {
      // Simple logic: pick the first song that matches the mood, or the first available
      selectedSong = availableSongs.find((song) => song.tags?.includes(userPreferences.mood)) || availableSongs[0];
    }

    // Simulate hero shot selection
    const availableVideoClips = availableAssets.filter((asset) => asset.type === "video");
    const heroShots: AIDirectorAsset[] = [];
    if (availableVideoClips.length > 0) {
      // Simple logic: pick clips that match style/mood, or just a few prominent ones
      const relevantTags = [userPreferences.style, userPreferences.mood].filter(Boolean);
      availableVideoClips.forEach((clip) => {
        if (relevantTags.some((tag) => clip.tags?.includes(tag))) {
          heroShots.push(clip);
        }
      });
      // If no hero shots found with tags, just pick a couple
      if (heroShots.length === 0 && availableVideoClips.length > 0) {
        heroShots.push(availableVideoClips[0]);
        if (availableVideoClips.length > 1) {
          heroShots.push(availableVideoClips[1]);
        }
      }
    }

    const reasoningResult = {
      selectedSong: selectedSong,
      heroShots: heroShots,
    };

    return reasoningResult;
  }
}
