import { CloudRenderReport } from './cloudRenderModels';
import { AutoReelJob } from './models';

export class CloudRenderPipeline {
    async submitRenderJob(_job: AutoReelJob): Promise<CloudRenderReport> {
        return {
            provider: 'DisabledCloudRenderProvider', // Safety default
            status: 'disabled_by_default',
            encryption: 'AES-256',
            retentionDays: 0
        };
    }
}
