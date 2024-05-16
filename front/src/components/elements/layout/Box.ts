//import { HTMLAttributes } from "react";
import { curriedShouldForwardProp } from "@/styles/utils";
import styled from "styled-components";

// default style
interface BoxProps {
    direction?: "column" | "row";
    gap?: number;
    padding?: string;
}

const Box = styled.div.withConfig({
    shouldForwardProp: curriedShouldForwardProp(['gap', 'direction', 'padding'])
}) <BoxProps>`
    position: relative;
    display: flex;
    flex-direction: ${props => props.direction};
    gap:${props => props?.gap || "0.5rem"};
    padding:${props => props?.padding};
`;

const VBox = styled(Box)`
    flex-direction: column;
`

const HBox = styled(Box)`
    flex-direction: row;
`


export {
    Box,
    VBox,
    HBox
}