// ============================================================
// BATCH 50: RK Flow Autonomous AI Operating System — Pipeline
// Wraps existing AI Director. Does NOT replace it.
// ============================================================

import {
    AutonomousMission, MissionPolicy, MissionState,
    MissionCheckpoint, MissionRecovery, MissionReport, SystemHealth, AutonomyLevel
} from './autonomousOsModels';

const DEFAULT_SAFE_PERMISSIONS = {
    analysis: true, planning: true, timelineEditingInWorkingSequence: true,
    transitions: true, motion: true, color: true, audio: true, sfx: true,
    titles: true, qc: true, repair: true, localExport: true, localArchive: true,
    draftCreation: true, reportGeneration: true,
    // All external/destructive actions blocked by default
    financialTransactions: false, assetPurchases: false, publicPublishing: false,
    cloudUpload: false, externalSharing: false, clientCommunication: false,
    pluginInstallation: false, permissionChanges: false, accountChanges: false,
    destructiveDeletion: false, voiceCloning: false, knowledgeUpdates: false,
    enterprisePolicyChanges: false
};

export class RKFlowOperatingSystem {

    createMission(objective: string, autonomyLevel: AutonomyLevel): AutonomousMission {
        const policy: MissionPolicy = {
            autonomyLevel,
            permissions: { ...DEFAULT_SAFE_PERMISSIONS },
            maxRetries: 3,
            checkpointInterval: 5,
            requireUserReviewOnCompletion: true
        };
        return {
            id: 'mission_' + Date.now(),
            objective,
            policy,
            state: 'created',
            steps: [],
            currentStepIndex: 0,
            checkpoints: [],
            recoveries: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    validatePermission(mission: AutonomousMission, action: string): boolean {
        const perms: Record<string, boolean> = { ...mission.policy.permissions };
        return perms[action] === true;
    }

    transitionState(mission: AutonomousMission, newState: MissionState): AutonomousMission {
        return { ...mission, state: newState, updatedAt: new Date().toISOString() };
    }

    pauseMission(mission: AutonomousMission): AutonomousMission {
        if (mission.state !== 'running') throw new Error('OS_SAFETY: Can only pause a running mission.');
        return this.transitionState(mission, 'paused');
    }

    resumeMission(mission: AutonomousMission): AutonomousMission {
        if (mission.state !== 'paused') throw new Error('OS_SAFETY: Can only resume a paused mission.');
        return this.transitionState(mission, 'running');
    }

    cancelMission(mission: AutonomousMission): AutonomousMission {
        return this.transitionState(mission, 'cancelled');
    }

    rollbackMission(mission: AutonomousMission): AutonomousMission {
        return this.transitionState(mission, 'rolled_back');
    }

    createCheckpoint(mission: AutonomousMission): MissionCheckpoint {
        const cp: MissionCheckpoint = {
            id: 'cp_' + Date.now(),
            missionId: mission.id,
            stepIndex: mission.currentStepIndex,
            state: { objective: mission.objective, stepCount: mission.steps.length },
            createdAt: new Date().toISOString()
        };
        mission.checkpoints.push(cp);
        return cp;
    }

    recoverFromFailure(mission: AutonomousMission, failedStep: string, strategy: MissionRecovery['recoveryStrategy']): MissionRecovery {
        const recovery: MissionRecovery = {
            failedStep,
            recoveryStrategy: strategy,
            executed: true,
            success: strategy !== 'abort'
        };
        mission.recoveries.push(recovery);
        return recovery;
    }

    getSystemHealth(): SystemHealth {
        return {
            premiereHost: 'connected',
            sidecar: 'running',
            providers: {},
            gpu: 'available',
            cpuUsagePercent: 25,
            memoryUsageMb: 4096,
            diskFreeMb: 50000,
            cacheHealthy: true,
            renderQueueSize: 0,
            workflowQueueSize: 0
        };
    }

    generateReport(mission: AutonomousMission): MissionReport {
        return {
            missionId: mission.id,
            objective: mission.objective,
            state: mission.state,
            autonomyLevel: mission.policy.autonomyLevel,
            steps: mission.steps,
            checkpoints: mission.checkpoints,
            recoveries: mission.recoveries,
            systemHealth: this.getSystemHealth(),
            progress: mission.state === 'completed' ? 100 : 0,
            warnings: [],
            failures: [],
            startedAt: mission.createdAt,
            completedAt: mission.state === 'completed' ? new Date().toISOString() : undefined
        };
    }
}
