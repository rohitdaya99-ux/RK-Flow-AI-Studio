import { useEffect, useMemo, useState } from "react";
import { BrainSequenceContext } from "../../core/brain/types";
import { useSequenceAnalysis } from "../perception/useSequenceAnalysis";
import { Button, Card, Input, ProgressBar, StatusChip } from "../../ui/theme/primitives";
import { colors, spacing, typography } from "../../ui/theme";
import { AssetCollection } from "./assetTypes";
import {
  deleteCollection,
  getCollections,
  readAssetRecords,
  saveCollection
} from "./assetService";

export default function AssetAIScreen() {
  const [query, setQuery] = useState("");
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [collectionName, setCollectionName] = useState("");
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
  const [collections, setCollections] = useState<AssetCollection[]>(() => getCollections());

  const { context, result, loading, progress, error, reanalyze } = useSequenceAnalysis({
    moduleId: "asset-ai",
    analyze: async (sequenceContext: BrainSequenceContext, onProgress) => {
      onProgress("Reading project assets and cached tags...");
      return readAssetRecords(sequenceContext);
    }
  });

  useEffect(() => {
    setCollections(getCollections());
  }, [result]);

  const assets = result?.assets ?? [];
  const filteredAssets = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return assets;
    }

    return assets.filter((asset) => {
      return (
        asset.name.toLowerCase().includes(term) ||
        asset.mediaPath?.toLowerCase().includes(term) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    });
  }, [assets, query]);

  const selectedAsset =
    filteredAssets.find((asset) => asset.id === selectedAssetId) ??
    assets.find((asset) => asset.id === selectedAssetId) ??
    null;

  function toggleAsset(assetId: string) {
    setSelectedAssetIds((current) =>
      current.includes(assetId)
        ? current.filter((id) => id !== assetId)
        : [...current, assetId]
    );
  }

  function createCollection() {
    if (!collectionName.trim() || selectedAssetIds.length === 0) {
      return;
    }

    saveCollection(collectionName, selectedAssetIds);
    setCollectionName("");
    setSelectedAssetIds([]);
    setCollections(getCollections());
  }

  function removeCollection(collectionId: string) {
    deleteCollection(collectionId);
    setCollections(getCollections());
  }

  if (!context) {
    return <Card title="Asset AI">Open a sequence to inspect Premiere assets.</Card>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
      <Card title="Asset AI" subtitle={result?.sourceNote ?? "Project asset inspection"}>
        <div style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap", justifyContent: "space-between" }}>
          <Input
            placeholder="Search by asset name, path, or tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            style={{ maxWidth: 320 }}
          />
          <Button variant="secondary" onClick={() => void reanalyze()} disabled={loading}>
            Refresh Assets
          </Button>
        </div>
        <div style={{ marginTop: spacing.md, display: "flex", flexDirection: "column", gap: spacing.sm }}>
          {loading && <ProgressBar value={progress.percent} label={`${progress.completed}/${progress.total} steps`} />}
          <div style={{ color: error ? colors.danger : colors.inkMuted }}>
            {error || progress.label}
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md, alignItems: "flex-start" }}>
        <Card title={`Assets (${filteredAssets.length})`} subtitle="Tags reuse cached Wedding AI, Face AI, Emotion AI, and Clip Intelligence results." style={{ flex: "2 1 520px" }}>
          {filteredAssets.length === 0 ? (
            <div style={{ color: colors.inkMuted }}>
              No assets matched the current search. Project-wide scanning depends on host-readable project items; if unavailable, this screen falls back to the current selection.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {filteredAssets.map((asset) => (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => setSelectedAssetId(asset.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    borderRadius: 10,
                    border: `1px solid ${selectedAssetId === asset.id ? colors.gold : colors.border}`,
                    background: selectedAssetId === asset.id ? colors.panelMuted : colors.white,
                    padding: spacing.sm,
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>{asset.name}</div>
                      <div style={{ color: colors.inkMuted, fontSize: typography.sizes.xs }}>
                        {asset.mediaPath ?? "No media path exposed by this host item"}
                      </div>
                    </div>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: spacing.xs }}>
                      <input
                        type="checkbox"
                        checked={selectedAssetIds.includes(asset.id)}
                        onChange={() => toggleAsset(asset.id)}
                        onClick={(event) => event.stopPropagation()}
                      />
                      Collection
                    </label>
                  </div>
                  <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap", marginTop: spacing.sm }}>
                    <StatusChip label={asset.source === "project" ? "Project item" : "Selection fallback"} tone={asset.source === "project" ? "success" : "warning"} />
                    <StatusChip label={asset.type} />
                    {asset.duplicateGroup && <StatusChip label="Duplicate candidate" tone="warning" />}
                    {asset.tags.map((tag) => (
                      <StatusChip key={`${asset.id}-${tag}`} label={tag} />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, flex: "1 1 320px" }}>
          <Card title="Metadata Panel" subtitle="Only real host-exposed values are shown. Missing fields remain blank.">
            {selectedAsset ? (
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
                <MetaRow label="Name" value={selectedAsset.name} />
                <MetaRow label="Path" value={selectedAsset.mediaPath ?? "—"} />
                <MetaRow label="Resolution" value={selectedAsset.metadata.resolution ?? "—"} />
                <MetaRow label="Codec" value={selectedAsset.metadata.codec ?? "—"} />
                <MetaRow
                  label="Duration"
                  value={
                    selectedAsset.metadata.durationSeconds !== null
                      ? `${selectedAsset.metadata.durationSeconds.toFixed(2)}s`
                      : "—"
                  }
                />
                <MetaRow
                  label="Frame rate"
                  value={
                    selectedAsset.metadata.frameRate !== null
                      ? `${selectedAsset.metadata.frameRate.toFixed(3)} fps`
                      : "—"
                  }
                />
              </div>
            ) : (
              <div style={{ color: colors.inkMuted }}>Choose an asset to inspect its metadata.</div>
            )}
          </Card>

          <Card title="Collections" subtitle="Local-only grouping persisted in MemoryEngine.">
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              <Input
                placeholder="Collection name"
                value={collectionName}
                onChange={(event) => setCollectionName(event.target.value)}
              />
              <Button onClick={createCollection} disabled={!collectionName.trim() || selectedAssetIds.length === 0}>
                Save Collection ({selectedAssetIds.length})
              </Button>
              {collections.length === 0 ? (
                <div style={{ color: colors.inkMuted }}>No saved collections yet.</div>
              ) : (
                collections.map((collection) => (
                  <div
                    key={collection.id}
                    style={{
                      border: `1px solid ${colors.border}`,
                      borderRadius: 10,
                      padding: spacing.sm,
                      background: colors.white
                    }}
                  >
                    <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>{collection.name}</div>
                    <div style={{ color: colors.inkMuted, marginTop: spacing.xs }}>
                      {collection.assetIds.length} asset{collection.assetIds.length === 1 ? "" : "s"} • {new Date(collection.createdAt).toLocaleString()}
                    </div>
                    <div style={{ marginTop: spacing.sm }}>
                      <Button variant="ghost" onClick={() => removeCollection(collection.id)}>
                        Delete Collection
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: spacing.sm, borderBottom: `1px solid ${colors.border}`, paddingBottom: spacing.xs }}>
      <span style={{ color: colors.inkMuted }}>{label}</span>
      <span style={{ color: colors.ink, textAlign: "right", wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}
