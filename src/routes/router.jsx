import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
]);

export default router;
