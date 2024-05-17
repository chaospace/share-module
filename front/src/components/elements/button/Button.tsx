import React from "react";
import { PropsWithHTMLAttributes } from "@/components/types";
import styled from "styled-components";
import { CSSComposerObject, composer, shouldForwardAllProps } from "styled-composer";

type ButtonProps = PropsWithHTMLAttributes<"button", CSSComposerObject>;

const Button = styled.button.withConfig({ shouldForwardProp: shouldForwardAllProps }) <ButtonProps>`
    ${composer};
    &:hover{
        background-color: aliceblue;
    }
`
Button.defaultProps = {
    position: "relative",
    display: "inline-block",
    px: "1rem",
    py: "0.5rem",
    whiteSpace: "nowrap",
    width: "min-content"
}

export default Button;