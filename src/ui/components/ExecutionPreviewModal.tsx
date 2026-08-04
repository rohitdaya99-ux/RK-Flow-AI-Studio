import { useEffect, useState } from "react";
import { approveExecutionPreview, PreviewRequest, rejectExecutionPreview, subscribeExecutionPreview } from "../../core/execution/PreviewGate";
import { Button, Card } from "../theme/primitives";
import { colors, spacing, typography } from "../theme";

const DESTRUCTIVE_NOTES = "This will send Premiere actions through the live executor. Review before continuing.";

export default function ExecutionPreviewModal() {
  const [request, setRequest] = useState<PreviewRequest | null>(null);

  useEffect(() => {
    return subscribeExecutionPreview(setRequest);
  }, []);

  if (!request) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1200,
        padding: spacing.lg
      }}
    >
      <Card title={`Preview: ${request.summary}`} subtitle={DESTRUCTIVE_NOTES} style={{ width: "min(640px, 100%)" }}>
        <div
          style={{
            maxHeight: 320,
            overflow: "auto",
            borderRadius: 10,
            border: `1px solid ${colors.border}`,
            background: colors.white,
            padding: spacing.sm
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
            {request.commands.map((command) => (
              <div
                key={command.id}
                style={{
                  borderBottom: `1px solid ${colors.border}`,
                  paddingBottom: spacing.sm
                }}
              >
                <div style={{ color: colors.maroonDeep, fontWeight: 700 }}>{command.action}</div>
                <pre
                  style={{
                    margin: `${spacing.xs}px 0 0`,
                    color: colors.inkMuted,
                    fontSize: typography.sizes.xs,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word"
                  }}
                >
                  {JSON.stringify(command.payload, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: spacing.sm, marginTop: spacing.md }}>
          <Button variant="secondary" onClick={rejectExecutionPreview}>
            Cancel
          </Button>
          <Button onClick={approveExecutionPreview}>
            Confirm
          </Button>
        </div>
      </Card>
    </div>
  );
}
