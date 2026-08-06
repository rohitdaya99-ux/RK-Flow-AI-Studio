export interface CompositionBrief {
    style: string;
    targetDuration: number;
    instrumentation: string[];
    energyCurve: string;
}

export interface MusicCompositionReport {
    provider: string;
    status: 'completed' | 'failed' | 'disabled';
    compositionId?: string;
    stems?: string[];
    licenseReport: string;
    seed?: string;
}

export interface CompositionRequest {
    jobId: string;
    brief: CompositionBrief;
}
