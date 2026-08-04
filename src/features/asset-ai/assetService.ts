import { clipManager } from "../../services/premiere/clips/ClipManager";
import { premiereAPI } from "../../services/PremiereAPI";
import { BrainSequenceContext, ClipTechnicalScore, EmotionClipAnalysis, FaceCluster, WeddingSegment } from "../../core/brain/types";
import { MemoryEngine } from "../../core/brain";
import { AssetCollection, AssetMetadata, AssetRecord } from "./assetTypes";

const memory = new MemoryEngine();
const COLLECTION_SCOPE = "asset-ai";
const COLLECTION_KEY = "collections";

export async function readAssetRecords(
  context: BrainSequenceContext | null
): Promise<{
  assets: AssetRecord[];
  sourceNote: string;
}> {
  const projectAssets = await readProjectAssets();

  if (projectAssets.length > 0) {
    return {
      assets: enrichAssets(projectAssets, context),
      sourceNote: "Scanned active Premiere project items and merged cached AI tags."
    };
  }

  const selectedAssets = await readSelectedClipAssets();
  return {
    assets: enrichAssets(selectedAssets, context),
    sourceNote:
      selectedAssets.length > 0
        ? "Project-wide item scan was unavailable in this host session, so Asset AI is showing the current selection only."
        : "No readable project items or selected clips were available from Premiere."
  };
}

export function getCollections(): AssetCollection[] {
  return memory.getAnalysis<AssetCollection[]>(COLLECTION_SCOPE, COLLECTION_KEY) ?? [];
}

export function saveCollection(name: string, assetIds: string[]) {
  const collections = getCollections();
  const next: AssetCollection = {
    id: `${Date.now()}-${name.toLowerCase().replace(/\s+/g, "-")}`,
    name: name.trim(),
    assetIds,
    createdAt: new Date().toISOString()
  };

  memory.setAnalysis(COLLECTION_SCOPE, COLLECTION_KEY, [next, ...collections]);
}

export function deleteCollection(collectionId: string) {
  const collections = getCollections().filter((collection) => collection.id !== collectionId);
  memory.setAnalysis(COLLECTION_SCOPE, COLLECTION_KEY, collections);
}

async function readProjectAssets(): Promise<AssetRecord[]> {
  try {
    const project = await premiereAPI.getCurrentProject();
    const rootItem = project?.rootItem ?? project?.getRootItem?.();
    const items = await collectProjectItems(rootItem);
    return dedupeAssets(items);
  } catch (error) {
    console.warn("[RK Flow] Asset AI could not enumerate project items.", error);
    return [];
  }
}

async function readSelectedClipAssets(): Promise<AssetRecord[]> {
  const clips = await clipManager.getSelectedClips();

  return Promise.all(clips.map(async (clip, index) => {
    const projectItemId = await readString(() => clip.projectItem?.getId?.());
    const nodeId = readNodeId(clip.projectItem);
    return {
      id: assetId(projectItemId ?? nodeId ?? clip.mediaType ?? clip.name, `${index}`),
      projectItemId,
      nodeId,
      parentId: null,
      ancestorIds: [],
      name: clip.name,
      type: clip.mediaType || clip.type || "clip",
      mediaPath: await readString(() => clip.projectItem?.getMediaPath?.()),
      source: "selection" as const,
      clipId: `${clip.name}::${clip.track}::${clip.start.toFixed(3)}::${index}`,
      tags: [],
      duplicateGroup: null,
      metadata: {
        resolution: null,
        codec: null,
        durationSeconds: clip.duration,
        frameRate: null
      }
    };
  }));
}

async function collectProjectItems(
  rootItem: any,
  parentId: string | null = null,
  ancestorIds: string[] = []
): Promise<AssetRecord[]> {
  if (!rootItem) {
    return [];
  }

  const items: AssetRecord[] = [];
  const children = await readProjectChildren(rootItem);

  for (let index = 0; index < children.length; index += 1) {
    const item = children[index];
    if (!item) {
      continue;
    }

    const type = await readItemType(item);
    const mediaPath = await readString(() => item.getMediaPath?.());
    const projectItemId = await readString(() => item.getId?.());
    const nodeId = readPlain(item.nodeId);
    const name = String(readPlain(item.name) ?? `Item ${index + 1}`);
    const metadata = await readMetadata(item);
    const assetKey = assetId(projectItemId ?? nodeId ?? name, mediaPath);

    if (type !== "bin" && type !== "root") {
      items.push({
        id: assetKey,
        projectItemId,
        nodeId: typeof nodeId === "string" ? nodeId : typeof nodeId === "number" ? String(nodeId) : null,
        parentId,
        ancestorIds,
        name,
        type,
        mediaPath,
        source: "project",
        clipId: null,
        tags: [],
        duplicateGroup: null,
        metadata
      });
    }

    if (type === "bin" || type === "root" || typeof item?.getItems === "function" || item?.children) {
      items.push({
        id: assetKey,
        projectItemId,
        nodeId: typeof nodeId === "string" ? nodeId : typeof nodeId === "number" ? String(nodeId) : null,
        parentId,
        ancestorIds,
        name,
        type,
        mediaPath,
        source: "project",
        clipId: null,
        tags: [],
        duplicateGroup: null,
        metadata
      });
      items.push(...(await collectProjectItems(item, assetKey, [...ancestorIds, assetKey])));
    }
  }

  return items;
}

async function readMetadata(item: any): Promise<AssetMetadata> {
  const resolution = await readResolution(item);
  const frameRate = await readFrameRate(item);
  const durationSeconds = await readDuration(item);
  const codec = await readCodec(item);

  return {
    resolution,
    codec,
    durationSeconds,
    frameRate
  };
}

async function readResolution(item: any): Promise<string | null> {
  const direct =
    (await readPlainAsync(item.getFrameSize?.bind(item))) ??
    (await readPlainAsync(item.getFootageInterpretation?.bind(item)));

  if (direct && typeof direct === "object") {
    const width = parseNumber((direct as Record<string, unknown>).width);
    const height = parseNumber((direct as Record<string, unknown>).height);

    if (width && height) {
      return `${width}x${height}`;
    }
  }

  const xmp = await readString(() => item.getXMPMetadata?.());
  if (!xmp) {
    return null;
  }

  const widthMatch = xmp.match(/frameSizeHorizontal[^>]*>(\d+)</i);
  const heightMatch = xmp.match(/frameSizeVertical[^>]*>(\d+)</i);

  if (widthMatch && heightMatch) {
    return `${widthMatch[1]}x${heightMatch[1]}`;
  }

  return null;
}

async function readFrameRate(item: any): Promise<number | null> {
  const interpretation = await readPlainAsync(item.getFootageInterpretation?.bind(item));

  if (interpretation && typeof interpretation === "object") {
    const frameRate = parseNumber((interpretation as Record<string, unknown>).frameRate);
    if (frameRate !== null) {
      return frameRate;
    }
  }

  return null;
}

async function readDuration(item: any): Promise<number | null> {
  const duration = await readPlainAsync(item.getOutPoint?.bind(item));

  if (duration && typeof duration === "object") {
    const ticks = parseNumber((duration as Record<string, unknown>).ticks);
    if (ticks !== null) {
      return ticks / 254016000000;
    }
  }

  return null;
}

async function readCodec(item: any): Promise<string | null> {
  const projectMetadata = await readString(() => item.getProjectMetadata?.());
  const xmpMetadata = await readString(() => item.getXMPMetadata?.());
  const metadata = `${projectMetadata ?? ""}\n${xmpMetadata ?? ""}`;

  const codecMatch =
    metadata.match(/codec[^>]*>([^<]+)</i) ??
    metadata.match(/CompressorName[^>]*>([^<]+)</i) ??
    metadata.match(/videoCodec[^>]*>([^<]+)</i);

  return codecMatch?.[1]?.trim() || null;
}

function enrichAssets(assets: AssetRecord[], context: BrainSequenceContext | null): AssetRecord[] {
  const sequenceKey = context?.sequenceKey ?? "";
  const wedding = sequenceKey ? memory.getAnalysis<{ segments: WeddingSegment[] }>(`wedding-ai:${sequenceKey}`, "result") : null;
  const face = sequenceKey ? memory.getAnalysis<{ clusters: FaceCluster[] }>(`face-ai:${sequenceKey}`, "result") : null;
  const emotion = sequenceKey ? memory.getAnalysis<{ clips: EmotionClipAnalysis[] }>(`emotion-ai:${sequenceKey}`, "result") : null;
  const clipIntelligence = sequenceKey
    ? memory.getAnalysis<{ clips: ClipTechnicalScore[] }>(`clip-intelligence:${sequenceKey}`, "result")
    : null;

  return assets.map((asset) => {
    const clipId = asset.clipId ?? findClipIdForAsset(asset, context);
    const tags = new Set(asset.tags);

    if (clipId) {
      for (const segment of wedding?.segments ?? []) {
        if (segment.id === clipId || segment.id.includes(asset.name)) {
          tags.add(segment.label);
        }
      }

      for (const cluster of face?.clusters ?? []) {
        if (cluster.clipIds.includes(clipId)) {
          tags.add(cluster.role);
          tags.add(cluster.label);
        }
      }

      const emotionHit = emotion?.clips.find((clip) => clip.clipId === clipId);
      for (const emotionTag of emotionHit?.emotions ?? []) {
        tags.add(emotionTag);
      }
    }

    const duplicateGroup =
      clipId
        ? clipIntelligence?.clips.find((clip) => clip.clipId === clipId)?.duplicateGroup ?? null
        : findDuplicateByPath(asset, assets);

    if (duplicateGroup) {
      tags.add("duplicate");
    }

    return {
      ...asset,
      clipId,
      tags: Array.from(tags).filter(Boolean).sort(),
      duplicateGroup
    };
  });
}

function findClipIdForAsset(asset: AssetRecord, context: BrainSequenceContext | null) {
  return (
    context?.selectedClips.find((clip) => {
      if (asset.mediaPath && clip.name === asset.name) {
        return true;
      }

      return clip.name === asset.name;
    })?.id ?? null
  );
}

function findDuplicateByPath(asset: AssetRecord, assets: AssetRecord[]) {
  if (!asset.mediaPath) {
    return null;
  }

  const matches = assets.filter((candidate) => candidate.mediaPath === asset.mediaPath);
  return matches.length > 1 ? matches[0].id : null;
}

function dedupeAssets(items: AssetRecord[]) {
  const deduped = new Map<string, AssetRecord>();

  for (const item of items) {
    deduped.set(item.id, item);
  }

  return Array.from(deduped.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function assetId(primary: unknown, secondary: unknown) {
  return String(primary ?? secondary ?? `asset-${Math.random().toString(16).slice(2)}`);
}

async function readProjectChildren(item: any): Promise<any[]> {
  const getItems = item?.getItems;
  if (typeof getItems === "function") {
    try {
      const values = await getItems.call(item);
      return Array.isArray(values) ? values : [];
    } catch {
      return [];
    }
  }

  const children = item?.children;
  const count = typeof children?.numItems === "number" ? children.numItems : 0;
  const values: any[] = [];
  for (let index = 0; index < count; index += 1) {
    values.push(children[index]);
  }
  return values;
}

async function readItemType(item: any) {
  const type = readPlain(item.type);

  if (type === 2) return "bin";
  if (type === 3) return "root";
  if (type === 1 || type === 4) return "clip";

  return typeof type === "string" ? type : "clip";
}

function readPlain(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? value : null;
}

function readNodeId(item: any): string | null {
  const value = readPlain(item?.nodeId);
  return value === null ? null : String(value);
}

async function readPlainAsync(method?: (() => Promise<unknown>) | (() => unknown)) {
  if (!method) {
    return null;
  }

  try {
    return await method();
  } catch {
    return null;
  }
}

async function readString(method: () => Promise<unknown> | unknown) {
  try {
    const value = await method();
    return typeof value === "string" && value.trim() ? value : null;
  } catch {
    return null;
  }
}

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}
