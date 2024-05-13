import React, { useEffect, useRef } from "react";
import { countHooks } from "share/Store";
import "@/index.css";
import Button from "./components/elements/button/Button";
import Text from "./components/elements/paragraph/Text";
import Box from "./components/elements/sample/refComp";
import Box2 from "./components/elements/sample/refComp2";


const FooRef = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ color?: string }>>(({ color, children }, ref) => {
    return (
        <span ref={ ref }>{ children }</span>
    )
})

const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();
    const pRef = useRef<HTMLParagraphElement>(null);


    return (
        <div className="app-container">
            <label>
                current : <Text as="p" ref={ pRef }>{ count }</Text>
            </label>
            <Button onClick={ () => setCount(prev => prev + 1) }>카운트+1</Button>
            <Button onClick={ () => setCount(0) }>리셋</Button>
            <Text>
                Next, we wrap our definition using the utility types that React provides to complete the props for a specified element. Typically, we statically write the tag, for example React.ComponentPropsWithoutRef , but since we are dealing with a dynamic tag, we pass the E type.
            </Text>
        </div >

    )
}

export default App;