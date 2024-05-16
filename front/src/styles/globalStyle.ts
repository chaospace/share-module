import { createGlobalStyle } from "styled-components";
import resetStyle from "./__partial/reset";
import baseStyles from "./__partial/base";
const GlobalStyle = createGlobalStyle`
    ${resetStyle}
    html, body {
        margin:0;
        padding:0;
        line-height: 100%;
        font-size: 16px;
    }
    ${baseStyles}
`;


export default GlobalStyle;