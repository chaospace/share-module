import React, { useRef, useState } from "react";
import { countHooks } from "share/Store";
import styled, { ThemeProvider } from "styled-components";
import appTheme from "@/styles/theme"
import Text from "./components/elements/Typography";
import { HBox, VBox } from "@/components/elements/Box";
import Button from "./components/elements/Button";
import Typography from "./components/elements/Typography";



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
                    <Button variant="success" onClick={ () => setCount(prev => prev + 1) }>
                        카운트 증가
                    </Button>
                    <Button onClick={ () => setCount(prev => prev - 1) }>
                        카운트 감소
                    </Button>
                    <Button variant="primary" onClick={ () => setCount(0) }>
                        카운트 리셋
                    </Button>
                </HBox>
                <Text>
                    Next, we wrap our definition using the utility types that React provides to complete the props for a specified element. Typically, we statically write the tag, for example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E type.
                </Text>
                <HBox>
                    <Button variant="success" onClick={ onChangeBoxPadding }>
                        success
                    </Button>
                    <Button>
                        default
                    </Button>
                    <Button variant="warning">
                        warning
                    </Button>
                    <Button variant="info">
                        info
                    </Button>
                    <Button variant="danger">
                        danger
                    </Button>
                    <Button variant="primary">
                        primary
                    </Button>
                </HBox>
                <Button>이건 어떻게 보이나요<br />줄바꿈 텍스트</Button>
                <VBox>
                    <Typography as="h1">Title</Typography>
                    <Typography>As a CSS utility component, the Typography component supports all system properties. You can use them as prop directly on the component. For example, here's how you'd add a margin-top</Typography>
                    <Typography>아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™ 『버니 가든』의 정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다</Typography>
                </VBox>
            </VBox >
        </ThemeProvider >
    )
}

export default App;