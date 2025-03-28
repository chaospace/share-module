import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { H, P, Span } from '@/components/elements/Typography';
import Sample from './sample.mdx';
import styled from 'styled-components';

const _components = {
  h1: H,
  p: P,
  span: Span
};

const MDXBody = styled.div`
  body {
    background-color: #fff;
    color: #333;
    font:
      15px Helvetica,
      arial,
      freesans,
      clean,
      sans-serif;
    word-wrap: break-word;
    line-height: 1.7;
    padding: 0 20px 20px 20px;
    width: 722px;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: #4183c4;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  p,
  blockquote,
  ul,
  ol,
  dl,
  table,
  pre {
    margin: 15px 0;
  }

  ul,
  ol {
    padding-left: 30px;
  }

  h1 {
    border-bottom: 1px solid #ddd;
    color: #000;
    font-size: 2.5em;
  }

  h2 {
    border-bottom: 1px solid #eee;
    color: #000;
    font-size: 2em;
  }

  h3 {
    font-size: 1.5em;
  }

  h4 {
    font-size: 1.2em;
  }

  h5 {
    font-size: 1em;
  }

  h6 {
    color: #777;
    font-size: 1em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    line-height: 1.7;
    margin: 1em 0 15px 0;
  }

  h1 + p,
  h2 + p,
  h3 + p {
    margin-top: 10px;
  }

  img {
    max-width: 100%;
  }

  code,
  pre {
    background-color: #f8f8f8;
    border-radius: 3px;
    border: 1px solid #ddd;
    font-family: Consolas, 'Liberation Mono', Courier, monospace;
    font-size: 12px;
    margin: 0 2px;
    padding: 0 5px;
    white-space: pre;
  }

  pre code {
    border: none;
    margin: 0;
    padding: 0;
    white-space: pre;
  }
`;

const MDXContent = (props: any) => {
  return <MDXBody className='mdx-container'>{props.children}</MDXBody>;
};

function MDXApp() {
  return (
    <React.Fragment>
      <MDXProvider>
        <MDXContent>
          <Sample />
        </MDXContent>
      </MDXProvider>
    </React.Fragment>
  );
}

export default MDXApp;
