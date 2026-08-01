import { useEffect, useState } from "react";
import { premiereService, TimelineInfo } from "../../services/premiereService";

export default function TimelineSummary() {

  const [info, setInfo] = useState<TimelineInfo | null>(null);

  async function load() {
    const data = await premiereService.getTimelineInfo();
    setInfo(data);
  }

  useEffect(() => {
    load();
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
          color:"#fff",
          fontSize:22,
          fontWeight:700,
          marginBottom:20
        }}
      >
        Timeline Summary
      </div>

      <Item
        label="Sequence"
        value={info?.sequenceName || "--"}
      />

      <Item
        label="Duration"
        value={info?.duration || "--"}
      />

      <Item
        label="Video Tracks"
        value={String(info?.videoTracks ?? "--")}
      />

      <Item
        label="Audio Tracks"
        value={String(info?.audioTracks ?? "--")}
      />

    </div>
  );
}

function Item({
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
marginBottom:14
}}
>

<span style={{color:"#8E98AA"}}>
{label}
</span>

<span style={{color:"#fff"}}>
{value}
</span>

</div>

);

}
