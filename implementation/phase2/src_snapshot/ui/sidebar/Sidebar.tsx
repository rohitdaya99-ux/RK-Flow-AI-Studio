
const items = [
  "🏠",
  "🤖",
  "🎬",
  "🎵",
  "🎞",
  "📤",
  "⚙️"
];

export default function Sidebar() {
  return (
    <div className="sidebar glass">
      {items.map((item, index) => (
        <button
          key={index}
          style={{
            height: 56,
            borderRadius: 18,
            border: "none",
            background: "transparent",
            color: "white",
            fontSize: 24,
            cursor: "pointer"
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
