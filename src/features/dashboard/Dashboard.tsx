import "./Dashboard.css";
import AIChatPanel from "../../components/ai/AIChatPanel";

const stats = [
  { title: "Projects", value: "12" },
  { title: "Wedding Films", value: "36" },
  { title: "AI Jobs", value: "156" },
  { title: "Storage", value: "78%" },
];

const actions = [
  "Create Reel",
  "Create Highlight",
  "Create Teaser",
  "Find Bride",
  "Music Sync",
  "Export Instagram",
];

const projects = [
  "Baby Shower Highlight",
  "Wedding Teaser",
  "Haldi Reel",
];

export default function Dashboard() {
  return (
    <div className="dashboard">

      <section className="hero">
        <span className="badge">RK FLOW AI</span>

        <h1>AI Video Editing Workspace</h1>

        <p>
          Build Wedding Reels, Highlights, Teasers and Cinematic Films
          using AI-powered workflows.
        </p>
      </section>

      <section className="stats">
        {stats.map((item) => (
          <div className="card stat" key={item.title}>
            <span>{item.title}</span>
            <h2>{item.value}</h2>
          </div>
        ))}
      </section>

      <section className="card">
        <h3>Quick Actions</h3>

        <div className="action-grid">
          {actions.map((item) => (
            <button key={item}>{item}</button>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Recent Projects</h3>

        <div className="project-list">
          {projects.map((item) => (
            <div className="project" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <AIChatPanel />
      </section>

    </div>
  );
}
