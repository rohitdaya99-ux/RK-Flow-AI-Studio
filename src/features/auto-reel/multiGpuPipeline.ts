import { ComputeFallbackReport } from './multiGpuModels';
import { AutoReelJob } from './models';

export class MultiGpuPipeline {
    async scheduleComputeTask(_job: AutoReelJob): Promise<ComputeFallbackReport> {
        return {
            primaryDevice: { id: 'dev_0', name: 'Local CPU', type: 'CPU', vramMb: 0 },
            fallbackTriggered: false,
            deterministic: true
        };
    }
}
