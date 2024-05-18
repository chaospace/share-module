import { PropsWithHTMLAttributes } from "@/components/types";
import styled, { ExecutionContext, css } from "styled-components";
import { CSSComposerObject, composer, shouldForwardAllProps } from "styled-composer";
import { VariantCategory, VariantColorType } from "styled";

type ButtonProps = PropsWithHTMLAttributes<"button", { variant?: VariantCategory } & CSSComposerObject>;
const vriantHoverComposer = (props: ExecutionContext & ButtonProps) => {
    const variant: VariantColorType = props.theme.variant[props.variant!];
    return {
        color: variant.light,
        backgroundColor: variant.main,
        borderColor: variant.dark,
        "&:hover": {
            // color: variant.main,
            backgroundColor: variant.dark
        }
    }
}
// variant를 이용한 컬러 제어
const Button = styled.button.withConfig({ shouldForwardProp: shouldForwardAllProps }) <ButtonProps>`
    ${composer};
    ${vriantHoverComposer};
`
Button.defaultProps = {
    variant: "default",
    borderRadius: "0.25rem",
    fontWeight: "bold"
}
export default Button;