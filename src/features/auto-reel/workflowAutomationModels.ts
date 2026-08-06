export interface WorkflowCondition {
    type: 'project_type' | 'sequence_duration' | 'clip_count' | 'media_available' | 'gpu_available' | 'user_permission' | 'export_destination';
    operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
    value: any;
}

export interface WorkflowAction {
    id: string;
    actionType: 'scan_clips' | 'run_vision' | 'run_face' | 'run_wedding' | 'create_story' | 'execute_sequence' | 'export_preset' | 'package_delivery';
    fallbackPolicy: 'retry' | 'skip' | 'rollback' | 'fail_fast';
}

export interface WorkflowStep {
    id: string;
    name: string;
    action: WorkflowAction;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    error?: string;
}

export interface WorkflowTemplate {
    id: string;
    name: string;
    description: string;
    steps: WorkflowStep[];
    conditions: WorkflowCondition[];
    resourcePolicy: { requiresGpu: boolean, requiresFfmpeg: boolean };
    permissions: string[];
}

export interface WorkflowRun {
    id: string;
    workflowId: string;
    jobId: string;
    status: 'running' | 'completed' | 'failed' | 'cancelled';
    currentStepIndex: number;
    completedSteps: WorkflowStep[];
    startedAt: string;
    completedAt?: string;
}
