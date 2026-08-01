export default function CommandBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        borderRadius: 18,
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.08)",
        marginBottom: 20
      }}
    >
      <span style={{ opacity: 0.7 }}>⌘K</span>

      <input
        placeholder="Ask RK Flow AI anything..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#fff",
          fontSize: 15
        }}
      />

      <div
        style={{
          padding: "6px 12px",
          borderRadius: 12,
          background: "#2563EB",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700
        }}
      >
        AI
      </div>
    </div>
  );
}
