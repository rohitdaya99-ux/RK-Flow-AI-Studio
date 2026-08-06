import { VoiceReport } from './voiceDirectorModels';
import { AutoReelJob } from './models';

export class VoiceDirectorPipeline {
    async processVoice(_job: AutoReelJob): Promise<VoiceReport> {
        return {
            provider: 'RK_Voice_Director',
            status: 'blocked_no_consent', // Safety default
            plan: { transcriptions: [], narrations: [] }
        };
    }
}
