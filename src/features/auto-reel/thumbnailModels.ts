// ============================================================
// BATCH 43: AI Thumbnail Director — Models
// Truthful representation only. No misleading scenes.
// ============================================================

export type ThumbnailCategory =
    | 'couple' | 'bride' | 'groom' | 'family' | 'ceremony' | 'dance'
    | 'emotional_reaction' | 'drone' | 'venue' | 'decor' | 'engagement'
    | 'baby_shower' | 'pre_wedding' | 'cinematic' | 'documentary'
    | 'reel_cover' | 'youtube_cover' | 'client_preview' | 'archive_cover' | 'custom';

export type ThumbnailPlatform =
    | 'YouTube' | 'YouTube Shorts' | 'Instagram Reel Cover' | 'Instagram Feed'
    | 'Facebook' | 'Website' | 'Client Review' | 'Archive Cover';

export type ThumbnailVariantStyle =
    | 'clean' | 'luxury' | 'emotional' | 'cinematic' | 'documentary'
    | 'modern' | 'traditional' | 'minimal' | 'high_contrast' | 'no_text';

export interface ThumbnailScore {
    faceVisibility: number;
    expression: number;
    sharpness: number;
    exposure: number;
    composition: number;
    backgroundSeparation: number;
    storyImportance: number;
    colorContrast: number;
    mobileReadability: number;
    authenticity: number;
    overall: number;
}

export interface ThumbnailSafeArea {
    platform: ThumbnailPlatform;
    titleSafe: { x: number; y: number; width: number; height: number };
    logoPadding: number;
    cropAspectRatio: string;
}

export interface ThumbnailTextPlan {
    headline?: string;
    subtitle?: string;
    source: 'project_metadata' | 'user_input';
}

export interface ThumbnailComposition {
    subjectScale: number;
    subjectPosition: { x: number; y: number };
    backgroundTreatment: 'none' | 'blur' | 'darken' | 'gradient' | 'vignette';
    textRegion?: { x: number; y: number; width: number; height: number };
    logoPlacement?: { x: number; y: number };
}

export interface ThumbnailCandidate {
    clipId: string;
    frameTimecodeSeconds: number;
    category: ThumbnailCategory;
    score: ThumbnailScore;
    composition: ThumbnailComposition;
    textPlan?: ThumbnailTextPlan;
    safeAreas: ThumbnailSafeArea[];
}

export interface ThumbnailVariant {
    style: ThumbnailVariantStyle;
    candidate: ThumbnailCandidate;
    adjustments: Record<string, any>;
}

export interface ThumbnailReport {
    projectId: string;
    selectedCandidates: ThumbnailCandidate[];
    variants: ThumbnailVariant[];
    platformCompatibility: Record<ThumbnailPlatform, boolean>;
    warnings: string[];
    confidence: number;
    generatedAt: string;
}
