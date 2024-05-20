import { css } from 'styled-components';


const baseStyles = css`
    button {
        position: relative;
        appearance: none;
        outline: none;
        border-style: solid;
        border-width: 1px;
        display: inline-flex;
        width: min-content;
        white-space: nowrap;
        padding:0.5rem 1rem;
        align-items: center;
        font-weight: bold;
        border-radius: 0.25rem;
    }
`;

export default baseStyles;