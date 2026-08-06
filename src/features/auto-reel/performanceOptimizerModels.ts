export interface PerformanceMetric {
    cpuUsage: number;
    ramUsageMb: number;
    vramUsageMb: number;
    sidecarResponseTimeMs: number;
    cacheHitRatio: number;
}

export interface OptimizationRecommendation {
    action: 'cleanup_cache' | 'switch_to_proxies' | 'unload_models';
    impact: 'high' | 'medium' | 'low';
}

export interface ExecutionPerformanceReport {
    mode: 'Maximum Quality' | 'Balanced' | 'Maximum Speed' | 'Low Memory' | 'Battery Saver';
    metrics: PerformanceMetric;
    bottlenecks: string[];
    recommendations: OptimizationRecommendation[];
}
