export interface AssetLicenseRecord {
    source: string;
    commercialUse: boolean;
    attributionRequired: boolean;
    expiration?: string;
    restricted: boolean;
}

export interface AssetFingerprint {
    hash: string;
    durationSeconds?: number;
    visualEmbeddings?: number[];
    audioFeatures?: number[];
}

export interface AssetDescriptor {
    assetId: string;
    name: string;
    category: 'video' | 'audio' | 'music' | 'sfx' | 'overlay' | 'lut' | 'mogrt';
    fingerprint: AssetFingerprint;
    license: AssetLicenseRecord;
    tags: string[];
    usageHistory: string[];
}

export interface AssetIntelligenceReport {
    assetsIndexed: number;
    duplicatesDetected: number;
    licenseWarnings: string[];
    provider: string;
}
