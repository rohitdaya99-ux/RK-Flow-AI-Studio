import { CompositionRequest, MusicCompositionReport } from './musicComposerModels';
import { AutoReelJob } from './models';

export class MusicComposerPipeline {
    async composeMusic(_request: CompositionRequest, _job: AutoReelJob): Promise<MusicCompositionReport> {
        return {
            provider: 'DisabledMusicComposer', // Safety default
            status: 'disabled',
            licenseReport: 'Generative music disabled by default. Requires explicit local provider configuration.'
        };
    }
}
