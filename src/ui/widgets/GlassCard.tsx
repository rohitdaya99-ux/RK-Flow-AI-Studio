import React from "react";

export default function GlassCard({
  title,
  children
}:{
  title:string;
  children?:React.ReactNode;
}){

return(

<div className="glass card">

<h3>{title}</h3>

{children}

</div>

);

}
