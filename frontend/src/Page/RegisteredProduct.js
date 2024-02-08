import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/Product/product_action";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function RegisteredProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.authReducer);
  const { registeredProducts } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProducts(1, 100, authToken));
  }, [authToken, dispatch]);
  function formatDateToIST(originalDate) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata", // Set the time zone to Indian Standard Time
    };

    // Convert the string to a Date object
    const dateObject = new Date(originalDate);

    // Format the date according to the specified options
    const formattedDate = dateObject.toLocaleString("en-IN", options);

    return formattedDate;
  }

  const removeProductFromList = (productId) => {
    dispatch(deleteProduct(productId, authToken));
  };
  const addProduct = () => {
    navigate("/addProduct");
  };
  return (
    <div className="h-full w-full p-6 shadow-md ">
      <div className="h-full w-full bg-[#fcfcfc] m-8 pt-8  shadow-inner rounded-xl ">
        <div className="h-full mb-6 w-full mx-auto flex justify-between max-w-5xl ">
          <h1 className="mb-10   h-full w-full   text-2xl font-bold">
            Registered Items
          </h1>
          <button
            onClick={addProduct}
            className=" p-4 text-xl w-40 items-center bg-neutral-950 text-white rounded-lg shadow-md shadow-slate-600 h-full active:scale-95"
          >
            Add Product
          </button>
        </div>
        <div className="mx-auto h-full w-full gap-20 max-w-5xl justify-center px-6 md:flex flex-col md:space-x-6 xl:px-0">
          {registeredProducts.map((product) => {
            return (
              <div className="h-full w-full hover:scale-105 gap-2 relative bg-white  shadow-lg p-8 rounded-md border-2 ">
                <div
                  onClick={() => removeProductFromList(product._id)}
                  className="h-fit p-1 cursor-pointer absolute right-0 bg-red-600 rounded-full  -top-2"
                >
                  <MdDelete size={20} className="h-full" color="white" />
                </div>
                <div className="h-full w-full flex gap-8">
                  <div className="w-[10rem] h-fit basis-1/3">
                    <img
                      className=" h-[10rem]"
                      src={product.imageUrl}
                      alt={"Product" + product.__v + 1}
                    />
                  </div>
                  <div className="h-fit basis-2/3 gap-3 flex flex-col">
                    <h1 className="h-full font-bold text-xl">{product.name}</h1>
                    <h4 className="h-full font-semibold">{product.category}</h4>
                    <h4 className="h-full font-semibold ">{product.price}</h4>
                    <p className="h-full text-slate-900">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="h-fit absolute bottom-4 right-2">
                  <p className="h-fit w-full text-xs text-end">
                    Posted On : {formatDateToIST(product.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RegisteredProduct;
