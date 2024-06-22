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
        font-size: 1rem;
        font-family: "Noto Sans KR", sans-serif, 'Apple SD Gothic Neo';
        font-optical-sizing: auto;
    }
    ${buttonStyles}
    ${formStyles}
    ${typographyStyle}
    ${hrStyles}
    #app{
      position: relative;
      
    }
    //keyboard에 의한 focus시 적용 스타일
    *:focus-visible {
      outline: 2px solid darkblue;
    }
`;

export default GlobalStyle;
