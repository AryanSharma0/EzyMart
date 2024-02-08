import { login, resetPass, signup } from "../BaseApi/baseApi";
import * as type from "./auth_const_action";
import axios from "axios";
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: "SADFSD#W@AFsaf#Qfsa",
  },
};

export const userlogin = (loginData) => async (dispatch) => {
  dispatch({ type: type.LOGIN_REQUESTED });

  try {
    // API CALL
    const response = await axios.post(login, loginData, config);
    const data = response.data;
    dispatch({ type: type.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    if (error.response) {
      const errormessage = error.response.data.error;
      dispatch({ type: type.LOGIN_FAILURE, payload: errormessage });
    } else {
      dispatch({ type: type.LOGIN_FAILURE, payload: error.message });
    }
  }
};

export const register = (registerationData) => async (dispatch) => {
  dispatch({ type: type.REGISTER_REQUEST });

  try {
    const response = await axios.post(signup, registerationData, config);
    const data = response.data;
    dispatch({ type: type.REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: type.REGISTER_FAILURE, payload: error.message });
  }
};
export const userResetPass = (registerationData) => async (dispatch) => {
  dispatch({ type: type.RESETPASS_REQUEST });

  try {
    const response = await axios.post(resetPass, registerationData, config);
    const data = response.data;
    dispatch({ type: type.RESETPASS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: type.RESETPASS_FAILURE, payload: error.message });
  }
};
export const logout = () => ({
  type: type.LOGOUT_REQUEST,
});
export const tokenPresent = () => ({
  type: type.TOKENPRESENT,
});
