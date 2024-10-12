import { configureStore } from "@reduxjs/toolkit";
import productDataReducer from "./productDataSlice";
import cartDataSlice from "./cartDataSlice";
import layoutSlice from "./layoutSlice";

export const store = configureStore({
  reducer: {
    productData: productDataReducer,
    cartData: cartDataSlice,
    layoutData: layoutSlice,
  },
});
