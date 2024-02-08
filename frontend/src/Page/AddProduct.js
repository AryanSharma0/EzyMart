import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRegisteredProduct } from "../redux/Product/product_action";

function AddProduct() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authToken } = useSelector((state) => state.authReducer);
  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Check if a file is selected
    if (!file) {
      alert("Please select a file");
      return;
    }

    const reader = new FileReader();

    // Callback function when the file is read
    reader.onloadend = () => {
      const base64Image = reader.result;
      let data = { ...formData, base64Image: base64Image };
      dispatch(addRegisteredProduct(data, authToken, navigate));
    };

    // Read the file as Data URL
    reader.readAsDataURL(file);
  };

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  return (
    <div className="h-screen">
      <div className="xl:mx-[15vw] h-full pt-[10]">
        <div className="h-full p-4 px-10 py-10 bg-[#fff] xl:mt-20">
          <h1 className="text-xl text-center h-fit font-bold">Add Products</h1>
          <div className=" h-full">
            <form className="h-full">
              <div class="relative z-0 w-full h-max mb-6 group">
                <input
                  onChange={(e) => onFormChange(e)}
                  type="email"
                  name="name"
                  id="name"
                  class="block py-2.5 px-0 w-full h-max text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                >
                  Add product name
                </label>
              </div>
              <div class="relative h-max z-0 w-full mb-6 group">
                <textarea
                  onChange={(e) => onFormChange(e)}
                  rows={6}
                  type=""
                  name="description"
                  id="description"
                  class="block py-2.5 h-max px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="description"
                  class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                >
                  Products Details
                </label>
              </div>

              <div class="grid md:grid-cols-2 h-max md:gap-6">
                <div class="relative z-0 w-full h-max mb-6 group">
                  <input
                    onChange={(e) => onFormChange(e)}
                    type="number"
                    name="quantity"
                    id="quantity"
                    class="block py-2.5 px-0 w-full h-max text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="quantity"
                    class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                  >
                    Product Quantity
                  </label>
                </div>
                <div class="relative z-0 w-full h-max mb-6 group">
                  <input
                    onChange={(e) => onFormChange(e)}
                    type="number"
                    name="price"
                    id="price"
                    class="block py-2.5 px-0 w-full h-max text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="price"
                    class="peer-focus:font-medium h-max absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                  >
                    Price
                  </label>
                </div>
              </div>
              <div class="grid md:grid-cols-2 h-max md:gap-6">
                <div class="relative z-0 w-full h-max mb-6 group">
                  <input
                    onChange={(e) => onFormChange(e)}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="shop_phone"
                    id="shop_phone"
                    class="block py-2.5 px-0 h-max w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    maxLength={10}
                  />
                  <label
                    for="shop_phone"
                    class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                  >
                    Shop Phone number (123-456-7890)
                  </label>
                </div>
                <div class="relative z-0 w-full h-max mb-6 group">
                  <input
                    onChange={(e) => onFormChange(e)}
                    type="text"
                    name="company_address"
                    id="company_address"
                    class="block py-2.5 px-0 w-full h-max text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="company_address"
                    class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                  >
                    Company Address
                  </label>
                </div>
              </div>
              <div class="grid md:grid-cols-2 h-max md:gap-6">
                <div class="relative z-0 w-full h-max mb-6 group">
                  <input
                    onChange={(e) => onFormChange(e)}
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="category"
                    id="category"
                    class="block py-2.5 px-0 h-max w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="category"
                    class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
                  >
                    Product Categories
                  </label>
                </div>
                <div class="relative z-0 w-full h-max mb-6 group">
                  <label
                    class="block h-full mb-2 text-lg font-medium text-gray-900 "
                    for="base64Image"
                    name="base64Image"
                  >
                    Upload Product Image
                  </label>
                  <input
                    class="block h-full w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none  "
                    id="base64Image"
                    type="file"
                    multiple
                    onChange={(e) => onFileChange(e)}
                  />
                </div>
              </div>
              <button
                onClick={(e) => onFormSubmit(e)}
                type="submit"
                class="text-white font-bold h-max bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
<div class="relative z-0 w-full h-max mb-6 group">
  <input
    type="text"
    name="repeat_password"
    id="floating_repeat_password"
    class="block py-2.5 px-0 w-full h-max text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    placeholder=" "
    required
  />
  <label
    for="floating_repeat_password"
    class="peer-focus:font-medium absolute text-lg text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-115 peer-focus:-translate-y-6"
  >
    Product Quantity
  </label>
</div>;
