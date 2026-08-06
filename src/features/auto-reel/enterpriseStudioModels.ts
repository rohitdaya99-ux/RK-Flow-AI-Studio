// ============================================================
// BATCH 49: AI Enterprise Studio — Models
// Multi-tenant, governed, auditable. No cross-tenant access.
// ============================================================

export interface Organization {
    id: string;
    name: string;
    locations: StudioLocation[];
    departments: Department[];
    policies: EnterprisePolicy[];
}

export interface StudioLocation {
    id: string;
    name: string;
    region: string;
    timezone: string;
}

export interface Department {
    id: string;
    name: string;
    locationId: string;
}

export interface EnterpriseUser {
    id: string;
    name: string;
    role: EnterpriseRole;
    tenantId: string;
    departmentId?: string;
}

export interface EnterpriseRole {
    name: string;
    permissions: string[];
    inherits?: string;
}

export interface EnterprisePolicy {
    id: string;
    category: 'cloud_use' | 'ai_providers' | 'data_retention' | 'asset_licensing'
        | 'client_privacy' | 'downloads' | 'exports' | 'social_publishing'
        | 'plugin_installation' | 'voice_cloning' | 'financial_records'
        | 'project_deletion' | 'knowledge_updates';
    rule: string;
    enforced: boolean;
}

export interface Tenant {
    id: string;
    organizationId: string;
    name: string;
    isolationPolicy: TenantIsolationPolicy;
}

export interface TenantIsolationPolicy {
    independentProjects: boolean;
    independentClients: boolean;
    independentAssets: boolean;
    independentTeam: boolean;
    independentKnowledge: boolean;
    independentProviders: boolean;
    independentWorkflows: boolean;
    independentFinances: boolean;
    independentExports: boolean;
    independentAnalytics: boolean;
    independentBackups: boolean;
    noCrossTenantAccess: boolean;
}

export interface EnterpriseAuditEntry {
    id: string;
    tenantId: string;
    userId: string;
    action: 'login' | 'permission_change' | 'project_access' | 'project_modification'
        | 'export' | 'download' | 'sharing' | 'publishing' | 'plugin_change'
        | 'provider_change' | 'financial_change' | 'deletion' | 'restore';
    target: string;
    timestamp: string;
    details: string;
}

export interface ComplianceReport {
    tenantId: string;
    policiesEnforced: number;
    policiesTotal: number;
    violations: string[];
    auditEntries: number;
    generatedAt: string;
    disclaimer: string; // "This report does not constitute legal compliance certification."
}

export interface EnterpriseAnalytics {
    tenantId: string;
    totalProjects: number;
    activeUsers: number;
    storageUsedMb: number;
    computeUsedHours: number;
}
