import React, { useState } from 'react';
import { AudioAIEngine } from '../features/audio-ai/AudioAIEngine';

const AudioAIComponent: React.FC = () => {
  const [result, setResult] = useState('');
  const audioAIEngine = new AudioAIEngine();

  const handleAction = async (action: (...args: any[]) => Promise<string[] | string>, ...args: any[]) => {
    const res = await action(...args);
    setResult(Array.isArray(res) ? res.join(', ') : res);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Audio AI</h3>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => void handleAction(audioAIEngine.removeNoise.bind(audioAIEngine))}>Remove Noise</button>
        <button onClick={() => void handleAction(audioAIEngine.enhanceVoice.bind(audioAIEngine))}>Enhance Voice</button>
        <button onClick={() => void handleAction(audioAIEngine.autoDuck.bind(audioAIEngine))}>Auto-Duck Music</button>
        <button onClick={() => void handleAction(audioAIEngine.cleanupSpeech.bind(audioAIEngine))}>Cleanup Speech</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setResult(audioAIEngine.suggestSFX('video_clip_with_motion').join(', '))}>Suggest SFX</button>
      </div>
      {result && (
        <div>
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>Result: {result}</div>
          <button style={{ marginTop: '5px' }}>Preview (placeholder)</button>
          <button style={{ marginTop: '5px', marginLeft: '5px' }}>Commit</button>
        </div>
      )}
    </div>
  );
};

export default AudioAIComponent;
