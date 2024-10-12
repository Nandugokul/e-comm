import { configureStore } from "@reduxjs/toolkit";
import productDataReducer from "./productDataSlice";
import cartDataSlice from "./cartDataSlice";

export const store = configureStore({
  reducer: {
    productData: productDataReducer,
    cartData: cartDataSlice,
  },
});
