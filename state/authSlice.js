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
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.username = action.payload.username;
    },
  },
});

export const { setLogin, setToken, setLogout, userUpdate } = authSlice.actions;

export default authSlice.reducer;
