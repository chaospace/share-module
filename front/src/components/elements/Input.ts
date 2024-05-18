import styled, { ExecutionContext } from "styled-components";
import { PropsWithHTMLAttributes } from "../types";
import { CSSComposerObject, composer as defaultComposr, shouldForwardAllProps } from "styled-composer";
import { variant } from "@/colors";
import { shouldForwardCSSProps } from "@/styles/utils";


interface InputProps extends CSSComposerObject { };

const inputVariant = {
    light: {
        borderColor: variant.default.main,
        focus: {
            borderColor: variant.primary.main
        },
        invalid: {
            borderColor: variant.danger.main,
            backgroundColor: variant.danger.light
        }
    },
    dark: {
        backgroundColor: variant.default.dark,
        focus: {
            borderColor: variant.primary.main
        },
        invalid: {
            borderColor: variant.danger.main,
            backgroundColor: variant.danger.light
        }
    }
}

const composer = (props: ExecutionContext & InputProps) => {
    const variant = inputVariant[props.theme.mode];
    return {
        "&:focus": variant.focus,
        "&.inValid": variant.invalid
    }
}


const Input = styled("input").withConfig({
    shouldForwardProp: shouldForwardAllProps
}) <PropsWithHTMLAttributes<"input", InputProps>>`
    ${defaultComposr}
    ${composer}
`;

Input.defaultProps = {}

export default Input;