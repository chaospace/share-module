import React from "react";
import { countHooks } from "share/Store";
import "@/assets/styles/index.css";

const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();

    return (
        <div className="container-vertical">
            <label style={ { fontSize: "20px" } }>
                current : <span>{ count }</span>
            </label>
            <button onClick={ () => setCount(prev => prev + 1) }>카운트+1</button>
        </div >

    )
}

export default App;