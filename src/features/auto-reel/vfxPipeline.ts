import { VFXPlan } from './vfxModels';
import { AutoReelJob } from './models';

export async function runVFXDirector(_job: AutoReelJob): Promise<VFXPlan> {
    return {
        events: [],
        provider: 'RK_VFX_Director_AI',
        version: '3.0.0'
    };
}
