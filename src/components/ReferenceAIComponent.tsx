import React, { useState } from 'react';
import { ReferenceAnalyzer } from '../features/reference-ai/ReferenceAnalyzer';
import { AutoEditAssembler } from '../features/auto-edit/AutoEditAssembler';

const ReferenceAIComponent: React.FC = () => {
  const [inputSource, setInputSource] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [signalSourceUsed, setSignalSourceUsed] = useState<string>('');

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSignalSourceUsed('');

    const analyzer = new ReferenceAnalyzer();
    const result = await analyzer.analyze(inputSource);

    if (result.error) {
      setAnalysisResult(result);
    } else {
      setAnalysisResult(result);
      setSignalSourceUsed(result.signalSource || (inputSource.startsWith("http") ? `URL: ${inputSource}` : `Local File: ${inputSource}`));
    }
    setIsAnalyzing(false);
  };

  const handleRecreateStyle = async () => {
    try {
      const assembler = new AutoEditAssembler();
      const result = await assembler.assemble('Reel', [], analysisResult ?? undefined);
      alert(result);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to recreate style.');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Reference AI</h3>
      <div>
        <input
          type="text"
          value={inputSource}
          onChange={(e) => setInputSource(e.target.value)}
          placeholder="Enter Instagram Reel/YouTube URL or local file path"
          style={{ width: '70%', padding: '8px' }}
        />
        <button onClick={handleAnalyze} disabled={isAnalyzing} style={{ marginLeft: '10px', padding: '8px 12px' }}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {signalSourceUsed && (
        <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#555' }}>
          Signal source used: <strong>{signalSourceUsed}</strong>
        </p>
      )}

      {analysisResult && (
        <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '10px' }}>
          <h4>Style Profile Card</h4>
          {analysisResult.error ? (
            <p style={{ color: 'red' }}>Error: {analysisResult.error}</p>
          ) : (
            <>
              {Object.entries(analysisResult).map(([key, value]) => (
                <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:</strong> {JSON.stringify(value)}</p>
              ))}
              <button onClick={() => void handleRecreateStyle()} style={{ marginTop: '15px', padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                Recreate this style
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReferenceAIComponent;
