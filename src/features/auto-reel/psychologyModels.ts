export interface StoryEngagementReport {
    attentionGraph: Record<number, number>;
    emotionGraph: Record<number, number>;
    noveltyGraph: Record<number, number>;
    repetitionGraph: Record<number, number>;
    retentionRiskZones: { startTime: number, endTime: number, reason: string }[];
    weakSections: { startTime: number, endTime: number }[];
    suggestedPacingChanges: string[];
    hookQuality: number;
    endingQuality: number;
    confidence: number;
    evidence: string[];
    provider: string;
    version: string;
}
