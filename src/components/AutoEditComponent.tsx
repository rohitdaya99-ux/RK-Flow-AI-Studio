import React, { useState, useEffect } from 'react';
import { LearnStyleEngine } from '../features/learn-style/LearnStyleEngine';
import { AutoEditAssembler } from '../features/auto-edit/AutoEditAssembler';
import { AUTO_EDIT_TEMPLATES } from '../features/auto-edit/templates';
import { Button, Card, ProgressBar, StatusChip } from "../ui/theme/primitives";
import { colors, spacing } from "../ui/theme";

const AutoEditComponent: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [styleProfiles, setStyleProfiles] = useState<{ [key: string]: any }>({});
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>(AUTO_EDIT_TEMPLATES[0].name);
  const [progressLabel, setProgressLabel] = useState('Ready to assemble a cut.');
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const learnStyleEngine = new LearnStyleEngine();
    setStyleProfiles(learnStyleEngine.getStyleProfiles());
  }, []);

  const handleAutoEdit = async () => {
    setIsEditing(true);
    setProgressPercent(0);
    setProgressLabel("Preparing Auto Edit assembly...");
    const assembler = new AutoEditAssembler();
    try {
      const selectedStyleProfile = selectedStyle ? styleProfiles[selectedStyle] : undefined;
      const result = await assembler.assemble(selectedTemplate, [], selectedStyleProfile, (next) => {
        setProgressPercent(next.percent);
        setProgressLabel(`${next.label} (${next.completed}/${next.total})`);
      });
      setProgressPercent(100);
      setProgressLabel("Auto Edit assembly complete.");
      alert(result);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred.');
      }
    }
    setIsEditing(false);
  };

  return (
    <Card title="Auto Edit Engine" subtitle="Template-driven sequence assembly with live placement progress.">
      <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', alignItems: 'center' }}>
        <StatusChip label={isEditing ? 'Assembling' : 'Ready'} tone={isEditing ? 'warning' : 'success'} />
      </div>
      <div style={{ marginTop: spacing.md, marginBottom: spacing.md }}>
        {(isEditing || progressPercent > 0) && <ProgressBar value={progressPercent} label={`${progressPercent}%`} />}
        <div style={{ marginTop: spacing.sm, color: colors.inkMuted }}>{progressLabel}</div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="template-select-autoedit" style={{ marginRight: '10px' }}>Select Template:</label>
        <select
          id="template-select-autoedit"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          style={{ padding: '5px', marginRight: '20px' }}
        >
          {AUTO_EDIT_TEMPLATES.map(template => (
            <option key={template.name} value={template.name}>{template.name}</option>
          ))}
        </select>

        <label htmlFor="style-profile-select-autoedit" style={{ marginRight: '10px' }}>Select Style Profile:</label>
        <select
          id="style-profile-select-autoedit"
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
      <Button onClick={handleAutoEdit} disabled={isEditing}>
        {isEditing ? 'Editing...' : 'Generate Auto Edit'}
      </Button>
    </Card>
  );
};

export default AutoEditComponent;
