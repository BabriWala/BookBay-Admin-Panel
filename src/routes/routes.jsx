import { createBrowserRouter } from "react-router";
import App from "../App";
import Product from "../pages/product/Product";
import CreateProduct from "../pages/product/CreateProduct/CreateProduct";

const routes = [
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/product",
    element: <Product></Product>,
  },
  {
    path: "/product/create",
    element: <CreateProduct></CreateProduct>,
  },
];

const router = createBrowserRouter(routes);

export default router;
