import { CameraPerformanceReport, FutureShootRecommendation, MulticamPlan } from './cameraDirectorModels';
import { AutoReelJob } from './models';

export async function runCameraDirector(_job: AutoReelJob): Promise<{
    reports: CameraPerformanceReport[], 
    recommendations: FutureShootRecommendation,
    multicamPlan: MulticamPlan
}> {
    return {
        reports: [],
        recommendations: { recommendations: [], provider: 'RK_Camera_Director', version: '3.0.0' },
        multicamPlan: { bestAnglesByEvent: {}, provider: 'RK_Camera_Director', version: '3.0.0' }
    };
}
