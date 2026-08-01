import { useEffect, useState } from "react";
import { premiereService, TimelineInfo } from "../../services/premiereService";
import {
  analyzeTimeline,
  TimelineAnalysis
} from "../../services/timelineAnalysisService";
import {
  generateWeddingPlan,
  getStoredGeminiKey,
  saveGeminiKey,
  WeddingPlan
} from "../../services/weddingPlanService";

function Section({
  title,
  minHeight=170,
  children
}:{
  title:string;
  minHeight?:number;
  children?: React.ReactNode;
}){

  return(

    <div
      style={{
        background:"linear-gradient(180deg,#1B2028,#14181F)",
        border:"1px solid rgba(255,255,255,.08)",
        borderRadius:22,
        padding:20,
        minHeight,
        overflowY:"auto",
        boxShadow:"0 12px 30px rgba(0,0,0,.25)"
      }}
    >

      <div
        style={{
          color:"#F8FAFC",
          fontSize:18,
          fontWeight:700,
          marginBottom:14
        }}
      >
        {title}
      </div>

      {children ?? <div style={{ color:"#8D98AA", lineHeight:1.8, fontSize:14 }}>Coming Soon...</div>}

    </div>

  );

}

function TimelineContext() {
  const [info, setInfo] = useState<TimelineInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    setInfo(await premiereService.getTimelineInfo());
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const connected = info?.connected === true;
  const sequence = info?.sequenceName || "No active sequence";

  return (
    <>
      <div style={{ color: connected ? "#6EE7A1" : "#FCA5A5", fontSize:14, fontWeight:700 }}>
        {connected ? "● Premiere connected" : "● Premiere not connected"}
      </div>
      <div style={{ color:"#F8FAFC", marginTop:10, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
        {sequence}
      </div>
      <div style={{ color:"#8D98AA", fontSize:13, marginTop:6 }}>
        V{info?.videoTracks ?? 0} · A{info?.audioTracks ?? 0} · {info?.duration ?? "--"}
      </div>
      <button
        type="button"
        onClick={() => void refresh()}
        disabled={loading}
        style={{
          marginTop:14,
          padding:"7px 11px",
          borderRadius:9,
          border:"1px solid rgba(96,165,250,.55)",
          background:"rgba(37,99,235,.22)",
          color:"#BFDBFE",
          cursor: loading ? "wait" : "pointer"
        }}
      >
        {loading ? "Reading…" : "Refresh timeline"}
      </button>
    </>
  );
}

function TimelineAIAction() {
  const [analysis, setAnalysis] = useState<TimelineAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    setAnalysis(await analyzeTimeline());
    setLoading(false);
  };

  useEffect(() => {
    void runAnalysis();
  }, []);

  if (loading && analysis === null) {
    return <div style={{ color:"#8D98AA", fontSize:14 }}>Reading active timeline…</div>;
  }

  if (analysis === null || analysis.sequence === "--") {
    return <div style={{ color:"#FCA5A5", fontSize:14 }}>Open an active Premiere sequence, then run the analysis.</div>;
  }

  return (
    <>
      <div style={{ color:"#6EE7A1", fontWeight:700 }}>✓ Timeline analysis complete</div>
      <div style={{ color:"#F8FAFC", marginTop:8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
        {analysis.sequence}
      </div>
      <div style={{ color:"#8D98AA", fontSize:13, marginTop:6 }}>
        V{analysis.videoTracks} · A{analysis.audioTracks} · {analysis.duration}
      </div>
      <div style={{ color:"#BFDBFE", fontSize:13, marginTop:6 }}>Timeline health: {analysis.score}%</div>
      <button
        type="button"
        onClick={() => void runAnalysis()}
        disabled={loading}
        style={{
          marginTop:12,
          padding:"7px 11px",
          borderRadius:9,
          border:"1px solid rgba(96,165,250,.55)",
          background:"rgba(37,99,235,.22)",
          color:"#BFDBFE",
          cursor: loading ? "wait" : "pointer"
        }}
      >
        {loading ? "Analyzing…" : "Run again"}
      </button>
    </>
  );
}

function WeddingAIAction() {
  const [timeline, setTimeline] = useState<TimelineInfo | null>(null);
  const [apiKey, setApiKey] = useState(getStoredGeminiKey());
  const [style, setStyle] = useState("Cinematic Indian Wedding");
  const [plan, setPlan] = useState<WeddingPlan | null>(null);
  const [status, setStatus] = useState("Add your Gemini API key, then generate a read-only plan.");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void premiereService.getTimelineInfo().then(setTimeline);
  }, []);

  const generate = async () => {
    if (timeline === null) {
      setStatus("Timeline is still loading. Try again in a moment.");
      return;
    }

    saveGeminiKey(apiKey);
    setLoading(true);
    setStatus("Generating wedding edit plan…");

    try {
      setPlan(await generateWeddingPlan(timeline, style, 60));
      setStatus("Plan ready. Nothing has been changed in Premiere.");
    } catch (error: unknown) {
      setPlan(null);
      setStatus(error instanceof Error ? error.message : "Could not generate the plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <select value={style} onChange={(event) => setStyle(event.target.value)} style={fieldStyle}>
        <option>Cinematic Indian Wedding</option>
        <option>Emotional Highlight</option>
        <option>Traditional Ceremony</option>
      </select>
      <input type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="Gemini API key" style={{ ...fieldStyle, marginTop:8 }} />
      <button type="button" onClick={() => void generate()} disabled={loading} style={actionButtonStyle}>
        {loading ? "Generating…" : "Generate 60-sec plan"}
      </button>
      <div style={{ color: plan ? "#6EE7A1" : "#AAB4C5", fontSize:13, lineHeight:1.5, marginTop:10 }}>{status}</div>
      {plan !== null && (
        <div style={{ color:"#E2E8F0", fontSize:13, lineHeight:1.55, marginTop:10 }}>
          <strong>{plan.title}</strong><br />
          {plan.editSteps.slice(0, 2).map((step) => <div key={step}>• {step}</div>)}
        </div>
      )}
    </>
  );
}

const fieldStyle = {
  width:"100%",
  boxSizing:"border-box" as const,
  borderRadius:9,
  border:"1px solid rgba(255,255,255,.14)",
  background:"rgba(255,255,255,.06)",
  color:"#F8FAFC",
  padding:"8px 10px"
};

const actionButtonStyle = {
  marginTop:10,
  padding:"8px 11px",
  borderRadius:9,
  border:"1px solid rgba(96,165,250,.55)",
  background:"rgba(37,99,235,.22)",
  color:"#BFDBFE",
  cursor:"pointer"
};

type Props = {
  activeFeature: string;
};

export default function SmartPanel({ activeFeature }: Props){

return(

<div
style={{
padding:22,
display:"flex",
flexDirection:"column",
gap:18,
height:"100vh", overflowY:"auto",
background:"#101317"
}}
>

<div
style={{
fontSize:28,
fontWeight:800,
color:"#fff"
}}
>
AI Copilot
</div>

<Section
title="Chat Assistant"
minHeight={220}
/>

<Section
title="Context"
minHeight={320}
>
  <TimelineContext />
</Section>

<Section
title="Quick Actions"
minHeight={420}
>
  {activeFeature === "Timeline AI" ? (
    <TimelineAIAction />
  ) : activeFeature === "Wedding AI" ? (
    <WeddingAIAction />
  ) : (
    <>
      <div style={{ color:"#F8FAFC", fontWeight:700, lineHeight:1.5 }}>
        {activeFeature}
      </div>
      <div style={{ color:"#8D98AA", lineHeight:1.6, fontSize:14, marginTop:8 }}>
        This feature is not implemented yet. Timeline AI is available now as a read-only analysis.
      </div>
    </>
  )}
</Section>

</div>

);

}
