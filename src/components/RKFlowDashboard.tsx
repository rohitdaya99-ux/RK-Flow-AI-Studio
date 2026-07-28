import { useState } from 'react';
import { geminiServiceV2 } from '../services/GeminiServiceV2';

export const RKFlowDashboard = () => {
    const [status, setStatus] = useState("RK Flow AI Ready. Waiting for command...");
    const [loading, setLoading] = useState(false);

    const handleFeatureClick = async (featureName: string, params: any = {}) => {
        setLoading(true);
        setStatus(`⏳ Processing: ${featureName}...`);
        
        const response = await geminiServiceV2.executeFeature(featureName, params);
        
        setStatus(response.success ? `✅ ${response.message}` : `❌ ${response.message}`);
        setLoading(false);
    };

    // Styling for the dashboard
    const styles = {
        container: { padding: '20px', fontFamily: 'Arial, sans-serif', color: '#fff', backgroundColor: '#1e1e1e', height: '100vh', overflowY: 'auto' as 'auto' },
        header: { borderBottom: '1px solid #444', paddingBottom: '10px' },
        status: { backgroundColor: '#333', padding: '10px', borderRadius: '5px', color: '#00ffcc', fontWeight: 'bold' },
        grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' },
        card: { backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', border: '1px solid #444' },
        btn: { width: '100%', padding: '10px', margin: '5px 0', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>RK Flow AI Studio</h2>
            <div style={styles.status}>{status}</div>

            <div style={styles.grid}>
                {/* AI SMART CLIP ANALYZER */}
                <div style={styles.card}>
                    <h3 style={{marginTop: 0, color: '#ffcc00'}}>🔍 AI Smart Analyzer</h3>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Analyze Full Timeline")}>Full Timeline</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Analyze Selected Clip")}>Selected Clip</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Detect Wedding Scenes")}>Detect Wedding Scenes</button>
                </div>

                {/* AI REEL & TEASER GENERATOR */}
                <div style={styles.card}>
                    <h3 style={{marginTop: 0, color: '#ff6699'}}>🎞️ AI Generators</h3>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Generate Reel", { duration: 30, style: "Trending Punjabi" })}>30s Punjabi Reel</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Generate Teaser", { duration: 60, style: "Luxury Cinematic" })}>1m Cinematic Teaser</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Generate Highlight Film", { style: "Emotional" })}>Highlight Film</button>
                </div>

                {/* SMART EDITING ENGINE */}
                <div style={styles.card}>
                    <h3 style={{marginTop: 0, color: '#00ffcc'}}>✂️ Editing Engine</h3>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Smart Auto Trim", { preserve: "Reactions" })}>Smart Auto Trim</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Sync to Music", { map: "Beat Drops" })}>Sync to Music Beats</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Suggest Transitions", { style: "Cinematic" })}>Apply Cinematic Transitions</button>
                </div>

                {/* COLOR, FACE & BONUS */}
                <div style={styles.card}>
                    <h3 style={{marginTop: 0, color: '#cc99ff'}}>🎨 Color & Bonus AI</h3>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Apply Color Grade", { look: "Luxury Warm" })}>Apply Luxury Warm Grade</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Face Priority", { targets: ["Bride", "Groom"] })}>Prioritize Couple Faces</button>
                    <button disabled={loading} style={styles.btn} onClick={() => handleFeatureClick("Generate Captions")}>Auto Generate Captions</button>
                </div>
            </div>
        </div>
    );
};