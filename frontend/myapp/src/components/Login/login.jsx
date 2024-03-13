import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    admin_name: '',
    admin_password: ''
  });

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });
const handleRegularLogin = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:4000/app/admin/login', formData);
    console.log("Response.data:",response.data); // Log the response data
    if (response.data.success) {
      // Redirect to dashboard on successful login
      handleSuccess("Login successful!")
      localStorage.setItem("role","admin")
      setTimeout(() => {
        navigate("/");
      }, 1500)
    } else {
      // Handle unsuccessful login (show error message, etc.)
      handleError("Login Failed")
      console.error('Login failed:', response.data.message);
      // You can handle the error in the UI, for example, by showing an error message
    }
  } catch (error) {
    console.error('Error occurred:', error);
    // Handle error, show error message, etc.
  }
};

const handleGuestLogin = async(message) => {
// console.log(e);
const storedMessage = message;
// console.log("Stored message is:",storedMessage);
  // Handle guest login action here (if needed)
  handleSuccess(storedMessage);
  localStorage.setItem("role","guest")
  console.log('Guest login action'); 
  setTimeout(() => {
    navigate("/");
  }, 1500);
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <body className="flex items-center justify-center h-screen bg-[#8c0c57]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm  hover:shadow-[2px_2px_40px_rgba(27,2,17,0.6)]">
          <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
          <form id="loginForm" onSubmit={handleRegularLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">User name</label>
              <input type='text' id="admin_name" name="admin_name" required value={formData.admin_name} onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-6">
              <label htmlFor="admin_password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="admin_password" name="admin_password" required value={formData.admin_password} onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit"
                      className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline content-center">
                  Login
              </button>
            </div>
          </form>
          <ToastContainer />
          <p className="text-center my-4">OR</p>
          <button id="guestLogin" onClick={() => handleGuestLogin("Guest Logged In")}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Continue as Guest
          </button>
        </div>
      </body>
    </>
  );
}
 
export default Login;
