export interface SearchFilter {
    category?: 'clip' | 'asset' | 'workflow' | 'export' | 'comment';
    minScore?: number;
    dateRange?: { start: string, end: string };
}

export interface SearchDocument {
    id: string;
    type: string;
    title: string;
    metadata: Record<string, any>;
    score: number;
}

export interface SearchCapabilityReport {
    indexSize: number;
    lastUpdated: string;
    supportedFacets: string[];
    provider: string;
}
