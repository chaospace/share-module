import { ColorCategory, VariantCategory } from "@/@types/styled";
import styled from "styled-components";

interface StyledButtonProps {
    color?: ColorCategory;
    variant?: VariantCategory;
}

const StyledButton = styled.button<StyledButtonProps>`
    font:inherit;
    appearance: none;
    border:none;
    padding:0.5rem 1rem;
    border-radius:.25rem;
    border-width: 1px;
    border-style: solid;
    cursor:pointer;
    background-color:${(props) => props.theme.variant[props.variant!].main};
    color:${(props) => props.theme.variant[props.variant!].light};
    border-color:${(props) => props.theme.variant[props.variant!].dark};
`;

StyledButton.defaultProps = {
    variant: "default"
}

export default StyledButton;