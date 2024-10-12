import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: { layout: "grid" },
  reducers: {
    setLayoutState: (state, action) => {
      state.layout = action.payload;
    },
  },
});

export const { setLayoutState } = layoutSlice.actions;
export default layoutSlice.reducer;
