export interface RenderManifest {
    mediaFiles: string[];
    sequenceData: string;
    fontsByReference: string[];
    exportSettings: Record<string, any>;
}

export interface CloudRenderReport {
    provider: string;
    status: 'completed' | 'failed' | 'disabled_by_default';
    uploadSizeMb?: number;
    estimatedCostUsd?: number;
    encryption: 'AES-256' | 'None';
    retentionDays: number;
}
