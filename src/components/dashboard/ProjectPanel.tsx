import { useState } from "react";
import { premiereAPI } from "../../services/PremiereAPI";

interface ProjectPanelProps {
  onStatusChange: (status: string) => void;
}

export const ProjectPanel = ({
  onStatusChange,
}: ProjectPanelProps) => {
  const [projectInfo, setProjectInfo] = useState<any>(null);

  const handleReadProject = async () => {
    try {
      onStatusChange("Reading Project...");

      const info = await premiereAPI.getProjectInfo();

      setProjectInfo(info);

      onStatusChange("Project Loaded ✓");
    } catch (e) {
      console.error(e);
      onStatusChange("ERROR");
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        padding: 15,
        background: "#2b2b2b",
        border: "1px solid #444",
        borderRadius: 8,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Project Information</h3>

      <button
        style={{
          width: "100%",
          height: 45,
          marginBottom: 15,
          background: "#0984e3",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
        }}
        onClick={handleReadProject}
      >
        📂 READ PROJECT
      </button>

      <pre
        style={{
          background: "#1b1b1b",
          color: "#00ff99",
          padding: 10,
          borderRadius: 6,
          overflowX: "auto",
          whiteSpace: "pre-wrap",
          minHeight: 120,
          fontSize: 12,
        }}
      >
        {projectInfo
          ? JSON.stringify(projectInfo, null, 2)
          : "No project loaded."}
      </pre>
    </div>
  );
}