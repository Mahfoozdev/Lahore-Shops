import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";
export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userReducer.name]: userReducer.reducer,
    cartReducer: cartReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware
    ),
});
