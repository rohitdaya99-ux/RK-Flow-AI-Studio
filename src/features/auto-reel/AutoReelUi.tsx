import { CSSProperties } from "react";
import { colors, shadows, spacing, typography } from "../../ui/theme";

export function Field({
  label,
  children,
  flex,
  error
}: {
  label: string;
  children: React.ReactNode;
  flex?: string;
  error?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs, flex: flex ?? "1 1 100%", minWidth: 0 }}>
      <label style={{ color: colors.maroonDeep, fontWeight: 700, fontSize: typography.sizes.sm }}>{label}</label>
      {children}
      {error ? <div style={{ color: colors.danger, fontSize: typography.sizes.xs }}>{error}</div> : null}
    </div>
  );
}

export function SelectionGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.sm, minWidth: 0 }}>{children}</div>;
}

export function SelectableChip({
  active,
  label,
  onClick
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} style={selectableChipStyle(active)}>
      {label}
    </button>
  );
}

export function titleCase(value: string): string {
  return value.replaceAll("-", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export const sectionWrapStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: spacing.lg,
  alignItems: "stretch",
  minWidth: 0
};

export const formRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: spacing.md,
  minWidth: 0
};

export const fieldStyle: CSSProperties = {
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  background: "rgba(255,255,255,0.78)",
  color: colors.ink,
  padding: `${spacing.sm}px ${spacing.md}px`,
  fontSize: typography.sizes.sm,
  backdropFilter: "blur(8px)"
};

export const checkboxRowStyle: CSSProperties = {
  display: "flex",
  gap: spacing.sm,
  alignItems: "center",
  color: colors.ink,
  lineHeight: 1.5
};

export const helperTextStyle: CSSProperties = {
  color: colors.inkMuted,
  fontSize: typography.sizes.xs,
  lineHeight: 1.5
};

export const glassCardStyle: CSSProperties = {
  background: "linear-gradient(180deg, rgba(255,249,242,0.92), rgba(255,249,242,0.84))",
  boxShadow: shadows.raised,
  backdropFilter: "blur(14px)",
  transition: "box-shadow 160ms ease, transform 160ms ease"
};

export const nestedCardStyle: CSSProperties = {
  background: "rgba(255,255,255,0.64)",
  boxShadow: `0 10px 24px ${colors.shadow}`,
  backdropFilter: "blur(12px)"
};

export const uploadLabelStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  background: "rgba(255,255,255,0.78)",
  color: colors.ink,
  padding: `${spacing.sm}px ${spacing.md}px`,
  cursor: "pointer",
  backdropFilter: "blur(8px)"
};

export const previewImageStyle: CSSProperties = {
  width: "100%",
  maxWidth: 140,
  aspectRatio: "1 / 1",
  objectFit: "cover",
  borderRadius: 10,
  border: `1px solid ${colors.border}`,
  boxShadow: `0 10px 18px ${colors.shadow}`
};

export const planningTextPanelStyle: CSSProperties = {
  padding: spacing.md,
  borderRadius: 12,
  background: "linear-gradient(135deg, rgba(239,228,210,0.58), rgba(255,255,255,0.72))",
  color: colors.ink,
  lineHeight: 1.7,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7), 0 12px 24px ${colors.shadow}`
};

export const phaseRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: spacing.xs,
  padding: spacing.md,
  borderRadius: 12,
  background: "rgba(255,255,255,0.64)",
  boxShadow: `0 8px 18px ${colors.shadow}`
};

export const codeBlockStyle: CSSProperties = {
  margin: 0,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontSize: typography.sizes.xs,
  lineHeight: 1.5,
  color: colors.ink
};

export const referenceCardStyle = (wide: boolean): CSSProperties => ({
  padding: spacing.md,
  borderRadius: 12,
  background: "rgba(255,255,255,0.58)",
  boxShadow: `0 8px 18px ${colors.shadow}`,
  minWidth: 0,
  transition: "transform 160ms ease, box-shadow 160ms ease",
  transform: wide ? "translateY(0)" : "none"
});

export const logEntryStyle = (withDivider: boolean): CSSProperties => ({
  paddingBottom: spacing.sm,
  borderBottom: withDivider ? `1px solid ${colors.cream}` : "none",
  color: colors.ink,
  lineHeight: 1.6
});

export const selectableChipStyle = (active: boolean): CSSProperties => ({
  borderRadius: 999,
  border: `1px solid ${active ? colors.maroon : colors.border}`,
  background: active ? colors.maroon : "rgba(255,255,255,0.7)",
  color: active ? colors.white : colors.ink,
  padding: `${spacing.xs}px ${spacing.md}px`,
  cursor: "pointer",
  transition: "background 160ms ease, color 160ms ease, box-shadow 160ms ease",
  boxShadow: active ? `0 8px 18px ${colors.shadow}` : "none",
  minWidth: 0,
  textAlign: "left"
});
