export default function SearchBar(){

return(

<div
style={{
height:46,
display:"flex",
alignItems:"center",
padding:"0 16px",
borderRadius:16,
background:"rgba(255,255,255,.05)",
border:"1px solid rgba(255,255,255,.08)"
}}
>

<span
style={{
marginRight:10,
opacity:.7
}}
>
🔍
</span>

<input
placeholder="Search projects, clips, AI commands..."
style={{
flex:1,
background:"transparent",
border:"none",
outline:"none",
color:"white",
fontSize:14
}}
/>

</div>

);

}
