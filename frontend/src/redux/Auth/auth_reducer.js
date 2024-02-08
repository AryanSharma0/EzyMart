import { createReducer } from "@reduxjs/toolkit";
import * as type from "./auth_const_action";
const initialState = {
  name: "",
  authenticate: true,
  authToken: "",
  loading: false,
  merchant: false,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder

    // Handle the logic for the LOGIN REQUEST
    .addCase(type.LOGIN_REQUESTED, (state, action) => {
      state.loading = true;
    })

    // Handle the logic for the LOGIN SUCCESS
    .addCase(type.LOGIN_SUCCESS, (state, action) => {
      state.authToken = action.payload.token;
      state.name = action.payload.name;
      state.merchant = action.payload?.merchant;
      state.authenticate = true;
      state.loading = false;
      console.log(action.payload);
    })

    // Handle the logic for the LOGIN FAILURE
    .addCase(type.LOGIN_FAILURE, (state, action) => {
      state.loading = false;
    })

    // Handle the logic for the REGISTER REQUEST
    .addCase(type.REGISTER_REQUEST, (state, action) => {
      state.loading = true;
    })

    // Handle the logic for the REGISTER SUCCESS
    .addCase(type.REGISTER_SUCCESS, (state, action) => {
      state.loading = false;
    })

    // Handle the logic for the REGISTER FAILURE
    .addCase(type.REGISTER_FAILURE, (state, action) => {
      state.loading = false;
    })

    // Handle the logic for the LOGOUT
    .addCase(type.LOGOUT_REQUEST, (state, action) => {
      state.authToken = "";
      state.authenticate = false;
      state.name = "";

      // localStorage.removeItem("token");
    });
});
