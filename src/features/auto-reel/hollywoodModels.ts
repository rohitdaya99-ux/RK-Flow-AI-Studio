export type HollywoodMode = 'luxury_wedding' | 'cinematic' | 'documentary' | 'emotional' | 'family' | 'couple' | 'viral_reel' | 'highlight' | 'teaser' | 'baby_shower' | 'engagement' | 'pre_wedding' | 'social_short';

export interface DirectorCritique {
    strengths: string[];
    weaknesses: string[];
    risks: string[];
    repetitiveSections: string[];
    weakOpening: boolean;
    weakEnding: boolean;
    overEditing: boolean;
    underEditing: boolean;
    missingCoverage: string[];
    audioProblems: string[];
    excessiveEffects: string[];
    storyGaps: string[];
    suggestedRevision: string;
}

export interface DirectorRevisionPlan {
    requiresRevision: boolean;
    targetModules: string[];
    instructions: string[];
}

export interface FinalDirectionPlan {
    mode: HollywoodMode;
    critique: DirectorCritique;
    revisionPlan: DirectorRevisionPlan;
    approvalStatus: 'approved' | 'rejected' | 'needs_revision';
    provider: string;
    version: string;
}
