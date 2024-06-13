import React from 'react';
import { ThemeProvider } from 'styled-components';
import appTheme from '@/styles/theme';
import { HBox, VBox } from '@/components/elements/Box';
import { Link, Outlet } from 'react-router-dom';
import { routeChildren } from './router';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/elements/Button';
import Typography from './components/elements/Typography';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallback={info => {
                  return (
                    <React.Fragment>
                      <VBox>
                        <Typography variant='subTitle1'>error 발생</Typography>
                        <Typography>{info.error?.message ?? ''}</Typography>
                        <Button
                          onClick={() => {
                            info?.reset && info.reset();
                            reset();
                          }}>
                          리셋
                        </Button>
                      </VBox>
                    </React.Fragment>
                  );
                }}>
                <VBox m={7}>
                  <Outlet />
                </VBox>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </VBox>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
