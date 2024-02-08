// cart_reducer.js
import { createReducer } from "@reduxjs/toolkit";
import * as type from "./cart_const_action";

const initialState = {
  cartData: [],
  cartCount: 0,
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(type.VIEW_CART_SUCCESS, (state, action) => {
      state.cartData = action.payload.cartItems;
    })
    .addCase(type.VIEW_CART_FAILURE, (state, action) => {
      // Handle view cart failure logic
    })
    .addCase(type.CART_COUNT_SUCCESS, (state, action) => {
      state.cartCount = action.payload;
    })
    .addCase(type.CART_COUNT_FAILURE, (state, action) => {
      // Handle cart count failure logic
    })
    .addCase(type.UPDATE_CART_SUCCESS, (state, action) => {
      state.cartData.push(action.payload);
      // Handle update cart success logic if needed
    })
    .addCase(type.UPDATE_CART_FAILURE, (state, action) => {
      // Handle update cart failure logic
    })
    .addCase(type.DECREASE_QUANTITY, (state, action) => {
      const updatedCartData = state.cartData.map((item) =>
        item._id === action.payload.cartItemId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      );
      state.cartData = updatedCartData;
    })

    .addCase(type.INCREASE_QUANTITY, (state, action) => {
      const updatedCartData = state.cartData.map((item) =>
        item._id === action.payload.cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      state.cartData = updatedCartData;
    })

    .addCase(type.REMOVE_FROM_CART, (state, action) => {
      const updatedCartData = state.cartData.filter(
        (item) => item._id !== action.payload.cartItemId
      );
      state.cartData = updatedCartData;
    });
});
