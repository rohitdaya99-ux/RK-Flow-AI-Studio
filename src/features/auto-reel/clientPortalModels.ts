// ============================================================
// BATCH 45: AI Client Portal — Models
// Extends existing Client Review System. No duplicate review service.
// ============================================================

export interface PortalAccessToken {
    token: string;
    projectId: string;
    clientId: string;
    permissions: PortalPermission;
    expiresAt: string;
    revoked: boolean;
    passwordProtected: boolean;
}

export interface PortalPermission {
    viewProjectStatus: boolean;
    viewPreview: boolean;
    commentByTimecode: boolean;
    requestRevisions: boolean;
    approveVersion: boolean;
    compareVersions: boolean;
    viewDeliverables: boolean;
    downloadApprovedFiles: boolean;
    viewDeliveryStatus: boolean;
    viewPaymentStatus: boolean;
    viewInvoiceReference: boolean;
    sendMessage: boolean;
}

export interface PortalBranding {
    studioName: string;
    logoReference?: string;
    accentColor?: string;
    welcomeMessage?: string;
    deliveryInstructions?: string;
    supportDetails?: string;
}

export interface PortalDeliverable {
    id: string;
    name: string;
    format: string;
    sizeMb: number;
    downloadable: boolean;
    downloadCount: number;
}

export interface PortalMessage {
    id: string;
    from: 'client' | 'studio';
    text: string;
    sentAt: string;
}

export interface PortalNotificationDraft {
    type: 'preview_ready' | 'revision_ready' | 'approval_requested' | 'export_ready'
        | 'delivery_ready' | 'deadline_reminder' | 'payment_status_reminder';
    recipientId: string;
    message: string;
    sent: boolean;
}

export interface PortalAuditEntry {
    action: string;
    userId: string;
    timestamp: string;
    details: string;
}

export interface ClientPortalReport {
    projectId: string;
    tokenValid: boolean;
    tokenExpired: boolean;
    permissionsSummary: PortalPermission;
    deliverables: PortalDeliverable[];
    messages: PortalMessage[];
    auditLog: PortalAuditEntry[];
    notificationDrafts: PortalNotificationDraft[];
}
