import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../pages/product-listing/api-services/product-listing";

export const getProductData = createAsyncThunk(
  "productData/getProductData",
  async (category, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const productDataSlice = createSlice({
  name: "productData",
  initialState: {
    data: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred";
      });
  },
});

export default productDataSlice.reducer;
