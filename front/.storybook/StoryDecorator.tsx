import React from 'react';
import GlobalStyle from '@/styles/globalStyle';
import appTheme from '@/styles/theme';
import { Title, Subtitle, Description, Controls, Primary } from '@storybook/blocks';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const StoryDecorator = (Story: any) => (
  <>
    <GlobalStyle />
    <div style={{ padding: '2rem' }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={appTheme}>
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
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
