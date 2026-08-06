import { SoundDesignPlan } from './soundDesignModels';
import { AutoReelJob } from './models';

export async function runSoundDesigner(_job: AutoReelJob): Promise<SoundDesignPlan> {
    return {
        events: [],
        provider: 'RK_Sound_Designer_AI',
        version: '3.0.0'
    };
}
