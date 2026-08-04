
import React, { useState, useEffect } from 'react';
import { ContextEngine } from '../features/ai-director/ContextEngine';
import { ReasoningEngine } from '../features/ai-director/ReasoningEngine';
import { PlanningEngine } from '../features/ai-director/PlanningEngine';
import { DecisionEngine } from '../features/ai-director/DecisionEngine';
import { LearnStyleEngine } from '../features/learn-style/LearnStyleEngine';

const AIDirectorPanel: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [styleProfiles, setStyleProfiles] = useState<{ [key: string]: any }>({});
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  useEffect(() => {
    const learnStyleEngine = new LearnStyleEngine();
    setStyleProfiles(learnStyleEngine.getStyleProfiles());
  }, []);

  const runEngine = async (engineInstance: any, logMessage: string, args: any = null) => {
    const result = args ? await engineInstance.run(args) : await engineInstance.run();
    setLogs(prevLogs => [...prevLogs, `${logMessage}: ${JSON.stringify(result, null, 2)}`]);
    return result;
  };

  const handleCreateCinematicFilm = async () => {
    setIsProcessing(true);
    setLogs([]);

    if (selectedStyle) {
      console.log(`Using selected style profile: ${selectedStyle}`);
      setLogs(prevLogs => [...prevLogs, `Using style profile: ${selectedStyle}`]);
    }

    const context = await runEngine(new ContextEngine(), "Gathering context");
    const reasoningResult = await runEngine(new ReasoningEngine(), "Reasoning", context);
    const planningResult = await runEngine(new PlanningEngine(), "Planning", { context, reasoningResult });
    const decisionResult = await runEngine(new DecisionEngine(), "Decision", planningResult);

    setLogs(prevLogs => [...prevLogs, `Final Output: ${JSON.stringify(decisionResult, null, 2)}`]);

    setIsProcessing(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>AI Director</h3>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="style-profile-select" style={{ marginRight: '10px' }}>Select Style Profile:</label>
        <select
          id="style-profile-select"
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          style={{ padding: '5px' }}
        >
          <option value="">Default Style</option>
          {Object.keys(styleProfiles).map(profileName => (
            <option key={profileName} value={profileName}>{profileName}</option>
          ))}
        </select>
      </div>
      <button onClick={handleCreateCinematicFilm} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Create Cinematic Wedding Film'}
      </button>
      <div style={{ marginTop: '10px', border: '1px solid #eee', padding: '5px', height: '150px', overflowY: 'scroll' }}>
        {logs.map((log, index) => (
          <pre key={index} style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{log}</pre>
        ))}
      </div>
    </div>
  );
};

export default AIDirectorPanel;
