import { createSlice } from "@reduxjs/toolkit";

const cartDataSlice = createSlice({
  name: "productData",
  initialState: {
    selectedItemsAndQuantity: [],
    error: null,
    status: "idle",
  },
  reducers: {
    setItemsAndQuantity: (state, action) => {
      state.selectedItemsAndQuantity = [
        ...state.selectedItemsAndQuantity,
        action.payload,
      ];
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
    removeItem: (state, action) => {
      const productId = action.payload;
      state.selectedItemsAndQuantity = state.selectedItemsAndQuantity.filter(
        (item) => item.id !== productId
      );
    },
  },
});

export const { setItemsAndQuantity, changeQuantity, removeItem } =
  cartDataSlice.actions;
export default cartDataSlice.reducer;
