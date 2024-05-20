import { css } from "styled-components";

const formStyles = css`
    input[type='text'],
    input[type='tel'],
    input[type='url'], 
    input[type="search"],
    input[type='email'],
    input[type='number'], 
    select,
    textarea {
        appearance: none;
        border-style:solid;
        outline: 1px solid transparent;
        padding:0.5rem 1rem;
        border-width: 1px;
        border-radius:.5rem;
    }
    
    select {
        padding-block:10px; //크롬 기본스타일 값 적용
    }
`;
export default formStyles;