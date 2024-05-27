import { createBrowserRouter, useRouteError } from 'react-router-dom';
import App from './App';
import { VBox } from './components/elements/Box';
import Typography from './components/elements/Typography';
import TutorialApp from './tutorial';
import UISample from './pages/sample';
import CheckBoxApp from './pages/checkbox';

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <VBox width='100%' height='100vh' alignItems='center' justifyContent='center'>
      <Typography variant='title'>Oops!</Typography>
      <Typography variant='body'>Sorry, an unexpected error has occurred.</Typography>
      <Typography variant='body'>{error.statusText || error.message}</Typography>
    </VBox>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'sample',
        element: <UISample />
      },
      {
        path: 'checkbox',
        element: <CheckBoxApp />
      },
      {
        path: 'tutorial',
        element: <TutorialApp />
      }
    ]
  }
]);
//The inferred type of 'router' cannot be named without a reference to '.pnpm/@remix-run+router@1.16.1/node_modules/@remix-run/router'. This is likely not portable. A type annotation is necessary.

export default router;
