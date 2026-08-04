import { TimelineIssue } from "../../core/brain/types";
import { Button, Card } from "../../ui/theme/primitives";
import { colors, spacing } from "../../ui/theme";

interface ConfirmActionModalProps {
  issue: TimelineIssue;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmActionModal({ issue, onConfirm, onCancel }: ConfirmActionModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Card title={`Confirm: ${issue.title}`}>
        <p style={{ color: colors.ink, margin: `0 0 ${spacing.md} 0` }}>{issue.detail}</p>
        <p style={{ color: colors.inkMuted, margin: `0 0 ${spacing.lg} 0` }}>
          Are you sure you want to apply this fix? This action can be undone with Ctrl+Z.
        </p>
        <div style={{ display: "flex", gap: spacing.sm, justifyContent: "flex-end" }}>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Card>
    </div>
  );
}
