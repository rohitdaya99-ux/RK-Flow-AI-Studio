export interface AssetMetadata {
  resolution: string | null;
  codec: string | null;
  durationSeconds: number | null;
  frameRate: number | null;
}

export interface AssetRecord {
  id: string;
  name: string;
  type: string;
  mediaPath: string | null;
  source: "project" | "selection";
  clipId: string | null;
  tags: string[];
  duplicateGroup: string | null;
  metadata: AssetMetadata;
}

export interface AssetCollection {
  id: string;
  name: string;
  assetIds: string[];
  createdAt: string;
}
