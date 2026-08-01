import { inspector } from "../../tools/UXPInspector";

export default function TimelineAI() {

  return (
    <div style={{ padding: 20 }}>

      <button
        onClick={() => inspector.inspectEverything()}
        style={{
          padding: "14px 24px",
          fontSize: 18,
          cursor: "pointer"
        }}
      >
        🚀 RUN RK UXP INSPECTOR
      </button>

    </div>
  );

}
