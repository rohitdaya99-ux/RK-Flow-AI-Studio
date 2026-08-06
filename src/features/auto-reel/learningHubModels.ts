// ============================================================
// BATCH 47: AI Learning Hub — Models
// Isolated from production projects. No silent modifications.
// ============================================================

export interface LearningPath {
    id: string;
    name: string;
    description: string;
    modules: LearningModule[];
    estimatedHours: number;
}

export interface LearningModule {
    id: string;
    name: string;
    area: LearningArea;
    lessons: Lesson[];
}

export type LearningArea =
    | 'premiere_workflow' | 'timeline_fundamentals' | 'clip_selection'
    | 'wedding_storytelling' | 'pacing' | 'music_editing' | 'emotion_editing'
    | 'transitions' | 'motion' | 'color' | 'audio' | 'sfx' | 'titles'
    | 'captions' | 'export' | 'client_review' | 'studio_workflow'
    | 'rk_flow_modules' | 'ai_safety' | 'project_recovery';

export interface Lesson {
    id: string;
    title: string;
    content: string;
    type: 'guided' | 'quiz' | 'challenge' | 'walkthrough';
    completed: boolean;
}

export interface PracticeProject {
    id: string;
    name: string;
    isolated: boolean; // Must always be true
    productionProjectId?: never; // Structurally prevents linking to production
    description: string;
}

export interface SkillAssessment {
    area: LearningArea;
    score: number;
    maxScore: number;
    feedback: string;
}

export interface ProgressRecord {
    userId: string;
    completedLessons: string[];
    assessments: SkillAssessment[];
    weakAreas: LearningArea[];
    recommendedModules: string[];
    confidence: number;
}

export interface LearningRecommendation {
    moduleId: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
}
