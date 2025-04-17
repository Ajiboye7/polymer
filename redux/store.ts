import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import balanceReducer from "./slices/balanceSlice";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "user", "balance"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  balance: balanceReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
