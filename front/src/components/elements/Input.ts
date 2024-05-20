import styled, { ExecutionContext } from "styled-components";
import { PropsWithHTMLAttributes } from "../types";
import { CSSComposerObject, composer as defaultComposr, shouldForwardAllProps } from "styled-composer";
import { variant } from "@/colors";



interface InputProps extends CSSComposerObject { };

const inputVariant = {
    light: {
        borderColor: variant.default.main,
        focus: {
            outlineColor: variant.primary.dark,
            borderColor: variant.primary.main,
        },
        invalid: {
            borderColor: variant.danger.main,
            backgroundColor: variant.danger.light,
            outlineColor: variant.danger.dark,
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
        "&.invalid": variant.invalid
    }
}


const Input = styled("input").withConfig({
    shouldForwardProp: shouldForwardAllProps
}) <PropsWithHTMLAttributes<"input", InputProps>>`
    ${defaultComposr}
    ${composer}
`;

const SearchInput = styled(Input).attrs({ type: "search" })`
    &::-webkit-search-cancel-button{
        appearance: none;
    }
`;

export { SearchInput };

export default Input;