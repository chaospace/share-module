import React, { useEffect, useRef } from "react";
import { countHooks } from "share/Store";
import { ThemeProvider } from "styled-components";
import appTheme from "@/styles/theme"
import Text from "./components/elements/paragraph/Text";
import StyledButton from "@/components/elements/button/StyledButton";
import { HBox, VBox } from "@/components/elements/layout/Box";


const FooRef = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ color?: string }>>(({ color, children }, ref) => {
    return (
        <span ref={ ref }>{ children }</span>
    )
})

const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();
    const pRef = useRef<HTMLSpanElement>(null);


    return (
        <ThemeProvider theme={ appTheme }>
            <VBox as="main" p="5">
                <label>
                    current : <Text as="span" ref={ pRef }>{ count }</Text>
                </label>
                <HBox>
                    <StyledButton variant="success" onClick={ () => setCount(prev => prev + 1) }>
                        카운트 증가
                    </StyledButton>
                    <StyledButton onClick={ () => setCount(prev => prev - 1) }>
                        카운트 감소
                    </StyledButton>
                    <StyledButton variant="primary" onClick={ () => setCount(0) }>
                        카운트 리셋
                    </StyledButton>
                </HBox>
                <Text>
                    Next, we wrap our definition using the utility types that React provides to complete the props for a specified element. Typically, we statically write the tag, for example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E type.
                </Text>
                <HBox>
                    <StyledButton variant="success">
                        success
                    </StyledButton>
                    <StyledButton>
                        default
                    </StyledButton>
                    <StyledButton variant="warning">
                        warning
                    </StyledButton>
                    <StyledButton variant="info">
                        info
                    </StyledButton>
                    <StyledButton variant="danger">
                        danger
                    </StyledButton>
                    <StyledButton variant="primary">
                        primary
                    </StyledButton>
                </HBox>

            </VBox >
        </ThemeProvider>
    )
}

export default App;