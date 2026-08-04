import React, { useState } from 'react';
import { MotionAIEngine } from '../features/motion-ai/MotionAIEngine';

const MotionAIComponent: React.FC = () => {
  const [result, setResult] = useState('');
  const motionAIEngine = new MotionAIEngine();

  const handleAction = async (action: (...args: any[]) => Promise<string>, ...args: any[]) => {
    const res = await action(...args);
    setResult(res);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Motion AI</h3>
      <div style={{ marginBottom: '10px' }}>
        <h4>Pan & Zoom</h4>
        <button onClick={() => void handleAction(motionAIEngine.applyPanAndZoom.bind(motionAIEngine), undefined, 'slow_zoom_in')}>Slow Zoom In</button>
        <button onClick={() => void handleAction(motionAIEngine.applyPanAndZoom.bind(motionAIEngine), undefined, 'pan_left_to_right')}>Pan Left to Right</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h4>Parallax</h4>
        <button onClick={() => void handleAction(motionAIEngine.applyParallax.bind(motionAIEngine))}>Apply Parallax</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <h4>Motion Blur</h4>
        <button onClick={() => void handleAction(motionAIEngine.applyMotionBlur.bind(motionAIEngine), undefined, 'light')}>Light</button>
        <button onClick={() => void handleAction(motionAIEngine.applyMotionBlur.bind(motionAIEngine), undefined, 'medium')}>Medium</button>
        <button onClick={() => void handleAction(motionAIEngine.applyMotionBlur.bind(motionAIEngine), undefined, 'heavy')}>Heavy</button>
      </div>
      {result && <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>Result: {result}</div>}
    </div>
  );
};

export default MotionAIComponent;
