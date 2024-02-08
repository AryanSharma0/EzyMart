import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCarts } from "../redux/Cart/cart_action";

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.authReducer);
  const { products } = useSelector((state) => state.productReducer);
  const selectedProduct = products.find((element) => element._id === productId);
  const addToCart = () => {
    dispatch(
      updateCarts(
        {
          productId: selectedProduct._id,
          quantity: "1",
        },
        authToken
      )
    );
    navigate("/cart");
  };
  return (
    <div className="h-full pt-4">
      <div className=" grid grid-cols-2 gap-4  h-[80vh] p-8 m-6 bg-white rounded-lg shadow-xl justify-start ">
        <div>
          <img
            src={selectedProduct.imageUrl}
            className=" w-full h-[40vh]"
            alt=""
          />
        </div>
        <div className=" flex flex-col h-full p-4">
          <div className="h-fit">
            <h1 className="h-fit text-3xl mb-20 font-bold">
              {selectedProduct.name}
            </h1>
          </div>
          <div className="h-fit">
            <h1 className="h-fit text-2xl font-bold">{ProductDetails.name}</h1>
            <p className="h-fit text-lg">{selectedProduct.description}</p>
          </div>
          <div>
            <div>
              <button></button>
              <span></span>
              <button></button>
            </div>
            <div className="flex  justify-start mt-4">
              <button
                onClick={addToCart}
                className="p-6 rounded-xl  flex text-xl text-white font-bold items-center h-full bg-[#df441e]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
