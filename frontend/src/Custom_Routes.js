import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./Page/Login";
import SignUp from "./Page/SignUp";
import Home from "./Page/Home";
import Cart from "./Page/Cart";
import Search from "./Page/Search";
import { useSelector } from "react-redux";
import RequiredAuth from "./Required_Auth";
import NoDataFound from "./Page/NoDataFound";
import Loader from "./Component/Loader";
import ProductDetails from "./Page/ProductDetails";
import Categories from "./Page/Categories";
import YourOrder from "./Page/YourOrder";
import RegisteredProduct from "./Page/RegisteredProduct";
import AddProduct from "./Page/AddProduct";
function Router() {
  const { authenticate, merchant } = useSelector((state) => state.authReducer);
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (
      (location.pathname === "/login" || location.pathname === "/signup") &&
      authenticate
    ) {
      navigate("/");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticate]);
  let route;
  if (!authenticate) {
    route = (
      <Routes>
        <Route exact initial path="/login" element={<Login />}></Route>
        <Route exact path="/signUp" element={<SignUp />} />
        <Route
          path="*"
          element={
            <RequiredAuth>
              <NoDataFound />
            </RequiredAuth>
          }
        ></Route>{" "}
      </Routes>
    );
  }
  if (authenticate && merchant) {
    route = (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/registeredOrders" element={<RegisteredProduct />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
        <Route exact path="/yourOrder" element={<YourOrder />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/category" element={<Categories />} />
        <Route exact path="/product/:productId" element={<ProductDetails />} />
        <Route exact path="/*" element={<NoDataFound />}></Route>
      </Routes>
    );
  }

  if (authenticate && !merchant) {
    route = (
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/yourOrder" element={<YourOrder />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/category" element={<Categories />} />
        <Route exact path="/product/:productId" element={<ProductDetails />} />
        <Route exact path="/*" element={<NoDataFound />}></Route>
      </Routes>
    );
  }

  return <Suspense fallback={Loader}>{route}</Suspense>;
}

export default Router;
