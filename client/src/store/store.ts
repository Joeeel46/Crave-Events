// store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import adminReducer from "./slice/admin.slice";
import clientReducer from "./slice/client.slice";
import vendorReducer from "./slice/vendor.slice";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['admin', 'client', 'vendor'], // Only persist auth reducer
};

// Combine reducers
const rootReducer = combineReducers({
  admin: adminReducer,
  client: clientReducer,
  vendor: vendorReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;