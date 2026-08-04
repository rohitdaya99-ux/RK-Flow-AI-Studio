import React, { useState } from 'react';
import { CaptionAIEngine } from '../features/caption-ai/CaptionAIEngine';

const CaptionAIComponent: React.FC = () => {
  const [textToCaption, setTextToCaption] = useState('This is a sample text for captioning.');
  const [language, setLanguage] = useState<'hindi' | 'english' | 'hinglish'>('english');
  const [style, setStyle] = useState<'standard' | 'karaoke'>('standard');
  const [generatedCaptions, setGeneratedCaptions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const captionAIEngine = new CaptionAIEngine();

  const handleGenerateCaptions = async () => {
    setIsGenerating(true);
    const result = await captionAIEngine.generateCaptions(textToCaption, language, style);
    setGeneratedCaptions(result);
    setIsGenerating(false);
  };

  const handleInsertCaptions = async () => {
    const result = await captionAIEngine.insertCaptions(generatedCaptions);
    alert(result);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Caption AI</h3>
      <textarea
        value={textToCaption}
        onChange={(e) => setTextToCaption(e.target.value)}
        style={{ width: '100%', minHeight: '100px', marginBottom: '10px' }}
      />
      <div>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value as any)} style={{ marginRight: '10px' }}>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="hinglish">Hinglish</option>
        </select>
        <label>Style: </label>
        <select value={style} onChange={(e) => setStyle(e.target.value as any)}>
          <option value="standard">Standard</option>
          <option value="karaoke">Karaoke</option>
        </select>
      </div>
      <button onClick={handleGenerateCaptions} disabled={isGenerating} style={{ marginTop: '10px' }}>
        {isGenerating ? 'Generating...' : 'Generate Captions'}
      </button>
      {generatedCaptions && (
        <div style={{ marginTop: '10px' }}>
          <h4>Generated Captions</h4>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>{generatedCaptions}</pre>
          <button onClick={() => void handleInsertCaptions()} style={{ marginTop: '10px' }}>Insert Captions into Timeline</button>
        </div>
      )}
    </div>
  );
};

export default CaptionAIComponent;
