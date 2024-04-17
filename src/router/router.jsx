import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Home/Dashboard";
import Brand from "../Pages/Brand/Brand";
import { getToken, tokenKey } from "../Pages/Login/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        path: "/", 
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },
    ],
  },
]);

export default router;
