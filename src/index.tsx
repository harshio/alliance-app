import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App';
import Question from './Question';
import Results from './Results';
import Between from './Between';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/questions',
    element: <Question/>,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/results',
    element: <Results/>,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/between',
    element: <Between/>,
    errorElement: <div>404 Not Found</div>
  }
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
