import { ReactNode } from "react";
import { Card, StatusChip } from "../theme/primitives";
import { colors, spacing, typography } from "../theme";

export interface ClipGridItem {
  id: string;
  title: string;
  subtitle: string;
  badges: string[];
  score?: number;
  detail?: ReactNode;
}

export default function ClipGrid({
  items,
  emptyLabel
}: {
  items: ClipGridItem[];
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return (
      <Card title="No clips">
        <div style={{ color: colors.inkMuted }}>{emptyLabel}</div>
      </Card>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: spacing.md
      }}
    >
      {items.map((item) => (
        <Card key={item.id} title={item.title} subtitle={item.subtitle} style={{ flex: "1 1 240px" }}>
          <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
            {item.badges.map((badge) => (
              <StatusChip key={badge} label={badge} />
            ))}
            {item.score !== undefined && (
              <StatusChip label={`AI Rating ${item.score}`} tone={item.score >= 70 ? "success" : item.score >= 45 ? "warning" : "danger"} />
            )}
          </div>
          {item.detail && (
            <div style={{ marginTop: spacing.md, color: colors.inkMuted, fontSize: typography.sizes.sm }}>
              {item.detail}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
