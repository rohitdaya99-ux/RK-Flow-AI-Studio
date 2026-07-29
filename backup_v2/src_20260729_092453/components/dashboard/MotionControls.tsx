import { premiereAPI } from "../../services/PremiereAPI";

interface MotionControlsProps {
  onStatusChange: (status: string) => void;
}

export const MotionControls = ({
  onStatusChange,
}: MotionControlsProps) => {
  const execute = async (
    action: () => Promise<any>,
    label: string
  ) => {
    try {
      onStatusChange(`${label}...`);

      await action();

      onStatusChange(`${label} ✓`);
    } catch (e) {
      console.error(e);
      onStatusChange("ERROR");
    }
  };

  const buttonStyle = {
    width: "100%",
    minHeight: 50,
    background: "#ffffff",
    color: "#000000",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold" as const,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 10,
        border: "1px solid #444",
        borderRadius: 8,
        background: "#2b2b2b",
      }}
    >
      <h3 style={{ margin: 0 }}>Motion Controls</h3>

      <button
        style={buttonStyle}
        onClick={() =>
          execute(() => premiereAPI.center(), "CENTER")
        }
      >
        🎯 CENTER
      </button>

      <button
        style={buttonStyle}
        onClick={() =>
          execute(() => premiereAPI.left(), "LEFT")
        }
      >
        ⬅ LEFT
      </button>

      <button
        style={buttonStyle}
        onClick={() =>
          execute(() => premiereAPI.right(), "RIGHT")
        }
      >
        ➡ RIGHT
      </button>

      <button
        style={buttonStyle}
        onClick={() =>
          execute(() => premiereAPI.top(), "TOP")
        }
      >
        ⬆ TOP
      </button>

      <button
        style={buttonStyle}
        onClick={() =>
          execute(() => premiereAPI.bottom(), "BOTTOM")
        }
      >
        ⬇ BOTTOM
      </button>

      <button
        style={{
          ...buttonStyle,
          background: "#00b894",
          color: "#fff",
        }}
        onClick={() =>
          execute(
            () => premiereAPI.getProjectInfo(),
            "READ PROJECT"
          )
        }
      >
        📂 READ PROJECT
      </button>
    </div>
  );
}