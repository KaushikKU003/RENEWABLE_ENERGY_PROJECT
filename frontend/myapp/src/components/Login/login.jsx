import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
          // Send POST request to backend
          // console.log(formData); // Log the form data
          const response = await axios.post('YOUR_BACKEND_API_URL', formData);
          console.log(response.data); // Log the response data
          // You can handle the response data or redirect the user after successful login
        } catch (error) {
          console.error('Error occurred:', error);
          // Handle error, show error message, etc.
        }
      };
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Prevent default form submission
  //   
  // };

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
          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" required value={formData.password} onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit"
                      className="bg-[#1B1A55] hover:bg-[#39368b] text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline content-center">
                  Login
              </button>
            </div>
          </form>
          <p className="text-center my-4">OR</p>
          <button id="guestLogin"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Continue as Guest
          </button>
        </div>
      </body>
    </>
  );
}
 
export default Login;
