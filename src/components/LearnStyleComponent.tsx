import React, { useState, useEffect } from 'react';
import { LearnStyleEngine } from '../features/learn-style/LearnStyleEngine';

const LearnStyleComponent: React.FC = () => {
  const [sequenceName, setSequenceName] = useState<string>('My_Awesome_Sequence');
  const [styleProfileName, setStyleProfileName] = useState<string>('Edit Like Rohit');
  const [savedProfiles, setSavedProfiles] = useState<{ [key: string]: any }>({});
  const [isLearning, setIsLearning] = useState<boolean>(false);

  const learnStyleEngine = new LearnStyleEngine();

  useEffect(() => {
    setSavedProfiles(learnStyleEngine.getStyleProfiles());
  }, []);

  const handleLearnStyle = () => {
    if (!sequenceName || !styleProfileName) {
      alert("Please provide both a sequence name and a style profile name.");
      return;
    }
    setIsLearning(true);
    learnStyleEngine.learn(sequenceName, styleProfileName);
    setSavedProfiles(learnStyleEngine.getStyleProfiles());
    setIsLearning(false);
    alert(`Style profile '${styleProfileName}' has been learned and saved!`);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>Learn My Editing Style</h3>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={sequenceName}
          onChange={(e) => setSequenceName(e.target.value)}
          placeholder="Enter sequence name to analyze"
          style={{ width: '40%', padding: '8px', marginRight: '10px' }}
        />
        <input
          type="text"
          value={styleProfileName}
          onChange={(e) => setStyleProfileName(e.target.value)}
          placeholder="Enter name for the style profile"
          style={{ width: '40%', padding: '8px', marginRight: '10px' }}
        />
        <button onClick={handleLearnStyle} disabled={isLearning} style={{ padding: '8px 12px' }}>
          {isLearning ? 'Learning...' : 'Learn Style'}
        </button>
      </div>
      <div>
        <h4>Saved Style Profiles</h4>
        {Object.keys(savedProfiles).length > 0 ? (
          <ul>
            {Object.keys(savedProfiles).map(profileName => (
              <li key={profileName}>
                <strong>{profileName}</strong>
                <pre style={{ fontSize: '0.8em', backgroundColor: '#f5f5f5', padding: '5px' }}>
                  {JSON.stringify(savedProfiles[profileName], null, 2)}
                </pre>
              </li>
            ))}
          </ul>
        ) : (
          <p>No style profiles learned yet.</p>
        )}
      </div>
    </div>
  );
};

export default LearnStyleComponent;
