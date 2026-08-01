import { useEffect, useState } from "react";
import { analyzeTimeline, TimelineAnalysis } from "../../services/timelineAnalysisService";

export default function AIAnalysisCard() {

  const [analysis, setAnalysis] = useState<TimelineAnalysis | null>(null);

  useEffect(() => {
    analyzeTimeline().then(setAnalysis);
  }, []);

  return (
    <div
      style={{
        borderRadius:24,
        padding:24,
        background:"linear-gradient(180deg,#1A1F27,#13171E)",
        border:"1px solid rgba(255,255,255,.08)"
      }}
    >
      <div
        style={{
          fontSize:22,
          fontWeight:700,
          color:"#fff",
          marginBottom:20
        }}
      >
        AI Timeline Analysis
      </div>

      <Row label="Health Score" value={`${analysis?.score ?? 0}%`} />
      <Row label="Project" value={analysis?.project ?? "--"} />
      <Row label="Sequence" value={analysis?.sequence ?? "--"} />
      <Row label="Resolution" value={analysis?.resolution ?? "--"} />
      <Row label="Duration" value={analysis?.duration ?? "--"} />

      <div
        style={{
          marginTop:20,
          padding:16,
          borderRadius:16,
          background:"rgba(59,130,246,.12)",
          color:"#D6E4FF",
          fontSize:14,
          lineHeight:1.8
        }}
      >
        {analysis?.score === 100
          ? "✅ Timeline looks ready for AI Wedding Reel generation."
          : "⚠ Complete the project setup for the best AI editing results."}
      </div>
    </div>
  );
}

function Row({
  label,
  value
}:{
  label:string;
  value:string;
}) {
  return (
    <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        marginBottom:12
      }}
    >
      <span style={{color:"#8E98AA"}}>{label}</span>
      <span style={{color:"#fff"}}>{value}</span>
    </div>
  );
}
