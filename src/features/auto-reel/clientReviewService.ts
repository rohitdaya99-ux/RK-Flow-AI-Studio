import { ClientReviewReport } from './clientReviewModels';
import { AutoReelJob } from './models';

export class ClientReviewService {
    async generateReviewPackage(_job: AutoReelJob): Promise<ClientReviewReport> {
        return {
            id: 'client_review_' + Date.now(),
            versionId: _job.id,
            status: 'pending',
            comments: [],
            conflictsDetected: false,
            revisionChecklist: [],
            createdAt: new Date().toISOString()
        };
    }
}
