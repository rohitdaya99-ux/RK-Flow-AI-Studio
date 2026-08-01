const stats = [
  { title: "Timeline", value: "124 Clips", color: "#60A5FA" },
  { title: "Faces", value: "18 People", color: "#34D399" },
  { title: "Music BPM", value: "128", color: "#FBBF24" },
  { title: "Exports", value: "7 Pending", color: "#F472B6" }
];

export default function ProjectStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 18
      }}
    >
      {stats.map((s) => (
        <div
          key={s.title}
          style={{
            borderRadius: 22,
            padding: 20,
            background: "linear-gradient(180deg,#1A1F27,#13171E)",
            border: "1px solid rgba(255,255,255,.08)"
          }}
        >
          <div
            style={{
              color: "#8B95A7",
              fontSize: 13
            }}
          >
            {s.title}
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 28,
              fontWeight: 800,
              color: s.color
            }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
