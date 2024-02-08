import { combineReducers } from "redux";
import { authReducer } from "./Auth/auth_reducer";
import { cartReducer } from "./Cart/cart_reducer";
import { productReducer } from "./Product/product_reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { createTransform } from "redux-persist";
import CryptoJS from "crypto-js";

const encryptionKey = "ASDF#$%345453#$Aasdfna3434!wfen";
const encrypt = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    const cryptedText = CryptoJS.AES.encrypt(
      JSON.stringify(inboundState),
      encryptionKey
    );

    return cryptedText.toString();
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;
    const bytes = CryptoJS.AES.decrypt(outboundState, encryptionKey);

    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  }
);
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
  blacklist: ["err"],
  transforms: [encrypt],
};

const reducer = combineReducers({
  authReducer,
  cartReducer,
  productReducer,
});

export const persistedReducer = persistReducer(persistConfig, reducer);
