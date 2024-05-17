import type { PropsWithHTMLAttributes } from "@/components/types";
import styled from "styled-components";
import { composer, shouldForwardAllProps } from "styled-composer";

// default style
interface BoxProps {
    position?: string;
    display?: string;
    flexDirection?: string;
    gap?: string;
    p?: string;
    pl?: string;
    pr?: string;
    pt?: string;
    pb?: string;
    px?: string;
    py?: string;
    m?: string;
    ml?: string;
    mt?: string;
    mb?: string;
    mr?: string;
    mx?: string;
    my?: string;
}

const Box = styled("div").withConfig({
    shouldForwardProp: shouldForwardAllProps
})<PropsWithHTMLAttributes<"div", BoxProps>>(composer)

Box.defaultProps = {
    position: "relative",
    display: "flex",
    gap: "0.5rem"
}


const VBox = styled(Box)(composer);
VBox.defaultProps = {
    flexDirection: "column"
}

const HBox = styled(Box)(composer);
HBox.defaultProps = {
    flexDirection: "row"
}


export {
    Box,
    VBox,
    HBox
}