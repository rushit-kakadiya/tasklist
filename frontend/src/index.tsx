import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Spinner from './components/Spinner';

import './index.css';
import './assets/css/App.css';

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <App />
    </Suspense>
  </React.StrictMode>,
);
