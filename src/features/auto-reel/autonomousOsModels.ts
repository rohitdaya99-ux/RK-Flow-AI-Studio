// ============================================================
// BATCH 50: RK Flow Autonomous AI Operating System — Models
// Wraps existing AI Director. Does NOT replace it.
// ============================================================

export type MissionState =
    | 'created' | 'validating' | 'waiting_for_permission' | 'planning'
    | 'ready' | 'running' | 'paused' | 'recovering' | 'retrying'
    | 'awaiting_resource' | 'awaiting_provider' | 'verifying'
    | 'completed' | 'completed_with_warnings' | 'failed' | 'cancelled' | 'rolled_back';

export type AutonomyLevel = 0 | 1 | 2 | 3 | 4 | 5;

export interface MissionPermission {
    // Pre-authorized (Levels 2+)
    analysis: boolean;
    planning: boolean;
    timelineEditingInWorkingSequence: boolean;
    transitions: boolean;
    motion: boolean;
    color: boolean;
    audio: boolean;
    sfx: boolean;
    titles: boolean;
    qc: boolean;
    repair: boolean;
    localExport: boolean;
    localArchive: boolean;
    draftCreation: boolean;
    reportGeneration: boolean;
    // Require explicit approval (always)
    financialTransactions: boolean;
    assetPurchases: boolean;
    publicPublishing: boolean;
    cloudUpload: boolean;
    externalSharing: boolean;
    clientCommunication: boolean;
    pluginInstallation: boolean;
    permissionChanges: boolean;
    accountChanges: boolean;
    destructiveDeletion: boolean;
    voiceCloning: boolean;
    knowledgeUpdates: boolean;
    enterprisePolicyChanges: boolean;
}

export interface MissionPolicy {
    autonomyLevel: AutonomyLevel;
    permissions: MissionPermission;
    maxRetries: number;
    checkpointInterval: number;
    requireUserReviewOnCompletion: boolean;
}

export interface MissionStep {
    id: string;
    moduleName: string;
    action: string;
    status: MissionState;
    startedAt?: string;
    completedAt?: string;
    error?: string;
    recoveryAction?: string;
}

export interface MissionCheckpoint {
    id: string;
    missionId: string;
    stepIndex: number;
    state: Record<string, any>;
    createdAt: string;
}

export interface MissionRecovery {
    failedStep: string;
    recoveryStrategy: 'retry' | 'skip' | 'rollback' | 'fallback' | 'abort';
    fallbackAction?: string;
    executed: boolean;
    success: boolean;
}

export interface SystemHealth {
    premiereHost: 'connected' | 'disconnected' | 'unknown';
    sidecar: 'running' | 'stopped' | 'unavailable';
    providers: Record<string, 'available' | 'unavailable'>;
    gpu: 'available' | 'unavailable' | 'throttled';
    cpuUsagePercent: number;
    memoryUsageMb: number;
    diskFreeMb: number;
    cacheHealthy: boolean;
    renderQueueSize: number;
    workflowQueueSize: number;
}

export interface MissionReport {
    missionId: string;
    objective: string;
    state: MissionState;
    autonomyLevel: AutonomyLevel;
    steps: MissionStep[];
    checkpoints: MissionCheckpoint[];
    recoveries: MissionRecovery[];
    systemHealth: SystemHealth;
    progress: number; // 0–100
    etaSeconds?: number;
    warnings: string[];
    failures: string[];
    startedAt: string;
    completedAt?: string;
}

export interface AutonomousMission {
    id: string;
    objective: string;
    policy: MissionPolicy;
    state: MissionState;
    steps: MissionStep[];
    currentStepIndex: number;
    checkpoints: MissionCheckpoint[];
    recoveries: MissionRecovery[];
    report?: MissionReport;
    createdAt: string;
    updatedAt: string;
}
