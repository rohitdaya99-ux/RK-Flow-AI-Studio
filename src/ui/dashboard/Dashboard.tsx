import GlassCard from "../widgets/GlassCard";

export default function Dashboard(){

return(

<div className="dashboard">

<GlassCard title="AI Assistant">
Gemini Ready
</GlassCard>

<GlassCard title="Timeline">
No Sequence Loaded
</GlassCard>

<GlassCard title="Music Analysis">
Waiting...
</GlassCard>

<GlassCard title="Clip Analysis">
Waiting...
</GlassCard>

<GlassCard title="Workflow">
Idle
</GlassCard>

<GlassCard title="Export">
Not Started
</GlassCard>

</div>

);

}
