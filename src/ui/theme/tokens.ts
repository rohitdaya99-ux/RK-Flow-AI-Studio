export const colors = {
  ivory: "#F7F1E8",
  cream: "#EFE4D2",
  parchment: "#E3D2BA",
  maroon: "#6C2230",
  maroonDeep: "#4A1621",
  gold: "#B28A4A",
  goldSoft: "#D6BC84",
  ink: "#2B2320",
  inkMuted: "#5A4B44",
  border: "#D9C9B4",
  panel: "#FFF9F2",
  panelMuted: "#F6EEE3",
  white: "#FFFFFF",
  success: "#2E7D5B",
  warning: "#A06C16",
  danger: "#A23A35",
  shadow: "rgba(78, 46, 32, 0.12)",
  shadowHeavy: "rgba(78, 46, 32, 0.18)"
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 18,
  pill: 999
} as const;

export const shadows = {
  soft: `0 8px 24px ${colors.shadow}`,
  raised: `0 14px 32px ${colors.shadowHeavy}`
} as const;

export const typography = {
  heading:
    "\"Iowan Old Style\", \"Palatino Linotype\", \"Book Antiqua\", Georgia, serif",
  body:
    "\"Avenir Next\", \"Segoe UI\", Helvetica, Arial, sans-serif",
  sizes: {
    xs: 12,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 24,
    xxl: 32
  }
} as const;
