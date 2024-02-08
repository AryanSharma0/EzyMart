import React, { useEffect } from "react";
import Products from "../Component/Products";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/Product/product_action";
function Home() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const { authToken } = useSelector((state) => state.authReducer);
  useEffect(() => {
    dispatch(getAllProducts(authToken));
  }, [authToken, dispatch]);

  return (
    <div className="h-full w-full  flex text-center justify-center ">
      <div className="lg:w-[70vw] bg-slate-50 h-screen shadow-lg w-screen flex justify-center flex-wrap">
        {products.map((productDetails) => {
          return <Products key={productDetails._id} product={productDetails} />;
        })}
      </div>
    </div>
  );
}

export default Home;
