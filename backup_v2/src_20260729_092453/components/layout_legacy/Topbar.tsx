import React from "react";

interface TopbarProps {
  search: string;
  onSearch: (value: string) => void;
  onCommand: () => void;
}

const iconStyle: React.CSSProperties = {
  width: 46,
  height: 46,
  borderRadius: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.08)",
  cursor: "pointer",
  transition: ".25s",
  color: "#fff",
};

const Topbar: React.FC<TopbarProps> = ({
  search,
  onSearch,
  onCommand,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: 70,
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 22px",
        background: "rgba(255,255,255,.07)",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,.25)",
      }}
    >
      <div
        onClick={onCommand}
        style={{
          width: 520,
          height: 50,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          background: "rgba(255,255,255,.06)",
          border: "1px solid rgba(255,255,255,.08)",
          cursor: "text",
        }}
      >
        <span
          style={{
            color: "#8FA7FF",
            marginRight: 12,
            fontSize: 18,
          }}
        >
          🔍
        </span>

        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search anything..."
          style={{
            flex: 1,
            background: "transparent",
            border: 0,
            outline: 0,
            color: "#fff",
            fontSize: 15,
          }}
        />

        <div
          style={{
            padding: "6px 10px",
            borderRadius: 10,
            background: "rgba(255,255,255,.08)",
            fontSize: 12,
            color: "#C7D4FF",
          }}
        >
          ⌘ K
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={iconStyle}>⚡</div>

        <div style={iconStyle}>🔔</div>

        <div style={iconStyle}>💬</div>

        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            background:
              "linear-gradient(135deg,#7B61FF,#4F86FF)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(89,104,255,.35)",
          }}
        >
          RK
        </div>
      </div>
    </div>
  );
};

export default Topbar;