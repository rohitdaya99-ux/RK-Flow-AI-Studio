export interface ClipSnapshot {
  id: string;
  name: string;
  track: number;
  type: "video" | "audio";
  inPoint?: number;
  outPoint?: number;
  duration?: number;
  selected?: boolean;
}
