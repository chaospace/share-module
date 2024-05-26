import { createGlobalStyle } from 'styled-components';
import resetStyle from './__partial/reset';
import buttonStyles from './__partial/button';
import formStyles from './__partial/form';
import typographyStyle from './__partial/typography';
import hrStyles from './__partial/hr';

const GlobalStyle = createGlobalStyle`
    ${resetStyle}
    html, body {
        margin:0;
        padding:0;
        line-height:normal;
        font-size: 16px;
    }
    ${buttonStyles}
    ${formStyles}
    ${typographyStyle}
    ${hrStyles}
    #app{
      position: relative;
      
    }
    //요소 focus시 기본스타일
    *:focus {
      outline: 2px solid darkblue;
    }
`;

export default GlobalStyle;
