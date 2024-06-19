import { createBrowserRouter, useRouteError } from 'react-router-dom';
import App from './App';
import { VBox } from './components/elements/Box';
import Typography from './components/elements/Typography';
import TutorialApp from './tutorial';
import UISample from './pages/sample';
import CheckBoxApp from './pages/checkbox';
import RadioApp from './pages/radio';
import MenuBarApp from './pages/menubar';
import ChildrenApp from './pages/children';
import AccordionApp from './pages/accordion';
import GridApp from './pages/grid';
import RangeApp from './pages/range';
import InfiniteApp_Advance from './pages/feed/index_ad';
import TabApp from './pages/tab';
import TooltipApp from './pages/tooltip';
import AutoCompleteApp from './pages/autocomplete';
import TypoApp from './pages/typo';
import SlidingPuzzle from './pages/puzzle';

const ErrorPage = () => {
  const error = useRouteError() as any;
  return (
    <VBox width='100%' height='100vh' alignItems='center' justifyContent='center'>
      <Typography variant='title'>Oops!</Typography>
      <Typography variant='body'>Sorry, an unexpected error has occurred.</Typography>
      <Typography variant='body'>{error?.statusText || error.message}</Typography>
    </VBox>
  );
};

const routeChildren = [
  {
    path: 'slidingPuzzle',
    element: <SlidingPuzzle />
  },
  {
    path: 'typo',
    element: <TypoApp />
  },
  {
    path: 'autocomplete',
    element: <AutoCompleteApp />
  },
  {
    path: 'tooltip',
    element: <TooltipApp />
  },
  {
    path: 'tab',
    element: <TabApp />
  },
  {
    path: 'infinite',
    element: <InfiniteApp_Advance />
  },
  {
    path: 'range',
    element: <RangeApp />
  },
  {
    path: 'grid',
    element: <GridApp />
  },
  {
    path: 'accordion',
    element: <AccordionApp />
  },
  {
    path: 'BoundingRectListener',
    element: <ChildrenApp />
  },
  {
    path: 'menubar',
    element: <MenuBarApp />
  },
  {
    path: 'sample',
    element: <UISample />
  },
  {
    path: 'radio',
    element: <RadioApp />
  },
  {
    path: 'checkbox',
    element: <CheckBoxApp />
  },
  {
    path: 'tutorial',
    element: <TutorialApp />
  }
];

const router: any = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: routeChildren
  }
]);
export { routeChildren };
export default router;
