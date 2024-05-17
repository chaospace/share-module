import { getVariantColor } from "@/styles/utils";
import { VariantCategory } from "styled";
import styled from "styled-components";
import { variant } from "@/colors";

interface StyledButtonProps {
    variant?: VariantCategory;
    borderRadius?: string;
    padding?: string;
    color?: string;
}

const backgroundColor = getVariantColor("variant", "main", variant);
const textColor = getVariantColor("variant", "light", variant);
const borderColor = getVariantColor("variant", "dark", variant);

const StyledButton = styled.button.withConfig({
    shouldForwardProp: prop => !['color', "borderRadius", "padding"].includes(prop)
}) <StyledButtonProps>`
    font:inherit;
    padding:0.5rem 1rem;
    border-radius:.25rem;
    background-color:${backgroundColor};
    color:${textColor};
    border-color:${borderColor};
    
    &:hover {
        background-color:${backgroundColor};
        color:${textColor}
    }
`;
// ExecutionContext & FastOmit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, keyof StyledButtonProps> & StyledButtonProps>
StyledButton.defaultProps = {
    variant: "default"
}

export default StyledButton;