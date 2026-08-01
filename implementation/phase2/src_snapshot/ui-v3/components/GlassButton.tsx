type Props={
label:string;
primary?:boolean;
onClick?:()=>void;
};

export default function GlassButton({
label,
primary=false,
onClick
}:Props){

return(

<button
type="button"
onClick={onClick}
style={{
padding:"12px 22px",
borderRadius:16,
border:"1px solid rgba(255,255,255,.08)",
background:primary
?"linear-gradient(180deg,#3B82F6,#2563EB)"
:"rgba(255,255,255,.05)",
color:"#fff",
fontWeight:700,
fontSize:14,
cursor:"pointer",
transition:"all .18s ease",
boxShadow:primary
?"0 10px 30px rgba(37,99,235,.35)"
:"none"
}}

onMouseEnter={e=>{
e.currentTarget.style.transform="translateY(-2px)";
}}

onMouseLeave={e=>{
e.currentTarget.style.transform="translateY(0px)";
}}

>

{label}

</button>

);

}
