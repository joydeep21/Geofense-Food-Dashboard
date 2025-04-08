import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // default is localStorage
// import { PersistGate } from 'redux-persist/integration/react';


const persistConfig = {
    key: 'root', // Name of the storage key
    storage,     // Using localStorage for persistence
  };
  
  const persistedAuthReducer = persistReducer(persistConfig, authReducer);
  

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


