import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";
import { FaOpencart } from "react-icons/fa";
import { getCartCount } from "../redux/Cart/cart_action";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../redux/Product/product_action";
function Navbar({ isFixed }) {
  const [onDialogOpen, setOnDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { authenticate, name, authToken, merchant } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  const { cartCount, cartData } = useSelector((state) => state.cartReducer);
  const addToCart = () => {
    navigate("/cart");
  };

  const memoizedGetCartCount = useCallback(
    () => dispatch(getCartCount(authToken)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, authToken, cartData.length]
  );
  useEffect(() => {
    if (authenticate) {
      memoizedGetCartCount();
    }
  }, [authToken, authenticate, memoizedGetCartCount]);

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (searchQuery !== "") {
      dispatch(searchProducts(searchQuery, authToken));
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  const openDialog = () => {
    setOnDialogOpen(!onDialogOpen);
  };

  const goToOrder = () => {
    navigate("/yourOrder");
    setOnDialogOpen(false);
  };
  const gotoRegisteredProduct = () => {
    navigate("/registeredOrders");
    setOnDialogOpen(false);
  };
  return (
    <div
      className={`${
        isFixed ? "fixed" : ""
      } bg-[#ffffff] w-screen z-30  flex align-middle shadow-xl  items-center px-4  justify-between h-12`}
    >
      <div className="h-full">
        <h1 className=" cursor-pointer font-semibold font-serif italic mx-4  text-3xl">
          EzyMart
        </h1>
      </div>
      {authenticate && (
        <>
          <div className="h-full">
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e)}
              onKeyDown={handleKeyPress}
              type="text"
              placeholder="Product..."
              className="bg-[#ececec] w-[60vw] max-w-[30rem] items-center justify-center  placeholder:text-zinc-800 rounded-md  active:border-b-2 outline-none focus:border-[#00574b]  border-2 p-2 z-20 h-10 m-1"
            ></input>
          </div>
          <div className="text-black  gap-4  text-lg flex">
            <div className=" -m-4 justify-between flex  gap-6">
              <div className="  h-full   flex   cursor-pointer ">
                <button
                  onClick={addToCart}
                  className="h-fit relative w-full gap-2 flex "
                >
                  <FaOpencart
                    color="black"
                    size={20}
                    className=" pt-2   h-full "
                  />
                  <h1 className="absolute -top-2 font-semibold left-2 ">
                    {cartCount}
                  </h1>
                </button>
              </div>
              <div className=" cursor-pointer flex  ">
                <div
                  onClick={openDialog}
                  className="h-9 w-9 rounded-full -mr-2 -mt-1 bg-white "
                >
                  <FaUser color="black" className="h-full" />
                </div>
                <div
                  onClick={openDialog}
                  className="  top-10 right-4  shadow-lg z-10 "
                >
                  <div className="  pr-4 z-10">{name}</div>
                </div>
                {onDialogOpen && (
                  <div className="h-max absolute bg-white  border-2 top-8  right-1 rounded-lg shadow-2xl ">
                    <ul className="m-2 flex flex-col h-full gap-1">
                      {merchant ? (
                        <li
                          onClick={gotoRegisteredProduct}
                          className="h-full border-b-2 b p-2 rounded-lg hover:scale-105 text-center "
                        >
                          Registered Product
                        </li>
                      ) : (
                        <li className="h-full border-b-2 b p-2 rounded-lg hover:scale-105 text-center ">
                          Register as Merchant
                        </li>
                      )}

                      <li
                        className="h-full border-b-2 b p-2 rounded-lg hover:scale-105 text-center "
                        onClick={goToOrder}
                      >
                        Your Orders
                      </li>
                    </ul>
                  </div>
                )}
                {/* <h1>Aryan</h1> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
