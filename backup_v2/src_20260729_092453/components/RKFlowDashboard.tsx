import { useState } from "react";

import { StatusCard } from "./dashboard/StatusCard";
import { MotionControls } from "./dashboard/MotionControls";
import { ProjectPanel } from "./dashboard/ProjectPanel";
import { AIAssistant } from "./dashboard/AIAssistant";

export const RKFlowDashboard = () => {
  const [status, setStatus] = useState("READY");

  return (
    <div
      style={{
        background: "#1f1f1f",
        color: "#ffffff",
        padding: 20,
        minHeight: "100vh",
        overflow: "auto",
        fontFamily: "Arial",
      }}
    >
      <h1>RK Flow AI Studio</h1>

      <StatusCard status={status} />

      <MotionControls onStatusChange={setStatus} />

      <ProjectPanel onStatusChange={setStatus} />

      <AIAssistant onStatusChange={setStatus} />
    </div>
  );
};