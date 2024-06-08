import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '@/styles/globalStyle';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const prepareRender = async () => {
  console.log('process', process.env.mode);
  if (process.env.mode === 'development') {
    const { worker } = await import('./mocks/server');
    return worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js'
      }
    });
  }
  return Promise.resolve();
};

prepareRender().then(() => {
  ReactDOM.createRoot(document.querySelector('#app')!).render(
    <React.StrictMode>
      <GlobalStyle />
      <RouterProvider router={router} />
    </React.StrictMode>
  );
});
