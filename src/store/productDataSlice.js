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
    tempProductList: [],
    tempProductListQuantity: {},
    filterState: { category: "", rating: "", search: "" },
    productList: [],
    error: null,
    status: "idle",
  },
  reducers: {
    setFilterAndSearchState: (state, action) => {
      const { search, category } = action.payload;
      if (search && search !== state.filterState.search) {
        state.filterState.category = "";
      }
      if (category && category !== state.filterState.category) {
        state.filterState.search = "";
      }
      state.filterState = { ...state.filterState, ...action.payload };
    },
    clearProductData(state) {
      state.productList = [];
    },
    addToTempProductList: (state, action) => {
      state.tempProductList = [
        ...state.tempProductList,
        { ...action.payload, quantity: 1 },
      ];
    },
    removeFromTempProductList: (state, action) => {
      state.tempProductList = state.tempProductList.filter(
        (item) => item.id !== action.payload
      );
    },

    setTempListQuantity: (state, action) => {
      const { id, quantity, product } = action.payload;
      if (quantity === 0) {
        state.tempProductList = state.tempProductList.filter(
          (item) => item.id !== id
        );
        delete state.tempProductListQuantity[id];
        return;
      }
      const index = state.tempProductList.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.tempProductList[index].quantity = quantity;
      } else {
        state.tempProductList.push({ ...product, id, quantity });
      }
      state.tempProductListQuantity[id] = quantity;
    },

    clearTempProductList: (state) => {
      state.tempProductList = [];
      state.tempProductListQuantity = {};
    },

    setTempListFromCart: (state, action) => {
      const { product, quantity } = action.payload;
      state.tempProductListQuantity = quantity;
      state.tempProductList = product;
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

export const {
  setFilterAndSearchState,
  clearProductData,
  addToTempProductList,
  removeFromTempProductList,
  setTempListQuantity,
  clearTempProductList,
  setTempListFromCart,
} = productDataSlice.actions;
export default productDataSlice.reducer;
