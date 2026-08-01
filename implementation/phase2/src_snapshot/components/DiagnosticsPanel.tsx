import React from 'react';
import { LogEntry } from '../types';

interface DiagnosticsPanelProps {
  logs: LogEntry[];
}

export const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ logs }) => {
  return (
    <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
      <h4 style={{ color: '#7dd3fc', margin: '0 0 8px 0', fontSize: '12px', textTransform: 'uppercase' }}>Diagnostics</h4>
      {logs.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '11px' }}>No events yet.</div>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '14px', fontSize: '10px', color: '#e2e8f0' }}>
          {logs.slice(-8).reverse().map((log) => (
            <li key={log.id} style={{ marginBottom: '4px' }}>
              <span style={{ color: log.severity === 'error' ? '#fb7185' : log.severity === 'warn' ? '#fbbf24' : log.severity === 'success' ? '#34d399' : '#7dd3fc' }}>
                [{log.severity.toUpperCase()}]
              </span>{' '}
              {log.message} <span style={{ color: '#64748b' }}>@ {log.timestamp}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
