import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createAutoReelJob } from '../src/features/auto-reel/models';
import { WorkflowAutomationEngine } from '../src/features/auto-reel/workflowAutomationPipeline';
import { ClientReviewService } from '../src/features/auto-reel/clientReviewService';
import { AssetIntelligenceEngine } from '../src/features/auto-reel/assetIntelligenceService';
import { SearchEverythingEngine } from '../src/features/auto-reel/searchEverythingService';
import { MusicComposerPipeline } from '../src/features/auto-reel/musicComposerPipeline';
import { VoiceDirectorPipeline } from '../src/features/auto-reel/voiceDirectorPipeline';
import { CloudRenderPipeline } from '../src/features/auto-reel/cloudRenderPipeline';
import { MultiGpuPipeline } from '../src/features/auto-reel/multiGpuPipeline';
import { PerformanceOptimizerPipeline } from '../src/features/auto-reel/performanceOptimizerPipeline';
import { StudioErpService } from '../src/features/auto-reel/studioErpService';

describe('RK Flow 4.0: Batches 31-40 Final Intelligence Pipeline', () => {
    
    it('should successfully run Workflow Automation', async () => {
        const job = createAutoReelJob({} as any, 'job-31');
        const engine = new WorkflowAutomationEngine();
        const template = { id: 'tpl_1', name: 'Auto', description: '', steps: [], conditions: [], resourcePolicy: { requiresGpu: false, requiresFfmpeg: false }, permissions: [] };
        
        const run = await engine.startWorkflow(template, job);
        assert.strictEqual(run.status, 'running');
        job.workflowRun = run;

        const completedRun = await engine.executeStep(run, job);
        assert.strictEqual(completedRun.status, 'completed');
    });

    it('should successfully create Client Review Package', async () => {
        const job = createAutoReelJob({} as any, 'job-32');
        const service = new ClientReviewService();
        const report = await service.generateReviewPackage(job);
        
        assert.strictEqual(report.status, 'pending');
        job.clientReviewReport = report;
    });

    it('should successfully analyze Asset Intelligence', async () => {
        const job = createAutoReelJob({} as any, 'job-33');
        const service = new AssetIntelligenceEngine();
        const report = await service.analyzeProjectAssets(job);
        
        assert.ok(report.assetsIndexed > 0);
        job.assetIntelligenceReport = report;
    });

    it('should successfully query Search Everything', async () => {
        const service = new SearchEverythingEngine();
        const caps = await service.getCapabilities();
        assert.ok(caps.indexSize > 0);
        
        const results = await service.executeSearch('Bride Entry');
        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].type, 'clip');
    });

    it('should securely block generative Music Composer', async () => {
        const job = createAutoReelJob({} as any, 'job-35');
        const pipeline = new MusicComposerPipeline();
        const report = await pipeline.composeMusic({ jobId: job.id, brief: {} as any }, job);
        
        assert.strictEqual(report.status, 'disabled');
        job.musicCompositionReport = report;
    });

    it('should securely block unconsented Voice Director', async () => {
        const job = createAutoReelJob({} as any, 'job-36');
        const pipeline = new VoiceDirectorPipeline();
        const report = await pipeline.processVoice(job);
        
        assert.strictEqual(report.status, 'blocked_no_consent');
        job.voiceReport = report;
    });

    it('should securely block Cloud Render Engine by default', async () => {
        const job = createAutoReelJob({} as any, 'job-37');
        const pipeline = new CloudRenderPipeline();
        const report = await pipeline.submitRenderJob(job);
        
        assert.strictEqual(report.status, 'disabled_by_default');
        job.cloudRenderReport = report;
    });

    it('should schedule Multi-GPU correctly', async () => {
        const job = createAutoReelJob({} as any, 'job-38');
        const pipeline = new MultiGpuPipeline();
        const report = await pipeline.scheduleComputeTask(job);
        
        assert.ok(report.primaryDevice);
        assert.strictEqual(report.fallbackTriggered, false);
        job.computeFallbackReport = report;
    });

    it('should monitor via Performance Optimizer', async () => {
        const job = createAutoReelJob({} as any, 'job-39');
        const pipeline = new PerformanceOptimizerPipeline();
        const report = await pipeline.analyzePerformance(job);
        
        assert.strictEqual(report.mode, 'Maximum Quality');
        job.executionPerformanceReport = report;
    });

    it('should generate Studio ERP Business Report', async () => {
        const service = new StudioErpService();
        const report = await service.generateBusinessReport();
        
        assert.strictEqual(report.totalProjects, 1);
        assert.ok(report.analytics.averageEditTimeSeconds > 0);
    });

});
