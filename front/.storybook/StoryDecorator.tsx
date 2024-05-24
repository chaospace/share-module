import React from 'react';
import GlobalStyle from '@/styles/globalStyle';
import appTheme from '@/styles/theme';
import { Title, Subtitle, Description, Controls, Primary } from '@storybook/blocks';
import { ThemeProvider } from 'styled-components';

const StoryDecorator = (Story: any) => (
  <>
    <GlobalStyle />
    <div style={{ padding: '2rem' }}>
      <ThemeProvider theme={appTheme}>
        <Story />
      </ThemeProvider>
    </div>
  </>
);

const DocDecorator = () => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
    </>
  );
};
export { DocDecorator };
export default StoryDecorator;
