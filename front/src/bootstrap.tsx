import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "@/styles/globalStyle";
import App from "./App";

ReactDOM.createRoot(document.querySelector("#app")!).render(
    <React.StrictMode>
        <GlobalStyle />
        <App />

    </React.StrictMode>
);