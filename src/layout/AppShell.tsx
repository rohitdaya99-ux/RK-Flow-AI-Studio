import "./AppShell.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import RightPanel from "./RightPanel";
import StatusBar from "./StatusBar";
import Dashboard from "../features/dashboard/Dashboard";

export default function AppShell() {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="app-main">

        <Topbar />

        <div className="workspace">

          <main className="workspace-main">
            <Dashboard />
          </main>

          <aside className="workspace-ai">
            <RightPanel />
          </aside>

        </div>

        <StatusBar />

      </div>

    </div>
  );
}
