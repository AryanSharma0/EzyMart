import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCarts } from "../redux/Cart/cart_action";

function Products({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.authReducer);

  const addToCart = () => {
    dispatch(
      updateCarts(
        {
          productId: product._id,
          quantity: "1",
        },
        authToken
      )
    );
    navigate("/cart");
  };
  const navigateToProductDetails = () => {
    navigate(`/product/${product._id}`);
  };
  return (
    <div
      onClick={navigateToProductDetails}
      className=" h-[22rem] hover:scale-105 m-10 flex w-full p-6 max-w-[20rem]  flex-col justify-between items-baseline rounded-lg  border-gray-200 bg-white shadow-xl border-2 "
    >
      <div className=" block h-full">
        <img src={product.imageUrl} alt="" className="h-52 opacity-95" />
      </div>
      <div className="text-black px-4 overflow-scroll h-full  flex flex-col  items-start  z-10">
        <h1 className=" font-semibold pb-2 text-center h-max overflow-y-scroll mb-2  ">
          {product?.name}
        </h1>
        <div className="flex w-full h-full justify-between">
          <h1 className="h-full  font-extrabold">₹{product?.price}</h1>
          <div className=" cursor-pointer">
            {" "}
            <button
              onClick={addToCart}
              className="flex h-10 items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
