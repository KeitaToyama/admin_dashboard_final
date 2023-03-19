import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    displayName: null,

    photo: null,
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload;
    },
    logout: (state) => {
      state.uid = null;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
