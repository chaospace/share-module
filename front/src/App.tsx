import React, { useRef, useState } from "react";
import { countHooks } from "share/Store";
import styled, { ThemeProvider } from "styled-components";
import appTheme from "@/styles/theme"
import Text from "./components/elements/paragraph/Text";
import StyledButton from "@/components/elements/button/StyledButton";
import { HBox, VBox } from "@/components/elements/layout/Box";
import Button from "./components/elements/button/Button";


const Foo = styled.div.withConfig({
    shouldForwardProp: prop => !["backgroundColor"].includes(prop)
}) <{ backgroundColor?: string }>`
    position: relative;
    padding: 8px;
    border: 1px solid black;
`;

const Foo2 = styled("div").withConfig({
    shouldForwardProp: prop => !["backgroundColor"].includes(prop)
})<{ backgroundColor?: string }>((props) => ({
    backgroundColor: props.backgroundColor,
    padding: "8px",
    "&:hover": {
        backgroundColor: "#ff0000"
    }
}));
Foo2.defaultProps = {
    backgroundColor: "#ffcc00"
}

const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();
    const pRef = useRef<HTMLSpanElement>(null);

    const [boxPadding, setBoxPadding] = useState(5);
    const onChangeBoxPadding = () => {
        setBoxPadding(~~(Math.random() * 10))
    }
    return (
        <ThemeProvider theme={ appTheme }>
            <VBox as="main" p={ boxPadding }>
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
                    <StyledButton variant="success" onClick={ onChangeBoxPadding }>
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
                <Foo>
                    일반스타일드 컴포넌트
                </Foo>
                <Foo2>
                    배경있는 스타일드 컴포넌트
                </Foo2>
                <Button>이건 어떻게 보이나요<br />줄바꿈 텍스트</Button>
            </VBox >
        </ThemeProvider >
    )
}

export default App;