import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "./../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Brand from "./../Pages/Brand/Brand";
import Categories from "./../Pages/Categories/Categories"
import Cities from "./../Pages/Cities/Cities"
import Locations from "./../Pages/Locations/Locations"
import Cars from "../Pages/Cars/Cars";
import Models from "./../Pages/Models/Models"


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
        element: <Categories/>,
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
