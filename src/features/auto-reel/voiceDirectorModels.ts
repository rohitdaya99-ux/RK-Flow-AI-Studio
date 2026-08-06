export interface ConsentRecord {
    consented: boolean;
    voiceId: string;
    timestamp: string;
    provider: string;
}

export interface VoicePlan {
    transcriptions: Array<{ clipId: string, text: string, language: string }>;
    narrations: Array<{ text: string, voiceId: string, timestamp: number }>;
}

export interface VoiceReport {
    provider: string;
    status: 'completed' | 'failed' | 'blocked_no_consent';
    plan: VoicePlan;
    consentRecord?: ConsentRecord;
}
