import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
setupListeners(store.dispatch);
