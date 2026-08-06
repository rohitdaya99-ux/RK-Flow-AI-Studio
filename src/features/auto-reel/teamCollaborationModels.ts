// ============================================================
// BATCH 46: AI Team Collaboration — Models
// Extends existing Collaboration. No employee surveillance.
// ============================================================

export type TeamRoleName =
    | 'owner' | 'administrator' | 'manager' | 'lead_editor' | 'editor'
    | 'assistant_editor' | 'colorist' | 'sound_editor' | 'reviewer'
    | 'shooter' | 'freelancer' | 'intern' | 'client_reviewer' | 'read_only';

export interface TeamMember {
    id: string;
    name: string;
    role: TeamRoleName;
}

export interface TeamPermission {
    viewProject: boolean;
    editProject: boolean;
    executeAiWorkflow: boolean;
    review: boolean;
    approve: boolean;
    export: boolean;
    deliver: boolean;
    manageAssets: boolean;
    manageTeam: boolean;
    manageProviders: boolean;
    manageFinances: boolean;
    managePlugins: boolean;
    manageStudioKnowledge: boolean;
}

export interface TaskAssignment {
    id: string;
    taskDescription: string;
    assignedTo: string;
    source: 'workflow_failure' | 'client_comment' | 'qc_issue' | 'missing_media'
        | 'manual_review' | 'revision_request' | 'delivery' | 'archive' | 'maintenance';
    status: 'open' | 'in_progress' | 'completed' | 'blocked';
    deadline?: string;
}

export interface TeamHandoff {
    id: string;
    sourceOwner: string;
    destinationOwner: string;
    projectId: string;
    projectVersion: string;
    pendingTasks: string[];
    notes: string;
    unresolvedIssues: string[];
    deadline?: string;
    approvalStatus: 'pending' | 'accepted' | 'rejected';
}

export interface TeamWorkloadReport {
    memberId: string;
    activeProjects: number;
    openTasks: number;
    completedTasks: number;
    blockedTasks: number;
    deadlineRisk: boolean;
}

export interface CollaborationSummary {
    totalMembers: number;
    totalTasks: number;
    openTasks: number;
    blockedTasks: number;
    pendingHandoffs: number;
    deadlineRisks: number;
    workloadReports: TeamWorkloadReport[];
}
