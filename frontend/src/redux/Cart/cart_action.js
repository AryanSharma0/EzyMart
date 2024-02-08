// cart_actions.js
import {
  cartCount,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeProductFromCart,
  updateCart,
  viewCart,
} from "../BaseApi/baseApi";
import * as type from "./cart_const_action";
import axios from "axios";

const config = (authToken) => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
  };
};

export const viewCarts = (authToken) => async (dispatch) => {
  dispatch({ type: type.VIEW_CART_REQUEST });

  try {
    const response = await axios.get(viewCart, config(authToken));
    const data = response.data;
    dispatch({ type: type.VIEW_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.VIEW_CART_FAILURE, payload: error.message });
  }
};

export const getCartCount = (authToken) => async (dispatch) => {
  dispatch({ type: type.CART_COUNT_REQUEST });

  try {
    const response = await axios.get(cartCount, config(authToken));
    const data = response.data;
    dispatch({ type: type.CART_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.CART_COUNT_FAILURE, payload: error.message });
  }
};

export const updateCarts = (cartData, authToken) => async (dispatch) => {
  dispatch({ type: type.UPDATE_CART_REQUEST });

  try {
    const response = await axios.post(updateCart, cartData, config(authToken));
    const data = response.data;
    dispatch({ type: type.UPDATE_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.UPDATE_CART_FAILURE, payload: error.message });
  }
};

export const decreaseQuantity = (cartItemId, authToken) => async (dispatch) => {
  const config = (authToken) => {
    return {
      headers: {
        authorization: authToken,
      },
    };
  };
  try {
    const response = await axios.put(
      decreaseCartQuantity(cartItemId),
      "",
      config(authToken)
    );
    if (response) {
      dispatch({
        type: type.DECREASE_QUANTITY,
        payload: { cartItemId },
      });
    }
  } catch (error) {
    // dispatch({ type: type.UPDATE_CART_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const increaseQuantity = (cartItemId, authToken) => async (dispatch) => {
  const config = (authToken) => {
    return {
      headers: {
        authorization: authToken,
      },
    };
  };
  try {
    const response = await axios.put(
      increaseCartQuantity(cartItemId),
      "",
      config(authToken)
    );
    if (response) {
      dispatch({
        type: type.INCREASE_QUANTITY,
        payload: { cartItemId },
      });
    }
  } catch (error) {
    // dispatch({ type: type.UPDATE_CART_FAILURE, payload: error.message });
    console.log(error);
  }
};

export const removeFromCart = (cartItemId, authToken) => async (dispatch) => {
  try {
    await axios.delete(removeProductFromCart(cartItemId), config(authToken));
    dispatch({
      type: type.REMOVE_FROM_CART,
      payload: { cartItemId },
    });
  } catch (error) {
    // dispatch({ type: type.UPDATE_CART_FAILURE, payload: error.message });
    console.log(error);
  }
};
