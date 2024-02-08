import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/basic.css";
import { getOrders } from "../redux/Product/product_action";
function YourOrder() {
  const dispatch = useDispatch();
  const { authToken } = useSelector((state) => state.authReducer);
  const { orderedProducts } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getOrders(authToken));
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
  console.log(orderedProducts);
  return (
    <div className="h-full">
      <div className="h-full bg-[#fcfcfc] m-8 pt-8  shadow-inner rounded-xl ">
        <h1 className="mb-10 h-fit text-center text-2xl font-bold">
          Ordered Items
        </h1>
        <div className="mx-auto h-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg h-full gap-4 md:w-2/3">
            {orderedProducts &&
              orderedProducts.length > 0 &&
              orderedProducts.map((product, index) => {
                return (
                  <div className="h-max w-full px-4 py-2 mb-6 rounded-lg  bg-[#ebebeb] shadow-md shadow-slate-300 ">
                    <div className="h-full">
                      {" "}
                      <h1 className="h-full font-bold text-xl">
                        Order No. {index + 1}
                      </h1>
                    </div>
                    {product.products.map((boughtProducts) => {
                      return boughtProducts.productId === null ? (
                        <div className="justify-between pt-3 h-full mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                          User Removed the product Detail
                        </div>
                      ) : (
                        <div
                          registeredProducts
                          key={boughtProducts.productId?._id}
                          className="justify-between hover:scale-105 h-full mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                        >
                          <img
                            src={boughtProducts.productId?.imageUrl}
                            alt="productimage"
                            className="w-full rounded-lg sm:w-40"
                          />
                          <div className="sm:ml-4 sm:flex h-full sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0 h-full">
                              <h2 className="text-lg h-full  font-bold text-gray-900">
                                {boughtProducts.productId?.name}
                              </h2>
                            </div>
                            <div className="mt-4 h-full flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                              <div className="flex h-full justify-end items-center border-gray-100">
                                <span className="h-8 w-8 border flex justify-center items-center bg-white text-center text-xs outline-none">
                                  {boughtProducts.quantity}
                                </span>
                              </div>
                              <div className="flex  items-center space-x-4 h-fit">
                                <p className="text-sm h-full">
                                  ₹ {boughtProducts.productId?.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="h-full flex align-middle items-center ml-6 my-6">
                      <h1 className="h-full font-bold text-lg">
                        Delivery Address:{" "}
                      </h1>
                      <p className="h-full pl-2">
                        {" "}
                        {product?.delivery_address}
                      </p>
                    </div>
                    <div className="h-full flex  justify-between">
                      {" "}
                      <h1 className="h-full text-xl font-bold px-4  ">
                        Total Price: ₹ {product.totalPrice}
                      </h1>
                      <h1 className="h-full text-xl font-bold px-4  ">
                        Date: {formatDateToIST(product.orderDate)}
                      </h1>
                    </div>
                  </div>
                );
              })}
            {orderedProducts.length === 0 && (
              <div className="bg-white p-4 rounded-lg shadow-xl h-full">
                <img src={require("../asset/nproduct.png")} alt="" />
                <h1 className="text-center h-fit text-2xl font-semibold">
                  Order Some Products
                </h1>
              </div>
            )}
          </div>

          <div className="mt-6 h-full rounded-lg border  bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 h-full flex justify-between">
              <p className="text-gray-700 h-full">Total Orders</p>
              <p className="text-gray-700 h-full">{orderedProducts.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourOrder;
