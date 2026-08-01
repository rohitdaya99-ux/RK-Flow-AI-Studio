type Props={
label:string;
color:string;
};

export default function StatusBadge({
label,
color
}:Props){

return(

<div
style={{
display:"inline-flex",
alignItems:"center",
gap:8,
padding:"8px 14px",
borderRadius:999,
background:"rgba(255,255,255,.05)",
border:"1px solid rgba(255,255,255,.08)",
fontSize:13,
color:"#fff",
fontWeight:600
}}
>

<div
style={{
width:8,
height:8,
borderRadius:"50%",
background:color
}}
/>

{label}

</div>

);

}
