export interface PluginPermission {
    resource: string;
    access: 'read' | 'write' | 'execute';
}

export interface PluginCapability {
    category: string;
    supportedFeatures: string[];
}

export interface PluginManifest {
    id: string;
    name: string;
    version: string;
    provider: string;
    description: string;
    capabilities: PluginCapability[];
    permissions: PluginPermission[];
    dependencies: Record<string, string>;
    supportedRkFlowVersion: string;
    supportedPremiereVersion: string;
    checksum: string;
}

export interface PluginHealthReport {
    id: string;
    status: 'healthy' | 'degraded' | 'failed' | 'disabled';
    message: string;
}
