export interface Position {
  x: number;
  y: number;
}

export interface Scale {
  x: number;
  y: number;
}

export interface Rotation {
  angle: number;
}

export interface MotionOptions {
  trackIndex?: number;
  clipIndex?: number;
}

export interface MotionPreset extends MotionOptions {
  position?: Position;
  scale?: Scale;
  rotation?: Rotation;
}