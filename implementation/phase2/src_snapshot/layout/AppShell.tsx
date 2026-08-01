import "./AppShell.css";
import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import RightPanel from "./RightPanel";
import StatusBar from "./StatusBar";

interface Props {
  children?: ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="rk-app">
      <Sidebar />

      <div className="rk-main">
        <Topbar />

        <div className="rk-workspace">
          <main className="rk-content">
            {children}
          </main>

          <RightPanel />
        </div>

        <StatusBar />
      </div>
    </div>
  );
}
