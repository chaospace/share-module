import React, { useRef, useState } from "react";
import { countHooks } from "share/Store";
import { ThemeProvider } from "styled-components";
import appTheme from "@/styles/theme"
import Typography from "./components/elements/Typography";
import { HBox, VBox } from "@/components/elements/Box";
import Button from "./components/elements/Button";
import Input from "@/components/elements/Input";
import Select from "./components/elements/Select";
import SearchAbleSelect from "./components/SearchAbleSelect";


const options = ["딸기", "참외", "수박"];
const options2 = [
    {
        label: "옵션2",
    },
    {
        label: "옵션1",
    },
    {
        label: "옵션3"
    }
]

const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();
    const pRef = useRef<HTMLSpanElement>(null);

    const [boxPadding, setBoxPadding] = useState(5);
    const onChangeBoxPadding = () => {
        setBoxPadding(~~(Math.random() * 10))
    }

    const onChangeSelect = (o: string) => {
        console.log("change-select", o);
    }
    const onChangeSelect2 = (o: typeof options2[0]) => {
        console.log("select2-o", o.label);
    }

    return (
        <ThemeProvider theme={ appTheme }>
            <VBox as="main" p={ boxPadding }>
                <label aaa="ee">
                    current : <Typography as="span" ref={ pRef as any }>{ count }</Typography>
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
                <Typography>
                    Next, we wrap our definition using the utility types that React provides to complete the props for a specified element. Typically, we statically write the tag, for example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E type.
                </Typography>
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
                    <Typography variant="title">Title</Typography>
                    <Typography>As a CSS utility component, the Typography component supports all system properties. You can use them as prop directly on the component. For example, here's how you'd add a margin-top</Typography>
                    <Typography>아크시스템웍스 아시아지점은 qureate사의 연애 어드벤처 게임 Nintendo Switch™ 『버니 가든』의 정식 한국어화 제작이 결정되었다고 발표하며, 게임 정보를 공개했다</Typography>
                </VBox>
                <Typography variant="title">Form element</Typography>
                <VBox>
                    <Input type="text" />
                    <Input type="text" className="inValid" />

                    <Input type="number" />
                    <Select defaultValue='참외' options={ options } onChange={ onChangeSelect } />
                    <Select defaultValue="옵션3" options={ options2 } onChange={ onChangeSelect2 } />
                </VBox>
                <VBox>
                    <Typography variant="title">검색 가능한 셀렉트</Typography>
                    <SearchAbleSelect options={ options2 } />
                </VBox>

            </VBox >
        </ThemeProvider >
    )
}

export default App;