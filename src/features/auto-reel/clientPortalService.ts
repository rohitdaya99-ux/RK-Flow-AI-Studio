// ============================================================
// BATCH 45: AI Client Portal — Service
// Extends existing Client Review System. No duplicate review service.
// ============================================================

import { PortalAccessToken, PortalPermission, ClientPortalReport } from './clientPortalModels';

export class ClientPortalService {

    createToken(projectId: string, clientId: string, permissions: PortalPermission, expiryHours: number): PortalAccessToken {
        const now = new Date();
        const expiry = new Date(now.getTime() + expiryHours * 60 * 60 * 1000);
        return {
            token: 'portal_' + Date.now() + '_' + Math.random().toString(36).substring(2, 10),
            projectId,
            clientId,
            permissions,
            expiresAt: expiry.toISOString(),
            revoked: false,
            passwordProtected: false
        };
    }

    validateToken(token: PortalAccessToken): { valid: boolean; reason?: string } {
        if (token.revoked) return { valid: false, reason: 'Token has been revoked.' };
        if (new Date(token.expiresAt) < new Date()) return { valid: false, reason: 'Token has expired.' };
        return { valid: true };
    }

    enforceIsolation(token: PortalAccessToken, requestedProjectId: string): boolean {
        return token.projectId === requestedProjectId;
    }

    async generatePortalReport(token: PortalAccessToken): Promise<ClientPortalReport> {
        const validation = this.validateToken(token);
        return {
            projectId: token.projectId,
            tokenValid: validation.valid,
            tokenExpired: !validation.valid && validation.reason === 'Token has expired.',
            permissionsSummary: token.permissions,
            deliverables: [],
            messages: [],
            auditLog: [
                { action: 'portal_accessed', userId: token.clientId, timestamp: new Date().toISOString(), details: 'Portal report generated.' }
            ],
            notificationDrafts: []
        };
    }
}
