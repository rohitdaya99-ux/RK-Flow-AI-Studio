interface ResponsePanelProps {
  response: string;
}

export const ResponsePanel = ({
  response,
}: ResponsePanelProps) => {
  return (
    <div
      style={{
        marginTop: 20,
        padding: 15,
        background: "#2b2b2b",
        border: "1px solid #444",
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginTop: 0 }}>📋 AI Response</h3>

      <pre
        style={{
          background: "#1b1b1b",
          color: "#00ff99",
          padding: 10,
          borderRadius: 6,
          minHeight: 180,
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          fontSize: 12,
        }}
      >
        {response || "No response yet..."}
      </pre>
    </div>
  );
}