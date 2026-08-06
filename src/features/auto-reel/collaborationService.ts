import { ReviewSession } from './collaborationModels';
import { AutoReelJob } from './models';

export class ProjectReviewService {
    async initializeReview(_job: AutoReelJob): Promise<ReviewSession> {
        return {
            id: 'session_' + Date.now(),
            versionId: _job.id,
            comments: [],
            status: 'open',
            createdAt: Date.now()
        };
    }
}
