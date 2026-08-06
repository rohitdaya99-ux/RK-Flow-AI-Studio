export type VFXCategory = 'fog' | 'smoke' | 'dust' | 'sparks' | 'glow' | 'bloom' | 'light_rays' | 'lens_flare' | 'film_grain' | 'film_burn' | 'light_leak' | 'particles' | 'flower_petals' | 'confetti' | 'fireworks' | 'snow' | 'rain' | 'bokeh' | 'cinematic_haze' | 'reflection' | 'glass_flare' | 'crystal_effect' | 'gold_particles' | 'silk_movement' | 'ribbon_reveal' | 'abstract_geometry' | 'dreamy_blur' | 'aura_glow' | 'edge_light' | 'vignette' | 'texture_overlays';

export interface GeneratedVFXAsset {
    assetId: string;
    seed: number;
    provider: string;
    version: string;
    recipe: string;
    parameters: Record<string, any>;
    outputPath: string;
    outputHash: string;
    duration: number;
    resolution: string;
    alphaStatus: boolean;
    frameRate: number;
    licenseStatus: string;
    creationTimestamp: number;
}

export interface VFXEvent {
    id: string;
    targetClipId: string;
    category: VFXCategory;
    startTime: number;
    duration: number;
    asset?: GeneratedVFXAsset;
    fallbackStrategy: string;
}

export interface VFXPlan {
    events: VFXEvent[];
    provider: string;
    version: string;
}
