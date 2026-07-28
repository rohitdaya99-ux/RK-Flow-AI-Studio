// @ts-nocheck
import React, { useState } from 'react';
import { processTaskWithGemini } from '../services/geminiService';

export const WorkflowPlanner = () => {
    const [task, setTask] = useState("");

    const handleRunTask = async () => {
        if (!task) return;
        const success = await processTaskWithGemini(task);
        if (success) {
            alert("Task sent to Premiere Pro!");
            setTask(""); // Input clear kar dein
        } else {
            alert("Task failed.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>RK Flow AI Assistant</h2>
            <input 
                type="text" 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="E.g., Create a sequence named 'Wedding Teaser'"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleRunTask} style={{ padding: '10px 20px' }}>
                Run Magic 🪄
            </button>
        </div>
    );
};