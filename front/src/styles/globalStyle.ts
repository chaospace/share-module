import { createGlobalStyle } from "styled-components";
import resetStyle from "./reset";
const GlobalStyle = createGlobalStyle`
    ${resetStyle}
    html, body {
        margin:0;
        padding:0;
        line-height: 100%;
        font-size: 16px;
    }
`;


export default GlobalStyle;