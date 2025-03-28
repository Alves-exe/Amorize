import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FirstPage from "./containers/FirstPage.jsx";
import Register from "./containers/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
