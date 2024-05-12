import React, { HTMLAttributes, PropsWithChildren } from "react";
import styles from "./style.module.css";
console.log("button", styles);
function Button({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) {

    return (
        <button  { ...props }>
            { children }
        </button>
    )
}


export default Button;