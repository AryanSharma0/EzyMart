// For Auth Purpose
export const login = `http://localhost:5000/api/auth/login`;
export const signup = `http://localhost:5000/api/auth/signup`;
export const resetPass = `http://localhost:5000/api/auth/resetPassword`;

// For Client Purpose
export const becomeMerchant = `http://localhost:5000/api/client/becomeMerchant`;
export const getProduct = `http://localhost:5000/api/client/getProducts`;
export const getProductsByCategories = (category, pageNumber, limit) =>
  `http://localhost:5000/api/client/getProductsByCategory?category=${category}&limit=${limit}&pageNumber=${pageNumber}`;
export const searchProduct = (query) =>
  `http://localhost:5000/api/client/search/${query}`;
export const viewCart = `http://localhost:5000/api/client/viewCart`;
export const cartCount = `http://localhost:5000/api/client/cartCount`;
export const updateCart = `http://localhost:5000/api/client/updateCart`;
export const decreaseCartQuantity = (cartItemId) =>
  `http://localhost:5000/api/client/decreaseProduct/${cartItemId}`;
export const increaseCartQuantity = (cartItemId) =>
  `http://localhost:5000/api/client/increaseProduct/${cartItemId}`;
export const removeProductFromCart = (cartItemId) =>
  `http://localhost:5000/api/client/removeProduct/${cartItemId}`;
export const showOrder = `http://localhost:5000/api/client/getAllOrder`;
export const addOrder = `http://localhost:5000/api/client/addNewOrder`;

// For Merchant Purpose
export const addProducts = `http://localhost:5000/api/merchant/addProduct`;
export const showProducts = `http://localhost:5000/api/merchant/getProducts`;
export const deleteProducts = (productId) =>
  `http://localhost:5000/api/merchant/deleteProduct/${productId}`;
