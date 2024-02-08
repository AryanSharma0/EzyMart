import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../util/validation";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../redux/Auth/auth_action";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state) => state.authReducer);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid Email");

      return;
    }
    if (formData.password.length > 4 && validateEmail(formData.email)) {
      dispatch(userlogin(formData));
      setFormData({
        email: "",
        password: "",
      });
    }
    if (authenticate) {
      navigate("/");
    }
  };
  const navigateToSignUp = () => {
    navigate("/signUp");
  };
  return (
    <div className="h-screen">
      <div className="h-screen  absolute ">
        <img
          src={require("../asset/login.jpg")}
          className="h-full w-screen"
          alt=""
        />
      </div>
      <div className="relative flex justify-center items-center h-full ">
        <section className=" sm:h-[70vh] sm:w-[70vw] h-full w-full  sm:rounded-xl  shadow-2xl bg-gray-900/70 ">
          <div className="flex flex-col mt-[10vh] h-max justify-center items-center ">
            <div className=" text-white flex flex-col text-3xl sm:text-4xl">
              <h1>Welcome Back!!</h1>
              {/* <h1>Login</h1> */}
            </div>
            <form className=" text-white flex flex-col mt-20 gap-10">
              <h1 className="text-bold text-xl -mb-2">Email</h1>
              <input
                type="text"
                onChange={(e) => onFormChange(e)}
                name="email"
                value={formData.email}
                required
                placeholder="abc@gmail.com"
                className="h-10 p-3 max-w-[30rem] rounded-md text-black font-sans outline-none focus:border-2 focus:border-[#1379bd] sm:w-[30vw] placeholder:text-neutral-700"
              />

              <h1 className="text-bold text-xl -my-2">Password</h1>
              <input
                type="password"
                onChange={(e) => onFormChange(e)}
                required
                name="password"
                placeholder="**********"
                value={formData.password}
                className="h-10 p-3 max-w-[30rem] rounded-md text-black font-sans outline-none focus:border-2 focus:border-[#1379bd] sm:w-[30vw] placeholder:text-neutral-700"
              />

              <button
                onClick={(e) => onFormSubmit(e)}
                className="bg-[#fff]  w-[10rem] active:scale-95 h-10 rounded-lg text-[#000536] text-xl font-extrabold p-2"
              >
                Login
              </button>
              <span>
                Want to Register?{" "}
                <span
                  className=" font-bold cursor-pointer"
                  onClick={navigateToSignUp}
                >
                  Register here
                </span>
              </span>
            </form>
            <div></div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
