import ProjectsLayout from './ProjectLayout';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import "../CSS/projDetails.css"
const ProjectDetails = () => {
  const [formData, setFormData] = useState({
    project_name: '',
    project_type: '',
    capacity: '',
    start_date: '',
    end_date: '',
    status: false // assuming it's boolean
  });

const handleSuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('projectDetails'));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the form data
    handleSuccess("Project Details Saved")
    setTimeout(() => {
    }, 500)
    console.log(formData);
    localStorage.setItem('projectDetails', JSON.stringify(formData));
    // Navigate to /financesdetails
    // navigate('/financesdetails');
  };
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const handleStatusChange = (e) => {
    setCurrentlyWorking(e.target.checked);
  };

  return (
    <>
      <ProjectsLayout/>
      <div className="min-h-[95vh] div-bg flex justify-center items-baseline">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[50%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Project Details</h1>
      
      <form class='max-w-[75%] m-auto ' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="project_name" className="block text-gray-700 text-sm font-bold mb-2">Project Name:</label>
        <input type="text" id="project_name" name="project_name" value={formData.project_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="project_type" className="block text-gray-700 text-sm font-bold mb-2">Project Type:</label>
        <select id="project_type" name="project_type" value={formData.project_type} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Project Type</option>
          <option value="type1">Solar Power Plant</option>
          <option value="type2">Wind Mill</option>
          <option value="type3">Tidal</option>
        </select>
        </div>
      <div>
        <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity:</label>
        <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div>
        <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2 ">Start Date:</label>
        <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer" />
      </div>
      <div>
        <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
        <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:cursor-pointer" disabled={currentlyWorking} />
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="status" name="status" checked={currentlyWorking} onChange={handleStatusChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
        <label htmlFor="status" className="ml-2 block">Currently Working</label>
      </div>
      <div className='flex justify-evenly'>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700" >Save</button>
      <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 " onClick={() => navigate('/financesdetails')}>Next</button>
      </div>
    </form>
    <ToastContainer />
      </div>
</div>
    </>
  );
}

export default ProjectDetails;


