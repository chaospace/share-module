import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
    return (
        <p>hello!</p>
    )
}

ReactDOM.createRoot(document.querySelector("#app")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);