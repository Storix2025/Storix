import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
  },
});

export const { setUser } = appSlice.actions;
export const { getUser } = appSlice.selectors;

export default appSlice.reducer;
