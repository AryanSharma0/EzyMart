// product_actions.js
import {
  addOrder,
  addProducts,
  deleteProducts,
  getProduct,
  getProductsByCategories,
  searchProduct,
  showOrder,
  showProducts,
} from "../BaseApi/baseApi";
import * as type from "./product_const_action";
import axios from "axios";

const config = (authToken) => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: authToken,
    },
  };
};

export const getAllProducts = (authToken) => async (dispatch) => {
  try {
    const response = await axios.get(getProduct, config(authToken));
    const data = response.data;
    dispatch({ type: type.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.GET_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const getProductsByCategory =
  (category, pageNumber, limit, authToken) => async (dispatch) => {
    try {
      const response = await axios.get(
        getProductsByCategories(category, pageNumber, limit),
        config(authToken)
      );
      const data = response.data;
      dispatch({
        type: type.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: { category, data },
      });
    } catch (error) {
      dispatch({
        type: type.GET_PRODUCTS_BY_CATEGORY_FAILURE,
        payload: { category, error: error.message },
      });
    }
  };

export const searchProducts = (query, authToken) => async (dispatch) => {
  try {
    const response = await axios.get(searchProduct(query), config(authToken));
    const data = response.data;
    console.log(data);
    dispatch({ type: type.SEARCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: type.SEARCH_PRODUCT_FAILURE, payload: error.message });
  }
};

export const getOrders = (authToken) => async (dispatch) => {
  dispatch({ type: type.GET_ORDERS_REQUEST });

  try {
    const response = await axios.get(showOrder, config(authToken));
    const orders = response.data;
    dispatch({ type: type.GET_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    dispatch({ type: type.GET_ORDERS_FAILURE, payload: error.message });
  }
};

export const buyProduct = (orderData, authToken) => async (dispatch) => {
  dispatch({ type: type.ADD_ORDER_REQUEST });

  const config = (authToken) => {
    return {
      headers: {
        authorization: authToken,
      },
    };
  };
  console.log(authToken);
  try {
    const response = await axios.post(addOrder, orderData, config(authToken));
    const newOrder = response.data;
    dispatch({ type: type.ADD_ORDER_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: type.ADD_ORDER_FAILURE, payload: error.message });
  }
};

// For merchant

export const getProducts =
  (pageNumber, limit, authToken) => async (dispatch) => {
    console.log(authToken);

    dispatch({ type: type.GET_REGISTERED_PRODUCTS_REQUEST });

    try {
      const response = await axios.get(showProducts, {
        headers: {
          Authorization: authToken,
        },
      });
      const products = response.data;
      dispatch({
        type: type.GET_REGISTERED_PRODUCTS_SUCCESS,
        payload: products,
      });
    } catch (error) {
      dispatch({
        type: type.GET_REGISTERED_PRODUCTS_FAILURE,
        payload: error.message,
      });
    }
  };

export const addProductsToApp = (newProduct, authToken) => async (dispatch) => {
  dispatch({ type: type.ADD_PRODUCTS_REQUEST });

  const config = {
    headers: {
      Authorization: authToken,
    },
  };

  try {
    const response = await axios.post(addProducts, newProduct, config);
    const newOrder = response.data;
    dispatch({ type: type.ADD_PRODUCTS_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: type.ADD_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId, authToken) => async (dispatch) => {
  dispatch({ type: type.DELETE_PRODUCT_REQUEST });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  };

  try {
    console.log(authToken, productId);
    await axios.delete(deleteProducts(productId), config);
    dispatch({ type: type.DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: type.DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const addRegisteredProduct =
  (productData, authToken, navigate) => async (dispatch) => {
    dispatch({ type: type.ADD_REGISTERED_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    };

    try {
      // Make the API call to add the registered product
      const response = await axios.post(addProducts, productData, config);
      navigate("/");
      // Dispatch success action with the added product data
      dispatch({
        type: type.ADD_REGISTERED_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch failure action with the error message
      dispatch({
        type: type.ADD_REGISTERED_PRODUCT_FAILURE,
        payload: error.message,
      });
    }
  };
