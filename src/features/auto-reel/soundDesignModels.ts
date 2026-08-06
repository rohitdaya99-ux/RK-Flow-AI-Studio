export type SFXCategory = 'whoosh' | 'hit' | 'impact' | 'rise' | 'downer' | 'boom' | 'sub_drop' | 'sparkle' | 'bell' | 'temple_bell' | 'crowd_cheer' | 'applause' | 'firework' | 'soft_swell' | 'emotional_boom' | 'cinematic_pulse' | 'transition_sweep' | 'camera_click' | 'bass_hit' | 'cloth_movement' | 'jewellery_movement' | 'footstep' | 'room_tone' | 'ambience_bed';

export interface GeneratedSFXAsset {
    seed: number;
    provider: string;
    recipe: string;
    duration: number;
    sampleRate: number;
    bitDepth: number;
    loudness: number;
    hash: string;
    path: string;
    version: string;
}

export interface SoundEvent {
    id: string;
    targetClipId: string;
    category: SFXCategory;
    startTime: number;
    asset?: GeneratedSFXAsset;
    duckingRequired: boolean;
}

export interface SoundDesignPlan {
    events: SoundEvent[];
    provider: string;
    version: string;
}
