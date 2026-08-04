import { CSSProperties, ReactNode } from "react";
import { colors, radius, shadows, spacing, typography } from "./tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";

export function Card({
  title,
  subtitle,
  children,
  style
}: {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section
      style={{
        background: colors.panel,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        boxShadow: shadows.soft,
        padding: spacing.lg,
        minWidth: 0,
        ...style
      }}
    >
      {title && (
        <h3
          style={{
            margin: 0,
            color: colors.maroonDeep,
            fontFamily: typography.heading,
            fontSize: typography.sizes.lg
          }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p
          style={{
            margin: `${spacing.xs}px 0 0`,
            color: colors.inkMuted,
            fontSize: typography.sizes.sm
          }}
        >
          {subtitle}
        </p>
      )}
      {children && <div style={{ marginTop: title || subtitle ? spacing.md : 0 }}>{children}</div>}
    </section>
  );
}

export function Button({
  children,
  variant = "primary",
  style,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: {
      background: colors.maroon,
      color: colors.white,
      border: `1px solid ${colors.maroon}`
    },
    secondary: {
      background: colors.panelMuted,
      color: colors.maroonDeep,
      border: `1px solid ${colors.border}`
    },
    ghost: {
      background: "transparent",
      color: colors.ink,
      border: `1px solid ${colors.border}`
    }
  };

  return (
    <button
      {...props}
      style={{
        borderRadius: radius.md,
        padding: `${spacing.sm}px ${spacing.md}px`,
        fontSize: typography.sizes.sm,
        fontWeight: 600,
        cursor: props.disabled ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        ...variants[variant],
        ...style
      }}
    >
      {children}
    </button>
  );
}

export function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      variant="ghost"
      style={{
        width: 40,
        height: 40,
        padding: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.style
      }}
    >
      {children}
    </Button>
  );
}

export function StatusChip({
  label,
  tone = "neutral"
}: {
  label: string | number;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const toneMap = {
    neutral: { bg: colors.panelMuted, fg: colors.ink },
    success: { bg: "#E5F5EC", fg: colors.success },
    warning: { bg: "#FAF0D8", fg: colors.warning },
    danger: { bg: "#F8E0DE", fg: colors.danger }
  } as const;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.xs,
        borderRadius: radius.pill,
        padding: "6px 10px",
        background: toneMap[tone].bg,
        color: toneMap[tone].fg,
        fontSize: typography.sizes.xs,
        fontWeight: 700
      }}
    >
      {normalizeChipLabel(label)}
    </span>
  );
}

export function ProgressBar({
  value,
  label
}: {
  value: number;
  label?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.xs }}>
      {label && (
        <div style={{ color: colors.inkMuted, fontSize: typography.sizes.sm }}>
          {label}
        </div>
      )}
      <div
        style={{
          height: 10,
          background: colors.cream,
          borderRadius: radius.pill,
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${Math.max(0, Math.min(100, value))}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${colors.gold}, ${colors.maroon})`
          }}
        />
      </div>
    </div>
  );
}

function normalizeChipLabel(value: string | number): string {
  return typeof value === "string" ? value : String(value);
}

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      multiline?: boolean;
    }
) {
  const common: CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    background: colors.white,
    color: colors.ink,
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: typography.sizes.sm
  };

  if (props.multiline) {
    return <textarea {...props} style={{ ...common, resize: "vertical", ...props.style }} />;
  }

  return <input {...props} style={{ ...common, ...props.style }} />;
}

export function Textarea({
  rows = 5,
  style,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={rows}
      style={{
        display: "block",
        width: "100%",
        minHeight: 128,
        boxSizing: "border-box",
        borderRadius: radius.md,
        border: `1px solid ${colors.border}`,
        background: colors.white,
        color: colors.ink,
        padding: `${spacing.sm}px ${spacing.md}px`,
        fontSize: typography.sizes.sm,
        fontFamily: "inherit",
        lineHeight: 1.5,
        resize: "vertical",
        ...style
      }}
    />
  );
}

export function Tabs({
  items,
  active,
  onChange
}: {
  items: Array<{ id: string; label: string }>;
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: spacing.xs, flexWrap: "wrap" }}>
      {items.map((item) => (
        <Button
          key={item.id}
          variant={item.id === active ? "primary" : "secondary"}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

export function Modal({
  open,
  title,
  children
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(43,35,32,0.24)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg
      }}
    >
      <Card title={title} style={{ width: "min(560px, 100%)" }}>
        {children}
      </Card>
    </div>
  );
}

export function ScrollArea({
  children,
  style
}: {
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        overflow: "auto",
        minWidth: 0,
        minHeight: 0,
        ...style
      }}
    >
      {children}
    </div>
  );
}
