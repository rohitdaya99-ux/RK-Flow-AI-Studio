export type LensLook = 'ultra-wide' | 'wide' | 'normal' | 'portrait' | 'telephoto' | 'macro/detail' | 'unknown';

export type ShotGrammar = 'establishing' | 'master' | 'medium' | 'close-up' | 'extreme_close-up' | 'reaction' | 'insert' | 'cutaway' | 'tracking' | 'reveal' | 'hero' | 'transition' | 'closing';

export type CameraIntent = 'handheld' | 'gimbal' | 'tripod' | 'drone' | 'slider' | 'documentary' | 'commercial' | 'portrait' | 'hero';

export interface CinematographyAnalysis {
    clipId: string;
    shotGrammar: ShotGrammar;
    cameraIntent: CameraIntent;
    lensLookEstimate: LensLook;
    movementVector: string;
    framingScore: number;
    depthScore: number;
    cinematicScore: number;
    continuityNotes: string[];
    bestEditorialUse: string;
    transitionCompatibility: string[];
    motionCompatibility: string[];
    colorNotes: string[];
    confidence: number;
    evidence: string[];
}

export interface CinematographyReport {
    shots: CinematographyAnalysis[];
    provider: string;
    version: string;
}
