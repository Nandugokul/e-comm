import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductListingPage from "./pages/product-listing/ProductListingPage.jsx";
import { StrictMode } from "react";
import CartPage from "./pages/cart/CartPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductListingPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <section className="m-auto max-w-screen-2xl">
      <RouterProvider router={router} />
    </section>
  </StrictMode>
);
