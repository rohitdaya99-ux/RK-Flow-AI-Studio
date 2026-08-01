import "./style.css";
import React from "react";
import clsx from "clsx";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant="primary",
  size="md",
  onClick,
  disabled
}:ButtonProps){

return(

<button
className={clsx(
"rk-button",
`rk-${variant}`,
`rk-${size}`
)}
onClick={onClick}
disabled={disabled}
>

{children}

</button>

);

}
