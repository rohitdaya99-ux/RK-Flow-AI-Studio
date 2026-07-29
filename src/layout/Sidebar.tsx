import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        RK <span>FLOW</span>
      </div>

      <nav className="sidebar-nav">
        <button className="sidebar-item active">Dashboard</button>
        <button className="sidebar-item">Timeline AI</button>
        <button className="sidebar-item">Wedding AI</button>
        <button className="sidebar-item">Auto Edit</button>
        <button className="sidebar-item">Face AI</button>
        <button className="sidebar-item">Music AI</button>
      </nav>
    </aside>
  );
}
