import "./Sidebar.css";
import { useNavigation, Page } from "../context/NavigationContext";

const items: { id: Page; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "timeline", label: "Timeline AI" },
  { id: "wedding", label: "Wedding AI" },
  { id: "autoedit", label: "Auto Edit" },
  { id: "faceai", label: "Face AI" },
  { id: "musicai", label: "Music AI" },
  { id: "exports", label: "Export Studio" },
  { id: "settings", label: "Settings" },
];

export default function Sidebar() {
  const { page, setPage } = useNavigation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        RK <span>FLOW</span>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
