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

const persistedAuthConfig = {
    key: 'auth',
    storage,
    whitelist: ['token']
};

const persistedAuthReducer = persistReducer(persistedAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    water: persistedWaterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
//   devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
