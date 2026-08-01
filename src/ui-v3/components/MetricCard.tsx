type Props = {
  title: string;
  value: string;
  color?: string;
};

export default function MetricCard({
  title,
  value,
  color="#4F8CFF"
}:Props){

return(

<div
style={{
borderRadius:22,
padding:20,
background:"linear-gradient(180deg,#1A1F27,#13171E)",
border:"1px solid rgba(255,255,255,.08)",
boxShadow:"0 10px 24px rgba(0,0,0,.30)"
}}
>

<div
style={{
fontSize:13,
color:"#8B95A7",
marginBottom:10
}}
>
{title}
</div>

<div
style={{
fontSize:34,
fontWeight:800,
color
}}
>
{value}
</div>

</div>

);

}
