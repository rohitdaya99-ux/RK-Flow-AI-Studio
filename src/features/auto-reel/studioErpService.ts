import { BusinessReport } from './studioErpModels';

export class StudioErpService {
    async generateBusinessReport(): Promise<BusinessReport> {
        return {
            totalProjects: 1,
            deliveredProjects: 0,
            analytics: {
                averageEditTimeSeconds: 300,
                aiAcceptanceRate: 0.95,
                revisionCount: 0,
                computeCostEstimate: 0,
                storageUsedMb: 500
            }
        };
    }
}
