import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AuthPage from './features/auth/AuthPage.tsx';
import BookDisplayPage from './features/book-display/BookDisplayPage/BookDisplayPage.tsx';
import DetailedBookPage from './features/book-display/DetailedBookDisplay/DetailedBookPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/books",
        element: <BookDisplayPage />
      },
      {
        path: "/books/:id",
        element: <DetailedBookPage />
      }

    ]
  },
  {
    path: "/register",
    element: <AuthPage />
  },
  {
    path: "/login",
    element: <AuthPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
