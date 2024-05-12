import React from "react";
import { countHooks } from "share/Store";
import "@/index.css";
import Button from "./components/elements/button/Button";

const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();

    return (
        <div className="app-container">
            <label>
                current : <span>{ count }</span>
            </label>
            <Button onClick={ () => setCount(prev => prev + 1) }>카운트+1</Button>
        </div >

    )
}

export default App;