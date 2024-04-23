import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./components/ProtectedRoute";

import Dashboard from "./views/Dashboard";
import ForgotPassword from "./views/ForgotPassword";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Settings from "./views/Settings";
import Signup from "./views/Signup";

const Routes = () => {
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      errorElement: <NotFound />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
  ];

  // Define routes accessible only to authenticated users
  const authenticatedRoutes = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...authenticatedRoutes,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
