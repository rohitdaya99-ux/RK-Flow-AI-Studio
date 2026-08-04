import { CSSProperties } from "react";
import { spacing } from "../ui/theme";

export const WORKSPACE_CONTENT_COLUMN_STYLE: CSSProperties = {
  flex: "1 1 auto",
  minWidth: 0,
  minHeight: 0,
  display: "flex",
  flexDirection: "column",
  gap: spacing.lg,
  overflow: "hidden"
};

export const WORKSPACE_SCROLL_REGION_STYLE: CSSProperties = {
  flex: "1 1 auto",
  minWidth: 0,
  minHeight: 0
};

export const NAV_LABEL_STACK_STYLE: CSSProperties = {
  textAlign: "left",
  minWidth: 0,
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: spacing.xs,
  overflow: "hidden"
};

export const NAV_TITLE_STYLE: CSSProperties = {
  display: "block",
  width: "100%",
  fontWeight: 700,
  lineHeight: 1.3
};

export const NAV_BADGE_ROW_STYLE: CSSProperties = {
  display: "flex",
  alignItems: "center",
  minWidth: 0
};

export function formatModuleNavLabel(title: string, phase: number): string {
  return `${title} Phase ${phase}`;
}
