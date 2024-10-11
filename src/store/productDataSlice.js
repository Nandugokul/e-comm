import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../pages/product-listing/api-services/product-listing";

export const getProductData = createAsyncThunk(
  "productData/getProductData",
  async (skip, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(skip);
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
    filterState: { category: "", rating: "", search: "" },
    productList: [],
    error: null,
    status: "idle",
  },
  reducers: {
    setFilterAndSearchState: (state, action) => {
      state.filterState = { ...state.filterState, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.productList = [...state.productList, ...action.payload.products];
        state.error = null;
      })
      .addCase(getProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { setFilterAndSearchState } = productDataSlice.actions;

export default productDataSlice.reducer;
