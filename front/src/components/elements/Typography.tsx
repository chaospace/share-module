import React from "react";
import styled from "styled-components";
import { CSSComposerObject, composer, shouldForwardAllProps } from "styled-composer";
import { PropsWithHTMLAttributes } from "../types";


interface TypographyProps extends CSSComposerObject { };

// 이 방식에 문제점. as속성이 없으면 기본속성을 추론 못함.
const Typography = styled("p").withConfig({
    shouldForwardProp: shouldForwardAllProps
})<PropsWithHTMLAttributes<'p', TypographyProps>>(composer);

export default Typography;