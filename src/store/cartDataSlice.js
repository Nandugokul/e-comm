import { createSlice } from "@reduxjs/toolkit";

const cartDataSlice = createSlice({
  name: "productData",
  initialState: {
    selectedItemsAndQuantity: [],
    productQuantity: {},
    totalPayable: 0,
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
      const [id, quantity] = Object.entries(action.payload)[0];
      state.productQuantity[id] = quantity;
    },

    setTotalPayable: (state) => {
      state.totalPayable = state.selectedItemsAndQuantity.reduce(
        (acc, item) => acc + item.price * state.productQuantity[item.id],
        0
      );
    },

    clearCartItems: (state) => {
      state.selectedItemsAndQuantity = [];
      state.productQuantity = {};
      state.totalPayable = 0;
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      state.selectedItemsAndQuantity = state.selectedItemsAndQuantity.filter(
        (item) => item.id !== productId
      );
      delete state.productQuantity[productId];
    },
    setCartItems: (state, action) => {
      const { productList, quantity } = action.payload;

      // Merge productList into selectedItemsAndQuantity array
      productList.forEach((newProduct) => {
        const existingProductIndex = state.selectedItemsAndQuantity.findIndex(
          (item) => item.id === newProduct.id
        );
        if (existingProductIndex !== -1) {
          // If the product already exists, update its quantity
          state.selectedItemsAndQuantity[existingProductIndex].quantity +=
            newProduct.quantity;
        } else {
          // Otherwise, add the new product
          state.selectedItemsAndQuantity.push(newProduct);
        }
      });

      // Merge quantity into productQuantity object
      Object.keys(quantity).forEach((productId) => {
        if (state.productQuantity[productId]) {
          // If the product quantity already exists, sum the quantities
          state.productQuantity[productId] += quantity[productId];
        } else {
          // Otherwise, set the new quantity
          state.productQuantity[productId] = quantity[productId];
        }
      });
    },
  },
});

export const {
  setItemsAndQuantity,
  changeQuantity,
  removeItem,
  setItemQuantity,
  setTotalPayable,
  clearCartItems,
  setCartItems,
} = cartDataSlice.actions;
export default cartDataSlice.reducer;
