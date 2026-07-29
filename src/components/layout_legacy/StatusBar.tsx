import React from "react";

const StatusBar: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 18,
        background: "rgba(255,255,255,.06)",
        backdropFilter: "blur(30px)",
        border: "1px solid rgba(255,255,255,.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        color: "#EAF0FF",
        fontSize: 13,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <span>🟢 RK Flow Ready</span>

        <span>🎬 Premiere Connected</span>

        <span>🤖 6 AI Models</span>

        <span>⚡ GPU Active</span>

        <span>💾 Auto Save</span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          color: "#8FAAFF",
        }}
      >
        <span>60 FPS</span>

        <span>v1.0 Alpha</span>

        <span>RK Flow AI Studio</span>
      </div>
    </div>
  );
};

export default StatusBar;