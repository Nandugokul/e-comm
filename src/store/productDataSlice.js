import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../pages/product-listing/api-services/product-listing";

export const getProductData = createAsyncThunk(
  "productData/getProductData",
  async (skipAndCategory, { rejectWithValue }) => {
    try {
      const response = await getAllProducts(skipAndCategory);
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
      const { search, category } = action.payload;

      if (search && search !== state.filterState.search) {
        state.productList = [];
        state.filterState.category = "";
      }
      if (category && category !== state.filterState.category) {
        state.productList = [];
        state.filterState.search = "";
      }
      state.filterState = { ...state.filterState, ...action.payload };
    },
    clearProductData(state) {
      state.productList = [];
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductData.pending, (state) => {
        state.error = null;
        if (state.productList.length === 0) {
          state.status = "loading";
        }
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

export const { setFilterAndSearchState, clearProductData } =
  productDataSlice.actions;
export default productDataSlice.reducer;
