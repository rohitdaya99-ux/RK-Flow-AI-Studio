const { describe, it } = require('node:test');
const assert = require('node:assert');
const { createAutoReelJob } = require('./src/features/auto-reel/models.js');
const { runProductionDirector } = require('./src/features/auto-reel/productionPipeline.js');
const { runCinematographer } = require('./src/features/auto-reel/cinematographyPipeline.js');
const { runVFXDirector } = require('./src/features/auto-reel/vfxPipeline.js');
const { runSoundDesigner } = require('./src/features/auto-reel/soundDesignPipeline.js');
const { runHollywoodDirector } = require('./src/features/auto-reel/hollywoodPipeline.js');
const { runCameraDirector } = require('./src/features/auto-reel/cameraDirectorPipeline.js');
const { runPsychologyEngine } = require('./src/features/auto-reel/psychologyPipeline.js');
const { runViralReelDirector } = require('./src/features/auto-reel/viralReelPipeline.js');
const { ProjectReviewService } = require('./src/features/auto-reel/collaborationService.js');
const { PluginManager } = require('./src/features/auto-reel/marketplaceService.js');

describe('RK Flow 3.0: Batches 21-30 Final Intelligence Pipeline', () => {
    
    it('should successfully run Production Director analysis', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-21');
        const report = await runProductionDirector(job);
        assert.ok(report.coverageScore !== undefined);
        assert.ok(report.provider === 'RK_Production_Director_AI');
        job.productionReport = report;
        assert.strictEqual(job.productionReport.coverageScore, 85);
    });

    it('should successfully run Cinematography analysis', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-22');
        const report = await runCinematographer(job);
        assert.ok(report.provider === 'RK_Cinematographer_AI');
        job.cinematographyReport = report;
    });

    it('should successfully run VFX Director', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-23');
        const plan = await runVFXDirector(job);
        assert.ok(plan.provider === 'RK_VFX_Director_AI');
        job.vfxPlan = plan;
    });

    it('should successfully run Sound Designer', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-24');
        const plan = await runSoundDesigner(job);
        assert.ok(plan.provider === 'RK_Sound_Designer_AI');
        job.soundDesignPlan = plan;
    });

    it('should successfully run Hollywood Director Review', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-25');
        const plan = await runHollywoodDirector(job);
        assert.ok(plan.approvalStatus === 'approved');
        assert.strictEqual(plan.mode, 'cinematic');
        job.finalDirectionPlan = plan;
    });

    it('should successfully run Camera Director', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-26');
        const result = await runCameraDirector(job);
        assert.ok(result.recommendations.provider === 'RK_Camera_Director');
        job.cameraPerformanceReport = result.reports;
    });

    it('should successfully run Story Psychology Engine', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-27');
        const report = await runPsychologyEngine(job);
        assert.ok(report.provider === 'RK_Psychology_Engine');
        job.storyEngagementReport = report;
    });

    it('should successfully run Viral Reel Director', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-28');
        const report = await runViralReelDirector(job);
        assert.strictEqual(report.hook, 'couple_portrait');
        assert.ok(report.provider === 'RK_ViralReel_Director');
        job.viralReelReport = report;
    });

    it('should successfully instantiate Collaboration Service', async () => {
        const job = createAutoReelJob({} /* mock request */, 'job-29');
        const reviewService = new ProjectReviewService();
        const session = await reviewService.initializeReview(job);
        assert.strictEqual(session.status, 'open');
        job.reviewSessions = [session];
        assert.strictEqual(job.reviewSessions.length, 1);
    });

    it('should successfully instantiate Marketplace SDK', async () => {
        const pluginManager = new PluginManager();
        const manifest = {
            id: 'test-plugin',
            name: 'Test Plugin',
            version: '1.0.0',
            provider: 'ThirdParty',
            description: 'A test plugin',
            capabilities: [],
            permissions: [],
            dependencies: {},
            supportedRkFlowVersion: '3.0.0',
            supportedPremiereVersion: '24.0.0',
            checksum: 'abc'
        };
        const installed = await pluginManager.installPlugin(manifest);
        assert.strictEqual(installed, true);
        const health = await pluginManager.getHealth('test-plugin');
        assert.strictEqual(health.status, 'healthy');
    });

});
