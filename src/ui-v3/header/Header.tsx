export default function Header(){

return(

<div
style={{
height:72,
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 28px",
marginBottom:22,
borderRadius:22,
background:"linear-gradient(180deg,#1C212A,#14181F)",
border:"1px solid rgba(255,255,255,.08)",
boxShadow:"0 12px 30px rgba(0,0,0,.25)"
}}
>

<div>

<div
style={{
fontSize:26,
fontWeight:800,
color:"#fff"
}}
>
RK Flow AI
</div>

<div
style={{
marginTop:4,
fontSize:13,
color:"#8C97AA"
}}
>
Professional Wedding Editing Workspace
</div>

</div>

<div
style={{
display:"flex",
alignItems:"center",
gap:14
}}
>

<div
style={{
padding:"10px 18px",
borderRadius:14,
background:"#1D2532",
color:"#7CF29A",
fontWeight:700,
fontSize:13
}}
>
● Gemini Connected
</div>

<div
style={{
padding:"10px 18px",
borderRadius:14,
background:"#1B2028",
color:"#fff",
fontSize:13
}}
>
Project Ready
</div>

</div>

</div>

);

}
