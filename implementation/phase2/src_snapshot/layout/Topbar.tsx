import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back to RK Flow AI Studio</p>
      </div>

      <div className="topbar-actions">
        <input
          className="topbar-search"
          placeholder="Search anything..."
        />

        <button className="topbar-button">
          AI Copilot
        </button>
      </div>
    </header>
  );
}
