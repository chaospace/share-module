import { css } from 'styled-components';

const formStyles = css`
  input[type='text'],
  input[type='tel'],
  input[type='url'],
  input[type='file'],
  input[type='search'],
  input[type='email'],
  input[type='password'],
  input[type='number'],
  select,
  textarea {
    appearance: none;
    border-style: solid;
    outline: 1px solid transparent;
    padding: 0.5rem 1rem;
    border-width: 1px;
    border-radius: 0.5rem;
  }

  input[type='checkbox'],
  input[type='radio'] {
    appearance: none;
  }

  input[type='search']::-webkit-search-cancel-button {
    appearance: none;
  }

  select {
    padding-block: 10px; //크롬 기본스타일 값 적용
  }
`;
export default formStyles;
