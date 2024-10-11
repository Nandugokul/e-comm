import { configureStore } from "@reduxjs/toolkit";
import productDataReducer from "./productDataSlice"; // Import the reducer directly

export const store = configureStore({
  reducer: {
    productData: productDataReducer,
  },
});
