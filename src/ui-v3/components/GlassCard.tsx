import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  height?: number;
};

export default function GlassCard({
  title,
  subtitle,
  children,
  height
}: Props) {
  return (
    <div
      style={{
        minHeight: height ?? 220,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 28,
        padding: 24,
        background:
          "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.04))",
        border: "1px solid rgba(255,255,255,.08)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow:
          "0 20px 60px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08)",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#F8FAFC",
          flexShrink: 0
        }}
      >
        {title}
      </div>

      {subtitle && (
        <div
          style={{
            marginTop: 8,
            color: "#94A3B8",
            fontSize: 14,
            flexShrink: 0
          }}
        >
          {subtitle}
        </div>
      )}

      <div
        style={{
          marginTop: 20,
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: 6
        }}
      >
        {children}
      </div>
    </div>
  );
}
