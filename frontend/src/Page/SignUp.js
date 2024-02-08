import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../util/validation";
import { useDispatch } from "react-redux";
import { register } from "../redux/Auth/auth_action";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
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
    if (
      formData.email.length > 6 &&
      formData.name.length > 2 &&
      formData.password.length >= 8
    ) {
      dispatch(register(formData));
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigateToSignIn();
    }
  };
  const navigateToSignIn = () => {
    navigate("/login");
  };
  return (
    <div className="h-screen relative">
      <div className="h-full top-0 absolute ">
        <img
          src={require("../asset/login.jpg")}
          className="h-full w-screen"
          alt=""
        />
      </div>
      <div className="relative flex justify-center items-center h-full ">
        <section className=" sm:h-[70vh] sm:w-[70vw] h-full w-full  sm:rounded-xl  shadow-2xl bg-gray-900/70 ">
          <div className="flex flex-col mt-[10vh] h-max justify-center items-center ">
            <div className=" text-white flex flex-col  sm:text-4xl text-3xl">
              <h1>Welcome to EzyMart!!</h1>
            </div>
            <form className=" text-white flex flex-col mt-20 gap-10">
              <h1 className="text-bold text-xl -mb-2">Name</h1>
              <input
                type="text"
                onChange={(e) => onFormChange(e)}
                name="name"
                required
                minLength={2}
                value={formData.name}
                placeholder="Your Name"
                className="h-10 p-3 max-w-[30rem] rounded-md text-black font-sans outline-none focus:border-2 focus:border-[#1379bd] sm:w-[30vw] placeholder:text-neutral-700"
              />
              <h1 className="text-bold text-xl -mb-2">Email</h1>
              <input
                type="email"
                onChange={(e) => onFormChange(e)}
                name="email"
                value={formData.email}
                minLength={6}
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
                Sign Up
              </button>
              <span className="-mt-6">
                Already signUp?{" "}
                <span
                  className=" cursor-pointer font-bold"
                  onClick={navigateToSignIn}
                >
                  Sign in here
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

export default SignUp;
