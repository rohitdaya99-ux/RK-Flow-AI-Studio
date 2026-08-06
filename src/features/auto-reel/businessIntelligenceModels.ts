// ============================================================
// BATCH 41: AI Business Intelligence — Models
// Extends existing Studio ERP. Does NOT create a second ERP.
// ============================================================

export type MetricCategory = 'revenue' | 'cost' | 'margin' | 'capacity' | 'delivery' | 'quality' | 'client' | 'compute' | 'storage';

export interface BusinessMetric {
    name: string;
    category: MetricCategory;
    value: number;
    unit: string;
    period?: string;
    source: 'recorded' | 'calculated' | 'estimated';
}

export interface BusinessKPI {
    id: string;
    name: string;
    target: number;
    actual: number;
    unit: string;
    trend: 'improving' | 'stable' | 'declining' | 'insufficient_data';
}

export interface RevenueAnalysis {
    totalRecorded: number;
    monthlyBreakdown: Array<{ month: string; amount: number }>;
    topServices: Array<{ service: string; revenue: number }>;
    missingData: string[];
}

export interface CostAnalysis {
    totalRecorded: number;
    categories: Array<{ category: string; amount: number }>;
    computeCost: number;
    storageCost: number;
    providerCost: number;
    outsourcingCost: number;
    missingData: string[];
}

export interface ProfitabilityAnalysis {
    estimatedGrossMargin: number;
    projectProfitability: Array<{ projectId: string; margin: number }>;
    serviceProfitability: Array<{ service: string; margin: number }>;
    confidence: ForecastConfidence;
}

export interface CapacityAnalysis {
    editingCapacity: number;
    teamUtilization: number;
    renderUtilization: number;
    storageGrowthMbPerMonth: number;
    activeProjects: number;
    availableSlots: number;
}

export interface ForecastConfidence {
    level: 'high' | 'medium' | 'low' | 'insufficient_data';
    dataRange: string;
    assumptions: string[];
    missingData: string[];
    methodology: string;
    limitations: string[];
}

export interface PipelineForecast {
    expectedCompletionDates: Array<{ projectId: string; date: string }>;
    workloadPressure: 'low' | 'normal' | 'high' | 'critical';
    deliveryRisk: Array<{ projectId: string; risk: 'low' | 'medium' | 'high' }>;
    confidence: ForecastConfidence;
}

export interface DataCompletenessReport {
    totalFields: number;
    populatedFields: number;
    completenessPercent: number;
    missingCategories: string[];
}

export interface BusinessRecommendation {
    id: string;
    priority: 'high' | 'medium' | 'low';
    category: MetricCategory;
    recommendation: string;
    rationale: string;
    actionRequired: boolean;
}

export interface StudioHealthReport {
    overallHealth: 'healthy' | 'attention_needed' | 'at_risk' | 'insufficient_data';
    metrics: BusinessMetric[];
    kpis: BusinessKPI[];
    revenue?: RevenueAnalysis;
    costs?: CostAnalysis;
    profitability?: ProfitabilityAnalysis;
    capacity?: CapacityAnalysis;
    forecast?: PipelineForecast;
    dataCompleteness: DataCompletenessReport;
    recommendations: BusinessRecommendation[];
    generatedAt: string;
}
