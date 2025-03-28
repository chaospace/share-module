import { createBrowserRouter, useRouteError } from 'react-router-dom';
import App from './App';
import { VBox } from './components/elements/Box';
import Typography from './components/elements/Typography';
import ModalApp from './tutorial';
import UISample from './pages/sample';
import CheckBoxApp from './pages/checkbox';
import RadioApp from './pages/radio';
import MenuBarApp from './pages/menubar';
import BoundingRectListenerApp from './pages/boundingRectListener';
import AccordionApp from './pages/accordion';
import GridApp from './pages/grid';
import RangeApp from './pages/range';
import InfiniteApp_Advance from './pages/feed/index_ad';
import TabApp from './pages/tab';
import TooltipApp from './pages/tooltip';
import AutoCompleteApp from './pages/autocomplete';
import TypoApp from './pages/typo';
import SlidingPuzzle from './pages/puzzle';
import OPenTypeApp from './pages/openType';
import MDXApp from './pages/mdx';

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

// 라우터가 그룹핑 되면 어떻게 표현해야 할까
// 그냥 뎁스메뉴로 표현하면 된다.
// 그룹메뉴만 노출하고 세부메뉴는 더 하위에서 보이도록 하려면..

const routeChildren = [
  {
    path: 'mdx',
    element: <MDXApp />
  },
  {
    path: 'openType',
    element: <OPenTypeApp />
  },
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
    element: <BoundingRectListenerApp />
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
    path: 'modal',
    element: <ModalApp />
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
