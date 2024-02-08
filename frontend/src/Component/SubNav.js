import React from "react";
import { FiAlignLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../redux/Auth/auth_action";
import { Link, useNavigate } from "react-router-dom";

function SubNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productCategories = [
    "Clothes",
    "Consumables",
    "Jewellery",
    "Home ",
    "Electronics",
  ];

  const { authenticate } = useSelector((state) => state.authReducer);

  const userLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    authenticate && (
      <div className="min-h-8 z-20 h-16  p-1 pb-1  lg:h-8   ">
        <div className="flex-auto h-16 flex md:h-8  justify-between text-black shadow-lg bg-[#ffffff] mt-[1px] border-[#005266]">
          <div className="flex h-max flex-wrap ">
            <Link
              to={"/"}
              className="flex gap-2 mx-4 h-full cursor-pointer align-baseline "
            >
              <FiAlignLeft color="black" size={20} className="   h-full " />
              <h3 className="mt-1">All Products</h3>
            </Link>
            {productCategories.map((category) => {
              return (
                <Link
                  to={"/category?categoryName=" + category}
                  className="flex gap-2 mx-4 h-full cursor-pointer align-baseline "
                  key={category}
                >
                  <h3 className="mt-1">{category}</h3>
                </Link>
              );
            })}
          </div>
          <div
            className="flex h-full mr-4 cursor-pointer flex-wrap justify-center"
            onClick={userLogOut}
          >
            <h1 className=" mt-1 mr-1">Logout</h1>
            <IoLogOutOutline color="black" size={20} className="   h-full  " />
          </div>
        </div>
      </div>
    )
  );
}

export default SubNav;
