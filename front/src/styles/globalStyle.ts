import { createGlobalStyle } from 'styled-components';
import resetStyle from './__partial/reset';
import buttonStyles from './__partial/button';
import formStyles from './__partial/form';
import typographyStyle from './__partial/typography';

const GlobalStyle = createGlobalStyle`
    ${resetStyle}
    html, body {
        margin:0;
        padding:0;
        line-height: 100%;
        font-size: 16px;
    }
    ${buttonStyles}
    ${formStyles}
    ${typographyStyle}
`;


export default GlobalStyle;