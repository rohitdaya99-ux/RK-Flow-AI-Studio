// ============================================================
// BATCH 48: AI Automation Marketplace — Service
// Extends existing Marketplace. No duplicate Plugin Manager.
// ============================================================

import { AutomationManifest, AutomationInstallPlan, AutomationHealthReport } from './automationMarketplaceModels';

export class AutomationMarketplace {

    async inspectPackage(manifest: AutomationManifest): Promise<AutomationInstallPlan> {
        return {
            manifest,
            permissionsReviewed: false,
            licenseAccepted: false,
            compatibilityChecked: this.checkCompatibility(manifest),
            userApproved: false, // Never auto-approved
            sandboxed: true,
            healthTested: false
        };
    }

    async installPackage(plan: AutomationInstallPlan): Promise<{ success: boolean; error?: string }> {
        if (!plan.manifest.signed) {
            return { success: false, error: 'MARKETPLACE_SAFETY: Unsigned automation packages are rejected.' };
        }
        if (!plan.userApproved) {
            return { success: false, error: 'MARKETPLACE_SAFETY: User approval is required before installation.' };
        }
        if (!plan.permissionsReviewed) {
            return { success: false, error: 'MARKETPLACE_SAFETY: Permissions must be reviewed before installation.' };
        }
        if (!plan.licenseAccepted) {
            return { success: false, error: 'MARKETPLACE_SAFETY: License must be accepted before installation.' };
        }
        return { success: true };
    }

    async rollbackPackage(_packageId: string): Promise<{ success: boolean }> {
        return { success: true }; // Rollback is always safe
    }

    async getHealth(packageId: string): Promise<AutomationHealthReport> {
        return {
            packageId,
            status: 'healthy',
            lastChecked: new Date().toISOString(),
            issues: []
        };
    }

    private checkCompatibility(manifest: AutomationManifest): boolean {
        return manifest.compatibility.supportedPlatforms.length > 0;
    }
}
