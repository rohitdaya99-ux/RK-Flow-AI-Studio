export interface TimecodeComment {
    id: string;
    author: string;
    role: string;
    timecode: number;
    text: string;
    resolved: boolean;
    drawingMetadata?: string;
    createdAt: number;
}

export interface ReviewSession {
    id: string;
    versionId: string;
    comments: TimecodeComment[];
    status: 'open' | 'closed';
    createdAt: number;
}

export interface ApprovalState {
    status: 'pending' | 'client_approved' | 'team_approved' | 'rejected' | 'revision_requested';
    revisionRequests: string[];
    approvedAt?: number;
    approvedBy?: string;
}
