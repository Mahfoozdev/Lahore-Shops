import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItems } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  },
  discount: 0,
  total: 0,
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItems>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) {
        // Update by +1 or -1, not full replacement
        const updatedQty =
          action.payload.quantity - state.cartItems[index].quantity;
        state.cartItems[index].quantity += updatedQty;
        if (state.cartItems[index].quantity < 1) {
          // Optional: remove if quantity goes below 1
          state.cartItems.splice(index, 1);
        }
      } else {
        // New item, ensure minimum quantity 1
        state.cartItems.push({
          ...action.payload,
          quantity: Math.max(1, action.payload.quantity),
        });
      }

      state.loading = false;
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      // Calculate subtotal
      state.subtotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Flat discount rule: e.g., Rs. 100 off if subtotal > 1000
      state.discount = 0;

      state.tax = 0;

      state.shippingCharges = state.subtotal > 500 ? 0 : 50;

      // Final total
      state.total =
        state.subtotal - state.discount + state.tax + state.shippingCharges;
    },
  },
});

export const { addToCart, removeCartItem, calculatePrice } =
  cartReducer.actions;
