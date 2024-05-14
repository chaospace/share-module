import { getVariantColor } from "@/styles/utils";
import { VariantCategory } from "styled";
import styled from "styled-components";
import { variant } from "@/colors";

interface StyledButtonProps {
    variant?: VariantCategory;
}

const backgroundColor = getVariantColor("variant", "main", variant);
const textColor = getVariantColor("variant", "light", variant);
const borderColor = getVariantColor("variant", "dark", variant);

const StyledButton = styled.button<StyledButtonProps>`
    font:inherit;
    appearance: none;
    border:none;
    padding:0.5rem 1rem;
    border-radius:.25rem;
    border-width: 1px;
    border-style: solid;
    cursor:pointer;
    background-color:${backgroundColor};
    color:${textColor};
    border-color:${borderColor};
`;

StyledButton.defaultProps = {
    variant: "default"
}

export default StyledButton;