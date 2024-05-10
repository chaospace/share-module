import React from "react";
import ReactDOM from "react-dom/client";
import { Store } from "shareModule/ShareModule";
const { countHooks, pokemonHooks } = Store;
const App = () => {
    const count = countHooks.useCount();
    const setCount = countHooks.useSetCount();
    // const pokemons = pokemonHooks.usePokemons();

    return (
        <>
            <p>hello! { count }</p>
            <button onClick={ () => setCount(prev => prev + 1) }>카운트+1</button>
        </>

    )
}

ReactDOM.createRoot(document.querySelector("#app")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);