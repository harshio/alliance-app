import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css';
import App from './App';
import Question from './Question';
import Results from './Results';
import Between from './Between';
import Create from './Create';
import Login from './Login';
import IDScreen from './IDScreen';
import Saved from './Saved';
import reportWebVitals from './reportWebVitals';
import { WebSocketProvider } from './WebSocketContext';

const router = createBrowserRouter([
  {
    path: '/login',
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
  },
  {
    path: '/create',
    element: <Create />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/',
    element: <Login />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/id',
    element: <IDScreen />,
    errorElement: <div>404 Not Found</div>
  },
  {
    path: '/saved',
    element: <Saved />,
    errorElement: <div>404 Not Found</div>
  }
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WebSocketProvider>
      <RouterProvider router={router} />
    </WebSocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
