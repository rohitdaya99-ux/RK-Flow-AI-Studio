export interface ProjectRecord {
    id: string;
    projectId: string;
    status: 'enquiry' | 'editing' | 'client review' | 'approved' | 'delivered';
    assignedEditor: string;
    deadlines: { editing?: string, review?: string, delivery?: string };
}

export interface ProductionAnalyticsReport {
    averageEditTimeSeconds: number;
    aiAcceptanceRate: number;
    revisionCount: number;
    computeCostEstimate: number;
    storageUsedMb: number;
}

export interface BusinessReport {
    totalProjects: number;
    deliveredProjects: number;
    analytics: ProductionAnalyticsReport;
}
