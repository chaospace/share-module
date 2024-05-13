import React from "react";
import { polymorphicForwardRef } from "@/components/types";

// 이 방식에 문제점. as속성이 없으면 기본속성을 추론 못함.
const Text = polymorphicForwardRef<"p", React.PropsWithChildren<{ color?: string }>, "p" | "span">(({ as: Element = "p", children, ...rest }, forwardedRef) => {
    return (<Element ref={ forwardedRef } { ...rest }>{ children }</Element>)
});
export default Text;