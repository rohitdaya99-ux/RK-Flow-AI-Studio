export interface AssetMetadata {
  resolution: string | null;
  codec: string | null;
  durationSeconds: number | null;
  frameRate: number | null;
}

export interface AssetRecord {
  id: string;
  projectItemId: string | null;
  nodeId: string | null;
  parentId: string | null;
  ancestorIds: string[];
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
