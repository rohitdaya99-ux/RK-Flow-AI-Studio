import { useState } from "react";
import { AIConfigManager } from "../ai/config/AIConfigManager";
import { AIRouter } from "../ai/router/AIRouter";

const router = new AIRouter();

export default function SettingsPage() {

  const provider = AIConfigManager.provider();

  const [apiKey, setApiKey] = useState(
    AIConfigManager.apiKey(provider)
  );

  const [status, setStatus] = useState("");

  function save() {

    AIConfigManager.setApiKey(provider, apiKey);

    setStatus("✅ API Key Saved");

  }

  async function test() {

    try {

      setStatus("Testing...");

      const result = await router.chat({
        prompt: "Reply with exactly: RK Flow AI Connected"
      });

      setStatus("🟢 " + result.text);

    } catch (e: any) {

      setStatus("🔴 " + (e.message || "Connection Failed"));

    }

  }

  return (
    <div style={{ padding: 20 }}>

      <h2>RK Flow AI Settings</h2>

      <input
        type="password"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10
        }}
      />

      <div style={{ marginTop: 15 }}>

        <button onClick={save}>
          Save API Key
        </button>

        <button
          onClick={() => void test()}
          style={{ marginLeft: 10 }}
        >
          Test Connection
        </button>

      </div>

      <p style={{ marginTop: 20 }}>
        {status}
      </p>

    </div>
  );

}
