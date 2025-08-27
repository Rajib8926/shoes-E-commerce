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
import { action as orderAction } from "./pages/order/CreateOrder";
import PaymentOrder from "./pages/order/PaymentOrder";
import { useEffect, useState } from "react";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onLoad = () => {
      setLoading(false);
      console.log("loaded");
    };

    // If everything is already loaded, hide the loader right away
    if (document.readyState === "complete") {
      onLoad();
      return; // no listener needed
    }

    // Otherwise, wait for the full load event
    window.addEventListener("load", onLoad, { once: true });

    // ✅ proper cleanup (return a function)
    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, []);

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
          action: orderAction,
        },
        {
          path: "/orderPayment",
          element: <PaymentOrder />,
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

  return <>{loading ? <h1>Loading</h1> : <RouterProvider router={route} />}</>;
}

export default App;
