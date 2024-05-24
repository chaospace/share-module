import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '@/styles/globalStyle';
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
