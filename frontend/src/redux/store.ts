import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { userApi } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";

export const server = import.meta.env.VITE_SERVER;

// 1. Combine all reducers
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [userReducer.name]: userReducer.reducer,
  cartReducer: cartReducer.reducer, // to be persisted
});

// 2. Persist config — whitelist cartReducer only
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

// 3. Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }).concat(userApi.middleware, productApi.middleware, orderApi.middleware),
});

// 5. Persistor for use in <PersistGate />
export const persistor = persistStore(store);
