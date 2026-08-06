export interface ClientComment {
    id: string;
    userId: string;
    text: string;
    timecodeSeconds: number;
    status: 'open' | 'resolved' | 'rejected' | 'conflict';
    category: 'story' | 'pacing' | 'color' | 'audio' | 'export' | 'unknown';
}

export interface ClientReviewReport {
    id: string;
    versionId: string;
    status: 'pending' | 'changes_requested' | 'client_approved' | 'final_approved';
    comments: ClientComment[];
    conflictsDetected: boolean;
    revisionChecklist: string[];
    createdAt: string;
}

export interface ReviewAccessPolicy {
    canComment: boolean;
    canApprove: boolean;
    canDownloadPreview: boolean;
    canDownloadFinal: boolean;
}
