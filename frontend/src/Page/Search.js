import React from "react";
import { useSelector } from "react-redux";
import Products from "../Component/Products";

function Search() {
  const { searchedProducts } = useSelector((state) => state.productReducer);

  return (
    <div className="h-full w-full  flex text-center justify-center ">
      <div className="lg:w-[70vw] w-screen flex justify-center flex-wrap">
        {searchedProducts.map((productDetails) => {
          return <Products key={productDetails._id} product={productDetails} />;
        })}
        {searchedProducts.length === 0 && (
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
  );
}

export default Search;
