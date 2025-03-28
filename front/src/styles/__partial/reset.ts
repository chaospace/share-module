import { css } from 'styled-components';
const resetStyle = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    text-rendering: optimizelegibility;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }

  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  textarea,
  p,
  blockquote,
  th,
  td {
    margin: 0;
    padding: 0;
  }

  li {
    padding: 0;
    list-style-type: none;
    -webkit-padding-start: 0;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;

    tr {
      .td,
      .th {
        padding: 0;
      }
    }
  }

  a {
    &:link,
    &:active,
    &:visited,
    &:hover {
      color: inherit;
      text-decoration: none;
    }

    > img {
      border: 0;
    }
  }

  article,
  aside,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  nav,
  section {
    display: block;
  }

  abbr {
    &[title],
    &[data-original-title] {
      border-bottom: 0;
      text-decoration: underline dotted;
      text-decoration-skip-ink: none;
      cursor: help;
    }
  }

  address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  [role='button'] {
    cursor: pointer;
  }

  select {
    word-wrap: normal;
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: button;
  }

  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  button:not(:disabled),
  [type='button']:not(:disabled),
  [type='reset']:not(:disabled),
  [type='submit']:not(:disabled) {
    cursor: pointer;
  }

  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      appearance: none;
    }

    &[type='number'] {
      appearance: textfield;
    }

    &[type='radio'],
    &[type='checkbox'] {
      padding: 0;
    }
  }

  textarea {
    overflow: auto;
    resize: vertical;
  }

  fieldset {
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
  }

  legend {
    display: block;
    width: 100%;
    max-width: 100%;
    margin-bottom: 0.5rem;
    padding: 0;
    color: inherit;
    font-size: 1.5rem;
    line-height: inherit;
    white-space: normal;
  }

  progress {
    vertical-align: baseline;
  }

  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  [type='search'] {
    outline-offset: -2px;
    appearance: none;
  }

  [type='search']::-webkit-search-decoration {
    appearance: none;
  }

  ::-webkit-file-upload-button {
    font: inherit;
    appearance: button;
  }

  output {
    display: inline-block;
  }

  summary {
    display: list-item;
    cursor: pointer;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }
`;

export default resetStyle;
