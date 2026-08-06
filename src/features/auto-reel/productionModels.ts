export interface CoverageGraph {
    brideCoverage: number;
    groomCoverage: number;
    coupleCoverage: number;
    familyCoverage: number;
    childrenCoverage: number;
    guestCoverage: number;
    venueCoverage: number;
    decorCoverage: number;
    preparationCoverage: number;
    ceremonyCoverage: number;
    receptionCoverage: number;
    danceCoverage: number;
    emotionalReactionCoverage: number;
    droneCoverage: number;
    closeUpCoverage: number;
    wideCoverage: number;
    detailCoverage: number;
    ambientAudioCoverage: number;
    cleanDialogueCoverage: number;
    entranceCoverage: number;
    endingCoverage: number;
}

export interface MissingMoment {
    id: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    substituteStrategy?: string;
}

export interface ProductionReport {
    coverageScore: number;
    eventCoverageMap: Record<string, number>;
    cameraBalance: Record<string, number>;
    missingMoments: MissingMoment[];
    weakMoments: string[];
    substituteStrategy: string[];
    usableBroll: string[];
    recommendedStoryAdaptation: string;
    reshootSuggestions: string[];
    futureShootRecommendations: string[];
    confidence: number;
    evidence: string[];
    limitations: string[];
    provider: string;
    version: string;
}
