import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FirstPage from "./containers/FirstPage.jsx";
import Login from "./containers/Login.jsx";
import Register from "./containers/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forgot from "./containers/Forgot.jsx";
import Dashboard from "./containers/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/amorize",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
