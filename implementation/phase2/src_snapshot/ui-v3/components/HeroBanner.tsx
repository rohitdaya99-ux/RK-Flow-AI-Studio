type Props = {
  onAction: (action: string) => void;
};

export default function HeroBanner({ onAction }: Props) {
  return (
    <div
      style={{
        height: 260,
        borderRadius: 28,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at top left,#3B82F6 0%,#1E293B 45%,#111827 100%)",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 30px 60px rgba(0,0,0,.35)"
      }}
    >
      <div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 800,
            color: "#fff"
          }}
        >
          RK Flow AI Studio
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 16,
            color: "#D6E3FF",
            maxWidth: 620,
            lineHeight: 1.7
          }}
        >
          Professional AI powered workspace for Wedding Films,
          Highlights, Instagram Reels, Teasers and Cinematic Editing.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap"
        }}
      >
        {[
          "Timeline AI",
          "Wedding AI",
          "Beat Sync",
          "Face Search",
          "Auto Reel",
          "Export Queue"
        ].map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => onAction(item)}
            style={{
              padding: "10px 16px",
              borderRadius: 16,
              background: "rgba(255,255,255,.10)",
              border: "1px solid rgba(255,255,255,.10)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
