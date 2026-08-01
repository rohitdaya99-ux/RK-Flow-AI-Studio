import { useEffect, useState } from "react";
import { premiereService, TimelineInfo } from "../../services/premiereService";

export default function ProjectInfo() {

  const [info, setInfo] = useState<TimelineInfo | null>(null);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    setLoading(true);
    const data = await premiereService.getTimelineInfo();
    setInfo(data);
    setLoading(false);
  }

  useEffect(() => {
    refresh();

    const timer = setInterval(refresh, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!info) {
    return (
      <div
        style={{
          padding:24,
          borderRadius:22,
          background:"#171B22",
          color:"white"
        }}
      >
        Loading Premiere...
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius:22,
        padding:24,
        background:"linear-gradient(180deg,#1A1F27,#13171E)",
        border:"1px solid rgba(255,255,255,.08)"
      }}
    >

      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:20
        }}
      >
        <div
          style={{
            fontSize:22,
            fontWeight:700,
            color:"white"
          }}
        >
          Premiere Status
        </div>

        <button
          onClick={refresh}
          disabled={loading}
          style={{
            padding:"8px 14px",
            borderRadius:12,
            border:"1px solid rgba(255,255,255,.08)",
            background:"#2563EB",
            color:"white",
            cursor:"pointer"
          }}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <Row label="Connected" value={info.connected ? "✅ Yes" : "❌ No"} />
      <Row label="Project" value={info.projectName || "--"} />
      <Row label="Sequence" value={info.sequenceName || "--"} />
      <Row label="Video Tracks" value={String(info.videoTracks)} />
      <Row label="Audio Tracks" value={String(info.audioTracks)} />
      <Row
        label="Resolution"
        value={
          info.frameSize
            ? `${info.frameSize.width} × ${info.frameSize.height}`
            : "--"
        }
      />
      <Row
        label="Timebase"
        value={info.timebase ? String(info.timebase) : "--"}
      />

    </div>
  );
}

function Row({
  label,
  value
}:{
  label:string;
  value:string;
}){

return(

<div
style={{
display:"flex",
justifyContent:"space-between",
marginBottom:12,
fontSize:14
}}
>

<span style={{color:"#8E98AA"}}>
{label}
</span>

<span style={{color:"white"}}>
{value}
</span>

</div>

);

}
