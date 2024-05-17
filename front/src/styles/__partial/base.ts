import { css } from "styled-components";


const baseStyles = css`
    button {
        appearance: none;
        outline: none;
        border-style: solid;
        border-width: 1px;
        line-height: 1.6;
    }

    input[type='text'],
    input[type='tel'],
    input[type='url'], 
    input[type='email'],
    input[type='number'], 
    select,
    textarea {
        appearance: none;
        outline: none;
    }
`;

export default baseStyles;