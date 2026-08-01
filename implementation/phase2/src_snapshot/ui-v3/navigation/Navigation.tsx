const items = [
  { icon:"🏠", title:"Dashboard" },
  { icon:"🎬", title:"Timeline" },
  { icon:"💍", title:"Wedding AI" },
  { icon:"🎵", title:"Music AI" },
  { icon:"📦", title:"Assets" },
  { icon:"📤", title:"Export" },
  { icon:"⚙️", title:"Settings" }
];

type Props = {
  activeFeature: string;
  onNavigate: (feature: string) => void;
};

export default function Navigation({ activeFeature, onNavigate }: Props) {

  return (
    <div
      style={{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        padding:16,
        gap:14,
        background:"#101317"
      }}
    >

      <div
        style={{
          height:58,
          borderRadius:18,
          background:"#2563EB",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:"white",
          fontWeight:800,
          fontSize:22,
          marginBottom:18
        }}
      >
        RK
      </div>

      {items.map(item=>(
        <button
          type="button"
          key={item.title}
          title={item.title}
          style={{
            width:56,
            height:56,
            borderRadius:18,
            border:"1px solid rgba(255,255,255,.08)",
            background:activeFeature === item.title ? "#2563EB" : "rgba(255,255,255,.04)",
            color:"white",
            fontSize:22,
            cursor:"pointer",
            transition:"all .2s ease"
          }}
          onClick={()=>onNavigate(item.title)}
          onMouseEnter={(e)=>{
            e.currentTarget.style.background="#2563EB";
            e.currentTarget.style.transform="scale(1.05)";
          }}
          onMouseLeave={(e)=>{
            e.currentTarget.style.background=activeFeature === item.title ? "#2563EB" : "rgba(255,255,255,.04)";
            e.currentTarget.style.transform="scale(1)";
          }}
        >
          {item.icon}
        </button>
      ))}

      <div style={{flex:1}} />

      <button
        type="button"
        title="Profile"
        onClick={()=>onNavigate("Profile")}
        style={{
          width:56,
          height:56,
          borderRadius:18,
          background:"#1B1F27",
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          color:"#888",
          border:"1px solid rgba(255,255,255,.08)",
          cursor:"pointer"
        }}
      >
        👤
      </button>

    </div>
  );
}
