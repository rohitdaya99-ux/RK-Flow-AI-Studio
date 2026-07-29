import { useState } from "react";
import { aiEngine } from "../ai/core/AIEngine";

export const WorkflowPlanner = () => {
    const [task, setTask] = useState("");
    const [response, setResponse] = useState("");

    const handleRunTask = async () => {
        if (!task.trim()) return;

        try {
            const result = await aiEngine.execute({
                feature: "Workflow Planner",
                prompt: task
            });

            setResponse(result.result);
        } catch (err: any) {
            setResponse(err?.message || "Unknown Error");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>RK Flow AI Assistant</h2>

            <textarea
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Type anything..."
                rows={5}
                style={{
                    width: "100%",
                    padding: 10,
                    resize: "vertical"
                }}
            />

            <button
                onClick={handleRunTask}
                style={{
                    marginTop: 10,
                    padding: "10px 20px"
                }}
            >
                Ask RK AI
            </button>

            <pre
                style={{
                    marginTop: 20,
                    whiteSpace: "pre-wrap",
                    background: "#222",
                    color: "#fff",
                    padding: 15,
                    borderRadius: 8
                }}
            >
                {response}
            </pre>
        </div>
    );
};