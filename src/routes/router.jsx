import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound/NotFound";
import Products from "../pages/Products/Products";
import Dashboard from "../layouts/Dashboard/Dashboard";
import AllUsers from "../pages/Dashboards/AllUsers/AllUsers";
import AddCategory from "../pages/Dashboards/AddCategory/AddCategory";
import AddProduct from "../pages/Dashboards/AddProduct/AddProduct";
import AllCategories from "../pages/Dashboards/AllCategories/AllCategories";
import AllProducts from "../pages/Dashboards/AllProducts/AllProducts";
import ProfileEdit from "../pages/Dashboards/ProfileEdit/ProfileEdit";
import ProductDetail from "../pages/Products/ProductDetail/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Register",
        element: <Register />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/product/:_id",
        element: (
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "/products",
        element: <Products />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/allUsers",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/addCategory",
        element: <AddCategory />,
      },
      {
        path: "/dashboard/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/allCategories",
        element: <AllCategories />,
      },
      {
        path: "/dashboard/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/dashboard/profileEdit",
        element: <ProfileEdit />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
