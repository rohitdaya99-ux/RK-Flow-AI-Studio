// ============================================================
// BATCH 42: AI Marketing Engine — Models
// Draft-only by default. No auto-publishing.
// ============================================================

export type CampaignType =
    | 'wedding_portfolio' | 'engagement' | 'pre_wedding' | 'baby_shower'
    | 'luxury_wedding' | 'regional_wedding' | 'seasonal' | 'studio_introduction'
    | 'behind_the_scenes' | 'service_launch' | 'offer' | 'testimonial'
    | 'educational' | 'referral' | 'event_showcase' | 'custom';

export type BrandVoice =
    | 'luxury' | 'cinematic' | 'emotional' | 'premium' | 'friendly'
    | 'traditional' | 'modern' | 'documentary' | 'minimal' | 'energetic' | 'custom';

export interface BrandVoiceProfile {
    id: string;
    voice: BrandVoice;
    customDescription?: string;
    approvedAt?: string;
}

export interface AudienceProfile {
    demographics: string[];
    interests: string[];
    platforms: string[];
    location?: string;
}

export interface ContentPlan {
    objective: string;
    targetAudience: AudienceProfile;
    contentPillars: string[];
    postingSchedule: Array<{ date: string; platform: string; contentType: string }>;
    reelIdeas: string[];
    carouselIdeas: string[];
    storyIdeas: string[];
    captionDrafts: string[];
    callToActionDrafts: string[];
    thumbnailBriefs: string[];
}

export interface CampaignBrief {
    type: CampaignType;
    name: string;
    objective: string;
    audience: AudienceProfile;
    brandVoice: BrandVoiceProfile;
    platforms: string[];
    durationDays: number;
}

export interface MarketingApproval {
    assetsApproved: boolean;
    copyApproved: boolean;
    scheduleApproved: boolean;
    approvedBy: string;
    approvedAt: string;
}

export interface CampaignPerformanceReport {
    campaignId: string;
    reach: number;
    impressions: number;
    engagement: number;
    source: 'provider_data' | 'unavailable';
}

export interface MarketingCampaign {
    id: string;
    brief: CampaignBrief;
    contentPlan: ContentPlan;
    approval?: MarketingApproval;
    status: 'draft' | 'approved' | 'published' | 'completed' | 'cancelled';
    performance?: CampaignPerformanceReport;
    createdAt: string;
}
