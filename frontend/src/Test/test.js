// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [formData, setFormData] = useState({});
//   const [file, setFile] = useState(null);

//   const onFormSubmit = async (e) => {
//     e.preventDefault();

//     // Check if a file is selected
//     if (!file) {
//       alert("Please select a file");
//       return;
//     }

//     const reader = new FileReader();

//     // Callback function when the file is read
//     reader.onloadend = () => {
//       const base64Image = reader.result;
//       console.log("Base64 Image:", base64Image);

//       // Now you can send base64Image to the server
//       sendDataToServer(base64Image);
//     };

//     // Read the file as Data URL
//     reader.readAsDataURL(file);
//   };

//   const onFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onFileChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const sendDataToServer = async (base64Image) => {
//     const authToken =
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTUwM2I5ODZhMGQzYjI2MjA2OGFhMTgiLCJuYW1lIjoiQXJ5YW4iLCJlbWFpbCI6ImFzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMTEtMTJUMDI6NDI6MzIuMzQ0WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTEtMTJUMDI6NDU6MDguNTkzWiIsIl9fdiI6MCwiaWF0IjoxNjk5NzU5NjU0fQ.S9fBBcbksHW9K9wXdZa6v8sTTjuSg5Q3c1tzpZE41YY";

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         authorization: authToken,
//       },
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/merchant/addProduct",
//         {
//           ...formData,
//           base64Image: base64Image,
//         },
//         config
//       );
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const onSubmit2 = () => {
//     const url = "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg";
//   };

//   return (
//     <div className="App">
//       <form action="">
//         <h2>Enter file</h2>
//         <label htmlFor="name">Enter Product name</label>
//         <input
//           onChange={(e) => onFormChange(e)}
//           type="text"
//           name="name"
//           id="name"
//           required
//         />
//         <input
//           onChange={(e) => onFormChange(e)}
//           type="text"
//           name="category"
//           id=""
//           required
//         />
//         <input
//           onChange={(e) => onFormChange(e)}
//           type="text"
//           name="description"
//           id=""
//           required
//         />
//         <input
//           onChange={(e) => onFormChange(e)}
//           type="text"
//           name="price"
//           id=""
//           required
//         />

//         <input
//           accept="image/*"
//           onChange={(e) => onFileChange(e)}
//           type="file"
//           name="base64Image"
//           id=""
//           multiple={false}
//         />
//         <button type="submit" onClick={(e) => onFormSubmit(e)}>
//           Submit
//         </button>
//         <button type="submit" onClick={(e) => onFormSubmit(e)}>
//           Submit2
//         </button>
//       </form>
//     </div>
//   );
// }

// export default App;
