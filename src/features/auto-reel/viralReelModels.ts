export type HookCategory = 'visual_reveal' | 'emotional_reaction' | 'dance_impact' | 'bride_entry' | 'groom_entry' | 'couple_portrait' | 'drone_reveal' | 'family_reaction' | 'ceremony_peak' | 'before_after_contrast' | 'title_hook';

export interface ViralReelReport {
    reelStory: string;
    duration: number;
    hook: HookCategory;
    beatMap: number[];
    clipOrder: string[];
    titlePlan: Record<string, any>;
    transitionPlan: Record<string, any>;
    loopPlan: Record<string, any>;
    thumbnailPlan: string[];
    captionSuggestions: string[];
    hashtagSuggestions: string[];
    confidence: number;
    limitations: string[];
    provider: string;
    version: string;
}
