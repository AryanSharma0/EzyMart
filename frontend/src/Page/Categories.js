import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProductsByCategory } from "../redux/Product/product_action";
import Products from "../Component/Products";

function Categories() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("categoryName");
  const { authToken } = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(getProductsByCategory(categoryName, 1, 1000, authToken));
  }, [authToken, categoryName, dispatch]);
  const { productsByCategory } = useSelector((state) => state.productReducer);
  return (
    <div className=" mb-10 h-full">
      <div className="h-full w-full  flex text-center justify-center ">
        <div className="lg:w-[70vw] bg-slate-50 h-screen shadow-lg  mb-10 w-screen flex justify-center flex-wrap">
          {productsByCategory[categoryName] &&
            productsByCategory[categoryName].map((productDetails) => {
              return (
                <Products key={productDetails._id} product={productDetails} />
              );
            })}
          {!productsByCategory[categoryName] && (
            <div className="h-full w-full justify-center items-center">
              Sorry Currently this category is not available
            </div>
          )}
          {productsByCategory[categoryName] &&
            productsByCategory[categoryName].length === 0 && (
              <div className="h-max w-screen flex  justify-center items-center">
                <img
                  src={require("../asset/nproduct.png")}
                  className="h-[30rem]"
                  alt=""
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
