import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductListingPage from "./pages/product-listing/ProductListingPage.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "react-hot-toast";

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
  // <StrictMode>
  <section className="m-auto max-w-screen-2xl">
    <Toaster position="top-center" reverseOrder={false} />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </section>
  // </StrictMode>
);
