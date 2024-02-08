import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  viewCarts,
} from "../redux/Cart/cart_action";
import "../style/basic.css";
import { buyProduct } from "../redux/Product/product_action";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery_address, setDelivery_address] = useState("");
  const [checkOut, setCheckOut] = useState(false);
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.authReducer);
  const { cartData } = useSelector((state) => state.cartReducer);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(viewCarts(authToken));
  }, [authToken, dispatch]);

  useEffect(() => {
    const calculateCartPrice = () => {
      let totalPrice = 0;
      cartData.forEach((product) => {
        totalPrice += product.productId?.price * product.quantity;
      });
      setTotalPrice(totalPrice);
    };

    calculateCartPrice();
  }, [cartData]);

  const onQuantityIncrement = (cartItemId) => {
    dispatch(increaseQuantity(cartItemId, authToken));
  };
  const onQuantityDecrement = (cartItemId) => {
    dispatch(decreaseQuantity(cartItemId, authToken));
  };
  const onRemoveProduct = (cartItemId) => {
    dispatch(removeFromCart(cartItemId, authToken));
  };

  const orderAllCart = () => {
    if (delivery_address.length > 3) {
      dispatch(
        buyProduct(
          {
            products: cartData.map((product) => {
              console.log(product?.productId?._id);
              return {
                productId: product?.productId?._id,
                quantity: product?.quantity,
              };
            }),

            totalPrice: totalPrice + 50,
            delivery_address,
          },
          authToken
        )
      );
      navigate("/yourOrder");
    }
  };

  return (
    <div className="h-full">
      <div className="h-full bg-[#fcfcfc] m-8 pt-8  shadow-inner rounded-xl ">
        <h1 className="mb-10 h-fit text-center text-2xl font-bold">
          Cart Items
        </h1>
        <div className="mx-auto h-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg h-full md:w-2/3">
            {cartData &&
              cartData.length > 0 &&
              cartData.map((product) => {
                return (
                  <div
                    key={product._id}
                    className="justify-between hover:scale-105 h-full mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={product.productId?.imageUrl}
                      alt="productimage"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex h-full sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0 h-full">
                        <h2 className="text-lg h-full  font-bold text-gray-900">
                          {product.productId?.name}
                        </h2>
                      </div>
                      <div className="mt-4 h-full flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex h-full items-center border-gray-100">
                          <span
                            onClick={() => onQuantityDecrement(product._id)}
                            className="cursor-pointer h-full rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <span className="h-8 w-8 border flex justify-center items-center bg-white text-center text-xs outline-none">
                            {product.quantity}
                          </span>
                          <span
                            onClick={() => onQuantityIncrement(product._id)}
                            className="cursor-pointer h-full rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex  items-center space-x-4 h-fit">
                          <p className="text-sm h-full">
                            ₹ {product.productId?.price}
                          </p>

                          <svg
                            onClick={() => onRemoveProduct(product._id)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {cartData.length === 0 && (
              <div className="bg-white p-4 rounded-lg shadow-xl h-full">
                <img src={require("../asset/nproduct.png")} alt="" />
                <h1 className="text-center h-fit text-2xl font-semibold">
                  Add Some Products to Cart
                </h1>
              </div>
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border  bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 h-full flex justify-between">
              <p className="text-gray-700 h-full">Subtotal</p>
              <p className="text-gray-700 h-full">₹ {totalPrice}</p>
            </div>
            <div className="flex justify-between h-full">
              <p className="text-gray-700 h-full">Shipping</p>
              <p className="text-gray-700 h-full">
                ₹ {cartData.length !== 0 ? 50 : 0}
              </p>
            </div>
            <hr className="h-full my-4" />
            <div className="flex h-full justify-between">
              <p className="text-lg h-full font-bold">Total</p>
              <div className="h-full">
                <p className="mb-1 h-full text-lg font-bold">
                  {" "}
                  ₹ {cartData.length !== 0 ? totalPrice + 50 : totalPrice}{" "}
                </p>
                <p className="text-sm h-full text-gray-700">including GST</p>
              </div>
            </div>
            {checkOut && (
              <div className="mt-6 h-full">
                <label htmlFor="" className=" font-semibold">
                  Delivery Address :
                </label>
                <textarea
                  onChange={(e) => setDelivery_address(e.target.value)}
                  value={delivery_address}
                  type="text"
                  className="h-full my-2 p-2 rounded-xl "
                  placeholder="Enter Delivery Address"
                />
              </div>
            )}
            <button
              onClick={() => (checkOut ? orderAllCart() : setCheckOut(true))}
              className="mt-6 w-full h-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              {checkOut ? "Buy Now" : "Check out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
