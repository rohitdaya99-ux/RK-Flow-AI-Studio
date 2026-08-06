// ============================================================
// BATCH 44: AI Social Media Manager — Models
// Planning and draft only. Publishing requires explicit approval.
// ============================================================

export type SocialPlatform = 'Instagram' | 'YouTube' | 'Facebook' | 'LinkedIn' | 'Pinterest' | 'Website';

export type SocialContentType =
    | 'Reel' | 'Short' | 'Feed Video' | 'Carousel' | 'Story'
    | 'Trailer' | 'Teaser' | 'Thumbnail' | 'Caption' | 'Hashtags'
    | 'Description' | 'Chapter Markers' | 'Community Post' | 'Portfolio Update';

export interface SocialAccount {
    id: string;
    platform: SocialPlatform;
    handle: string;
    authenticated: boolean;
    verified: boolean;
}

export interface SocialPostDraft {
    id: string;
    platform: SocialPlatform;
    contentType: SocialContentType;
    caption: string;
    hashtags: string[];
    mediaReferences: string[];
    scheduledDate?: string;
    timezone?: string;
    status: 'draft' | 'approved' | 'scheduled' | 'published' | 'failed' | 'cancelled';
}

export interface SocialMediaCalendar {
    id: string;
    drafts: SocialPostDraft[];
    campaignId?: string;
}

export interface SocialPublishRequest {
    postId: string;
    accountId: string;
    approvedMedia: boolean;
    approvedCopy: boolean;
    approvedSchedule: boolean;
    validatedPrivacy: boolean;
}

export interface SocialApproval {
    postId: string;
    approvedBy: string;
    approvedAt: string;
}

export interface SocialPerformanceRecord {
    postId: string;
    views?: number;
    reach?: number;
    watchTimeSeconds?: number;
    completionRate?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    saves?: number;
    clicks?: number;
    followersGained?: number;
    source: 'provider_data' | 'unavailable';
}

export interface SocialReport {
    totalDrafts: number;
    publishedPosts: number;
    blockedPosts: number;
    performance: SocialPerformanceRecord[];
    provider: string;
}
