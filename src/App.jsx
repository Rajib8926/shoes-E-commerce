import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Order from "./pages/order/Order";
import Wish from "./pages/wish/Wish";
import Cart from "./pages/cart/Cart";
import CreateOrder from "./pages/order/CreateOrder";
import Product from "./pages/product/Product";

function App() {
  const route = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
        },
        {
          path: "/product/:productId",
          element: <Product />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        {
          path: "/createOrder",
          element: <CreateOrder />,
        },
        {
          path: "/wish",
          element: <Wish />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
