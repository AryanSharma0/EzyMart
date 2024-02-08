// product_reducer.js
import { createReducer } from "@reduxjs/toolkit";
import * as type from "./product_const_action";

const initialState = {
  products: [],
  productsByCategory: {},
  searchedProducts: [],
  orderedProducts: [],
  registeredProducts: [],
  loading: false,
  error: false,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(type.GET_PRODUCTS_SUCCESS, (state, action) => {
      state.products = action.payload;
    })
    .addCase(type.GET_PRODUCTS_FAILURE, (state, action) => {
      // Handle get products failure logic
    })
    .addCase(type.GET_PRODUCTS_BY_CATEGORY_SUCCESS, (state, action) => {
      const { category, data } = action.payload;
      state.productsByCategory[category] = data;
    })
    .addCase(type.GET_PRODUCTS_BY_CATEGORY_FAILURE, (state, action) => {
      // Handle get products by category failure logic
    })
    .addCase(type.SEARCH_PRODUCT_SUCCESS, (state, action) => {
      state.searchedProducts = action.payload;
    })
    .addCase(type.SEARCH_PRODUCT_FAILURE, (state, action) => {
      // Handle search product failure logic
    })
    .addCase(type.GET_ORDERS_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(type.GET_ORDERS_SUCCESS, (state, action) => {
      state.loading = false;
      state.orderedProducts = action.payload;
    })
    .addCase(type.GET_ORDERS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(type.ADD_ORDER_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(type.ADD_ORDER_SUCCESS, (state, action) => {
      state.loading = false;
      state.orderedProducts.push(action.payload);
    })
    .addCase(type.ADD_ORDER_FAILURE, (state, action) => {
      state.loading = false;
    })

    // For merchant
    .addCase(type.DELETE_PRODUCT_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(type.DELETE_PRODUCT_SUCCESS, (state, action) => {
      state.registeredProducts = state.registeredProducts.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
    })
    .addCase(type.DELETE_PRODUCT_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(type.GET_REGISTERED_PRODUCTS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(type.GET_REGISTERED_PRODUCTS_SUCCESS, (state, action) => {
      state.registeredProducts = action.payload;
      state.loading = false;
    })
    .addCase(type.GET_REGISTERED_PRODUCTS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(type.ADD_PRODUCTS_REQUEST, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(type.ADD_PRODUCTS_SUCCESS, (state, action) => {
      state.registeredProducts.push(action.payload); // Assuming the new order is added to products list
      state.loading = false;
    })
    .addCase(type.ADD_PRODUCTS_FAILURE, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(type.ADD_REGISTERED_PRODUCT_SUCCESS, (state, action) => {
      // Update state to include the new registered product
      state.registeredProducts.push(action.payload);
    })
    .addCase(type.ADD_REGISTERED_PRODUCT_FAILURE, (state, action) => {
      // Handle failure, update state if needed
      state.error = action.payload;
    });
});
