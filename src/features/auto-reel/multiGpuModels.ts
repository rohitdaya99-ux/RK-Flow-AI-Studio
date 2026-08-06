export interface ComputeDevice {
    id: string;
    name: string;
    type: 'CPU' | 'Apple Silicon GPU' | 'CUDA' | 'ROCm' | 'DirectML';
    vramMb: number;
}

export interface ComputeFallbackReport {
    primaryDevice: ComputeDevice;
    fallbackTriggered: boolean;
    fallbackDevice?: ComputeDevice;
    reason?: 'VRAM Exceeded' | 'Thermal Throttling' | 'Unsupported Operation';
    deterministic: boolean;
}
