import { createSlice } from "@reduxjs/toolkit";

const cartDataSlice = createSlice({
  name: "productData",
  initialState: {
    selectedItemsAndQuantity: [],
    productQuantity: {},
    error: null,
    status: "idle",
  },
  reducers: {
    setItemsAndQuantity: (state, action) => {
      const productIndex = state.selectedItemsAndQuantity.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex !== -1) {
        state.selectedItemsAndQuantity[productIndex].quantity +=
          action.payload.quantity;
      } else {
        state.selectedItemsAndQuantity.push(action.payload);
      }
    },
    changeQuantity: (state, action) => {
      const { method, productId } = action.payload;
      const index = state.selectedItemsAndQuantity.findIndex(
        (item) => item.id === productId
      );

      if (index !== -1) {
        if (method) {
          state.selectedItemsAndQuantity[index].quantity += 1;
        } else if (state.selectedItemsAndQuantity[index].quantity > 1) {
          state.selectedItemsAndQuantity[index].quantity -= 1;
        } else {
          state.selectedItemsAndQuantity.splice(index, 1);
        }
      }
    },
    setItemQuantity: (state, action) => {
      const [productId, quantity] = Object.entries(action.payload)[0];
      state.productQuantity[productId] = quantity;
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      state.selectedItemsAndQuantity = state.selectedItemsAndQuantity.filter(
        (item) => item.id !== productId
      );
      delete state.productQuantity[productId];
    },
  },
});

export const {
  setItemsAndQuantity,
  changeQuantity,
  removeItem,
  setItemQuantity,
} = cartDataSlice.actions;
export default cartDataSlice.reducer;
