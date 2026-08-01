import "./RightPanel.css";

export default function RightPanel() {
  return (
    <aside className="right-panel">
      <div className="copilot-card">
        <h3>AI Copilot</h3>

        <button>Create Highlight</button>
        <button>Create Reel</button>
        <button>Find Bride</button>
        <button>Sync Music</button>

        <textarea
          placeholder="Ask RK AI anything..."
        />
      </div>
    </aside>
  );
}
