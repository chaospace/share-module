import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import appTheme from '@/styles/theme';
import { HBox, VBox } from '@/components/elements/Box';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routeChildren } from './router';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/elements/Button';
import Typography, { H, P } from './components/elements/Typography';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitTextMenu from './components/splitTextMenu';
import { Container } from './components/elements/Container';

gsap.registerPlugin(useGSAP);

const queryClient = new QueryClient();

const Foo = () => {
  return (
    <React.Fragment>
      <P>화면 구성중...</P>
    </React.Fragment>
  );
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onClickMenu = (to: string) => {
    navigate(to);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appTheme}>
        <VBox p={5}>
          <H>개인 스터디 내용 정리 페이지</H>

          <HBox overflow='hidden' overflowX='auto' height={40}>
            {routeChildren.map(o => {
              const path = `/${o.path}`;
              return (
                <SplitTextMenu
                  key={path}
                  link={path}
                  selected={location?.pathname === path}
                  onClick={onClickMenu}>
                  {o.path}
                </SplitTextMenu>
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
                <Container m={7}>
                  <Suspense fallback={<Foo />}>
                    <Outlet />
                  </Suspense>
                </Container>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </VBox>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
