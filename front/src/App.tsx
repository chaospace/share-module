import React from 'react';
import { ThemeProvider } from 'styled-components';
import appTheme from '@/styles/theme';
import { HBox, VBox } from '@/components/elements/Box';
import { Link, Outlet } from 'react-router-dom';
import { routeChildren } from './router';

const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <VBox p={5}>
        <HBox>
          {routeChildren.map(o => {
            const path = `/${o.path}`;
            return (
              <Link key={path} to={path}>
                {o.path}
              </Link>
            );
          })}
        </HBox>
        <Outlet />
      </VBox>
    </ThemeProvider>
  );
};

export default App;
