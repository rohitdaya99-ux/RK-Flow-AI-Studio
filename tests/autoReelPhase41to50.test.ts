import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createAutoReelJob } from '../src/features/auto-reel/models';

// Batch 41
import { BusinessIntelligenceEngine } from '../src/features/auto-reel/businessIntelligencePipeline';
// Batch 42
import { MarketingEngine } from '../src/features/auto-reel/marketingPipeline';
// Batch 43
import { ThumbnailDirector } from '../src/features/auto-reel/thumbnailPipeline';
// Batch 44
import { SocialMediaManager } from '../src/features/auto-reel/socialMediaService';
// Batch 45
import { ClientPortalService } from '../src/features/auto-reel/clientPortalService';
// Batch 46
import { TeamCollaborationEngine } from '../src/features/auto-reel/teamCollaborationService';
// Batch 47
import { LearningHub } from '../src/features/auto-reel/learningHubService';
// Batch 48
import { AutomationMarketplace } from '../src/features/auto-reel/automationMarketplaceService';
// Batch 49
import { EnterpriseStudio } from '../src/features/auto-reel/enterpriseStudioService';
// Batch 50
import { RKFlowOperatingSystem } from '../src/features/auto-reel/autonomousOsPipeline';

describe('RK Flow 5.0: Batches 41-50 Intelligence Pipeline', () => {

    // ── BATCH 41: Business Intelligence ──────────────────────

    it('Batch 41: should generate studio health report with data completeness', async () => {
        const engine = new BusinessIntelligenceEngine();
        const report = await engine.generateStudioHealthReport();
        assert.ok(report.generatedAt);
        assert.ok(report.dataCompleteness.totalFields > 0);
        assert.ok(report.dataCompleteness.missingCategories.length > 0);
        assert.strictEqual(report.metrics[0].source, 'recorded');
    });

    it('Batch 41: should report insufficient data honestly instead of fabricating', async () => {
        const engine = new BusinessIntelligenceEngine();
        const confidence = engine.buildForecastConfidence(3);
        assert.strictEqual(confidence.level, 'insufficient_data');
        assert.ok(confidence.missingData.length > 0);
    });

    it('Batch 41: should report high confidence with enough data', async () => {
        const engine = new BusinessIntelligenceEngine();
        const confidence = engine.buildForecastConfidence(50);
        assert.strictEqual(confidence.level, 'high');
    });

    // ── BATCH 42: Marketing Engine ───────────────────────────

    it('Batch 42: should create campaign as draft, never auto-published', async () => {
        const engine = new MarketingEngine();
        const campaign = await engine.createCampaignDraft({
            type: 'wedding_portfolio', name: 'Summer Campaign', objective: 'Showcase summer weddings',
            audience: { demographics: [], interests: [], platforms: [] },
            brandVoice: { id: 'bv1', voice: 'cinematic' },
            platforms: ['Instagram'], durationDays: 30
        });
        assert.strictEqual(campaign.status, 'draft');
    });

    it('Batch 42: should block publishing without full approval', async () => {
        const engine = new MarketingEngine();
        const campaign = await engine.createCampaignDraft({
            type: 'custom', name: 'Test', objective: 'Test',
            audience: { demographics: [], interests: [], platforms: [] },
            brandVoice: { id: 'bv1', voice: 'modern' },
            platforms: ['YouTube'], durationDays: 7
        });
        await assert.rejects(
            () => engine.publishCampaign(campaign),
            { message: /MARKETING_SAFETY/ }
        );
    });

    // ── BATCH 43: Thumbnail Director ─────────────────────────

    it('Batch 43: should generate thumbnail report with authenticity score', async () => {
        const job = createAutoReelJob({} as any, 'job-43');
        const director = new ThumbnailDirector();
        const report = await director.generateThumbnailReport(job);
        assert.ok(report.selectedCandidates.length > 0);
        assert.ok(report.confidence > 0);
        assert.ok(report.variants.length >= 3);
        job.thumbnailReport = report;
    });

    it('Batch 43: should validate authenticity of thumbnail candidate', () => {
        const director = new ThumbnailDirector();
        assert.strictEqual(director.validateAuthenticity({
            clipId: 'c1', frameTimecodeSeconds: 10, category: 'couple',
            score: { faceVisibility: 0, expression: 0, sharpness: 0, exposure: 0, composition: 0, backgroundSeparation: 0, storyImportance: 0, colorContrast: 0, mobileReadability: 0, authenticity: 0.3, overall: 0 },
            composition: { subjectScale: 0.5, subjectPosition: { x: 0.5, y: 0.5 }, backgroundTreatment: 'none' },
            safeAreas: []
        }), false);
    });

    // ── BATCH 44: Social Media Manager ───────────────────────

    it('Batch 44: should create social post as draft', async () => {
        const manager = new SocialMediaManager();
        const draft = await manager.createDraft('Instagram', 'Beautiful ceremony.', ['#wedding']);
        assert.strictEqual(draft.status, 'draft');
    });

    it('Batch 44: should block publishing without approval', async () => {
        const manager = new SocialMediaManager();
        const result = await manager.publishPost({
            postId: 'p1', accountId: 'a1',
            approvedMedia: false, approvedCopy: false,
            approvedSchedule: false, validatedPrivacy: false
        });
        assert.strictEqual(result.success, false);
        assert.ok(result.error?.includes('SOCIAL_SAFETY'));
    });

    it('Batch 44: should block publishing even with approval when no provider configured', async () => {
        const manager = new SocialMediaManager();
        const result = await manager.publishPost({
            postId: 'p1', accountId: 'a1',
            approvedMedia: true, approvedCopy: true,
            approvedSchedule: true, validatedPrivacy: true
        });
        assert.strictEqual(result.success, false);
        assert.ok(result.error?.includes('No authenticated social provider'));
    });

    // ── BATCH 45: Client Portal ──────────────────────────────

    it('Batch 45: should create and validate portal token', () => {
        const service = new ClientPortalService();
        const token = service.createToken('proj_1', 'client_1', {
            viewProjectStatus: true, viewPreview: true, commentByTimecode: true,
            requestRevisions: true, approveVersion: true, compareVersions: false,
            viewDeliverables: true, downloadApprovedFiles: false,
            viewDeliveryStatus: true, viewPaymentStatus: false,
            viewInvoiceReference: false, sendMessage: true
        }, 24);
        const validation = service.validateToken(token);
        assert.strictEqual(validation.valid, true);
    });

    it('Batch 45: should reject expired portal token', () => {
        const service = new ClientPortalService();
        const token = service.createToken('proj_1', 'client_1', {
            viewProjectStatus: true, viewPreview: true, commentByTimecode: false,
            requestRevisions: false, approveVersion: false, compareVersions: false,
            viewDeliverables: false, downloadApprovedFiles: false,
            viewDeliveryStatus: false, viewPaymentStatus: false,
            viewInvoiceReference: false, sendMessage: false
        }, 0); // Expires immediately
        token.expiresAt = new Date(Date.now() - 1000).toISOString();
        const validation = service.validateToken(token);
        assert.strictEqual(validation.valid, false);
        assert.ok(validation.reason?.includes('expired'));
    });

    it('Batch 45: should enforce portal project isolation', () => {
        const service = new ClientPortalService();
        const token = service.createToken('proj_1', 'client_1', {} as any, 24);
        assert.strictEqual(service.enforceIsolation(token, 'proj_1'), true);
        assert.strictEqual(service.enforceIsolation(token, 'proj_OTHER'), false);
    });

    // ── BATCH 46: Team Collaboration ─────────────────────────

    it('Batch 46: should enforce role-based permissions', () => {
        const engine = new TeamCollaborationEngine();
        const editor = { id: 'u1', name: 'Editor', role: 'editor' as const };
        assert.strictEqual(engine.checkPermission(editor, 'editProject'), true);
        assert.strictEqual(engine.checkPermission(editor, 'manageFinances'), false);
        assert.strictEqual(engine.checkPermission(editor, 'manageTeam'), false);
    });

    it('Batch 46: should restrict intern to read-only-like access', () => {
        const engine = new TeamCollaborationEngine();
        const intern = { id: 'u2', name: 'Intern', role: 'intern' as const };
        assert.strictEqual(engine.checkPermission(intern, 'viewProject'), true);
        assert.strictEqual(engine.checkPermission(intern, 'editProject'), false);
        assert.strictEqual(engine.checkPermission(intern, 'approve'), false);
    });

    it('Batch 46: should create task handoff', async () => {
        const engine = new TeamCollaborationEngine();
        const handoff = await engine.createHandoff('editor_a', 'editor_b', 'proj_1');
        assert.strictEqual(handoff.approvalStatus, 'pending');
    });

    // ── BATCH 47: Learning Hub ───────────────────────────────

    it('Batch 47: should create isolated practice project', () => {
        const hub = new LearningHub();
        const project = hub.createPracticeProject('Practice Wedding Edit', 'Learn basic cuts');
        assert.strictEqual(project.isolated, true);
        assert.strictEqual(hub.validateIsolation(project), true);
    });

    it('Batch 47: should generate learning recommendations from weak areas', () => {
        const hub = new LearningHub();
        const recs = hub.generateRecommendations(['pacing', 'color']);
        assert.strictEqual(recs.length, 2);
        assert.ok(recs[0].reason.includes('pacing'));
    });

    // ── BATCH 48: Automation Marketplace ─────────────────────

    it('Batch 48: should reject unsigned automation package', async () => {
        const marketplace = new AutomationMarketplace();
        const plan = await marketplace.inspectPackage({
            id: 'pkg_1', name: 'Test', version: '1.0', author: 'author',
            description: 'test', category: 'wedding_workflows',
            permissions: { filesystem: 'none', premiereBridge: 'none', apiKeys: 'none', network: 'none', clientProjects: 'none', financialData: 'none', studioKnowledge: 'none', publishingProviders: 'none' },
            dependencies: [], compatibility: { minRKFlowVersion: '5.0', supportedPlatforms: ['macOS'] },
            license: { type: 'free', attribution: '' },
            checksum: 'abc123', signed: false,
            privacyBehavior: 'none', networkRequirements: 'none', uninstallPlan: 'remove files'
        });
        plan.userApproved = true;
        plan.permissionsReviewed = true;
        plan.licenseAccepted = true;
        const result = await marketplace.installPackage(plan);
        assert.strictEqual(result.success, false);
        assert.ok(result.error?.includes('Unsigned'));
    });

    it('Batch 48: should reject unapproved automation package', async () => {
        const marketplace = new AutomationMarketplace();
        const plan = await marketplace.inspectPackage({
            id: 'pkg_2', name: 'Test', version: '1.0', author: 'author',
            description: 'test', category: 'export_workflows',
            permissions: { filesystem: 'sandbox_only', premiereBridge: 'read_only', apiKeys: 'none', network: 'none', clientProjects: 'current_only', financialData: 'none', studioKnowledge: 'none', publishingProviders: 'none' },
            dependencies: [], compatibility: { minRKFlowVersion: '5.0', supportedPlatforms: ['macOS'] },
            license: { type: 'free', attribution: '' },
            checksum: 'abc123', signed: true,
            privacyBehavior: 'none', networkRequirements: 'none', uninstallPlan: 'remove files'
        });
        // userApproved stays false
        const result = await marketplace.installPackage(plan);
        assert.strictEqual(result.success, false);
        assert.ok(result.error?.includes('User approval'));
    });

    it('Batch 48: should allow rollback', async () => {
        const marketplace = new AutomationMarketplace();
        const result = await marketplace.rollbackPackage('pkg_1');
        assert.strictEqual(result.success, true);
    });

    // ── BATCH 49: Enterprise Studio ──────────────────────────

    it('Batch 49: should enforce multi-tenant isolation', () => {
        const enterprise = new EnterpriseStudio();
        const tenant = enterprise.createTenant('org_1', 'Studio A');
        assert.strictEqual(tenant.isolationPolicy.noCrossTenantAccess, true);
        assert.strictEqual(tenant.isolationPolicy.independentProjects, true);
        assert.strictEqual(tenant.isolationPolicy.independentFinances, true);

        const user = { id: 'u1', name: 'Editor', role: { name: 'editor', permissions: [] }, tenantId: tenant.id };
        assert.strictEqual(enterprise.enforceTenantIsolation(user, tenant.id), true);
        assert.strictEqual(enterprise.enforceTenantIsolation(user, 'tenant_OTHER'), false);
    });

    it('Batch 49: should generate compliance report with legal disclaimer', async () => {
        const enterprise = new EnterpriseStudio();
        const report = await enterprise.generateComplianceReport('tenant_1');
        assert.ok(report.disclaimer.includes('does not constitute legal compliance'));
    });

    it('Batch 49: should create audit log entry', () => {
        const enterprise = new EnterpriseStudio();
        const entry = enterprise.logAudit('t1', 'u1', 'project_access', 'proj_1', 'Viewed project.');
        assert.strictEqual(entry.action, 'project_access');
        assert.ok(entry.timestamp);
    });

    // ── BATCH 50: Autonomous OS ──────────────────────────────

    it('Batch 50: should create mission with safe default permissions', () => {
        const os = new RKFlowOperatingSystem();
        const mission = os.createMission('Create Wedding Reel', 3);
        assert.strictEqual(mission.state, 'created');
        assert.strictEqual(mission.policy.autonomyLevel, 3);
        assert.strictEqual(mission.policy.permissions.timelineEditingInWorkingSequence, true);
        assert.strictEqual(mission.policy.permissions.publicPublishing, false);
        assert.strictEqual(mission.policy.permissions.financialTransactions, false);
        assert.strictEqual(mission.policy.permissions.cloudUpload, false);
        assert.strictEqual(mission.policy.permissions.destructiveDeletion, false);
        assert.strictEqual(mission.policy.permissions.voiceCloning, false);
        assert.strictEqual(mission.policy.permissions.knowledgeUpdates, false);
    });

    it('Batch 50: should validate permission boundaries', () => {
        const os = new RKFlowOperatingSystem();
        const mission = os.createMission('Create Reel', 2);
        assert.strictEqual(os.validatePermission(mission, 'analysis'), true);
        assert.strictEqual(os.validatePermission(mission, 'qc'), true);
        assert.strictEqual(os.validatePermission(mission, 'publicPublishing'), false);
        assert.strictEqual(os.validatePermission(mission, 'financialTransactions'), false);
    });

    it('Batch 50: should support mission pause/resume', () => {
        const os = new RKFlowOperatingSystem();
        let mission = os.createMission('Create Highlight', 3);
        mission = os.transitionState(mission, 'running');
        mission = os.pauseMission(mission);
        assert.strictEqual(mission.state, 'paused');
        mission = os.resumeMission(mission);
        assert.strictEqual(mission.state, 'running');
    });

    it('Batch 50: should support mission cancellation', () => {
        const os = new RKFlowOperatingSystem();
        let mission = os.createMission('Create Teaser', 2);
        mission = os.cancelMission(mission);
        assert.strictEqual(mission.state, 'cancelled');
    });

    it('Batch 50: should support mission rollback', () => {
        const os = new RKFlowOperatingSystem();
        let mission = os.createMission('Process Project', 4);
        mission = os.rollbackMission(mission);
        assert.strictEqual(mission.state, 'rolled_back');
    });

    it('Batch 50: should create checkpoint and recover from failure', () => {
        const os = new RKFlowOperatingSystem();
        const mission = os.createMission('Full Wedding Film', 3);
        const cp = os.createCheckpoint(mission);
        assert.ok(cp.id);
        assert.strictEqual(mission.checkpoints.length, 1);

        const recovery = os.recoverFromFailure(mission, 'color_step', 'retry');
        assert.strictEqual(recovery.success, true);
        assert.strictEqual(recovery.recoveryStrategy, 'retry');
    });

    it('Batch 50: should generate mission report with system health', () => {
        const os = new RKFlowOperatingSystem();
        const mission = os.createMission('Archive Project', 2);
        const report = os.generateReport(mission);
        assert.strictEqual(report.missionId, mission.id);
        assert.ok(report.systemHealth);
        assert.strictEqual(report.systemHealth.sidecar, 'running');
    });

    it('Batch 50: should throw on invalid state transitions', () => {
        const os = new RKFlowOperatingSystem();
        const mission = os.createMission('Test', 1);
        assert.throws(() => os.pauseMission(mission), /OS_SAFETY.*only pause a running/);
        assert.throws(() => os.resumeMission(mission), /OS_SAFETY.*only resume a paused/);
    });

});
