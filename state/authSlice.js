import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setToken: (state, action) => {
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.token = null;
    },
    userUpdate: (state, action) => {
      state.user.name = action.payload.name;
      state.user.username = action.payload.username;
      state.user.bio = action.payload.bio;
    },
    userUpdateProfile: (state, action) => {
      state.user.profileImg = action.payload.profileImg;
    },
  },
});

export const { setLogin, setToken, setLogout, userUpdate, userUpdateProfile } = authSlice.actions;

export default authSlice.reducer;
