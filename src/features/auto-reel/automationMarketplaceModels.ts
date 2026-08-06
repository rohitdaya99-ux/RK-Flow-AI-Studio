// ============================================================
// BATCH 48: AI Automation Marketplace — Models
// Extends existing Marketplace. No duplicate Plugin Manager.
// ============================================================

export interface AutomationPermission {
    filesystem: 'none' | 'sandbox_only';
    premiereBridge: 'none' | 'read_only' | 'controlled';
    apiKeys: 'none';
    network: 'none' | 'declared_endpoints_only';
    clientProjects: 'none' | 'current_only';
    financialData: 'none' | 'with_permission';
    studioKnowledge: 'none' | 'with_permission';
    publishingProviders: 'none' | 'with_permission';
}

export interface AutomationDependency {
    name: string;
    version: string;
    required: boolean;
}

export interface AutomationCompatibility {
    minRKFlowVersion: string;
    minPremiereVersion?: string;
    supportedPlatforms: string[];
}

export interface AutomationLicense {
    type: 'free' | 'commercial' | 'subscription' | 'studio_internal';
    attribution: string;
    url?: string;
}

export interface AutomationManifest {
    id: string;
    name: string;
    version: string;
    author: string;
    description: string;
    category: string;
    permissions: AutomationPermission;
    dependencies: AutomationDependency[];
    compatibility: AutomationCompatibility;
    license: AutomationLicense;
    checksum: string;
    signed: boolean;
    privacyBehavior: string;
    networkRequirements: string;
    uninstallPlan: string;
}

export interface AutomationInstallPlan {
    manifest: AutomationManifest;
    permissionsReviewed: boolean;
    licenseAccepted: boolean;
    compatibilityChecked: boolean;
    userApproved: boolean;
    sandboxed: boolean;
    healthTested: boolean;
}

export interface AutomationHealthReport {
    packageId: string;
    status: 'healthy' | 'degraded' | 'failed' | 'disabled';
    lastChecked: string;
    issues: string[];
}
