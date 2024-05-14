import React, { useEffect, useRef } from "react";
import { countHooks } from "share/Store";
import { ThemeProvider } from "styled-components";
import appTheme from "@/styles/theme"
import Button from "./components/elements/button/Button";
import Text from "./components/elements/paragraph/Text";
import StyledButton from "./components/elements/sample/StyledButton";
import { VBox } from "./components/layout/Box";


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
            <VBox as="main" padding="8px">
                <label>
                    current : <Text as="span" ref={ pRef }>{ count }</Text>
                </label>
                {/* <Button onClick={ () => setCount(prev => prev + 1) }>카운트+1</Button>
                <Button onClick={ () => setCount(0) }>리셋</Button>
                <Button state="warning">경고</Button> */}
                <Text>
                    Next, we wrap our definition using the utility types that React provides to complete the props for a specified element. Typically, we statically write the tag, for example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E type.
                </Text>
                <StyledButton variant="success">
                    기본버튼
                </StyledButton>
                <StyledButton>
                    기본버튼
                </StyledButton>
            </VBox >
        </ThemeProvider>
    )
}

export default App;