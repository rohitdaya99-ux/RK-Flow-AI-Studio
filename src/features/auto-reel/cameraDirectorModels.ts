export interface CameraPerformanceReport {
    cameraId: string;
    usableFootagePercentage: number;
    focusSuccess: number;
    exposureConsistency: number;
    stability: number;
    reactionCoverage: number;
    ceremonyCoverage: number;
    closeUpCoverage: number;
    wideCoverage: number;
    audioReliability: number;
    duplicateCoverage: number;
    shotUniqueness: number;
    cameraMovementQuality: number;
    averageCinematicScore: number;
}

export interface FutureShootRecommendation {
    recommendations: string[];
    provider: string;
    version: string;
}

export interface MulticamPlan {
    bestAnglesByEvent: Record<string, string>;
    provider: string;
    version: string;
}
