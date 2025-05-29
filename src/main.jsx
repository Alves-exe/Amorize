import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FirstPage from "./containers/FirstPage.jsx";
import Login from "./containers/Login.jsx";
import Register from "./containers/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forgot from "./containers/Forgot.jsx";
import Dashboard from "./containers/Dashboard.jsx";
import { AuthProvider } from "./services/AuthContext"; // ⬅️ ajuste o caminho conforme necessário

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
    <AuthProvider>
      {" "}
      {/* ✅ Envolvendo com AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
