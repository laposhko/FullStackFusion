import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import waterReducer from "./water/slice";
import usersReducer from "./users/slice";
import { setupAxiosInterceptors } from "./auth/operations";

const persistedAuthConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistedAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    water: waterReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  //   devTools: process.env.NODE_ENV === "development",
});
setupAxiosInterceptors(store);

export const persistor = persistStore(store);
