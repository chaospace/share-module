import React from 'react';
import { ThemeProvider } from 'styled-components';
import appTheme from '@/styles/theme';
import { HBox, VBox } from '@/components/elements/Box';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <VBox p={5}>
        <HBox>
          <Link to='/sample'>ui샘플</Link>
          <Link to='/tutorial'>ui 튜토리얼</Link>
        </HBox>

        <Outlet />
      </VBox>
    </ThemeProvider>
  );
};

export default App;
