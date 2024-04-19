import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Home/Dashboard";
import Brand from "../Pages/Brand/Brand";


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
      {
        path: "/categories",
        element: <Categorie/>,
      },
      {
        path: "/cities",
        element: <Cities/>,
      },
      {
        path: "/locations",
        element: <Locations/>,
      },
      {
        path: "/cars",
        element: <Cars/>,
      },
      {
        path: "/models",
        element: <Models/>,
      }
    ],
  },
]);

export default router;
