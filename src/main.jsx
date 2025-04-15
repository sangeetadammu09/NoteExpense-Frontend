import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    Component: App, // root layout route
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    // <RouterProvider router={router} />
  // </StrictMode>,
)
